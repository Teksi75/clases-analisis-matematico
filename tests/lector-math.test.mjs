import assert from 'node:assert/strict';
import { withBrowser } from './lector-browser-helper.mjs';

// Every previously flagged eligible annotation is pinned independently of the rules.
const corrected = [
  ['capitulo-02', String.raw`\rho_{agua}=1000\ \mathrm{kg/m^3}\quad\Longrightarrow\quad \gamma_{agua}=9806{,}65\ \mathrm{N/m^3}=1000\ \mathrm{kgf/m^3}.`, 'rho subíndice agua igual a 1000 kilogramos por metro cúbico, implica gamma subíndice agua igual a 9806 coma 65 newtons por metro cúbico igual a 1000 kilogramos fuerza por metro cúbico'],
  ['capitulo-02', String.raw`\rho_{media}=\frac{m_1+m_2}{V_1+V_2}=\frac{\rho_1V_1+\rho_2V_2}{V_1+V_2}.`, 'rho subíndice media igual a fracción, numerador m subíndice 1 más m subíndice 2, denominador V subíndice 1 más V subíndice 2, fin de fracción igual a fracción, numerador rho subíndice 1 por V subíndice 1 más rho subíndice 2 por V subíndice 2, denominador V subíndice 1 más V subíndice 2, fin de fracción'],
  ['capitulo-02', String.raw`\rho=\frac{m}{V}\qquad \gamma=\rho g\qquad \rho_r=\frac{\rho}{\rho_{agua}}`, 'rho igual a fracción, numerador m, denominador V, fin de fracción; gamma igual a rho por g; rho subíndice r igual a fracción, numerador rho, denominador rho subíndice agua, fin de fracción'],
  ['capitulo-04', String.raw`p_{abs}=p_{man}+p_{atm}.`, 'p subíndice abs igual a p subíndice man más p subíndice atm'],
  ['capitulo-04', String.raw`p_{atm}=101\,325\ \mathrm{Pa}`, 'p subíndice atm igual a 101 325 pascales'],
  ['capitulo-04', String.raw`h_{agua}=\frac{101\,325}{1000\times 9{,}80665}=10{,}33\ \mathrm{mca}.`, 'h subíndice agua igual a fracción, numerador 101 325, denominador 1000 por 9 coma 80665, fin de fracción igual a 10 coma 33 metros de columna de agua'],
  ['capitulo-04', String.raw`\Delta p=\rho_m g\,\Delta h.`, 'variación de p igual a rho subíndice m por g por variación de h'],
  ['capitulo-05', String.raw`\rho g\,\Delta h`, 'rho por g por variación de h'],
  ['capitulo-06', String.raw`E=\rho_{f}\,g\,V_{desplazado}=\gamma_{f}\,V_{desplazado}.`, 'E igual a rho subíndice f por g por V subíndice desplazado igual a gamma subíndice f por V subíndice desplazado'],
  ['capitulo-06', String.raw`\rho_{f}\,g\,V_{sumergido}=\rho_{c}\,g\,V_{total}\qquad\Longrightarrow\qquad\frac{V_{sumergido}}{V_{total}}=\frac{\rho_{c}}{\rho_{f}}.`, 'rho subíndice f por g por V subíndice sumergido igual a rho subíndice c por g por V subíndice total; implica fracción, numerador V subíndice sumergido, denominador V subíndice total, fin de fracción igual a fracción, numerador rho subíndice c, denominador rho subíndice f, fin de fracción'],
  ['capitulo-08', String.raw`\rho_{aceite}=800\ \mathrm{kg/m^3}`, 'rho subíndice aceite igual a 800 kilogramos por metro cúbico'],
  ['capitulo-08', String.raw`\rho_{agua}=1000\ \mathrm{kg/m^3}`, 'rho subíndice agua igual a 1000 kilogramos por metro cúbico'],
  ['capitulo-08', String.raw`V=\pi r^2h=\pi(1)^2(4)=12{,}566371\ \mathrm{m^3}\qquad V_{cada\ uno}=6{,}283185\ \mathrm{m^3}.`, 'V igual a pi por r al cuadrado por h igual a pi por 1 al cuadrado por 4 igual a 12 coma 566371 metros cúbicos; V subíndice cada uno igual a 6 coma 283185 metros cúbicos'],
  ['capitulo-08', String.raw`\rho_{media}=\frac{800+1000}{2}=900\ \mathrm{kg/m^3}.`, 'rho subíndice media igual a fracción, numerador 800 más 1000, denominador 2, fin de fracción igual a 900 kilogramos por metro cúbico'],
  ['capitulo-08', String.raw`h_{agua}=\frac{101\,302{,}7}{1000\times 9{,}80665}=10{,}33\ \mathrm{mca}.`, 'h subíndice agua igual a fracción, numerador 101 302 coma 7, denominador 1000 por 9 coma 80665, fin de fracción igual a 10 coma 33 metros de columna de agua'],
  ['capitulo-08', String.raw`p_{interfaz}=800\times 1=800\ \mathrm{kgf/m^2}=7\,845{,}32\ \mathrm{Pa}.`, 'p subíndice interfaz igual a 800 por 1 igual a 800 kilogramos fuerza por metro cuadrado igual a 7 845 coma 32 pascales'],
  ['capitulo-08', String.raw`p_{fondo}=800\times 1+1000\times 1=1\,800\ \mathrm{kgf/m^2}=17\,651{,}97\ \mathrm{Pa}.`, 'p subíndice fondo igual a 800 por 1 más 1000 por 1 igual a 1 800 kilogramos fuerza por metro cuadrado igual a 17 651 coma 97 pascales'],
  ['capitulo-08', String.raw`\rho_{hielo}=917\ \mathrm{kg/m^3}`, 'rho subíndice hielo igual a 917 kilogramos por metro cúbico'],
  ['capitulo-08', String.raw`h_s=h\frac{\rho_{hielo}}{\rho_{agua}}=0{,}1\times\frac{917}{1000}=0{,}0917\ \mathrm{m},`, 'h subíndice s igual a h por fracción, numerador rho subíndice hielo, denominador rho subíndice agua, fin de fracción igual a 0 coma 1 por fracción, numerador 917, denominador 1000, fin de fracción igual a 0 coma 0917 metros'],
  ['capitulo-08', String.raw`h_{emergida}=0{,}1-0{,}0917=0{,}0083\ \mathrm{m}.`, 'h subíndice emergida igual a 0 coma 1 menos 0 coma 0917 igual a 0 coma 0083 metros'],
  ['capitulo-08', String.raw`E=\rho_{hielo}V g=917\times(0{,}1)^3\times 9{,}80665=8{,}9927\ \mathrm{N}.`, 'E igual a rho subíndice hielo por V por g igual a 917 por 0 coma 1 al cubo por 9 coma 80665 igual a 8 coma 9927 newtons'],
];

