import test from 'node:test';
import assert from 'node:assert/strict';
import { SpeechReader, spanishVoices, segmentText } from '../lectura/engine.js';

const ar = { name: 'Argentina', lang: 'es-AR', voiceURI: 'ar' };
const mx = { name: 'México', lang: 'es-MX', voiceURI: 'mx' };
const uy = { name: 'Uruguay', lang: 'es-UY', voiceURI: 'uy' };
const es = { name: 'España', lang: 'es-ES', voiceURI: 'es' };
const generic = { name: 'Español', lang: 'es', voiceURI: 'generic' };
const en = { name: 'English', lang: 'en-US', voiceURI: 'en' };
const block = (id, text = id) => ({ id, text, element: null, chapterId: 'c', chapterTitle: 'Capítulo', sectionTitle: 'Sección' });

class Utterance {
  constructor(text) { this.text = text; }
}
class Synthesis {
  constructor(voices = [ar]) { this.voices = voices; this.spoken = []; this.listeners = new Set(); this.cancels = 0; this.pauses = 0; this.resumes = 0; }
  getVoices() { return this.voices; }
  addEventListener(name, listener) { if (name === 'voiceschanged') this.listeners.add(listener); }
  removeEventListener(name, listener) { if (name === 'voiceschanged') this.listeners.delete(listener); }
  changeVoices(voices) { this.voices = voices; for (const listener of this.listeners) listener(); }
  speak(utterance) { this.spoken.push(utterance); }
  cancel() { this.cancels++; }
  pause() { this.pauses++; }
  resume() { this.resumes++; }
}
function setup(voices = [ar]) {
  const synthesis = new Synthesis(voices);
  const changes = [];
  const reader = new SpeechReader({ synthesis, Utterance, onChange: snapshot => changes.push(snapshot) });
  return { synthesis, reader, changes };
}

test('Spanish voices are filtered and ordered by region, with stable ties', () => {
  const other = { name: 'Filipinas', lang: 'es-PH' };
  const co = { name: 'Colombia', lang: 'es-CO' };
  assert.deepEqual(spanishVoices([en, es, other, mx, generic, ar, uy, co]), [ar, mx, uy, co, es, other, generic]);
  assert.deepEqual(spanishVoices([]), []);
});

test('late voices notify but never start speech; foreign and unavailable manual voices rejected', () => {
  const { synthesis, reader, changes } = setup([]);
  reader.setBlocks([block('a')]);
  reader.play();
  assert.equal(synthesis.spoken.length, 0);
  assert.equal(reader.snapshot.state, 'error');
  assert.ok(reader.snapshot.error);
  synthesis.changeVoices([en, es, ar]);
  assert.equal(synthesis.spoken.length, 0);
  assert.deepEqual(reader.snapshot.voices, [ar, es]);
  assert.equal(reader.snapshot.hasArgentineVoice, true);
  assert.ok(changes.length);
  assert.equal(reader.setVoice(en), false);
  assert.equal(reader.setVoice({ ...ar, voiceURI: 'missing' }), false);
  reader.play();
  assert.equal(synthesis.spoken[0].voice, ar);
  assert.equal(synthesis.spoken[0].lang, 'es-AR');
  reader.destroy();
  assert.equal(synthesis.listeners.size, 0);
});

test('manual voice selection accepts an available Spanish voiceURI only', () => {
  const { reader } = setup([ar, mx, en]);
  assert.equal(reader.setVoice('mx'), true);
  assert.equal(reader.snapshot.voice, mx);
  assert.equal(reader.setVoice('en'), false);
  assert.equal(reader.setVoice('missing'), false);
  assert.equal(reader.snapshot.voice, mx);
});

test('segments preserve exact text and stay bounded, including long words and surrogate pairs', () => {
  const text = 'Primer párrafo. ' + 'palabra '.repeat(100) + '😀'.repeat(300) + ' final\n';
  const parts = segmentText(text);
  assert.equal(parts.join(''), text);
  assert.ok(parts.length > 2);
  for (const part of parts) {
    assert.ok(part.length <= 200);
    assert.ok(!/^[\uDC00-\uDFFF]/.test(part));
    assert.ok(!/[\uD800-\uDBFF]$/.test(part));
  }
  assert.deepEqual(segmentText(''), []);
});

