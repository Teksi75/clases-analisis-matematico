// Presentation MathML is the source of the automatic transcription. TeX annotations
// are used only as exact rule keys, never spoken in addition to the presentation.
const greek = {
  α: 'alfa', β: 'beta', γ: 'gamma', δ: 'delta', ε: 'épsilon', ζ: 'zeta', η: 'eta',
  θ: 'theta', ϑ: 'theta', ι: 'iota', κ: 'kappa', λ: 'lambda', μ: 'mu', ν: 'nu',
  ξ: 'xi', ο: 'ómicron', π: 'pi', ϖ: 'pi', ρ: 'rho', ϱ: 'rho', σ: 'sigma', ς: 'sigma',
  τ: 'tau', υ: 'ípsilon', φ: 'fi', ϕ: 'fi', χ: 'ji', ψ: 'psi', ω: 'omega',
  Γ: 'gamma mayúscula', Δ: 'delta mayúscula', Θ: 'theta mayúscula', Λ: 'lambda mayúscula',
  Ξ: 'xi mayúscula', Π: 'pi mayúscula', Σ: 'sigma mayúscula', Φ: 'fi mayúscula',
  Ψ: 'psi mayúscula', Ω: 'omega mayúscula',
};
const operators = {
  '=': 'igual a', '≠': 'distinto de', '<': 'menor que', '>': 'mayor que',
  '≤': 'menor o igual que', '≥': 'mayor o igual que', '≈': 'aproximadamente igual a',
  '≃': 'aproximadamente igual a', '∝': 'proporcional a', '+': 'más', '−': 'menos',
  '-': 'menos', '±': 'más o menos', '∓': 'menos o más', '×': 'por', '·': 'por',
  '⋅': 'por', '⁢': 'por', '/': 'dividido por', '÷': 'dividido por',
  '∑': 'sumatoria', '∫': 'integral', '∞': 'infinito', '→': 'tiende a',
  '⇒': 'implica', '⇔': 'equivale a', '∂': 'derivada parcial', '∇': 'nabla',
  '(': 'abre paréntesis', ')': 'cierra paréntesis', '[': 'abre corchete',
  ']': 'cierra corchete', '{': 'abre llave', '}': 'cierra llave',
  ',': 'coma', '.': 'punto', ':': 'dos puntos', ';': 'punto y coma',
  '%': 'por ciento', '°': 'grados', '∘': 'grados', '′': 'prima', '″': 'segunda',
  '∈': 'pertenece a', '∉': 'no pertenece a', '∪': 'unión', '∩': 'intersección', '⟂': 'perpendicular',
  '…': 'puntos suspensivos', '⋯': 'puntos suspensivos', '|': 'barra vertical',
  '⁡': 'de',
};
const units = {
  m: 'metros', km: 'kilómetros', cm: 'centímetros', mm: 'milímetros', dm: 'decímetros',
  kg: 'kilogramos', g: 'gramos', mg: 'miligramos', t: 'toneladas', kgf: 'kilogramos fuerza',
  s: 'segundos', min: 'minutos', h: 'horas', N: 'newtons', kN: 'kilonewtons',
  Pa: 'pascales', kPa: 'kilopascales', MPa: 'megapascales', atm: 'atmósferas',
  L: 'litros', mL: 'mililitros', J: 'julios', W: 'vatios', C: 'grados Celsius',
  K: 'kelvin', Hz: 'hercios', mol: 'moles', bar: 'bares',
};
const text = value => value.replace(/\s+/g, ' ').trim();
const normalizeTex = text;
const children = node => [...node.children];
const tag = node => node.localName;

function token(node) {
  const raw = text(node.textContent);
  if (!raw) return '';
  if (tag(node) === 'mo' || operators[raw]) return operators[raw] || `operador ${raw}`;
  if (tag(node) === 'mi' && node.getAttribute('mathvariant') === 'normal' && units[raw]) return units[raw];
  if (greek[raw]) return greek[raw];
  // Unknown symbols remain audible instead of being discarded.
  return [...raw].map(character => greek[character] || character).join('');
}

function isAtom(node) {
  if (tag(node) === 'mo' || tag(node) === 'mspace') return false;
  return !(tag(node) === 'mi' && operators[text(node.textContent)]);
}
function isOpen(node) { return tag(node) === 'mo' && ['(', '[', '{'].includes(text(node.textContent)); }
function isClose(node) { return tag(node) === 'mo' && [')', ']', '}'].includes(text(node.textContent)); }

