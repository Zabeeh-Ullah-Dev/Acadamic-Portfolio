import test from 'node:test';
import assert from 'node:assert/strict';
import { computeCounterValue } from './counterAnimation.js';

test('computeCounterValue starts at 0, increases monotonically, and lands on exact verified targets', () => {
  const targets = [376, 10, 11, 32, 219];
  const duration = 1400;

  for (const target of targets) {
    assert.equal(computeCounterValue(target, 0, duration), 0);
    let prev = 0;
    for (let t = 100; t < duration; t += 100) {
      const val = computeCounterValue(target, t, duration);
      assert.ok(val >= prev, `Expected monotonic increase for target=${target} at t=${t}`);
      assert.ok(val <= target, `Expected value <= target for target=${target} at t=${t}`);
      prev = val;
    }
    assert.equal(computeCounterValue(target, duration, duration), target);
    assert.equal(computeCounterValue(target, duration + 500, duration), target);
  }
});

test('computeCounterValue immediately returns target when duration is 0 or negative', () => {
  assert.equal(computeCounterValue(376, 0, 0), 376);
  assert.equal(computeCounterValue(32, 50, -10), 32);
});
