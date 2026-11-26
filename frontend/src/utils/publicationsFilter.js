/**
 * The 6 flagship publications displayed with full architectural/experimental diagrams
 * on the Publications page, in exact curated display order:
 * 1. MuCoS
 * 2. MuCo-KGC
 * 3. Link Prediction Using Node Information on Local Paths
 * 4. Path-Based Extensions of Local Link Prediction Methods for Complex Networks
 * 5. KG-EDAS: A Meta-Metric Framework for Evaluating Knowledge Graph Completion Models
 * 6. Evaluating Knowledge Graph Complexity via Semantic, Spectral, and Structural Metrics for Link Prediction
 */
export const FEATURED_DIAGRAM_PUBLICATION_IDS = [
  'pub-02',
  'pub-01',
  'pub-14',
  'pub-15',
  'pub-04',
  'pub-05',
];

const FEATURED_DIAGRAM_ORDER = new Map(
  FEATURED_DIAGRAM_PUBLICATION_IDS.map((id, idx) => [id, idx])
);

export function isFeaturedDiagramPublication(pub) {
  return Boolean(pub && FEATURED_DIAGRAM_ORDER.has(pub.id));
}

export function getPaperHref(pub) {
  if (!pub) return '#';
  return pub.paperUrl || pub.doiUrl || pub.scholarUrl || '#';
}

export function filterAndSortPublications(publications, criteria) {
  if (!Array.isArray(publications)) return [];
  const normalizedQuery = (criteria?.searchQuery || '').trim().toLowerCase();

  const filtered = publications.filter((pub) => {
    if (!pub) return false;
    const matchesCategory =
      !criteria?.category ||
      criteria.category === 'all' ||
      pub.category === criteria.category;

    if (!matchesCategory) {
      return false;
    }

    if (criteria?.onlyWithCode && !(pub.githubUrl || pub.codeUrl)) {
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
      pub.abstract || '',
      String(pub.year || ''),
      ...keywords,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });

  return [...filtered].sort((a, b) => {
    if (criteria?.sortMode === 'citations-desc') {
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

/**
 * Partitions filtered publications into:
 * - featuredWithDiagrams: up to 6 curated publications rendered with full diagrams
 * - compactOneLine: all remaining matching publications rendered as compact single-line links
 */
export function partitionPublications(
  filteredPublications,
  { preserveFeaturedOrder = true } = {}
) {
  if (!Array.isArray(filteredPublications)) {
    return { featuredWithDiagrams: [], compactOneLine: [] };
  }

  const featuredWithDiagrams = [];
  const compactOneLine = [];

  for (const pub of filteredPublications) {
    if (isFeaturedDiagramPublication(pub)) {
      featuredWithDiagrams.push(pub);
    } else {
      compactOneLine.push(pub);
    }
  }

  if (preserveFeaturedOrder) {
    featuredWithDiagrams.sort(
      (a, b) =>
        (FEATURED_DIAGRAM_ORDER.get(a.id) ?? 999) -
        (FEATURED_DIAGRAM_ORDER.get(b.id) ?? 999)
    );
  }

  return { featuredWithDiagrams, compactOneLine };
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
    initialLimit = 6,
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
