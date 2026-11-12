// Browser DOM tests without additional packages or files in the worktree.
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function withBrowser(test, { beforeNavigate } = {}) {
  const profile = await mkdtemp(join(tmpdir(), 'lector-chromium-'));
  const browser = spawn('/usr/bin/chromium', [
    '--headless', '--no-sandbox', '--disable-gpu', '--no-first-run',
    '--disable-background-networking', '--allow-file-access-from-files',
    '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  const stopped = new Promise(resolve => browser.once('exit', resolve));
  let ws;
  try {
    const endpoint = await new Promise((resolve, reject) => {
      let stderr = '';
      const timer = setTimeout(() => reject(new Error('Chromium no respondió')), 30000);
      browser.stderr.on('data', chunk => {
        stderr += chunk;
        const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (match) { clearTimeout(timer); resolve(match[1]); }
      });
      browser.once('error', reject);
      browser.once('exit', code => reject(new Error('Chromium terminó: ' + code)));
    });
    const targets = await (await fetch(`http://127.0.0.1:${new URL(endpoint).port}/json/list`)).json();
    ws = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
    let id = 0;
    const pending = new Map();
    ws.onmessage = event => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const item = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) item.reject(new Error(message.error.message));
      else item.resolve(message.result);
    };
    const call = (method, params = {}) => new Promise((resolve, reject) => {
      pending.set(++id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async expression => {
      const result = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
      return result.result.value;
    };
    const url = path => pathToFileURL(resolve(path)).href;
    if (beforeNavigate) {
      await call('Page.enable');
      await call('Page.addScriptToEvaluateOnNewDocument', { source: beforeNavigate });
    }
    await call('Page.navigate', { url: url('fluidos/index.html') });
    for (let i = 0; i < 100; i++) {
      if (await evaluate('location.href.startsWith("file:") && document.readyState === "complete"')) break;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    const screenshot = async name => {
      if (!['desktop', 'mobile', 'minimized', 'closed'].includes(name)) throw new Error('Captura no autorizada');
      const directory = resolve('fluidos/verificacion-visual');
      await mkdir(directory, { recursive: true });
      const image = await call('Page.captureScreenshot', { format: 'png' });
      await writeFile(join(directory, `lector-etapa1-${name}.png`), Buffer.from(image.data, 'base64'));
    };
    await test({ evaluate, url, call, screenshot });
  } finally {
    ws?.close();
    browser.kill();
    await stopped;
    // Chromium children may finish profile writes just after the parent exits.
    // Bound cleanup contention; a persistent failure still rejects the test run.
    await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
  }
}
