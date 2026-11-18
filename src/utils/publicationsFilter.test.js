import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CERTIFICATIONS,
  EDUCATION_TIMELINE,
  PUBLICATIONS,
  YOUTUBE_LECTURES,
} from '../data/portfolioData.js';
import {
  filterAndSortPublications,
  getCategoryCounts,
  getCodeBackedCount,
} from './publicationsFilter.js';

test('inventory contains all 32 publications with unique ids and valid BibTeX', () => {
  assert.equal(PUBLICATIONS.length, 32);
  const ids = new Set(PUBLICATIONS.map((p) => p.id));
  assert.equal(ids.size, 32);
  for (const pub of PUBLICATIONS) {
    assert.ok(pub.bibtex.includes('@'), `Missing BibTeX for ${pub.id}`);
    assert.ok(pub.year >= 2020 && pub.year <= 2026);
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

test('onlyWithCode filters strictly to publications with GitHub repositories', () => {
  const codeCount = getCodeBackedCount(PUBLICATIONS);
  assert.ok(codeCount >= 6, 'Expected multiple publications with GitHub links');
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
