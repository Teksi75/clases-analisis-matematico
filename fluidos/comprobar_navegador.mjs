// Offline functional checks via local Chromium DevTools, with no npm dependencies.
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const folder = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
function option(name, fallback) {
  const i = args.indexOf(name);
  if (i < 0) return fallback;
  if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error('Falta valor para ' + name);
  return resolve(args[i + 1]);
}
const pagePath = option('--pagina', join(folder, 'index.html'));
const evidence = option('--capturas', join(folder, 'verificacion-visual', new Date().toISOString().replace(/[:.]/g, '-')));
const profile = await mkdtemp(join(tmpdir(), 'fluidos-chromium-'));
const browser = spawn('/usr/bin/chromium', ['--headless', '--no-sandbox', '--disable-gpu', '--no-first-run',
  '--disable-background-networking', '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank'],
  { stdio: ['ignore', 'ignore', 'pipe'] });
let ws, timer;
const stopped = new Promise(resolve => browser.once('exit', resolve));
try {
  await mkdir(evidence, { recursive: true });
  await Promise.race([new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Tiempo agotado')), 60000); }), (async () => {
    const endpoint = await new Promise((resolve, reject) => {
      let stderr = '';
      browser.stderr.on('data', chunk => {
        stderr += chunk;
        const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (match) resolve(match[1]);
      });
      browser.once('error', reject);
      browser.once('exit', code => reject(new Error('Chromium terminó: ' + code)));
    });
    const targets = await (await fetch(`http://127.0.0.1:${new URL(endpoint).port}/json/list`)).json();
    ws = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
    let id = 0;
    const pending = new Map(), events = new Map(), errors = [];
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const item = pending.get(message.id); pending.delete(message.id);
        if (message.error) item.reject(new Error(message.error.message)); else item.resolve(message.result);
      } else if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
      else if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push('console.error');
      else if (events.has(message.method)) { events.get(message.method)(); events.delete(message.method); }
    };
    const call = (method, params = {}) => new Promise((resolve, reject) => {
      pending.set(++id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async expression => {
      const result = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
      return result.result.value;
    };
    const navigate = async scripts => {
      const loaded = new Promise(resolve => events.set('Page.loadEventFired', resolve));
      const result = await call('Page.navigate', { url: pathToFileURL(pagePath).href });
      assert.ok(!result.errorText, result.errorText);
      await loaded;
      if (scripts) await evaluate('document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))).then(() => true)');
    };
    const overflow = async () => assert.ok(await evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Desborde horizontal');
    await call('Page.enable'); await call('Runtime.enable');
    for (const width of [1280, 390]) {
      await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
      await navigate(true); await overflow();
      assert.ok(await evaluate('document.querySelector("main article")?.getBoundingClientRect().height > 0'), 'Contenido ausente');
      assert.ok(await evaluate('(() => { const m = document.querySelector("math"); return !!m && m.getBoundingClientRect().height > 0 && m.namespaceURI === "http://www.w3.org/1998/Math/MathML" })()'), 'MathML ausente');
      assert.ok(await evaluate(`(() => {
        const links = [...document.querySelectorAll('.index-chapter a')];
        return links.length > 0 && links.every(a => {
          const id = decodeURIComponent(a.hash.slice(1));
          if (!document.getElementById(id)) return false;
          a.click(); return decodeURIComponent(location.hash.slice(1)) === id;
        });
      })()`), 'Enlace del índice inválido');
      assert.ok(await evaluate(`(() => {
        const d = document.querySelector('details.resolucion');
        if (!d || !d.querySelector('summary')) return false;
        d.open = false; d.querySelector('summary').click(); return d.open;
      })()`), 'No se abre la resolución');
      await overflow();
      const { data } = await call('Page.captureScreenshot', { format: 'png' });
      await writeFile(join(evidence, `fluidos-${width}.png`), Buffer.from(data, 'base64'));
      console.log(`PASS ${width}: índice, resolución, MathML y desborde`);
    }
    await call('Emulation.setScriptExecutionDisabled', { value: true });
    await navigate(false); await overflow();
    assert.ok(await evaluate('document.querySelector("main article")?.getBoundingClientRect().height > 0'), 'Contenido no visible sin JS');
    assert.equal(await evaluate('document.querySelector(".reading-controls").hidden'), true);
    assert.ok(await evaluate(`(() => { const d = document.querySelector('details.resolucion'); d.open = false; d.querySelector('summary').click(); return d.open; })()`), 'Resolución no abre sin JS');
    assert.deepEqual(errors, []);
    console.log('PASS sin JavaScript y sin errores de consola');
    console.log('Capturas: ' + evidence);
  })()]);
} catch (error) {
  console.error('Error: ' + error.message);
  process.exitCode = 1;
} finally {
  clearTimeout(timer);
  if (ws) ws.close();
  browser.kill();
  await stopped;
  await rm(profile, { recursive: true, force: true });
}
