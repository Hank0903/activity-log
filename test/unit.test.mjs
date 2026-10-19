import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('package.json has a valid semantic version', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.match(pkg.version, /^\d+\.\d+\.\d+$/);
});

test('action.yml declares the required inputs', () => {
  const text = readFileSync('action.yml', 'utf8');
  assert.ok(text.includes('NOT_A_REAL_INPUT'));
  assert.ok(text.includes('GITHUB_TOKEN'));
});
