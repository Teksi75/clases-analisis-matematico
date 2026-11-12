import assert from 'node:assert/strict';
import { test } from 'node:test';
import { withBrowser } from './lector-browser-helper.mjs';

const stub = `
  window.spoken=[]; window.cancels=0;
  window.SpeechSynthesisUtterance=class { constructor(text) { this.text=text; } };
  Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[{name:'Argentina',lang:'es-AR',voiceURI:'ar'}],
    addEventListener(){},removeEventListener(){},speak:u=>spoken.push(u),cancel:()=>cancels++,pause(){},resume(){}}});
`;
const browser = fn => withBrowser(async ({evaluate,call}) => {
  await call('Emulation.setDeviceMetricsOverride',{width:1280,height:700,deviceScaleFactor:1,mobile:false});
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  const run = code => evaluate(`(async()=>{${code}})()`);
  await run(`const {mountReader}=await import('../lectura/ui.js');
    document.body.innerHTML='<main id="fixture"><article id="chapter"><h2>Capítulo</h2><h3>Sección</h3><p id="first">Primero</p><details id="details"><summary>Resolución</summary><h3>Interior</h3><p id="inside">Contenido interior</p></details><h3 id="lastheading">Final</h3><p id="last">Último</p></article></main>';
    document.querySelectorAll('#fixture article > *').forEach(e=>e.style.marginBottom='450px');
    window.reader=mountReader({root:document.querySelector('#fixture'),storageKey:'follow-test'});
    window.click=name=>document.querySelector('[data-lector-'+name+']').click();
    window.choose=text=>{const p=document.querySelector('[data-lector-point]'); p.value=[...p.options].find(o=>o.textContent===text).value; p.dispatchEvent(new Event('change'));};
    window.state=()=>({status:document.querySelector('[data-lector-status]').textContent, progress:document.querySelector('[data-lector-progress]').textContent,
      saved:localStorage.getItem('follow-test'), active:document.querySelector('.lector-activo')?.textContent, spoken:spoken.length, audio:spoken.at(-1)?.text, cancels, y:scrollY,
      follow:!!document.querySelector('[data-lector-follow]') && !document.querySelector('[data-lector-follow]').hidden});
    window.tick=()=>new Promise(r=>setTimeout(r,100));`);
  await fn(run,call);
}, {beforeNavigate:stub});

test('seguimiento respeta visibilidad, suspensión manual y reanudación explícita',()=>browser(async run=>{
  const result=await run(`click('open'); click('play'); await tick(); const initial=state();
    choose('Último'); await tick(); const followed=state();
    const stableY=scrollY; speechSynthesis.getVoices(); window.dispatchEvent(new Event('scroll')); await tick(); const programmatic=state();
    window.dispatchEvent(new WheelEvent('wheel',{deltaY:100})); scrollTo({top:0,behavior:'instant'}); await tick(); const manual=state();
    choose('Final'); await tick(); const suspended=state();
    if (document.querySelector('[data-lector-follow]')) click('follow'); await tick(); const resumed=state();
    return {initial,followed,stableY,programmatic,manual,suspended,resumed};`);
  assert.ok(result.followed.y>result.initial.y,'el fragmento fuera de vista se sigue');
  assert.equal(result.programmatic.y,result.stableY,'el scroll programático no desplaza de nuevo');
  assert.equal(result.programmatic.follow,false,'el seguimiento propio no se suspende');
  assert.equal(result.manual.follow,true,'scroll manual ofrece retomar');
  assert.equal(result.manual.spoken,result.followed.spoken,'scroll no interrumpe audio');
  assert.equal(result.manual.saved,result.followed.saved,'scroll no cambia posición');
  assert.equal(result.suspended.y,0,'selección no desplaza mientras está suspendido');
  assert.equal(result.resumed.follow,false);
  assert.ok(result.resumed.y>0,'retomar desplaza al fragmento');
  assert.equal(result.resumed.spoken,result.suspended.spoken);
}));