// Pandoc sometimes attaches the script to the closing delimiter instead of the
// complete parenthesized base. Recover that base without modifying the DOM.
function scriptedGroup(nodes, start) {
  if (!isOpen(nodes[start])) return null;
  const stack = [];
  const pairs = { '(': ')', '[': ']', '{': '}' };
  for (let i = start; i < nodes.length; i++) {
    const node = nodes[i];
    if (isOpen(node)) { stack.push(pairs[text(node.textContent)]); continue; }
    const scripted = ['msup', 'msub', 'msubsup'].includes(tag(node)) && node.children.length >= 2 &&
      tag(node.children[0]) === 'mo';
    const close = scripted ? text(node.children[0].textContent) : isClose(node) ? text(node.textContent) : '';
    if (!close) continue;
    if (stack.pop() !== close) return null;
    if (!stack.length) return scripted ? { end: i, node } : null;
  }
  return null;
}

function row(nodes) {
  const parts = [];
  let previous = null;
  let numericSpace = false;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (tag(node) === 'annotation' || tag(node) === 'annotation-xml') continue;
    if (tag(node) === 'mspace') {
      if (parseFloat(node.getAttribute('width')) >= 1) { parts.push(','); previous = null; }
      else numericSpace = previous && tag(previous) === 'mn';
      continue;
    }
    // Pandoc represents a degree sign as a superscript on an empty space.
    if (tag(node) === 'msup' && node.children.length === 2 && tag(node.children[0]) === 'mspace' &&
        ['∘', '°'].includes(text(node.children[1].textContent))) {
      const next = nodes[i + 1];
      const celsius = next && tag(next) === 'mi' && next.getAttribute('mathvariant') === 'normal' && text(next.textContent) === 'C';
      parts.push(celsius ? 'grados Celsius' : 'grados');
      previous = celsius ? next : node;
      if (celsius) i++;
      numericSpace = false;
      continue;
    }
    const group = scriptedGroup(nodes, i);
    if (group) {
      if (previous && (isAtom(previous) || isClose(previous))) parts.push('por');
      const base = row(nodes.slice(i + 1, group.end));
      const script = children(group.node);
      if (tag(group.node) === 'msup') parts.push(`base ${base}, elevada a ${render(script[1])}, fin de potencia`);
      else if (tag(group.node) === 'msub') parts.push(`grupo ${base}, fin de grupo subíndice ${render(script[1])}, fin de subíndice`);
      else parts.push(`grupo ${base}, fin de grupo subíndice ${render(script[1])}, fin de subíndice, elevada a ${render(script[2])}, fin de potencia`);
      previous = group.node; i = group.end; numericSpace = false; continue;
    }
    // Pandoc can split cm³ into upright c followed by an exponent on upright m.
    const exponent = nodes[i + 1];
    if (tag(node) === 'mi' && node.getAttribute('mathvariant') === 'normal' &&
        exponent && tag(exponent) === 'msup' && exponent.children.length === 2 &&
        tag(exponent.children[0]) === 'mi' && exponent.children[0].getAttribute('mathvariant') === 'normal') {
      const unit = units[text(node.textContent) + text(exponent.children[0].textContent)];
      if (unit) {
        if (previous && (isAtom(previous) || isClose(previous))) parts.push('por');
        parts.push(`${unit} elevados a ${render(exponent.children[1])}, fin de potencia`);
        previous = exponent; i++; numericSpace = false; continue;
      }
    }
    // Pandoc emits a unit like kg as consecutive upright mi elements.
    if (tag(node) === 'mi' && node.getAttribute('mathvariant') === 'normal') {
      let end = i, raw = '';
      while (end < nodes.length && tag(nodes[end]) === 'mi' && nodes[end].getAttribute('mathvariant') === 'normal' && /^[A-Za-z]+$/.test(text(nodes[end].textContent))) {
        raw += text(nodes[end].textContent); end++;
      }
      if (end > i && units[raw]) {
        if (previous && (isAtom(previous) || isClose(previous))) parts.push('por');
        parts.push(units[raw]); previous = nodes[end - 1]; i = end - 1; numericSpace = false; continue;
      }
    }
    let spoken = render(node);
    if (!spoken) continue;
    // A nested multi-item row is a single operand, including products and quotients.
    if (tag(node) === 'mrow' && nodes.filter(item => tag(item) !== 'mspace').length > 1 &&
        children(node).filter(item => tag(item) !== 'mspace').length > 1) {
      spoken = `grupo ${spoken}, fin de grupo`;
    }
    if (previous && (isAtom(previous) || isClose(previous)) && (isAtom(node) || isOpen(node)) &&
        !(numericSpace && tag(node) === 'mn')) parts.push('por');
    parts.push(spoken);
    previous = node;
    numericSpace = false;
  }
  return parts.join(' ').replace(/\s+,/g, ',');
}

