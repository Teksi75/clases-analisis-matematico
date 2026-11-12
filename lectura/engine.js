// Speech synthesis is intentionally isolated from content extraction and UI.
const MAX_CHUNK = 200;
const LATIN_AMERICA = new Set([
  'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'GT', 'HN', 'MX',
  'NI', 'PA', 'PE', 'PR', 'PY', 'SV', 'US', 'UY', 'VE',
]);

function languageParts(voice) {
  return typeof voice?.lang === 'string' ? voice.lang.replaceAll('_', '-').split('-') : [];
}

function voiceRank(voice) {
  const [language, ...subtags] = languageParts(voice);
  if (language?.toLowerCase() !== 'es') return Infinity;
  const region = subtags.find(part => /^(?:[a-z]{2}|\d{3})$/i.test(part))?.toUpperCase();
  if (region === 'AR') return 0;
  if (region === '419') return 1;
  if (LATIN_AMERICA.has(region)) return 2;
  if (region === 'ES') return 3;
  return 4;
}

/** Available Spanish voices, ordered by preferred region; ties retain input order. */
export function spanishVoices(voices) {
  return Array.from(voices || []).filter(voice => voiceRank(voice) !== Infinity)
    .sort((a, b) => voiceRank(a) - voiceRank(b));
}

/** Split without changing text; prefer whitespace and never split a surrogate pair. */
export function segmentText(text) {
  const parts = [];
  let remaining = String(text ?? '');
  while (remaining.length > MAX_CHUNK) {
    let end = MAX_CHUNK;
    if (/[\uD800-\uDBFF]/.test(remaining[end - 1]) && /[\uDC00-\uDFFF]/.test(remaining[end])) end--;
    const window = remaining.slice(0, end);
    const whitespace = Math.max(window.lastIndexOf(' '), window.lastIndexOf('\n'), window.lastIndexOf('\t'));
    if (whitespace >= Math.floor(MAX_CHUNK / 2)) end = whitespace + 1;
    parts.push(remaining.slice(0, end));
    remaining = remaining.slice(end);
  }
  if (remaining) parts.push(remaining);
  return parts;
}

function sameVoice(a, b) {
  return a === b || Boolean(a?.voiceURI && b?.voiceURI && a.voiceURI === b.voiceURI);
}

export class SpeechReader {
  constructor(options = {}) {
    this.synthesis = options.synthesis === undefined ? globalThis.speechSynthesis : options.synthesis;
    this.Utterance = options.Utterance === undefined ? globalThis.SpeechSynthesisUtterance : options.Utterance;
    this.onChange = typeof options.onChange === 'function' ? options.onChange : () => {};
    this.blocks = [];
    this.voices = [];
    this.voice = null;
    this.preferredVoice = null;
    this.rate = 1;
    this.index = -1;
    this.chunkIndex = 0;
    this.chunks = [];
    this.state = 'idle';
    this.error = null;
    this.token = 0;
    this.active = null;
    this.nativePaused = false;
    this.destroyed = false;
    this.voiceListener = () => { this.refreshVoices(); this.notify(); };
    if (typeof this.synthesis?.addEventListener === 'function') {
      this.synthesis.addEventListener('voiceschanged', this.voiceListener);
    } else if (this.synthesis) {
      this.oldVoiceListener = this.synthesis.onvoiceschanged;
      this.fallbackVoiceListener = event => {
        if (typeof this.oldVoiceListener === 'function') this.oldVoiceListener.call(this.synthesis, event);
        this.voiceListener();
      };
      this.synthesis.onvoiceschanged = this.fallbackVoiceListener;
    }
    this.refreshVoices();
  }

  get snapshot() {
    return {
      state: this.state, index: this.index, chunkIndex: this.chunkIndex,
      chunkCount: this.chunks.length, block: this.blocks[this.index] ?? null,
      voices: [...this.voices], voice: this.voice, rate: this.rate, error: this.error,
      hasArgentineVoice: this.voices.some(voice => voiceRank(voice) === 0),
      supported: Boolean(this.synthesis && typeof this.synthesis.speak === 'function' && typeof this.Utterance === 'function'),
    };
  }

  notify() { if (!this.destroyed) this.onChange(this.snapshot); }

  refreshVoices() {
    try { this.voices = spanishVoices(this.synthesis?.getVoices?.() || []); }
    catch { this.voices = []; }
    this.voice = this.voices.find(voice => sameVoice(voice, this.preferredVoice)) ?? this.voices[0] ?? null;
  }

  // Invalidate before cancel: some engines synchronously dispatch cancellation events.
  cancel() {
    this.token++;
    this.active = null;
    try { this.synthesis?.cancel?.(); } catch { /* cancellation is best effort */ }
  }

  loadBlock(index) {
    this.index = index;
    this.chunkIndex = 0;
    this.chunks = index >= 0 && index < this.blocks.length ? segmentText(this.blocks[index].text) : [];
  }

  setBlocks(blocks, position) {
    if (this.destroyed) return;
    if (position !== undefined) {
      if (!Array.isArray(blocks) || !position || typeof position !== 'object') return false;
      const { index, chunkIndex = 0, paused = false } = position;
      if (!Number.isInteger(index) || index < 0 || index >= blocks.length ||
          !Number.isInteger(chunkIndex) || chunkIndex < 0 || typeof paused !== 'boolean') return false;
      const count = segmentText(blocks[index].text).length;
      if (chunkIndex >= Math.max(count, 1)) return false;
      this.#relocate([...blocks], index, chunkIndex, paused);
      return true;
    }
    this.cancel();
    this.blocks = Array.isArray(blocks) ? [...blocks] : [];
    this.loadBlock(this.blocks.length ? 0 : -1);
    this.state = 'idle';
    this.error = null;
    this.notify();
  }

