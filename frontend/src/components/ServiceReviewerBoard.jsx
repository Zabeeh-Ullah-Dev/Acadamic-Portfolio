import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookMarked,
  ChevronLeft,
  ChevronRight,
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
    strokeHex: '#60A5FA',
    topLine: 'via-[#60A5FA]/80',
    emblemClass:
      'border-[#60A5FA]/40 bg-[#172554]/55 text-[#BFDBFE] shadow-[0_0_24px_-8px_rgba(96,165,250,0.75)]',
    glow: 'from-[#2563EB]/25 via-[#1E3A8A]/10 to-transparent',
    selectedNode:
      'border-[#60A5FA]/85 bg-gradient-to-b from-[#172554]/90 via-[#0E172E]/95 to-[#080D1A]/95 shadow-[0_0_32px_-6px_rgba(59,130,246,0.85)]',
    selectedTile:
      'border-[#60A5FA]/70 bg-gradient-to-b from-[#172554]/60 via-[#0D1528]/90 to-[#080C16]/95 shadow-[0_22px_48px_-24px_rgba(37,99,235,0.8)]',
  },
  'NeurIPS Foundation': {
    monogram: 'NP',
    accentText: 'text-indigo-300',
    strokeHex: '#818CF8',
    topLine: 'via-indigo-400/80',
    emblemClass:
      'border-indigo-400/40 bg-indigo-950/60 text-indigo-200 shadow-[0_0_24px_-8px_rgba(129,140,248,0.75)]',
    glow: 'from-indigo-500/25 via-indigo-950/10 to-transparent',
    selectedNode:
      'border-indigo-400/85 bg-gradient-to-b from-indigo-950/90 via-[#13142E]/95 to-[#090B1A]/95 shadow-[0_0_32px_-6px_rgba(129,140,248,0.85)]',
    selectedTile:
      'border-indigo-400/70 bg-gradient-to-b from-indigo-950/55 via-[#101428]/90 to-[#080B16]/95 shadow-[0_22px_48px_-24px_rgba(99,102,241,0.8)]',
  },
  'AAAI Press': {
    monogram: 'AA',
    accentText: 'text-sky-300',
    strokeHex: '#38BDF8',
    topLine: 'via-sky-400/80',
    emblemClass:
      'border-sky-400/40 bg-sky-950/60 text-sky-200 shadow-[0_0_24px_-8px_rgba(56,189,248,0.75)]',
    glow: 'from-sky-500/25 via-sky-950/10 to-transparent',
    selectedNode:
      'border-sky-400/85 bg-gradient-to-b from-sky-950/90 via-[#0C1D30]/95 to-[#070E19]/95 shadow-[0_0_32px_-6px_rgba(56,189,248,0.85)]',
    selectedTile:
      'border-sky-400/70 bg-gradient-to-b from-sky-950/55 via-[#0B1726]/90 to-[#070C15]/95 shadow-[0_22px_48px_-24px_rgba(56,189,248,0.8)]',
  },
  'IEEE Computer Society': {
    monogram: 'IE',
    accentText: 'text-cyan-300',
    strokeHex: '#22D3EE',
    topLine: 'via-cyan-400/80',
    emblemClass:
      'border-cyan-400/40 bg-cyan-950/60 text-cyan-200 shadow-[0_0_24px_-8px_rgba(34,211,238,0.75)]',
    glow: 'from-cyan-500/22 via-cyan-950/10 to-transparent',
    selectedNode:
      'border-cyan-400/85 bg-gradient-to-b from-cyan-950/90 via-[#0B202C]/95 to-[#071018]/95 shadow-[0_0_32px_-6px_rgba(34,211,238,0.85)]',
    selectedTile:
      'border-cyan-400/70 bg-gradient-to-b from-cyan-950/55 via-[#0A1A24]/90 to-[#070D14]/95 shadow-[0_22px_48px_-24px_rgba(34,211,238,0.8)]',
  },
  IEEE: {
    monogram: 'IE',
    accentText: 'text-cyan-300',
    strokeHex: '#22D3EE',
    topLine: 'via-cyan-400/80',
    emblemClass:
      'border-cyan-400/40 bg-cyan-950/60 text-cyan-200 shadow-[0_0_24px_-8px_rgba(34,211,238,0.75)]',
    glow: 'from-cyan-500/22 via-cyan-950/10 to-transparent',
    selectedNode:
      'border-cyan-400/85 bg-gradient-to-b from-cyan-950/90 via-[#0B202C]/95 to-[#071018]/95 shadow-[0_0_32px_-6px_rgba(34,211,238,0.85)]',
    selectedTile:
      'border-cyan-400/70 bg-gradient-to-b from-cyan-950/55 via-[#0A1A24]/90 to-[#070D14]/95 shadow-[0_22px_48px_-24px_rgba(34,211,238,0.8)]',
  },
  'Nature Portfolio': {
    monogram: 'NP',
    accentText: 'text-rose-300',
    strokeHex: '#FB7185',
    topLine: 'via-rose-400/80',
    emblemClass:
      'border-rose-400/40 bg-rose-950/60 text-rose-200 shadow-[0_0_24px_-8px_rgba(251,113,133,0.75)]',
    glow: 'from-rose-500/22 via-rose-950/10 to-transparent',
    selectedNode:
      'border-rose-400/85 bg-gradient-to-b from-rose-950/90 via-[#25101B]/95 to-[#12080E]/95 shadow-[0_0_32px_-6px_rgba(244,63,94,0.8)]',
    selectedTile:
      'border-rose-400/70 bg-gradient-to-b from-rose-950/50 via-[#1B0E17]/90 to-[#0E080D]/95 shadow-[0_22px_48px_-24px_rgba(244,63,94,0.75)]',
  },
  Springer: {
    monogram: 'SP',
    accentText: 'text-emerald-300',
    strokeHex: '#34D399',
    topLine: 'via-emerald-400/80',
    emblemClass:
      'border-emerald-400/40 bg-emerald-950/60 text-emerald-200 shadow-[0_0_24px_-8px_rgba(52,211,153,0.75)]',
    glow: 'from-emerald-500/22 via-emerald-950/10 to-transparent',
    selectedNode:
      'border-emerald-400/85 bg-gradient-to-b from-emerald-950/90 via-[#0B221D]/95 to-[#061110]/95 shadow-[0_0_32px_-6px_rgba(16,185,129,0.8)]',
    selectedTile:
      'border-emerald-400/70 bg-gradient-to-b from-emerald-950/50 via-[#0A1C18]/90 to-[#060E0D]/95 shadow-[0_22px_48px_-24px_rgba(16,185,129,0.75)]',
  },
  'Springer / Academic Proceedings': {
    monogram: 'SP',
    accentText: 'text-emerald-300',
    strokeHex: '#34D399',
    topLine: 'via-emerald-400/80',
    emblemClass:
      'border-emerald-400/40 bg-emerald-950/60 text-emerald-200 shadow-[0_0_24px_-8px_rgba(52,211,153,0.75)]',
    glow: 'from-emerald-500/22 via-emerald-950/10 to-transparent',
    selectedNode:
      'border-emerald-400/85 bg-gradient-to-b from-emerald-950/90 via-[#0B221D]/95 to-[#061110]/95 shadow-[0_0_32px_-6px_rgba(16,185,129,0.8)]',
    selectedTile:
      'border-emerald-400/70 bg-gradient-to-b from-emerald-950/50 via-[#0A1C18]/90 to-[#060E0D]/95 shadow-[0_22px_48px_-24px_rgba(16,185,129,0.75)]',
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

function getShortNodeLabel(venue) {
  if (venue.name === 'Social Network Analysis and Mining') return 'SNAM';
  if (venue.name === 'IEEE Transactions on Consumer Electronics') return 'IEEE TCE';
  if (venue.name === 'Applied Network Science') return 'App. Net.';
  if (venue.name === 'Scientific Reports') return 'Sci. Rep.';
  if (venue.name === 'npj Complexity') return 'npj Comp.';
  if (venue.name === 'Cluster Computing') return 'Cluster';
  if (venue.name === 'MusIML@ICML') return 'MusIML';
  return venue.name;
}

// Deterministic deep-space ambient star coordinates inside 700x460 stage
const DEEP_SPACE_STARS = [
  { x: 42, y: 38, r: 1.1, o: 0.45 },
  { x: 118, y: 72, r: 0.8, o: 0.35 },
  { x: 256, y: 34, r: 1.2, o: 0.5 },
  { x: 352, y: 62, r: 0.9, o: 0.3 },
  { x: 472, y: 40, r: 1.1, o: 0.45 },
  { x: 618, y: 58, r: 1.3, o: 0.5 },
  { x: 662, y: 146, r: 0.9, o: 0.35 },
  { x: 34, y: 210, r: 1.0, o: 0.4 },
  { x: 348, y: 184, r: 1.2, o: 0.38 },
  { x: 364, y: 318, r: 0.9, o: 0.3 },
  { x: 64, y: 392, r: 1.2, o: 0.42 },
  { x: 224, y: 424, r: 0.9, o: 0.35 },
  { x: 432, y: 418, r: 1.1, o: 0.45 },
  { x: 644, y: 384, r: 1.2, o: 0.48 },
  { x: 562, y: 108, r: 0.8, o: 0.3 },
  { x: 158, y: 344, r: 0.9, o: 0.32 },
];

/**
 * Computes crisp non-overlapping orbital coordinates in a 700x460 spatial frame
 * with safe outer margins and generous separation between clusters.
 */
function buildConstellationLayout(visibleVenues, filterType) {
  const confs = visibleVenues.filter((v) => v.type === 'conference');
  const jours = visibleVenues.filter((v) => v.type === 'journal');

  const hubs = [];
  const nodes = [];

  if (filterType === 'all') {
    const confHub = {
      id: 'hub-conference',
      type: 'conference',
      label: 'Conferences',
      count: confs.length,
      x: 178,
      y: 230,
      rx: 112,
      ry: 148,
    };
    const jourHub = {
      id: 'hub-journal',
      type: 'journal',
      label: 'Journals',
      count: jours.length,
      x: 522,
      y: 230,
      rx: 110,
      ry: 146,
    };
    hubs.push(confHub, jourHub);

    confs.forEach((venue, i) => {
      const angle = -Math.PI * 0.5 + (i / confs.length) * Math.PI * 2;
      nodes.push({
        venue,
        hub: confHub,
        x: Math.round(confHub.x + Math.cos(angle) * confHub.rx),
        y: Math.round(confHub.y + Math.sin(angle) * confHub.ry),
        delaySec: (i * 0.55) % 4.4,
        altFloat: i % 2 === 1,
      });
    });

    jours.forEach((venue, i) => {
      const angle = -Math.PI * 0.5 + (i / jours.length) * Math.PI * 2;
      nodes.push({
        venue,
        hub: jourHub,
        x: Math.round(jourHub.x + Math.cos(angle) * jourHub.rx),
        y: Math.round(jourHub.y + Math.sin(angle) * jourHub.ry),
        delaySec: (i * 0.65 + 0.3) % 4.4,
        altFloat: i % 2 === 0,
      });
    });
  } else {
    const isConf = filterType === 'conference';
    const list = isConf ? confs : jours;
    const soloHub = {
      id: isConf ? 'hub-conference' : 'hub-journal',
      type: filterType,
      label: isConf ? 'Conferences' : 'Journals',
      count: list.length,
      x: 350,
      y: 230,
      rx: 210,
      ry: 148,
    };
    hubs.push(soloHub);

    list.forEach((venue, i) => {
      const angle = -Math.PI * 0.5 + (i / list.length) * Math.PI * 2;
      nodes.push({
        venue,
        hub: soloHub,
        x: Math.round(soloHub.x + Math.cos(angle) * soloHub.rx),
        y: Math.round(soloHub.y + Math.sin(angle) * soloHub.ry),
        delaySec: (i * 0.55) % 4.4,
        altFloat: i % 2 === 1,
      });
    });
  }

  return { hubs, nodes };
}

function curvedEdgePath(x1, y1, x2, y2, bend = 16) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx - (dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M ${x1} ${y1} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`;
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

  const { hubs, nodes } = useMemo(
    () => buildConstellationLayout(visibleVenues, filterType),
    [visibleVenues, filterType]
  );

  const activeNodePoint = useMemo(
    () => nodes.find((n) => n.venue.id === activeVenue.id) || nodes[0],
    [nodes, activeVenue.id]
  );

  const siblingNodePoints = useMemo(
    () =>
      nodes.filter(
        (n) =>
          n.venue.id !== activeVenue.id &&
          n.venue.publisher === activeVenue.publisher
      ),
    [nodes, activeVenue]
  );

  const handleFilterChange = (nextFilter) => {
    setFilterType(nextFilter);
    const nextList = filterServiceVenues(nextFilter);
    if (nextList.length > 0 && !nextList.some((v) => v.id === activeVenueId)) {
      setActiveVenueId(nextList[0].id);
    }
  };

  const handleStepVenue = (delta) => {
    if (visibleVenues.length === 0) return;
    const idx = visibleVenues.findIndex((v) => v.id === activeVenue.id);
    const nextIdx =
      (idx === -1 ? 0 : idx + delta + visibleVenues.length) %
      visibleVenues.length;
    setActiveVenueId(visibleVenues[nextIdx].id);
  };

  const conferencesVisible = visibleVenues.filter(
    (v) => v.type === 'conference'
  );
  const journalsVisible = visibleVenues.filter((v) => v.type === 'journal');

  const renderGlassGridTile = (venue) => {
    const isSelected = venue.id === activeVenue.id;
    const samePublisher =
      !isSelected && venue.publisher === activeVenue.publisher;
    const visual = getPublisherVisual(venue.publisher);
    const monogram = getVenueMonogram(venue);

    return (
      <button
        key={venue.id}
        type="button"
        data-testid={`service-grid-venue-${venue.id}`}
        aria-pressed={isSelected}
        onClick={() => setActiveVenueId(venue.id)}
        className={`hover-sheen group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border p-5 text-left backdrop-blur-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#60A5FA] ${
          isSelected
            ? visual.selectedTile
            : samePublisher
              ? 'border-emerald-400/45 bg-gradient-to-b from-emerald-950/35 via-[#0B141D]/90 to-[#070B12]/95 hover:border-emerald-400/75'
              : 'border-white/10 bg-gradient-to-b from-white/[0.045] via-[#0B101B]/88 to-[#070A12]/95 hover:-translate-y-0.5 hover:border-white/25'
        }`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent ${visual.topLine} to-transparent transition-opacity duration-200 ${
            isSelected ? 'opacity-100' : 'opacity-25 group-hover:opacity-80'
          }`}
        />

        <div>
          <div className="flex items-start justify-between gap-3">
            <div
              className={`inline-flex h-10 min-w-[2.9rem] items-center justify-center rounded-xl border px-2 font-mono text-[11px] font-bold tracking-wider transition-transform duration-200 group-hover:scale-[1.04] ${visual.emblemClass}`}
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

          <p className="mt-1 text-xs text-[#94A3B8]">{venue.publisher}</p>

          <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[#B8C2D0]">
            {venue.focus}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-3 font-mono text-[11px]">
          <span
            className={
              samePublisher
                ? 'font-medium text-emerald-300'
                : isSelected
                  ? visual.accentText
                  : 'text-[#7A869A]'
            }
          >
            {isSelected
              ? 'Focused in cluster'
              : samePublisher
                ? 'Connected publisher'
                : venue.role}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div id="academic-service" className="scroll-mt-24">
      {/* Header Row + Sleek Obsidian-Glass Filter Controls */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#60A5FA]">
            Peer Review &amp; Editorial Service
          </p>
          <h2
            className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Academic Service &amp; Reviewer Constellation
          </h2>
          <p className="mt-2.5 text-base leading-relaxed text-[#B8C2D0]">
            Explore floating conference and journal clusters across premier AI
            proceedings and Nature Portfolio, Springer, and IEEE publications.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filter academic service clusters"
          className="inline-flex shrink-0 items-center gap-1 self-start rounded-xl border border-white/12 bg-[#080C14]/90 p-1 backdrop-blur-xl md:self-auto"
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
                    ? 'inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#3B82F6]/50 bg-gradient-to-b from-[#172554]/80 to-[#0E1628] px-3.5 py-1.5 text-xs font-semibold text-[#F8FAFC] shadow-[0_8px_20px_-10px_rgba(59,130,246,0.75)]'
                    : 'inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-transparent px-3.5 py-1.5 text-xs font-medium text-[#94A3B8] transition-colors hover:bg-white/[0.04] hover:text-[#F1F5F9]'
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

      {/* 2050 Deep-Space Interactive Constellation + Animated Glass Dossier */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/12 bg-[radial-gradient(ellipse_at_22%_24%,rgba(37,99,235,0.22),transparent_52%),radial-gradient(ellipse_at_80%_76%,rgba(14,165,233,0.16),transparent_50%),radial-gradient(ellipse_at_50%_50%,rgba(15,23,42,0.92),#05070E_90%)] p-4 shadow-[0_32px_80px_-32px_rgba(37,99,235,0.45)] sm:p-6">
        {/* Precision deep-space coordinate mesh */}
        <div
          aria-hidden="true"
          className="architect-grid-precision pointer-events-none absolute inset-0 opacity-45"
        />
        {/* Animated top prism scan beam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
        >
          <div className="animate-beam-sweep h-full w-1/3 bg-gradient-to-r from-transparent via-[#93C5FD]/80 to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch">
          {/* Left 7 Cols: Interactive Floating Node Cluster Viewport */}
          <div
            data-testid="service-constellation-stage"
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#050811]/75 backdrop-blur-2xl lg:col-span-7"
          >
            {/* Desktop / Tablet Orbital Floating Cluster Canvas */}
            <div className="relative hidden min-h-[456px] w-full sm:block">
              {/* SVG Deep-Space Orbital Rings, Stars & Synaptic Beams */}
              <svg
                viewBox="0 0 700 460"
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="confHubAura" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.32" />
                    <stop offset="70%" stopColor="#1D4ED8" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="jourHubAura" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.28" />
                    <stop offset="70%" stopColor="#0E7490" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#0E7490" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Subtle deep-space star coordinates */}
                {DEEP_SPACE_STARS.map((star, idx) => (
                  <circle
                    key={idx}
                    cx={star.x}
                    cy={star.y}
                    r={star.r}
                    fill="#CBD5E1"
                    opacity={star.o}
                  />
                ))}

                {/* Inter-cluster gravitational bridge when viewing both clusters */}
                {hubs.length === 2 && (
                  <path
                    d={curvedEdgePath(
                      hubs[0].x,
                      hubs[0].y,
                      hubs[1].x,
                      hubs[1].y,
                      -26
                    )}
                    fill="none"
                    stroke="rgba(148, 163, 184, 0.16)"
                    strokeWidth="1.2"
                    strokeDasharray="4 6"
                  />
                )}

                {/* Concentric orbital paths per cluster hub */}
                {hubs.map((hub) => (
                  <g key={hub.id}>
                    <ellipse
                      cx={hub.x}
                      cy={hub.y}
                      rx={hub.rx + 22}
                      ry={hub.ry + 18}
                      fill={
                        hub.type === 'conference'
                          ? 'url(#confHubAura)'
                          : 'url(#jourHubAura)'
                      }
                    />
                    <ellipse
                      cx={hub.x}
                      cy={hub.y}
                      rx={hub.rx}
                      ry={hub.ry}
                      fill="none"
                      stroke={
                        hub.type === 'conference'
                          ? 'rgba(96, 165, 250, 0.22)'
                          : 'rgba(34, 211, 238, 0.22)'
                      }
                      strokeWidth="1"
                      strokeDasharray="3 7"
                    />
                    <ellipse
                      cx={hub.x}
                      cy={hub.y}
                      rx={hub.rx * 0.62}
                      ry={hub.ry * 0.62}
                      fill="none"
                      stroke="rgba(148, 163, 184, 0.12)"
                      strokeWidth="1"
                    />
                  </g>
                ))}

                {/* Ambient hub-to-node synaptic filaments */}
                {nodes.map((node) => {
                  const isActive = node.venue.id === activeVenue.id;
                  const isSibling =
                    !isActive &&
                    node.venue.publisher === activeVenue.publisher;
                  const pathD = curvedEdgePath(
                    node.hub.x,
                    node.hub.y,
                    node.x,
                    node.y,
                    node.altFloat ? 14 : -14
                  );
                  return (
                    <g key={`edge-${node.venue.id}`}>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={
                          isActive
                            ? activeVisual.strokeHex
                            : isSibling
                              ? '#34D399'
                              : 'rgba(148, 163, 184, 0.18)'
                        }
                        strokeWidth={isActive ? '2.1' : isSibling ? '1.5' : '1'}
                        strokeOpacity={isActive ? '0.92' : isSibling ? '0.68' : '0.6'}
                      />
                      {isActive && (
                        <path
                          d={pathD}
                          fill="none"
                          stroke="#E0F2FE"
                          strokeWidth="2.2"
                          strokeDasharray="7 15"
                          className="animate-edge-flow"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Direct harmonic links from active node to same-publisher siblings */}
                {activeNodePoint &&
                  siblingNodePoints.map((sib) => {
                    const sibPath = curvedEdgePath(
                      activeNodePoint.x,
                      activeNodePoint.y,
                      sib.x,
                      sib.y,
                      24
                    );
                    return (
                      <path
                        key={`sib-${sib.venue.id}`}
                        d={sibPath}
                        fill="none"
                        stroke="#34D399"
                        strokeWidth="1.6"
                        strokeDasharray="6 10"
                        strokeOpacity="0.78"
                        className="animate-edge-flow"
                      />
                    );
                  })}
              </svg>

              {/* Cluster Core Hub Buttons */}
              {hubs.map((hub) => {
                const isActiveCluster = filterType === hub.type;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() =>
                      handleFilterChange(isActiveCluster ? 'all' : hub.type)
                    }
                    style={{
                      left: `${(hub.x / 700) * 100}%`,
                      top: `${(hub.y / 460) * 100}%`,
                    }}
                    className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/15 bg-[#0A1120]/90 px-4 py-3 text-center shadow-[0_0_40px_-8px_rgba(59,130,246,0.55)] backdrop-blur-xl transition-transform duration-200 hover:scale-105 hover:border-[#60A5FA]/60 focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
                    aria-label={`${hub.label} cluster (${hub.count} venues)`}
                  >
                    <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] font-semibold tracking-wider text-[#93C5FD]">
                      {hub.type === 'conference' ? (
                        <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <BookMarked className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
                      )}
                      <span className="tabular-nums">{hub.count}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] font-semibold tracking-tight text-[#F8FAFC]">
                      {hub.label}
                    </p>
                  </button>
                );
              })}

              {/* Interactive Floating Glass Venue Nodes */}
              {nodes.map(({ venue, x, y, delaySec, altFloat }) => {
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
                    aria-label={`${venue.name} — ${venue.publisher}`}
                    onClick={() => setActiveVenueId(venue.id)}
                    style={{
                      left: `${(x / 700) * 100}%`,
                      top: `${(y / 460) * 100}%`,
                    }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-[#60A5FA] ${
                      isSelected ? 'z-30' : samePublisher ? 'z-20' : 'z-10'
                    }`}
                  >
                    <span
                      style={{ animationDelay: `${delaySec}s` }}
                      className={`pointer-events-none flex items-center gap-1.5 rounded-2xl border px-2 py-1.5 backdrop-blur-xl transition-all duration-200 group-hover:[animation-play-state:paused] ${
                        altFloat
                          ? 'animate-node-float-alt'
                          : 'animate-orbital-float'
                      } ${
                        isSelected
                          ? `${visual.selectedNode} scale-105`
                          : samePublisher
                            ? 'border-emerald-400/65 bg-[#0A1F1C]/90 shadow-[0_0_24px_-6px_rgba(16,185,129,0.7)] group-hover:scale-105'
                            : 'border-white/14 bg-[#0B111E]/88 group-hover:scale-105 group-hover:border-white/35 group-hover:bg-[#111A2D]/95'
                      }`}
                    >
                      <span
                        className={`inline-flex h-6 min-w-[2rem] items-center justify-center rounded-lg border px-1 font-mono text-[9.5px] font-bold tracking-wider ${visual.emblemClass}`}
                      >
                        {monogram}
                      </span>
                      <span className="max-w-[74px] truncate text-left text-[11px] font-semibold tracking-tight text-[#F1F5F9]">
                        {getShortNodeLabel(venue)}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile-Friendly Floating Cluster Strip (< 640px) */}
            <div className="p-4 sm:hidden">
              <p className="font-mono text-[11px] text-[#94A3B8]">
                Tap any venue node to inspect its reviewing scope
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {visibleVenues.map((venue) => {
                  const isSelected = venue.id === activeVenue.id;
                  const visual = getPublisherVisual(venue.publisher);
                  return (
                    <button
                      key={`mob-${venue.id}`}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setActiveVenueId(venue.id)}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium backdrop-blur-md transition-colors ${
                        isSelected
                          ? visual.selectedNode
                          : 'border-white/12 bg-[#0D1322]/90 text-[#CBD5E1]'
                      }`}
                    >
                      <span className={`font-mono text-[10px] font-bold ${visual.accentText}`}>
                        {getVenueMonogram(venue)}
                      </span>
                      <span>{getShortNodeLabel(venue)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Stage Navigation Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#070B14]/85 px-4 py-3">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] text-[#8B95A5]">
                <span className="text-[#CBD5E1]">Click any node or hub</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-300/90">
                  Emerald links highlight shared publishers
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleStepVenue(-1)}
                  aria-label="Previous venue"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-[#CBD5E1] transition-colors hover:border-[#60A5FA]/50 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => handleStepVenue(1)}
                  aria-label="Next venue"
                  className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-[#CBD5E1] transition-colors hover:border-[#60A5FA]/50 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Animated Glass-Morphism Active Venue Dossier */}
          <div
            key={activeVenue.id}
            data-testid="service-active-dossier"
            className="animate-inspector-enter relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/14 bg-gradient-to-b from-white/[0.06] via-[#0C1324]/92 to-[#070B14]/96 p-6 backdrop-blur-2xl lg:col-span-5"
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -top-24 -right-12 h-60 w-60 rounded-full bg-gradient-to-bl ${activeVisual.glow} blur-3xl`}
            />
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${activeVisual.topLine} to-transparent`}
            />

            <div className="relative z-10">
              {/* Unboxed typographic metadata line */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
                <span className={`font-semibold ${activeVisual.accentText}`}>
                  {activeVenue.typeLabel}
                </span>
                <span aria-hidden="true" className="text-white/25">
                  ·
                </span>
                <span className="text-[#CBD5E1]">{activeVenue.publisher}</span>
                {activeVenue.meta && activeVenue.meta !== activeVenue.publisher && (
                  <>
                    <span aria-hidden="true" className="text-white/25">
                      ·
                    </span>
                    <span className="text-[#94A3B8] tabular-nums">
                      {activeVenue.meta}
                    </span>
                  </>
                )}
              </div>

              {/* Venue Seal + Name */}
              <div className="mt-5 flex items-center gap-4">
                <div
                  className={`inline-flex h-14 min-w-[3.75rem] shrink-0 items-center justify-center rounded-2xl border px-2.5 font-mono text-sm font-bold tracking-wider ${activeVisual.emblemClass}`}
                >
                  {getVenueMonogram(activeVenue)}
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-snug tracking-tight text-[#F8FAFC] sm:text-2xl">
                    {activeVenue.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#93C5FD]">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{activeVenue.role}</span>
                  </p>
                </div>
              </div>

              {/* Technical Reviewing Mandate */}
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="font-mono text-[11px] font-medium text-[#8B95A5]">
                  Reviewing Scope &amp; Evaluation Domain
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#D8E1EE]">
                  {activeVenue.focus}
                </p>
              </div>
            </div>

            {/* Bottom Metrics & Connected Publisher Siblings */}
            <div className="relative z-10 mt-6 space-y-5">
              {siblingVenues.length > 0 && (
                <div className="border-t border-white/10 pt-4">
                  <p className="font-mono text-[11px] font-medium text-emerald-300/90">
                    Connected {activeVenue.publisher} Boards
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {siblingVenues.map((sib) => (
                      <button
                        key={sib.id}
                        type="button"
                        onClick={() => setActiveVenueId(sib.id)}
                        className="cursor-pointer rounded-lg border border-emerald-400/25 bg-emerald-500/[0.08] px-2.5 py-1.5 text-xs font-medium text-emerald-100 transition-colors hover:border-emerald-400/65 hover:bg-emerald-500/18"
                      >
                        {sib.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                <div>
                  <p className="font-mono text-2xl font-bold text-[#F8FAFC] tabular-nums">
                    {ACADEMIC_SERVICE.conferences.length}
                  </p>
                  <p className="mt-0.5 text-xs text-[#8B95A5]">Conferences</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-cyan-300 tabular-nums">
                    {ACADEMIC_SERVICE.journals.length}
                  </p>
                  <p className="mt-0.5 text-xs text-[#8B95A5]">Journals</p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-[#93C5FD] tabular-nums">
                    {ACADEMIC_SERVICE_VENUES.length}
                  </p>
                  <p className="mt-0.5 text-xs text-[#8B95A5]">Total Boards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Tech Immersive Glass-Morphism Directory Grid */}
      <div className="mt-9 space-y-9">
        {conferencesVisible.length > 0 && (
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {conferencesVisible.slice(0, 4).map((venue) => renderGlassGridTile(venue))}
            </div>
            {conferencesVisible.length > 4 && (
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {conferencesVisible.slice(4).map((venue) => renderGlassGridTile(venue))}
              </div>
            )}
          </div>
        )}

        {journalsVisible.length > 0 && (
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <BookMarked
                  className="h-4 w-4 text-cyan-300"
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {journalsVisible.map((venue) => renderGlassGridTile(venue))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
