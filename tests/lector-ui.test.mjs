import assert from 'node:assert/strict';
import { withBrowser } from './lector-browser-helper.mjs';

const stub = `
  window.spoken = [];
  window.voices = [];
  window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  const events = new EventTarget();
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
    getVoices: () => window.voices,
    addEventListener: (...args) => events.addEventListener(...args),
    removeEventListener: (...args) => events.removeEventListener(...args),
    speak: u => window.spoken.push(u), cancel: () => {},
    pause: () => window.pauses = (window.pauses || 0) + 1,
    resume: () => window.resumes = (window.resumes || 0) + 1,
    changed: () => events.dispatchEvent(new Event('voiceschanged'))
  }});
`;
const ready = async evaluate => {
  for (let i = 0; i < 100; i++) {
    if (await evaluate('!!document.querySelector("[data-lector]")')) return;
    await new Promise(r => setTimeout(r, 50));
  }
  assert.fail('No se montó el lector');
};

await withBrowser(async ({ evaluate, call }) => {
  await ready(evaluate);
  const run = expression => evaluate(`(() => { ${expression} })()`);
  assert.equal(await run('return spoken.length'), 0, 'sin reproducción automática');
  assert.match(await run('return document.querySelector("[data-lector-voices-status]").textContent'), /español/i);
  await run(`voices = [{name:'Inglés',lang:'en-US',voiceURI:'en'}, {name:'México',lang:'es-MX',voiceURI:'mx'}, {name:'España',lang:'es-ES',voiceURI:'es'}]; speechSynthesis.changed();`);
  assert.match(await run('return document.querySelector("[data-lector-voices-status]").textContent'), /argentina/i);
  assert.equal(await run('return document.querySelector("[data-lector-voice]").options.length'), 2);
  await run(`voices.push({name:'Argentina',lang:'es-AR',voiceURI:'ar'}); speechSynthesis.changed();`);
  assert.equal(await run('return document.querySelector("[data-lector-voice]").value'), 'ar');
  await run(`const s=document.querySelector('[data-lector-voice]'); s.value='mx'; s.dispatchEvent(new Event('change')); const r=document.querySelector('[data-lector-rate]'); r.value='1.25'; r.dispatchEvent(new Event('input'));`);
  await run(`document.querySelector('[data-lector-chapter]').selectedIndex=1; document.querySelector('[data-lector-chapter]').dispatchEvent(new Event('change'));`);
  assert.equal(await run('return document.querySelector("[data-lector-block]").selectedIndex'), 0);
  await run(`document.querySelector('[data-lector-play]').focus();`);
  await call('Page.bringToFront');
  await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', text: '\r', windowsVirtualKeyCode: 13 });
  await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  assert.equal(await run('return document.activeElement.matches("[data-lector-play]")'), true);
  assert.equal(await run('return document.querySelector("[data-lector-block]").selectedOptions[0].textContent.includes(spoken[0].text.slice(0, 30))'), true, 'inicio de capítulo');
  await run(`document.querySelector('[data-lector-stop]').click(); spoken.length=0; const s=document.querySelector('[data-lector-block]'); s.selectedIndex=2; s.dispatchEvent(new Event('change'));`);
  const selected = await run('return document.querySelector("[data-lector-block]").value');
  const chapter = await run('return document.querySelector("[data-lector-chapter]").value');
  await run(`document.querySelector('[data-lector-play]').focus(); document.querySelector('[data-lector-play]').click();`);
  assert.equal(await run('return document.activeElement.matches("[data-lector-play]")'), true);
  assert.equal(await run('return spoken[0].voice.voiceURI'), 'mx');
  assert.equal(await run('return spoken[0].rate'), 1.25);
  assert.equal(await run('return document.querySelector("[data-lector-block]").selectedOptions[0].textContent.includes(spoken[0].text.slice(0, 30))'), true, 'inicio del bloque elegido');
  assert.equal(await run('return document.querySelectorAll(".lector-activo").length'), 1);
  await run(`document.querySelector('[data-lector-pause]').click(); document.querySelector('[data-lector-resume]').click();`);
  assert.deepEqual(await run('return [spoken.length, pauses, resumes]'), [1, 1, 1]);
  await run(`window.old = spoken.at(-1); document.querySelector('[data-lector-next]').click(); window.count = spoken.length; old.onend();`);
  assert.equal(await run('return spoken.length'), await run('return count'), 'evento obsoleto ignorado');
  await run(`document.querySelector('[data-lector-previous]').click(); document.querySelector('[data-lector-stop]').click();`);
  assert.equal(await run('return document.querySelectorAll(".lector-activo").length'), 0);
  assert.equal(await run('return document.querySelector("[data-lector-block]").value'), selected);
  await call('Page.reload');
  await ready(evaluate);
  assert.equal(await run('return spoken.length'), 0, 'recarga sin reproducción');
  assert.equal(await run('return document.querySelector("[data-lector-block]").value'), selected);
  assert.equal(await run('return document.querySelector("[data-lector-chapter]").value'), chapter);
  await run(`voices=[{name:'España',lang:'es-ES',voiceURI:'es'}]; speechSynthesis.changed();`);
  await run(`voices.push({name:'México',lang:'es-MX',voiceURI:'mx'}); speechSynthesis.changed();`);
  assert.equal(await run('return document.querySelector("[data-lector-voice]").value'), 'mx');
  const details = await run(`const d=document.querySelector('article details'); return !!d && !d.open`);
  assert.equal(details, true);
  await run(`document.querySelector('[data-lector-play]').click(); document.querySelector('article details').open=true;`);
  await new Promise(r => setTimeout(r, 100));
  assert.equal(await run('return document.querySelectorAll(".lector-activo").length'), 0);
  assert.match(await run('return document.querySelector("[data-lector-status]").textContent'), /reproducir/i);
  assert.equal(await run('return document.querySelector("article details").open'), true);
  await run(`window.beforeClose=spoken.length; document.querySelector('article details').open=false;`);
  await new Promise(r => setTimeout(r, 100));
  assert.equal(await run('return spoken.length'), await run('return beforeClose'));
  assert.equal(await run('return document.querySelector("article details").open'), false);
  // Anchos CSS de viewport, no evidencia de zoom real del navegador.
  for (const width of [390, 1280, 640]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width === 390 });
    assert.equal(await run('return document.documentElement.scrollWidth <= innerWidth'), true, `overflow del documento ${width}`);
    const layout = await run(`
      const panel = document.querySelector('[data-lector]'), p = panel.getBoundingClientRect();
      const controls = [...panel.querySelectorAll('button, select, input')];
      return { panelVisible: p.left >= 0 && p.right <= document.documentElement.clientWidth + 1,
        controls: controls.length,
        usable: controls.every(e => { const r = e.getBoundingClientRect();
          return r.left >= p.left - 1 && r.right <= p.right + 1 && r.width >= 24 && r.height >= 24 &&
            e.scrollWidth <= e.clientWidth + 1 && (e.labels?.length || e.textContent.trim()); }) };
    `);
    assert.deepEqual(layout, { panelVisible: true, controls: 10, usable: true }, `controles ${width}`);
    if (width === 390) {
      const before = await run('return spoken.length');
      await run(`document.querySelector('[data-lector-play]').click();`);
      assert.equal(await run('return spoken.length'), before + 1, 'reproducción a 390px');
      await run(`document.querySelector('[data-lector-stop]').click();`);
    }
  }
  assert.equal(await run('const b=document.querySelector("#texto-mas"); b.click(); return document.querySelector("#texto-tamano").textContent'), '110%');
  assert.ok(await run('return document.querySelectorAll("main article").length') >= 8);
  console.log('PASS lector UI: selección, voces, persistencia, navegación, detalles y diseño');
}, { beforeNavigate: stub });

await withBrowser(async ({ evaluate }) => {
  await ready(evaluate);
  assert.match(await evaluate('document.querySelector("[data-lector-status]").textContent'), /disponible/i);
  assert.match(await evaluate(`document.querySelector('[data-lector-play]').click(); document.querySelector('[data-lector-status]').textContent`), /disponible/i);
  assert.ok(await evaluate('document.querySelectorAll("main article p").length') > 100);
  console.log('PASS lector UI: API ausente');
}, { beforeNavigate: `Object.defineProperty(window,'speechSynthesis',{value:undefined}); Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined}); Object.defineProperty(window,'localStorage',{get(){throw Error('bloqueado')}});` });

await withBrowser(async ({ evaluate }) => {
  await ready(evaluate);
  assert.equal(await evaluate('document.querySelector("[data-lector-rate]").value'), '1');
  assert.equal(await evaluate('spoken.length'), 0);
  console.log('PASS lector UI: almacenamiento malformado');
}, { beforeNavigate: stub + `try { localStorage.setItem('lector-fluidos', '{'); } catch {}` });
