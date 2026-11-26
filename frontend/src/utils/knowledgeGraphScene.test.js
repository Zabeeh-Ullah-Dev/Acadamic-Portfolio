import test from 'node:test';
import assert from 'node:assert/strict';
import {
  RESEARCH_MODES,
  getResearchModeConfig,
  lerpRgb,
  rgbaString,
  isInTypographyQuietZone,
  computeAttentionArcControlPoint,
  sampleQuadraticBezier,
  createKnowledgeGraphTopology,
} from './knowledgeGraphScene';

test('getResearchModeConfig resolves all three Hero spotlight research modes and falls back to kgc', () => {
  assert.equal(getResearchModeConfig('kgc').id, 'kgc');
  assert.equal(getResearchModeConfig('mucos').id, 'mucos');
  assert.equal(getResearchModeConfig('biomedical').id, 'biomedical');
  assert.equal(getResearchModeConfig('unknown').id, 'kgc');

  for (const mode of Object.values(RESEARCH_MODES)) {
    assert.equal(mode.hubLabels.length, 8);
    assert.equal(mode.primaryRgb.length, 3);
    assert.equal(mode.secondaryRgb.length, 3);
  }
});

test('lerpRgb and rgbaString smoothly blend research mode palettes', () => {
  const mid = lerpRgb([0, 100, 200], [100, 200, 0], 0.5);
  assert.deepEqual(mid, [50, 150, 100]);
  assert.equal(rgbaString(mid, 0.45), 'rgba(50, 150, 100, 0.450)');
  assert.equal(rgbaString(mid, 1.5), 'rgba(50, 150, 100, 1.000)');
  assert.equal(rgbaString(mid, -0.2), 'rgba(50, 150, 100, 0.000)');
});

test('isInTypographyQuietZone protects both the left headline column and bottom metrics strip', () => {
  // Left headline / bio area protected
  assert.equal(isInTypographyQuietZone(260, 320, 1440, 820), true);
  // Bottom metrics strip ("11 / 10+ Cited Papers" and "Open Pedagogy 219+") protected
  assert.equal(isInTypographyQuietZone(640, 710, 1440, 820), true);
  assert.equal(isInTypographyQuietZone(1060, 700, 1440, 820), true);
  // Open negative-space margins around portrait & edges allowed
  assert.equal(isInTypographyQuietZone(1340, 210, 1440, 820), false);
  assert.equal(isInTypographyQuietZone(820, 110, 1440, 820), false);
  assert.equal(isInTypographyQuietZone(70, 210, 1440, 820), false);
  // Mobile viewport protects main body + metrics
  assert.equal(isInTypographyQuietZone(200, 400, 390, 844), true);
  assert.equal(isInTypographyQuietZone(200, 760, 390, 844), true);
  assert.equal(isInTypographyQuietZone(200, 50, 390, 844), false);
});

test('Bezier attention arc helpers compute perpendicular control points, exact endpoints, and tangents', () => {
  const ctrl = computeAttentionArcControlPoint(0, 0, 100, 0, 0.2);
  assert.equal(ctrl.cx, 50);
  assert.equal(ctrl.cy, 20);

  const start = sampleQuadraticBezier(0, 0, ctrl.cx, ctrl.cy, 100, 0, 0);
  const mid = sampleQuadraticBezier(0, 0, ctrl.cx, ctrl.cy, 100, 0, 0.5);
  const end = sampleQuadraticBezier(0, 0, ctrl.cx, ctrl.cy, 100, 0, 1);

  assert.equal(start.x, 0);
  assert.equal(start.y, 0);
  assert.equal(mid.x, 50);
  assert.equal(mid.y, 10);
  assert.ok(mid.tx > 0);
  assert.equal(mid.ty, 0);
  assert.equal(end.x, 100);
  assert.equal(end.y, 0);
});

test('createKnowledgeGraphTopology places desktop hubs clear of quiet zones and builds valid arcs', () => {
  const first = createKnowledgeGraphTopology(1440, 820);
  const second = createKnowledgeGraphTopology(1440, 820);

  assert.deepEqual(first, second);
  assert.equal(first.hubCount, 8);
  assert.ok(first.nodes.length >= 48);
  assert.ok(first.hubArcs.some((arc) => arc.kind === 'attention'));
  assert.ok(first.hubArcs.some((arc) => arc.kind === 'inferred'));

  // Every desktop hub home anchor sits cleanly outside the quiet typography & metrics zones
  for (let i = 0; i < first.hubCount; i += 1) {
    const hub = first.nodes[i];
    assert.equal(
      isInTypographyQuietZone(hub.homeX, hub.homeY, 1440, 820),
      false
    );
  }

  for (const arc of first.hubArcs) {
    assert.ok(arc.from >= 0 && arc.from < first.hubCount);
    assert.ok(arc.to >= 0 && arc.to < first.hubCount);
  }

  const mobile = createKnowledgeGraphTopology(390, 760);
  assert.equal(mobile.hubCount, 5);
  for (const arc of mobile.hubArcs) {
    assert.ok(arc.from < mobile.hubCount && arc.to < mobile.hubCount);
  }
});
