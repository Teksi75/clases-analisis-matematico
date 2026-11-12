import { SpeechReader } from './engine.js';
import { extractBlocks } from './extractor.js';
import { createMathNarrator } from './math.js';

// El estado seleccionado en reposo es independiente del índice interno del motor.
export function mountReader({ root, storageKey, mathRules = [], ...extractOptions }) {
  if (!root) throw new TypeError('Se requiere un elemento raíz');
  const panel = document.createElement('section');
  panel.className = 'lector';
  panel.dataset.lector = '';
  panel.setAttribute('aria-label', 'Lector de voz');
  panel.innerHTML = `
    <h2>Lector de voz</h2>
    <p>Elegí un capítulo y un párrafo; después pulsá Reproducir. La voz y la velocidad cambian en el próximo fragmento.</p>
    <div class="lector-campos">
      <label>Capítulo <select data-lector-chapter></select></label>
      <label>Párrafo o bloque <select data-lector-block></select></label>
      <label>Voz <select data-lector-voice></select></label>
      <label>Velocidad <span><input data-lector-rate type="range" min="0.75" max="1.5" step="0.05" value="1"> <output data-lector-rate-output>1×</output></span></label>
    </div>
    <p data-lector-voices-status></p>
    <div class="lector-botones">
      <button type="button" data-lector-play>Reproducir</button>
      <button type="button" data-lector-pause>Pausar</button>
      <button type="button" data-lector-resume>Reanudar</button>
      <button type="button" data-lector-stop>Detener</button>
      <button type="button" data-lector-previous>Párrafo anterior</button>
      <button type="button" data-lector-next>Párrafo siguiente</button>
    </div>
    <p data-lector-location></p><p data-lector-status role="status" aria-live="polite"></p>`;
  root.insertBefore(panel, root.querySelector('article'));
  const $ = name => panel.querySelector(`[data-lector-${name}]`);
  const chapter = $('chapter'), block = $('block'), voice = $('voice'), rate = $('rate');
  let saved = {};
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) saved = parsed;
  } catch { /* almacenamiento no disponible o inválido */ }
  let preferred = typeof saved.voiceURI === 'string' ? saved.voiceURI : '';
  let appliedPreference = '';
  let selected = 0, blocks = [], highlighted = null, changingQueue = false;
  let message = '', reader;
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
    block.replaceChildren();
    blocks.forEach((item, index) => {
      if (item.chapterId === current?.chapterId) option(block, item.id, `${index + 1}. ${item.text.slice(0, 110)}`);
    });
    block.value = current?.id || '';
    $('location').textContent = current ? [current.chapterTitle, current.sectionTitle].filter(Boolean).join(' / ') : 'No hay bloques visibles para leer.';
  }
  function render(snapshot) {
    if (changingQueue) return;
    if (snapshot.state !== 'idle' && snapshot.index >= 0) selected = snapshot.index;
    showSelection();
    voice.replaceChildren();
    for (const item of snapshot.voices) option(voice, item.voiceURI, `${item.name} (${item.lang})`);
    voice.value = snapshot.voice?.voiceURI || '';
    $('voices-status').textContent = !snapshot.supported ? 'La síntesis de voz no está disponible en este navegador.' :
      !snapshot.voices.length ? 'No hay voces en español disponibles.' :
      !snapshot.hasArgentineVoice ? 'No hay voz argentina (es-AR); se usa otra voz en español.' : '';
    rate.value = snapshot.rate;
    $('rate-output').textContent = `${snapshot.rate}×`;
    $('status').textContent = snapshot.error || message || (!snapshot.supported ? 'La síntesis de voz no está disponible.' :
      ({ idle: 'Listo para reproducir.', playing: 'Leyendo.', paused: 'En pausa.', error: 'Error de lectura.' }[snapshot.state]));
    const active = ['playing', 'paused'].includes(snapshot.state) ? snapshot.block?.element : null;
    if (active !== highlighted) {
      clearHighlight();
      if (active) {
        highlighted = active; active.classList.add('lector-activo');
        const rect = active.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > innerHeight) active.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      }
    }
    persist();
    // La preferencia guardada se aplica solo cuando aparece; no convierte el fallback en elección manual.
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
  changingQueue = false;
  if (typeof saved.rate === 'number' && Number.isFinite(saved.rate) && saved.rate >= 0.75 && saved.rate <= 1.5) reader.setRate(saved.rate);
  render(reader.snapshot);
  function select(index) {
    if (index < 0 || index >= blocks.length) return;
    if (reader.snapshot.state !== 'idle') reader.stop();
    selected = index; message = ''; render(reader.snapshot);
  }
  chapter.addEventListener('change', () => select(blocks.findIndex(b => b.chapterId === chapter.value)));
  block.addEventListener('change', () => select(blocks.findIndex(b => b.id === block.value)));
  voice.addEventListener('change', () => {
    if (reader.setVoice(voice.value)) { preferred = voice.value; appliedPreference = preferred; persist(); }
  });
  rate.addEventListener('input', () => reader.setRate(Number(rate.value)));
  $('play').addEventListener('click', () => { message = ''; reader.play(selected); });
  $('pause').addEventListener('click', () => { message = ''; reader.pause(); });
  $('resume').addEventListener('click', () => { message = ''; reader.resume(); });
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
  return { destroy() { root.removeEventListener('toggle', onToggle, true); reader.destroy(); clearHighlight(); panel.remove(); } };
}
