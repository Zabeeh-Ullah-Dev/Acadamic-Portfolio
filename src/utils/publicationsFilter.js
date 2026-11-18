export function filterAndSortPublications(publications, criteria) {
  const normalizedQuery = criteria.searchQuery.trim().toLowerCase();

  const filtered = publications.filter((pub) => {
    const matchesCategory =
      criteria.category === 'all' || pub.category === criteria.category;

    if (!matchesCategory) {
      return false;
    }

    if (criteria.onlyWithCode && !pub.githubUrl) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      pub.title,
      pub.authors,
      pub.venue,
      pub.publisher,
      String(pub.year),
      ...pub.keywords,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  return [...filtered].sort((a, b) => {
    if (criteria.sortMode === 'citations-desc') {
      if (b.citations !== a.citations) {
        return b.citations - a.citations;
      }
      return b.year - a.year;
    }
    if (b.year !== a.year) {
      return b.year - a.year;
    }
    return a.index - b.index;
  });
}

export function getCategoryCounts(publications) {
  const counts = {
    all: publications.length,
    'kg-llm': 0,
    'link-prediction': 0,
    'healthcare-cps': 0,
  };

  for (const pub of publications) {
    counts[pub.category] += 1;
  }

  return counts;
}

export function getCodeBackedCount(publications) {
  return publications.filter((pub) => Boolean(pub.githubUrl)).length;
}
