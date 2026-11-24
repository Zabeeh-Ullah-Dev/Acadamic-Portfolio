/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { SectionDivider } from './components/SectionDivider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { syncDocumentSeoUrls } from './utils/seoMeta';
import { shouldSkipSplash } from './utils/splashScreen';
import { PortfolioDataProvider } from './context/PortfolioContext';
import { AdminPage } from './admin/AdminPage';

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
      <ErrorBoundary sectionName={id}>
        <Suspense fallback={<SectionPlaceholder id={id} minHeight={minHeight} />}>
          {children}
        </Suspense>
      </ErrorBoundary>
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

function getRouteFromLocation() {
  if (typeof window === 'undefined') return '';
  const path = window.location.pathname.replace(/\/$/, '');
  const rawHash = window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '');

  if (path === '/admin' || rawHash === 'admin') return 'admin';
  if (!rawHash || rawHash === 'top' || rawHash === 'home') return '';
  return rawHash;
}

const PAGE_TITLES = {
  '': 'Overview · Home',
  research: '01 // Research Pillars',
  publications: '02 // Publications & Preprints',
  projects: '03 // Open Source & Code',
  code: '03 // Open Source & Code',
  experience: '04 // Employment Details',
  employment: '04 // Employment Details',
  timeline: '04 // Employment Details',
  education: '05 // Education & Degrees',
  'academic-profile': '06 // Profile · Teaching & Technical Skills',
  profile: '06 // Profile · Teaching & Technical Skills',
  'academic-service': '07 // Academic Service & Reviewing',
  service: '07 // Academic Service & Reviewing',
  certifications: '08 // Verified Certifications',
  honors: '08 // Honors & Awards',
  lectures: '09 // YouTube Video Lectures',
  contact: '10 // Contact & References',
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(getRouteFromLocation);
  const isAdminRoute = currentRoute === 'admin';

  const [heroReady, setHeroReady] = useState(() =>
    typeof window !== 'undefined' ? shouldSkipSplash(window.location.search) : true
  );
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState('year-desc');
  const [onlyWithCode, setOnlyWithCode] = useState(false);
  const [focusedPublicationId, setFocusedPublicationId] = useState(null);
  const [activeSphereLabel, setActiveSphereLabel] = useState('');
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navigateToRoute = useCallback((routeId) => {
    const cleanRoute = (routeId || '').replace(/^#\/?/, '');
    window.location.hash = cleanRoute ? `#/${cleanRoute}` : '#/';
    setCurrentRoute(cleanRoute);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    syncDocumentSeoUrls();

    const handleRouteSync = () => {
      const nextRoute = getRouteFromLocation();
      setCurrentRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    const handleScrollTrack = () => {
      if (window.scrollY > 240) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    const handleKeyDown = (event) => {
      // Secret Admin Shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === 'A' || event.key === 'a')) {
        event.preventDefault();
        navigateToRoute('admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleRouteSync);
    window.addEventListener('popstate', handleRouteSync);
    window.addEventListener('scroll', handleScrollTrack, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleRouteSync);
      window.removeEventListener('popstate', handleRouteSync);
      window.removeEventListener('scroll', handleScrollTrack);
    };
  }, [navigateToRoute]);

  const handleSelectTopic = (nextCategory, nextQuery = '') => {
    setFocusedPublicationId(null);
    setActiveSphereLabel('');
    setCategory(nextCategory);
    setSearchQuery(nextQuery);
    setOnlyWithCode(false);
    navigateToRoute('publications');
  };

  const handleApplySphereFilter = (nextCategory, nextQuery = '', label = '') => {
    setFocusedPublicationId(null);
    setCategory(nextCategory || 'all');
    setSearchQuery(nextQuery || '');
    setOnlyWithCode(false);
    setActiveSphereLabel(label || '');
  };

  const handleExplorePaper = (publicationId) => {
    if (!publicationId) return;
    setCategory('all');
    setSearchQuery('');
    setOnlyWithCode(false);
    setActiveSphereLabel('');
    setFocusedPublicationId(publicationId);
    navigateToRoute('publications');
  };

  const handleCategoryChange = (nextCategory) => {
    setFocusedPublicationId(null);
    setActiveSphereLabel('');
    setCategory(nextCategory);
  };

  const handleSearchChange = (nextQuery) => {
    setFocusedPublicationId(null);
    setActiveSphereLabel('');
    setSearchQuery(nextQuery);
  };

  const handleToggleOnlyWithCode = () => {
    setFocusedPublicationId(null);
    setOnlyWithCode((prev) => !prev);
  };

  const handleResetFilters = () => {
    setFocusedPublicationId(null);
    setActiveSphereLabel('');
    setCategory('all');
    setSearchQuery('');
    setSortMode('year-desc');
    setOnlyWithCode(false);
  };

  if (isAdminRoute) {
    return (
      <PortfolioDataProvider>
        <AdminPage
          onGoToSite={() => navigateToRoute('')}
        />
      </PortfolioDataProvider>
    );
  }

  return (
    <PortfolioDataProvider>
      <div className="min-h-screen bg-[#0C0F14] text-[#F3F5F8] flex flex-col justify-between">
        <LoadingScreen onComplete={() => setHeroReady(true)} />

        <Navbar currentRoute={currentRoute} onNavigate={navigateToRoute} />

        {/* Subpage Breadcrumb Navigation Bar */}
        {currentRoute !== '' && (
          <div className="border-b border-white/10 bg-[#090D15]/85 backdrop-blur-xl sticky top-16 z-30 px-4 py-3 sm:px-8">
            <div className="mx-auto max-w-6xl flex items-center justify-between text-xs font-mono">
              <button
                type="button"
                onClick={() => navigateToRoute('')}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Return to Home</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 hidden sm:inline">Viewing Page:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold uppercase">
                  {PAGE_TITLES[currentRoute] || currentRoute}
                </span>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1">
          <ErrorBoundary>
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[500px] text-slate-400 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-2" />
                Loading section...
              </div>
            }>
              {/* HOME / OVERVIEW ROUTE: Hero + 6 Projects + Honors + Contact & References */}
              {currentRoute === '' && (
                <>
                  <HeroSection
                    onExplorePaper={handleExplorePaper}
                    onNavigate={navigateToRoute}
                    metricsReady={heroReady}
                  />

                  <SectionDivider />

                  <OpenSourceSection
                    variant="home"
                    initialLimit={6}
                    showAllByDefault={false}
                    onViewAll={() => navigateToRoute('projects')}
                  />

                  <SectionDivider />

                  <HonorsAndLecturesSection mode="honors-only" />

                  <SectionDivider />

                  <ContactSection />
                </>
              )}

              {/* DEDICATED RESEARCH PAGE */}
              {currentRoute === 'research' && (
                <div className="py-6 sm:py-10">
                  <ResearchSection
                    onSelectTopic={handleSelectTopic}
                    onSelectPublication={setSelectedPublication}
                  />
                </div>
              )}

              {/* DEDICATED PUBLICATIONS PAGE */}
              {currentRoute === 'publications' && (
                <div className="py-4 sm:py-6">
                  <PublicationsSection
                    category={category}
                    searchQuery={searchQuery}
                    sortMode={sortMode}
                    onlyWithCode={onlyWithCode}
                    focusedPublicationId={focusedPublicationId}
                    activeSphereLabel={activeSphereLabel}
                    onCategoryChange={handleCategoryChange}
                    onSearchChange={handleSearchChange}
                    onSortChange={setSortMode}
                    onToggleOnlyWithCode={handleToggleOnlyWithCode}
                    onClearFocusedPublication={() => setFocusedPublicationId(null)}
                    onApplySphereFilter={handleApplySphereFilter}
                    onResetFilters={handleResetFilters}
                    onSelectPublication={setSelectedPublication}
                  />
                </div>
              )}

              {/* DEDICATED CODE PAGE (All Open-Source Projects) */}
              {(currentRoute === 'projects' || currentRoute === 'code') && (
                <div className="py-6 sm:py-10">
                  <OpenSourceSection variant="page" showAllByDefault={true} />
                </div>
              )}

              {/* DEDICATED EMPLOYMENT DETAILS PAGE (Employment ONLY) */}
              {(currentRoute === 'experience' || currentRoute === 'employment' || currentRoute === 'timeline') && (
                <div className="py-6 sm:py-10">
                  <TimelineSection mode="experience" />
                </div>
              )}

              {/* DEDICATED EDUCATION PAGE (Education ONLY) */}
              {currentRoute === 'education' && (
                <div className="py-6 sm:py-10">
                  <TimelineSection mode="education" />
                </div>
              )}

              {/* DEDICATED PROFILE PAGE (Subjects Taught & Technical Skills ONLY) */}
              {(currentRoute === 'academic-profile' || currentRoute === 'profile') && (
                <div className="py-6 sm:py-10">
                  <AcademicProfileSection mode="profile" />
                </div>
              )}

              {/* DEDICATED ACADEMIC SERVICE PAGE (Academic Service ONLY) */}
              {(currentRoute === 'academic-service' || currentRoute === 'service') && (
                <div className="py-6 sm:py-10">
                  <AcademicProfileSection mode="service" />
                </div>
              )}

              {/* DEDICATED CERTIFICATIONS PAGE */}
              {currentRoute === 'certifications' && (
                <div className="py-4 sm:py-6">
                  <HonorsAndLecturesSection mode="certifications" />
                </div>
              )}

              {/* DEDICATED HONORS & AWARDS PAGE (Direct URL fallback) */}
              {currentRoute === 'honors' && (
                <div className="py-4 sm:py-6">
                  <HonorsAndLecturesSection mode="honors-only" />
                </div>
              )}

              {/* DEDICATED VIDEO LECTURES PAGE (Single Focused Page) */}
              {currentRoute === 'lectures' && (
                <div className="py-4 sm:py-6">
                  <HonorsAndLecturesSection mode="lectures" />
                </div>
              )}

              {/* DEDICATED CONTACT PAGE (Direct URL fallback) */}
              {currentRoute === 'contact' && (
                <div className="py-6 sm:py-10">
                  <ContactSection />
                </div>
              )}
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer onNavigate={navigateToRoute} />

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
    </PortfolioDataProvider>
  );
}
