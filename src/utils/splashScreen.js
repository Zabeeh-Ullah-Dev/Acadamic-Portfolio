export const SPLASH_PROFILE = {
  name: 'Haji Gul',
  avatarUrl: '/assets/aistudio/image_f655c344.png',
  bio: 'Ph.D. (AI) Researcher | NLP Knowledge Graphs | Transformers | LLMs | Generative AI | GNNs | Machine-Deep Learning',
  affiliation: 'School of Digital Science · Universiti Brunei Darussalam',
  fellowship: '2025 DAAD AInet Fellow',
  durationMs: 2500,
  reducedMotionDurationMs: 550,
  exitTransitionMs: 500,
};

export const SPLASH_HIGHLIGHTS = [
  { value: '32', label: 'Publications' },
  { value: '367+', label: 'Citations' },
  { value: '10', label: 'h-index' },
  { value: '219+', label: 'Lectures' },
];

/**
 * Determines whether the splash screen should be skipped immediately on load.
 */
export function shouldSkipSplash(search = '') {
  if (!search) return false;
  try {
    const params = new URLSearchParams(search);
    const autostart = params.get('autostart');
    return autostart === '1' || autostart === 'true';
  } catch {
    return false;
  }
}

/**
 * Computes eased 0-100 progress for the loading bar.
 */
export function computeSplashProgress(elapsedMs, totalDurationMs = SPLASH_PROFILE.durationMs) {
  if (totalDurationMs <= 0) return 100;
  const clamped = Math.max(0, Math.min(1, elapsedMs / totalDurationMs));
  // Smooth ease-out cubic so the bar accelerates cleanly and settles gently at 100%
  const eased = 1 - Math.pow(1 - clamped, 3);
  return Math.round(eased * 100);
}

/**
 * Returns an engaging, grounded loading caption for the current progress stage.
 */
export function getSplashStatusLabel(progress = 0) {
  if (progress >= 92) return 'Entering research portfolio';
  if (progress >= 55) return 'Mapping 32 publications & open-source code';
  return 'Initializing knowledge graph & AI research archive';
}

/**
 * Full primary navbar items matching all main portfolio sections.
 */
export const PRIMARY_NAV_ITEMS = [
  { label: 'Research', href: '#research', id: 'research' },
  { label: 'Publications', href: '#publications', id: 'publications' },
  { label: 'Code', href: '#projects', id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Teaching', href: '#academic-profile', id: 'academic-profile' },
  { label: 'Honors', href: '#honors', id: 'honors' },
  { label: 'Lectures', href: '#lectures', id: 'lectures' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export function mapSectionIdToNavId(sectionId) {
  switch (sectionId) {
    case 'research':
    case 'expertise-cloud':
      return 'research';
    case 'publications':
      return 'publications';
    case 'projects':
      return 'projects';
    case 'experience':
    case 'timeline':
      return 'experience';
    case 'education':
      return 'education';
    case 'academic-profile':
    case 'subjects-taught':
    case 'academic-service':
    case 'technical-skills':
      return 'academic-profile';
    case 'honors':
    case 'certifications':
      return 'honors';
    case 'lectures':
      return 'lectures';
    case 'contact':
      return 'contact';
    default:
      return '';
  }
}