for (const transport of ['playing','paused','stopped']) test(`detalle ajeno conserva ${transport}`,()=>browser(async run=>{
  const result=await run(`click('open'); click('play'); ${transport==='paused'?"click('play');":transport==='stopped'?"click('settings-toggle'); click('stop');":''}
    const d=document.createElement('details'); d.innerHTML='<summary></summary>'; document.querySelector('article').append(d);
    const before=state(); d.open=true; await tick(); return {before,after:state()};`);
  assert.equal(result.after.status,result.before.status);
  assert.equal(result.after.spoken,result.before.spoken);
  assert.equal(result.after.cancels,result.before.cancels);
  assert.equal(result.after.saved,result.before.saved);
  assert.equal(result.after.active,result.before.active);
}));

for (const transport of ['playing','paused','stopped']) test(`cambio real de cola conserva emisión y transporte ${transport}`,()=>browser(async run=>{
  const result=await run(`click('open'); click('play'); ${transport==='paused'?"click('play');":transport==='stopped'?"click('settings-toggle'); click('stop');":''}
    const before=state(); window.utterance=spoken.at(-1); document.querySelector('#details').open=true; await tick(); const after=state();
    const same=utterance===spoken.at(-1); const options=[...document.querySelector('[data-lector-point]').options].map(o=>o.textContent);
    return {before,after,same,options};`);
  assert.equal(result.same,true); assert.equal(result.after.spoken,result.before.spoken);
  assert.equal(result.after.cancels,result.before.cancels); assert.equal(result.after.status,result.before.status);
  assert.equal(result.after.saved,result.before.saved); assert.equal(result.after.active,result.before.active);
  assert.notEqual(result.after.progress,result.before.progress); assert.ok(result.options.includes('Contenido interior'));
}));

test('contenido ocultado vuelve al encabezado cercano en pausa e invalida callbacks',()=>browser(async run=>{
  const result=await run(`document.querySelector('#details').open=true; await tick(); click('open'); choose('Contenido interior'); click('play');
    const before=state(); window.old=spoken.at(-1); document.querySelector('#details').open=false; await tick(); const after=state();
    old.onend(); old.onerror({error:'late'}); return {before,after,late:state()};`);
  assert.equal(result.before.audio,'Contenido interior');
  assert.match(result.after.status,/pausa/i);
  assert.equal(result.after.active,'Final');
  assert.equal(result.after.spoken,result.before.spoken);
  assert.notEqual(result.after.saved,result.before.saved);
  assert.deepEqual(result.late,result.after);
}));

test('rueda, tacto, teclas y barra suspenden sin alterar audio ni selección; controles no suspenden',()=>browser(async run=>{
  const result=await run(`click('open'); click('play'); await tick(); const baseline=state();
    document.querySelector('[data-lector-rate]').dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));
    window.dispatchEvent(new Event('scroll')); const form=state();
    const cases=[];
    for (const event of [new WheelEvent('wheel',{deltaY:10}),new Event('touchmove'),new KeyboardEvent('keydown',{key:'PageDown'}),
      new PointerEvent('pointerdown',{clientX:document.documentElement.clientWidth,clientY:30})]) {
      window.dispatchEvent(event); cases.push(state()); if (document.querySelector('[data-lector-follow]')) click('follow');
    }
    return {baseline,form,cases};`);
  assert.equal(result.form.follow,false); assert.equal(result.form.saved,result.baseline.saved);
  for (const item of result.cases) {
    assert.equal(item.follow,true); assert.equal(item.saved,result.baseline.saved);
    assert.equal(item.spoken,result.baseline.spoken); assert.equal(item.cancels,result.baseline.cancels);
    assert.equal(item.active,result.baseline.active); assert.equal(item.status,result.baseline.status);
  }
}));

