import assert from 'node:assert/strict';
import { test } from 'node:test';
import { withBrowser } from './lector-browser-helper.mjs';

const stub = `
  window.spoken=[]; window.cancels=0; window.pauses=0; window.resumes=0;
  window.SpeechSynthesisUtterance=class { constructor(text) { this.text=text; } };
  Object.defineProperty(window,'speechSynthesis',{value:{
    getVoices:()=>[{name:'Argentina',lang:'es-AR',voiceURI:'ar'}],
    addEventListener(){}, removeEventListener(){}, speak:u=>spoken.push(u),
    cancel:()=>cancels++, pause:()=>pauses++, resume:()=>resumes++
  }});
`;
const browser = (fn, beforeNavigate = stub) => withBrowser(async ({ evaluate, call }) => {
  for (let i=0; i<100 && !await evaluate('!!document.querySelector("[data-lector]")'); i++) await new Promise(r=>setTimeout(r,50));
  await call('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
  const run = code => evaluate(`(async()=>{${code}})()`);
  await run(`window.clickReader = name => document.querySelector('[data-lector-'+name+']').click();
    window.choose = (name,value) => { const el=document.querySelector('[data-lector-'+name+']'); el.value=value; el.dispatchEvent(new Event('change',{bubbles:true})); };
    window.state = () => ({ status:document.querySelector('[data-lector-status]').textContent, location:document.querySelector('[data-lector-location]').textContent, progress:document.querySelector('[data-lector-progress]')?.textContent, spoken:spoken.length, cancels, pauses, resumes, saved:localStorage.getItem('lector-fluidos') });`);
  await fn(run, call);
}, {beforeNavigate});

test('abrir prioriza apartado visible frente a posición válida guardada antes del montaje', () => browser(async (run, call) => {
  const savedId = await run(`const {extractBlocks}=await import('../lectura/extractor.js');
    const block=extractBlocks(document.querySelector('main#contenido'),{excludeSelector:'.chapter-label'}).find(b=>b.element.id==='cap-2-densidad');
    localStorage.setItem('lector-fluidos',JSON.stringify({chapterId:block.chapterId,blockId:block.id})); return block.id;`);
  await call('Page.reload');
  for (let i=0; i<100 && !await run('return !!document.querySelector("[data-lector]")'); i++) await new Promise(r=>setTimeout(r,50));
  const result = await run(`const before=JSON.parse(localStorage.getItem('lector-fluidos'));
    document.querySelector('#cap-3-definicion').scrollIntoView({behavior:'instant'});
    document.querySelector('[data-lector-open]').click();
    return {before,after:JSON.parse(localStorage.getItem('lector-fluidos')),location:document.querySelector('[data-lector-location]').textContent,
      status:document.querySelector('[data-lector-status]').textContent,spoken:spoken.length};`);
  assert.equal(result.before.blockId,savedId);
  assert.equal(result.before.chapterId,'capitulo-02');
  assert.equal(result.after.chapterId,'capitulo-03');
  assert.notEqual(result.after.blockId,savedId);
  assert.match(result.location,/Presión media/);
  assert.equal(result.spoken,0);
  assert.match(result.status,/Listo/);
}));

test('sin contexto visible usa una posición guardada válida y no reproduce', () => browser(async (run,call) => {
  const target=await run(`const {extractBlocks}=await import('../lectura/extractor.js'); const blocks=extractBlocks(document.querySelector('main#contenido'),{excludeSelector:'.chapter-label'}); const block=blocks.find(b=>b.element.id==='cap-2-densidad'); localStorage.setItem('lector-fluidos',JSON.stringify({chapterId:block.chapterId,blockId:block.id})); return block.id;`);
  await call('Emulation.setDeviceMetricsOverride',{width:1280,height:300,deviceScaleFactor:1,mobile:false});
  await call('Page.reload');
  for (let i=0; i<100 && !await run('return !!document.querySelector("[data-lector]")'); i++) await new Promise(r=>setTimeout(r,50));
  const result=await run(`window.scrollTo({top:0,behavior:'instant'}); document.querySelector('[data-lector-open]').click(); return {location:document.querySelector('[data-lector-location]').textContent,status:document.querySelector('[data-lector-status]').textContent,spoken:spoken.length,saved:JSON.parse(localStorage.getItem('lector-fluidos'))};`);
  assert.match(result.location,/Densidad/); assert.match(result.status,/Listo/); assert.equal(result.spoken,0); assert.equal(result.saved.blockId,target);
}));

test('selección directa accesible de encabezado y fragmento', () => browser(async run => {
  const result=await run(`clickReader('open'); clickReader('settings-toggle');
    const heading=document.querySelector('[data-lector-heading]'); const point=document.querySelector('[data-lector-point]');
    if (!heading || !point) return {heading:!!heading,point:!!point};
    heading.selectedIndex=1; heading.dispatchEvent(new Event('change',{bubbles:true}));
    point.selectedIndex=Math.min(1,point.options.length-1); point.dispatchEvent(new Event('change',{bubbles:true}));
    const selected=point.selectedOptions[0].textContent; clickReader('play'); return {heading:!!heading,point:!!point,selected,spoken:spoken.at(-1)?.text,status:state().status};`);
  assert.equal(result.heading,true); assert.equal(result.point,true);
  assert.ok(result.selected.startsWith(result.spoken)); assert.match(result.status,/Leyendo/);
}));

for (const transport of ['playing','paused','stopped']) {
  test(`índice voluntario conserva transporte ${transport} y descarta callbacks`, () => browser(async (run,call) => {
    await run(`clickReader('open'); clickReader('play'); ${transport === 'paused' ? "clickReader('play');" : transport === 'stopped' ? "clickReader('settings-toggle'); clickReader('stop');" : ''} window.old=spoken.at(-1);`);
    const before=await run('return state()');
    await run(`document.querySelector('.contents-disclosure').open=true; document.querySelector('[data-chapter="capitulo-02"]').open=true; document.querySelector('.contents a[href="#cap-2-densidad"]').focus()`);
    await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',windowsVirtualKeyCode:13});
    await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    const after=await run(`old.onend(); old.onerror({error:'late'}); return {...state(),hash:location.hash,focus:document.activeElement.getAttribute('href'),audio:spoken.at(-1).text}`);
    assert.equal(after.hash,'#cap-2-densidad');
    assert.match(after.location,/Densidad/); assert.match(after.status,transport==='playing'?/Leyendo/:transport==='paused'?/pausa/i:/Detenido/);
    assert.equal(after.spoken,before.spoken+(transport==='playing'?1:0));
    if (transport==='playing') assert.match(after.audio,/^Densidad/);
    assert.notEqual(after.saved,before.saved);
  }));
}

for (const transport of ['playing','paused','stopped']) {
  test(`índice con ratón conserva transporte ${transport} y navegación normal`, () => browser(async (run, call) => {
    const prepareLink = async () => {
      await run(`document.querySelector('.contents-disclosure').open=true;
        document.querySelector('[data-chapter="capitulo-02"]').open=true;
        document.querySelector('.contents a[href="#cap-2-densidad"]').scrollIntoView({block:'center',behavior:'instant'});
        await new Promise(requestAnimationFrame); await new Promise(requestAnimationFrame);`);
      return run(`const r=document.querySelector('.contents a[href="#cap-2-densidad"]').getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2};`);
    };
    const mouseClick = async ({x,y}) => {
      await call('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',clickCount:1});
      await call('Input.dispatchMouseEvent',{type:'mouseReleased',x,y,button:'left',clickCount:1});
    };
    await run(`document.addEventListener('click', e => { if (e.target.closest('.contents a')) window.indexEvent=e; });`);
    await mouseClick(await prepareLink());
    const conventional = await run(`return {hash:location.hash,focus:[document.activeElement.tagName,document.activeElement.id,document.activeElement.getAttribute('href')],prevented:indexEvent.defaultPrevented};`);
    assert.equal(conventional.hash,'#cap-2-densidad');
    assert.equal(conventional.prevented,false);
    await run(`document.querySelector('#cap-1').scrollIntoView({behavior:'instant'});
      clickReader('open'); clickReader('play'); ${transport === 'paused' ? "clickReader('play');" : transport === 'stopped' ? "clickReader('settings-toggle'); clickReader('stop');" : ''} window.old=spoken.at(-1);`);
    const before = await run('return state()');
    assert.equal(JSON.parse(before.saved).chapterId,'capitulo-01');
    await mouseClick(await prepareLink());
    const after = await run(`old.onend(); old.onerror({error:'late'}); return {...state(),hash:location.hash,focus:[document.activeElement.tagName,document.activeElement.id,document.activeElement.getAttribute('href')],prevented:indexEvent.defaultPrevented,audio:spoken.at(-1).text};`);
    assert.equal(after.hash,conventional.hash);
    assert.equal(after.prevented,conventional.prevented);
    assert.deepEqual(after.focus,conventional.focus);
    assert.match(after.location,/Densidad/);
    assert.match(after.status,transport==='playing'?/Leyendo/:transport==='paused'?/pausa/i:/Detenido/);
    assert.equal(after.spoken,before.spoken+(transport==='playing'?1:0));
    if (transport==='playing') assert.match(after.audio,/^Densidad/);
    assert.notEqual(after.saved,before.saved);
  }));
}

