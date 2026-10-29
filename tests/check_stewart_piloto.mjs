// Comprueba los diez paneles y el respaldo nativo con Chromium/CDP.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const captures = await mkdtemp(join(tmpdir(), 'stewart-consulta-panel-'));
const profile = await mkdtemp(join(tmpdir(), 'stewart-piloto-perfil-'));
console.log(`Capturas: ${captures}`);
console.log(`Perfil exclusivo: ${profile}`);
const browser = spawn('/usr/bin/chromium', ['--headless', '--no-sandbox', '--disable-gpu',
  '--no-first-run', '--disable-background-networking', '--remote-debugging-port=0',
  `--user-data-dir=${profile}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
let ws;
const timer = setTimeout(() => { console.error('Tiempo máximo agotado'); browser.kill(); }, 300000);
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
  const snapshot = async () => evaluate(`(() => {
      // Las lecturas de layout fuerzan un reflujo sincrónico; no se espera
      // requestAnimationFrame porque con la ejecución de scripts desactivada
      // esa promesa nunca se resuelve y el protocolo queda bloqueado.
      void document.documentElement.offsetHeight;
      const shown = e => !!e && e.checkVisibility({contentVisibilityAuto:true, visibilityProperty:true}) && e.getBoundingClientRect().height > 0;
      const panels = [...document.querySelectorAll('[data-consulta-incisos]')];
      const ids = [...document.querySelectorAll('[id]')].map(e => e.id);
      return {width:document.documentElement.clientWidth, scroll:document.documentElement.scrollWidth,
        panels:panels.map(panel => ({
          prompt:shown(panel.querySelector('.consulta-prompt')),
          buttons:[...panel.querySelectorAll('.consulta-selector button')].map(b => ({
            text:b.textContent.trim(), label:b.getAttribute('aria-label'),
            pressed:b.getAttribute('aria-pressed'), controls:b.getAttribute('aria-controls'),
            controlCount:ids.filter(id => id === b.getAttribute('aria-controls')).length
          })),
          choices:[...panel.querySelectorAll(':scope > details[data-inciso]')].map(d => {
            const inner = d.querySelector(':scope > details');
            const brief = [...d.querySelectorAll(':scope > p')];
            const steps = [...inner.querySelectorAll(':scope > p')];
            const math = d.open && !d.hidden
              ? [...d.querySelectorAll('math')].filter(m => !inner.contains(m) || inner.open) : [];
            return {letter:d.dataset.inciso, id:d.id, shown:shown(d), open:d.open,
              brief:brief.length > 0 && brief.every(shown), innerOpen:inner.open,
              step:steps.length > 0 && steps.every(shown),
              badMath:math.filter(m => m.namespaceURI !== 'http://www.w3.org/1998/Math/MathML' ||
                !shown(m) || m.getBoundingClientRect().width <= 0).length};
          })
        }))};
    })()`);
  const press = async (key, code, number, text) => {
    for (const type of ['keyDown', 'keyUp']) await call('Input.dispatchKeyEvent', {
      type, key, code, windowsVirtualKeyCode:number, nativeVirtualKeyCode:number,
      ...(type === 'keyDown' && text ? {text, unmodifiedText:text} : {})
    });
  };
  const enter = () => press('Enter', 'Enter', 13, '\r');
  const screenshot = async name => {
    const image = await call('Page.captureScreenshot', {format:'png'});
    await writeFile(join(captures, name + '.png'), Buffer.from(image.data, 'base64'));
  };
  const panelNodes = async () => {
    const doc = (await call('DOM.getDocument')).root.nodeId;
    return (await call('DOM.querySelectorAll', {nodeId:doc, selector:'[data-consulta-incisos]'})).nodeIds;
  };
  const query = async (nodeId, selector) => {
    const node = (await call('DOM.querySelector', {nodeId, selector})).nodeId;
    assert.ok(node, `falta ${selector} dentro del panel`);
    return node;
  };
  const mouseClick = async nodeId => {
    await call('DOM.scrollIntoViewIfNeeded', {nodeId});
    const box = await call('DOM.getBoxModel', {nodeId});
    const q = box.model.content;
    const x = (q[0] + q[2]) / 2, y = (q[1] + q[5]) / 2;
    await call('Input.dispatchMouseEvent', {type:'mouseMoved', x, y});
    await call('Input.dispatchMouseEvent', {type:'mousePressed', x, y, button:'left', clickCount:1});
    await call('Input.dispatchMouseEvent', {type:'mouseReleased', x, y, button:'left', clickCount:1});
  };
  const letters = ['abcdef', 'abc', 'abcde', 'abcdef', 'abcd', 'ab', 'ab', 'abcdefg', 'abcde', 'abcdef'];
  const otherPanelsUnchanged = (before, after, index) => {
    before.panels.forEach((panel, j) => {
      if (j !== index) assert.deepEqual(after.panels[j], panel, `cambió el panel ${j + 1}`);
    });
  };
  const checkLayout = (s, context) => {
    assert.ok(s.scroll <= s.width, `desborde ${context}: ${s.scroll} > ${s.width}`);
    assert.ok(s.panels.every(p => p.choices.every(c => c.badMath === 0)), `MathML ${context}`);
  };
  // Las fracciones de MathML son más altas que la línea de texto: si dos
  // consignas fraccionarias consecutivas quedan pegadas, se leen como si
  // fueran una sola expresión. Se exige una separación mínima entre líneas.
  const MIN_FRACTION_GAP = 20;
  const fractionGaps = () => evaluate(`(() => {
    const result = [];
    for (const heading of document.querySelectorAll('h2[id^="ejercicio-"]')) {
      let worst = null;
      let node = heading.nextElementSibling;
      while (node && !node.matches('[data-consulta-incisos]')) {
        if (node.tagName === 'P') {
          const lines = [];
          for (const math of node.querySelectorAll('math')) {
            if (!math.querySelector('mfrac')) continue;
            const r = math.getBoundingClientRect();
            const line = lines.find(l => Math.abs(l.top - r.top) < 1);
            if (line) line.bottom = Math.max(line.bottom, r.bottom);
            else lines.push({top:r.top, bottom:r.bottom});
          }
          lines.sort((a, b) => a.top - b.top);
          for (let i = 1; i < lines.length; i++) {
            const gap = lines[i].top - lines[i - 1].bottom;
            if (worst === null || gap < worst) worst = gap;
          }
        }
        node = node.nextElementSibling;
      }
      result.push({exercise: heading.id, minGap: worst === null ? null : +worst.toFixed(1)});
    }
    return result;
  })()`);
  await call('Page.enable');
  for (const width of [1280, 390]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height:900, deviceScaleFactor:1, mobile:false });
    const loaded = once('Page.loadEventFired');
    await call('Page.navigate', {url:pathToFileURL(join(root, 'evaluaciones/stewart/algebra.html')).href});
    await loaded; await call('Page.bringToFront');
    const algebraButton = await evaluate(`getComputedStyle(document.querySelector('.consulta-selector button')).backgroundColor`);
    assert.equal(algebraButton, 'rgba(133, 201, 192, 0.04)', 'Álgebra conserva su fondo verde azulado');
    const panels = await panelNodes();
    let s = await snapshot();
    assert.equal(panels.length, 10);
    assert.equal(s.panels.length, 10);
    assert.equal(await evaluate(`!!document.querySelector('#respuestas-del-libro, a[href="#respuestas-del-libro"]')`), false);
    assert.equal(await evaluate(`document.body.innerText.toLowerCase().includes('errata')`), false);
    const controlIds = [];
    for (let p = 0; p < panels.length; p++) {
      const panel = s.panels[p];
      assert.equal(panel.prompt, true, `indicación inicial ejercicio ${p + 1}`);
      assert.deepEqual(panel.buttons.map(b => b.text), [...letters[p]]);
      assert.deepEqual(panel.choices.map(c => c.letter), [...letters[p]]);
      panel.buttons.forEach((b, i) => {
        assert.equal(b.label, `Inciso ${letters[p][i]}`);
        assert.equal(b.pressed, 'false');
        assert.equal(b.controls, panel.choices[i].id);
        assert.ok(b.controls);
        assert.equal(b.controlCount, 1);
        controlIds.push(b.controls);
      });
      assert.ok(panel.choices.every(c => !c.shown && !c.open && !c.brief && !c.innerOpen && !c.step));
    }
    assert.equal(new Set(controlIds).size, controlIds.length);
    checkLayout(s, `${width} inicial`);
    const gaps = await fractionGaps();
    const tight = gaps.filter(g => g.minGap !== null && g.minGap < MIN_FRACTION_GAP);
    assert.equal(tight.length, 0,
      `consignas fraccionarias pegadas en ${width}px: ${JSON.stringify(tight)}`);
    console.log(JSON.stringify({width, fractionGaps: gaps.filter(g => g.minGap !== null)}));
    await evaluate(`document.querySelector('[data-consulta-incisos]').scrollIntoView({block:'start'})`);
    await screenshot(`${width}-inicial`);
    assert.equal(await evaluate(`(() => {
      const panel = document.querySelector('[data-consulta-incisos]');
      const target = panel.querySelector('details[data-inciso="b"] details > summary');
      target.focus(); return document.activeElement === target;
    })()`), false, 'un resumen oculto no debe recibir foco');

    for (let p = 0; p < panels.length; p++) {
      for (let i = 0; i < letters[p].length; i++) {
        const panel = panels[p];
        const button = await query(panel, `.consulta-selector button:nth-child(${i + 1})`);
        const before = await snapshot();
        if (i === 0) {
          await mouseClick(button);
        } else if (i === 1) {
          const first = await query(panel, '.consulta-selector button:first-child');
          await call('DOM.focus', {nodeId:first});
          await press('Tab', 'Tab', 9);
          assert.equal(await evaluate(`document.activeElement.getAttribute('aria-controls')`), before.panels[p].choices[i].id);
          await press(' ', 'Space', 32, ' ');
        } else {
          await call('DOM.focus', {nodeId:button}); await enter();
        }
        s = await snapshot();
        otherPanelsUnchanged(before, s, p);
        assert.equal(s.panels[p].prompt, false);
        assert.ok(s.panels[p].buttons.every((b, j) => b.pressed === (i === j ? 'true' : 'false')));
        assert.ok(s.panels[p].choices.every((c, j) => c.shown === (i === j) && c.open === (i === j) &&
          c.brief === (i === j) && !c.innerOpen && !c.step), JSON.stringify({width, p, i, panel:s.panels[p]}));
        checkLayout(s, `${width} ejercicio ${p + 1} inciso ${letters[p][i]}`);
        if (p === 0 && i === 0) await screenshot(`${width}-seleccion-a`);
        const inner = await query(panel, `details[data-inciso="${letters[p][i]}"] > details > summary`);
        await call('DOM.focus', {nodeId:inner}); await enter();
        const expanded = await snapshot();
        otherPanelsUnchanged(s, expanded, p);
        assert.ok(expanded.panels[p].choices[i].innerOpen && expanded.panels[p].choices[i].step);
        checkLayout(expanded, `${width} ejercicio ${p + 1} pasos ${letters[p][i]}`);
      }
      // Al volver al primero, también se reinicia el último detalle abierto.
      const before = await snapshot();
      const first = await query(panels[p], '.consulta-selector button:first-child');
      await call('DOM.focus', {nodeId:first}); await enter();
      s = await snapshot();
      otherPanelsUnchanged(before, s, p);
      assert.ok(s.panels[p].choices.every(c => !c.innerOpen && !c.step));
      assert.ok(s.panels[p].choices[0].brief);
    }
    console.log(JSON.stringify({width, scriptEnabled:true, panels:10, selected:46,
      mouse:true, keyboard:'Tab/Space/Enter', resetOnSwitch:true, independent:true}));
  }

  await call('Emulation.setScriptExecutionDisabled', {value:true});
  for (const width of [1280, 390]) {
    await call('Emulation.setDeviceMetricsOverride', {width, height:900, deviceScaleFactor:1, mobile:false});
    const loaded = once('Page.loadEventFired');
    await call('Page.navigate', {url:pathToFileURL(join(root, 'evaluaciones/stewart/algebra.html')).href});
    await loaded; await call('Page.bringToFront');
    const panels = await panelNodes();
    let s = await snapshot();
    assert.equal(panels.length, 10);
    assert.equal(s.panels.length, 10);
    for (let p = 0; p < panels.length; p++) {
      assert.deepEqual(s.panels[p].choices.map(c => c.letter), [...letters[p]]);
      assert.equal(s.panels[p].buttons.length, 0);
      assert.ok(s.panels[p].choices.every(c => !c.open && !c.innerOpen && !c.brief && !c.step));
    }
    checkLayout(s, `${width} sin script inicial`);
    for (let p = 0; p < panels.length; p++) {
      for (let i = 0; i < letters[p].length; i++) {
        const outer = await query(panels[p], `details[data-inciso="${letters[p][i]}"] > summary`);
        const inner = await query(panels[p], `details[data-inciso="${letters[p][i]}"] > details > summary`);
        const before = await snapshot();
        await call('DOM.focus', {nodeId:outer});
        assert.equal(await evaluate(`document.activeElement.parentElement.id`), before.panels[p].choices[i].id);
        await enter();
        s = await snapshot();
        otherPanelsUnchanged(before, s, p);
        assert.ok(s.panels[p].choices[i].open && s.panels[p].choices[i].brief &&
          !s.panels[p].choices[i].innerOpen && !s.panels[p].choices[i].step);
        assert.ok(s.panels[p].choices.every((c, j) => i === j || (!c.open && !c.innerOpen && !c.brief && !c.step)));
        checkLayout(s, `${width} sin script ejercicio ${p + 1} inciso ${letters[p][i]}`);
        await call('DOM.focus', {nodeId:inner}); await enter();
        const expanded = await snapshot();
        otherPanelsUnchanged(s, expanded, p);
        assert.ok(expanded.panels[p].choices[i].innerOpen && expanded.panels[p].choices[i].step);
        checkLayout(expanded, `${width} sin script pasos ${p + 1}${letters[p][i]}`);
        await enter();
        await call('DOM.focus', {nodeId:outer}); await enter();
        s = await snapshot();
        assert.ok(s.panels[p].choices.every(c => !c.open && !c.innerOpen && !c.brief && !c.step));
      }
    }
    // Los detalles nativos pueden permanecer abiertos simultáneamente, incluso entre paneles.
    const first = await query(panels[0], 'details[data-inciso="a"] > summary');
    const second = await query(panels[1], 'details[data-inciso="a"] > summary');
    await mouseClick(first);
    const beforeSecond = await snapshot();
    await call('DOM.focus', {nodeId:second}); await enter();
    s = await snapshot();
    otherPanelsUnchanged(beforeSecond, s, 1);
    assert.ok(s.panels[0].choices[0].open && s.panels[0].choices[0].brief);
    assert.ok(s.panels[1].choices[0].open && s.panels[1].choices[0].brief);
    const sibling = await query(panels[0], 'details[data-inciso="b"] > summary');
    const beforeSibling = s;
    await call('DOM.focus', {nodeId:sibling}); await enter();
    s = await snapshot();
    otherPanelsUnchanged(beforeSibling, s, 0);
    assert.ok(s.panels[0].choices[0].open && s.panels[0].choices[0].brief);
    assert.ok(s.panels[0].choices[1].open && s.panels[0].choices[1].brief);
    console.log(JSON.stringify({width, scriptDisabled:true, panels:10, outerAndInnerOpened:46,
      keyboard:'Enter', mouse:true, independent:true, closedInitially:true}));
  }

  // Geometría: tres selectores de incisos y dos resoluciones únicas nativas.
  for (const enabled of [true, false]) {
    await call('Emulation.setScriptExecutionDisabled', {value:!enabled});
    for (const width of [1280, 390]) {
      await call('Emulation.setDeviceMetricsOverride', {width, height:900, deviceScaleFactor:1, mobile:false});
      const loaded = once('Page.loadEventFired');
      await call('Page.navigate', {url:pathToFileURL(join(root, 'evaluaciones/stewart/geometria.html')).href});
      await loaded; await call('Page.bringToFront');
      if (enabled) {
        const colors = await evaluate(`(() => {
          const panel = document.querySelector('.consulta-geometria');
          const button = panel.querySelector('button');
          const idle = getComputedStyle(button).backgroundColor;
          button.click();
          return {idle, selected: getComputedStyle(button).backgroundColor,
            panel: getComputedStyle(panel).backgroundColor};
        })()`);
        assert.match(colors.idle, /^rgba\(144, 189, 242, /, 'el fondo de botones de Geometría debe ser azul');
        assert.equal(colors.selected, 'rgb(144, 189, 242)', 'la selección de Geometría debe ser azul');
        assert.match(colors.panel, /^rgba\(144, 189, 242, /, 'el panel de Geometría debe tener un matiz azul');
        const reloaded = once('Page.loadEventFired');
        await call('Page.navigate', {url:pathToFileURL(join(root, 'evaluaciones/stewart/geometria.html')).href});
        await reloaded;
      }
      const doc = (await call('DOM.getDocument')).root.nodeId;
      const panels = (await call('DOM.querySelectorAll', {nodeId:doc, selector:'.consulta-geometria'})).nodeIds;
      assert.equal(panels.length, 5);
      const geoSnapshot = () => evaluate(`(() => {
        const shown = e => !!e && e.checkVisibility({visibilityProperty:true}) && e.getBoundingClientRect().height > 0;
        return {width:document.documentElement.clientWidth, scroll:document.documentElement.scrollWidth,
          panels:[...document.querySelectorAll('.consulta-geometria')].map(p => ({
            buttons:[...p.querySelectorAll('button')].map(b=>b.getAttribute('aria-pressed')),
            choices:[...p.querySelectorAll(':scope > details')].map(d=>({open:d.open, hidden:d.hidden,
              brief:shown(d.querySelector(':scope > p')), inner:d.querySelector(':scope > details').open,
              steps:shown(d.querySelector(':scope > details > p'))}))}))};
      })()`);
      let state = await geoSnapshot();
      assert.ok(state.scroll <= state.width);
      assert.deepEqual(state.panels.map(p=>p.choices.length), [4,1,1,6,6]);
      assert.ok(state.panels.every(p=>p.choices.every(c=>!c.open && !c.brief && !c.inner && !c.steps)));
      await evaluate(`document.querySelector('.consulta-geometria').scrollIntoView({block:'start'})`);
      await screenshot(`geometria-${width}-${enabled ? 'js' : 'sin-js'}-inicial`);
      for (let p=0; p<5; p++) {
        const single = p===1 || p===2;
        const count = state.panels[p].choices.length;
        for (let i=0; i<count; i++) {
          const before = await geoSnapshot();
          const target = await query(panels[p], enabled && !single
            ? `.consulta-selector button:nth-child(${i+1})`
            : `:scope > details:nth-of-type(${i+1}) > summary`);
          if (i===0 && p%2===0) await mouseClick(target);
          else if (enabled && !single && i===1) {
            const first = await query(panels[p], '.consulta-selector button:first-child');
            await call('DOM.focus', {nodeId:first}); await press('Tab', 'Tab', 9);
            assert.equal(await evaluate(`document.activeElement.getAttribute('aria-controls')`), `geo-${p+1}-b`);
            await press(' ', 'Space', 32, ' ');
          } else { await call('DOM.focus', {nodeId:target}); await enter(); }
          state = await geoSnapshot();
          before.panels.forEach((v,j)=>{if (j!==p) assert.deepEqual(state.panels[j],v);});
          assert.ok(state.panels[p].choices[i].open && state.panels[p].choices[i].brief);
          assert.equal(state.panels[p].choices[i].inner, false);
          if (enabled && !single) {
            assert.equal(state.panels[p].buttons.filter(v=>v==='true').length,1);
            assert.ok(state.panels[p].choices.every((c,j)=>(j===i || (!c.open && !c.brief)) && !c.inner && !c.steps));
          }
          const inner = await query(panels[p], `:scope > details:nth-of-type(${i+1}) > details > summary`);
          await call('DOM.focus', {nodeId:inner}); await enter();
          state = await geoSnapshot();
          assert.ok(state.panels[p].choices[i].inner && state.panels[p].choices[i].steps);
          assert.ok(state.scroll <= state.width);
          if (!enabled || single) {
            await enter(); await call('DOM.focus', {nodeId:target}); await enter();
          }
        }
      }
      await evaluate(`document.querySelector('.consulta-geometria').scrollIntoView({block:'start'})`);
      await screenshot(`geometria-${width}-${enabled ? 'js' : 'sin-js'}`);
      console.log(JSON.stringify({page:'geometria', width, scriptEnabled:enabled, tasks:18, mouse:true, keyboard:enabled ? 'Tab/Space/Enter' : 'Enter', independent:true}));
    }
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
