export const HERO_SPOTLIGHTS = [
  {
    id: 'kgc',
    tab: 'KG Completion',
    publicationId: 'pub-01',
    paperTitle: 'MuCo-KGC: Multi-Context-Aware Knowledge Graph Completion',
    venue: 'PAKDD 2025 · Springer · MuCo-KGC',
    summary:
      'MuCo-KGC: Negative-sampling-free multi-context serialization over BERT for scalable Knowledge Graph Completion.',
  },
  {
    id: 'mucos',
    tab: 'MuCoS',
    publicationId: 'pub-02',
    paperTitle: 'MuCoS: Multi-context-aware sampling for drug-target prediction',
    venue: 'BioNLP @ ACL 2025 · AdaptiveBotsLab',
    summary:
      'MuCoS: Multi-context-aware sampling for drug-target prediction over KEGG50k and PharmKG-8k biomedical knowledge graphs.',
  },
  {
    id: 'biomedical',
    tab: 'Drug Discovery & GNNs',
    publicationId: 'pub-25',
    paperTitle:
      'A Hybrid Approach to Predict Links in Real-World Protein-Protein Interaction Networks',
    venue: 'ICITS 2022 · Springer · Protein Interaction Networks',
    summary:
      'Real-world protein–protein interaction network reconstruction using hybrid topological and structural motif features for biomedical discovery.',
  },
];

export function getSpotlightById(spotlightId) {
  return (
    HERO_SPOTLIGHTS.find((item) => item.id === spotlightId) ||
    HERO_SPOTLIGHTS[0]
  );
}

export function resolveSpotlightPublication(spotlightId, publications) {
  if (!Array.isArray(publications) || publications.length === 0) return null;
  const spotlight = getSpotlightById(spotlightId);
  if (!spotlight) return null;
  return (
    publications.find((pub) => pub.id === spotlight.publicationId) || null
  );
}
