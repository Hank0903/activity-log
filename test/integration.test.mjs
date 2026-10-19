import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const env = process.env.TEST_ENV ?? 'local';

test(`[${env}] built entry point exists and is not empty`, () => {
  assert.ok(existsSync('dist/index.js'));
  assert.ok(statSync('dist/index.js').size > 0);
});

test(`[${env}] built entry point parses as valid JavaScript`, () => {
  execFileSync('node', ['--check', 'dist/index.js']);
});

test(`[${env}] action.yml main points to the built file`, () => {
  const text = readFileSync('action.yml', 'utf8');
  assert.ok(text.includes('./dist/index.js'));
});
