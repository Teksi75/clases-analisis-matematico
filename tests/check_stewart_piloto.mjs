// Comprueba la interacción nativa sin ejecutar JavaScript de la página.
// El perfil exclusivo queda en verificacion-visual para no tocar perfiles existentes.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const visual = join(root, 'evaluaciones/stewart/verificacion-visual');
await mkdir(visual, { recursive: true });
const profile = await mkdtemp(join(visual, 'piloto-perfil-'));
console.log(`Perfil exclusivo: ${profile}`);
const browser = spawn('/usr/bin/chromium', ['--headless', '--no-sandbox', '--disable-gpu',
  '--no-first-run', '--disable-background-networking', '--remote-debugging-port=0',
  `--user-data-dir=${profile}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
let ws;
const timer = setTimeout(() => { console.error('Tiempo máximo agotado'); browser.kill(); }, 120000);
try {
  const endpoint = await new Promise((resolve, reject) => {
    let output = '';
    browser.stderr.on('data', chunk => {
      output += chunk;
      const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (match) resolve(match[1]);
    });
    browser.once('error', reject);
    browser.once('exit', code => reject(new Error(`Chromium terminó: ${code}`)));
  });
  const targets = await (await fetch(`http://127.0.0.1:${new URL(endpoint).port}/json/list`)).json();
  ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map(), events = new Map();
  ws.onmessage = event => {
    const msg = JSON.parse(event.data);
    if (msg.id) {
      const task = pending.get(msg.id); pending.delete(msg.id);
      if (msg.error) task.reject(new Error(JSON.stringify(msg.error))); else task.resolve(msg.result);
    } else if (events.has(msg.method)) { events.get(msg.method)(msg.params); events.delete(msg.method); }
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params }));
  });
  const once = method => new Promise(resolve => events.set(method, resolve));
  const evaluate = async expression => {
    const response = await call('Runtime.evaluate', { expression, returnByValue: true });
    if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
    return response.result.value;
  };
  const state = () => evaluate(`(() => {
    const controls = [...document.querySelectorAll('article > details')];
    return controls.map(d => {
      const inner = d.querySelector('details');
      const brief = d.querySelector('p');
      const step = inner.querySelector('p');
      const shown = e => !!e && e.checkVisibility({contentVisibilityAuto:true, visibilityProperty:true}) && e.getBoundingClientRect().height > 0;
      return {open:d.open, innerOpen:inner.open, brief:shown(brief), step:shown(step),
        focusedOuter:document.activeElement === d.querySelector(':scope > summary'),
        focusedInner:document.activeElement === inner.querySelector(':scope > summary')};
    });
  })()`);
  const pressEnter = async () => {
    for (const type of ['keyDown', 'keyUp']) await call('Input.dispatchKeyEvent',
      { type, key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13,
        ...(type === 'keyDown' ? { text: '\r', unmodifiedText: '\r' } : {}) });
  };
  await call('Page.enable');
  await call('Emulation.setScriptExecutionDisabled', { value: true });
  for (const width of [1280, 390]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    const loaded = once('Page.loadEventFired');
    await call('Page.navigate', { url: pathToFileURL(join(root, 'evaluaciones/stewart/algebra.html')).href });
    await loaded;
    await call('Page.bringToFront');
    const doc = (await call('DOM.getDocument')).root.nodeId;
    const outer = (await call('DOM.querySelectorAll', { nodeId: doc, selector: 'article > details' })).nodeIds;
    assert.equal(outer.length, 6);
    let before = await state();
    assert.ok(before.every(s => !s.open && !s.innerOpen && !s.brief && !s.step), JSON.stringify(before));
    // Diagnostic: compare DevTools evaluation's focus attempt with the DOM protocol.
    const focusAttempt = await evaluate(`(() => {
      const target = document.querySelector('article > details > summary');
      const before = document.activeElement.tagName;
      target.focus();
      return {before, after: document.activeElement.tagName, focused: document.activeElement === target};
    })()`);
    console.log(JSON.stringify({ width, scriptDisabled: true, initialClosed: before.length, focusAttempt,
      documentHasFocus: await evaluate('document.hasFocus()') }));
    for (let i = 0; i < outer.length; i++) {
      const outerSummary = (await call('DOM.querySelector', { nodeId: outer[i], selector: ':scope > summary' })).nodeId;
      const innerSummary = (await call('DOM.querySelector', { nodeId: outer[i], selector: ':scope > details > summary' })).nodeId;
      await call('DOM.focus', { nodeId: outerSummary });
      let current = await state();
      assert.equal(current[i].focusedOuter, true, `foco exterior ${i}`);
      await pressEnter();
      current = await state();
      assert.ok(current[i].open && current[i].brief && !current[i].innerOpen && !current[i].step, JSON.stringify(current[i]));
      assert.ok(current.every((s, j) => i === j || (!s.open && !s.innerOpen && !s.brief && !s.step)));
      await call('DOM.focus', { nodeId: innerSummary });
      current = await state();
      assert.equal(current[i].focusedInner, true, `foco interior ${i}`);
      await pressEnter();
      current = await state();
      assert.ok(current[i].open && current[i].innerOpen && current[i].brief && current[i].step, JSON.stringify(current[i]));
      assert.ok(current.every((s, j) => i === j || (!s.open && !s.innerOpen && !s.brief && !s.step)));
      await pressEnter();
      await call('DOM.focus', { nodeId: outerSummary });
      await pressEnter();
      current = await state();
      assert.ok(current.every(s => !s.open && !s.innerOpen && !s.brief && !s.step), JSON.stringify(current));
    }
    console.log(JSON.stringify({ width, keyboard: 'Enter', outerAndInnerOpened: 6, independent: true, closedAgain: true }));
  }
} finally {
  clearTimeout(timer);
  ws?.close();
  if (browser.exitCode === null) {
    const exited = new Promise(resolve => browser.once('exit', resolve));
    browser.kill();
    await exited;
  }
}
