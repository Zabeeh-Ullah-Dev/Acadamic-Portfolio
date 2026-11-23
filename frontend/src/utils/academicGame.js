import { ACADEMIC_SERVICE, SUBJECTS_TAUGHT } from '../data/portfolioData.js';

export const COURSE_GAME_META = {
  'c-16': {
    level: 'Tier 1 · Foundation',
    difficulty: 1,
    tool: 'Python & Office Labs',
    focus: 'Computing architecture, binary logic, operating fundamentals, and problem decomposition.',
    prerequisites: [],
    unlocks: ['c-14', 'c-12'],
  },
  'c-14': {
    level: 'Tier 1 · Foundation',
    difficulty: 1,
    tool: 'Python / C++',
    focus: 'Control flow, modular functions, recursion, file I/O, and structured debugging.',
    prerequisites: ['c-16'],
    unlocks: ['c-13', 'c-6', 'c-15'],
  },
  'c-15': {
    level: 'Tier 2 · Application',
    difficulty: 2,
    tool: 'C# / GUI Toolkits',
    focus: 'Event-driven interface architecture, component state bindings, and desktop application design.',
    prerequisites: ['c-14'],
    unlocks: ['c-13'],
  },
  'c-13': {
    level: 'Tier 2 · Application',
    difficulty: 2,
    tool: 'Python / Java / C#',
    focus: 'Object-oriented patterns, generics, concurrency primitives, and scalable software architecture.',
    prerequisites: ['c-14'],
    unlocks: ['c-10', 'c-9', 'c-12'],
  },
  'c-6': {
    level: 'Tier 2 · Core CS',
    difficulty: 2,
    tool: 'Python / C++',
    focus: 'Trees, heaps, hash tables, adjacency graphs, and memory-efficient traversal structures.',
    prerequisites: ['c-14'],
    unlocks: ['c-5', 'c-12', 'c-1'],
  },
  'c-5': {
    level: 'Tier 3 · Core Theory',
    difficulty: 3,
    tool: 'Python / MATLAB',
    focus: 'Asymptotic complexity, dynamic programming, greedy proofs, shortest paths, and NP-completeness.',
    prerequisites: ['c-6'],
    unlocks: ['c-7', 'c-1', 'c-4'],
  },
  'c-8': {
    level: 'Tier 3 · Core Theory',
    difficulty: 3,
    tool: 'Formal Proofs & Simulators',
    focus: 'Finite automata, regular languages, pushdown machines, context-free grammars, and Turing machines.',
    prerequisites: ['c-6'],
    unlocks: ['c-7', 'c-9'],
  },
  'c-7': {
    level: 'Tier 4 · Advanced Theory',
    difficulty: 4,
    tool: 'Formal Analysis',
    focus: 'Computability bounds, undecidability reductions, P vs NP complexity classes, and approximation limits.',
    prerequisites: ['c-8', 'c-5'],
    unlocks: ['c-1'],
  },
  'c-12': {
    level: 'Tier 2 · Systems',
    difficulty: 2,
    tool: 'SQL / Python',
    focus: 'Relational algebra, ER schema normalization, indexing, transactions, and query optimization.',
    prerequisites: ['c-6'],
    unlocks: ['c-3'],
  },
  'c-10': {
    level: 'Tier 3 · Systems',
    difficulty: 3,
    tool: 'C / Python / Shell',
    focus: 'Process scheduling, deadlocks, virtual memory paging, concurrency locks, and file systems.',
    prerequisites: ['c-13', 'c-6'],
    unlocks: ['c-11'],
  },
  'c-11': {
    level: 'Tier 3 · Systems',
    difficulty: 3,
    tool: 'Python / MATLAB',
    focus: 'TCP/IP protocol stacks, routing topologies, packet flow control, and network security basics.',
    prerequisites: ['c-10'],
    unlocks: ['c-4'],
  },
  'c-9': {
    level: 'Tier 4 · Systems',
    difficulty: 4,
    tool: 'Python / Lex-Yacc',
    focus: 'Lexical analysis, LL/LR parsing, abstract syntax trees, semantic checks, and intermediate codegen.',
    prerequisites: ['c-8', 'c-13'],
    unlocks: [],
  },
  'c-1': {
    level: 'Tier 4 · AI Specialization',
    difficulty: 4,
    tool: 'Python / PyTorch',
    focus: 'Heuristic search, knowledge representation, Bayesian reasoning, and intelligent agent planning.',
    prerequisites: ['c-5', 'c-6'],
    unlocks: ['c-2', 'c-4'],
  },
  'c-2': {
    level: 'Tier 4 · AI Specialization',
    difficulty: 4,
    tool: 'Python / MATLAB',
    focus: 'Supervised and unsupervised learning, regularization, neural architectures, and empirical evaluation.',
    prerequisites: ['c-1', 'c-5'],
    unlocks: ['c-3', 'c-4'],
  },
  'c-3': {
    level: 'Tier 4 · AI Specialization',
    difficulty: 4,
    tool: 'Python / scikit-learn',
    focus: 'Frequent pattern mining, clustering, anomaly detection, and high-dimensional feature pipelines.',
    prerequisites: ['c-12', 'c-2'],
    unlocks: ['c-4'],
  },
  'c-4': {
    level: 'Tier 4 · Research Bridge',
    difficulty: 4,
    tool: 'Python / NetworkX / MATLAB',
    focus: 'Centrality metrics, community detection, diffusion cascades, and topological link prediction.',
    prerequisites: ['c-5', 'c-2'],
    unlocks: [],
  },
};

