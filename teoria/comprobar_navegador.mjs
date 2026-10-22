// Prueba funcional sin dependencias: Chromium + protocolo DevTools local.
import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const folder = dirname(fileURLToPath(import.meta.url));
const profile = await mkdtemp(join(tmpdir(), 'theory-browser-'));
const browser = spawn('/usr/bin/chromium', ['--headless', '--no-sandbox', '--disable-gpu',
  '--no-first-run', '--disable-background-networking', '--remote-debugging-port=0',
  '--user-data-dir=' + profile, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
let ws;
let deadline;
const timeout = new Promise((_, reject) => {
  deadline = setTimeout(() => reject(new Error('Tiempo máximo de 25 s agotado')), 25000);
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
    browser.once('exit', code => reject(new Error('Chromium terminó: ' + code)));
  });
  const port = new URL(endpoint).port;
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  ws = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map();
  const events = new Map();
  ws.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    } else if (events.has(message.method)) {
      events.get(message.method)(message.params);
      events.delete(message.method);
    }
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
  const once = method => new Promise(resolve => events.set(method, resolve));
  const evaluate = async expression => {
    const result = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const ready = () => evaluate('document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))).then(() => true)');
  const navigate = async (scripts = true) => {
    const loaded = once('Page.loadEventFired');
    await call('Page.navigate', { url: pathToFileURL(join(folder, 'index.html')).href });
    await loaded;
    if (scripts) await ready();
  };
  const scroll = async selector => {
    await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'start'})`);
    await ready();
  };
  const capture = async name => {
    const { data } = await call('Page.captureScreenshot', { format: 'png' });
    await writeFile(join(folder, name), Buffer.from(data, 'base64'));
  };
  const metrics = () => evaluate(`({width:document.documentElement.clientWidth, scroll:document.documentElement.scrollWidth,
    open:document.querySelector('details').open, active:document.querySelector('[aria-current]')?.getAttribute('href'),
    topic:document.getElementById('tema-actual').textContent})`);
  await call('Page.enable');
  for (const width of [1440, 390]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: false });
    await navigate();
    let result = await metrics();
    assert.ok(result.scroll <= result.width, JSON.stringify(result));
    assert.equal(result.open, width === 1440);
    if (width === 390) {
      const point = await evaluate(`(() => { const r=document.querySelector('summary').getBoundingClientRect(); return {x:r.x+20,y:r.y+20}; })()`);
      // Bring the native control into view before exercising actual input.
      await scroll('summary');
      const y = await evaluate('document.querySelector("summary").getBoundingClientRect().y+20');
      await call('Input.dispatchMouseEvent', { type:'mousePressed', x:point.x, y, button:'left', clickCount:1 });
      await call('Input.dispatchMouseEvent', { type:'mouseReleased', x:point.x, y, button:'left', clickCount:1 });
      assert.equal((await metrics()).open, true);
    }
    await evaluate(`document.querySelector('.contents a[href="#funciones-qué-hace-que-una-relación-sea-una-función"]').click()`);
    await ready();
    result = await metrics();
    assert.equal(result.active, '#funciones-qué-hace-que-una-relación-sea-una-función');
    assert.ok(result.topic.includes('Qué hace'));
    const emphasis = await evaluate(`(() => {
      const active = document.querySelector('.contents a[aria-current="location"]');
      const inactive = document.querySelector('.index-chapter a:not(.index-title):not([aria-current])');
      const current = getComputedStyle(active), normal = getComputedStyle(inactive);
      return { activeSize:parseFloat(current.fontSize), normalSize:parseFloat(normal.fontSize),
        activeWeight:Number(current.fontWeight), normalWeight:Number(normal.fontWeight),
        color:current.color, accent:getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() };
    })()`);
    assert.ok(emphasis.activeSize > emphasis.normalSize, JSON.stringify(emphasis));
    assert.ok(emphasis.activeWeight > emphasis.normalWeight, JSON.stringify(emphasis));
    assert.equal(emphasis.color, 'rgb(255, 128, 92)');
    console.log(JSON.stringify({ mode:'active-topic-emphasis', width, ...emphasis }));
    await capture(width === 1440 ? 'ux-preview-desktop.png' : 'ux-preview-mobile.png');
    await scroll('#parabola');
    if (width === 390) await capture('ux-preview-parabola.png');
    await scroll('#limite-punto');
    if (width === 390) await capture('ux-preview-limites.png');
    result = await metrics();
    assert.equal(result.active, '#limites-acercarse-no-es-llegar');
    assert.ok(result.scroll <= result.width);
    console.log(JSON.stringify({ mode:'screen', ...result }));
    await call('Emulation.setScriptExecutionDisabled', { value: true });
    await navigate(false);
    const fallback = await evaluate(`({text:document.querySelector('#funciones p').textContent.length,
      links:document.querySelectorAll('details a').length,
      desktopIndex:getComputedStyle(document.querySelector('details'), '::details-content').contentVisibility})`);
    assert.ok(fallback.text > 80 && fallback.links > 10);
    if (width === 1440) assert.equal(fallback.desktopIndex, 'visible');
    console.log(JSON.stringify({ mode:'no-js', width, ...fallback }));
    await call('Emulation.setScriptExecutionDisabled', { value:false });
  }
  await call('Emulation.setEmulatedMedia', { media:'print' });
  const print = await evaluate(`(() => {
    const answers=[...document.querySelectorAll('h4')].filter(h=>h.id.includes('respuestas')).map(h=>({
      heading:getComputedStyle(h).display, answer:getComputedStyle(h.nextElementSibling).display,
      height:h.nextElementSibling.getBoundingClientRect().height}));
    return { nav:getComputedStyle(document.querySelector('.contents')).display,
      figures:[...document.querySelectorAll('.study-figure')].map(f=>getComputedStyle(f).display), answers,
      curve:getComputedStyle(document.querySelector('.study-plot .curve')).stroke,
      text:getComputedStyle(document.querySelector('.study-plot text')).fill,
      background:getComputedStyle(document.body).backgroundColor}; })()`);
  assert.equal(print.nav, 'none');
  assert.ok(print.answers.every(a=>a.heading !== 'none' && a.answer !== 'none' && a.height > 0));
  assert.equal(print.figures.length, 5);
  assert.ok(print.figures.every(display=>display !== 'none'));
  assert.equal(print.curve, 'rgb(0, 0, 0)');
  assert.equal(print.text, 'rgb(0, 0, 0)');
  assert.equal(print.background, 'rgb(255, 255, 255)');
  console.log(JSON.stringify({ mode:'print', ...print }));
  })()]);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  clearTimeout(deadline);
  ws?.close();
  const exited = new Promise(resolve => browser.once('exit', resolve));
  browser.kill();
  if (browser.exitCode === null) await exited;
  await rm(profile, { recursive:true, force:true }); // Only this invocation's disposable profile.
}
