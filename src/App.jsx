/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { SectionDivider } from './components/SectionDivider';
import { syncDocumentSeoUrls } from './utils/seoMeta';

// Code-split below-the-fold sections to keep First Paint, LCP & TBT ultra-fast
const loadResearchSection = () =>
  import('./components/ResearchSection').then((m) => ({
    default: m.ResearchSection,
  }));
const loadPublicationsSection = () =>
  import('./components/PublicationsSection').then((m) => ({
    default: m.PublicationsSection,
  }));
const loadOpenSourceSection = () =>
  import('./components/OpenSourceSection').then((m) => ({
    default: m.OpenSourceSection,
  }));
const loadTimelineSection = () =>
  import('./components/TimelineSection').then((m) => ({
    default: m.TimelineSection,
  }));
const loadAcademicProfileSection = () =>
  import('./components/AcademicProfileSection').then((m) => ({
    default: m.AcademicProfileSection,
  }));
const loadHonorsAndLecturesSection = () =>
  import('./components/HonorsAndLecturesSection').then((m) => ({
    default: m.HonorsAndLecturesSection,
  }));
const loadContactSection = () =>
  import('./components/ContactSection').then((m) => ({
    default: m.ContactSection,
  }));
const loadFooter = () =>
  import('./components/Footer').then((m) => ({ default: m.Footer }));
const loadPublicationModal = () =>
  import('./components/PublicationModal').then((m) => ({
    default: m.PublicationModal,
  }));
const loadScrollToTopButton = () =>
  import('./components/ScrollToTopButton').then((m) => ({
    default: m.ScrollToTopButton,
  }));

const ResearchSection = lazy(loadResearchSection);
const PublicationsSection = lazy(loadPublicationsSection);
const OpenSourceSection = lazy(loadOpenSourceSection);
const TimelineSection = lazy(loadTimelineSection);
const AcademicProfileSection = lazy(loadAcademicProfileSection);
const HonorsAndLecturesSection = lazy(loadHonorsAndLecturesSection);
const ContactSection = lazy(loadContactSection);
const Footer = lazy(loadFooter);
const PublicationModal = lazy(loadPublicationModal);
const ScrollToTopButton = lazy(loadScrollToTopButton);

const HASH_TO_SECTION_KEY = {
  research: 'research',
  publications: 'publications',
  projects: 'projects',
  experience: 'experience',
  education: 'experience',
  'academic-profile': 'academic-profile',
  skills: 'academic-profile',
  teaching: 'academic-profile',
  service: 'academic-profile',
  honors: 'honors',
  lectures: 'honors',
  contact: 'contact',
};

const SECTION_LOADERS = {
  research: loadResearchSection,
  publications: loadPublicationsSection,
  projects: loadOpenSourceSection,
  experience: loadTimelineSection,
  'academic-profile': loadAcademicProfileSection,
  honors: loadHonorsAndLecturesSection,
  contact: loadContactSection,
  footer: loadFooter,
};

function SectionPlaceholder({ id, minHeight = 'min-h-[420px]' }) {
  return (
    <div
      id={id}
      aria-hidden="true"
      className={`${minHeight} w-full bg-[#0C0F14]`}
    />
  );
}

/**
 * Mounts a lazy below-the-fold section only when the user scrolls near it
 * (IntersectionObserver) or explicitly navigates to it (anchor/explore click).
 * Prevents React.lazy from fetching and hydrating all 8 below-the-fold chunks
 * during First Paint, eliminating main-thread Long Tasks on initial load.
 */
