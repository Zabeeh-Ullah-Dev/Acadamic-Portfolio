export function filterOpenSourceProjects(
  projects,
  { category = 'all', searchQuery = '' } = {}
) {
  const q = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    if (category !== 'all' && project.category !== category) {
      return false;
    }
    if (!q) return true;

    const hay = [
      project.name,
      project.subtitle,
      project.description,
      ...(project.stack || []),
      ...(project.relatedRepos || []).map((r) => r.label),
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

  return filteredProjects.slice(0, initialLimit);
}