// Complete chapter-scoped source identities, multiplicities and independently specified speech.
const columns = [
  ['capitulo-03', String.raw`1\ \mathrm{mmHg}=133{,}322\ \mathrm{Pa}`, 1, '1 milímetro de mercurio igual a 133 coma 322 pascales'],
  ['capitulo-04', String.raw`h_{Hg}=\frac{101\,325}{13\,600\times 9{,}80665}=0{,}7596\ \mathrm{m}\approx 760\ \mathrm{mmHg},`, 1, 'h subíndice mercurio igual a fracción, numerador 101 325, denominador 13 600 por 9 coma 80665, fin de fracción igual a 0 coma 7596 metros aproximadamente igual a 760 milímetros de mercurio'],
  ['capitulo-04', String.raw`10{,}33\ \mathrm{mca}`, 1, '10 coma 33 metros de columna de agua'],
  ['capitulo-04', String.raw`760\ \mathrm{mmHg}`, 2, '760 milímetros de mercurio'],
  ['capitulo-04', String.raw`\frac{10\,330}{13\,600}=0{,}7596\ \mathrm{m}=759{,}6\ \mathrm{mm}\approx 760\ \mathrm{mmHg}.`, 1, 'fracción, numerador 10 330, denominador 13 600, fin de fracción igual a 0 coma 7596 metros igual a 759 coma 6 milímetros aproximadamente igual a 760 milímetros de mercurio'],
  ['capitulo-04', String.raw`750\ \mathrm{mmHg}`, 1, '750 milímetros de mercurio'],
  ['capitulo-04', String.raw`10\,330/1000=10{,}33\ \mathrm{mca}`, 1, '10 330 dividido por 1000 igual a 10 coma 33 metros de columna de agua'],
  ['capitulo-08', String.raw`750\ \mathrm{mmHg}`, 2, '750 milímetros de mercurio'],
  ['capitulo-08', String.raw`\rho_{Hg}=13\,600\ \mathrm{kg/m^3}`, 1, 'rho subíndice mercurio igual a 13 600 kilogramos por metro cúbico'],
  ['capitulo-08', String.raw`h_{Hg}=\frac{101\,302{,}7}{13\,600\times 9{,}80665}=0{,}75956\ \mathrm{m}=759{,}56\ \mathrm{mmHg}.`, 1, 'h subíndice mercurio igual a fracción, numerador 101 302 coma 7, denominador 13 600 por 9 coma 80665, fin de fracción igual a 0 coma 75956 metros igual a 759 coma 56 milímetros de mercurio'],
  ['capitulo-08', String.raw`759{,}56\ \mathrm{mmHg}`, 1, '759 coma 56 milímetros de mercurio'],
  ['capitulo-08', String.raw`760\ \mathrm{mmHg}`, 1, '760 milímetros de mercurio'],
  ['capitulo-08', String.raw`1\ \mathrm{atm}=101\,325\ \mathrm{Pa}=10\,332{,}3\ \mathrm{kgf/m^2}=10{,}33\ \mathrm{mca}=760\ \mathrm{mmHg}`, 1, '1 atmósfera igual a 101 325 pascales igual a 10 332 coma 3 kilogramos fuerza por metro cuadrado igual a 10 coma 33 metros de columna de agua igual a 760 milímetros de mercurio'],
];

