import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeScrollProgress,
  hasScrolledPastSection,
} from './scrollVisibility.js';

test('hasScrolledPastSection returns false while publications is above or inside viewport', () => {
  assert.equal(hasScrolledPastSection({ bottom: 1400, topThreshold: 96 }), false);
  assert.equal(hasScrolledPastSection({ bottom: 320, topThreshold: 96 }), false);
  assert.equal(hasScrolledPastSection({ bottom: 97, topThreshold: 96 }), false);
  assert.equal(hasScrolledPastSection({ bottom: undefined }), false);
});

test('hasScrolledPastSection returns true once publications bottom scrolls past header threshold', () => {
  assert.equal(hasScrolledPastSection({ bottom: 96, topThreshold: 96 }), true);
  assert.equal(hasScrolledPastSection({ bottom: -120, topThreshold: 96 }), true);
});

test('computeScrollProgress clamps normalized page scroll between 0 and 1', () => {
  assert.equal(
    computeScrollProgress({ scrollY: 0, scrollHeight: 4000, innerHeight: 900 }),
    0
  );
  assert.equal(
    computeScrollProgress({ scrollY: 1550, scrollHeight: 4000, innerHeight: 900 }),
    0.5
  );
  assert.equal(
    computeScrollProgress({ scrollY: 4000, scrollHeight: 4000, innerHeight: 900 }),
    1
  );
});
