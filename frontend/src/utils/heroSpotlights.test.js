import test from 'node:test';
import assert from 'node:assert/strict';
import { PUBLICATIONS } from '../data/portfolioData.js';
import {
  HERO_SPOTLIGHTS,
  resolveSpotlightPublication,
} from './heroSpotlights.js';

test('each hero spotlight tab resolves to a distinct, exact publication in PUBLICATIONS', () => {
  assert.equal(HERO_SPOTLIGHTS.length, 3);
  const resolvedIds = new Set();

  const kgcPaper = resolveSpotlightPublication('kgc', PUBLICATIONS);
  assert.ok(kgcPaper);
  assert.equal(kgcPaper.id, 'pub-01');
  assert.match(kgcPaper.title, /MuCo-KGC/i);
  resolvedIds.add(kgcPaper.id);

  const mucosPaper = resolveSpotlightPublication('mucos', PUBLICATIONS);
  assert.ok(mucosPaper);
  assert.equal(mucosPaper.id, 'pub-02');
  assert.match(mucosPaper.title, /MuCoS/i);
  resolvedIds.add(mucosPaper.id);

  const bioPaper = resolveSpotlightPublication('biomedical', PUBLICATIONS);
  assert.ok(bioPaper);
  assert.equal(bioPaper.id, 'pub-25');
  assert.match(bioPaper.title, /Protein Particle Network/i);
  resolvedIds.add(bioPaper.id);

  assert.equal(resolvedIds.size, 3);
});

test('resolveSpotlightPublication returns null gracefully for empty publications list', () => {
  assert.equal(resolveSpotlightPublication('mucos', []), null);
  assert.equal(resolveSpotlightPublication('kgc', null), null);
});
