import { useState } from 'react';
import {
  ArrowUpRight,
  RotateCcw,
  ExternalLink,
  Sparkles,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { PROFILE_INFO as DEFAULT_PROFILE, PUBLICATIONS as DEFAULT_PUBLICATIONS } from '../data/portfolioData';
import { usePortfolioData } from '../context/PortfolioContext';
import {
  filterAndSortPublications,
  getCategoryCounts,
  getCodeBackedCount,
  isPublicationFilterActive,
} from '../utils/publicationsFilter';
import { GitHubIcon, GoogleScholarIcon } from './BrandIcons';
import { ExpandableSearch } from './ExpandableSearch';
import { PublicationSchematic } from './PublicationSchematic';
import { SkillBubbleCloud } from './SkillBubbleCloud';

// The 6 papers explicitly spotlighted with diagrams
const SPOTLIGHT_PAPER_IDS = [
  'pub-02', // 1. MUCOS
  'pub-01', // 2. MuCo-KGC
  'pub-14', // 3. Link prediction using node information on local paths
  'pub-15', // 4. Path-based extensions of local link prediction methods for complex networks
  'pub-04', // 5. KG-EDAS: A Meta-Metric Framework for Evaluating Knowledge Graph Completion Models
  'pub-05', // 6. Evaluating Knowledge Graph Complexity via Semantic, Spectral, and Structural Metrics for Link Prediction
];

export function PublicationsSection({
  category,
  searchQuery,
  sortMode,
  onlyWithCode,
  focusedPublicationId = null,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onToggleOnlyWithCode,
  onClearFocusedPublication,
  onResetFilters,
  onSelectPublication,
}) {
  const portfolioData = usePortfolioData();
  const PUBLICATIONS = portfolioData?.publications || DEFAULT_PUBLICATIONS;
  const PROFILE_INFO = portfolioData?.profile || DEFAULT_PROFILE;

  const [show3DFilter, setShow3DFilter] = useState(true);

  const counts = getCategoryCounts(PUBLICATIONS);
  const codeCount = getCodeBackedCount(PUBLICATIONS);
  const filtered = filterAndSortPublications(PUBLICATIONS, {
    category,
    searchQuery,
    sortMode,
    onlyWithCode,
  });

  const filterActive = isPublicationFilterActive({
    category,
    searchQuery,
    onlyWithCode,
    focusedPublicationId,
  });

  // Separate the 6 spotlight diagram papers from all other papers
  const spotlightPapers = SPOTLIGHT_PAPER_IDS
    .map((id) => PUBLICATIONS.find((p) => p.id === id))
    .filter(Boolean)
    .filter((pub) => {
      // If a filter/search is active, only show if it matches the filter
      if (!filterActive) return true;
      return filtered.some((f) => f.id === pub.id);
    });

  const otherPapers = filtered.filter(
    (pub) => !SPOTLIGHT_PAPER_IDS.includes(pub.id)
  );

  const tabs = [
    { id: 'all', label: 'All Publications', count: counts.all },
    { id: 'kg-llm', label: 'Knowledge Graphs & LLMs', count: counts['kg-llm'] },
    {
      id: 'link-prediction',
      label: 'Link Prediction & Complex Networks',
      count: counts['link-prediction'],
    },
    {
      id: 'healthcare-cps',
      label: 'Healthcare, GNNs & CPS',
      count: counts['healthcare-cps'],
    },
  ];

  const handleResetAll = () => {
    onResetFilters();
  };

  const handleTopicSelectFromCloud = (domainCat, searchTerm) => {
    if (domainCat && domainCat !== 'all') {
      onCategoryChange(domainCat);
    }
    if (searchTerm) {
      onSearchChange(searchTerm);
    }
  };

  return (
    <section
      id="publications"
      className="bg-[#0C0F14] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* 3D Ball Constellation Filter */}
        <div className="mb-14 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-[#0F172A]/90 to-[#0A0E17]/95 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  3D Topic Constellation &amp; Paper Sphere Filter
                </h3>
                <p className="text-xs text-slate-400">
                  Rotate the 3D sphere and click any research topic ball to instantly filter the papers below.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShow3DFilter((prev) => !prev)}
              className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <span>{show3DFilter ? 'Collapse 3D Sphere' : 'Expand 3D Sphere'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${show3DFilter ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {show3DFilter && (
            <div className="overflow-hidden rounded-2xl bg-[#090D15]/80 border border-white/5 p-2 sm:p-4">
              <SkillBubbleCloud
                onSelectTopic={handleTopicSelectFromCloud}
                onSelectPublication={(pub) => onSelectPublication?.(pub)}
              />
            </div>
          )}
        </div>

        {/* Header & Controls */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-[#60A5FA]">
              02. Peer-Reviewed Output
            </p>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl">
              Publications &amp; Code Archive
            </h2>
            <p className="mt-3 text-base leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
              Featuring the 6 core diagrammed papers below, followed by the complete peer-reviewed catalog ({PUBLICATIONS.length} papers). Click any paper title to view the official published article.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="pub-sort-select" className="text-xs font-medium text-[#8B95A5]">
              Sort by
            </label>
            <select
              id="pub-sort-select"
              value={sortMode}
              onChange={(e) => onSortChange(e.target.value)}
              className="rounded-lg border border-white/15 bg-[#141922] px-3 py-2 text-xs font-medium text-[#F3F5F8] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
            >
              <option value="year-desc">Newest First</option>
              <option value="citations-desc">Most Cited</option>
            </select>
          </div>
        </div>

        {/* Category Tabs, GitHub Code Toggle & Search */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div
              role="tablist"
              aria-label="Publication category filters"
              className="flex flex-wrap items-center gap-2"
            >
              {tabs.map((tab) => {
                const isActive = !focusedPublicationId && category === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => onCategoryChange(tab.id)}
                    className={
                      isActive
                        ? 'inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-950/50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]'
                        : 'inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]'
                    }
                  >
                    <span>{tab.label}</span>
                    <span className="font-mono tabular-nums opacity-85">
                      ({tab.count})
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onToggleOnlyWithCode}
              aria-pressed={onlyWithCode}
              className={
                onlyWithCode
                  ? 'inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6] bg-[#2563EB]/25 px-3 py-1.5 text-xs font-semibold text-[#93C5FD] shadow-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#60A5FA]'
                  : 'inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]'
              }
            >
              <GitHubIcon className="h-3.5 w-3.5 shrink-0" />
              <span>With Code ({codeCount})</span>
            </button>

            {filterActive && (
              <button
                type="button"
                onClick={handleResetAll}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <ExpandableSearch
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
        </div>

        {/* 1. SPOTLIGHT PAPERS WITH PROPER ARCHITECTURE DIAGRAMS */}
        {spotlightPapers.length > 0 && (
          <div className="mt-10">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#60A5FA] animate-pulse" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#60A5FA] font-mono">
                  Featured Publications With Architecture Diagrams ({spotlightPapers.length})
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Click paper title to open original publisher page
              </span>
            </div>

            <div
              data-testid="publications-grid"
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {spotlightPapers.map((pub, idx) => {
                const targetUrl = pub.paperUrl || pub.scholarUrl;
                const isFocusedPaper = focusedPublicationId === pub.id;

                return (
                  <article
                    key={pub.id}
                    id={`publication-card-${pub.id}`}
                    data-testid={`publication-card-${pub.id}`}
                    className={`glass-panel group flex scroll-mt-28 flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:border-[#3B82F6]/60 hover:shadow-xl hover:shadow-blue-950/40 ${
                      isFocusedPaper
                        ? 'border-[#60A5FA] bg-gradient-to-br from-[#16233D]/95 via-[#111827]/95 to-[#0D121C]'
                        : 'border-white/10'
                    }`}
                  >
                    <div>
                      {/* Diagram Area with White Clean Slate */}
                      <div className="aspect-[16/9] w-full overflow-hidden border-b border-white/10 bg-[#F8FAFC]">
                        <PublicationSchematic
                          type={pub.schematic}
                          seed={pub.index}
                          figureUrl={pub.figureUrl}
                          title={pub.title}
                          venue={pub.venue}
                        />
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#8B95A5] tabular-nums">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-cyan-400 font-bold border border-blue-500/20">
                              #{idx + 1}
                            </span>
                            <span className="font-semibold text-[#60A5FA]">{pub.year}</span>
                            <span aria-hidden="true" className="text-white/25">·</span>
                            <span className="text-[#C4CCD6]">{pub.venue}</span>
                          </div>
                          {pub.citations > 0 && (
                            <span className="text-[#94A3B8]">
                              {pub.citations} {pub.citations === 1 ? 'citation' : 'citations'}
                            </span>
                          )}
                        </div>

                        {/* Title is a Direct Link to the Paper Website */}
                        <h3 className="mt-3 text-base font-bold leading-snug sm:text-lg">
                          <a
                            href={targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group-hover:text-[#60A5FA] text-[#F3F5F8] transition-colors inline-flex items-center gap-1.5 hover:underline"
                            title={`Open published paper: ${pub.title}`}
                          >
                            <span>{pub.title}</span>
                            <ExternalLink className="h-4 w-4 shrink-0 text-[#60A5FA] opacity-75 group-hover:opacity-100" />
                          </a>
                        </h3>

                        <p className="mt-2 text-xs text-[#94A3B8]">
                          {pub.authors}
                        </p>

                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#60A5FA]">
                            Idea:
                          </span>{' '}
                          {pub.abstract}
                        </p>

                        <p className="mt-3 text-xs font-medium text-[#94A3B8]">
                          <span className="font-mono uppercase tracking-wider text-[#64748B]">
                            Publisher:
                          </span>{' '}
                          <span className="text-[#E2E8F0]">{pub.publisher}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-white/10 bg-[#0A0D12]/60 px-5 py-3.5 sm:px-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open actual published paper for ${pub.title}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/50 bg-[#2563EB]/25 px-3.5 py-1.5 text-xs font-semibold text-[#93C5FD] transition-colors hover:border-[#60A5FA] hover:bg-[#2563EB] hover:text-white whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                        >
                          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                          <span>Official Paper Link</span>
                        </a>

                        {pub.githubUrl && (
                          <a
                            href={pub.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View GitHub code for ${pub.title}`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[#F3F5F8] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                          >
                            <GitHubIcon className="h-3.5 w-3.5" />
                            <span>Code</span>
                          </a>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectPublication(pub)}
                        aria-label={`Inspect paper details and BibTeX for ${pub.title}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#60A5FA] transition-colors hover:text-[#93C5FD] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                      >
                        <span>Details &amp; BibTeX</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. ALL OTHER PEER-REVIEWED PUBLICATIONS IN ONE-LINE FORMAT */}
        {otherPapers.length > 0 && (
          <div className="mt-14">
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                  All Other Peer-Reviewed Publications ({otherPapers.length})
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                Click any paper to open original publication
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {otherPapers.map((pub) => {
                const targetUrl = pub.paperUrl || pub.scholarUrl;
                return (
                  <article
                    key={pub.id}
                    className="group rounded-2xl border border-white/10 bg-[#0E131C]/90 p-5 transition-all duration-200 hover:border-[#3B82F6]/50 hover:bg-[#131A26]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      {/* Paper Name / Title (Clickable) */}
                      <h4 className="text-base font-semibold leading-snug sm:text-lg">
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#F3F5F8] group-hover:text-[#60A5FA] transition-colors inline-flex items-center gap-1.5 hover:underline"
                          title={`Open published paper: ${pub.title}`}
                        >
                          <span>{pub.title}</span>
                          <ExternalLink className="h-4 w-4 shrink-0 text-[#60A5FA] opacity-75 group-hover:opacity-100" />
                        </a>
                      </h4>

                      <div className="flex items-center gap-2 font-mono text-xs text-[#8B95A5] shrink-0">
                        <span className="font-semibold text-[#60A5FA]">{pub.year}</span>
                        <span aria-hidden="true" className="text-white/25">·</span>
                        <span className="text-[#C4CCD6]">{pub.venue}</span>
                      </div>
                    </div>

                    {/* Under Paper Name: Little idea about paper */}
                    <p className="mt-2 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#60A5FA]">
                        Idea:
                      </span>{' '}
                      {pub.abstract}
                    </p>

                    {/* Metadata & Direct Links */}
                    <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs">
                      <div className="flex flex-wrap items-center gap-2 text-[#94A3B8]">
                        <span className="font-mono uppercase tracking-wider text-[#64748B]">
                          Publisher:
                        </span>
                        <span className="text-[#E2E8F0]">{pub.publisher}</span>
                        {pub.citations > 0 && (
                          <span className="ml-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 font-mono text-[11px] text-[#93C5FD]">
                            {pub.citations} {pub.citations === 1 ? 'citation' : 'citations'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-[#3B82F6]/50 bg-[#2563EB]/20 px-3 py-1 font-semibold text-[#93C5FD] transition-colors hover:border-[#60A5FA] hover:bg-[#2563EB] hover:text-white"
                        >
                          <span>Visit Paper</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                        <button
                          type="button"
                          onClick={() => onSelectPublication(pub)}
                          className="rounded-lg border border-white/10 px-2.5 py-1 text-slate-400 transition-colors hover:border-white/25 hover:text-white cursor-pointer"
                        >
                          BibTeX
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div
            data-testid="publications-empty"
            className="glass-panel mt-8 rounded-2xl border border-white/10 px-6 py-14 text-center"
          >
            <p className="text-base font-semibold text-[#F3F5F8]">
              No matching publications found
            </p>
            <p className="mt-1.5 text-sm text-[#8B95A5]">
              Try adjusting your search keywords or resetting active filters.
            </p>
            <button
              type="button"
              onClick={handleResetAll}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3B82F6]"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

        {/* Bottom CTA to Google Scholar */}
        <div className="mt-14 flex flex-col items-center gap-3 text-center border-t border-white/10 pt-10">
          <a
            href={PROFILE_INFO.links.scholar}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="publications-scholar-cta"
            className="group relative inline-flex min-h-[48px] items-center gap-3 overflow-hidden rounded-full border border-[#3B82F6]/45 bg-gradient-to-b from-[#1E3A8A]/45 via-[#141E33]/90 to-[#0C121D]/95 px-7 py-3 text-sm font-semibold text-[#F3F5F8] backdrop-blur-md shadow-[inset_0_1px_0_rgba(147,197,253,0.2),0_14px_30px_-8px_rgba(37,99,235,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#60A5FA] hover:shadow-[inset_0_1px_0_rgba(147,197,253,0.35),0_18px_38px_-8px_rgba(37,99,235,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            <GoogleScholarIcon className="h-4 w-4 shrink-0 text-[#60A5FA] transition-colors group-hover:text-white" />
            <span className="tracking-wide">
              View Complete Verified Citation Record in Google Scholar
            </span>
            <span className="font-mono text-xs font-semibold tabular-nums rounded-full border border-[#3B82F6]/40 bg-[#2563EB]/20 px-2.5 py-0.5 text-[#93C5FD] group-hover:border-[#60A5FA] group-hover:text-white">
              {PUBLICATIONS.length} Papers
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-[#93C5FD] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}
