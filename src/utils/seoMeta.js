export const SEO_CONFIG = {
  siteName: 'Haji Gul',
  title: 'Haji Gul — AI & Knowledge Graph Research Portfolio',
  description:
    'Explore Haji Gul’s AI research portfolio: PhD researcher at Universiti Brunei Darussalam & DAAD AInet Fellow in Knowledge Graphs, LLMs, and GNNs.',
  ogDescription:
    'PhD Researcher in AI at Universiti Brunei Darussalam & 2025 DAAD AInet Fellow · 367+ Citations · 32 Publications in Knowledge Graph Completion, Complex Networks & LLMs.',
  keywords: [
    'Haji Gul',
    'AI Researcher',
    'Knowledge Graph Completion',
    'MuCo-KGC',
    'MuCoS',
    'Graph Neural Networks',
    'Large Language Models',
    'Transformers',
    'Complex Networks',
    'Universiti Brunei Darussalam',
    'DAAD AInet Fellow',
  ],
};

/**
 * Resolves a clean canonical URL from an origin and pathname without trailing query/hash noise.
 */
export function resolveCanonicalUrl(origin, pathname = '/') {
  const cleanOrigin = String(origin || '').replace(/\/+$/, '');
  const normalizedPath = String(pathname || '/').startsWith('/')
    ? String(pathname || '/')
    : `/${pathname}`;
  if (!cleanOrigin) return normalizedPath;
  return `${cleanOrigin}${normalizedPath}`;
}

/**
 * Synchronizes <link rel="canonical"> and <meta property="og:url"> in SPA runtime
 * so social scrapers and client-side SEO tools always see the live canonical URL.
 */
export function syncDocumentSeoUrls(doc = typeof document !== 'undefined' ? document : null, loc = typeof window !== 'undefined' ? window.location : null) {
  if (!doc || !loc) return null;
  const canonicalUrl = resolveCanonicalUrl(loc.origin, loc.pathname);

  const canonicalEl = doc.querySelector('link[rel="canonical"]');
  if (canonicalEl) {
    canonicalEl.setAttribute('href', canonicalUrl);
  }

  const ogUrlEl = doc.querySelector('meta[property="og:url"]');
  if (ogUrlEl) {
    ogUrlEl.setAttribute('content', canonicalUrl);
  }

  return canonicalUrl;
}
