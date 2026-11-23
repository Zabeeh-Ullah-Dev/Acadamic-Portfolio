import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { SEO_CONFIG, resolveCanonicalUrl } from './seoMeta';

test('SEO title and meta description follow search snippet length guidelines', () => {
  assert.ok(
    SEO_CONFIG.title.length >= 30 && SEO_CONFIG.title.length <= 60,
    `Expected title length 30..60, got ${SEO_CONFIG.title.length}`
  );
  assert.ok(
    SEO_CONFIG.description.length >= 120 && SEO_CONFIG.description.length <= 160,
    `Expected description length 120..160, got ${SEO_CONFIG.description.length}`
  );
  assert.ok(SEO_CONFIG.keywords.includes('Knowledge Graph Completion'));
});

test('resolveCanonicalUrl strips trailing slashes from origin and normalizes pathname', () => {
  assert.equal(
    resolveCanonicalUrl('https://example.com/', '/'),
    'https://example.com/'
  );
  assert.equal(
    resolveCanonicalUrl('https://example.com', 'research'),
    'https://example.com/research'
  );
  assert.equal(
    resolveCanonicalUrl('https://example.com/', '/publications'),
    'https://example.com/publications'
  );
});

test('index.html embeds valid Schema.org JSON-LD graph, OpenGraph, Twitter Cards, and LCP image preload', () => {
  const htmlPath = path.resolve(process.cwd(), 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');

  assert.match(html, /<meta[^>]+name="description"/i);
  assert.match(html, /<meta[^>]+name="robots"[^>]+index,\s*follow/i);
  assert.match(html, /<meta[^>]+property="og:type"/i);
  assert.match(html, /<meta[^>]+property="og:title"/i);
  assert.match(html, /<meta[^>]+property="og:image"/i);
  assert.match(html, /<meta[^>]+name="twitter:card"[^>]+summary_large_image/i);
  assert.match(html, /<link[^>]+rel="canonical"/i);
  assert.match(html, /<link[^>]+rel="preload"[^>]+as="image"[^>]+Haji_gul_33eec388\.webp/i);

  const ldMatch = html.match(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i
  );
  assert.ok(ldMatch, 'Expected Schema.org JSON-LD block in index.html');
  const parsed = JSON.parse(ldMatch[1]);
  assert.equal(parsed['@context'], 'https://schema.org');
  assert.ok(Array.isArray(parsed['@graph']), 'Expected structured @graph array');
  const types = parsed['@graph'].map((node) => node['@type']);
  assert.ok(types.includes('WebSite'));
  assert.ok(types.includes('ProfilePage'));
  assert.ok(types.includes('Person'));
  assert.ok(types.includes('ScholarlyArticle'));
});
