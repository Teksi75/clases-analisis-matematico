// Comprueba la mejora progresiva y el respaldo nativo con Chromium/CDP.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const visual = join(root, 'evaluaciones/stewart/verificacion-visual');
await mkdir(visual, { recursive: true });
const captures = await mkdtemp(join(visual, 'consulta-panel-'));
const profile = await mkdtemp(join(tmpdir(), 'stewart-piloto-perfil-'));
console.log(`Capturas: ${captures}`);
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
    const response = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
    return response.result.value;
  };
  const state = () => evaluate(`(() => {
    const controls = [...document.querySelectorAll('[data-consulta-incisos] > details')];
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
  const press = async (key, code, number, text) => {
    for (const type of ['keyDown', 'keyUp']) await call('Input.dispatchKeyEvent', {
      type, key, code, windowsVirtualKeyCode:number, nativeVirtualKeyCode:number,
      ...(type === 'keyDown' && text ? {text, unmodifiedText:text} : {})
    });
  };
  const screenshot = async name => {
    const image = await call('Page.captureScreenshot', {format:'png'});
    await writeFile(join(captures, name + '.png'), Buffer.from(image.data, 'base64'));
  };
  await call('Page.enable');
  // La mejora progresiva empieza sin respuesta y muestra una sola resolución.
  for (const width of [1280, 390]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    const loaded = once('Page.loadEventFired');
    await call('Page.navigate', { url: pathToFileURL(join(root, 'evaluaciones/stewart/algebra.html')).href });
    await loaded;
    await call('Page.bringToFront');
    const snapshot = async () => {
      await evaluate('new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))');
      return evaluate(`(() => {
      const panel = document.querySelector('[data-consulta-incisos]');
      if (!panel) return null;
      const visible = e => e.checkVisibility({contentVisibilityAuto:true, visibilityProperty:true, contentVisibilityHidden:true}) && e.getBoundingClientRect().height > 0;
      return {prompt: [...panel.querySelectorAll('p')].some(p => p.textContent.includes('Elegí un inciso para consultar su resolución.') && visible(p)),
        buttons: [...panel.querySelectorAll('button')].map(b => ({text:b.textContent.trim(), pressed:b.getAttribute('aria-pressed'), controls:b.getAttribute('aria-controls')})),
        choices: [...panel.querySelectorAll('details[data-inciso]')].map(d => ({id:d.id, shown:visible(d), open:d.open,
          detailOpen:d.querySelector(':scope > details').open, detailShown:visible(d.querySelector(':scope > details > p'))}))};
    })()`);
    };
    let s = await snapshot();
    assert.ok(s, 'falta el panel de consulta');
    assert.equal(s.prompt, true);
    assert.equal(s.buttons.length, 6);
    assert.ok(s.choices.every(c => !c.shown && !c.detailOpen));
    assert.ok(s.buttons.every(b => b.pressed === 'false'));
    await evaluate(`document.querySelector('[data-consulta-incisos]').scrollIntoView({block:'start'})`);
    await screenshot(`${width}-inicial`);
    // Un resumen oculto no puede tomar el foco.
    assert.equal(await evaluate(`(() => {
      const target = document.querySelector('details[data-inciso="b"] details > summary');
      target.focus(); return document.activeElement === target;
    })()`), false);
    for (let i = 0; i < 6; i++) {
      const doc = (await call('DOM.getDocument')).root.nodeId;
      const button = (await call('DOM.querySelector', {nodeId:doc, selector:`[data-consulta-incisos] button:nth-child(${i + 1})`})).nodeId;
      assert.ok(button, `botón ${i}`);
      if (i === 0) {
        const box = await call('DOM.getBoxModel', {nodeId:button});
        const q = box.model.content;
        const x = (q[0] + q[2]) / 2, y = (q[1] + q[5]) / 2;
        await call('Input.dispatchMouseEvent', {type:'mouseMoved', x, y});
        await call('Input.dispatchMouseEvent', {type:'mousePressed', x, y, button:'left', clickCount:1});
        await call('Input.dispatchMouseEvent', {type:'mouseReleased', x, y, button:'left', clickCount:1});
      } else if (i === 1) {
        const first = (await call('DOM.querySelector', {nodeId:doc, selector:'[data-consulta-incisos] button'})).nodeId;
        await call('DOM.focus', {nodeId:first});
        await press('Tab', 'Tab', 9);
        assert.equal(await evaluate(`document.activeElement.textContent.trim()`), 'b');
        await press(' ', 'Space', 32, ' ');
      } else {
        await call('DOM.focus', {nodeId:button});
        await pressEnter();
      }
      s = await snapshot();
      assert.equal(s.prompt, false);
      assert.equal(s.buttons[i].text, 'abcdef'[i]);
      assert.equal(s.buttons[i].controls, s.choices[i].id);
      assert.ok(s.buttons.every((b, j) => b.pressed === (i === j ? 'true' : 'false')));
      assert.ok(s.choices.every((c, j) => c.shown === (i === j) && c.open === (i === j) && !c.detailOpen && !c.detailShown), JSON.stringify({i, s}));
      if (i === 0) await screenshot(`${width}-seleccion-a`);
      const detail = (await call('DOM.querySelector', {nodeId:doc, selector:`details[data-inciso="${'abcdef'[i]}"] details > summary`})).nodeId;
      await call('DOM.focus', {nodeId:detail});
      await pressEnter();
      const expanded = (await snapshot()).choices[i];
      assert.ok(expanded.detailOpen && expanded.detailShown, JSON.stringify(expanded));
    }
    // Volver al primer inciso tampoco conserva el detalle anteriormente abierto.
    const doc = (await call('DOM.getDocument')).root.nodeId;
    const first = (await call('DOM.querySelector', {nodeId:doc, selector:'[data-consulta-incisos] button'})).nodeId;
    await call('DOM.focus', {nodeId:first}); await pressEnter();
    assert.ok((await snapshot()).choices.every(c => !c.detailOpen));
    console.log(JSON.stringify({width, scriptEnabled:true, selected:6, mouse:true, keyboard:'Tab/Space/Enter', resetOnSwitch:true}));
  }
  await call('Emulation.setScriptExecutionDisabled', { value: true });
  for (const width of [1280, 390]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    const loaded = once('Page.loadEventFired');
    await call('Page.navigate', { url: pathToFileURL(join(root, 'evaluaciones/stewart/algebra.html')).href });
    await loaded;
    await call('Page.bringToFront');
    const doc = (await call('DOM.getDocument')).root.nodeId;
    const outer = (await call('DOM.querySelectorAll', { nodeId: doc, selector: '[data-consulta-incisos] > details' })).nodeIds;
    assert.equal(outer.length, 6);
    let before = await state();
    assert.ok(before.every(s => !s.open && !s.innerOpen && !s.brief && !s.step), JSON.stringify(before));
    // Diagnostic: compare DevTools evaluation's focus attempt with the DOM protocol.
    const focusAttempt = await evaluate(`(() => {
      const target = document.querySelector('[data-consulta-incisos] > details > summary');
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
