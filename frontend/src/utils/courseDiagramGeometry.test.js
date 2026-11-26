import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCubicConnectorPath,
  computeDiagramConnectors,
  computeFannedAnchorY,
} from './courseDiagramGeometry.js';

test('computeFannedAnchorY centers single anchor and spreads multiple anchors symmetrically', () => {
  const center = { top: 100, height: 120 };
  assert.equal(computeFannedAnchorY(center, 0, 1), 160);

  const y0 = computeFannedAnchorY(center, 0, 3);
  const y1 = computeFannedAnchorY(center, 1, 3);
  const y2 = computeFannedAnchorY(center, 2, 3);
  assert.equal(y1, 160);
  assert.ok(y0 < y1 && y1 < y2);
  assert.equal(Number((y1 - y0).toFixed(4)), Number((y2 - y1).toFixed(4)));
});

test('buildCubicConnectorPath creates valid SVG cubic Bezier path without NaN values', () => {
  const d = buildCubicConnectorPath({ x: 240, y: 80 }, { x: 420, y: 180 });
  assert.match(d, /^M \d+(\.\d+)? \d+(\.\d+)? C /);
  assert.ok(!d.includes('NaN'));
});

test('computeDiagramConnectors builds incoming and outgoing curves for multi-node graphs and handles empty sides cleanly', () => {
  const center = { id: 'c-1', left: 360, top: 140, width: 240, height: 120 };
  const prereqs = [
    { id: 'c-5', left: 20, top: 40, width: 220, height: 76 },
    { id: 'c-6', left: 20, top: 160, width: 220, height: 76 },
    { id: 'c-14', left: 20, top: 280, width: 220, height: 76 },
  ];
  const unlocks = [
    { id: 'c-2', left: 720, top: 80, width: 220, height: 76 },
    { id: 'c-4', left: 720, top: 240, width: 220, height: 76 },
  ];

  const { incoming, outgoing } = computeDiagramConnectors(prereqs, center, unlocks);
  assert.equal(incoming.length, 3);
  assert.equal(outgoing.length, 2);

  // Incoming endpoints fan vertically in strictly increasing order on center left edge
  assert.ok(incoming[0].to.y < incoming[1].to.y);
  assert.ok(incoming[1].to.y < incoming[2].to.y);
  assert.equal(incoming[0].to.x, center.left - 4);

  // Outgoing starts fan vertically on center right edge
  assert.ok(outgoing[0].from.y < outgoing[1].from.y);
  assert.equal(outgoing[0].from.x, center.left + center.width + 4);

  // Empty sides return empty arrays cleanly
  const entryCourse = computeDiagramConnectors([], center, unlocks);
  assert.equal(entryCourse.incoming.length, 0);
  assert.equal(entryCourse.outgoing.length, 2);

  const capstoneCourse = computeDiagramConnectors(prereqs, center, []);
  assert.equal(capstoneCourse.incoming.length, 3);
  assert.equal(capstoneCourse.outgoing.length, 0);
});
