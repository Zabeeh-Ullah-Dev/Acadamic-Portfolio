/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { HeroSection } from "./components/HeroSection";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { SectionDivider } from "./components/SectionDivider";
import { SubpageHeader } from "./components/SubpageHeader";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { syncDocumentSeoUrls } from "./utils/seoMeta";
import { shouldSkipSplash } from "./utils/splashScreen";
import { PortfolioDataProvider } from "./context/PortfolioContext";
import { AdminPage } from "./admin/AdminPage";

// Code-split below-the-fold sections to keep First Paint, LCP & TBT ultra-fast
const loadResearchSection = () =>
  import("./components/ResearchSection").then((m) => ({
    default: m.ResearchSection,
  }));
const loadPublicationsSection = () =>
  import("./components/PublicationsSection").then((m) => ({
    default: m.PublicationsSection,
  }));
const loadOpenSourceSection = () =>
  import("./components/OpenSourceSection").then((m) => ({
    default: m.OpenSourceSection,
  }));
const loadTimelineSection = () =>
  import("./components/TimelineSection").then((m) => ({
    default: m.TimelineSection,
  }));
const loadAcademicProfileSection = () =>
  import("./components/AcademicProfileSection").then((m) => ({
    default: m.AcademicProfileSection,
  }));
const loadHonorsAndLecturesSection = () =>
  import("./components/HonorsAndLecturesSection").then((m) => ({
    default: m.HonorsAndLecturesSection,
  }));
const loadContactSection = () =>
  import("./components/ContactSection").then((m) => ({
    default: m.ContactSection,
  }));
const loadFooter = () =>
  import("./components/Footer").then((m) => ({ default: m.Footer }));
const loadPublicationModal = () =>
  import("./components/PublicationModal").then((m) => ({
    default: m.PublicationModal,
  }));
