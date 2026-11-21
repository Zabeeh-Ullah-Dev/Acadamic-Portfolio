import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BookMarked,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { ACADEMIC_SERVICE } from '../data/portfolioData';
import {
  ACADEMIC_SERVICE_VENUES,
  filterServiceVenues,
} from '../utils/academicGame';

const VENUE_FILTERS = [
  { id: 'all', label: 'All Venues', count: ACADEMIC_SERVICE_VENUES.length },
  {
    id: 'conference',
    label: 'Conferences',
    count: ACADEMIC_SERVICE.conferences.length,
  },
  { id: 'journal', label: 'Journals', count: ACADEMIC_SERVICE.journals.length },
];

const PUBLISHER_VISUALS = {
  'PMLR / ICML': {
    monogram: 'ML',
    accentText: 'text-[#93C5FD]',
    topLine: 'via-[#60A5FA]/75',
    badgeBg: 'bg-[#2563EB]/16 text-[#93C5FD] border-[#3B82F6]/30',
    glow: 'from-[#2563EB]/20 via-[#1E3A8A]/10 to-transparent',
    selectedRing:
      'border-[#60A5FA]/80 bg-gradient-to-b from-[#172554]/65 to-[#0D1322] shadow-[0_20px_44px_-22px_rgba(37,99,235,0.85)]',
  },
  'NeurIPS Foundation': {
    monogram: 'NP',
    accentText: 'text-indigo-300',
    topLine: 'via-indigo-400/75',
    badgeBg: 'bg-indigo-500/16 text-indigo-300 border-indigo-400/30',
    glow: 'from-indigo-500/20 via-indigo-950/10 to-transparent',
    selectedRing:
      'border-indigo-400/80 bg-gradient-to-b from-indigo-950/65 to-[#0D1322] shadow-[0_20px_44px_-22px_rgba(99,102,241,0.85)]',
  },
  'AAAI Press': {
    monogram: 'AA',
    accentText: 'text-sky-300',
    topLine: 'via-sky-400/75',
    badgeBg: 'bg-sky-500/16 text-sky-300 border-sky-400/30',
    glow: 'from-sky-500/20 via-sky-950/10 to-transparent',
    selectedRing:
      'border-sky-400/80 bg-gradient-to-b from-sky-950/60 to-[#0D1322] shadow-[0_20px_44px_-22px_rgba(56,189,248,0.8)]',
  },
  'IEEE Computer Society': {
    monogram: 'IE',
    accentText: 'text-cyan-300',
    topLine: 'via-cyan-400/75',
    badgeBg: 'bg-cyan-500/16 text-cyan-300 border-cyan-400/30',
    glow: 'from-cyan-500/20 via-cyan-950/10 to-transparent',
    selectedRing:
      'border-cyan-400/80 bg-gradient-to-b from-cyan-950/60 to-[#0D1322] shadow-[0_20px_44px_-22px_rgba(34,211,238,0.8)]',
  },
  IEEE: {
    monogram: 'IE',
    accentText: 'text-cyan-300',
    topLine: 'via-cyan-400/75',
    badgeBg: 'bg-cyan-500/16 text-cyan-300 border-cyan-400/30',
    glow: 'from-cyan-500/20 via-cyan-950/10 to-transparent',
    selectedRing:
      'border-cyan-400/80 bg-gradient-to-b from-cyan-950/60 to-[#0D1322] shadow-[0_20px_44px_-22px_rgba(34,211,238,0.8)]',
  },
  'Nature Portfolio': {
    monogram: 'NP',
    accentText: 'text-rose-300',
    topLine: 'via-rose-400/75',
    badgeBg: 'bg-rose-500/16 text-rose-200 border-rose-400/30',
    glow: 'from-rose-500/20 via-rose-950/10 to-transparent',
    selectedRing:
      'border-rose-400/80 bg-gradient-to-b from-rose-950/55 to-[#0D1322] shadow-[0_20px_44px_-22px_rgba(244,63,94,0.75)]',
  },
  Springer: {
    monogram: 'SP',
    accentText: 'text-emerald-300',
    topLine: 'via-emerald-400/75',
    badgeBg: 'bg-emerald-500/16 text-emerald-200 border-emerald-400/30',
    glow: 'from-emerald-500/20 via-emerald-950/10 to-transparent',
    selectedRing:
      'border-emerald-400/80 bg-gradient-to-b from-emerald-950/55 to-[#0D1322] shadow-[0_20px_44px_-22px_rgba(16,185,129,0.75)]',
  },
  'Springer / Academic Proceedings': {
    monogram: 'SP',
    accentText: 'text-emerald-300',
    topLine: 'via-emerald-400/75',
    badgeBg: 'bg-emerald-500/16 text-emerald-200 border-emerald-400/30',
    glow: 'from-emerald-500/20 via-emerald-950/10 to-transparent',
    selectedRing:
      'border-emerald-400/80 bg-gradient-to-b from-emerald-950/55 to-[#0D1322] shadow-[0_20px_44px_-22px_rgba(16,185,129,0.75)]',
  },
};

