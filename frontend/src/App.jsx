/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  GraduationCap,
  Layers,
  Mail,
  Network,
  Sparkles,
  Video,
} from 'lucide-react';
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
const loadHonorsSection = () =>
  import('./components/HonorsSection').then((m) => ({
    default: m.HonorsSection,
  }));
const loadLecturesSection = () =>
  import('./components/LecturesSection').then((m) => ({
    default: m.LecturesSection,
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
const HonorsSection = lazy(loadHonorsSection);
const LecturesSection = lazy(loadLecturesSection);
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
  lectures: 'lectures',
  contact: 'contact',
};

const SECTION_LOADERS = {
  research: loadResearchSection,
  publications: loadPublicationsSection,
  projects: loadOpenSourceSection,
  experience: loadTimelineSection,
  'academic-profile': loadAcademicProfileSection,
  honors: loadHonorsSection,
  lectures: loadLecturesSection,
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
  'academic-profile': '06 // Academic Profile & Teaching',
  profile: '06 // Academic Profile & Teaching',
  honors: '07 // Honors, Awards & Certifications',
  lectures: '08 // YouTube Video Lectures',
  contact: '09 // Contact & Collaboration',
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
    setCategory(nextCategory);
    setSearchQuery(nextQuery);
    setOnlyWithCode(false);
    navigateToRoute('publications');
  };

  const handleExplorePaper = (publicationId) => {
    if (!publicationId) return;
    setCategory('all');
    setSearchQuery('');
    setOnlyWithCode(false);
    setFocusedPublicationId(publicationId);
    navigateToRoute('publications');
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
              {/* HOME / OVERVIEW ROUTE */}
              {currentRoute === '' && (
                <>
                  <HeroSection
                    onExplorePaper={handleExplorePaper}
                    onNavigate={navigateToRoute}
                    metricsReady={heroReady}
                  />

                  {/* Curated Interactive Directory Cards */}
                  <section className="relative overflow-hidden py-16 sm:py-20 bg-[#0A0E17]/95 border-t border-white/10">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#60A5FA]">
                            RESEARCH PORTFOLIO DIRECTORY
                          </p>
                          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Explore Dedicated Sections
                          </h2>
                          <p className="mt-2 text-sm text-[#94A3B8]">
                            Select any dedicated section below or use the top navigation bar to open its page.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                          {
                            id: 'research',
                            title: 'Research Pillars',
                            desc: 'Knowledge graph completion, spectral complex networks, transformers & LLM alignment.',
                            icon: Network,
                            color: 'text-cyan-400 border-cyan-500/30 group-hover:border-cyan-400/60',
                            badge: '3 Pillars',
                          },
                          {
                            id: 'publications',
                            title: 'Publications Catalog',
                            desc: '32 peer-reviewed scientific articles, conference proceedings, preprints & bibtex.',
                            icon: BookOpen,
                            color: 'text-blue-400 border-blue-500/30 group-hover:border-blue-400/60',
                            badge: '32 Papers',
                          },
                          {
                            id: 'projects',
                            title: 'Open Source & Code',
                            desc: 'PyTorch / TF benchmark repositories, knowledge graph embeddings & algorithmic code.',
                            icon: Code2,
                            color: 'text-emerald-400 border-emerald-500/30 group-hover:border-emerald-400/60',
                            badge: 'Repositories',
                          },
                          {
                            id: 'experience',
                            title: 'Employment Details',
                            desc: 'DAAD AInet NLP fellowship, university CS faculty appointments & research roles.',
                            icon: Briefcase,
                            color: 'text-violet-400 border-violet-500/30 group-hover:border-violet-400/60',
                            badge: 'Timeline',
                          },
                          {
                            id: 'education',
                            title: 'Education & Degrees',
                            desc: 'PhD in Artificial Intelligence at UBD, MS & BS in Computer Science.',
                            icon: GraduationCap,
                            color: 'text-indigo-400 border-indigo-500/30 group-hover:border-indigo-400/60',
                            badge: 'Degrees',
                          },
                          {
                            id: 'academic-profile',
                            title: 'Academic Profile & Teaching',
                            desc: 'Syllabus topics, academic service, reviewing, and technical skill graph.',
                            icon: Layers,
                            color: 'text-sky-400 border-sky-500/30 group-hover:border-sky-400/60',
                            badge: 'Pedagogy',
                          },
                          {
                            id: 'honors',
                            title: 'Honors & Certifications',
                            desc: 'DAAD AInet fellowship award, university merits & verified credentials.',
                            icon: Award,
                            color: 'text-amber-400 border-amber-500/30 group-hover:border-amber-400/60',
                            badge: 'Credentials',
                          },
                          {
                            id: 'lectures',
                            title: 'Video Lectures',
                            desc: '219+ university-level lectures on YouTube across Graph Theory & ML computing.',
                            icon: Video,
                            color: 'text-rose-400 border-rose-500/30 group-hover:border-rose-400/60',
                            badge: 'YouTube',
                          },
                          {
                            id: 'contact',
                            title: 'Contact & Collaboration',
                            desc: 'Academic inquiries, joint research collaborations, speaker invitations & CV request.',
                            icon: Mail,
                            color: 'text-cyan-400 border-cyan-500/30 group-hover:border-cyan-400/60',
                            badge: 'Get in Touch',
                          },
                        ].map((card) => {
                          const CardIcon = card.icon;
                          return (
                            <button
                              key={card.id}
                              type="button"
                              onClick={() => navigateToRoute(card.id)}
                              className={`group relative text-left p-6 rounded-2xl bg-[#0D121D]/80 border transition-all duration-200 hover:-translate-y-1 hover:bg-[#121927] hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between ${card.color}`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-4">
                                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                                    <CardIcon className="w-5 h-5" />
                                  </div>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-slate-300">
                                    {card.badge}
                                  </span>
                                </div>
                                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                                  {card.title}
                                </h3>
                                <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">
                                  {card.desc}
                                </p>
                              </div>
                              <div className="mt-5 flex items-center gap-1.5 text-xs font-mono text-cyan-400 group-hover:underline">
                                <span>Open Section Page</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </section>

                  {/* Home Page Featured Sections: Projects, Honors, Contact & References */}
                  <div className="border-t border-white/10">
                    <OpenSourceSection />
                  </div>

                  <div className="border-t border-white/10">
                    <HonorsSection />
                  </div>

                  <div className="border-t border-white/10">
                    <ContactSection />
                  </div>
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
                <div className="py-6 sm:py-10">
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
                </div>
              )}

              {/* DEDICATED OPEN SOURCE & PROJECTS PAGE */}
              {(currentRoute === 'projects' || currentRoute === 'code') && (
                <div className="py-6 sm:py-10">
                  <OpenSourceSection />
                </div>
              )}

              {/* DEDICATED EMPLOYMENT DETAILS PAGE */}
              {(currentRoute === 'experience' || currentRoute === 'employment' || currentRoute === 'timeline') && (
                <div className="py-6 sm:py-10">
                  <TimelineSection />
                </div>
              )}

              {/* DEDICATED EDUCATION PAGE */}
              {currentRoute === 'education' && (
                <div className="py-6 sm:py-10">
                  <TimelineSection />
                </div>
              )}

              {/* DEDICATED ACADEMIC PROFILE & TEACHING PAGE */}
              {(currentRoute === 'academic-profile' || currentRoute === 'profile') && (
                <div className="py-6 sm:py-10">
                  <AcademicProfileSection />
                </div>
              )}

              {/* DEDICATED HONORS & AWARDS PAGE */}
              {currentRoute === 'honors' && (
                <div className="py-6 sm:py-10">
                  <HonorsSection />
                </div>
              )}

              {/* DEDICATED VIDEO LECTURES PAGE */}
              {currentRoute === 'lectures' && (
                <div className="py-6 sm:py-10">
                  <LecturesSection />
                </div>
              )}

              {/* DEDICATED CONTACT PAGE */}
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
