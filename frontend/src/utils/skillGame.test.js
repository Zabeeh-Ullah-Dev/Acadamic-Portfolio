import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SKILL_LOADOUT_PRESETS,
  evaluateLoadoutSynergy,
  getAllSkillEntries,
  getMatchedPresetsForSkill,
  getSkillChipTierInfo,
  getSkillMetadata,
  parsePresetHeading,
  pickNextPresetLoadout,
  toggleSkillInLoadout,
} from './skillGame.js';

test('getAllSkillEntries returns every skill across all 7 categories with valid metadata', () => {
  const entries = getAllSkillEntries();
  assert.equal(entries.length, 35);
  assert.ok(entries.some((e) => e.name === 'Python (primary)'));
  assert.ok(entries.some((e) => e.name === 'Gradio dashboards'));

  const meta = getSkillMetadata('PyTorch');
  assert.equal(meta.categoryLabel, 'ML Frameworks');
  assert.ok(meta.synergies.includes('HuggingFace Transformers'));
});

test('parsePresetHeading extracts clean title and venue/platform tag for all 4 Bento presets', () => {
  const kgc = parsePresetHeading(SKILL_LOADOUT_PRESETS[0]);
  assert.equal(kgc.title, 'MuCo-KGC & MuCoS');
  assert.equal(kgc.tag, 'PAKDD / ACL BioNLP 2025');

  const spectral = parsePresetHeading(SKILL_LOADOUT_PRESETS[3]);
  assert.equal(spectral.title, 'CSG Spectral Complexity & Complex Networks');
  assert.equal(spectral.tag, 'MusIML @ ICML 2025');
});

test('getSkillChipTierInfo classifies Core/Production vs Applied/Certified skills cleanly', () => {
  assert.deepEqual(getSkillChipTierInfo('PyTorch', 'skill-ml-frameworks'), {
    label: 'Core',
    kind: 'core',
  });
  assert.deepEqual(getSkillChipTierInfo('TensorFlow / Keras', 'skill-ml-frameworks'), {
    label: 'Production',
    kind: 'core',
  });
  assert.deepEqual(getSkillChipTierInfo('LangChain', 'skill-ml-frameworks'), {
    label: 'Applied',
    kind: 'applied',
  });
  assert.deepEqual(getSkillChipTierInfo('Generative AI', 'skill-training'), {
    label: 'Certified',
    kind: 'applied',
  });
});

test('getMatchedPresetsForSkill cross-links clicked skill chips to matching research Bento cards', () => {
  const pytorchMatches = getMatchedPresetsForSkill('PyTorch');
  assert.deepEqual(pytorchMatches.directIds, ['preset-kgc']);

  const gradioMatches = getMatchedPresetsForSkill('Gradio dashboards');
  assert.deepEqual(gradioMatches.directIds, ['preset-clinical']);

  const networkxMatches = getMatchedPresetsForSkill('NetworkX');
  assert.deepEqual(networkxMatches.directIds, ['preset-spectral']);

  // Related synergy skill (not directly listed in preset.skills) still surfaces related projects
  const hfMatches = getMatchedPresetsForSkill('HuggingFace Transformers');
  assert.equal(hfMatches.directIds.length, 0);
  assert.ok(hfMatches.relatedIds.includes('preset-kgc'));
});

test('toggleSkillInLoadout adds, removes, and rolls forward smoothly within max 3 slots', () => {
  let slots = [];
  slots = toggleSkillInLoadout(slots, 'Python (primary)', 3);
  slots = toggleSkillInLoadout(slots, 'PyTorch', 3);
  slots = toggleSkillInLoadout(slots, 'NetworkX', 3);
  assert.deepEqual(slots, ['Python (primary)', 'PyTorch', 'NetworkX']);

  // Adding a 4th rotates out oldest
  slots = toggleSkillInLoadout(slots, 'LangChain', 3);
  assert.deepEqual(slots, ['PyTorch', 'NetworkX', 'LangChain']);

  // Toggling existing removes it
  slots = toggleSkillInLoadout(slots, 'NetworkX', 3);
  assert.deepEqual(slots, ['PyTorch', 'LangChain']);
});

test('evaluateLoadoutSynergy activates matched project preset when 2+ preset skills are equipped', () => {
  const kgcPreset = SKILL_LOADOUT_PRESETS[0];
  const result = evaluateLoadoutSynergy(kgcPreset.skills);
  assert.equal(result.matchedPreset?.id, kgcPreset.id);
  assert.equal(result.overlapCount, 3);
  assert.ok(result.synergyLinks.length > 0);

  const nextPreset = pickNextPresetLoadout(kgcPreset.id);
  assert.equal(nextPreset.id, SKILL_LOADOUT_PRESETS[1].id);
});