export const ACADEMIC_SERVICE_VENUES = [
  ...ACADEMIC_SERVICE.conferences.map((conf, idx) => ({
    id: `svc-conf-${idx + 1}`,
    type: 'conference',
    typeLabel: 'Conference',
    name: conf.name,
    meta: conf.note,
    publisher:
      conf.name === 'ICML' || conf.name === 'MusIML@ICML'
        ? 'PMLR / ICML'
        : conf.name === 'NeurIPS'
          ? 'NeurIPS Foundation'
          : conf.name === 'AAAI'
            ? 'AAAI Press'
            : conf.name === 'ICDM'
              ? 'IEEE Computer Society'
              : 'Springer / Academic Proceedings',
    focus:
      conf.name === 'ICML' || conf.name === 'NeurIPS'
        ? 'Machine learning theory, representation learning, structured reasoning, and LLM evaluation.'
        : conf.name === 'AAAI'
          ? 'Knowledge representation, reasoning, graph learning, and applied AI systems.'
          : conf.name === 'ICDM'
            ? 'Data mining, graph analytics, anomaly detection, and scalable discovery.'
            : conf.name === 'MusIML@ICML'
              ? 'Multimodal and structured machine learning, graph complexity, and representation benchmarks.'
              : 'Information systems, computational intelligence, and applied computing.',
    role: conf.note === '2026' ? 'Invited 2026 Technical Reviewer' : 'Peer Reviewer / Program Service',
  })),
  ...ACADEMIC_SERVICE.journals.map((journal, idx) => ({
    id: `svc-jour-${idx + 1}`,
    type: 'journal',
    typeLabel: 'Journal',
    name: journal.name,
    meta: journal.publisher,
    publisher: journal.publisher,
    focus:
      journal.name === 'Scientific Reports' || journal.name === 'npj Complexity'
        ? 'Complex systems, network science, empirical link prediction, and interdisciplinary AI.'
        : journal.name === 'Applied Network Science' ||
            journal.name === 'Social Network Analysis and Mining'
          ? 'Topological network modeling, community structure, diffusion, and social graph mining.'
          : journal.name === 'Cluster Computing'
            ? 'Distributed computing, scalable ML systems, and cyber-physical data pipelines.'
            : 'Intelligent consumer systems, edge AI, and secure networked electronics.',
    role: 'Peer-Reviewed Journal Referee',
  })),
];

