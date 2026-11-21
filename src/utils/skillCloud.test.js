import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SKILL_DOMAINS,
  SKILL_NODES,
  SPHERE_PALETTES,
  computeSphereEdges,
  generateFibonacciSpherePoints,
  getConnectedSkillNodes,
  getDiscoveryProgress,
  getDomainSkillSummary,
  getNextUnexploredSkillId,
  getRelatedPublicationsForSkill,
  projectSkillNodes,
  stepInertiaVelocity,
  stepRotationTowards,
} from './skillCloud.js';

test('SKILL_NODES have unique IDs and map strictly to valid SKILL_DOMAINS', () => {
  const domainIds = new Set(SKILL_DOMAINS.map((d) => d.id));
  const seenIds = new Set();

  assert.ok(SKILL_NODES.length >= 20);
  for (const node of SKILL_NODES) {
    assert.ok(!seenIds.has(node.id), `Duplicate skill id: ${node.id}`);
    seenIds.add(node.id);
    assert.ok(domainIds.has(node.domain), `Invalid domain for ${node.id}: ${node.domain}`);
    assert.ok(node.domain !== 'all');
  }
});

test('generateFibonacciSpherePoints creates balanced unit-sphere vectors', () => {
  const pts = generateFibonacciSpherePoints(22);
  assert.equal(pts.length, 22);

  let posZ = 0;
  let negZ = 0;
  for (const p of pts) {
    const mag = Math.hypot(p.x, p.y, p.z);
    assert.ok(Math.abs(mag - 1) < 1e-6, `Expected unit vector, got ${mag}`);
    if (p.z >= 0) posZ += 1;
    else negZ += 1;
  }

  assert.ok(posZ >= 9 && negZ >= 9, 'Sphere points should cover both hemispheres');
});

test('projectSkillNodes sorts back-to-front and highlights filtered LLMs or GNNs domains', () => {
  const llmsProjected = projectSkillNodes(SKILL_NODES, {
    yaw: 0.6,
    pitch: 0.25,
    activeDomain: 'llms',
  });

  assert.equal(llmsProjected.length, SKILL_NODES.length);
  for (let i = 1; i < llmsProjected.length; i += 1) {
    assert.ok(
      llmsProjected[i].rz >= llmsProjected[i - 1].rz,
      'Projected spheres must be sorted ascending by z-depth for painter rendering'
    );
  }

  const llmNodes = llmsProjected.filter((n) => n.domain === 'llms');
  const gnnNodes = llmsProjected.filter((n) => n.domain === 'gnns');
  assert.ok(llmNodes.every((n) => n.isHighlighted === true));
  assert.ok(gnnNodes.every((n) => n.isHighlighted === false));

  const gnnsProjected = projectSkillNodes(SKILL_NODES, {
    yaw: 0.6,
    pitch: 0.25,
    activeDomain: 'gnns',
  });
  assert.ok(gnnsProjected.filter((n) => n.domain === 'gnns').every((n) => n.isHighlighted));
  assert.ok(gnnsProjected.filter((n) => n.domain === 'llms').every((n) => !n.isHighlighted));
});

test('computeSphereEdges links highlighted same-domain spheres without duplicates and highlights selected sphere connections', () => {
  const projected = projectSkillNodes(SKILL_NODES, {
    activeDomain: 'gnns',
    selectedSkillId: 'skill-kgc',
  });
  const validPaletteIds = new Set(SPHERE_PALETTES.map((p) => p.id));
  const usedPalettes = new Set(projected.map((n) => n.paletteId));
  assert.ok(projected.every((n) => validPaletteIds.has(n.paletteId)));
  assert.ok(usedPalettes.size >= 6, 'Spheres should render diverse distinct colors');

  const edges = computeSphereEdges(projected, 'gnns', 'skill-kgc');
  assert.ok(edges.length > 0);
  const edgeIds = new Set(edges.map((e) => e.id));
  assert.equal(edgeIds.size, edges.length);
  assert.ok(edges.every((e) => e.highlighted === true));
  assert.ok(
    edges.some((e) => e.connectedToSelected === true),
    'Edges attached to selected sphere should light up on click'
  );
});

test('getDomainSkillSummary and getRelatedPublicationsForSkill return grounded evidence', () => {
  const allSummary = getDomainSkillSummary('all');
  const llmSummary = getDomainSkillSummary('llms');
  const gnnSummary = getDomainSkillSummary('gnns');

  assert.equal(allSummary.count, SKILL_NODES.length);
  assert.ok(llmSummary.count >= 4);
  assert.ok(gnnSummary.count >= 5);

  for (const skill of SKILL_NODES) {
    const related = getRelatedPublicationsForSkill(skill, 3);
    assert.ok(
      related.length >= 1,
      `Expected at least 1 related publication for ${skill.label}`
    );
  }
});

test('stepRotationTowards takes shortest angular path and converges smoothly', () => {
  let state = { yaw: 0.1, pitch: 0.0, done: false };
  const target = { yaw: Math.PI * 2 - 0.1, pitch: 0.4 };

  for (let i = 0; i < 60; i += 1) {
    state = stepRotationTowards(state, target, 0.03, 8);
  }

  assert.equal(state.done, true);
  assert.equal(state.yaw, target.yaw);
  assert.equal(state.pitch, target.pitch);
});

test('stepInertiaVelocity smoothly decays drag momentum to rest', () => {
  let vel = { vx: 1.5, vy: -0.8, active: true };
  for (let i = 0; i < 45; i += 1) {
    vel = stepInertiaVelocity(vel, 0.03, 5);
  }
  assert.equal(vel.active, false);
  assert.equal(vel.vx, 0);
  assert.equal(vel.vy, 0);
});

test('getConnectedSkillNodes, getNextUnexploredSkillId, and getDiscoveryProgress support game-style exploration', () => {
  const neighbors = getConnectedSkillNodes('skill-kgc', 3);
  assert.equal(neighbors.length, 3);
  assert.ok(neighbors.every((n) => n.id !== 'skill-kgc'));

  const nextId = getNextUnexploredSkillId(new Set(['skill-kgc']), 'gnns', 'skill-kgc');
  assert.ok(nextId && nextId !== 'skill-kgc');

  const progress = getDiscoveryProgress(new Set(['skill-kgc', 'skill-llm']));
  assert.equal(progress.count, 2);
  assert.equal(progress.total, SKILL_NODES.length);
  assert.equal(progress.completed, false);
});