  // Relocation keeps the transport state unless a safe fallback must be paused.
  #relocate(blocks, index, chunkIndex, paused) {
    this.cancel();
    this.blocks = blocks;
    this.loadBlock(index);
    this.chunkIndex = chunkIndex;
    if (paused) { this.state = 'paused'; this.error = null; }
    if (this.state === 'playing') this.startChunk();
    else this.notify();
  }

  select(index) {
    if (this.destroyed || !Number.isInteger(index) || index < 0 || index >= this.blocks.length) return false;
    this.#relocate(this.blocks, index, 0, false);
    return true;
  }

  setVoice(voice) {
    if (this.destroyed) return false;
    const available = this.voices.find(candidate => typeof voice === 'string'
      ? candidate.voiceURI === voice : sameVoice(candidate, voice));
    if (!available || voiceRank(available) === Infinity) return false;
    this.preferredVoice = available;
    this.voice = available;
    this.notify();
    return true;
  }

  setRate(rate) {
    if (this.destroyed || typeof rate !== 'number' || !Number.isFinite(rate) || rate < 0.75 || rate > 1.5) return false;
    this.rate = rate;
    this.notify();
    return true;
  }

  play(index) {
    if (this.destroyed) return;
    if (index === undefined && this.state === 'paused') { this.resume(); return; }
    if (index === undefined && this.state === 'playing') return;
    if (index !== undefined && (!Number.isInteger(index) || index < 0 || index >= this.blocks.length)) return;
    this.cancel();
    if (index !== undefined) this.loadBlock(index);
    else if ((this.state === 'finished' || this.index < 0) && this.blocks.length) this.loadBlock(0);
    this.error = null;
    this.state = 'playing';
    if (this.nativePaused) this.resumeNative();
    this.startChunk();
  }

  startChunk() {
    if (this.destroyed || this.state !== 'playing') return;
    while (this.index >= 0 && this.index < this.blocks.length && this.chunkIndex >= this.chunks.length) {
      if (this.index + 1 >= this.blocks.length) {
        this.state = 'finished';
        this.chunkIndex = 0;
        this.notify();
        return;
      }
      this.loadBlock(this.index + 1);
    }
    if (this.index < 0 || !this.blocks.length) { this.state = 'idle'; this.notify(); return; }
    if (!this.snapshot.supported) { this.fail('La síntesis de voz no está disponible.'); return; }
    // Refresh before every utterance so a removed voice cannot fall back to a foreign one.
    this.refreshVoices();
    if (!this.voice) { this.fail('No hay voces en español disponibles.'); return; }
    const token = ++this.token;
    try {
      const utterance = new this.Utterance(this.chunks[this.chunkIndex]);
      utterance.voice = this.voice;
      utterance.lang = this.voice.lang;
      utterance.rate = this.rate;
      this.active = utterance;
      utterance.onend = () => {
        if (this.destroyed || token !== this.token || this.active !== utterance) return;
        this.active = null;
        this.chunkIndex++;
        if (this.state === 'playing') this.startChunk();
        else this.notify();
      };
      utterance.onerror = event => {
        if (this.destroyed || token !== this.token || this.active !== utterance) return;
        this.fail(`Error de síntesis: ${event?.error || 'desconocido'}`);
      };
      this.notify();
      if (this.destroyed || token !== this.token || this.active !== utterance) return;
      if (this.state !== 'playing') {
        // A listener may pause synchronously before this utterance is submitted.
        this.active = null;
        this.token++;
        return;
      }
      this.synthesis.speak(utterance);
    } catch (error) {
      if (token === this.token) this.fail(`Error de síntesis: ${error?.message || String(error)}`);
    }
  }

  fail(message) {
    this.cancel();
    this.state = 'error';
    this.error = message;
    this.notify();
  }

  pause() {
    if (this.destroyed || this.state !== 'playing') return;
    this.state = 'paused';
    try { this.synthesis?.pause?.(); this.nativePaused = true; } catch { /* native pause is platform dependent */ }
    this.notify();
  }

  resumeNative() {
    try { this.synthesis?.resume?.(); } catch { /* native resume is platform dependent */ }
    this.nativePaused = false;
  }

  resume() {
    if (this.destroyed) return;
    if (this.state === 'error') { this.play(); return; }
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.resumeNative();
    if (this.active) this.notify();
    else this.startChunk();
  }

  stop() {
    if (this.destroyed) return;
    this.cancel();
    this.state = 'stopped';
    this.error = null;
    if (this.index >= 0) this.loadBlock(this.index);
    this.notify();
  }

  move(delta) {
    if (this.destroyed || !this.blocks.length) return;
    const target = Math.max(0, Math.min(this.blocks.length - 1, Math.max(this.index, 0) + delta));
    const previousState = this.state;
    this.cancel();
    this.loadBlock(target);
    this.error = null;
    this.state = previousState === 'playing' ? 'playing' : previousState === 'paused' ? 'paused' : 'idle';
    if (this.state === 'playing') this.startChunk();
    else this.notify();
  }

  previous() { this.move(-1); }
  next() { this.move(1); }

  destroy() {
    if (this.destroyed) return;
    this.cancel();
    if (typeof this.synthesis?.removeEventListener === 'function') {
      this.synthesis.removeEventListener('voiceschanged', this.voiceListener);
    } else if (this.synthesis && this.synthesis.onvoiceschanged === this.fallbackVoiceListener) {
      this.synthesis.onvoiceschanged = this.oldVoiceListener ?? null;
    }
    this.destroyed = true;
  }
}