test('pause and resume preserve position; end while paused waits for explicit resume', () => {
  const { synthesis, reader } = setup();
  reader.setBlocks([block('a', 'uno '.repeat(110)), block('b')]);
  reader.play();
  const first = synthesis.spoken[0];
  reader.pause();
  assert.equal(reader.snapshot.state, 'paused');
  assert.equal(reader.snapshot.index, 0);
  assert.equal(reader.snapshot.chunkIndex, 0);
  first.onend();
  assert.equal(synthesis.spoken.length, 1);
  assert.equal(reader.snapshot.index, 0);
  assert.equal(reader.snapshot.chunkIndex, 1);
  reader.resume();
  assert.equal(synthesis.spoken.length, 2);
  assert.equal(reader.snapshot.chunkIndex, 1);
  assert.equal(synthesis.pauses, 1);
  assert.equal(synthesis.resumes, 1);
  synthesis.spoken[1].onend();
  while (reader.snapshot.index === 0) synthesis.spoken.at(-1).onend();
  assert.equal(reader.snapshot.block.id, 'b');
  synthesis.spoken.at(-1).onend();
  assert.equal(reader.snapshot.state, 'idle');
});

test('native pause and resume retain the same active utterance', () => {
  const { synthesis, reader } = setup();
  reader.setBlocks([block('one'), block('two')]);
  reader.play(1);
  reader.pause(); reader.resume();
  assert.equal(synthesis.spoken.length, 1);
  assert.equal(reader.snapshot.index, 1);
  assert.equal(reader.snapshot.chunkIndex, 0);
  synthesis.spoken[0].onend();
  assert.equal(reader.snapshot.state, 'idle');
});

test('stop, skip and replacement invalidate late end and error events', () => {
  const { synthesis, reader } = setup();
  reader.setBlocks([block('a'), block('b'), block('c')]);
  reader.play();
  const old = synthesis.spoken.at(-1);
  reader.next();
  assert.equal(reader.snapshot.index, 1);
  old.onend(); old.onerror({ error: 'late' });
  assert.equal(reader.snapshot.index, 1);
  assert.equal(reader.snapshot.state, 'playing');
  const skipped = synthesis.spoken.at(-1);
  reader.previous();
  skipped.onend(); skipped.onerror({ error: 'late' });
  assert.equal(reader.snapshot.index, 0);
  const replaced = synthesis.spoken.at(-1);
  reader.setBlocks([block('new')]);
  replaced.onend(); replaced.onerror({ error: 'late' });
  assert.equal(reader.snapshot.state, 'idle');
  assert.equal(reader.snapshot.block.id, 'new');
  reader.play();
  const stopped = synthesis.spoken.at(-1);
  reader.stop();
  stopped.onend(); stopped.onerror({ error: 'late' });
  assert.equal(reader.snapshot.state, 'idle');
  assert.equal(reader.snapshot.index, 0);
  assert.equal(synthesis.spoken.length, 4);
});

test('voice and valid rate changes apply only to the next chunk', () => {
  const { synthesis, reader } = setup([es, mx]);
  reader.setBlocks([block('a', 'palabra '.repeat(100))]);
  reader.play();
  const first = synthesis.spoken[0];
  assert.equal(first.voice, mx);
  assert.equal(first.rate, 1);
  assert.equal(reader.setVoice(es), true);
  assert.equal(reader.setRate(1.5), true);
  assert.equal(reader.setRate(0.75), true);
  for (const bad of [0.74, 1.51, NaN, Infinity, '1']) assert.equal(reader.setRate(bad), false);
  assert.equal(reader.snapshot.rate, 0.75);
  assert.equal(synthesis.spoken.length, 1);
  first.onend();
  assert.equal(synthesis.spoken[1].voice, es);
  assert.equal(synthesis.spoken[1].rate, 0.75);
  assert.equal(reader.snapshot.hasArgentineVoice, false);
});