const loadScrollToTopButton = () =>
  import("./components/ScrollToTopButton").then((m) => ({
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
  research: "research",
  publications: "publications",
  projects: "projects",
  experience: "experience",
  education: "experience",
  "academic-profile": "academic-profile",
  skills: "academic-profile",
  teaching: "academic-profile",
  service: "academic-profile",
  honors: "honors",
  lectures: "honors",
  contact: "contact",
};

const SECTION_LOADERS = {
  research: loadResearchSection,
  publications: loadPublicationsSection,
  projects: loadOpenSourceSection,
  experience: loadTimelineSection,
  "academic-profile": loadAcademicProfileSection,
  honors: loadHonorsAndLecturesSection,
  contact: loadContactSection,
  footer: loadFooter,
};

function SectionPlaceholder({ id, minHeight = "min-h-[420px]" }) {
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
  minHeight = "min-h-[560px]",
  forceMount = false,
  rootMargin = "0px 0px",
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
    if (!node || typeof IntersectionObserver === "undefined") {
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
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldMount]);

  if (shouldMount) {
    return (
      <ErrorBoundary sectionName={id}>
        <Suspense
          fallback={<SectionPlaceholder id={id} minHeight={minHeight} />}
        >
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
      style={{ contentVisibility: "auto" }}
    />
  );
}

function getRouteFromLocation() {
  if (typeof window === "undefined") return "";
  const path = window.location.pathname.replace(/\/$/, "");
  const rawHash = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");

  if (path === "/admin" || rawHash === "admin") return "admin";
  if (!rawHash || rawHash === "top" || rawHash === "home") return "";
  return rawHash;
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(getRouteFromLocation);
  const isAdminRoute = currentRoute === "admin";

  const [heroReady, setHeroReady] = useState(() =>
    typeof window !== "undefined"
      ? shouldSkipSplash(window.location.search)
      : true,
  );
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState("year-desc");
  const [onlyWithCode, setOnlyWithCode] = useState(false);
  const [focusedPublicationId, setFocusedPublicationId] = useState(null);
  const [activeSphereLabel, setActiveSphereLabel] = useState("");
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navigateToRoute = useCallback((routeId) => {
    const cleanRoute = (routeId || "").replace(/^#\/?/, "");
    window.location.hash = cleanRoute ? `#/${cleanRoute}` : "#/";
    setCurrentRoute(cleanRoute);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    syncDocumentSeoUrls();

    const handleRouteSync = () => {
      const nextRoute = getRouteFromLocation();
      setCurrentRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: "instant" });
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
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        (event.key === "A" || event.key === "a")
      ) {
        event.preventDefault();
        navigateToRoute("admin");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", handleRouteSync);
    window.addEventListener("popstate", handleRouteSync);
    window.addEventListener("scroll", handleScrollTrack, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleRouteSync);
      window.removeEventListener("popstate", handleRouteSync);
      window.removeEventListener("scroll", handleScrollTrack);
    };
  }, [navigateToRoute]);

  const handleSelectTopic = (nextCategory, nextQuery = "") => {
    setFocusedPublicationId(null);
    setActiveSphereLabel("");
    setCategory(nextCategory);
    setSearchQuery(nextQuery);
    setOnlyWithCode(false);
    navigateToRoute("publications");
  };

  const handleApplySphereFilter = (
    nextCategory,
    nextQuery = "",
    label = "",
  ) => {
    setFocusedPublicationId(null);
    setCategory(nextCategory || "all");
    setSearchQuery(nextQuery || "");
    setOnlyWithCode(false);
    setActiveSphereLabel(label || "");
  };

  const handleExplorePaper = (publicationId) => {
    if (!publicationId) return;
    setCategory("all");
    setSearchQuery("");
    setOnlyWithCode(false);
    setActiveSphereLabel("");
    setFocusedPublicationId(publicationId);
    navigateToRoute("publications");
  };

  const handleCategoryChange = (nextCategory) => {
    setFocusedPublicationId(null);
    setActiveSphereLabel("");
    setCategory(nextCategory);
  };

  const handleSearchChange = (nextQuery) => {
    setFocusedPublicationId(null);
    setActiveSphereLabel("");
    setSearchQuery(nextQuery);
  };

  const handleToggleOnlyWithCode = () => {
    setFocusedPublicationId(null);
    setOnlyWithCode((prev) => !prev);
  };

  const handleResetFilters = () => {
    setFocusedPublicationId(null);
    setActiveSphereLabel("");
    setCategory("all");
    setSearchQuery("");
    setSortMode("year-desc");
    setOnlyWithCode(false);
  };

  if (isAdminRoute) {
    return (
      <PortfolioDataProvider>
        <AdminPage onGoToSite={() => navigateToRoute("")} />
      </PortfolioDataProvider>
    );
  }

  return (
    <PortfolioDataProvider>
      <div className="min-h-screen bg-[#0C0F14] text-[#F3F5F8] flex flex-col justify-between">
        <LoadingScreen onComplete={() => setHeroReady(true)} />

        <Navbar currentRoute={currentRoute} onNavigate={navigateToRoute} />

        {/* Page-specific Subpage Header */}
        {currentRoute !== "" && (
          <SubpageHeader
            currentRoute={currentRoute}
            onBack={() => navigateToRoute("")}
          />
        )}

        <main className="flex-1">
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[500px] text-slate-400 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-2" />
                  Loading section...
                </div>
              }
            >
              {/* HOME / OVERVIEW ROUTE: Hero + 6 Projects + Honors + Contact & References */}
              {currentRoute === "" && (
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
                    onViewAll={() => navigateToRoute("projects")}
                  />

                  <SectionDivider />

                  <HonorsAndLecturesSection mode="honors-only" />

                  <SectionDivider />

                  <ContactSection />
                </>
              )}

              {/* DEDICATED RESEARCH PAGE */}
              {currentRoute === "research" && (
                <ResearchSection
                  onSelectTopic={handleSelectTopic}
                  onSelectPublication={setSelectedPublication}
                />
              )}

              {/* DEDICATED PUBLICATIONS PAGE */}
              {currentRoute === "publications" && (
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
                  onClearFocusedPublication={() =>
                    setFocusedPublicationId(null)
                  }
                  onApplySphereFilter={handleApplySphereFilter}
                  onResetFilters={handleResetFilters}
                  onSelectPublication={setSelectedPublication}
                />
              )}

              {/* DEDICATED CODE PAGE (All Open-Source Projects) */}
              {(currentRoute === "projects" || currentRoute === "code") && (
                <OpenSourceSection variant="page" showAllByDefault={true} />
              )}

              {/* DEDICATED EMPLOYMENT DETAILS PAGE (Employment ONLY) */}
              {(currentRoute === "experience" ||
                currentRoute === "employment" ||
                currentRoute === "timeline") && (
                <TimelineSection mode="experience" />
              )}

              {/* DEDICATED EDUCATION PAGE (Education ONLY) */}
              {currentRoute === "education" && (
                <TimelineSection mode="education" />
              )}

              {/* DEDICATED PROFILE PAGE (Subjects Taught & Technical Skills ONLY) */}
              {(currentRoute === "academic-profile" ||
                currentRoute === "profile") && (
                <AcademicProfileSection mode="profile" />
              )}

              {/* DEDICATED ACADEMIC SERVICE PAGE (Academic Service ONLY) */}
              {(currentRoute === "academic-service" ||
                currentRoute === "service") && (
                <AcademicProfileSection mode="service" />
              )}

              {/* DEDICATED CERTIFICATIONS PAGE */}
              {currentRoute === "certifications" && (
                <HonorsAndLecturesSection mode="certifications" />
              )}

              {/* DEDICATED HONORS & AWARDS PAGE (Direct URL fallback) */}
              {currentRoute === "honors" && (
                <HonorsAndLecturesSection mode="honors-only" />
              )}

              {/* DEDICATED VIDEO LECTURES PAGE (Single Focused Page) */}
              {currentRoute === "lectures" && (
                <HonorsAndLecturesSection mode="lectures" />
              )}

              {/* DEDICATED CONTACT PAGE (Direct URL fallback) */}
              {currentRoute === "contact" && <ContactSection />}
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
