import { createMathNarrator } from './math.js';

// Extract speech without changing the academic DOM. Paths use all child nodes,
// including hidden nodes, so opening a disclosure does not renumber later blocks.
const omitted = 'table,nav,button,input,select,textarea,option,script,style,svg,img,canvas,video,audio,iframe,template';
const boundaries = new Set(['article', 'section', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'details', 'summary', 'figure', 'figcaption', 'blockquote', 'pre', 'address', 'hr']);
const clean = value => value.replace(/\s+/g, ' ').trim();
const defaultNarrator = createMathNarrator();

export function isVisible(element, stop = null) {
  for (let node = element; node; node = node.parentElement) {
    if (node.hidden || node.hasAttribute('inert') || node.getAttribute('aria-hidden')?.toLowerCase() === 'true') return false;
    const style = node.ownerDocument.defaultView.getComputedStyle(node);
    if (style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse') return false;
    const parent = node.parentElement;
    if (parent?.localName === 'details' && !parent.open) {
      const summary = [...parent.children].find(child => child.localName === 'summary');
      if (node !== summary) return false;
    }
    if (node === stop) break;
  }
  return true;
}

function path(node, root) {
  const parts = [];
  while (node && node !== root) {
    const parent = node.parentNode;
    if (!parent) break;
    parts.push([...parent.childNodes].indexOf(node));
    node = parent;
  }
  return parts.reverse().join('.') || 'root';
}

/** Speak visible cell content; nested tables are limited to two levels. */
function cellText(cell, options, depth = 0) {
  const { narrateMath, excludeSelector } = options;
  if (!isVisible(cell) || (excludeSelector && cell.closest(excludeSelector))) return '';
  let value = '';
  const read = node => {
    if (node.nodeType === 3) { value += node.data; return; }
    if (node.nodeType !== 1) return;
    if ((excludeSelector && node.matches(excludeSelector)) || !isVisible(node)) return;
    if (node.localName === 'table') {
      if (depth < 2) value += ` ${tableBlocks(node, options, depth + 1).map(block => block.text).join(' ')} `;
      return;
    }
    if (node.matches(omitted)) return;
    if (node.localName === 'math') { value += ` ${narrateMath(node)} `; return; }
    const boundary = boundaries.has(node.localName);
    if (boundary) value += ' ';
    for (const child of node.childNodes) read(child);
    if (boundary) value += ' ';
  };
  for (const child of cell.childNodes) read(child);
  return clean(value);
}

function tableName(table, options, depth) {
  const caption = [...table.children].find(child => child.localName === 'caption');
  const own = caption ? cellText(caption, options, depth) : '';
  if (own) return own;
  const labelled = table.getAttribute('aria-label') || table.closest('[aria-label]')?.getAttribute('aria-label');
  return clean(labelled || '') || 'Tabla';
}

/** Describe a table by headers and cells, preserving row-column relationships. */
function tableBlocks(table, options, depth = 0) {
  const headerRow = table.tHead?.rows[0] || [...table.rows].find(row => row.cells.length && [...row.cells].every(cell => cell.localName === 'th'));
  const headers = headerRow ? [...headerRow.cells].map(cell => cellText(cell, options, depth)) : [];
  const rows = (table.tBodies.length ? [...table.tBodies].flatMap(body => [...body.rows]).concat(table.tFoot ? [...table.tFoot.rows] : []) : [...table.rows])
    .filter(row => row !== headerRow && isVisible(row) && !(options.excludeSelector && row.closest(options.excludeSelector)));
  const described = rows.map(row => {
    const parts = [];
    [...row.cells].forEach((cell, column) => {
      const value = cellText(cell, options, depth);
      if (!value) return;
      const header = cell.localName === 'th' ? '' : headers[column];
      parts.push(header ? `${header}: ${value}` : value);
    });
    return { row, parts };
  }).filter(item => item.parts.length);
  const head = headers.filter(Boolean).join('; ');
  if (!head && !described.length) return [];
  const intro = `${tableName(table, options, depth)}.${head ? ` Encabezados: ${head}.` : ''} Filas: ${described.length}.`;
  return [{ element: table, text: intro }, ...described.map((item, index) => {
    const cells = item.parts.join('; ');
    return { element: item.row, text: `Fila ${index + 1} de ${described.length}. ${cells}${cells.endsWith('.') ? '' : '.'}` };
  })];
}

function listNumber(item) {
  const list = item.parentElement;
  if (!list || list.localName !== 'ol') return '';
  const items = [...list.children].filter(child => child.localName === 'li');
  const step = list.reversed ? -1 : 1;
  let value = list.hasAttribute('start') ? Number(list.getAttribute('start')) : list.reversed ? items.length : 1;
  for (const current of items) {
    if (current.hasAttribute('value')) value = Number(current.getAttribute('value'));
    if (current === item) return `${value}. `;
    value += step;
  }
  return '';
}

/** Return ordered {id,text,element,chapterId,chapterTitle,sectionTitle} records. */
export function extractBlocks(root, options = {}) {
  const {
    contentSelector = ':scope > article', excludeSelector = '', chapterSelector = 'article',
    chapterHeadingSelector = 'h1, h2', sectionHeadingSelector = 'h3, h4, h5, h6',
    narrateMath = defaultNarrator,
  } = options;
  if (!root?.querySelectorAll) throw new TypeError('Se requiere un elemento raíz');
  const scopes = contentSelector ? [...root.querySelectorAll(contentSelector)] : [root];
  const blocks = [];
  let chapterId = '', chapterTitle = '', sectionTitle = '';
  let buffer = '', start = null, owner = null;
  const pendingLists = [];
  const flush = () => {
    let text = clean(buffer);
    if (text && start && owner) {
      for (const list of pendingLists) {
        if (!list.used) { text = list.prefix + text; list.used = true; }
      }
      if (owner.matches(chapterHeadingSelector)) { chapterTitle = text; sectionTitle = ''; }
      else if (owner.matches(sectionHeadingSelector)) sectionTitle = text;
      blocks.push({ id: `lector-${path(start, root)}`, text, element: owner, chapterId, chapterTitle, sectionTitle });
    }
    buffer = ''; start = null; owner = null;
  };
  const add = (value, node, currentOwner, math = false) => {
    if (!value || (!start && !clean(value))) return;
    if (!start) { start = node; owner = currentOwner; }
    buffer += math ? ` ${value} ` : value;
  };
  const walk = (node, currentOwner) => {
    if (node.nodeType === 3) { add(node.data, node, currentOwner); return; }
    if (node.nodeType !== 1) return;
    if (excludeSelector && node.matches(excludeSelector)) return;
    if (!isVisible(node)) return;
    if (node.localName === 'table') {
      flush();
      for (const block of tableBlocks(node, { narrateMath, excludeSelector })) {
        blocks.push({ id: `lector-${path(block.element, root)}`, text: block.text, element: block.element, chapterId, chapterTitle, sectionTitle });
      }
      return;
    }
    if (node.localName === 'img') {
      flush();
      const alt = clean(node.getAttribute('alt') || '');
      const captions = node.closest('figure')?.querySelectorAll(':scope > figcaption') || [];
      const matchingCaption = alt && [...captions].some(caption => isVisible(caption) &&
        !(excludeSelector && caption.closest(excludeSelector)) && clean(caption.textContent) === alt);
      if (alt && !matchingCaption) {
        blocks.push({ id: `lector-${path(node, root)}`, text: alt, element: node, chapterId, chapterTitle, sectionTitle });
      }
      return;
    }
    if (node.matches(omitted)) return;
    if (node.localName === 'math') { add(narrateMath(node), node, currentOwner, true); return; }
    const boundary = boundaries.has(node.localName);
    if (boundary) flush();
    if (node.matches(chapterSelector)) {
      chapterId = node.id || `chapter-${path(node, root)}`;
      chapterTitle = ''; sectionTitle = '';
    }
    const list = node.localName === 'li' ? { prefix: listNumber(node), used: false } : null;
    if (list) pendingLists.push(list);
    const nextOwner = boundary ? node : currentOwner;
    for (const child of node.childNodes) walk(child, nextOwner);
    if (boundary) flush();
    if (list) pendingLists.pop();
  };
  for (const scope of scopes) {
    // An overlapping content selector must not visit descendants twice.
    if (scopes.some(other => other !== scope && other.contains(scope))) continue;
    walk(scope, scope);
    flush();
  }
  return blocks;
}
