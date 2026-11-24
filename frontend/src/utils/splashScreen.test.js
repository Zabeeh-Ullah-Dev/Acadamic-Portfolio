import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRIMARY_NAV_ITEMS,
  SPLASH_HIGHLIGHTS,
  SPLASH_PROFILE,
  computeSplashProgress,
  getSplashStatusLabel,
  mapSectionIdToNavId,
  shouldSkipSplash,
} from './splashScreen.js';

test('SPLASH_PROFILE carries exact requested bio, 2.5s duration, and uploaded headshot path', () => {
  assert.equal(SPLASH_PROFILE.name, 'Haji Gul');
  assert.equal(SPLASH_PROFILE.avatarUrl, '/assets/aistudio/image_f655c344.png');
  assert.equal(SPLASH_PROFILE.durationMs, 2500);
  assert.equal(
    SPLASH_PROFILE.bio,
    'Ph.D. (AI) Researcher | NLP Knowledge Graphs | Transformers | LLMs | Generative AI | GNNs | Machine-Deep Learning'
  );
  assert.equal(SPLASH_HIGHLIGHTS.length, 4);
});

test('shouldSkipSplash enables instant entry only when autostart=1 or true', () => {
  assert.equal(shouldSkipSplash(''), false);
  assert.equal(shouldSkipSplash('?section=research'), false);
  assert.equal(shouldSkipSplash('?autostart=0'), false);
  assert.equal(shouldSkipSplash('?autostart=1'), true);
  assert.equal(shouldSkipSplash('?foo=bar&autostart=true'), true);
});

test('computeSplashProgress clamps cleanly from 0 to 100 over 2500ms with smooth easing', () => {
  assert.equal(computeSplashProgress(-50, 2500), 0);
  assert.equal(computeSplashProgress(0, 2500), 0);
  const mid = computeSplashProgress(1250, 2500);
  assert.ok(mid > 50 && mid < 100, `expected ease-out progress > 50 at halfway, got ${mid}`);
  assert.equal(computeSplashProgress(2500, 2500), 100);
  assert.equal(computeSplashProgress(5000, 2500), 100);
  assert.match(getSplashStatusLabel(15), /knowledge graph/i);
  assert.match(getSplashStatusLabel(70), /32 publications/i);
  assert.match(getSplashStatusLabel(96), /entering research portfolio/i);
});

test('PRIMARY_NAV_ITEMS excludes Contact & Honors and includes Academic Service & Certifications', () => {
  assert.equal(PRIMARY_NAV_ITEMS.length, 9);
  assert.deepEqual(
    PRIMARY_NAV_ITEMS.map((item) => item.label),
    [
      'Research',
      'Publications',
      'Code',
      'Employment',
      'Education',
      'Profile',
      'Academic Service',
      'Certifications',
      'Lectures',
    ]
  );
  assert.equal(PRIMARY_NAV_ITEMS.some((i) => i.id === 'contact'), false);
  assert.equal(PRIMARY_NAV_ITEMS.some((i) => i.id === 'honors'), false);
  assert.equal(mapSectionIdToNavId('research'), 'research');
  assert.equal(mapSectionIdToNavId('publications'), 'publications');
  assert.equal(mapSectionIdToNavId('projects'), 'projects');
  assert.equal(mapSectionIdToNavId('code'), 'projects');
  assert.equal(mapSectionIdToNavId('experience'), 'experience');
  assert.equal(mapSectionIdToNavId('employment'), 'experience');
  assert.equal(mapSectionIdToNavId('education'), 'education');
  assert.equal(mapSectionIdToNavId('academic-profile'), 'academic-profile');
  assert.equal(mapSectionIdToNavId('technical-skills'), 'academic-profile');
  assert.equal(mapSectionIdToNavId('academic-service'), 'academic-service');
  assert.equal(mapSectionIdToNavId('service'), 'academic-service');
  assert.equal(mapSectionIdToNavId('certifications'), 'certifications');
  assert.equal(mapSectionIdToNavId('lectures'), 'lectures');
  assert.equal(mapSectionIdToNavId('unknown'), '');
});
