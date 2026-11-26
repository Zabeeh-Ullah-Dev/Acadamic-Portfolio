export function filterOpenSourceProjects(
  projects,
  { category = 'all', searchQuery = '' } = {}
) {
  if (!Array.isArray(projects)) return [];
  const q = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    if (!project) return false;
    if (category !== 'all' && project.category !== category) {
      return false;
    }
    if (!q) return true;

    const stack = Array.isArray(project.stack) ? project.stack : [];
    const related = Array.isArray(project.relatedRepos)
      ? project.relatedRepos.map((r) => r?.label || '')
      : [];

    const hay = [
      project.name || '',
      project.subtitle || '',
      project.description || '',
      ...stack,
      ...related,
    ]
      .join(' ')
      .toLowerCase();

    return hay.includes(q);
  });
}

export function isOpenSourceFilterActive({
  category = 'all',
  searchQuery = '',
  showAll = false,
} = {}) {
  return (
    category !== 'all' ||
    searchQuery.trim() !== '' ||
    Boolean(showAll)
  );
}

export function getVisibleOpenSourceProjects(
  filteredProjects,
  {
    category = 'all',
    searchQuery = '',
    showAll = false,
    initialLimit = 2,
  } = {}
) {
  if (isOpenSourceFilterActive({ category, searchQuery, showAll })) {
    return filteredProjects;
  }

  const featured = filteredProjects.filter((project) => Boolean(project.featured));
  if (featured.length >= initialLimit) {
    return featured.slice(0, initialLimit);
  }

  const featuredIds = new Set(featured.map((project) => project.id));
  const remaining = filteredProjects.filter((project) => !featuredIds.has(project.id));
  return [...featured, ...remaining].slice(0, initialLimit);
}
