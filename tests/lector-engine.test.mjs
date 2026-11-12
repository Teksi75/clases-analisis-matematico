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

test('regional numeric and script voice tags preserve the specified priority', () => {
  const latin = { lang: 'es_Latn_419', voiceURI: 'latin' };
  const argentina = { lang: 'es-Latn-AR', voiceURI: 'arg' };
  assert.deepEqual(spanishVoices([es, mx, latin, generic, argentina]), [argentina, latin, mx, es, generic]);
});

test('natural end is finished and replay starts at the beginning; stop is distinct', () => {
  const { reader, synthesis } = setup();
  reader.setBlocks([block('a'), block('b')]);
  reader.play(); synthesis.spoken.at(-1).onend(); synthesis.spoken.at(-1).onend();
  assert.equal(reader.snapshot.state, 'finished');
  reader.play(); assert.equal(synthesis.spoken.at(-1).text, 'a');
  reader.stop(); assert.equal(reader.snapshot.state, 'stopped');
});

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

test('late Argentine voice replaces an automatic choice but preserves a manual choice', () => {
  const automatic = setup([es]);
  automatic.reader.setBlocks([block('a')]);
  automatic.synthesis.changeVoices([es, ar]);
  assert.equal(automatic.synthesis.spoken.length, 0);
  automatic.reader.play();
  assert.equal(automatic.synthesis.spoken[0].voice, ar);

  const manual = setup([es]);
  assert.equal(manual.reader.setVoice(es), true);
  manual.reader.setBlocks([block('a')]);
  manual.synthesis.changeVoices([es, ar]);
  assert.equal(manual.synthesis.spoken.length, 0);
  manual.reader.play();
  assert.equal(manual.synthesis.spoken[0].voice, es);
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
  assert.equal(reader.snapshot.state, 'finished');
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
  assert.equal(reader.snapshot.state, 'finished');
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
  assert.equal(reader.snapshot.state, 'stopped');
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

test('direct selection preserves transport state, bounds, and cancellation safety', () => {
  for (const state of ['playing', 'paused', 'stopped', 'idle', 'finished', 'error']) {
    const { reader, synthesis } = setup();
    const blocks = [block('a'), block('b', 'palabra '.repeat(80)), block('c')];
    reader.setBlocks(blocks);
    if (state !== 'idle') reader.play();
    if (state === 'paused') reader.pause();
    if (state === 'stopped') reader.stop();
    if (state === 'finished') {
      while (reader.snapshot.state === 'playing') synthesis.spoken.at(-1).onend();
    }
    if (state === 'error') synthesis.spoken.at(-1).onerror({ error: 'test' });
    const old = synthesis.spoken.at(-1);
    const before = reader.snapshot;
    const spoken = synthesis.spoken.length;
    const cancels = synthesis.cancels;
    for (const invalid of [-1, 3, 1.5, NaN, '1']) {
      assert.equal(reader.select(invalid), false);
      assert.deepEqual(reader.snapshot, before);
      assert.equal(synthesis.cancels, cancels);
      assert.equal(synthesis.spoken.length, spoken);
    }
    synthesis.cancel = function () {
      this.cancels++;
      old?.onend(); old?.onerror({ error: 'synchronous cancellation' });
    };
    assert.equal(reader.select(1), true);
    assert.equal(synthesis.cancels, cancels + 1);
    assert.equal(reader.snapshot.state, state);
    assert.equal(reader.snapshot.index, 1);
    assert.equal(reader.snapshot.chunkIndex, 0);
    assert.equal(reader.snapshot.chunkCount, segmentText(blocks[1].text).length);
    assert.equal(reader.snapshot.block, blocks[1]);
    assert.equal(reader.snapshot.error, before.error);
    assert.equal(synthesis.spoken.length, spoken + (state === 'playing' ? 1 : 0));
    if (state === 'playing') assert.equal(synthesis.spoken.at(-1).text, segmentText(blocks[1].text)[0]);
    const after = reader.snapshot;
    old?.onend(); old?.onerror({ error: 'late' });
    assert.deepEqual(reader.snapshot, after);
    assert.equal(synthesis.spoken.length, spoken + (state === 'playing' ? 1 : 0));
    if (state === 'paused') {
      reader.resume();
      assert.equal(synthesis.spoken.at(-1).text, segmentText(blocks[1].text)[0]);
      assert.equal(reader.snapshot.state, 'playing');
    }
  }
});

test('queue replacement restores an explicit safe position or pauses at fallback', () => {
  for (const initial of ['playing', 'paused', 'stopped', 'idle']) {
    for (const fallback of [false, true]) {
      const { reader, synthesis } = setup();
      reader.setBlocks([block('old'), block('other')]);
      if (initial !== 'idle') reader.play();
      if (initial === 'paused') reader.pause();
      if (initial === 'stopped') reader.stop();
      const old = synthesis.spoken.at(-1);
      const blocks = [block('heading'), block('safe', 'texto '.repeat(100))];
      const before = reader.snapshot;
      const spoken = synthesis.spoken.length;
      const cancels = synthesis.cancels;
      for (const options of [{ index: -1 }, { index: 2 }, { index: 1, chunkIndex: -1 },
        { index: 1, chunkIndex: 999 }, { index: 1, paused: 'yes' }, { index: 0.5 }]) {
        assert.equal(reader.setBlocks(blocks, options), false);
        assert.deepEqual(reader.snapshot, before);
        assert.equal(synthesis.cancels, cancels);
        assert.equal(synthesis.spoken.length, spoken);
      }
      synthesis.cancel = function () {
        this.cancels++;
        old?.onend(); old?.onerror({ error: 'synchronous cancellation' });
      };
      const index = fallback ? 0 : 1;
      const chunkIndex = fallback ? 0 : 1;
      assert.equal(reader.setBlocks(blocks, { index, chunkIndex, paused: fallback }), true);
      const expectedState = fallback ? 'paused' : initial;
      assert.equal(reader.snapshot.state, expectedState);
      assert.equal(reader.snapshot.index, index);
      assert.equal(reader.snapshot.chunkIndex, chunkIndex);
      assert.equal(reader.snapshot.chunkCount, segmentText(blocks[index].text).length);
      assert.equal(reader.snapshot.block, blocks[index]);
      assert.equal(reader.snapshot.error, null);
      assert.equal(synthesis.cancels, cancels + 1);
      const starts = initial === 'playing' && !fallback ? 1 : 0;
      assert.equal(synthesis.spoken.length, spoken + starts);
      if (starts) assert.equal(synthesis.spoken.at(-1).text, segmentText(blocks[index].text)[chunkIndex]);
      const after = reader.snapshot;
      old?.onend(); old?.onerror({ error: 'late' });
      assert.deepEqual(reader.snapshot, after);
      assert.equal(synthesis.spoken.length, spoken + starts);
      if (expectedState === 'paused') {
        reader.resume();
        assert.equal(synthesis.spoken.at(-1).text, segmentText(blocks[index].text)[chunkIndex]);
        assert.equal(reader.snapshot.state, 'playing');
      }
    }
  }
});

test('selected playback continues across chapters and keeps voice, rate and chunking', () => {
  const { reader, synthesis } = setup([ar, mx]);
  const text = 'contenido '.repeat(55);
  const blocks = [block('earlier'), { ...block('selected', text), chapterId: 'first' },
    { ...block('next chapter'), chapterId: 'second' }];
  reader.setBlocks(blocks);
  reader.setVoice(mx); reader.setRate(1.2);
  reader.play(); reader.stop();
  assert.equal(reader.select(1), true);
  assert.equal(reader.snapshot.state, 'stopped');
  assert.equal(synthesis.spoken.length, 1);
  reader.play();
  for (const part of segmentText(text)) {
    const utterance = synthesis.spoken.at(-1);
    assert.equal(utterance.text, part);
    assert.equal(utterance.voice, mx);
    assert.equal(utterance.rate, 1.2);
    utterance.onend();
  }
  assert.equal(reader.snapshot.index, 2);
  assert.equal(reader.snapshot.block.chapterId, 'second');
  assert.equal(synthesis.spoken.at(-1).text, 'next chapter');
  synthesis.spoken.at(-1).onend();
  assert.equal(reader.snapshot.state, 'finished');
});

test('explicit replacement rejects invalid queues and supports empty text without speech', () => {
  const { reader, synthesis } = setup();
  reader.setBlocks([block('original')]);
  const before = reader.snapshot;
  const cancels = synthesis.cancels;
  for (const [blocks, position] of [[[], { index: 0 }], [null, { index: 0 }],
    [[block('x')], null], [[block('x')], {}], [[block('x')], { index: 0, chunkIndex: 1.5 }]]) {
    assert.equal(reader.setBlocks(blocks, position), false);
    assert.deepEqual(reader.snapshot, before);
    assert.equal(synthesis.cancels, cancels);
    assert.equal(synthesis.spoken.length, 0);
  }
  assert.equal(reader.setBlocks([block('empty', '')], { index: 0, paused: true }), true);
  assert.equal(reader.snapshot.state, 'paused');
  assert.equal(reader.snapshot.index, 0);
  assert.equal(reader.snapshot.chunkIndex, 0);
  assert.equal(reader.snapshot.chunkCount, 0);
  assert.equal(synthesis.spoken.length, 0);
  reader.destroy();
  assert.equal(reader.select(0), false);
  assert.equal(synthesis.spoken.length, 0);
});

test('existing relative moves and default replacement retain their original states', () => {
  const { reader, synthesis } = setup();
  reader.setBlocks([block('a'), block('b')]);
  reader.play(); reader.stop(); reader.next();
  assert.equal(reader.snapshot.state, 'idle');
  assert.equal(reader.snapshot.index, 1);
  assert.equal(synthesis.spoken.length, 1);
  reader.play(); reader.pause(); reader.setBlocks([block('new')]);
  assert.equal(reader.snapshot.state, 'idle');
  assert.equal(reader.snapshot.index, 0);
  assert.equal(reader.snapshot.chunkIndex, 0);
  assert.equal(reader.snapshot.block.id, 'new');
  assert.equal(synthesis.spoken.length, 2);
  reader.setBlocks([]);
  assert.equal(reader.snapshot.index, -1);
  assert.equal(reader.snapshot.state, 'idle');
});

test('in-place reconciliation validates identity and preserves active chunks and callbacks', () => {
  for (const state of ['playing', 'paused', 'stopped']) {
    const {reader, synthesis} = setup();
    const element = {};
    const original = {...block('a', 'palabra '.repeat(80)), element};
    reader.setBlocks([original, block('old')]); reader.play();
    if (state !== 'stopped') synthesis.spoken.at(-1).onend();
    if (state === 'paused') reader.pause();
    if (state === 'stopped') reader.stop();
    const before = reader.snapshot, utterance = synthesis.spoken.at(-1);
    const cancels = synthesis.cancels, count = synthesis.spoken.length;
    for (const invalid of [null, [], [block('a', original.text)], [{...original, text:'different'}], [{...original, chapterId:'different'}]]) {
      assert.equal(reader.reconcileBlocks(invalid, 0), false);
      assert.deepEqual(reader.snapshot, before);
      assert.equal(synthesis.cancels, cancels); assert.equal(synthesis.spoken.length, count);
    }
    const replacement = {...original, id:'new-path'};
    assert.equal(reader.reconcileBlocks([block('inserted'), replacement, block('future')], 1), true);
    assert.equal(reader.snapshot.index, 1); assert.equal(reader.snapshot.chunkIndex, before.chunkIndex);
    assert.equal(reader.snapshot.state, state); assert.equal(reader.snapshot.block, replacement);
    assert.equal(synthesis.cancels, cancels); assert.equal(synthesis.spoken.length, count);
    assert.equal(synthesis.spoken.at(-1), utterance);
    if (state === 'paused') reader.resume();
    if (state !== 'stopped') {
      while (reader.snapshot.index === 1) synthesis.spoken.at(-1).onend();
      assert.equal(reader.snapshot.block.id, 'future');
      assert.equal(synthesis.spoken.at(-1).text, 'future');
    }
  }
});

test('in-place reconciliation rejects replacement chapter identity without side effects', () => {
  const {reader, synthesis} = setup();
  const current = {...block('a'), element:{}, chapterElement:{}};
  reader.setBlocks([current]); reader.play();
  const before=reader.snapshot, utterance=synthesis.spoken.at(-1), cancels=synthesis.cancels;
  assert.equal(reader.reconcileBlocks([{...current, chapterElement:{}}], 0), false);
  assert.deepEqual(reader.snapshot,before); assert.equal(synthesis.cancels,cancels);
  assert.equal(synthesis.spoken.length,1); assert.equal(synthesis.spoken[0],utterance);
  assert.equal(reader.reconcileBlocks([{...current, id:'new-path'}],0),true);
  assert.equal(synthesis.spoken[0],utterance); assert.equal(synthesis.cancels,cancels);
  utterance.onend(); assert.equal(reader.snapshot.state,'finished');
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
