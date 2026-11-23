import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  ACADEMIC_SERVICE,
  CERTIFICATIONS,
  EDUCATION_TIMELINE,
  OPEN_SOURCE_CATEGORIES,
  OPEN_SOURCE_PROJECTS,
  PROFILE_INFO,
  PUBLICATIONS,
  SUBJECTS_TAUGHT,
  TECHNICAL_SKILLS_STACK,
  YOUTUBE_LECTURES,
} from '../data/portfolioData.js';
import {
  filterAndSortPublications,
  getCategoryCounts,
  getCodeBackedCount,
  getVisiblePublications,
  isPublicationFilterActive,
} from './publicationsFilter.js';
import { SPLASH_HIGHLIGHTS } from './splashScreen.js';
import { SEO_CONFIG } from './seoMeta.js';

test('inventory contains all 32 publications with unique ids, valid BibTeX, publisher, paper-specific scholar link, verified github links, and diagram image', () => {
  assert.equal(PUBLICATIONS.length, 32);
  const ids = new Set(PUBLICATIONS.map((p) => p.id));
  assert.equal(ids.size, 32);

  let exactCitationCount = 0;
  for (const pub of PUBLICATIONS) {
    assert.ok(pub.title && pub.title.length > 5, `Missing title for ${pub.id}`);
    assert.ok(pub.abstract && pub.abstract.length > 20, `Missing idea/abstract for ${pub.id}`);
    assert.ok(pub.publisher && pub.publisher.length > 1, `Missing publisher for ${pub.id}`);
    assert.ok(pub.scholarUrl?.startsWith('https://scholar.google.com/'), `Missing scholarUrl for ${pub.id}`);
    if (
      pub.scholarUrl.startsWith(
        'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:'
      )
    ) {
      exactCitationCount += 1;
    }
    if (pub.githubUrl) {
      assert.ok(pub.githubUrl.startsWith('https://github.com/'), `Invalid githubUrl for ${pub.id}`);
      assert.ok(
        !pub.githubUrl.includes('?tab=repositories&q='),
        `Placeholder search githubUrl still present on ${pub.id}`
      );
    }
    assert.ok(pub.figureUrl, `Missing figureUrl for ${pub.id}`);
    const assetPath = path.join(process.cwd(), 'public', pub.figureUrl.replace(/^\//, ''));
    assert.ok(fs.existsSync(assetPath), `Diagram file missing on disk for ${pub.id}: ${assetPath}`);
    assert.ok(pub.bibtex.includes('@'), `Missing BibTeX for ${pub.id}`);
    assert.ok(pub.year >= 2020 && pub.year <= 2026);
  }

  assert.equal(exactCitationCount, 31, 'Expected 31/32 exact view_citation Google Scholar URLs');
  const pub11 = PUBLICATIONS.find((p) => p.id === 'pub-11');
  assert.equal(
    pub11?.scholarUrl,
    'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WqmzWogAAAAJ&citation_for_view=WqmzWogAAAAJ:TFP_iSt0sucC'
  );
});

test('default publications view shows only the 2 most recent papers, while search or any filter shows all matching papers', () => {
  const defaultSorted = filterAndSortPublications(PUBLICATIONS, {
    category: 'all',
    searchQuery: '',
    sortMode: 'year-desc',
    onlyWithCode: false,
  });
  assert.equal(isPublicationFilterActive({ category: 'all', searchQuery: '', onlyWithCode: false }), false);
  const defaultVisible = getVisiblePublications(defaultSorted, {
    category: 'all',
    searchQuery: '',
    onlyWithCode: false,
  });
  assert.equal(defaultVisible.length, 2);
  assert.ok(defaultVisible.every((p) => p.year === 2026));

  const kgFiltered = filterAndSortPublications(PUBLICATIONS, {
    category: 'kg-llm',
    searchQuery: '',
    sortMode: 'year-desc',
    onlyWithCode: false,
  });
  const kgVisible = getVisiblePublications(kgFiltered, {
    category: 'kg-llm',
    searchQuery: '',
    onlyWithCode: false,
  });
  assert.equal(kgVisible.length, kgFiltered.length);
  assert.ok(kgVisible.length > 2);

  const searchFiltered = filterAndSortPublications(PUBLICATIONS, {
    category: 'all',
    searchQuery: 'Link Prediction',
    sortMode: 'year-desc',
    onlyWithCode: false,
  });
  const searchVisible = getVisiblePublications(searchFiltered, {
    category: 'all',
    searchQuery: 'Link Prediction',
    onlyWithCode: false,
  });
  assert.equal(searchVisible.length, searchFiltered.length);
  assert.ok(searchVisible.length > 2);
});

test('focusedPublicationId isolates the exact spotlight paper inside the publications view', () => {
  const allSorted = filterAndSortPublications(PUBLICATIONS, {
    category: 'all',
    searchQuery: '',
    sortMode: 'year-desc',
    onlyWithCode: false,
  });

  for (const targetId of ['pub-01', 'pub-02', 'pub-25']) {
    assert.equal(
      isPublicationFilterActive({
        category: 'all',
        searchQuery: '',
        onlyWithCode: false,
        focusedPublicationId: targetId,
      }),
      true
    );
    const visible = getVisiblePublications(allSorted, {
      category: 'all',
      searchQuery: '',
      onlyWithCode: false,
      focusedPublicationId: targetId,
    });
    assert.equal(visible.length, 1);
    assert.equal(visible[0].id, targetId);
  }
});

test('category counts sum cleanly to total publications', () => {
  const counts = getCategoryCounts(PUBLICATIONS);
  assert.equal(counts.all, 32);
  assert.equal(
    counts['kg-llm'] + counts['link-prediction'] + counts['healthcare-cps'],
    32
  );
});

test('filtering by category returns only matching publications', () => {
  const kgPapers = filterAndSortPublications(PUBLICATIONS, {
    category: 'kg-llm',
    searchQuery: '',
    sortMode: 'year-desc',
  });
  assert.ok(kgPapers.length > 0);
  assert.ok(kgPapers.every((p) => p.category === 'kg-llm'));
});

test('onlyWithCode filters strictly to the 8 publications with verified GitHub repositories', () => {
  const codeCount = getCodeBackedCount(PUBLICATIONS);
  assert.equal(codeCount, 8);
  const codePapers = filterAndSortPublications(PUBLICATIONS, {
    category: 'all',
    searchQuery: '',
    sortMode: 'year-desc',
    onlyWithCode: true,
  });
  assert.equal(codePapers.length, codeCount);
  assert.ok(codePapers.every((p) => Boolean(p.githubUrl)));
});

test('search matches title, venue, year, and keywords case-insensitively', () => {
  const pakdd = filterAndSortPublications(PUBLICATIONS, {
    category: 'all',
    searchQuery: '  pakdd ',
    sortMode: 'year-desc',
  });
  assert.equal(pakdd.length, 1);
  assert.equal(pakdd[0].id, 'pub-01');

  const y2020 = filterAndSortPublications(PUBLICATIONS, {
    category: 'all',
    searchQuery: '2020',
    sortMode: 'year-desc',
  });
  assert.equal(y2020.length, 2);
});

test('citations-desc sort orders highest cited paper first', () => {
  const sorted = filterAndSortPublications(PUBLICATIONS, {
    category: 'all',
    searchQuery: '',
    sortMode: 'citations-desc',
  });
  for (let i = 1; i < sorted.length; i += 1) {
    assert.ok(sorted[i - 1].citations >= sorted[i].citations);
  }
});

test('education timeline contains all 6 degrees with institution links and associated skills', () => {
  assert.equal(EDUCATION_TIMELINE.length, 6);
  assert.deepEqual(
    EDUCATION_TIMELINE.map((e) => e.id),
    ['edu-phd', 'edu-ms', 'edu-msc', 'edu-bsc', 'edu-hssc', 'edu-ssc']
  );
  assert.deepEqual(
    EDUCATION_TIMELINE.map((e) => e.skills?.length ?? 0),
    [6, 5, 5, 4, 3, 3]
  );
  for (const edu of EDUCATION_TIMELINE) {
    assert.ok(
      edu.institutionUrl?.startsWith('https://www.linkedin.com/school/'),
      `Missing institution URL for ${edu.id}`
    );
  }
});

test('certifications inventory contains all 8 verified certificates with credential links, IDs, and images', () => {
  assert.equal(CERTIFICATIONS.length, 8);
  const withIds = CERTIFICATIONS.filter((c) => Boolean(c.credentialId));
  assert.equal(withIds.length, 8);
  assert.deepEqual(
    withIds.map((c) => c.credentialId).sort(),
    [
      '3BI8MK3YVT9A',
      '4G5ORTWK63S3',
      'CDZ3FNTE66MS',
      'HAP2PJ2D93DG',
      'RH9A1IEZDEDI',
      'RYUPKP39ABP5',
      'U862UXYU5U5M',
      'ZTRVPVTSPZYA',
    ]
  );
  const withImages = CERTIFICATIONS.filter((c) => Boolean(c.imageUrl));
  assert.equal(withImages.length, 8);
  for (const cert of withImages) {
    assert.ok(cert.imageUrl?.startsWith('/assets/portfolio/image_'));
    assert.ok(cert.verifyUrl?.startsWith('https://coursera.org/verify/'));
  }
  for (const cert of CERTIFICATIONS) {
    assert.equal(
      cert.credentialUrl,
      'https://www.linkedin.com/in/haji-gul-658502120/details/certifications/'
    );
  }
});

test('youtube lectures contain all 6 exact playlists with thumbnail images', () => {
  assert.equal(YOUTUBE_LECTURES.length, 6);
  for (const lec of YOUTUBE_LECTURES) {
    assert.ok(
      lec.url.startsWith('https://youtube.com/playlist?list='),
      `Invalid YouTube playlist URL for ${lec.id}`
    );
    assert.ok(
      lec.thumbnailUrl.startsWith('/assets/portfolio/') && lec.thumbnailUrl.endsWith('.jpg'),
      `Invalid playlist image for ${lec.id}`
    );
  }
});

test('subjects taught, academic service, technical skills, and 7-category open-source projects are complete', () => {
  assert.equal(SUBJECTS_TAUGHT.primaryLanguage, 'Python');
  assert.equal(SUBJECTS_TAUGHT.primaryTool, 'MATLAB');
  assert.equal(SUBJECTS_TAUGHT.courses.length, 16);

  assert.equal(ACADEMIC_SERVICE.conferences.length, 7);
  assert.equal(ACADEMIC_SERVICE.journals.length, 6);

  assert.equal(TECHNICAL_SKILLS_STACK.length, 7);
  assert.equal(OPEN_SOURCE_CATEGORIES.length, 7);

  const coveredCategories = new Set(OPEN_SOURCE_PROJECTS.map((p) => p.category));
  for (const cat of OPEN_SOURCE_CATEGORIES) {
    assert.ok(coveredCategories.has(cat.id), `No projects found for open-source category ${cat.id}`);
  }
  for (const proj of OPEN_SOURCE_PROJECTS) {
    assert.ok(proj.repoUrl?.startsWith('https://github.com/'), `Missing repoUrl for ${proj.id}`);
  }
});

test('Google Scholar metrics (publications, total citations, h-index, i10-index) are mathematically consistent across PROFILE_INFO, PUBLICATIONS, splash, SEO, and index.html', () => {
  const { publications, citations, hIndex, i10Index } = PROFILE_INFO.metrics;

  assert.equal(PUBLICATIONS.length, publications, 'PUBLICATIONS.length must match PROFILE_INFO.metrics.publications');

  const sortedCitations = PUBLICATIONS.map((p) => p.citations).sort((a, b) => b - a);
  const sumCitations = sortedCitations.reduce((acc, n) => acc + n, 0);
  let computedH = 0;
  for (let i = 0; i < sortedCitations.length; i += 1) {
    if (sortedCitations[i] >= i + 1) computedH = i + 1;
  }
  const computedI10 = sortedCitations.filter((c) => c >= 10).length;

  assert.equal(sumCitations, citations, 'Sum of per-paper citations must equal PROFILE_INFO.metrics.citations');
  assert.equal(computedH, hIndex, 'Computed h-index must equal PROFILE_INFO.metrics.hIndex');
  assert.equal(computedI10, i10Index, 'Computed i10-index must equal PROFILE_INFO.metrics.i10Index');

  const splashPubs = SPLASH_HIGHLIGHTS.find((h) => h.label === 'Publications');
  const splashCites = SPLASH_HIGHLIGHTS.find((h) => h.label === 'Citations');
  const splashH = SPLASH_HIGHLIGHTS.find((h) => h.label === 'h-index');
  assert.equal(splashPubs?.value, `${publications}`);
  assert.equal(splashCites?.value, `${citations}+`);
  assert.equal(splashH?.value, `${hIndex}`);

  assert.ok(SEO_CONFIG.ogDescription.includes(`${citations}+ Citations`));
  assert.ok(SEO_CONFIG.ogDescription.includes(`${publications} Publications`));

  const indexHtml = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
  assert.ok(indexHtml.includes(`${citations}+ Citations`), 'index.html must include current citation count');
  assert.ok(indexHtml.includes(`${publications} Publications`), 'index.html must include current publication count');
  assert.ok(!indexHtml.includes('367+'), 'index.html must not contain stale 367+ citation count');
});