export function getCourseProfile(courseId) {
  const course =
    SUBJECTS_TAUGHT.courses.find((c) => c.id === courseId) ||
    SUBJECTS_TAUGHT.courses[0];
  const meta = COURSE_GAME_META[course.id] || {
    level: 'Core Course',
    difficulty: 2,
    tool: `${SUBJECTS_TAUGHT.primaryLanguage} · ${SUBJECTS_TAUGHT.primaryTool}`,
    focus: `${course.name} fundamentals and practical labs.`,
    prerequisites: [],
    unlocks: [],
  };

  const prerequisites = meta.prerequisites
    .map((id) => SUBJECTS_TAUGHT.courses.find((c) => c.id === id))
    .filter(Boolean);
  const unlocks = meta.unlocks
    .map((id) => SUBJECTS_TAUGHT.courses.find((c) => c.id === id))
    .filter(Boolean);

  return {
    ...course,
    ...meta,
    prerequisites,
    unlocks,
  };
}

export function getCourseRelationToActive(courseId, activeCourseId) {
  if (courseId === activeCourseId) return 'active';
  const activeMeta = COURSE_GAME_META[activeCourseId];
  if (!activeMeta) return 'default';
  if (activeMeta.prerequisites.includes(courseId)) return 'prerequisite';
  if (activeMeta.unlocks.includes(courseId)) return 'unlocks';
  return 'default';
}

export function getCurriculumMasteryRank(exploredIds) {
  const total = SUBJECTS_TAUGHT.courses.length;
  const set = exploredIds instanceof Set ? exploredIds : new Set(exploredIds || []);
  let count = 0;
  for (const c of SUBJECTS_TAUGHT.courses) {
    if (set.has(c.id)) count += 1;
  }
  const percent = total === 0 ? 0 : Math.round((count / total) * 100);
  const rank =
    count >= total
      ? 'Curriculum Master'
      : count >= 10
        ? 'Faculty Fellow'
        : count >= 5
          ? 'Track Architect'
          : 'Explorer';

  return { count, total, percent, rank, completed: count >= total };
}

export function getNextUnexploredCourseId(exploredIds, visibleCourses, currentCourseId) {
  const pool =
    Array.isArray(visibleCourses) && visibleCourses.length > 0
      ? visibleCourses
      : SUBJECTS_TAUGHT.courses;
  const set = exploredIds instanceof Set ? exploredIds : new Set(exploredIds || []);

  const nextUnexplored = pool.find(
    (c) => !set.has(c.id) && c.id !== currentCourseId
  );
  if (nextUnexplored) return nextUnexplored.id;

  const anyUnexplored = SUBJECTS_TAUGHT.courses.find(
    (c) => !set.has(c.id) && c.id !== currentCourseId
  );
  if (anyUnexplored) return anyUnexplored.id;

  const idx = pool.findIndex((c) => c.id === currentCourseId);
  return pool[(idx + 1) % pool.length].id;
}

export function filterServiceVenues(filterType = 'all') {
  if (filterType === 'conference') {
    return ACADEMIC_SERVICE_VENUES.filter((v) => v.type === 'conference');
  }
  if (filterType === 'journal') {
    return ACADEMIC_SERVICE_VENUES.filter((v) => v.type === 'journal');
  }
  return ACADEMIC_SERVICE_VENUES;
}

export function getNextUnexploredVenueId(exploredIds, venues, currentVenueId) {
  const pool =
    Array.isArray(venues) && venues.length > 0 ? venues : ACADEMIC_SERVICE_VENUES;
  const set = exploredIds instanceof Set ? exploredIds : new Set(exploredIds || []);

  const nextUnexplored = pool.find(
    (v) => !set.has(v.id) && v.id !== currentVenueId
  );
  if (nextUnexplored) return nextUnexplored.id;

  const idx = pool.findIndex((v) => v.id === currentVenueId);
  return pool[(idx + 1) % pool.length].id;
}

export function getServiceProgress(exploredIds) {
  const total = ACADEMIC_SERVICE_VENUES.length;
  const set = exploredIds instanceof Set ? exploredIds : new Set(exploredIds || []);
  let count = 0;
  for (const v of ACADEMIC_SERVICE_VENUES) {
    if (set.has(v.id)) count += 1;
  }
  return {
    count,
    total,
    percent: total === 0 ? 0 : Math.round((count / total) * 100),
    completed: count >= total,
  };
}