function DeferredSection({
  id,
  minHeight = 'min-h-[560px]',
  forceMount = false,
  rootMargin = '0px 0px',
  children,
}) {
  const containerRef = useRef(null);
  const [shouldMount, setShouldMount] = useState(forceMount);

  useEffect(() => {
    if (forceMount) {
      setShouldMount(true);
    }
  }, [forceMount]);

  useEffect(() => {
    if (shouldMount) return undefined;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldMount(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldMount]);

  if (shouldMount) {
    return (
      <Suspense fallback={<SectionPlaceholder id={id} minHeight={minHeight} />}>
        {children}
      </Suspense>
    );
  }

  return (
    <div
      ref={containerRef}
      id={id}
      className={`${minHeight} w-full bg-[#0C0F14]`}
      style={{ contentVisibility: 'auto' }}
    />
  );
}

export default function App() {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState('year-desc');
  const [onlyWithCode, setOnlyWithCode] = useState(false);
  const [focusedPublicationId, setFocusedPublicationId] = useState(null);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [forcedSections, setForcedSections] = useState(() => ({}));
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const ensureSectionMounted = useCallback((sectionKey) => {
    if (!sectionKey) return;
    SECTION_LOADERS[sectionKey]?.();
    setForcedSections((prev) =>
      prev[sectionKey] ? prev : { ...prev, [sectionKey]: true }
    );
  }, []);

  const scrollToAnchorId = useCallback(
    (anchorId, block = 'start') => {
      const sectionKey = HASH_TO_SECTION_KEY[anchorId];
      if (sectionKey) {
        ensureSectionMounted(sectionKey);
      }

      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block });
          return;
        }
        attempts += 1;
        if (attempts < 24) {
          window.requestAnimationFrame(tryScroll);
        }
      };

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(tryScroll);
      });
    },
    [ensureSectionMounted]
  );

  useEffect(() => {
    syncDocumentSeoUrls();

    // If the user lands directly on a hash URL (e.g. /#publications), mount it immediately
    const initialHash = window.location.hash.replace(/^#/, '');
    if (initialHash && HASH_TO_SECTION_KEY[initialHash]) {
      scrollToAnchorId(initialHash);
    }

    const handleHashChange = () => {
      const targetId = window.location.hash.replace(/^#/, '');
      if (targetId && HASH_TO_SECTION_KEY[targetId]) {
        scrollToAnchorId(targetId);
      }
    };

    const handleAnchorClick = (event) => {
      const anchor = event.target?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href')?.slice(1);
      if (targetId && HASH_TO_SECTION_KEY[targetId]) {
        ensureSectionMounted(HASH_TO_SECTION_KEY[targetId]);
        // Re-align after the lazy section finishes mounting if it was still a placeholder
        window.setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      }
    };

    const handleScrollTrack = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
      }
      if (window.scrollY > 240) {
        setShowScrollTop(true);
        window.removeEventListener('scroll', handleScrollTrack);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener('click', handleAnchorClick, { passive: true });
    window.addEventListener('scroll', handleScrollTrack, { passive: true });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleScrollTrack);
    };
  }, [ensureSectionMounted, scrollToAnchorId]);

  const handleSelectTopic = (nextCategory, nextQuery = '') => {
    setFocusedPublicationId(null);
    setCategory(nextCategory);
    setSearchQuery(nextQuery);
    setOnlyWithCode(false);
    scrollToAnchorId('publications');
  };

  const handleExplorePaper = (publicationId) => {
    if (!publicationId) return;

    // Reset competing filters and isolate the exact paper inside #publications
    setCategory('all');
    setSearchQuery('');
    setOnlyWithCode(false);
    setFocusedPublicationId(publicationId);

    // Mount lazy PublicationsSection immediately, then scroll cleanly to the isolated card
    ensureSectionMounted('publications');
    let attempts = 0;
    const scrollToTargetCard = () => {
      const cardEl = document.getElementById(`publication-card-${publicationId}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      attempts += 1;
      if (attempts < 28) {
        window.requestAnimationFrame(scrollToTargetCard);
      } else {
        document.getElementById('publications')?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(scrollToTargetCard);
    });
  };

  const handleCategoryChange = (nextCategory) => {
    setFocusedPublicationId(null);
    setCategory(nextCategory);
  };

  const handleSearchChange = (nextQuery) => {
    setFocusedPublicationId(null);
    setSearchQuery(nextQuery);
  };

  const handleToggleOnlyWithCode = () => {
    setFocusedPublicationId(null);
    setOnlyWithCode((prev) => !prev);
  };

  const handleResetFilters = () => {
    setFocusedPublicationId(null);
    setCategory('all');
    setSearchQuery('');
    setSortMode('year-desc');
    setOnlyWithCode(false);
  };

  const sectionRootMargin = hasScrolled ? '360px 0px' : '0px 0px';

  return (
    <div className="min-h-screen bg-[#0C0F14] text-[#F3F5F8]">
      <LoadingScreen />
      <Navbar />
      <main>
        <HeroSection onExplorePaper={handleExplorePaper} />
        <SectionDivider />
        <DeferredSection
          id="research"
          minHeight="min-h-[680px]"
          rootMargin={sectionRootMargin}
          forceMount={Boolean(forcedSections.research)}
        >
          <ResearchSection
            onSelectTopic={handleSelectTopic}
            onSelectPublication={setSelectedPublication}
          />
        </DeferredSection>
        <SectionDivider />
        <DeferredSection
          id="publications"
          minHeight="min-h-[680px]"
          rootMargin={sectionRootMargin}
          forceMount={Boolean(forcedSections.publications)}
        >
          <PublicationsSection
            category={category}
            searchQuery={searchQuery}
            sortMode={sortMode}
            onlyWithCode={onlyWithCode}
            focusedPublicationId={focusedPublicationId}
            onCategoryChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
            onSortChange={setSortMode}
            onToggleOnlyWithCode={handleToggleOnlyWithCode}
            onClearFocusedPublication={() => setFocusedPublicationId(null)}
            onResetFilters={handleResetFilters}
            onSelectPublication={setSelectedPublication}
          />
        </DeferredSection>
        <SectionDivider />
        <DeferredSection
          id="projects"
          minHeight="min-h-[520px]"
          rootMargin={sectionRootMargin}
          forceMount={Boolean(forcedSections.projects)}
        >
          <OpenSourceSection />
        </DeferredSection>
        <SectionDivider />
        <DeferredSection
          id="experience"
          minHeight="min-h-[640px]"
          rootMargin={sectionRootMargin}
          forceMount={Boolean(forcedSections.experience)}
        >
          <TimelineSection />
        </DeferredSection>
        <SectionDivider />
        <DeferredSection
          id="academic-profile"
          minHeight="min-h-[680px]"
          rootMargin={sectionRootMargin}
          forceMount={Boolean(forcedSections['academic-profile'])}
        >
          <AcademicProfileSection />
        </DeferredSection>
        <SectionDivider />
        <DeferredSection
          id="honors"
          minHeight="min-h-[640px]"
          rootMargin={sectionRootMargin}
          forceMount={Boolean(forcedSections.honors)}
        >
          <HonorsAndLecturesSection />
        </DeferredSection>
        <SectionDivider />
        <DeferredSection
          id="contact"
          minHeight="min-h-[560px]"
          rootMargin={sectionRootMargin}
          forceMount={Boolean(forcedSections.contact)}
        >
          <ContactSection />
        </DeferredSection>
      </main>
      <DeferredSection
        id="footer-landmark"
        minHeight="min-h-[180px]"
        rootMargin={sectionRootMargin}
        forceMount={Boolean(forcedSections.footer)}
      >
        <Footer />
      </DeferredSection>
      {selectedPublication && (
        <Suspense fallback={null}>
          <PublicationModal
            publication={selectedPublication}
            onClose={() => setSelectedPublication(null)}
          />
        </Suspense>
      )}
      {showScrollTop && (
        <Suspense fallback={null}>
          <ScrollToTopButton />
        </Suspense>
      )}
    </div>
  );
}
