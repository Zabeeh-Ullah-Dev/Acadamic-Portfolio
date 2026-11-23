import { useEffect, useState } from 'react';
import { ArrowUpRight, Briefcase, GraduationCap } from 'lucide-react';
import { EDUCATION_TIMELINE as DEFAULT_EDUCATION, EXPERIENCE_TIMELINE as DEFAULT_EXPERIENCE } from '../data/portfolioData';
import { usePortfolioData } from '../context/PortfolioContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionDivider } from './SectionDivider';

function TimelineColumn({
  heading,
  variant,
  entries,
  revealed,
  activeEntryId,
  onSelectEntry,
}) {
  const HeaderIcon = variant === 'experience' ? Briefcase : GraduationCap;
  const subcode = variant === 'experience' ? '03A // EXPERIENCE' : '03B // FORMAL EDUCATION';

  return (
    <div>
      <div className="relative flex items-center justify-between border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#3B82F6]/35 bg-[#172554]/50 text-[#60A5FA]">
            <HeaderIcon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <span className="font-mono text-[10px] font-medium tracking-wider text-[#60A5FA]/80 uppercase">
              {subcode}
            </span>
            <h3 className="text-xl font-semibold text-[#F3F5F8]">{heading}</h3>
          </div>
        </div>
        <span className="font-mono text-xs text-[#60A5FA] tabular-nums">
          {entries.length} milestones
        </span>

        {/* Subtle animated gradient underline below column header */}
        <div className="pointer-events-none absolute -bottom-px inset-x-0 h-px overflow-hidden">
          <span className="animate-gradient-beam absolute top-0 h-px w-28 bg-gradient-to-r from-transparent via-[#93C5FD]/80 to-transparent" />
        </div>
      </div>

      <div className="relative mt-8 space-y-5 pl-8">
        {/* Vertical Fiber-Optic Trajectory Spine + Traveling Light Signal */}
        <div
          aria-hidden="true"
          className="absolute bottom-3 left-[7px] top-3 w-px overflow-hidden bg-gradient-to-b from-[#3B82F6]/75 via-white/15 to-transparent"
        >
          <span className="animate-spine-signal absolute left-0 h-14 w-px bg-gradient-to-b from-transparent via-[#93C5FD] to-transparent" />
        </div>

        {entries.map((entry, idx) => {
          const isActive = activeEntryId === entry.id;
          return (
            <article
              key={entry.id}
              onMouseEnter={() => onSelectEntry(entry.id)}
              onMouseLeave={() => onSelectEntry(null)}
              style={{ transitionDelay: revealed ? `${idx * 75}ms` : '0ms' }}
              className={`glass-panel group relative rounded-2xl border p-5 transition-all duration-300 ${
                revealed
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              } ${
                isActive
                  ? 'border-[#3B82F6]/65 bg-gradient-to-br from-[#172554]/35 via-[#131924] to-[#0D1119] shadow-[inset_0_1px_0_rgba(147,197,253,0.22),0_16px_34px_-16px_rgba(37,99,235,0.45)]'
                  : 'border-white/10 hover:border-[#3B82F6]/45'
              }`}
            >
              {/* Distinct Spine Geometric Node: Diamond for Experience, Dual-Ring Orbital for Education */}
              {variant === 'experience' ? (
                <span
                  aria-hidden="true"
                  className={`absolute -left-[33px] top-6 h-3.5 w-3.5 rotate-45 border-2 bg-[#0C0F14] transition-all duration-200 ${
                    isActive || entry.isCurrent
                      ? 'scale-110 border-[#93C5FD] shadow-[0_0_14px_rgba(96,165,250,0.85)]'
                      : 'border-[#3B82F6]/60 group-hover:border-[#60A5FA]'
                  }`}
                />
              ) : (
                <span
                  aria-hidden="true"
                  className={`absolute -left-[34px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-[#0C0F14] transition-all duration-200 ${
                    isActive || entry.isCurrent
                      ? 'scale-110 border-[#93C5FD] shadow-[0_0_14px_rgba(96,165,250,0.85)]'
                      : 'border-[#3B82F6]/60 group-hover:border-[#60A5FA]'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
                </span>
              )}

              {/* Subtle 2050 optical top-right & bottom-left bracket accents */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r border-t transition-opacity duration-200 ${
                  isActive ? 'border-[#93C5FD] opacity-90' : 'border-[#60A5FA] opacity-0 group-hover:opacity-60'
                }`}
              />

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-[#60A5FA] tabular-nums">
                <span>{entry.period}</span>
                <span aria-hidden="true" className="text-white/25">·</span>
                <span className="text-[#8B95A5]">{entry.location}</span>
                {entry.degreeNote && (
                  <>
                    <span aria-hidden="true" className="text-white/25">·</span>
                    <span className="text-[#93C5FD]">{entry.degreeNote}</span>
                  </>
                )}
              </div>

              <h4 className="mt-1.5 text-lg font-semibold text-[#F3F5F8] transition-colors group-hover:text-white">
                {entry.roleOrDegree || entry.role || entry.degree}
              </h4>

              <p className="mt-0.5 text-sm font-medium text-[#8B95A5]">
                {entry.institutionUrl ? (
                  <a
                    href={entry.institutionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C4CCD6] transition-colors hover:text-[#60A5FA] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                  >
                    <span>{entry.institution}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-75" />
                  </a>
                ) : (
                  entry.institution
                )}
              </p>

              <p className="mt-2.5 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
                {entry.summary || entry.description}
              </p>

              {Array.isArray(entry.details) && entry.details.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-xs text-[#8B95A5]">
                  {entry.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#3B82F6]"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {entry.supervision && (
                <div className="mt-3.5 space-y-2.5 rounded-xl border border-white/8 bg-[#090D14]/85 p-3.5 text-xs">
                  {Array.isArray(entry.supervision.ms) && entry.supervision.ms.length > 0 && (
                    <div>
                      <p className="font-mono text-[11px] font-semibold tracking-wider text-[#60A5FA] uppercase">
                        MS Co-Supervision:
                      </p>
                      <ul className="mt-1.5 space-y-1 pl-3.5 text-[#C4CCD6]">
                        {entry.supervision.ms.map((item) => (
                          <li key={item} className="list-disc list-outside">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {Array.isArray(entry.supervision.bs) && entry.supervision.bs.length > 0 && (
                    <div className="mt-2.5 border-t border-white/8 pt-2.5">
                      <p className="font-mono text-[11px] font-semibold tracking-wider text-[#60A5FA] uppercase">
                        BS Supervision:
                      </p>
                      <ul className="mt-1.5 space-y-1 pl-3.5 text-[#C4CCD6]">
                        {entry.supervision.bs.map((item) => (
                          <li key={item} className="list-disc list-outside">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {Array.isArray(entry.skills) && entry.skills.length > 0 && (
                <div className="mt-3.5 border-t border-white/10 pt-3 text-xs leading-relaxed">
                  <span className="font-medium text-[#94A3B8]">Focus: </span>
                  <span className="font-mono text-[#60A5FA]">
                    {entry.skills.join(' · ')}
                  </span>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function TimelineSection({ mode = 'all' }) {
  const portfolioData = usePortfolioData();
  const EXPERIENCE_TIMELINE = portfolioData?.experience || DEFAULT_EXPERIENCE;
  const EDUCATION_TIMELINE = portfolioData?.education || DEFAULT_EDUCATION;

  const [sectionRef, revealed] = useScrollReveal({ threshold: 0.06 });
  const [focusView, setFocusView] = useState(() => {
    if (mode === 'experience' || mode === 'employment') return 'experience';
    if (mode === 'education') return 'education';
    return 'all';
  });
  const [activeEntryId, setActiveEntryId] = useState(null);

  // Sync tab selection with external hash navigation if mode is 'all'
  useEffect(() => {
    if (mode !== 'all') {
      if (mode === 'experience' || mode === 'employment') setFocusView('experience');
      if (mode === 'education') setFocusView('education');
      return;
    }

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#education') {
        setFocusView('education');
      } else if (hash === '#experience' || hash === '#employment') {
        setFocusView('experience');
      } else if (hash === '#timeline') {
        setFocusView('all');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [mode]);

  const handleTabClick = (tabId) => {
    setFocusView(tabId);
    if (tabId === 'experience') {
      window.history.replaceState(null, '', '#experience');
    } else if (tabId === 'education') {
      window.history.replaceState(null, '', '#education');
    } else {
      window.history.replaceState(null, '', '#timeline');
    }
  };

  const isStrictExperience = mode === 'experience' || mode === 'employment' || focusView === 'experience';
  const isStrictEducation = mode === 'education' || focusView === 'education';

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="section-defer relative overflow-hidden bg-[#0C0F14] py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="architect-grid pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(ellipse_at_50%_0%,black_10%,transparent_75%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col justify-between gap-6 transition-all duration-500 md:flex-row md:items-end ${
            revealed ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium tracking-[0.04em] text-[#60A5FA]">
              {mode === 'experience' || mode === 'employment'
                ? '04 // EMPLOYMENT DETAILS'
                : mode === 'education'
                ? '05 // FORMAL EDUCATION'
                : '03 // ACADEMIC TRAJECTORY'}
            </p>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl">
              {mode === 'experience' || mode === 'employment'
                ? 'Employment Details & Research Roles'
                : mode === 'education'
                ? 'Education & Academic Pedigree'
                : 'Education & Research Experience'}
            </h2>
            <p className="mt-3 text-base leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
              {mode === 'experience' || mode === 'employment'
                ? 'Academic faculty appointments, research fellowships, and university teaching trajectory across AI and Computer Science.'
                : mode === 'education'
                ? 'Doctoral AI studies at Universiti Brunei Darussalam alongside Master of Science and Bachelor of Science credentials.'
                : 'A connected progression from mathematical graph theory and computer science lectureship to international AI and NLP fellowships.'}
            </p>
          </div>

          {mode === 'all' && (
            <div
              role="tablist"
              aria-label="Filter trajectory view"
              className="inline-flex flex-wrap items-center gap-1.5 self-start rounded-xl border border-white/12 bg-[#0C0F14]/80 p-1 md:self-end"
            >
              {[
                { id: 'all', label: 'Full Trajectory' },
                { id: 'experience', label: 'Employment History' },
                { id: 'education', label: 'Education' },
              ].map((tab) => {
                const active = focusView === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleTabClick(tab.id)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#60A5FA] ${
                      active
                        ? 'bg-[#2563EB] text-white shadow-md shadow-blue-950/60 ring-1 ring-[#60A5FA]/40'
                        : 'text-[#94A3B8] hover:bg-white/[0.04] hover:text-[#F3F5F8]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div
          className={`relative mt-12 grid grid-cols-1 gap-12 transition-all duration-300 ${
            focusView === 'all' && mode === 'all'
              ? 'lg:grid-cols-[1fr_auto_1fr] lg:gap-8 items-stretch'
              : 'lg:grid-cols-1 max-w-4xl mx-auto'
          }`}
        >
          {((focusView === 'all' && mode === 'all') || isStrictExperience) && (
            <div
              id="experience"
              className={`scroll-mt-24 ${
                focusView === 'experience' ? 'animate-panel-enter' : ''
              }`}
            >
              <TimelineColumn
                heading="Employment & Research Experience"
                variant="experience"
                entries={EXPERIENCE_TIMELINE}
                revealed={revealed}
                activeEntryId={activeEntryId}
                onSelectEntry={setActiveEntryId}
              />
            </div>
          )}

          {focusView === 'all' && mode === 'all' && (
            <>
              {/* Subtle animated vertical gradient line for desktop (2050 design aesthetic) */}
              <div className="hidden lg:flex items-center justify-center self-stretch">
                <SectionDivider variant="vertical" className="h-full py-6" />
              </div>

              {/* Subtle animated horizontal gradient line for mobile/stacked view */}
              <div className="block lg:hidden my-2">
                <SectionDivider />
              </div>
            </>
          )}

          {((focusView === 'all' && mode === 'all') || isStrictEducation) && (
            <div
              id="education"
              className={`scroll-mt-24 ${
                focusView === 'education' ? 'animate-panel-enter' : ''
              }`}
            >
              <TimelineColumn
                heading="Education"
                variant="education"
                entries={EDUCATION_TIMELINE}
                revealed={revealed}
                activeEntryId={activeEntryId}
                onSelectEntry={setActiveEntryId}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