test('synthesis errors stop safely and require explicit retry', () => {
  const { synthesis, reader } = setup();
  reader.setBlocks([block('a'), block('b')]);
  reader.play();
  const first = synthesis.spoken[0];
  first.onerror({ error: 'not-allowed' });
  assert.equal(reader.snapshot.state, 'error');
  assert.match(reader.snapshot.error, /not-allowed/);
  first.onend();
  assert.equal(synthesis.spoken.length, 1);
  assert.equal(reader.snapshot.index, 0);
  reader.resume();
  assert.equal(synthesis.spoken.length, 2);
  assert.equal(reader.snapshot.index, 0);
  synthesis.spoken[1].onend();
  assert.equal(reader.snapshot.index, 1);
});

test('pausing from an onChange callback before speak can resume without losing the chunk', () => {
  const synthesis = new Synthesis();
  let reader;
  let once = true;
  reader = new SpeechReader({ synthesis, Utterance, onChange: snapshot => {
    if (once && snapshot.state === 'playing') { once = false; reader.pause(); }
  } });
  reader.setBlocks([block('a')]);
  reader.play();
  assert.equal(reader.snapshot.state, 'paused');
  assert.equal(synthesis.spoken.length, 0);
  reader.resume();
  assert.equal(synthesis.spoken.length, 1);
  assert.equal(synthesis.spoken[0].text, 'a');
});

test('voice disappearance fails safely at the next chunk without a foreign fallback', () => {
  const { synthesis, reader } = setup([ar]);
  reader.setBlocks([block('a', 'texto '.repeat(100))]);
  reader.play();
  synthesis.changeVoices([en]);
  synthesis.spoken[0].onend();
  assert.equal(synthesis.spoken.length, 1);
  assert.equal(reader.snapshot.state, 'error');
  assert.equal(reader.snapshot.index, 0);
  assert.equal(reader.snapshot.chunkIndex, 1);
  synthesis.changeVoices([mx]);
  assert.equal(synthesis.spoken.length, 1);
  reader.resume();
  assert.equal(synthesis.spoken[1].voice, mx);
  assert.equal(reader.snapshot.chunkIndex, 1);
});

test('skipping while paused waits for resume and ignores synchronous cancellation events', () => {
  const { synthesis, reader } = setup();
  synthesis.cancel = function () { this.cancels++; this.spoken.at(-1)?.onerror({ error: 'canceled' }); };
  reader.setBlocks([block('a'), block('b')]);
  reader.play(); reader.pause(); reader.next();
  assert.equal(reader.snapshot.state, 'paused');
  assert.equal(reader.snapshot.index, 1);
  assert.equal(synthesis.spoken.length, 1);
  reader.resume();
  assert.equal(synthesis.spoken.length, 2);
  assert.equal(synthesis.spoken[1].text, 'b');
});

test('playing after stop or explicit selection while paused resumes the native synthesizer', () => {
  const { synthesis, reader } = setup();
  reader.setBlocks([block('a'), block('b')]);
  reader.play(); reader.pause(); reader.stop(); reader.play();
  assert.equal(synthesis.resumes, 1);
  reader.pause(); reader.play(1);
  assert.equal(synthesis.resumes, 2);
  assert.equal(reader.snapshot.index, 1);
  assert.equal(synthesis.spoken.at(-1).text, 'b');
});

test('missing APIs and synchronous speak errors are visible and never crash', () => {
  const reader = new SpeechReader({ synthesis: null, Utterance: null });
  reader.setBlocks([block('a')]);
  assert.doesNotThrow(() => { reader.play(); reader.pause(); reader.resume(); reader.stop(); reader.destroy(); });
  const broken = new Synthesis();
  broken.speak = () => { throw new Error('gesture required'); };
  const other = new SpeechReader({ synthesis: broken, Utterance });
  other.setBlocks([block('a')]);
  other.play();
  assert.equal(other.snapshot.state, 'error');
  assert.match(other.snapshot.error, /gesture required/);
});