function render(node) {
  const name = tag(node), items = children(node);
  const child = index => items[index] ? render(items[index]) : 'elemento ausente';
  switch (name) {
    case 'math': case 'mrow': case 'mstyle': case 'mpadded': case 'mphantom': case 'merror':
      return row(items);
    case 'semantics': {
      const presentation = items.find(item => !['annotation', 'annotation-xml'].includes(tag(item)));
      return presentation ? render(presentation) : 'presentación MathML ausente';
    }
    case 'mi': case 'mn': case 'mo': case 'mtext': case 'ms': return token(node);
    case 'mspace': case 'annotation': case 'annotation-xml': return '';
    case 'mfrac': return `fracción, numerador ${child(0)}, denominador ${child(1)}, fin de fracción`;
    case 'msup': {
      const base = items[0];
      if (base && tag(base) === 'mi' && base.getAttribute('mathvariant') === 'normal' && units[text(base.textContent)]) {
        return `${child(0)} elevados a ${child(1)}, fin de potencia`;
      }
      return `base ${child(0)}, elevada a ${child(1)}, fin de potencia`;
    }
    case 'msub': return `${child(0)} subíndice ${child(1)}, fin de subíndice`;
    case 'msubsup':
      if (items[0] && tag(items[0]) === 'mo' && ['∫', '∑'].includes(text(items[0].textContent))) {
        return `${child(0)} desde ${child(1)} hasta ${child(2)}`;
      }
      return `${child(0)} subíndice ${child(1)}, fin de subíndice, elevada a ${child(2)}, fin de potencia`;
    case 'msqrt': return `raíz cuadrada de ${row(items)}, fin de raíz`;
    case 'mroot': return `raíz de índice ${child(1)}, radicando ${child(0)}, fin de raíz`;
    case 'munderover': return `${child(0)} desde ${child(1)} hasta ${child(2)}`;
    case 'munder': return `${child(0)} con límite inferior ${child(1)}`;
    case 'mover': return `${child(0)} con límite superior ${child(1)}`;
    case 'mfenced': return `abre paréntesis ${row(items)} cierra paréntesis`;
    case 'mtable': return `tabla matemática, ${items.map(render).join(', ')}, fin de tabla`;
    case 'mtr': case 'mlabeledtr': return `fila ${items.map(render).join(', ')}, fin de fila`;
    case 'mtd': return `celda ${row(items)}, fin de celda`;
    default: return `elemento MathML ${name}: ${items.length ? row(items) : text(node.textContent)}, fin de elemento ${name}`;
  }
}

function prepareRules(rules) {
  if (!Array.isArray(rules)) throw new TypeError('Las reglas deben ser un arreglo');
  const keys = new Set();
  return rules.map(rule => {
    if (!rule || typeof rule.speech !== 'string' || !text(rule.speech) ||
        (typeof rule.tex === 'string') === (typeof rule.id === 'string') ||
        (rule.scope !== undefined && (typeof rule.scope !== 'string' || !rule.scope.trim()))) {
      throw new TypeError('Regla matemática inválida');
    }
    const kind = typeof rule.tex === 'string' ? 'tex' : 'id';
    const value = kind === 'tex' ? normalizeTex(rule.tex) : rule.id.trim();
    if (!value) throw new TypeError('Regla matemática sin clave');
    const key = JSON.stringify([kind, value, rule.scope || '']);
    if (keys.has(key)) throw new Error(`Regla matemática duplicada: ${value}`);
    keys.add(key);
    return { kind, value, scope: rule.scope, speech: text(rule.speech) };
  });
}

export function createMathNarrator(rules = []) {
  const prepared = prepareRules(rules);
  return math => {
    if (!math || math.localName !== 'math') throw new TypeError('Se requiere un elemento math');
    const annotation = math.querySelector('annotation[encoding="application/x-tex"]');
    const tex = annotation ? normalizeTex(annotation.textContent) : null;
    const matches = prepared.filter(rule =>
      (rule.kind === 'id' ? math.id === rule.value : tex === rule.value) &&
      (!rule.scope || math.closest(rule.scope)));
    const speeches = new Set(matches.map(rule => rule.speech));
    if (speeches.size > 1) throw new Error('Conflicto entre reglas matemáticas');
    return matches.length ? matches[0].speech : render(math);
  };
}

export function narrateMath(mathElement, rules = []) {
  return createMathNarrator(rules)(mathElement);
}
