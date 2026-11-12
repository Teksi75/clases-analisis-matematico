import assert from 'node:assert/strict';
import { withBrowser } from './lector-browser-helper.mjs';

await withBrowser(async ({ evaluate, url }) => {
  const result = await evaluate(`(async () => {
    const { extractBlocks } = await import(${JSON.stringify(url('lectura/extractor.js'))});
    const { createMathNarrator } = await import(${JSON.stringify(url('lectura/math.js'))});
    const { mathRules } = await import(${JSON.stringify(url('fluidos/lectura-matematica.js'))});
    const box = document.createElement('div');
    box.innerHTML = '<article id="c"><h2>Capítulo</h2><h3>Sección</h3><div class="ampliacion">Antes <b>fuerte</b><p>Repetido</p> después <math><mi>x</mi><annotation encoding="application/x-tex">NO LEER</annotation></math> fin</div><div class="definicion"><p>Repetido</p></div><div class="aviso">Aviso</div><div class="ejercicio">Ejercicio</div><ol start="3"><li>Primero<ol><li>Interior</li></ol> Final</li><li value="8"><p>Segundo</p></li></ol><table><tr><td>PROHIBIDO</td></tr></table><div hidden><p>OCULTO</p></div><div aria-hidden="true"><p>OCULTO</p></div><div inert><p>OCULTO</p></div><div style="display:none"><p>OCULTO</p></div><div style="visibility:hidden"><p>OCULTO</p></div><nav>OCULTO</nav><button>OCULTO</button><svg><text>OCULTO</text></svg><figure><img><figcaption>Leyenda</figcaption><figcaption aria-hidden="true">OCULTO</figcaption></figure><details><summary>Resumen</summary><p>Secreto</p></details><p>Después</p></article>';
    document.body.append(box);
    const opts = { contentSelector: 'article', chapterSelector: 'article', narrateMath: () => 'equis' };
    const before = extractBlocks(box, opts);
    box.querySelector('details').open = true;
    const after = extractBlocks(box, opts);
    box.querySelector('details').open = false;
    const again = extractBlocks(box, opts);
    const custom = extractBlocks(box, { ...opts, excludeSelector: '.aviso', narrateMath: () => 'PERSONALIZADO' });
    const defaultMath = extractBlocks(box, { contentSelector: 'article' }).map(b => b.text);
    const main = document.querySelector('main#contenido');
    const narrator = createMathNarrator(mathRules);
    const pageOpts = { contentSelector: ':scope > article', chapterSelector: 'article', narrateMath: narrator };
    const audit = () => {
      const blocks = extractBlocks(main, pageOpts);
      const expected = [];
      const texts = [];
      let tableNodes = 0;
      const eligible = element => {
        if (!element.closest('main#contenido > article') || element.closest('table, nav, button, input, select, textarea, script, style, svg, [hidden], [inert], [aria-hidden="true"]')) return false;
        for (let n = element; n && n !== main; n = n.parentElement) {
          const s = getComputedStyle(n);
          if (s.display === 'none' || s.visibility === 'hidden' || s.visibility === 'collapse') return false;
          if (n.parentElement?.localName === 'details' && !n.parentElement.open && n.localName !== 'summary') return false;
        }
        return true;
      };
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const n = walker.currentNode, parent = n.parentElement;
        if (n.data.trim() && parent.closest('table') && !parent.closest('math')) {
          texts.push([n, n.data]); n.data = 'TABLEORIGIN' + tableNodes++ + 'END'; continue;
        }
        if (!n.data.trim() || !parent.closest('p,h1,h2,h3,h4,h5,h6') || parent.closest('math') || !eligible(parent)) continue;
        const token = 'ORACLE' + expected.length + 'END';
        expected.push(token); texts.push([n, n.data]); n.data = token;
      }
      const tokenBlocks = extractBlocks(main, { ...pageOpts, narrateMath: () => 'FORMULA' });
      for (const [n, value] of texts) n.data = value;
      const actual = [...tokenBlocks.map(b => b.text).join(' ').matchAll(/ORACLE\\d+END/g)].map(m => m[0]);
      const eligibleMath = [...main.querySelectorAll('article math')].filter(m => eligible(m));
      const speech = eligibleMath.map(m => narrator(m));
      return { expected, actual, blocks: blocks.length, eligibleMath: eligibleMath.length,
        empty: speech.filter(s => !s.trim()).length,
        tableBlocks: blocks.filter(b => b.element.closest('table')).length,
        tableNodes, tableLeaks: tokenBlocks.filter(b => /TABLEORIGIN\\d+END/.test(b.text)).length,
        chapterIds: [...new Set(blocks.map(b => b.chapterId))],
        boxes: ['ampliacion','definicion','aviso','ejercicio'].map(c => [...main.querySelectorAll('.'+c)].filter(eligible).every(e => blocks.some(b => e.contains(b.element)))),
        idsUnique: new Set(blocks.map(b => b.id)).size === blocks.length };
    };
    const closed = audit();
    const details = [...main.querySelectorAll('details')], states = details.map(d => d.open);
    details.forEach(d => d.open = true);
    const open = audit();
    const allMath = [...document.querySelectorAll('math')].filter(m => !box.contains(m));
    const eligible = allMath.filter(m => m.closest('main#contenido > article') && !m.closest('table') && !m.closest('[hidden],[inert],[aria-hidden="true"]') && (() => { for (let e = m; e; e = e.parentElement) { const s = getComputedStyle(e); if (s.display === 'none' || s.visibility === 'hidden' || s.visibility === 'collapse') return false; } return true; })());
    const count = values => Object.fromEntries([...values.reduce((map, value) => map.set(value, (map.get(value) || 0) + 1), new Map())].sort((a,b) => a[0].localeCompare(b[0])));
    const pairs = eligible.map(m => ({ tex: m.querySelector('annotation[encoding="application/x-tex"]')?.textContent || '', speech: narrator(m), html: m.innerHTML, hgSubscript: [...m.querySelectorAll('msub, msubsup')].some(s => s.children[1]?.textContent.trim() === 'Hg'), grouped: [...m.querySelectorAll('msup > mo')].some(e => e.textContent.trim() === ')'), chapter: m.closest('article')?.id, context: m.closest('p,li,div')?.textContent.replace(/\u005c\u005cs+/g, ' ').slice(0, 180) }));
    const sample = re => pairs.filter(p => re.test(p.tex)).slice(0, 3).map(({tex,speech}) => ({tex,speech}));
    const inventory = { total: allMath.length, table: allMath.filter(m => m.closest('table')).length, eligible: eligible.length,
      tags: count(eligible.flatMap(m => [...m.querySelectorAll('*')].map(e => e.localName))),
      operators: count(eligible.flatMap(m => [...m.querySelectorAll('mo')].map(e => e.textContent.trim()))),
      upright: count(eligible.flatMap(m => [...m.querySelectorAll('mi[mathvariant="normal"]')].map(e => e.textContent.trim()))),
      unknown: pairs.filter(p => /operador |elemento MathML|elemento ausente|presentación MathML ausente/.test(p.speech)).map(({tex,speech}) => ({tex,speech})),
      suspectTextSubscripts: pairs.filter(p => /subíndice [a-z](?: por [a-z]){2,}, fin de subíndice/.test(p.speech)).length,
      suspectDelta: pairs.filter(p => /delta mayúscula por/.test(p.speech)).length,
      flagged: pairs.filter(p => /subíndice [a-z](?: por [a-z]){2,}, fin de subíndice|delta mayúscula por/.test(p.speech)).map(({tex,speech,chapter,context}) => ({tex,speech,chapter,context})),
      columnUnits: pairs.filter(p => p.tex.includes('mca') || p.tex.includes('mmHg') || p.hgSubscript).map(({tex,speech,chapter}) => ({tex,speech,chapter})),
      samples: { groupedPowers: pairs.filter(p => p.grouped).slice(0, 2).map(({tex,speech}) => ({tex,speech})), fractions: sample(/frac/), sums: pairs.filter(p => p.html.includes('∑')).slice(0, 2).map(({tex,speech}) => ({tex,speech})), integrals: pairs.filter(p => p.html.includes('∫')).slice(0, 2).map(({tex,speech}) => ({tex,speech})), delta: sample(/Delta/), subscripts: sample(/_\\{/), units: sample(/mathrm/) } };
    details.forEach((d, i) => d.open = states[i]);
    box.remove();
    return { before: before.map(({id,text,chapterId,chapterTitle,sectionTitle}) => ({id,text,chapterId,chapterTitle,sectionTitle})),
      after: after.map(({id,text}) => ({id,text})), again: again.map(({id,text}) => ({id,text})),
      custom: custom.map(b => b.text), defaultMath, closed, open, inventory };
  })()`);
  const text = result.before.map(b => b.text);
  assert.deepEqual(text, ['Capítulo', 'Sección', 'Antes fuerte', 'Repetido', 'después equis fin', 'Repetido', 'Aviso', 'Ejercicio', '3. Primero', '1. Interior', 'Final', '8. Segundo', 'Leyenda', 'Resumen', 'Después']);
  assert.equal(result.before[0].chapterId, 'c');
  assert.equal(result.before[1].chapterTitle, 'Capítulo');
  assert.equal(result.before[1].sectionTitle, 'Sección');
  assert.equal(new Set(result.before.map(b => b.id)).size, result.before.length);
  assert.deepEqual(result.again, result.before.map(({id,text}) => ({id,text})));
  assert.equal(result.after.find(b => b.text === 'Después').id, result.before.find(b => b.text === 'Después').id);
  assert.ok(result.after.some(b => b.text === 'Secreto'));
  assert.ok(result.custom.some(s => s.includes('PERSONALIZADO')));
  assert.ok(result.defaultMath.includes('después x fin'));
  assert.ok(!result.custom.includes('Aviso'));
  for (const page of [result.closed, result.open]) {
    assert.deepEqual(page.actual, page.expected);
    assert.ok(page.expected.length > 100);
    assert.equal(page.empty, 0);
    assert.equal(page.tableBlocks, 0);
    assert.ok(page.tableNodes > 0);
    assert.equal(page.tableLeaks, 0);
    assert.ok(page.boxes.every(Boolean));
    assert.equal(page.idsUnique, true);
    assert.equal(page.chapterIds.length, 8);
  }
  assert.ok(result.open.eligibleMath > result.closed.eligibleMath);
  assert.equal(result.inventory.suspectTextSubscripts, 0);
  assert.equal(result.inventory.suspectDelta, 0);
  console.log('PASS extractor:', JSON.stringify({ closed: {blocks: result.closed.blocks, math: result.closed.eligibleMath, nodes: result.closed.expected.length}, open: {blocks: result.open.blocks, math: result.open.eligibleMath, nodes: result.open.expected.length} }));
  console.log('AUDIT', JSON.stringify(result.inventory));
});
