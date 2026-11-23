import test from 'node:test';
import assert from 'node:assert/strict';
import { SUBJECTS_TAUGHT } from '../data/portfolioData.js';
import {
  ACADEMIC_SERVICE_VENUES,
  CURRICULUM_PATHWAYS,
  filterServiceVenues,
  getCourseCardVisualState,
  getCourseChain,
  getCourseProfile,
  getCourseRelationToActive,
  getCourseTopics,
  getCurriculumMasteryRank,
  getNextUnexploredCourseId,
  getNextUnexploredVenueId,
  getServiceProgress,
  groupCoursesByTier,
} from './academicGame.js';

test('getCourseProfile resolves valid prerequisites and unlocks across all 16 courses', () => {
  for (const course of SUBJECTS_TAUGHT.courses) {
    const profile = getCourseProfile(course.id);
    assert.equal(profile.id, course.id);
    assert.ok(profile.level.length > 0);
    assert.ok(profile.focus.length > 10);
  }

  const aiProfile = getCourseProfile('c-1');
  assert.ok(aiProfile.prerequisites.some((c) => c.id === 'c-5'));
  assert.ok(aiProfile.unlocks.some((c) => c.id === 'c-2'));
  assert.equal(getCourseRelationToActive('c-5', 'c-1'), 'prerequisite');
  assert.equal(getCourseRelationToActive('c-2', 'c-1'), 'unlocks');
  assert.equal(getCourseRelationToActive('c-1', 'c-1'), 'active');
});

test('groupCoursesByTier orders all 16 courses from L1 Foundation to L4 Specialization', () => {
  const tiers = groupCoursesByTier(SUBJECTS_TAUGHT.courses);
  assert.deepEqual(
    tiers.map((t) => `${t.code} ${t.label}`),
    ['L1 Foundation', 'L2 Core CS', 'L3 Theory & Systems', 'L4 Specialization']
  );
  const totalGrouped = tiers.reduce((sum, t) => sum + t.courses.length, 0);
  assert.equal(totalGrouped, 16);

  // Domain filter omits empty tiers cleanly
  const aiOnly = SUBJECTS_TAUGHT.courses.filter((c) => c.track === 'AI & Data Science');
  const aiTiers = groupCoursesByTier(aiOnly);
  assert.equal(aiTiers.length, 1);
  assert.equal(aiTiers[0].code, 'L4');
  assert.equal(aiTiers[0].courses.length, 4);
});

test('getCourseCardVisualState dims unrelated courses while keeping active, prerequisites, unlocks, and pathway highlighted', () => {
  // Active = AI (c-1): prereqs are c-5 & c-6, unlocks are c-2 & c-4
  assert.equal(getCourseCardVisualState('c-1', 'c-1').isDimmed, false);
  assert.equal(getCourseCardVisualState('c-5', 'c-1').isDimmed, false);
  assert.equal(getCourseCardVisualState('c-2', 'c-1').isDimmed, false);
  // Unrelated course (e.g. Compiler Construction c-9) is dimmed when no pathway covers it
  assert.equal(getCourseCardVisualState('c-9', 'c-1').isDimmed, true);

  // With AI & ML pathway active, pathway member c-16 stays un-dimmed even if not direct prereq of c-1
  const aiPathway = CURRICULUM_PATHWAYS.find((p) => p.id === 'path-ai');
  const stateInPathway = getCourseCardVisualState('c-16', 'c-1', aiPathway);
  assert.equal(stateInPathway.inPathway, true);
  assert.equal(stateInPathway.isDimmed, false);
});

test('getCourseChain traces transitive prerequisites and unlocks and parses syllabus topics', () => {
  const aiChain = getCourseChain('c-1');
  assert.ok(aiChain.ancestors.includes('c-5'));
  assert.ok(aiChain.ancestors.includes('c-16'));
  assert.ok(aiChain.descendants.includes('c-2'));
  assert.ok(aiChain.descendants.includes('c-4'));

  const topics = getCourseTopics('c-1');
  assert.ok(topics.length >= 3);
  assert.equal(CURRICULUM_PATHWAYS.length, 3);
  for (const path of CURRICULUM_PATHWAYS) {
    assert.ok(path.courseIds.length >= 4);
  }
});

test('getCurriculumMasteryRank and getNextUnexploredCourseId advance cleanly through the skill tree', () => {
  const initial = getCurriculumMasteryRank(new Set(['c-1']));
  assert.equal(initial.count, 1);
  assert.equal(initial.total, 16);
  assert.equal(initial.rank, 'Explorer');

  const nextId = getNextUnexploredCourseId(
    new Set(['c-1']),
    SUBJECTS_TAUGHT.courses,
    'c-1'
  );
  assert.ok(nextId && nextId !== 'c-1');

  const allIds = new Set(SUBJECTS_TAUGHT.courses.map((c) => c.id));
  const full = getCurriculumMasteryRank(allIds);
  assert.equal(full.completed, true);
  assert.equal(full.rank, 'Curriculum Master');
});

test('ACADEMIC_SERVICE_VENUES covers all 7 conferences and 6 journals with filtering and cycling', () => {
  assert.equal(ACADEMIC_SERVICE_VENUES.length, 13);
  assert.equal(filterServiceVenues('conference').length, 7);
  assert.equal(filterServiceVenues('journal').length, 6);

  const nextVenue = getNextUnexploredVenueId(
    new Set(['svc-conf-1']),
    ACADEMIC_SERVICE_VENUES,
    'svc-conf-1'
  );
  assert.equal(nextVenue, 'svc-conf-2');

  const progress = getServiceProgress(new Set(['svc-conf-1', 'svc-jour-1']));
  assert.equal(progress.count, 2);
  assert.equal(progress.total, 13);
});