test('seguimiento mantiene el texto fuera de controles fijos y no desplaza si ya está visible',()=>browser(async run=>{
  const result=await run(`const header=document.createElement('div'); header.style.cssText='position:fixed;top:0;left:0;right:0;height:80px;background:black;z-index:50'; document.body.append(header);
    click('open'); click('play'); choose('Último'); await tick(); const active=document.querySelector('.lector-activo').getBoundingClientRect();
    const bar=document.querySelector('[data-lector-bar]').getBoundingClientRect(); const before=scrollY; speechSynthesis.getVoices(); window.dispatchEvent(new Event('scroll')); await tick();
    return {top:active.top,bottom:active.bottom,bar:bar.top,before,after:scrollY};`);
  assert.ok(result.top>=80); assert.ok(result.bottom<=result.bar); assert.equal(result.after,result.before);
}));

test('desplazamiento manual interrumpe animación suave en curso sin cortar audio',()=>browser(async (run,call)=>{
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  const result=await run(`click('open'); click('play'); choose('Último'); await new Promise(r=>setTimeout(r,80));
    window.dispatchEvent(new WheelEvent('wheel',{deltaY:10})); const manual=state();
    await new Promise(requestAnimationFrame); await new Promise(requestAnimationFrame); const settled=state();
    await new Promise(r=>setTimeout(r,500)); return {manual,settled,after:state()};`);
  assert.equal(result.manual.follow,true); assert.equal(result.after.y,result.settled.y);
  assert.equal(result.after.spoken,result.manual.spoken); assert.equal(result.after.saved,result.manual.saved);
}));

test('reconciliar conserva el fragmento actual y continúa en la cola nueva',()=>browser(async run=>{
  const result=await run(`document.querySelector('#first').textContent='palabra '.repeat(80); document.querySelector('#details').open=true; await tick();
    document.querySelector('#details').open=false; await tick(); click('open'); choose('palabra '.repeat(80).trim()); click('play');
    spoken.at(-1).onend(); const before=state(); window.current=spoken.at(-1); document.querySelector('#details').open=true; await tick();
    const after=state(); const same=current===spoken.at(-1); let n=0;
    while (spoken.at(-1).text!=='Contenido interior' && n++<20) spoken.at(-1).onend();
    return {before,after,same,n,audio:spoken.at(-1).text};`);
  assert.equal(result.same,true); assert.equal(result.before.spoken,result.after.spoken);
  assert.equal(result.before.cancels,result.after.cancels); assert.equal(result.before.saved,result.after.saved);
  assert.equal(result.audio,'Contenido interior'); assert.ok(result.n<20);
}));

test('capítulo reemplazado con igual ID y bloque conserva sólo encabezado cercano en pausa',()=>browser(async run=>{
  const result=await run(`click('open'); choose('Primero'); click('play'); const before=state(); window.old=spoken.at(-1);
    const article=document.querySelector('article'), replacement=article.cloneNode(false);
    while (article.firstChild) replacement.append(article.firstChild); article.replaceWith(replacement);
    document.querySelector('#details').open=true; await tick(); const after=state();
    old.onend(); old.onerror({error:'late'}); return {before,after,late:state()};`);
  assert.match(result.after.status,/pausa/i); assert.equal(result.after.active,'Sección');
  assert.equal(result.after.spoken,result.before.spoken); assert.equal(result.after.cancels,result.before.cancels+1);
  assert.notEqual(result.after.saved,result.before.saved); assert.deepEqual(result.late,result.after);
}));

