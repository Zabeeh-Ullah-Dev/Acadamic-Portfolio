import test from 'node:test';
import assert from 'node:assert/strict';
import { OPEN_SOURCE_PROJECTS } from '../data/portfolioData.js';
import {
  filterOpenSourceProjects,
  getVisibleOpenSourceProjects,
  isOpenSourceFilterActive,
} from './openSourceFilter.js';

test('default open-source view returns only 2 featured repositories while search or category shows all matches', () => {
  assert.equal(
    isOpenSourceFilterActive({ category: 'all', searchQuery: '', showAll: false }),
    false
  );

  const visibleDefault = getVisibleOpenSourceProjects(OPEN_SOURCE_PROJECTS, {
    category: 'all',
    searchQuery: '',
    showAll: false,
    initialLimit: 2,
  });

  assert.equal(visibleDefault.length, 2);
  assert.deepEqual(
    visibleDefault.map((p) => p.id),
    ['oss-researchdesk', 'oss-cardiorisk']
  );

  const visibleExpanded = getVisibleOpenSourceProjects(OPEN_SOURCE_PROJECTS, {
    category: 'all',
    searchQuery: '',
    showAll: true,
    initialLimit: 2,
  });
  assert.equal(visibleExpanded.length, OPEN_SOURCE_PROJECTS.length);

  const byCategory = filterOpenSourceProjects(OPEN_SOURCE_PROJECTS, {
    category: 'proposed-methods',
    searchQuery: '',
  });
  const visibleCategory = getVisibleOpenSourceProjects(byCategory, {
    category: 'proposed-methods',
    searchQuery: '',
    showAll: false,
    initialLimit: 2,
  });
  assert.equal(visibleCategory.length, 7);
});

test('filterOpenSourceProjects matches repository names, tools, and related repos case-insensitively', () => {
  const byTool = filterOpenSourceProjects(OPEN_SOURCE_PROJECTS, {
    category: 'all',
    searchQuery: 'ollama',
  });
  assert.ok(byTool.some((p) => p.id === 'oss-researchdesk'));

  const byRelated = filterOpenSourceProjects(OPEN_SOURCE_PROJECTS, {
    category: 'all',
    searchQuery: 'AdaptiveBotsLab',
  });
  assert.ok(byRelated.length >= 2);
});
