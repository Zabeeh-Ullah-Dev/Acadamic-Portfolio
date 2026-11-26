import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Layers, X } from 'lucide-react';

function InspectorBody({
  activeProfile,
  activeTierNum,
  activeTopics,
  activeChain,
  onSelectCourse,
  onCloseMobile,
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-2 font-mono text-xs text-[#60A5FA]">
        <span>
          {activeProfile.code}
          <span aria-hidden="true" className="mx-1.5 text-white/25">
            ·
          </span>
          <span className="text-[#93C5FD]">{activeProfile.level}</span>
        </span>
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[#60A5FA]/80" aria-hidden="true" />
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close course syllabus drawer"
              data-testid="close-course-drawer"
              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#CBD5E1] transition-colors hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#F8FAFC]">
        {activeProfile.name}
      </h3>

      <p className="mt-1 text-xs font-medium text-[#8B95A5]">
        {activeProfile.track} · Tier {activeTierNum} of 4
      </p>

      <p className="mt-4 text-sm leading-relaxed text-[#CBD5E1]">
        {activeProfile.focus}
      </p>

      {/* Core Syllabus Topics */}
      {activeTopics.length > 0 && (
        <div className="mt-5 border-t border-white/10 pt-4">
          <p className="font-mono text-[11px] font-medium text-[#8B95A5]">
            Core Syllabus Topics
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-[#E2E8F0]">
            {activeTopics.join(' · ')}
          </p>
        </div>
      )}

      {/* Lab Environment & Depth Summary */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 font-mono text-xs">
        <span className="inline-flex items-center gap-1.5 text-[#94A3B8]">
          <Layers className="h-3.5 w-3.5 text-[#60A5FA]" aria-hidden="true" />
          <span>Lab:</span>
          <strong className="font-semibold text-[#F1F5F9]">
            {activeProfile.tool}
          </strong>
        </span>
        <span className="text-[#8B95A5] tabular-nums">
          {activeChain.ancestors.length} prereqs · {activeChain.descendants.length} follow-ons
        </span>
      </div>

      {/* Prerequisite & Next-Course Navigation */}
      <div className="mt-5 grid grid-cols-1 gap-4 border-t border-white/10 pt-4 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[11px] font-medium text-amber-300/90">
            Prerequisites
          </p>
          {activeProfile.prerequisites.length > 0 ? (
            <div className="mt-2 flex flex-col items-start gap-1.5">
              {activeProfile.prerequisites.map((pre) => (
                <button
                  key={pre.id}
                  type="button"
                  onClick={() => onSelectCourse(pre.id)}
                  className="group inline-flex items-center gap-1.5 text-left text-xs font-medium text-[#E2E8F0] transition-colors hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-amber-300"
                >
                  <ArrowLeft
                    className="h-3.5 w-3.5 shrink-0 text-amber-300/80 transition-transform duration-200 group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                  <span>{pre.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-1.5 text-xs text-[#64748B]">
              Entry foundation course
            </p>
          )}
        </div>

        <div>
          <p className="font-mono text-[11px] font-medium text-emerald-300/90">
            Unlocks Next
          </p>
          {activeProfile.unlocks.length > 0 ? (
            <div className="mt-2 flex flex-col items-start gap-1.5">
              {activeProfile.unlocks.map((nextCourse) => (
                <button
                  key={nextCourse.id}
                  type="button"
                  onClick={() => onSelectCourse(nextCourse.id)}
                  className="group inline-flex items-center gap-1.5 text-left text-xs font-medium text-[#E2E8F0] transition-colors hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-emerald-300"
                >
                  <span>{nextCourse.name}</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 text-emerald-300/80 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-1.5 text-xs text-[#64748B]">
              Advanced capstone
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export function CourseInspector({
  activeProfile,
  activeTierNum,
  activeTopics,
  activeChain,
  mobileDrawerOpen,
  onCloseMobileDrawer,
  onSelectCourse,
}) {
  useEffect(() => {
    if (!mobileDrawerOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseMobileDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileDrawerOpen, onCloseMobileDrawer]);

  return (
    <>
      {/* Desktop Sticky Syllabus Inspector */}
      <aside
        key={activeProfile.id}
        data-testid="teaching-course-inspector"
        aria-label="Selected course syllabus inspector"
        className="animate-inspector-enter relative hidden overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-[#131B2B]/90 via-[#0F1522]/95 to-[#0B0F18] p-6 shadow-[0_24px_60px_-28px_rgba(37,99,235,0.45)] lg:sticky lg:top-24 lg:col-span-5 lg:block"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/70 to-transparent"
        />

        <InspectorBody
          activeProfile={activeProfile}
          activeTierNum={activeTierNum}
          activeTopics={activeTopics}
          activeChain={activeChain}
          onSelectCourse={onSelectCourse}
        />
      </aside>

      {/* Mobile Slide-Up Drawer / Modal */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProfile.name} syllabus details`}
          data-testid="teaching-course-drawer"
          className="fixed inset-0 z-[60] flex items-end justify-center lg:hidden"
        >
          <button
            type="button"
            aria-label="Dismiss course details"
            onClick={onCloseMobileDrawer}
            className="absolute inset-0 bg-[#060911]/75 backdrop-blur-sm transition-opacity duration-200"
          />

          <aside className="animate-inspector-enter relative z-10 max-h-[84svh] w-full overflow-y-auto rounded-t-2xl border-t border-white/15 bg-gradient-to-b from-[#131B2B] via-[#0F1522] to-[#0B0F18] px-5 pt-3 pb-7 shadow-[0_-24px_60px_-16px_rgba(0,0,0,0.85)]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/75 to-transparent"
            />
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" aria-hidden="true" />

            <InspectorBody
              activeProfile={activeProfile}
              activeTierNum={activeTierNum}
              activeTopics={activeTopics}
              activeChain={activeChain}
              onSelectCourse={onSelectCourse}
              onCloseMobile={onCloseMobileDrawer}
            />
          </aside>
        </div>
      )}
    </>
  );
}
