export const HERO_ROLE_TITLES = [
  'AI Researcher',
  'Knowledge Graph Specialist',
  '2025 DAAD AInet Fellow',
];

export const TYPEWRITER_TIMING = {
  typingMs: 56,
  deletingMs: 30,
  pauseMs: 2000,
  betweenRolesMs: 260,
};

/**
 * Computes the next deterministic step of a cycling typewriter effect.
 * Cycles cleanly through `roles` using three phases:
 *  - 'typing': appends 1 character until full phrase, then enters 'pausing'
 *  - 'pausing': switches to 'deleting' once hold duration completes
 *  - 'deleting': removes 1 character until empty, then advances roleIndex
 */
export function stepTypewriterState(state, roles = HERO_ROLE_TITLES) {
  if (!Array.isArray(roles) || roles.length === 0) {
    return { roleIndex: 0, charCount: 0, phase: 'typing' };
  }

  const safeIndex =
    ((state.roleIndex % roles.length) + roles.length) % roles.length;
  const currentPhrase = roles[safeIndex];
  const charCount = Math.max(0, Math.min(state.charCount, currentPhrase.length));

  if (state.phase === 'typing') {
    if (charCount < currentPhrase.length) {
      return {
        roleIndex: safeIndex,
        charCount: charCount + 1,
        phase: charCount + 1 >= currentPhrase.length ? 'pausing' : 'typing',
      };
    }
    return { roleIndex: safeIndex, charCount: currentPhrase.length, phase: 'pausing' };
  }

  if (state.phase === 'pausing') {
    return {
      roleIndex: safeIndex,
      charCount: currentPhrase.length,
      phase: 'deleting',
    };
  }

  // phase === 'deleting'
  if (charCount > 1) {
    return {
      roleIndex: safeIndex,
      charCount: charCount - 1,
      phase: 'deleting',
    };
  }

  return {
    roleIndex: (safeIndex + 1) % roles.length,
    charCount: 0,
    phase: 'typing',
  };
}

export function getTypewriterDelayMs(state, timing = TYPEWRITER_TIMING) {
  if (state.phase === 'pausing') {
    return timing.pauseMs;
  }
  if (state.phase === 'deleting') {
    return timing.deletingMs;
  }
  if (state.charCount === 0) {
    return timing.betweenRolesMs;
  }
  return timing.typingMs;
}
