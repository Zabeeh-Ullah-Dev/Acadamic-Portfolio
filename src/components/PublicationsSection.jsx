import { useState } from 'react';
import {
  Search,
  ArrowUpRight,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Layers,
} from 'lucide-react';
import { PUBLICATIONS } from '../data/portfolioData';
import {
  filterAndSortPublications,
  getCategoryCounts,
  getCodeBackedCount,
} from '../utils/publicationsFilter';
import { GitHubIcon } from './BrandIcons';
import { PublicationSchematic } from './PublicationSchematic';

const INITIAL_VISIBLE_COUNT = 2;

export function PublicationsSection({
  category,
  searchQuery,
  sortMode,
  onlyWithCode,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onToggleOnlyWithCode,
  onResetFilters,
  onSelectPublication,
}) {
  const [showAll, setShowAll] = useState(false);

  const counts = getCategoryCounts(PUBLICATIONS);
  const codeCount = getCodeBackedCount(PUBLICATIONS);
  const filtered = filterAndSortPublications(PUBLICATIONS, {
    category,
    searchQuery,
    sortMode,
    onlyWithCode,
  });

  const isSearchOrCodeActive = searchQuery.trim() !== '' || onlyWithCode;
  const shouldExpandAll = showAll || isSearchOrCodeActive;
  const visiblePublications = shouldExpandAll
    ? filtered
    : filtered.slice(0, INITIAL_VISIBLE_COUNT);
  const remainingCount = Math.max(0, filtered.length - visiblePublications.length);

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

  const hasActiveFilters =
    category !== 'all' || searchQuery.trim() !== '' || onlyWithCode;

  const handleResetAll = () => {
    setShowAll(false);
    onResetFilters();
  };

  return (
    <section
      id="publications"
      className="bg-[#0C0F14] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-[#60A5FA]">
              02. Peer-Reviewed Output
            </p>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl">
              Publications &amp; Code Archive
            </h2>
            <p className="mt-3 text-base leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
              Complete record of {PUBLICATIONS.length} papers and chapters (2020–2026), with direct GitHub code links on flagship implementations and 1-click BibTeX export.
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

        {/* Search, Category Tabs & GitHub Code Toggle */}
        <div className="mt-8 space-y-4">
          <div className="relative">
            <label htmlFor="publication-search" className="sr-only">
              Search publications by title, venue, year, or keyword
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B95A5]"
            />
            <input
              id="publication-search"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, venue (e.g., PAKDD, ACL, Physica A), year, or keyword..."
              className="w-full rounded-xl border border-white/15 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-[#F3F5F8] placeholder:text-[#8B95A5] focus:border-[#3B82F6] focus:bg-[#141922] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/30"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Publication category filters"
              className="flex flex-wrap items-center gap-2"
            >
              {tabs.map((tab) => {
                const isActive = category === tab.id;
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
              aria-pressed={onlyWithCode}
              onClick={onToggleOnlyWithCode}
              className={
                onlyWithCode
                  ? 'inline-flex items-center gap-2 rounded-full border border-[#3B82F6] bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#60A5FA]'
                  : 'inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]'
              }
            >
              <GitHubIcon className="h-3.5 w-3.5 shrink-0" />
              <span>GitHub Code ({codeCount})</span>
            </button>
          </div>
        </div>

        {/* Result Status Line */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#8B95A5]">
          <p data-testid="publications-count" className="font-mono tabular-nums">
            Showing {visiblePublications.length} of {filtered.length} publications
            {filtered.length !== PUBLICATIONS.length ? ` (${PUBLICATIONS.length} total)` : ''}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetAll}
              className="inline-flex items-center gap-1 font-medium text-[#60A5FA] hover:text-[#93C5FD] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Publications 2-Column Architectural Grid or Empty State */}
        {filtered.length === 0 ? (
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
        ) : (
          <>
            <div
              data-testid="publications-grid"
              className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {visiblePublications.map((pub) => (
                <article
                  key={pub.id}
                  className="glass-panel group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/45"
                >
                  <div>
                    <div className="h-40 sm:h-44 w-full border-b border-white/10 bg-[#0A0D12]">
                      <PublicationSchematic
                        type={pub.schematic}
                        seed={pub.index}
                        figureUrl={pub.figureUrl}
                        title={pub.title}
                      />
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-[#8B95A5] tabular-nums">
                        <span className="font-semibold text-[#60A5FA]">{pub.year}</span>
                        <span aria-hidden="true" className="text-white/25">·</span>
                        <span className="text-[#C4CCD6]">{pub.venue}</span>
                      </div>

                      <h3 className="mt-2.5 text-base sm:text-lg font-semibold leading-snug text-[#F3F5F8]">
                        {pub.title}
                      </h3>

                      <p className="mt-2.5 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6] line-clamp-3">
                        {pub.abstract}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-3.5 sm:px-6">
                    <span className="max-w-[220px] truncate text-xs text-[#687385]">
                      {pub.publisher}
                    </span>

                    <div className="flex shrink-0 items-center gap-3">
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
                  </div>
                </article>
              ))}
            </div>

            {!isSearchOrCodeActive && filtered.length > INITIAL_VISIBLE_COUNT && (
              <div className="mt-9 flex flex-col items-center gap-2.5 text-center">
                <button
                  type="button"
                  data-testid="publications-view-all-btn"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="group relative inline-flex min-h-[46px] items-center gap-2.5 overflow-hidden rounded-full border border-white/15 bg-gradient-to-b from-[#171D27]/90 via-[#10141B]/90 to-[#0A0D12]/95 px-6 py-2.5 text-sm font-medium text-[#F3F5F8] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_28px_-8px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#60A5FA]/60 hover:shadow-[inset_0_1px_0_rgba(147,197,253,0.3),0_16px_36px_-8px_rgba(37,99,235,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                >
                  {/* Subtle travelling photon laser glint along top edge */}
                  <span
                    aria-hidden="true"
                    className="animate-beam-sweep pointer-events-none absolute top-0 left-0 h-px w-36 bg-gradient-to-r from-transparent via-[#93C5FD] to-transparent opacity-70 group-hover:opacity-100"
                  />

                  {/* Ambient soft glow on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#2563EB]/0 via-[#38BDF8]/10 to-[#2563EB]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {showAll ? (
                    <>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.06] text-[#94A3B8] transition-colors group-hover:text-white">
                        <ChevronUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                      </span>
                      <span className="tracking-wide">Show Fewer (Top 2)</span>
                    </>
                  ) : (
                    <>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.06] text-[#60A5FA] transition-colors group-hover:bg-[#2563EB]/25 group-hover:text-[#93C5FD]">
                        <Layers className="h-3 w-3" />
                      </span>
                      <span className="tracking-wide font-medium">View All Publications</span>
                      <span className="font-mono text-xs font-semibold tabular-nums px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.05] text-[#93C5FD] transition-colors group-hover:border-[#3B82F6]/50 group-hover:bg-[#2563EB]/20 group-hover:text-white">
                        {filtered.length}
                      </span>
                      <ChevronDown className="h-4 w-4 text-[#8B95A5] transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-[#93C5FD]" />
                    </>
                  )}
                </button>

                {!showAll && (
                  <p className="font-mono text-xs text-[#8B95A5]">
                    Showing 2 featured papers · {remainingCount} more available
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
