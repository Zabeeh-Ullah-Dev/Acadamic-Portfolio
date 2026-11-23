import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HERO_ROLE_TITLES,
  TYPEWRITER_TIMING,
  getTypewriterDelayMs,
  stepTypewriterState,
} from './typewriter.js';

test('HERO_ROLE_TITLES contains the exact requested rotating research roles', () => {
  assert.deepEqual(HERO_ROLE_TITLES, [
    'AI Researcher',
    'Knowledge Graph Specialist',
    '2025 DAAD AInet Fellow',
  ]);
});

test('stepTypewriterState types a full phrase, pauses, deletes, and advances to next role', () => {
  const roles = ['AI Researcher', 'Knowledge Graph Specialist', '2025 DAAD AInet Fellow'];
  let state = { roleIndex: 0, charCount: 0, phase: 'typing' };

  // Type out full first phrase
  for (let i = 0; i < roles[0].length; i += 1) {
    state = stepTypewriterState(state, roles);
  }
  assert.equal(state.roleIndex, 0);
  assert.equal(state.charCount, roles[0].length);
  assert.equal(state.phase, 'pausing');

  // Pause step switches into deleting
  state = stepTypewriterState(state, roles);
  assert.equal(state.phase, 'deleting');
  assert.equal(state.charCount, roles[0].length);

  // Deleting clears characters down to 0 and advances roleIndex to 1
  for (let i = 0; i < roles[0].length; i += 1) {
    state = stepTypewriterState(state, roles);
  }
  assert.equal(state.roleIndex, 1);
  assert.equal(state.charCount, 0);
  assert.equal(state.phase, 'typing');
});

test('stepTypewriterState wraps cleanly from the last role back to the first role', () => {
  const roles = HERO_ROLE_TITLES;
  const stateAtLastDelete = { roleIndex: 2, charCount: 1, phase: 'deleting' };
  const next = stepTypewriterState(stateAtLastDelete, roles);

  assert.equal(next.roleIndex, 0);
  assert.equal(next.charCount, 0);
  assert.equal(next.phase, 'typing');
});

test('getTypewriterDelayMs assigns crisp delays per phase', () => {
  assert.equal(
    getTypewriterDelayMs({ roleIndex: 0, charCount: 4, phase: 'typing' }),
    TYPEWRITER_TIMING.typingMs
  );
  assert.equal(
    getTypewriterDelayMs({ roleIndex: 0, charCount: 13, phase: 'pausing' }),
    TYPEWRITER_TIMING.pauseMs
  );
  assert.equal(
    getTypewriterDelayMs({ roleIndex: 0, charCount: 5, phase: 'deleting' }),
    TYPEWRITER_TIMING.deletingMs
  );
  assert.equal(
    getTypewriterDelayMs({ roleIndex: 1, charCount: 0, phase: 'typing' }),
    TYPEWRITER_TIMING.betweenRolesMs
  );
});
