import { SpeechReader } from './engine.js';
import { extractBlocks } from './extractor.js';
import { createMathNarrator } from './math.js';

const speeds = [0.8, 1, 1.2, 1.5];
function nearestSpeed(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return 1;
  return [...speeds].sort((a, b) => {
    const difference = Math.abs(a - value) - Math.abs(b - value);
    if (Math.abs(difference) > 1e-9) return difference;
    return Math.abs(a - 1) - Math.abs(b - 1) || a - b;
  })[0];
}

// La posición seleccionada y la presentación son independientes del estado del motor.
export function mountReader({ root, storageKey, mathRules = [], indexSelector = '', ...extractOptions }) {
  if (!root) throw new TypeError('Se requiere un elemento raíz');
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.dataset.lectorOpen = '';
  trigger.innerHTML = '<span aria-hidden="true">🎧</span> Escuchar';
  (root.querySelector('.reading-controls') || root).append(trigger);
  const panel = document.createElement('section');
  panel.className = 'lector';
  panel.dataset.lector = '';
  panel.setAttribute('aria-label', 'Lector de voz');
  panel.innerHTML = `
    <div class="lector-barra" data-lector-bar hidden>
      <div class="lector-informacion"><strong data-lector-location></strong><span><span data-lector-status role="status" aria-live="polite"></span> <span data-lector-progress></span></span></div>
      <div class="lector-transporte">
        <button type="button" data-lector-previous aria-label="Fragmento anterior">Anterior</button>
        <button type="button" data-lector-play>Reproducir</button>
        <button type="button" data-lector-next aria-label="Fragmento siguiente">Siguiente</button>
      </div>
      <div class="lector-secundarios">
        <label>Velocidad <select data-lector-rate><option value="0.8">0,8×</option><option value="1">1×</option><option value="1.2">1,2×</option><option value="1.5">1,5×</option></select></label>
        <button type="button" data-lector-settings-toggle aria-expanded="false" aria-controls="lector-configuracion">Configuración</button>
        <button type="button" data-lector-minimize>Minimizar</button>
        <button type="button" data-lector-close>Cerrar lector</button>
      </div>
      <div class="lector-configuracion" id="lector-configuracion" data-lector-settings hidden>
        <label>Capítulo <select data-lector-chapter></select></label>
        <label>Encabezado <select data-lector-heading></select></label>
        <label>Punto de lectura <select data-lector-point></select></label>
        <label>Voz <select data-lector-voice></select></label>
        <p data-lector-voices-status></p>
        <p>La voz y la velocidad cambian en el próximo fragmento.</p>
        <button type="button" data-lector-stop>Detener</button>
      </div>
    </div>
    <div class="lector-mini" data-lector-mini hidden>
      <span data-lector-mini-status></span>
      <button type="button" data-lector-mini-play>Reproducir</button>
      <button type="button" data-lector-restore>Restaurar lector</button>
      <button type="button" data-lector-mini-close>Cerrar lector</button>
    </div>`;
  root.insertBefore(panel, root.querySelector('article'));
  const $ = name => panel.querySelector(`[data-lector-${name}]`);
  const chapter = $('chapter'), heading = $('heading'), point = $('point'), voice = $('voice'), rate = $('rate');
  let saved = {};
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) saved = parsed;
  } catch { /* almacenamiento no disponible o inválido */ }
  let preferred = typeof saved.voiceURI === 'string' ? saved.voiceURI : '';
  let appliedPreference = '';
  let selected = 0, blocks = [], highlighted = null, changingQueue = false;
  let message = '', reader, presentation = 'closed';
  const narrator = createMathNarrator(mathRules);
  const opts = { ...extractOptions, narrateMath: narrator };
  const persist = () => {
    const current = blocks[selected];
    try {
      localStorage.setItem(storageKey, JSON.stringify({ voiceURI: preferred, rate: Number(rate.value),
        chapterId: current?.chapterId || '', blockId: current?.id || '' }));
    } catch { /* seguir funcionando sin almacenamiento */ }
  };
  const clearHighlight = () => { highlighted?.classList.remove('lector-activo'); highlighted = null; };
  const option = (select, value, label) => {
    const item = document.createElement('option'); item.value = value; item.textContent = label; select.append(item);
  };
  function showSelection() {
    const current = blocks[selected];
    const chapters = [...new Map(blocks.map(b => [b.chapterId, b.chapterTitle || b.chapterId])).entries()];
    chapter.replaceChildren();
    for (const [id, title] of chapters) option(chapter, id, title);
    chapter.value = current?.chapterId || '';
    const local = blocks.map((block, index) => ({ block, index })).filter(({ block }) => block.chapterId === current?.chapterId);
    const headings = local.filter(({ block }) => block.element.matches(`${extractOptions.chapterHeadingSelector || 'h1, h2'}, ${extractOptions.sectionHeadingSelector || 'h3, h4, h5, h6'}`));
    heading.replaceChildren(); point.replaceChildren();
    for (const item of headings) option(heading, String(item.index), item.block.text);
    for (const item of local) option(point, String(item.index), item.block.text);
    heading.value = String(headings.filter(item => item.index <= selected).at(-1)?.index ?? '');
    point.value = String(selected);
    $('progress').textContent = current ? `Fragmento ${local.findIndex(item => item.index === selected) + 1} de ${local.length}` : '';
    $('location').textContent = current ? [current.chapterTitle, current.sectionTitle].filter(Boolean).join(' / ') : 'No hay bloques visibles para leer.';
  }
  function render(snapshot) {
    if (changingQueue) return;
    if (['playing', 'paused', 'finished'].includes(snapshot.state) && snapshot.index >= 0) selected = snapshot.index;
    showSelection();
    voice.replaceChildren();
    for (const item of snapshot.voices) option(voice, item.voiceURI, `${item.name} (${item.lang})`);
    voice.value = snapshot.voice?.voiceURI || '';
    $('voices-status').textContent = !snapshot.supported ? 'La síntesis de voz no está disponible en este navegador.' :
      !snapshot.voices.length ? 'No hay voces en español disponibles.' :
      !snapshot.hasArgentineVoice ? 'No hay voz argentina (es-AR); se usa otra voz en español.' : '';
    rate.value = String(snapshot.rate);
    const status = snapshot.error || message || (!snapshot.supported ? 'La síntesis de voz no está disponible.' :
      ({ idle: 'Listo para reproducir.', playing: 'Leyendo.', paused: 'En pausa.', stopped: 'Detenido.', finished: 'Lectura terminada.', error: 'Error de lectura.' }[snapshot.state]));
    $('status').textContent = status;
    $('mini-status').textContent = status;
    $('play').textContent = $('mini-play').textContent = snapshot.state === 'playing' ? 'Pausar' : snapshot.state === 'paused' ? 'Reanudar' : 'Reproducir';
    const active = presentation !== 'closed' && ['playing', 'paused'].includes(snapshot.state) ? snapshot.block?.element : null;
    if (active !== highlighted) {
      clearHighlight();
      if (active) {
        highlighted = active; active.classList.add('lector-activo');
        const rect = active.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight) active.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
    }
    persist();
    // Aplicar una preferencia guardada cuando aparezca, sin fijar el fallback automático.
    if (reader && preferred && appliedPreference !== preferred && snapshot.voices.some(v => v.voiceURI === preferred)) {
      appliedPreference = preferred;
      reader.setVoice(preferred);
    }
  }
  reader = new SpeechReader({ onChange: render });
  blocks = extractBlocks(root, opts);
  selected = Math.max(0, blocks.findIndex(b => b.id === saved.blockId && b.chapterId === saved.chapterId));
  if (selected === 0 && !blocks.some(b => b.id === saved.blockId && b.chapterId === saved.chapterId)) {
    const first = blocks.findIndex(b => b.chapterId === saved.chapterId);
    if (first >= 0) selected = first;
  }
  changingQueue = true;
  reader.setBlocks(blocks);
  reader.setRate(nearestSpeed(saved.rate));
  changingQueue = false;
  render(reader.snapshot);
  const updateSpace = () => {
    const visible = presentation === 'open' ? $('bar') : presentation === 'minimized' ? $('mini') : null;
    document.body.style.setProperty('--lector-space', visible ? `${visible.getBoundingClientRect().height}px` : '0px');
  };
  const observer = new ResizeObserver(updateSpace);
  observer.observe($('bar')); observer.observe($('mini'));
  function show(state) {
    presentation = state;
    $('bar').hidden = state !== 'open';
    $('mini').hidden = state !== 'minimized';
    if (state !== 'open') {
      $('settings').hidden = true;
      $('settings-toggle').setAttribute('aria-expanded', 'false');
    }
    updateSpace();
  }
  function select(index) {
    if (index < 0 || index >= blocks.length) return;
    if (reader.snapshot.state === 'finished') reader.stop();
    selected = index; message = '';
    reader.select(index);
  }
  function visibleIndex() {
    return blocks.findIndex(({ element }) => {
      const rect = element.getBoundingClientRect();
      return rect.bottom > Math.min(96, innerHeight / 4) && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
    });
  }
  trigger.addEventListener('click', () => {
    const index = visibleIndex();
    if (index >= 0) select(index);
    show('open'); $('play').focus({ preventScroll: true });
  });
  const close = () => {
    const x = window.scrollX, y = window.scrollY;
    show('closed'); message = ''; reader.stop(); clearHighlight();
    window.scrollTo({ left: x, top: y, behavior: 'instant' });
    trigger.focus({ preventScroll: true });
  };
  $('close').addEventListener('click', close);
  $('mini-close').addEventListener('click', close);
  $('minimize').addEventListener('click', () => { show('minimized'); $('mini-play').focus({ preventScroll: true }); });
  $('restore').addEventListener('click', () => { show('open'); $('minimize').focus({ preventScroll: true }); });
  $('settings-toggle').addEventListener('click', () => {
    $('settings').hidden = !$('settings').hidden;
    $('settings-toggle').setAttribute('aria-expanded', String(!$('settings').hidden));
  });
  chapter.addEventListener('change', () => select(blocks.findIndex(b => b.chapterId === chapter.value)));
  heading.addEventListener('change', () => select(Number(heading.value)));
  point.addEventListener('change', () => select(Number(point.value)));
  const onIndexClick = event => {
    if (presentation === 'closed' || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.(indexSelector || ':not(*)');
    if (!link || link.target && link.target !== '_self' || link.hasAttribute('download')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
    const index = blocks.findIndex(block => block.element === target || target?.contains(block.element));
    if (index >= 0) select(index);
  };
  document.addEventListener('click', onIndexClick);
  voice.addEventListener('change', () => {
    if (reader.setVoice(voice.value)) { preferred = voice.value; appliedPreference = preferred; persist(); }
  });
  rate.addEventListener('change', () => reader.setRate(Number(rate.value)));
  const togglePlayback = () => {
    message = '';
    if (reader.snapshot.state === 'playing') reader.pause();
    else if (reader.snapshot.state === 'paused') reader.resume();
    else if (reader.snapshot.state === 'finished') reader.play();
    else reader.play(selected);
  };
  $('play').addEventListener('click', togglePlayback);
  $('mini-play').addEventListener('click', togglePlayback);
  $('stop').addEventListener('click', () => { message = ''; reader.stop(); });
  const move = delta => {
    message = '';
    if (['playing', 'paused'].includes(reader.snapshot.state)) {
      if (delta < 0) reader.previous(); else reader.next();
    } else select(Math.max(0, Math.min(blocks.length - 1, selected + delta)));
  };
  $('previous').addEventListener('click', () => move(-1));
  $('next').addEventListener('click', () => move(1));
  const onToggle = event => {
    if (event.target.localName !== 'details' || !event.target.closest('article') || !root.contains(event.target)) return;
    const id = blocks[selected]?.id, chapterId = blocks[selected]?.chapterId;
    changingQueue = true;
    reader.stop(); clearHighlight();
    blocks = extractBlocks(root, opts);
    selected = blocks.findIndex(b => b.id === id);
    if (selected < 0) selected = Math.max(0, blocks.findIndex(b => b.chapterId === chapterId));
    reader.setBlocks(blocks);
    changingQueue = false;
    message = 'El contenido visible cambió. Pulsá Reproducir para continuar.';
    render(reader.snapshot);
  };
  root.addEventListener('toggle', onToggle, true);
  return { destroy() { document.removeEventListener('click', onIndexClick); root.removeEventListener('toggle', onToggle, true); observer.disconnect(); reader.destroy(); clearHighlight(); panel.remove(); trigger.remove(); document.body.style.removeProperty('--lector-space'); } };
}
