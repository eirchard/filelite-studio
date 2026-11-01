import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
const match = html.match(/<script id="filelite-bundled-engine">([\s\S]*?)<\/script>/);
assert.ok(match, 'engine should be embedded in the page');
const context = { window: {}, Blob, TextDecoder, URL, console };
runInNewContext(match[1], context);
const compress = context.window.FileLiteEngine.compress;

test('small input already within target remains unchanged', async () => {
  const file = { name: 'example.pdf', size: 2048 };
  const result = await compress(file, { quality: 'balanced', targetBytes: 4096 });
  assert.equal(result.blob, file);
  assert.equal(result.changed, false);
});

test('reject empty and oversized file', async () => {
  await assert.rejects(compress({ name: 'a.pdf', size: 0 }, { quality: 'balanced', targetBytes: null }));
  await assert.rejects(compress({ name: 'a.pdf', size: 26 * 1024 * 1024 }, { quality: 'balanced', targetBytes: null }));
});

test('reject unsupported quality and target size', async () => {
  const file = { name: 'a.pdf', size: 2048 };
  await assert.rejects(compress(file, { quality: 'bad', targetBytes: null }));
  await assert.rejects(compress(file, { quality: 'balanced', targetBytes: 100 }));
  await assert.rejects(compress(file, { quality: 'balanced', targetBytes: 26 * 1024 * 1024 }));
});

test('PDF requires acknowledgement and is clearly labeled as lossy', () => {
  assert.match(html, /id="pdfWarning"/);
  assert.match(html, /id="pdfAcknowledgement"/);
  assert.match(html, /ext\(selected\)==='pdf'&&!ui\.pdfAcknowledgement\.checked/);
  assert.match(html, /ลายเซ็นดิจิทัล/);
});

test('target bounds align with selected MB or KB units', () => {
  assert.match(html, /name="targetSize"[^>]*max="25"/);
  assert.match(html, /ui\.target\.max=inMB\?'25':'25600'/);
  assert.match(html, /ui\.unit\.addEventListener\('change',syncTargetConstraints\)/);
});