function getPublisherVisual(publisher) {
  return PUBLISHER_VISUALS[publisher] || PUBLISHER_VISUALS['PMLR / ICML'];
}

function getVenueMonogram(venue) {
  if (venue.name === 'ICML') return 'ICML';
  if (venue.name === 'NeurIPS') return 'NIPS';
  if (venue.name === 'AAAI') return 'AAAI';
  if (venue.name === 'ICDM') return 'ICDM';
  if (venue.name === 'MusIML@ICML') return 'MUSI';
  if (venue.name === 'WorldCIST') return 'WCST';
  if (venue.name === 'ECIC') return 'ECIC';
  if (venue.name === 'Scientific Reports') return 'nSR';
  if (venue.name === 'npj Complexity') return 'npj';
  if (venue.name === 'Applied Network Science') return 'ANS';
  if (venue.name === 'Cluster Computing') return 'CLU';
  if (venue.name === 'Social Network Analysis and Mining') return 'SNAM';
  if (venue.name === 'IEEE Transactions on Consumer Electronics') return 'IEEE';
  return getPublisherVisual(venue.publisher).monogram;
}

export function ServiceReviewerBoard() {
  const [filterType, setFilterType] = useState('all');
  const [activeVenueId, setActiveVenueId] = useState(
    ACADEMIC_SERVICE_VENUES[0].id
  );

  const visibleVenues = useMemo(
    () => filterServiceVenues(filterType),
    [filterType]
  );

  const activeVenue = useMemo(
    () =>
      ACADEMIC_SERVICE_VENUES.find((v) => v.id === activeVenueId) ||
      ACADEMIC_SERVICE_VENUES[0],
    [activeVenueId]
  );

  const activeVisual = getPublisherVisual(activeVenue.publisher);

  const siblingVenues = useMemo(
    () =>
      ACADEMIC_SERVICE_VENUES.filter(
        (v) => v.id !== activeVenue.id && v.publisher === activeVenue.publisher
      ),
    [activeVenue]
  );

  const handleFilterChange = (nextFilter) => {
    setFilterType(nextFilter);
    const nextList = filterServiceVenues(nextFilter);
    if (nextList.length > 0 && !nextList.some((v) => v.id === activeVenueId)) {
      setActiveVenueId(nextList[0].id);
    }
  };

  const conferencesVisible = visibleVenues.filter(
    (v) => v.type === 'conference'
  );
  const journalsVisible = visibleVenues.filter((v) => v.type === 'journal');

  const topConferences = conferencesVisible.slice(0, 4);
  const secondaryConferences = conferencesVisible.slice(4);

  const renderVenuePlaque = (venue, compact = false) => {
    const isSelected = venue.id === activeVenue.id;
    const samePublisher =
      !isSelected && venue.publisher === activeVenue.publisher;
    const visual = getPublisherVisual(venue.publisher);
    const monogram = getVenueMonogram(venue);

    return (
      <button
        key={venue.id}
        type="button"
        data-testid={`service-venue-${venue.id}`}
        aria-pressed={isSelected}
        onClick={() => setActiveVenueId(venue.id)}
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-5 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#60A5FA] ${
          isSelected
            ? visual.selectedRing
            : samePublisher
              ? 'border-emerald-400/45 bg-gradient-to-b from-emerald-950/35 to-[#0C121D] hover:border-emerald-400/70'
              : 'border-white/10 bg-gradient-to-b from-[#131926]/90 to-[#0B0F17]/95 hover:-translate-y-0.5 hover:border-white/22 hover:from-[#161E2E]'
        }`}
      >
        {/* Subtle top luminous hairline */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent ${visual.topLine} to-transparent transition-opacity duration-200 ${
            isSelected ? 'opacity-100' : 'opacity-30 group-hover:opacity-85'
          }`}
        />

        <div>
          <div className="flex items-start justify-between gap-3">
            {/* Refined Typographic Seal */}
            <div
              className={`inline-flex h-10 min-w-[2.75rem] items-center justify-center rounded-xl border px-2 font-mono text-[11px] font-bold tracking-wider transition-transform duration-200 group-hover:scale-[1.04] ${visual.badgeBg}`}
            >
              {monogram}
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px] tabular-nums">
              <span
                className={
                  isSelected
                    ? `font-semibold ${visual.accentText}`
                    : 'text-[#8B95A5]'
                }
              >
                {venue.meta}
              </span>
              <ArrowUpRight
                className={`h-3.5 w-3.5 transition-all duration-200 ${
                  isSelected
                    ? `${visual.accentText} translate-x-0.5 -translate-y-0.5 opacity-100`
                    : 'text-[#64748B] opacity-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#CBD5E1] group-hover:opacity-100'
                }`}
                aria-hidden="true"
              />
            </div>
          </div>

          <h4 className="mt-4 text-base font-semibold leading-snug tracking-tight text-[#F8FAFC]">
            {venue.name}
          </h4>

          <p className="mt-1 text-xs text-[#8B95A5]">{venue.publisher}</p>

          {!compact && (
            <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[#B8C2D0]">
              {venue.focus}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.07] pt-3 font-mono text-[10.5px]">
          <span
            className={
              samePublisher
                ? 'font-medium text-emerald-300'
                : isSelected
                  ? visual.accentText
                  : 'text-[#64748B]'
            }
          >
            {isSelected
              ? 'Active Dossier'
              : samePublisher
                ? 'Same publisher family'
                : venue.role}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div id="academic-service" className="scroll-mt-24">
      {/* Section Header + Segmented Filter */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium tracking-[0.04em] text-[#60A5FA]">
            03D. Peer Review &amp; Editorial Service
          </p>
          <h2
            className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Academic Service &amp; Reviewer Board
          </h2>
          <p className="mt-2.5 text-base leading-relaxed text-[#B8C2D0]">
            Invited technical reviewer and peer referee across premier AI
            conferences and Nature Portfolio, Springer, and IEEE journals.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter academic service venues"
          className="inline-flex shrink-0 items-center gap-1 self-start rounded-xl border border-white/10 bg-[#0B0F17]/90 p-1 md:self-auto"
        >
          {VENUE_FILTERS.map((tab) => {
            const active = filterType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleFilterChange(tab.id)}
                className={
                  active
                    ? 'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-semibold text-white shadow-sm'
                    : 'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-[#94A3B8] transition-colors hover:bg-white/[0.04] hover:text-[#F1F5F9]'
                }
              >
                <span>{tab.label}</span>
                <span className="font-mono text-[11px] opacity-80 tabular-nums">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-Width Architectural Editorial Spotlight Stage (Zero Dead Void!) */}
      <div
        key={activeVenue.id}
        data-testid="service-active-dossier"
        className="animate-inspector-enter relative mt-8 overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-[#131C2E]/95 via-[#0E1523]/95 to-[#0A0E16] p-6 shadow-[0_24px_64px_-28px_rgba(37,99,235,0.45)] sm:p-7"
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -top-24 right-0 h-64 w-96 rounded-full bg-gradient-to-bl ${activeVisual.glow} blur-3xl`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent ${activeVisual.topLine} to-transparent`}
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          {/* Left 7 Cols: Active Venue Identity & Reviewing Mandate */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs">
              <span className={`font-semibold ${activeVisual.accentText}`}>
                {activeVenue.typeLabel}
              </span>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <span className="text-[#CBD5E1]">{activeVenue.publisher}</span>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <span className="text-[#94A3B8] tabular-nums">
                {activeVenue.meta}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-4">
              <div
                className={`hidden h-12 min-w-[3.5rem] shrink-0 items-center justify-center rounded-xl border px-2.5 font-mono text-xs font-bold tracking-wider sm:inline-flex ${activeVisual.badgeBg}`}
              >
                {getVenueMonogram(activeVenue)}
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-[1.75rem]">
                  {activeVenue.name}
                </h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-[#93C5FD]">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{activeVenue.role}</span>
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#CBD5E1]">
              {activeVenue.focus}
            </p>
          </div>

          {/* Right 5 Cols: Peer-Review Impact Metrics & Same-Publisher Links */}
          <div className="flex flex-col justify-between gap-5 border-t border-white/10 pt-5 lg:col-span-5 lg:border-t-0 lg:border-l lg:border-white/10 lg:pt-0 lg:pl-7">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="font-mono text-2xl font-bold text-[#F8FAFC] tabular-nums">
                  {ACADEMIC_SERVICE.conferences.length}
                </p>
                <p className="mt-0.5 text-xs text-[#8B95A5]">Conferences</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-[#60A5FA] tabular-nums">
                  {ACADEMIC_SERVICE.journals.length}
                </p>
                <p className="mt-0.5 text-xs text-[#8B95A5]">Journals</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-[#F8FAFC] tabular-nums">
                  {ACADEMIC_SERVICE_VENUES.length}
                </p>
                <p className="mt-0.5 text-xs text-[#8B95A5]">Total Boards</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              {siblingVenues.length > 0 ? (
                <div>
                  <p className="font-mono text-[11px] font-medium text-emerald-300/90">
                    Also Reviewing for {activeVenue.publisher}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {siblingVenues.map((sib) => (
                      <button
                        key={sib.id}
                        type="button"
                        onClick={() => setActiveVenueId(sib.id)}
                        className="rounded-lg border border-white/12 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-[#E2E8F0] transition-colors hover:border-emerald-400/55 hover:bg-emerald-500/10 hover:text-emerald-200"
                      >
                        {sib.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <Award className="h-4 w-4 text-[#60A5FA]" aria-hidden="true" />
                  <span>
                    Select any conference or journal plaque below to inspect reviewing scope.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Balanced Prestige Venue Gallery */}
      <div className="mt-9 space-y-9">
        {conferencesVisible.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <GraduationCap
                  className="h-4 w-4 text-[#60A5FA]"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold tracking-wide text-[#F3F5F8]">
                  Flagship AI &amp; Data Mining Conferences
                </h3>
              </div>
              <span className="font-mono text-xs text-[#8B95A5] tabular-nums">
                {conferencesVisible.length} venues · PMLR · NeurIPS · AAAI · IEEE
              </span>
            </div>

            {/* Row 1: 4-col flagship conferences (ICML, NeurIPS, AAAI, ICDM) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {topConferences.map((venue) => renderVenuePlaque(venue, true))}
            </div>

            {/* Row 2: 3-col perfectly balanced workshops & international proceedings */}
            {secondaryConferences.length > 0 && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {secondaryConferences.map((venue) =>
                  renderVenuePlaque(venue, false)
                )}
              </div>
            )}
          </div>
        )}

        {journalsVisible.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <BookMarked
                  className="h-4 w-4 text-rose-300"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold tracking-wide text-[#F3F5F8]">
                  Peer-Reviewed International Journals
                </h3>
              </div>
              <span className="font-mono text-xs text-[#8B95A5] tabular-nums">
                {journalsVisible.length} journals · Nature Portfolio · Springer · IEEE
              </span>
            </div>

            {/* Balanced 3x2 Prestige Journal Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {journalsVisible.map((venue) => renderVenuePlaque(venue, false))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
