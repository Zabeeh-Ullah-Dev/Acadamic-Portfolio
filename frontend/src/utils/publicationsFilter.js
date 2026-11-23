export function filterAndSortPublications(publications, criteria) {
  if (!Array.isArray(publications)) return [];
  const normalizedQuery = criteria.searchQuery.trim().toLowerCase();

  const filtered = publications.filter((pub) => {
    if (!pub) return false;
    const matchesCategory =
      criteria.category === 'all' || pub.category === criteria.category;

    if (!matchesCategory) {
      return false;
    }

    if (criteria.onlyWithCode && !(pub.githubUrl || pub.codeUrl)) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const keywords = Array.isArray(pub.keywords)
      ? pub.keywords
      : Array.isArray(pub.highlights)
      ? pub.highlights
      : [];

    const haystack = [
      pub.title || '',
      pub.authors || '',
      pub.venue || '',
      pub.publisher || '',
      String(pub.year || ''),
      ...keywords,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  return [...filtered].sort((a, b) => {
    if (criteria.sortMode === 'citations-desc') {
      const bCit = Number(b.citations || 0);
      const aCit = Number(a.citations || 0);
      if (bCit !== aCit) {
        return bCit - aCit;
      }
      return (Number(b.year) || 0) - (Number(a.year) || 0);
    }
    if (b.year !== a.year) {
      return (Number(b.year) || 0) - (Number(a.year) || 0);
    }
    return (Number(a.index) || 0) - (Number(b.index) || 0);
  });
}

export function getCategoryCounts(publications) {
  const counts = {
    all: Array.isArray(publications) ? publications.length : 0,
    'kg-llm': 0,
    'link-prediction': 0,
    'healthcare-cps': 0,
  };

  if (!Array.isArray(publications)) return counts;

  for (const pub of publications) {
    if (pub && pub.category) {
      counts[pub.category] = (counts[pub.category] || 0) + 1;
    }
  }

  return counts;
}

export function getCodeBackedCount(publications) {
  if (!Array.isArray(publications)) return 0;
  return publications.filter((pub) => Boolean(pub?.githubUrl || pub?.codeUrl)).length;
}

export function isPublicationFilterActive({
  category = 'all',
  searchQuery = '',
  onlyWithCode = false,
  focusedPublicationId = null,
} = {}) {
  return (
    Boolean(focusedPublicationId) ||
    category !== 'all' ||
    searchQuery.trim() !== '' ||
    Boolean(onlyWithCode)
  );
}

export function getVisiblePublications(
  filteredPublications,
  {
    category = 'all',
    searchQuery = '',
    onlyWithCode = false,
    focusedPublicationId = null,
    initialLimit = 2,
  } = {}
) {
  if (focusedPublicationId) {
    const exactMatch = filteredPublications.find(
      (pub) => pub.id === focusedPublicationId
    );
    if (exactMatch) {
      return [exactMatch];
    }
  }
  if (
    isPublicationFilterActive({
      category,
      searchQuery,
      onlyWithCode,
      focusedPublicationId,
    })
  ) {
    return filteredPublications;
  }
  return filteredPublications.slice(0, initialLimit);
}