await withBrowser(async ({ evaluate, url }) => {
  const result = await evaluate(`(async () => {
    const { narrateMath, createMathNarrator } = await import(${JSON.stringify(url('lectura/math.js'))});
    const { mathRules } = await import(${JSON.stringify(url('fluidos/lectura-matematica.js'))});
    const parse = body => new DOMParser().parseFromString(
      '<math xmlns="http://www.w3.org/1998/Math/MathML">' + body + '</math>', 'application/xml').documentElement;
    const speak = body => narrateMath(parse(body));
    const page = tex => [...document.querySelectorAll('math')].find(m =>
      m.querySelector('annotation[encoding="application/x-tex"]')?.textContent === tex);
    const fromPage = tex => {
      const math = page(tex);
      if (!math) throw new Error('Falta fórmula real: ' + tex);
      return narrateMath(math, mathRules);
    };
    const caught = f => { try { f(); return false; } catch (e) { return /regla|conflicto/i.test(e.message); } };
    const semantic = parse('<semantics><mi>x</mi><annotation encoding="application/x-tex"> x </annotation></semantics>');
    const custom = [{ tex: 'x', speech: 'personalizada' }];
    const idMath = parse('<mi>x</mi>'); idMath.id = 'formula';
    const container = document.createElement('div'); container.className = 'zona'; container.append(idMath);
    const scoped = [{ id: 'formula', scope: '.zona', speech: 'por identificador' }];
    const sum = '<munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>n</mi></munderover><msub><mi>x</mi><mi>i</mi></msub>';
    return {
      columnInventory: [...document.querySelectorAll('main#contenido > article math')].filter(m => {
        if (m.closest('table, [hidden], [inert], [aria-hidden="true"]')) return false;
        for (let e = m; e; e = e.parentElement) {
          const s = getComputedStyle(e);
          if (s.display === 'none' || s.visibility === 'hidden' || s.visibility === 'collapse') return false;
        }
        const tex = m.querySelector('annotation[encoding="application/x-tex"]')?.textContent || '';
        return tex.includes('mca') || tex.includes('mmHg') || [...m.querySelectorAll('msub, msubsup')].some(s => s.children[1]?.textContent.trim() === 'Hg');
      }).map(m => [m.closest('article').id, m.querySelector('annotation[encoding="application/x-tex"]').textContent]),
      columns: ${JSON.stringify(columns)}.map(([chapter, tex]) => [...document.querySelectorAll('#' + chapter + ' math')]
        .filter(m => !m.closest('table') && m.querySelector('annotation[encoding="application/x-tex"]')?.textContent === tex)
        .map(m => narrateMath(m, mathRules))),
      corrected: ${JSON.stringify(corrected)}.map(([chapter, tex]) => {
        const matches = [...document.querySelectorAll('#' + chapter + ' math')].filter(m => m.querySelector('annotation[encoding="application/x-tex"]')?.textContent === tex);
        if (!matches.length) throw new Error('Falta fórmula real: ' + chapter + ' ' + tex);
        return matches.map(m => narrateMath(m, mathRules));
      }),
      scopedOutside: (() => {
        const original = page(${JSON.stringify(String.raw`\rho_{agua}=1000\ \mathrm{kg/m^3}\quad\Longrightarrow\quad \gamma_{agua}=9806{,}65\ \mathrm{N/m^3}=1000\ \mathrm{kgf/m^3}.`)});
        const detached = original.cloneNode(true);
        return narrateMath(detached, mathRules);
      })(),
      density: fromPage('\\\\rho=m/V'),
      pressure: fromPage('p=\\\\rho g h'),
      force: fromPage('F=pA'),
      densityBlock: fromPage('\\\\rho=\\\\frac{m}{V}\\\\qquad [\\\\rho]=\\\\frac{\\\\mathrm{kg}}{\\\\mathrm{m^3}}.'),
      gauge: fromPage('p_{man}=\\\\rho g h.'),
      weight: fromPage('W=mg'),
      examples: ['\\\\rho=\\\\frac{m}{V}', 'P=\\\\rho gh', 'F=P\\\\cdot A'].map(tex => {
        const math = parse('<semantics><mi>x</mi><annotation encoding="application/x-tex"></annotation></semantics>');
        math.querySelector('annotation').textContent = tex;
        return narrateMath(math, mathRules);
      }),
      custom: narrateMath(semantic, custom),
      factory: createMathNarrator(custom)(semantic),
      scope: narrateMath(idMath, scoped),
      duplicate: caught(() => createMathNarrator([{tex:'x',speech:'a'}, {tex:' x ',speech:'b'}])),
      conflict: caught(() => narrateMath(idMath, [{id:'formula',speech:'a'}, {id:'formula',scope:'.zona',speech:'b'}])),
      identicalMatches: narrateMath(idMath, [{id:'formula',speech:'a'}, {id:'formula',scope:'.zona',speech:'a'}]),
      fraction: speak('<mfrac><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow><mrow><mi>c</mi><mo>−</mo><mi>d</mi></mrow></mfrac>'),
      power: speak('<msup><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow><mn>2</mn></msup><mi>c</mi>'),
      sub: speak('<msub><mi>x</mi><mrow><mi>i</mi><mo>+</mo><mn>1</mn></mrow></msub>'),
      root: speak('<mroot><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mn>3</mn></mroot>'),
      sqrt: speak('<msqrt><mi>x</mi><mo>+</mo><mn>1</mn></msqrt>'),
      compare: speak('<mi>x</mi><mo>≤</mo><mi>y</mi><mo>≠</mo><mi>z</mi>'),
      greek: speak('<mi>ρ</mi><mo>+</mo><mi>Δ</mi><mo>+</mo><mi>π</mi>'),
      variables: speak('<mi>m</mi><mi>g</mi><mi>h</mi>'),
      groupedProduct: speak('<mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow><mi>c</mi>'),
      groupedDivision: speak('<mi>x</mi><mo>/</mo><mrow><mi>a</mi><mo>+</mo><mi>b</mi></mrow>'),
      pandocPower: speak('<mi>a</mi><mo>(</mo><mi>x</mi><mo>+</mo><mn>1</mn><msup><mo>)</mo><mn>2</mn></msup>'),
      unit: speak('<mrow><mi mathvariant="normal">k</mi><mi mathvariant="normal">g</mi><mi mathvariant="normal">/</mi><msup><mi mathvariant="normal">m</mi><mn>3</mn></msup></mrow>'),
      compoundUnit: speak('<mi mathvariant="normal">c</mi><msup><mi mathvariant="normal">m</mi><mn>3</mn></msup>'),
      spacedNumber: speak('<mn>101</mn><mspace width="0.167em"/><mn>325</mn>'),
      degrees: speak('<mn>100</mn><msup><mspace width="0.222em"/><mo>∘</mo></msup><mi mathvariant="normal">C</mi>'),
      sum: speak(sum),
      integral: speak('<msubsup><mo>∫</mo><mn>0</mn><mn>1</mn></msubsup><mi>x</mi>'),
      subpower: speak('<msubsup><mi>x</mi><mi>i</mi><mn>2</mn></msubsup>'),
      perpendicular: fromPage('F_\\\\perp=pA'),
      relativeDensity: fromPage('\\\\rho_r=\\\\frac{\\\\rho_{sustancia}}{\\\\rho_{agua}}.'),
      pressureDelta: fromPage('\\\\Delta p'),
      unknownOperator: speak('<mi>x</mi><mo>⊛</mo><mi>y</mi>'),
      unknownTag: speak('<mystery><mi>x</mi></mystery>'),
      annotation: narrateMath(semantic),
      pageCount: document.querySelectorAll('math').length,
    };
  })()`);
  const expectedInventory = [
    ...columns.flatMap(([chapter, tex, count]) => Array.from({length: count}, () => JSON.stringify([chapter, tex]))),
    ...corrected.filter(([, tex]) => tex.includes('mca')).map(([chapter, tex]) => JSON.stringify([chapter, tex])),
  ].sort();
  assert.equal(columns.reduce((sum, [, , count]) => sum + count, 0), 15);
  assert.deepEqual(result.columnInventory.map(pair => JSON.stringify(pair)).sort(), expectedInventory);
  for (const [index, [chapter, tex, count, speech]] of columns.entries()) {
    assert.deepEqual(result.columns[index], Array(count).fill(speech), chapter + ' ' + tex);
  }
  assert.equal(corrected.length, 21);
  assert.deepEqual(result.corrected.map(values => [...new Set(values)]), corrected.map(([, , speech]) => [speech]));
  assert.notEqual(result.scopedOutside, corrected[0][2]);
  assert.equal(result.density, 'La densidad es igual a la masa dividida por el volumen');
  assert.equal(result.pressure, 'La presión es igual a la densidad por la aceleración de la gravedad por la profundidad');
  assert.equal(result.force, 'La fuerza es igual a la presión multiplicada por el área');
  assert.equal(result.densityBlock, 'La densidad es igual a la masa dividida por el volumen; la unidad de densidad es kilogramos por metro cúbico');
  assert.equal(result.gauge, 'La presión manométrica es igual a la densidad por la aceleración de la gravedad por la profundidad');
  assert.equal(result.weight, 'El peso es igual a la masa por la aceleración de la gravedad');
  assert.deepEqual(result.examples, [result.density, result.pressure, result.force]);
  assert.equal(result.custom, 'personalizada');
  assert.equal(result.factory, 'personalizada');
  assert.equal(result.scope, 'por identificador');
  assert.equal(result.duplicate, true);
  assert.equal(result.conflict, true);
  assert.equal(result.identicalMatches, 'a');
  assert.equal(result.fraction, 'fracción, numerador a más b, denominador c menos d, fin de fracción');
  assert.equal(result.power, 'base a más b, elevada a 2, fin de potencia por c');
  assert.equal(result.sub, 'x subíndice i más 1, fin de subíndice');
  assert.equal(result.root, 'raíz de índice 3, radicando x más 1, fin de raíz');
  assert.equal(result.sqrt, 'raíz cuadrada de x más 1, fin de raíz');
  assert.equal(result.compare, 'x menor o igual que y distinto de z');
  assert.equal(result.greek, 'rho más delta mayúscula más pi');
  assert.equal(result.variables, 'm por g por h');
  assert.equal(result.groupedProduct, 'grupo a más b, fin de grupo por c');
  assert.equal(result.groupedDivision, 'x dividido por grupo a más b, fin de grupo');
  assert.equal(result.pandocPower, 'a por base x más 1, elevada a 2, fin de potencia');
  assert.equal(result.unit, 'kilogramos dividido por metros elevados a 3, fin de potencia');
  assert.equal(result.compoundUnit, 'centímetros elevados a 3, fin de potencia');
  assert.equal(result.spacedNumber, '101 325');
  assert.equal(result.degrees, '100 grados Celsius');
  assert.equal(result.sum, 'sumatoria desde i igual a 1 hasta n por x subíndice i, fin de subíndice');
  assert.equal(result.integral, 'integral desde 0 hasta 1 por x');
  assert.equal(result.subpower, 'x subíndice i, fin de subíndice, elevada a 2, fin de potencia');
  assert.deepEqual([result.perpendicular, result.relativeDensity, result.pressureDelta], [
    'F subíndice perpendicular, fin de subíndice igual a p por A',
    'rho subíndice r igual a rho subíndice sustancia dividido por rho subíndice agua',
    'Variación de presión',
  ]);
  assert.equal(result.unknownOperator, 'x operador ⊛ y');
  assert.equal(result.unknownTag, 'elemento MathML mystery: x, fin de elemento mystery');
  assert.equal(result.annotation, 'x');
  assert.ok(result.pageCount > 400);
  console.log('PASS MathML en Chromium, reglas de página y conflictos');
});
