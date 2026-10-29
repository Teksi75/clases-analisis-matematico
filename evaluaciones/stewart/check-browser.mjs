// Comprobación local con Chromium y DevTools; sin paquetes ni servicios remotos.
import { spawn, spawnSync } from 'node:child_process';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const folder = dirname(fileURLToPath(import.meta.url));
const visual = await mkdtemp(join(tmpdir(), 'stewart-navegacion-'));
const profile = await mkdtemp(join(tmpdir(), 'stewart-navegacion-perfil-'));
console.log('Perfil temporal: ' + profile);
const browser = spawn('/usr/bin/chromium', ['--headless', '--no-sandbox', '--disable-gpu',
  '--no-first-run', '--disable-background-networking', '--remote-debugging-port=0',
  '--user-data-dir=' + profile, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
let ws, deadline, failures = 0;
const timeout = new Promise((_, reject) => { deadline = setTimeout(() => reject(new Error('Tiempo máximo de 180 s agotado')), 180000); });
try {
  await Promise.race([timeout, (async () => {
    const endpoint = await new Promise((resolve, reject) => {
      let text = '';
      browser.stderr.on('data', chunk => {
        text += chunk;
        const match = text.match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (match) resolve(match[1]);
      });
      browser.once('error', reject);
      browser.once('exit', code => reject(new Error('Chromium terminó: ' + code)));
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
      pending.set(++id, {resolve, reject}); ws.send(JSON.stringify({id, method, params}));
    });
    const once = method => new Promise(resolve => events.set(method, resolve));
    const evalJS = async expression => {
      const result = await call('Runtime.evaluate', {expression, awaitPromise:true, returnByValue:true});
      if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
      return result.result.value;
    };
    const ready = () => evalJS('document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))).then(() => true)');
    const navigate = async name => {
      const loaded = once('Page.loadEventFired');
      const path = name === 'modelo' ? join(folder, '../../teoria/index.html') : join(folder, name + '.html');
      await call('Page.navigate', {url:pathToFileURL(path).href + (name === 'modelo' ? '#funciones' : '')});
      await loaded; await ready();
    };
    const clickPage = async selector => {
      const loaded = once('Page.loadEventFired');
      await evalJS(`document.querySelector(${JSON.stringify(selector)}).click()`);
      await loaded; await ready();
    };
    const screenshot = async name => {
      const shot = await call('Page.captureScreenshot', {format:'png'});
      await writeFile(join(visual, name + '.png'), Buffer.from(shot.data, 'base64'));
    };
    const print = async name => {
      const pdf = await call('Page.printToPDF', {printBackground:true});
      const path = join(visual, name + '-impresion.pdf');
      await writeFile(path, Buffer.from(pdf.data, 'base64'));
      const raster = spawnSync('/usr/bin/pdftoppm', ['-f','1','-l','1','-singlefile','-png','-r','90',path,join(visual,name+'-impresion')], {encoding:'utf8'});
      if (raster.status !== 0) throw new Error('pdftoppm: ' + raster.stderr);
      return Math.floor(pdf.data.length * 3 / 4);
    };
    await call('Page.enable'); await call('Network.enable');
    await call('Network.setBlockedURLs', {urls:['http://*', 'https://*']});
    const names = ['index', 'algebra', 'geometria', 'funciones', 'trigonometria'];
    for (const width of [1280, 390]) {
      await call('Emulation.setDeviceMetricsOverride', {width, height:900, deviceScaleFactor:1, mobile:false});
      await call('Emulation.setEmulatedMedia', {media:'screen'});
      for (const name of names) {
        await navigate(name);
        await screenshot(name + '-' + width + '-portada');
        if (name !== 'index') {
          const selector = name === 'funciones' ? 'svg.study-plot' : name === 'geometria' ? '#ejercicio-5' : name === 'trigonometria' ? 'figure img' : '#ejercicio-1';
          await evalJS(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'start'})`);
          await ready(); await screenshot(name + '-' + width + '-interior');
        }
        const result = await evalJS(`(async () => {
          const maths = [...document.querySelectorAll('math')];
          const images = [...document.querySelectorAll('img')];
          const embedded = [...document.querySelectorAll('svg image')];
          const raster = await Promise.all(embedded.map(e => new Promise(resolve => {
            const img = new Image(); img.onload = () => resolve({href:e.getAttribute('href'), ok:img.naturalWidth>0, width:img.naturalWidth});
            img.onerror = () => resolve({href:e.getAttribute('href'), ok:false}); img.src=e.href.baseVal;
          })));
          const intentionallyHidden = m => !!m.closest('[hidden]') || [...m.closest('article').querySelectorAll('details:not([open])')].some(d => d.contains(m) && !d.querySelector(':scope > summary')?.contains(m));
          const badMath = maths.filter(m => { if (intentionallyHidden(m)) return false; const r=m.getBoundingClientRect(); return r.width<=0 || r.height<=0; }).length;
          const widest = maths.reduce((a,m) => Math.max(a,m.getBoundingClientRect().width),0);
          return {width:document.documentElement.clientWidth, scroll:document.documentElement.scrollWidth,
            math:maths.length, badMath, widestMath:Math.round(widest), images:images.map(i=>({src:i.getAttribute('src'),ok:i.complete && i.naturalWidth>0})), raster,
            nav:[...document.querySelectorAll('nav a')].map(a=>a.getAttribute('href'))};
        })()`);
        if (result.scroll > result.width || result.badMath || result.images.some(i=>!i.ok) || result.raster.some(i=>!i.ok)) failures++;
        if (name === 'index') {
          for (const exam of names.slice(1)) {
            await clickPage(`a[href="${exam}.html"]`);
            if (!(await evalJS(`location.pathname.endsWith('/${exam}.html')`))) failures++;
            await clickPage('nav a[href="index.html"]');
            if (!(await evalJS(`location.pathname.endsWith('/index.html')`))) failures++;
          }
        } else {
          await evalJS(`document.querySelector('nav a[href="#ejercicio-1"]').click()`);
          const anchor = await evalJS(`({hash:location.hash, visible:!!document.querySelector('#ejercicio-1') && document.querySelector('#ejercicio-1').getBoundingClientRect().height>0,
            key:!!document.querySelector('#respuestas-del-libro, a[href="#respuestas-del-libro"]'), errata:document.body.innerText.toLowerCase().includes('errata')})`);
          if (anchor.hash !== '#ejercicio-1' || !anchor.visible || anchor.key || anchor.errata) failures++;
          result.anchor = anchor;
        }
        console.log(JSON.stringify({mode:'screen', page:name, ...result}));
      }
      await navigate('modelo');
      const direct = await evalJS(`(() => {
        const link = document.querySelector('#funciones .related-diagnostics a');
        const r = link.getBoundingClientRect();
        return {hash: location.hash, visible: r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0,
          width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth};
      })()`);
      if (direct.hash !== '#funciones' || !direct.visible || direct.scroll > direct.width) failures++;
      await screenshot('modelo-' + width + '-funciones');
      await clickPage('#funciones .related-diagnostics a');
      await evalJS(`document.querySelector('.exam-cards').scrollIntoView({block:'start'})`);
      await ready(); await screenshot('recorrido-' + width + '-tarjetas');
      const cards = await evalJS(`(() => ({count:document.querySelectorAll('.exam-cards a').length,
        width:document.documentElement.clientWidth, scroll:document.documentElement.scrollWidth}))()`);
      if (cards.count !== 4 || cards.scroll > cards.width) failures++;
      await clickPage('.exam-cards a[href="funciones.html"]');
      const trail = await evalJS(`document.querySelector('.breadcrumbs').innerText`);
      if (!trail.includes('Diagnósticos de Stewart') || !trail.includes('Funciones')) failures++;
      await clickPage('.breadcrumbs a[href="../../teoria/index.html#funciones"]');
      if (!(await evalJS(`location.pathname.endsWith('/teoria/index.html') && location.hash === '#funciones'`))) failures++;
      console.log(JSON.stringify({mode:'route', width, direct, cards, trail}));
    }
    await call('Emulation.setEmulatedMedia', {media:'print'});
    for (const name of names) {
      await navigate(name);
      const result = await evalJS(`(() => ({background:getComputedStyle(document.body).backgroundColor,
        math:document.querySelectorAll('math').length,
        badMath:[...document.querySelectorAll('math')].filter(m=>{if (m.closest('[hidden]') || [...m.closest('article').querySelectorAll('details:not([open])')].some(d=>d.contains(m) && !d.querySelector(':scope > summary')?.contains(m))) return false; const r=m.getBoundingClientRect();return r.width<=0||r.height<=0}).length,
        images:[...document.querySelectorAll('img, svg image')].length,
        answers:!!document.querySelector('#respuestas-del-libro') && getComputedStyle(document.querySelector('#respuestas-del-libro')).display!=='none'}))()`);
      if (name === 'algebra') {
        result.panels = await evalJS(`(() => {
          const panels = [...document.querySelectorAll('[data-consulta-incisos]')];
          const shown = e => !!e && e.checkVisibility({visibilityProperty:true}) && e.getBoundingClientRect().height > 0;
          return panels.map((panel, i) => {
            const heading = document.querySelector('#ejercicio-' + (i + 1));
            const choices = [...panel.querySelectorAll(':scope > details[data-inciso]')];
            return {heading:shown(heading), prompt:shown(panel.querySelector('.consulta-prompt')),
              selected:panel.querySelectorAll('button[aria-pressed="true"]').length,
              visibleAnswers:choices.filter(d => shown(d) || shown(d.querySelector(':scope > p'))).length};
          });
        })()`);
        if (result.panels.length !== 10 || result.panels.some(p => !p.heading || !p.prompt || p.selected || p.visibleAnswers)) failures++;
      }
      if (name === 'geometria') {
        result.panels = await evalJS(`(() => {
          const shown = e => !!e && e.checkVisibility({visibilityProperty:true}) && e.getBoundingClientRect().height > 0;
          return [...document.querySelectorAll('.consulta-geometria')].map(panel => {
            const choices = [...panel.querySelectorAll(':scope > details')];
            return {count:choices.length, answers:choices.filter(d => shown(d.querySelector(':scope > p'))).length,
              selected:panel.querySelectorAll('button[aria-pressed="true"]').length};
          });
        })()`);
        if (result.panels.length !== 5 || result.panels.some(p => p.answers || p.selected)) failures++;
      }
      result.pdfBytes = await print(name);
      const navigationHidden = await evalJS(`getComputedStyle(document.querySelector('.breadcrumbs')).display === 'none'`);
      if (result.background !== 'rgb(255, 255, 255)' || result.badMath || result.pdfBytes < 1000 || !navigationHidden || result.answers) failures++;
      console.log(JSON.stringify({mode:'print', page:name, ...result}));
      if (name === 'geometria') {
        const selected = await evalJS(`(() => {
          const shown = e => !!e && e.checkVisibility({visibilityProperty:true}) && e.getBoundingClientRect().height > 0;
          return [...document.querySelectorAll('.consulta-geometria')].map(panel => {
            const button = panel.querySelector('.consulta-selector button');
            const choice = panel.querySelector(':scope > details');
            if (button) button.click(); else choice.open = true;
            return {answer:shown(choice.querySelector(':scope > p')), steps:choice.querySelector(':scope > details').open};
          });
        })()`);
        const pdfBytes = await print('geometria-selecciones');
        if (selected.length !== 5 || selected.some(p => !p.answer || p.steps) || pdfBytes < 1000) failures++;
        console.log(JSON.stringify({mode:'print-selected', page:name, panels:selected, pdfBytes}));
      }
      if (name === 'algebra') {
        // Imprimir también con una respuesta por ejercicio seleccionada, sin abrir los pasos.
        const selected = await evalJS(`(() => {
          const panels = [...document.querySelectorAll('[data-consulta-incisos]')];
          panels.forEach(panel => panel.querySelector('.consulta-selector button').click());
          const shown = e => !!e && e.checkVisibility({visibilityProperty:true}) && e.getBoundingClientRect().height > 0;
          return panels.map(panel => {
            const choices = [...panel.querySelectorAll(':scope > details[data-inciso]')];
            const math = [...choices[0].querySelectorAll(':scope > p math')];
            return {pressed:panel.querySelectorAll('button[aria-pressed="true"]').length,
              visibleAnswers:choices.filter(d => shown(d.querySelector(':scope > p'))).length,
              firstVisible:shown(choices[0].querySelector(':scope > p')),
              stepsOpen:choices.some(d => d.querySelector(':scope > details').open),
              math:math.length, badMath:math.filter(m => m.namespaceURI !== 'http://www.w3.org/1998/Math/MathML' ||
                !shown(m) || m.getBoundingClientRect().width <= 0).length};
          });
        })()`);
        const pdfBytes = await print('algebra-selecciones');
        if (selected.length !== 10 || selected.some(p => p.pressed !== 1 || p.visibleAnswers !== 1 ||
            !p.firstVisible || p.stepsOpen || !p.math || p.badMath) || pdfBytes < 1000) failures++;
        console.log(JSON.stringify({mode:'print-selected', page:name, panels:selected, pdfBytes}));
      }
    }
    await navigate('modelo');
    console.log(JSON.stringify({mode:'print', page:'modelo', pdfBytes:await print('modelo')}));
    console.log('Imágenes y PDF: ' + visual);
    console.log('Comprobaciones fallidas: ' + failures);
    if (failures) process.exitCode = 1;
  })()]);
} catch (error) {
  console.error(error); process.exitCode = 1;
} finally {
  clearTimeout(deadline); ws?.close();
  const exited = new Promise(resolve => browser.once('exit', resolve));
  browser.kill();
  if (browser.exitCode === null) await exited;
}
