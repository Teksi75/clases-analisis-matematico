// Functional checks of the public reading page: Chromium + local DevTools, no npm dependencies.
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const folder = dirname(fileURLToPath(import.meta.url));
const evidence = join(folder, '../.browser-check/tp2');
await mkdir(evidence, { recursive: true });
const profile = await mkdtemp(join(evidence, 'profile-'));
const browser = spawn('/usr/bin/chromium', ['--headless', '--no-sandbox', '--disable-gpu',
  '--no-first-run', '--disable-background-networking', '--remote-debugging-port=0',
  '--user-data-dir=' + profile, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
let ws;
let timer;
const stopped = new Promise(resolve => browser.once('exit', resolve));
const timeout = new Promise((_, reject) => {
  timer = setTimeout(() => reject(new Error('TP2 browser check exceeded 25 seconds')), 25000);
});
try {
  await Promise.race([timeout, (async () => {
    const endpoint = await new Promise((resolve, reject) => {
      let stderr = '';
      browser.stderr.on('data', chunk => {
        stderr += chunk;
        const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (match) resolve(match[1]);
      });
      browser.once('error', reject);
      browser.once('exit', code => reject(new Error('Chromium exited: ' + code)));
    });
    const targets = await (await fetch(`http://127.0.0.1:${new URL(endpoint).port}/json/list`)).json();
    ws = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
    let id = 0;
    const pending = new Map(), events = new Map(), errors = [];
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const { resolve, reject } = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) reject(new Error(JSON.stringify(message.error)));
        else resolve(message.result);
      } else if (message.method === 'Runtime.exceptionThrown') {
        errors.push(message.params.exceptionDetails);
      } else if (events.has(message.method)) {
        events.get(message.method)(message.params);
        events.delete(message.method);
      }
    };
    const call = (method, params = {}) => new Promise((resolve, reject) => {
      pending.set(++id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async expression => {
      const result = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
      return result.result.value;
    };
    const ready = () => evaluate('document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))).then(() => true)');
    const navigate = async (scripts = true) => {
      const loaded = new Promise(resolve => events.set('Page.loadEventFired', resolve));
      await call('Page.navigate', { url: pathToFileURL(join(folder, 'tp2.html')).href });
      await loaded;
      // With page scripts disabled, a requestAnimationFrame callback cannot run.
      if (scripts) await ready();
    };
    const capture = async name => {
      const { data } = await call('Page.captureScreenshot', { format: 'png' });
      await writeFile(join(evidence, name + '.png'), Buffer.from(data, 'base64'));
    };
    const noOverflow = async () => {
      const widths = await evaluate('({view:innerWidth, page:document.documentElement.scrollWidth})');
      assert.ok(widths.page <= widths.view, JSON.stringify(widths));
    };
    await call('Page.enable');
    await call('Runtime.enable');
    for (const width of [1440, 390]) {
      await call('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false });
      await navigate();
      await noOverflow();
      assert.equal(await evaluate('document.querySelectorAll("h1").length'), 1);
      assert.equal(await evaluate('document.querySelector(".contents-disclosure").open'), width === 1440);
      await capture('tp2-cover-' + width);
      const fonts = await evaluate('({body:getComputedStyle(document.body).fontFamily, color:getComputedStyle(document.body).backgroundColor})');
      assert.equal(fonts.color, 'rgb(32, 32, 32)');
      assert.match(fonts.body, /Segoe UI/);
      for (const color of ['roja', 'verde', 'azul']) {
        await evaluate(`document.querySelector('.contents a[href="#funcion-${color}"]').click()`);
        await ready();
        const image = await evaluate(`(async () => {
          const img = document.querySelector('img[src$="funcion-${color}.png"]');
          await img.decode();
          const r = img.getBoundingClientRect();
          return {natural:img.naturalHeight, ratio:r.width/r.height, expected:img.naturalWidth/img.naturalHeight};
        })()`);
        assert.equal(image.natural, 728);
        assert.ok(Math.abs(image.ratio - image.expected) < .01);
        assert.equal(await evaluate('document.querySelector(".contents [aria-current=location]").hash'), '#funcion-' + color);
        await noOverflow();
        await capture('tp2-' + color + '-' + width);
        const table = await evaluate(`(() => {
          const table = document.getElementById('datos-${color}');
          const scroller = table.closest('.table-scroll');
          return {rows:table.rows.length, scroll:scroller.scrollWidth, width:scroller.clientWidth};
        })()`);
        assert.equal(table.rows, { roja:3, verde:3, azul:5 }[color]);
        assert.ok(table.scroll <= table.width + 1, 'Reading table overflows at ' + width + ': ' + JSON.stringify(table));
        const items = await evaluate(`(() => {
          const table = document.getElementById('items-${color}');
          const scroller = table.closest('.table-scroll');
          return {rows:table.rows.length, cells:table.rows[1].cells.length,
            first:table.rows[1].cells[0].textContent.trim(),
            hasStatement:!!table.rows[1].cells[1].querySelector('math'),
            scroll:scroller.scrollWidth, width:scroller.clientWidth};
        })()`);
        assert.deepEqual([items.rows, items.cells, items.first, items.hasStatement],
          [{ roja:9, verde:4, azul:14 }[color], 4, { roja:'1', verde:'5', azul:'6' }[color], true]);
        assert.ok(items.scroll <= items.width + 1, "Item table overflows at " + width + ": " + JSON.stringify(items));
      }
      if (width === 1440) {
        await evaluate('document.querySelector("#texto-mas").click()');
        assert.equal(await evaluate('document.querySelector("#texto-tamano").textContent'), '110%');
        await evaluate('document.querySelector("#items-azul").scrollIntoView({block:"start"})');
        await ready();
        await capture('tp2-items-azul-1440');
      }
      console.log(JSON.stringify({ check:'desktop-mobile-images-tables-navigation', width, status:'PASS' }));
    }
    await call('Emulation.setScriptExecutionDisabled', { value: true });
    await navigate(false);
    await noOverflow();
    assert.ok(await evaluate('document.querySelector("#ej1").getBoundingClientRect().height > 0'));
    assert.equal(await evaluate('document.querySelector(".reading-controls").hidden'), true);
    console.log('PASS without JavaScript: full content, native navigation, no page overflow');
    assert.deepEqual(errors, []);
    console.log('PASS zero uncaught page errors; print verification excluded by request');
  })()]);
} finally {
  clearTimeout(timer);
  if (ws) ws.close();
  browser.kill();
  await stopped;
  await rm(profile, { recursive:true, force:true });
}
