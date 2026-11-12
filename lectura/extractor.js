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
    if (node.matches(omitted) || (excludeSelector && node.matches(excludeSelector)) || !isVisible(node)) return;
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