test('selección después de finalizar reproduce el punto elegido', () => browser(async run => {
  const result=await run(`clickReader('open'); clickReader('settings-toggle'); const chapter=document.querySelector('[data-lector-chapter]'); chapter.selectedIndex=chapter.options.length-1; chapter.dispatchEvent(new Event('change')); clickReader('play');
    let count=0; while (!state().status.includes('terminada') && count++<5000) spoken.at(-1).onend();
    chapter.selectedIndex=1; chapter.dispatchEvent(new Event('change')); clickReader('play'); return {count,audio:spoken.at(-1).text,status:state().status};`);
  assert.ok(result.count<5000); assert.match(result.audio,/^2\. Densidad/); assert.match(result.status,/Leyendo/);
}));

test('scroll sin activación no cambia transporte ni posición', () => browser(async run => {
  const result=await run(`clickReader('open'); clickReader('play'); const before=state(); document.querySelector('#cap-4').scrollIntoView(); window.dispatchEvent(new Event('scroll')); return {before,after:state()};`);
  assert.deepEqual(result.after,result.before);
}));

test('límites de selección y progreso sin añadir tabulaciones a párrafos', () => browser(async run => {
  const result=await run(`const paragraphs=[...document.querySelectorAll('main article p')];
    const tabsBefore=paragraphs.map(p=>p.getAttribute('tabindex'));
    clickReader('open'); clickReader('settings-toggle');
    const point=document.querySelector('[data-lector-point]');
    const pick=index=>{ point.selectedIndex=index; point.dispatchEvent(new Event('change',{bubbles:true}));
      return {text:point.selectedOptions[0].textContent,progress:state().progress,status:state().status,spoken:spoken.length,saved:JSON.parse(state().saved)}; };
    const total=point.options.length; const first=pick(0); const last=pick(total-1);
    clickReader('play'); const audio=spoken.at(-1).text;
    return {total,first,last,audio,tabsBefore,tabsAfter:paragraphs.map(p=>p.getAttribute('tabindex')),
      headingLabel:document.querySelector('[data-lector-heading]').labels[0].textContent,
      pointLabel:point.labels[0].textContent};`);
  assert.ok(result.tabsBefore.length>100);
  assert.deepEqual(result.tabsAfter,result.tabsBefore);
  assert.match(result.headingLabel,/Encabezado/);
  assert.match(result.pointLabel,/Punto de lectura/);
  assert.equal(result.first.progress,`Fragmento 1 de ${result.total}`);
  assert.equal(result.last.progress,`Fragmento ${result.total} de ${result.total}`);
  assert.equal(result.first.spoken,0); assert.equal(result.last.spoken,0);
  assert.match(result.last.status,/Listo/);
  assert.notEqual(result.first.saved.blockId,result.last.saved.blockId);
  assert.ok(result.last.text.startsWith(result.audio));
}));

test('progreso cuenta bloques locales y continúa al siguiente capítulo', () => browser(async run => {
  const result=await run(`const {extractBlocks}=await import('../lectura/extractor.js');
    const blocks=extractBlocks(document.querySelector('main#contenido'),{contentSelector:':scope > article',chapterSelector:'article',chapterHeadingSelector:'h1, h2',sectionHeadingSelector:'h3, h4, h5, h6',excludeSelector:'.chapter-label'});
    const totals=['capitulo-01','capitulo-02'].map(id=>blocks.filter(b=>b.chapterId===id).length);
    clickReader('open'); clickReader('play'); const first=state(); let n=0; while (!state().location.startsWith('2.') && n++<5000) spoken.at(-1).onend(); return {first,last:state(),audio:spoken.at(-1).text,n,totals};`);
  assert.equal(result.first.progress,`Fragmento 1 de ${result.totals[0]}`); assert.ok(result.n<5000);
  assert.equal(result.last.progress,`Fragmento 1 de ${result.totals[1]}`); assert.match(result.audio,/^2\. Densidad/); assert.match(result.last.status,/Leyendo/);
}));
