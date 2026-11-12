import assert from 'node:assert/strict';
import { withBrowser } from './lector-browser-helper.mjs';

const stub = `
  window.spoken = []; window.voices = []; window.cancels = 0; window.pauses = 0; window.resumes = 0; window.activeSpeech = null; window.concurrentSpeech = 0; window.maxConcurrentSpeech = 0;
  window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
  const events = new EventTarget();
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
    getVoices: () => window.voices,
    addEventListener: (...args) => events.addEventListener(...args),
    removeEventListener: (...args) => events.removeEventListener(...args),
    speak: u => { window.concurrentSpeech++; window.maxConcurrentSpeech=Math.max(window.maxConcurrentSpeech, window.concurrentSpeech); window.activeSpeech=u; for (const name of ['onend','onerror']) { const callback=u[name]; u[name]=event => { if (window.activeSpeech===u) { window.concurrentSpeech--; window.activeSpeech=null; } callback(event); }; } window.spoken.push(u); },
    cancel: () => { window.cancels++; window.concurrentSpeech=0; window.activeSpeech=null; },
    pause: () => window.pauses++, resume: () => window.resumes++,
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

await withBrowser(async ({ evaluate, call, screenshot }) => {
  await ready(evaluate);
  await call('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  const run = expression => evaluate(`(() => { ${expression} })()`);
  const click = name => run(`document.querySelector('[data-lector-${name}]').click()`);
  const visible = name => run(`const e=document.querySelector('[data-lector-${name}]'); return !!e && !!e.getClientRects().length`);
  assert.equal(await visible('open'), true, 'F1: Escuchar disponible');
  assert.equal(await visible('bar'), false, 'F1: cerrado inicialmente');
  assert.equal(await run('return spoken.length'), 0, 'F1: silencio inicial');
  assert.equal(await run('return document.querySelectorAll(".lector-activo").length'), 0);
  assert.equal(await run('return parseFloat(getComputedStyle(document.body).paddingBottom)'), 0, 'F1: sin espacio');
  await screenshot('closed');
  const opened = await run(`const before=scrollY; document.querySelector('[data-lector-open]').click(); return [before,scrollY]`);
  assert.equal(opened[0], opened[1], 'abrir no desplaza');
  assert.equal(await visible('bar'), true, 'F2: barra abierta');
  assert.equal(await run('return spoken.length'), 0, 'F3: abrir no reproduce');
  assert.equal(await run('return document.querySelectorAll(".lector-activo").length'), 0, 'F3: abrir no resalta');
  assert.ok(await run('return parseFloat(getComputedStyle(document.body).paddingBottom)') > 0, 'espacio con barra');
  await screenshot('desktop');
  assert.match(await run('return document.querySelector("[data-lector-voices-status]").textContent'), /español/i);
  await run(`voices = [{name:'Inglés',lang:'en-US',voiceURI:'en'}, {name:'México',lang:'es-MX',voiceURI:'mx'}, {name:'España',lang:'es-ES',voiceURI:'es'}]; speechSynthesis.changed();`);
  assert.match(await run('return document.querySelector("[data-lector-voices-status]").textContent'), /argentina/i);
  await run(`voices.push({name:'Argentina',lang:'es-AR',voiceURI:'ar'}); speechSynthesis.changed();`);
  assert.equal(await run('return document.querySelector("[data-lector-voice]").value'), 'ar');
  await click('settings-toggle');
  await run(`const s=document.querySelector('[data-lector-voice]'); s.value='mx'; s.dispatchEvent(new Event('change')); const r=document.querySelector('[data-lector-rate]'); r.value='1.2'; r.dispatchEvent(new Event('change'));`);
  await run(`document.querySelector('[data-lector-play]').focus();`);
  await call('Page.bringToFront');
  await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', text: '\r', windowsVirtualKeyCode: 13 });
  await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  assert.equal(await run('return spoken.length'), 1, 'F4: reproducción por teclado');
  assert.equal(await run('return spoken[0].voice.voiceURI'), 'mx');
  assert.equal(await run('return spoken[0].rate'), 1.2);
  assert.equal(await evaluate(`import('../lectura/extractor.js').then(({extractBlocks}) => extractBlocks(document.querySelector('main#contenido'), {contentSelector:':scope > article', chapterSelector:'article', chapterHeadingSelector:'h1, h2', sectionHeadingSelector:'h3, h4, h5, h6', excludeSelector:'.chapter-label'})[0].text.startsWith(spoken[0].text))`), true, 'F18: reproducción usa la extracción existente');
  assert.equal(await run('return document.querySelectorAll(".lector-activo").length'), 1);
  await click('play');
  assert.equal(await run('return pauses'), 1, 'F5: pausa');
  await run('window.pausedEnd=spoken.at(-1); pausedEnd.onend()');
  assert.equal(await run('return spoken.length'), 1, 'onend nativo en pausa no avanza');
  await click('play');
  assert.deepEqual(await run('return [spoken.length, resumes]'), [2, 1], 'F5: reanudar después del onend');
  await run('window.old=spoken.at(-1); window.previousText=spoken.at(-1).text');
  await click('next');
  assert.equal(await run('return spoken.length'), 3, 'F6: siguiente');
  assert.notEqual(await run('return spoken.at(-1).text'), await run('return previousText'), 'siguiente cambia de bloque');
  await run('old.onend(); old.onerror({error:"late"})');
  assert.equal(await run('return spoken.length'), 3, 'F17: eventos obsoletos');
  await click('previous');
  assert.equal(await run('return spoken.length'), 4, 'F6: anterior');
  assert.equal(await run('return spoken.at(-1).text'), await run('return previousText'), 'anterior vuelve al bloque');
  await click('minimize');
  assert.equal(await visible('bar'), false);
  assert.equal(await visible('mini'), true, 'F7: minimizado');
  assert.equal(await run('return spoken.length'), 4, 'F7: continúa');
  await screenshot('minimized');
  await click('mini-play');
  assert.equal(await run('return pauses'), 2, 'F8: pausa minimizada');
  await click('restore');
  assert.equal(await visible('bar'), true);
  assert.equal(await run('return document.activeElement.matches("[data-lector-minimize]")'), true, 'foco al restaurar');
  await click('play');
  await run('window.beforeClose=spoken.at(-1); window.scrollTo(0, 1500)');
  const cancels = await run('return cancels');
  const scroll = await run(`const before=scrollY; document.querySelector('[data-lector-close]').click(); return [before, scrollY]`);
  assert.ok(await run('return cancels') > cancels, 'F9: cancelación');
  assert.equal(await run('return document.querySelectorAll(".lector-activo").length'), 0, 'F10: sin resaltado');
  assert.equal(scroll[1], scroll[0], 'F11: scroll intacto');
  assert.equal(await visible('bar'), false, 'F12: sin barra');
  assert.equal(await visible('mini'), false);
  assert.equal(await run('return parseFloat(getComputedStyle(document.body).paddingBottom)'), 0, 'F12: sin espacio');
  assert.equal(await run('return document.activeElement.matches("[data-lector-open]")'), true);
  await run('window.n=spoken.length; beforeClose.onend(); beforeClose.onerror({error:"late"}); speechSynthesis.changed()');
  assert.equal(await run('return spoken.length'), await run('return n'), 'F17: cierre invalida eventos');
  assert.equal(await run('return maxConcurrentSpeech'), 1, 'F16: nunca hay dos emisiones activas');
  await call('Page.reload'); await ready(evaluate);
  assert.equal(await visible('bar'), false, 'F13: recarga cerrada');
  assert.equal(await run('return spoken.length'), 0);
  await click('open');
  await run(`voices=[{name:'España',lang:'es-ES',voiceURI:'es'}]; speechSynthesis.changed(); voices.push({name:'México',lang:'es-MX',voiceURI:'mx'}); speechSynthesis.changed();`);
  assert.equal(await run('return document.querySelector("[data-lector-voice]").value'), 'mx', 'F14: voz persistente tardía');
  assert.equal(await run('return document.querySelector("[data-lector-rate]").value'), '1.2', 'F15: velocidad persistente');
  assert.equal(await run('return !!document.querySelector("article details:not([open])")'), true);
  await click('play');
  await run(`document.querySelector('article details').open=true`);
  await new Promise(r => setTimeout(r, 100));
  assert.equal(await run('return document.querySelectorAll(".lector-activo").length'), 0, 'resolución detiene');
  assert.match(await run('return document.querySelector("[data-lector-status]").textContent'), /reproducir/i);
  assert.equal(await run('return document.querySelector("article details").open'), true);
  await run(`window.n=spoken.length; document.querySelector('article details').open=false`);
  await new Promise(r => setTimeout(r, 100));
  assert.equal(await run('return spoken.length'), await run('return n'));
  for (const width of [320, 375, 1280]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 400 });
    assert.equal(await run('return document.documentElement.scrollWidth <= innerWidth'), true, `F19: sin desborde ${width}`);
    const layout = await run(`const p=document.querySelector('[data-lector-bar]').getBoundingClientRect(); const controls=[...document.querySelectorAll('[data-lector-bar] button, [data-lector-bar] select')].filter(e=>e.getClientRects().length); return { inside:p.left>=0 && p.right<=innerWidth+1, usable:controls.every(e=>{const r=e.getBoundingClientRect(); return r.width>=24 && r.height>=24 && r.left>=p.left-1 && r.right<=p.right+1}) };`);
    assert.deepEqual(layout, {inside:true, usable:true}, `F19: controles ${width}`);
    const heights = await run(`const p=document.querySelector('[data-lector-bar]').getBoundingClientRect(); return [p.height, parseFloat(getComputedStyle(document.body).paddingBottom)]`);
    assert.ok(Math.abs(heights[0]-heights[1]) < 1, `reserva igual a barra ${width}`);
    if (width === 375) await screenshot('mobile');
    if (width === 1280) assert.ok(heights[0] >= 60 && heights[0] <= 80, 'altura escritorio');
  }
  assert.equal(await run('const b=document.querySelector("#texto-mas"); b.click(); return document.querySelector("#texto-tamano").textContent'), '110%');
  assert.equal(await run(`const link=document.querySelector('.contents a[href^="#"]'); link.click(); return location.hash === link.hash && !!document.getElementById(decodeURIComponent(link.hash.slice(1)))`), true, 'F20: navegación convencional');
  await click('settings-toggle');
  const nearBottom = await run(`scrollTo(0, document.documentElement.scrollHeight-innerHeight-parseFloat(getComputedStyle(document.body).paddingBottom)-20); const y=scrollY; document.querySelector('[data-lector-close]').click(); return [y, scrollY]`);
  assert.equal(nearBottom[0], nearBottom[1], 'cierre con configuración cerca del final');
  // Excepción F11 aceptada: fuera del nuevo rango sólo puede conservarse el máximo.
  for (const mode of ['bar', 'settings', 'mini']) {
    await click('open');
    if (mode === 'settings') await click('settings-toggle');
    if (mode === 'mini') await click('minimize');
    await call('Runtime.evaluate', {
      expression: 'new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))',
      awaitPromise: true,
    });
    const boundary = await run(`
      scrollTo({ top: document.scrollingElement.scrollHeight, behavior: 'instant' });
      const before = scrollY;
      const maximumBefore = document.scrollingElement.scrollHeight - innerHeight;
      const reserveBefore = parseFloat(getComputedStyle(document.body).paddingBottom);
      document.querySelector('[data-lector-${mode === 'mini' ? 'mini-close' : 'close'}]').click();
      const maximumAfter = document.scrollingElement.scrollHeight - innerHeight;
      return { before, maximumBefore, maximumAfter, after: scrollY, reserveBefore,
        reserveAfter: parseFloat(getComputedStyle(document.body).paddingBottom),
        highlighted: document.querySelectorAll('.lector-activo').length };
    `);
    assert.equal(boundary.before, boundary.maximumBefore, `F11: extremo absoluto ${mode}`);
    assert.ok(boundary.before > boundary.maximumAfter, `F11: rango reducido ${mode}`);
    assert.equal(boundary.after, Math.min(boundary.before, boundary.maximumAfter), `F11: sólo ajuste al nuevo máximo ${mode}`);
    assert.ok(Math.abs(boundary.maximumBefore - boundary.maximumAfter - boundary.reserveBefore) < 1.1, `F11: reducción sólo por reserva ${mode}`);
    assert.equal(boundary.reserveAfter, 0, `F12: sin reserva en el extremo ${mode}`);
    assert.equal(boundary.highlighted, 0, `F10: sin resaltado en el extremo ${mode}`);
    assert.equal(await visible('bar'), false);
    assert.equal(await visible('mini'), false);
  }
  assert.ok(await run('return document.querySelectorAll("main article").length') >= 8, 'F18: contenido preservado');
  console.log('PASS lector UI: F1–F20, voces tardías, teclado, detalles y diseño');
}, { beforeNavigate: stub });

await withBrowser(async ({ evaluate }) => {
  await ready(evaluate);
  const result = await evaluate(`(() => {
    voices=[{name:'Argentina',lang:'es-AR',voiceURI:'ar'}]; speechSynthesis.changed();
    document.querySelector('[data-lector-open]').click();
    const chapter=document.querySelector('[data-lector-chapter]'); chapter.selectedIndex=chapter.options.length-1; chapter.dispatchEvent(new Event('change'));
    document.querySelector('[data-lector-play]').click();
    let count=0;
    while (!document.querySelector('[data-lector-status]').textContent.includes('terminada') && count++ < 5000) spoken.at(-1).onend();
    const finished=document.querySelector('[data-lector-status]').textContent;
    document.querySelector('[data-lector-play]').click();
    return {finished, count, first:spoken.at(-1).text, max:maxConcurrentSpeech};
  })()`);
  assert.match(result.finished, /terminada/i, 'fin natural en la interfaz');
  assert.ok(result.count < 5000);
  assert.match(result.first, /^1\. Cohesión/, 'repetición desde el inicio del contexto');
  assert.equal(result.max, 1);
  console.log('PASS lector UI: fin natural y repetición desde el inicio');
}, { beforeNavigate: stub });

await withBrowser(async ({ evaluate }) => {
  await ready(evaluate);
  await evaluate(`document.querySelector('[data-lector-open]').click()`);
  assert.match(await evaluate('document.querySelector("[data-lector-status]").textContent'), /disponible/i);
  assert.match(await evaluate(`document.querySelector('[data-lector-play]').click(); document.querySelector('[data-lector-status]').textContent`), /disponible/i);
  assert.ok(await evaluate('document.querySelectorAll("main article p").length') > 100);
  console.log('PASS lector UI: API y almacenamiento ausentes');
}, { beforeNavigate: `Object.defineProperty(window,'speechSynthesis',{value:undefined}); Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined}); Object.defineProperty(window,'localStorage',{get(){throw Error('bloqueado')}});` });

await withBrowser(async ({ evaluate }) => {
  await ready(evaluate);
  await evaluate(`document.querySelector('[data-lector-open]').click()`);
  assert.equal(await evaluate('document.querySelector("[data-lector-rate]").value'), '1');
  assert.equal(await evaluate('spoken.length'), 0);
  console.log('PASS lector UI: almacenamiento malformado');
}, { beforeNavigate: stub + `try { localStorage.setItem('lector-fluidos', '{'); } catch {}` });

await withBrowser(async ({ evaluate, call }) => {
  await ready(evaluate);
  for (const [oldRate, expected] of [[0.75, '0.8'], [0.9, '1'], [1.1, '1'], [1.35, '1.2'], [1.49, '1.5']]) {
    await evaluate(`localStorage.setItem('lector-fluidos', JSON.stringify({rate:${oldRate}}))`);
    await call('Page.reload'); await ready(evaluate);
    await evaluate(`document.querySelector('[data-lector-open]').click()`);
    assert.equal(await evaluate('document.querySelector("[data-lector-rate]").value'), expected, `migración ${oldRate}`);
    assert.equal(await evaluate(`JSON.parse(localStorage.getItem('lector-fluidos')).rate`), Number(expected));
  }
  console.log('PASS lector UI: migración y desempate de velocidades');
}, { beforeNavigate: stub });
