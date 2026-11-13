import assert from 'node:assert/strict';
import { withBrowser } from './lector-browser-helper.mjs';

await withBrowser(async ({ evaluate, url }) => {
  const result = await evaluate(`(async () => {
    const { extractBlocks } = await import(${JSON.stringify(url('lectura/extractor.js'))});
    const { createMathNarrator } = await import(${JSON.stringify(url('lectura/math.js'))});
    const { mathRules } = await import(${JSON.stringify(url('fluidos/lectura-matematica.js'))});
    const box = document.createElement('div');
    box.innerHTML = '<article id="c"><h2>Capítulo</h2><h3>Sección</h3><div class="ampliacion">Antes <b>fuerte</b><p>Repetido</p> después <math><mi>x</mi><annotation encoding="application/x-tex">NO LEER</annotation></math> fin</div><div class="definicion"><p>Repetido</p></div><div class="aviso">Aviso</div><div class="ejercicio">Ejercicio</div><ol start="3"><li>Primero<ol><li>Interior</li></ol> Final</li><li value="8"><p>Segundo</p></li></ol><table><tr><td>Sin encabezados</td></tr></table><div hidden><p>OCULTO</p></div><div aria-hidden="true"><p>OCULTO</p></div><div inert><p>OCULTO</p></div><div style="display:none"><p>OCULTO</p></div><div style="visibility:hidden"><p>OCULTO</p></div><nav>OCULTO</nav><button>OCULTO</button><svg><text>OCULTO</text></svg><figure><img><figcaption>Leyenda</figcaption><figcaption aria-hidden="true">OCULTO</figcaption></figure><details><summary>Resumen</summary><p>Secreto</p></details><div class="table-scroll" role="region" aria-label="Tabla de estudio"><table><caption>Datos</caption><thead><tr><th>Magnitud</th><th>Valor</th></tr></thead><tbody><tr><td>Presión</td><td><math><mi>p</mi></math></td></tr><tr><td hidden>OCULTO</td><td>Visible</td></tr></tbody></table></div><figure><img src="x.svg" alt="Diagrama descrito"><figcaption>Diagrama descrito</figcaption></figure><figure><img src="y.svg" alt=""><figcaption>Leyenda visible</figcaption></figure><p>Después</p></article>';
    document.body.append(box);
    const edge = document.createElement('div');
    edge.innerHTML = '<article><table><caption>Título<span hidden>OCULTO</span><span class="no-leer">EXCLUIDO</span></caption><thead><tr><th>Uno</th><th hidden>OCULTO</th><th class="no-leer">EXCLUIDO</th></tr></thead><tbody><tr><td>A<table><tr><td>ANIDADA</td></tr></table></td><td hidden>OCULTO</td><td class="no-leer">EXCLUIDO</td></tr><tr class="no-leer"><td>EXCLUIDO</td></tr></tbody></table></article>';
    document.body.append(edge);
    const edgeText = extractBlocks(edge, { contentSelector: 'article', excludeSelector: '.no-leer' }).map(b => b.text);
    edge.remove();
    const regressions = document.createElement('div');
    regressions.innerHTML = '<article id="footer"><table><thead><tr><th>Valor</th></tr></thead><tbody><tr><td>1</td></tr></tbody><tfoot><tr><td>Total: 2</td></tr></tfoot></table></article><article id="paragraphs"><table><tr><td><p>Presión</p><p>absoluta</p></td></tr></table></article><article id="nested"><table><tr><td>Inicio<table><tr><th>Interna</th></tr><tr><td>Uno<table><tr><td>Dos<table><tr><td>NO LEER</td></tr></table></td></tr></table></td></tr></table> Fin</td></tr></table></article><article id="caption-before"><figure><figcaption>Antes</figcaption><img alt="Antes"></figure></article><article id="caption-after"><figure><img alt="Después"><figcaption>Después</figcaption></figure></article><article id="caption-hidden"><figure><figcaption aria-hidden="true">Oculta</figcaption><img alt="Oculta"></figure></article><article id="caption-absent"><figure><img alt="Sin leyenda"></figure></article>';
    document.body.append(regressions);
    const regressionBlocks = Object.fromEntries([...regressions.children].map(article => [article.id, extractBlocks(article, { contentSelector: null }).map(b => ({ text: b.text, tag: b.element.localName }))]));
    regressions.remove();
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
      const tableTokens = [];
      let tableNodes = 0;
      const eligible = (element, allowTables = false) => {
        if (!element.closest('main#contenido > article') || (!allowTables && element.closest('table')) || element.closest('nav, button, input, select, textarea, script, style, svg, [hidden], [inert], [aria-hidden="true"]')) return false;
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
          const token = 'TABLEORIGIN' + tableNodes++ + 'END';
          tableTokens.push({ token, expected: eligible(parent, true) });
          texts.push([n, n.data]); n.data = token; continue;
        }
        if (!n.data.trim() || !parent.closest('p,h1,h2,h3,h4,h5,h6') || parent.closest('math') || !eligible(parent)) continue;
        const token = 'ORACLE' + expected.length + 'END';
        expected.push(token); texts.push([n, n.data]); n.data = token;
      }
      const tokenBlocks = extractBlocks(main, { ...pageOpts, narrateMath: () => 'FORMULA' });
      for (const [n, value] of texts) n.data = value;
      const actual = [...tokenBlocks.map(b => b.text).join(' ').matchAll(/ORACLE\\d+END/g)].map(m => m[0]);
      const reported = [...new Set(tokenBlocks.flatMap(b => [...b.text.matchAll(/TABLEORIGIN\\d+END/g)].map(m => m[0])))];
      const eligibleTable = tableTokens.filter(item => item.expected).map(item => item.token);
      const eligibleMath = [...main.querySelectorAll('article math')].filter(m => eligible(m));
      const speech = eligibleMath.map(m => narrator(m));
      const tableBlock = headers => blocks.find(b => b.element.localName === 'table' &&
        [...b.element.querySelectorAll('thead th')].map(th => th.textContent.trim()).join('|') === headers);
      const rowTexts = table => blocks.filter(b => b.element.localName === 'tr' && table.contains(b.element)).map(b => b.text);
      const states = tableBlock('Estado|Cohesión frente a la agitación térmica|Forma|Volumen');
      const conversion = tableBlock('Apartado|Cálculo|Resultado');
      return { expected, actual, blocks: blocks.length, eligibleMath: eligibleMath.length,
        empty: speech.filter(s => !s.trim()).length,
        tableBlocks: blocks.filter(b => b.element.closest('table')).length,
        introTables: blocks.filter(b => b.element.localName === 'table').length,
        rows: blocks.filter(b => b.element.localName === 'tr').length,
        images: blocks.filter(b => b.element.localName === 'img').map(b => b.text),
        eligibleTables: [...main.querySelectorAll('table')].filter(table => eligible(table, true)).length,
        eligibleImages: [...main.querySelectorAll('img')].filter(img => eligible(img) && img.alt.trim()).length,
        states: states ? { text: states.text, rows: rowTexts(states.element) } : null,
        conversion: conversion ? { text: conversion.text, rows: rowTexts(conversion.element) } : null,
        firstAlt: main.querySelector('article figure img[alt]:not([alt=""])')?.alt.trim() || '',
        tableNodes, tableLeaks: tokenBlocks.filter(b => /TABLEORIGIN\\d+END/.test(b.text) && !b.element.closest('table')).map(b => ({ tag: b.element.localName, text: b.text })),
        tableCovered: reported.length === eligibleTable.length && eligibleTable.every(token => reported.includes(token)),
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
    return { edgeText, regressionBlocks, before: before.map(({id,text,chapterId,chapterTitle,sectionTitle}) => ({id,text,chapterId,chapterTitle,sectionTitle})),
      after: after.map(({id,text}) => ({id,text})), again: again.map(({id,text}) => ({id,text})),
      custom: custom.map(b => b.text), defaultMath, closed, open, inventory };
  })()`);
  assert.deepEqual(result.regressionBlocks, {
    footer: [{ text: 'Tabla. Encabezados: Valor. Filas: 2.', tag: 'table' }, { text: 'Fila 1 de 2. Valor: 1.', tag: 'tr' }, { text: 'Fila 2 de 2. Valor: Total: 2.', tag: 'tr' }],
    paragraphs: [{ text: 'Tabla. Filas: 1.', tag: 'table' }, { text: 'Fila 1 de 1. Presión absoluta.', tag: 'tr' }],
    nested: [{ text: 'Tabla. Filas: 1.', tag: 'table' }, { text: 'Fila 1 de 1. Inicio Tabla. Encabezados: Interna. Filas: 1. Fila 1 de 1. Interna: Uno Tabla. Filas: 1. Fila 1 de 1. Dos. Fin.', tag: 'tr' }],
    'caption-before': [{ text: 'Antes', tag: 'figcaption' }],
    'caption-after': [{ text: 'Después', tag: 'figcaption' }],
    'caption-hidden': [{ text: 'Oculta', tag: 'img' }],
    'caption-absent': [{ text: 'Sin leyenda', tag: 'img' }],
  });
  assert.deepEqual(result.edgeText, ['Título. Encabezados: Uno. Filas: 1.', 'Fila 1 de 1. Uno: A Tabla. Filas: 1. Fila 1 de 1. ANIDADA.']);
  const text = result.before.map(b => b.text);
  assert.deepEqual(text, ['Capítulo', 'Sección', 'Antes fuerte', 'Repetido', 'después equis fin', 'Repetido', 'Aviso', 'Ejercicio', '3. Primero', '1. Interior', 'Final', '8. Segundo', 'Tabla. Filas: 1.', 'Fila 1 de 1. Sin encabezados.', 'Leyenda', 'Resumen', 'Datos. Encabezados: Magnitud; Valor. Filas: 2.', 'Fila 1 de 2. Magnitud: Presión; Valor: equis.', 'Fila 2 de 2. Valor: Visible.', 'Diagrama descrito', 'Leyenda visible', 'Después']);
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
    assert.equal(page.introTables, page.eligibleTables);
    assert.equal(page.images.length, page.eligibleImages);
    assert.ok(page.images.every(text => text.trim()));
    assert.ok(page.tableNodes > 0);
    assert.deepEqual(page.tableLeaks, []);
    assert.equal(page.tableCovered, true);
    assert.ok(page.boxes.every(Boolean));
    assert.equal(page.idsUnique, true);
    assert.equal(page.chapterIds.length, 8);
  }
  const statesIntro = 'Tabla de estudio. Encabezados: Estado; Cohesión frente a la agitación térmica; Forma; Volumen. Filas: 3.';
  assert.equal(result.closed.states.text, statesIntro);
  assert.deepEqual(result.closed.states.rows, [
    'Fila 1 de 3. Estado: Sólido; Cohesión frente a la agitación térmica: Predomina la cohesión; Forma: Propia; Volumen: Propio.',
    'Fila 2 de 3. Estado: Líquido; Cohesión frente a la agitación térmica: Cohesión y agitación están balanceadas; Forma: Adopta la del recipiente; Volumen: Propio.',
    'Fila 3 de 3. Estado: Gas; Cohesión frente a la agitación térmica: Predomina la agitación térmica; Forma: Adopta la del recipiente; Volumen: Adopta el del recipiente.',
  ]);
  assert.equal(result.open.conversion.text, 'Tabla de estudio. Encabezados: Apartado; Cálculo; Resultado. Filas: 6.');
  assert.deepEqual(result.open.conversion.rows, [
    'Fila 1 de 6. Apartado: a); Cálculo: 760 por 9 coma 80665; Resultado: 7 453 coma 05 newtons dividido por metros elevados a 3, fin de potencia.',
    'Fila 2 de 6. Apartado: b); Cálculo: 10 por 9 coma 80665; Resultado: 98 coma 07 newtons dividido por metros elevados a 3, fin de potencia.',
    'Fila 3 de 6. Apartado: c); Cálculo: 250 por 1000 por 9 coma 80665; Resultado: 2 451 662 coma 5 newtons.',
    'Fila 4 de 6. Apartado: d); Cálculo: 1 coma 5 por 1000 por 3600; Resultado: 5 400 000 litros dividido por horas.',
    'Fila 5 de 6. Apartado: e); Cálculo: 760 por base 10, elevada a menos 6, fin de potencia; Resultado: 7 coma 6 por base 10, elevada a menos 4, fin de potencia metros elevados a 3, fin de potencia.',
    'Fila 6 de 6. Apartado: f); Cálculo: 7 por 0 coma 0254; Resultado: 0 coma 1778 metros.',
  ]);
  assert.ok(result.closed.firstAlt.length > 20);
  assert.equal(result.closed.images.filter(text => text === result.closed.firstAlt).length, 1);
  assert.ok(result.open.eligibleMath > result.closed.eligibleMath);
  assert.equal(result.inventory.suspectTextSubscripts, 0);
  assert.equal(result.inventory.suspectDelta, 0);
  console.log('PASS extractor:', JSON.stringify({ closed: {blocks: result.closed.blocks, math: result.closed.eligibleMath, nodes: result.closed.expected.length}, open: {blocks: result.open.blocks, math: result.open.eligibleMath, nodes: result.open.expected.length} }));
  console.log('AUDIT', JSON.stringify(result.inventory));
});
