import { useCallback, useMemo, useState } from 'react';
import { BookOpen, Terminal } from 'lucide-react';
import { SUBJECTS_TAUGHT } from '../data/portfolioData';
import {
  CURRICULUM_PATHWAYS,
  getCourseCardVisualState,
  getCourseChain,
  getCourseProfile,
  getCourseTopics,
  groupCoursesByTier,
} from '../utils/academicGame';
import { CourseCard } from './CourseCard';
import { CourseDependencyDiagram } from './CourseDependencyDiagram';
import { CourseInspector } from './CourseInspector';

const COURSE_TRACKS = [
  'All Subjects',
  'AI & Data Science',
  'Theory & Algorithms',
  'Systems & Software',
  'Programming Foundations',
];

export function TeachingSkillTree() {
  const [selectedTrack, setSelectedTrack] = useState('All Subjects');
  const [activePathwayId, setActivePathwayId] = useState(null);
  const [activeCourseId, setActiveCourseId] = useState('c-1');
  const [diagramOpen, setDiagramOpen] = useState(false);
  const [gridReturnKey, setGridReturnKey] = useState(0);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const activePathway = useMemo(
    () => CURRICULUM_PATHWAYS.find((p) => p.id === activePathwayId) || null,
    [activePathwayId]
  );

  const visibleCourses = useMemo(
    () =>
      selectedTrack === 'All Subjects'
        ? SUBJECTS_TAUGHT.courses
        : SUBJECTS_TAUGHT.courses.filter((c) => c.track === selectedTrack),
    [selectedTrack]
  );

  const tierGroups = useMemo(
    () => groupCoursesByTier(visibleCourses),
    [visibleCourses]
  );

  const trackCounts = useMemo(() => {
    const counts = { 'All Subjects': SUBJECTS_TAUGHT.courses.length };
    for (const course of SUBJECTS_TAUGHT.courses) {
      counts[course.track] = (counts[course.track] || 0) + 1;
    }
    return counts;
  }, []);

  const activeProfile = useMemo(
    () => getCourseProfile(activeCourseId),
    [activeCourseId]
  );

  const activeTopics = useMemo(
    () => getCourseTopics(activeCourseId),
    [activeCourseId]
  );

  const activeChain = useMemo(
    () => getCourseChain(activeCourseId),
    [activeCourseId]
  );

  const handleSelectCourse = useCallback(
    (courseId, { keepPathway = false, openDrawerOnMobile = false } = {}) => {
      setActiveCourseId(courseId);
      if (
        !keepPathway &&
        activePathway &&
        !activePathway.courseIds.includes(courseId)
      ) {
        setActivePathwayId(null);
      }
      if (
        openDrawerOnMobile &&
        typeof window !== 'undefined' &&
        window.innerWidth < 1024
      ) {
        setMobileDrawerOpen(true);
      }
    },
    [activePathway]
  );

  const handleCardSelect = useCallback(
    (courseId, options = {}) => {
      handleSelectCourse(courseId, { ...options, openDrawerOnMobile: false });
      setMobileDrawerOpen(false);
      setDiagramOpen(true);
    },
    [handleSelectCourse]
  );

  const handleDiagramSelectCourse = useCallback(
    (courseId) => {
      handleSelectCourse(courseId, { keepPathway: false, openDrawerOnMobile: false });
    },
    [handleSelectCourse]
  );

  const handleResetDiagram = useCallback(() => {
    setDiagramOpen(false);
    setGridReturnKey((prev) => prev + 1);
  }, []);

  const handleTrackChange = (track) => {
    setSelectedTrack(track);
    setActivePathwayId(null);
    setDiagramOpen(false);
    const pool =
      track === 'All Subjects'
        ? SUBJECTS_TAUGHT.courses
        : SUBJECTS_TAUGHT.courses.filter((c) => c.track === track);
    if (pool.length > 0 && !pool.some((c) => c.id === activeCourseId)) {
      setActiveCourseId(pool[0].id);
    }
  };

  const handleSelectPathway = useCallback(
    (pathway) => {
      if (activePathwayId === pathway.id) {
        setActivePathwayId(null);
        return;
      }
      setActivePathwayId(pathway.id);
      setSelectedTrack('All Subjects');
      setDiagramOpen(false);
      const capstoneId = pathway.courseIds[pathway.courseIds.length - 1];
      setActiveCourseId(capstoneId);
    },
    [activePathwayId]
  );

  const handleClearPathway = useCallback(() => {
    setActivePathwayId(null);
  }, []);

  const handleCloseMobileDrawer = useCallback(() => {
    setMobileDrawerOpen(false);
  }, []);

  const activeTierNum = activeProfile.difficulty ?? 2;

  return (
    <section
      id="subjects-taught"
      aria-labelledby="subjects-taught-heading"
      className="relative scroll-mt-24"
    >
      {/* Editorial Section Header */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#60A5FA]">
            University Teaching &amp; Curriculum
          </p>
          <h2
            id="subjects-taught-heading"
            className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Subjects Taught &amp; Course Progression
          </h2>
          <p className="mt-2.5 text-base leading-relaxed text-[#B8C2D0]">
            16 undergraduate and graduate computer science courses taught across
            foundational computing, core algorithms, systems engineering, and
            modern AI.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-[#94A3B8]">
          <span className="inline-flex items-center gap-1.5 text-[#CBD5E1]">
            <Terminal className="h-3.5 w-3.5 text-[#60A5FA]" aria-hidden="true" />
            <span>{SUBJECTS_TAUGHT.primaryLanguage}</span>
          </span>
          <span aria-hidden="true" className="text-white/20">
            ·
          </span>
          <span>{SUBJECTS_TAUGHT.primaryTool}</span>
          <span aria-hidden="true" className="text-white/20">
            ·
          </span>
          <span className="tabular-nums text-[#93C5FD]">
            {SUBJECTS_TAUGHT.courses.length} Courses
          </span>
        </div>
      </div>

      {/* Domain Filter Navigation + Study Track Bar */}
      <div className="mt-7 space-y-3 border-b border-white/10 pb-4">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
          <nav
            role="tablist"
            aria-label="Filter subjects taught by curriculum track"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#0B0F17]/90 p-1"
          >
            {COURSE_TRACKS.map((track) => {
              const count = trackCounts[track] || 0;
              const active = selectedTrack === track;
              return (
                <button
                  key={track}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleTrackChange(track)}
                  className={
                    active
                      ? 'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors'
                      : 'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-[#94A3B8] transition-colors hover:bg-white/[0.04] hover:text-[#F1F5F9]'
                  }
                >
                  <span>{track === 'All Subjects' ? 'All' : track}</span>
                  <span className="font-mono text-[11px] opacity-80 tabular-nums">
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Quiet Relation Legend */}
          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-[#8B95A5]">
            <span className="text-[#93C5FD]">Active</span>
            <span aria-hidden="true" className="text-white/20">
              ·
            </span>
            <span className="text-amber-300/90">Prerequisite</span>
            <span aria-hidden="true" className="text-white/20">
              ·
            </span>
            <span className="text-emerald-300/90">Unlocks Next</span>
          </div>
        </div>

        {/* Inline Study Track Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-[#8B95A5]">
              Study Track:
            </span>
            {CURRICULUM_PATHWAYS.map((pathway) => {
              const selected = activePathwayId === pathway.id;
              return (
                <button
                  key={pathway.id}
                  type="button"
                  data-testid={`pathway-btn-${pathway.id}`}
                  aria-pressed={selected}
                  onClick={() => handleSelectPathway(pathway)}
                  className={
                    selected
                      ? 'rounded-lg border border-[#60A5FA]/70 bg-[#2563EB]/25 px-2.5 py-1 text-xs font-semibold text-white whitespace-nowrap transition-colors'
                      : 'rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-[#94A3B8] transition-colors hover:border-[#3B82F6]/50 hover:text-white whitespace-nowrap'
                  }
                >
                  {pathway.label}
                </button>
              );
            })}
            {activePathway && (
              <button
                type="button"
                onClick={handleClearPathway}
                className="font-mono text-[11px] text-[#60A5FA] transition-colors hover:text-[#93C5FD]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Mobile Quick Syllabus Trigger (only in Grid View) */}
          {!diagramOpen && (
            <button
              type="button"
              data-testid="open-course-drawer-mobile"
              onClick={() => setMobileDrawerOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-[#60A5FA]/40 bg-[#172554]/45 px-3 py-1.5 font-mono text-xs font-medium text-[#93C5FD] transition-colors hover:border-[#60A5FA]/75 hover:text-white lg:hidden"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Inspect {activeProfile.code}</span>
            </button>
          )}
        </div>
      </div>

      {diagramOpen ? (
        <CourseDependencyDiagram
          activeProfile={activeProfile}
          activeTierNum={activeTierNum}
          activeTopics={activeTopics}
          activeChain={activeChain}
          onSelectCourse={handleDiagramSelectCourse}
          onReset={handleResetDiagram}
        />
      ) : (
        /* Asymmetric Split Layout: 4-Tier Progression Grid (Left 7) + Sticky Syllabus Inspector (Right 5) */
        <div
          key={`grid-${gridReturnKey}`}
          className={`mt-7 grid grid-cols-1 items-start gap-7 lg:grid-cols-12 ${
            gridReturnKey > 0 ? 'animate-grid-return' : ''
          }`}
        >
          {/* Left 7 Cols: Tier-Grouped Academic Progression (L1 Foundation -> L4 Specialization) */}
          <div
            data-testid="subjects-taught-grid"
            className="relative space-y-6 lg:col-span-7"
          >
          {tierGroups.map((group, groupIndex) => {
            const isLastGroup = groupIndex === tierGroups.length - 1;
            const hasActiveInTier = group.courses.some(
              (c) => c.id === activeCourseId
            );

            return (
              <div
                key={group.code}
                data-testid={`curriculum-tier-${group.code}`}
                className="relative pl-6 sm:pl-7"
              >
                {/* Architectural Vertical Progression Rail */}
                {!isLastGroup && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-5 bottom-[-24px] left-[9px] w-px bg-gradient-to-b from-[#3B82F6]/45 via-white/12 to-white/10"
                  />
                )}

                {/* Tier Node Marker */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-1.5 left-0 flex h-[19px] w-[19px] items-center justify-center rounded-full border transition-colors ${
                    hasActiveInTier
                      ? 'border-[#60A5FA] bg-[#2563EB]/25 shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                      : 'border-white/20 bg-[#0D121B]'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      hasActiveInTier ? 'bg-[#93C5FD]' : 'bg-[#64748B]'
                    }`}
                  />
                </span>

                {/* Tier Heading Row */}
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        hasActiveInTier ? 'text-[#93C5FD]' : 'text-[#60A5FA]'
                      }`}
                    >
                      {group.code}
                    </span>
                    <h3 className="text-sm font-semibold tracking-tight text-[#F3F5F8]">
                      {group.label}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-[#64748B] tabular-nums">
                    {group.courses.length}{' '}
                    {group.courses.length === 1 ? 'course' : 'courses'}
                  </span>
                </div>

                {/* Streamlined Tier Course Cards */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {group.courses.map((course) => {
                    const visualState = getCourseCardVisualState(
                      course.id,
                      activeCourseId,
                      activePathway
                    );

                    return (
                      <CourseCard
                        key={course.id}
                        course={course}
                        relation={visualState.relation}
                        inPathway={visualState.inPathway}
                        isDimmed={visualState.isDimmed}
                        onSelect={handleCardSelect}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

          {/* Right 5 Cols: Sticky Desktop Inspector + Mobile Slide-Up Drawer */}
          <CourseInspector
            activeProfile={activeProfile}
            activeTierNum={activeTierNum}
            activeTopics={activeTopics}
            activeChain={activeChain}
            mobileDrawerOpen={mobileDrawerOpen}
            onCloseMobileDrawer={handleCloseMobileDrawer}
            onSelectCourse={handleCardSelect}
          />
        </div>
      )}
    </section>
  );
}