test('rueda y teclado CDP suspenden seguimiento sin cambiar lectura y permiten retomarlo',()=>browser(async (run,call)=>{
  await run(`click('open'); click('play'); choose('Último'); await tick();
    document.body.tabIndex=-1; document.body.focus({preventScroll:true}); window.inputs=[];
    window.addEventListener('wheel',e=>inputs.push(['wheel',e.isTrusted])); window.addEventListener('keydown',e=>inputs.push([e.key,e.isTrusted]));`);
  const before=await run('return state()');
  await call('Input.dispatchMouseEvent',{type:'mouseWheel',x:300,y:300,deltaX:0,deltaY:-400});
  await run('await tick()'); const wheel=await run('return state()');
  await run(`click('follow'); await tick(); document.body.focus({preventScroll:true});`);
  const resumed=await run('return state()');
  await call('Input.dispatchKeyEvent',{type:'keyDown',key:'PageUp',code:'PageUp',windowsVirtualKeyCode:33});
  await call('Input.dispatchKeyEvent',{type:'keyUp',key:'PageUp',code:'PageUp',windowsVirtualKeyCode:33});
  await run('await tick()'); const keyboard=await run('return {...state(),inputs}');
  assert.notEqual(wheel.y,before.y); assert.equal(wheel.follow,true);
  assert.equal(resumed.follow,false); assert.ok(resumed.y>wheel.y);
  assert.equal(keyboard.follow,true); assert.ok(keyboard.y<resumed.y);
  assert.deepEqual(keyboard.inputs,[['wheel',true],['PageUp',true]]);
  for (const s of [wheel,resumed,keyboard]) {
    assert.equal(s.spoken,before.spoken); assert.equal(s.cancels,before.cancels);
    assert.equal(s.saved,before.saved); assert.equal(s.status,before.status);
    assert.equal(s.progress,before.progress); assert.equal(s.active,before.active);
  }
}));

test('un ID reutilizado para otro elemento no conserva la selección activa',()=>browser(async run=>{
  const result=await run(`click('open'); choose('Primero'); click('play'); const before=state(); window.old=spoken.at(-1);
    const oldNode=document.querySelector('#first'); const replacement=oldNode.cloneNode(true); replacement.textContent='Contenido distinto'; oldNode.replaceWith(replacement);
    document.querySelector('#details').open=true; await tick(); const after=state(); old.onend(); old.onerror({error:'late'}); return {before,after,late:state()};`);
  assert.match(result.after.status,/pausa/i); assert.equal(result.after.active,'Sección');
  assert.equal(result.after.spoken,result.before.spoken); assert.notEqual(result.after.saved,result.before.saved); assert.deepEqual(result.late,result.after);
}));

test('sin encabezados legibles ni secuencia válida no reproduce contenido alternativo',()=>browser(async run=>{
  const result=await run(`click('open'); choose('Primero'); click('play'); const before=state(); window.old=spoken.at(-1);
    const details=document.querySelector('#details'); details.querySelector('h3').remove(); document.querySelector('article').replaceChildren(details); details.open=true; await tick(); const after=state();
    old.onend(); old.onerror({error:'late'}); click('play'); return {before,after,final:state()};`);
  assert.equal(result.after.spoken,result.before.spoken); assert.equal(result.after.active,undefined);
  assert.equal(result.final.spoken,result.before.spoken); assert.equal(JSON.parse(result.after.saved).blockId,'');
}));

test('cerrado y destruido no siguen ni reaccionan a desplazamientos o detalles',()=>browser(async run=>{
  const result=await run(`const before=state(); document.querySelector('#details').open=true; window.dispatchEvent(new WheelEvent('wheel',{deltaY:100})); await tick(); const closed=state();
    reader.destroy(); const saved=localStorage.getItem('follow-test'); const count=spoken.length; document.querySelector('#details').open=false; window.dispatchEvent(new WheelEvent('wheel',{deltaY:100})); await tick();
    return {before,closed,saved,after:localStorage.getItem('follow-test'),count,spoken:spoken.length,space:getComputedStyle(document.body).paddingBottom,active:document.querySelectorAll('.lector-activo').length};`);
  assert.equal(result.closed.spoken,0); assert.equal(result.closed.active,undefined);
  assert.equal(result.closed.saved,result.before.saved); assert.equal(result.closed.y,result.before.y);
  assert.equal(result.after,result.saved); assert.equal(result.spoken,result.count); assert.equal(result.active,0); assert.equal(parseFloat(result.space),0);
}));