export const CURRICULUM_PATHWAYS = [
  {
    id: 'path-ai',
    label: 'AI & ML Track',
    accent: 'blue',
    summary: 'From programming foundations and data structures into AI, Machine Learning, and Social Network Analysis.',
    courseIds: ['c-16', 'c-14', 'c-6', 'c-5', 'c-1', 'c-2', 'c-4'],
  },
  {
    id: 'path-theory',
    label: 'Algorithms & Theory',
    accent: 'indigo',
    summary: 'Formal computational progression from data structures through Automata, Algorithms, and Advanced Computation Theory.',
    courseIds: ['c-14', 'c-6', 'c-5', 'c-8', 'c-7'],
  },
  {
    id: 'path-systems',
    label: 'Systems & Compilers',
    accent: 'cyan',
    summary: 'Low-level architecture progression spanning Advanced Programming, Operating Systems, Networks, and Compiler Construction.',
    courseIds: ['c-14', 'c-13', 'c-10', 'c-11', 'c-9'],
  },
];

/**
 * Traces all transitive upstream prerequisites and downstream unlocks for a given course.
 */
export function getCourseChain(courseId) {
  const ancestors = new Set();
  const descendants = new Set();

  const walkUp = (id) => {
    const meta = COURSE_GAME_META[id];
    if (!meta) return;
    for (const preId of meta.prerequisites) {
      if (!ancestors.has(preId)) {
        ancestors.add(preId);
        walkUp(preId);
      }
    }
  };

  const walkDown = (id) => {
    const meta = COURSE_GAME_META[id];
    if (!meta) return;
    for (const nextId of meta.unlocks) {
      if (!descendants.has(nextId)) {
        descendants.add(nextId);
        walkDown(nextId);
      }
    }
  };

  walkUp(courseId);
  walkDown(courseId);

  return {
    ancestors: Array.from(ancestors),
    descendants: Array.from(descendants),
  };
}

/**
 * Splits a course's syllabus focus sentence into clean concise topic labels.
 */
export function getCourseTopics(courseId) {
  const profile = getCourseProfile(courseId);
  if (!profile?.focus) return [];
  return profile.focus
    .replace(/\.$/, '')
    .split(/,\s*(?:and\s+)?|\s+and\s+/i)
    .map((topic) => topic.trim())
    .filter(Boolean)
    .map((topic) => topic.charAt(0).toUpperCase() + topic.slice(1));
}

export const CURRICULUM_TIERS = [
  { tier: 1, code: 'L1', label: 'Foundation' },
  { tier: 2, code: 'L2', label: 'Core CS' },
  { tier: 3, code: 'L3', label: 'Theory & Systems' },
  { tier: 4, code: 'L4', label: 'Specialization' },
];

/**
 * Groups visible courses into ordered progression tiers from L1 Foundation -> L4 Specialization.
 */
export function groupCoursesByTier(courses) {
  const list = Array.isArray(courses) ? courses : [];
  return CURRICULUM_TIERS.map((tierDef) => ({
    ...tierDef,
    courses: list.filter(
      (course) => (COURSE_GAME_META[course.id]?.difficulty ?? 2) === tierDef.tier
    ),
  })).filter((group) => group.courses.length > 0);
}

/**
 * Determines interactive card highlight & dimming state for pathway focus.
 * Keeps the active course, its direct prerequisites, its unlocked next courses,
 * and any courses in an active Study Track highlighted while subtly dimming unrelated cards.
 */
export function getCourseCardVisualState(courseId, activeCourseId, activePathway = null) {
  const relation = getCourseRelationToActive(courseId, activeCourseId);
  const inPathway = Boolean(
    activePathway && Array.isArray(activePathway.courseIds) && activePathway.courseIds.includes(courseId)
  );
  const isRelated = relation !== 'default' || inPathway;
  const isDimmed = Boolean(activeCourseId) && !isRelated;

  return {
    relation,
    inPathway,
    isRelated,
    isDimmed,
  };
}

