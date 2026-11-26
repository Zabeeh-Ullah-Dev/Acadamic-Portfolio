import {
  ArrowUpRight,
  ExternalLink,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { PROFILE_INFO as DEFAULT_PROFILE, PUBLICATIONS as DEFAULT_PUBLICATIONS } from '../data/portfolioData';
import { usePortfolioData } from '../context/PortfolioContext';
import {
  filterAndSortPublications,
  getCategoryCounts,
  getCodeBackedCount,
  getPaperHref,
  isPublicationFilterActive,
  partitionPublications,
} from '../utils/publicationsFilter';
import { GitHubIcon, GoogleScholarIcon } from './BrandIcons';
import { ExpandableSearch } from './ExpandableSearch';
import { PublicationSchematic } from './PublicationSchematic';
import { SkillBubbleCloud } from './SkillBubbleCloud';

export function PublicationsSection({
  category,
  searchQuery,
  sortMode,
  onlyWithCode,
  focusedPublicationId = null,
  activeSphereLabel = '',
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onToggleOnlyWithCode,
  onClearFocusedPublication,
  onApplySphereFilter,
  onResetFilters,
  onSelectPublication,
}) {
  const portfolioData = usePortfolioData();
  const PUBLICATIONS = portfolioData?.publications || DEFAULT_PUBLICATIONS;
  const PROFILE_INFO = portfolioData?.profile || DEFAULT_PROFILE;

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

  const focusedPaper = focusedPublicationId
    ? filtered.find((p) => p.id === focusedPublicationId) ||
      PUBLICATIONS.find((p) => p.id === focusedPublicationId)
    : null;

  const { featuredWithDiagrams, compactOneLine } = focusedPaper
    ? { featuredWithDiagrams: [focusedPaper], compactOneLine: [] }
    : partitionPublications(filtered, {
        preserveFeaturedOrder: sortMode === 'year-desc',
      });

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

  return (
    <section
      id="publications"
      className="bg-[#0C0F14] py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#60A5FA]">
              Peer-Reviewed Output
            </p>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl">
              Publications &amp; Research Archive
            </h2>
            <p className="mt-3 text-base leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
              Explore via the interactive 3D topic sphere below, browse 6 flagship papers with architectural diagrams, and access all {PUBLICATIONS.length} peer-reviewed publications directly on their official publisher websites.
            </p>
          </div>

          <a
            href={PROFILE_INFO.links.scholar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-[#3B82F6]/45 bg-[#2563EB]/15 px-4 py-2 text-xs font-semibold text-[#93C5FD] transition-colors hover:border-[#60A5FA] hover:bg-[#2563EB]/30 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
          >
            <GoogleScholarIcon className="h-4 w-4 shrink-0" />
            <span>Google Scholar ({PUBLICATIONS.length})</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Interactive 3D Ball Filter Above Publications */}
        <SkillBubbleCloud
          variant="publications"
          onLiveFilter={(nextCategory, nextQuery, label) => {
            if (onApplySphereFilter) {
              onApplySphereFilter(nextCategory, nextQuery, label);
            } else {
              onCategoryChange(nextCategory);
              onSearchChange(nextQuery);
            }
          }}
          onClearFilter={handleResetAll}
          onSelectPublication={onSelectPublication}
        />

        {/* Category Tabs, GitHub Code Toggle, Sort & Expandable Search */}
        <div
          id="publications-results"
          className="scroll-mt-24 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-8"
        >
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

          <div className="ml-auto flex flex-wrap items-center justify-end gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 text-sm">
              <label htmlFor="pub-sort-select" className="text-xs font-medium text-[#8B95A5]">
                Sort
              </label>
              <select
                id="pub-sort-select"
                value={sortMode}
                onChange={(e) => onSortChange(e.target.value)}
                className="rounded-lg border border-white/15 bg-[#141922] px-3 py-2 text-xs font-medium text-[#F3F5F8] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              >
                <option value="year-desc">Featured / Newest</option>
                <option value="citations-desc">Most Cited</option>
              </select>
            </div>

            <ExpandableSearch
              id="publication-search"
              value={searchQuery}
              onChange={onSearchChange}
              placeholder={`Search ${PUBLICATIONS.length} papers by title, venue, year...`}
              ariaLabel="Search publications by title, venue, publisher, year, or keyword"
              buttonLabel="Search publications"
              testIdPrefix="pub-search"
            />
          </div>
        </div>

        {/* Result Status Line */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#8B95A5]">
          <p data-testid="publications-count" className="font-mono tabular-nums">
            {focusedPublicationId
              ? `Focused exact paper from spotlight (${PUBLICATIONS.length} total archive)`
              : filterActive
                ? `Showing ${filtered.length} matching publications${activeSphereLabel ? ` · 3D Filter: ${activeSphereLabel}` : ''} (${PUBLICATIONS.length} total)`
                : `Showing ${featuredWithDiagrams.length} featured papers with diagrams + ${compactOneLine.length} additional papers (${PUBLICATIONS.length} total)`}
          </p>
          {filterActive && (
            <button
              type="button"
              onClick={focusedPublicationId ? onClearFocusedPublication || handleResetAll : handleResetAll}
              className="inline-flex items-center gap-1 font-medium text-[#60A5FA] hover:text-[#93C5FD] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{focusedPublicationId ? 'Show all papers' : 'Reset filters'}</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {featuredWithDiagrams.length === 0 && compactOneLine.length === 0 ? (
          <div
            data-testid="publications-empty"
            className="glass-panel mt-8 rounded-2xl border border-white/10 px-6 py-14 text-center"
          >
            <p className="text-base font-semibold text-[#F3F5F8]">
              No matching publications found
            </p>
            <p className="mt-1.5 text-sm text-[#8B95A5]">
              Try selecting another orb on the 3D sphere, adjusting your search keywords, or resetting active filters.
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
            {/* 6 Featured Publications WITH Proper Architectural Diagrams */}
            {featuredWithDiagrams.length > 0 && (
              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-[#F3F5F8]">
                    {focusedPaper
                      ? 'Spotlight Publication'
                      : 'Featured Publications with Diagrams'}
                  </h3>
                  <span className="font-mono text-xs text-[#60A5FA] tabular-nums">
                    {featuredWithDiagrams.length}{' '}
                    {featuredWithDiagrams.length === 1 ? 'paper' : 'papers'}
                  </span>
                </div>

                <div
                  data-testid="publications-grid"
                  className="grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                  {featuredWithDiagrams.map((pub, idx) => {
                    const paperHref = getPaperHref(pub);
                    const isFocusedPaper = focusedPublicationId === pub.id;

                    return (
                      <article
                        key={pub.id}
                        id={`publication-card-${pub.id}`}
                        data-testid={`publication-card-${pub.id}`}
                        data-featured="true"
                        data-focused={isFocusedPaper ? 'true' : undefined}
                        className={`glass-panel group flex scroll-mt-28 flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/55 ${
                          isFocusedPaper
                            ? 'col-span-1 border-[#60A5FA]/80 bg-gradient-to-br from-[#16233D]/95 via-[#111827]/95 to-[#0D121C] md:col-span-2'
                            : 'border-white/10'
                        }`}
                      >
                        <div>
                          <a
                            href={paperHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${pub.title} official paper website`}
                            className="block aspect-video w-full overflow-hidden border-b border-white/10 bg-[#F8FAFC] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                          >
                            <PublicationSchematic
                              type={pub.schematic}
                              seed={pub.index}
                              figureUrl={pub.figureUrl}
                              title={pub.title}
                              venue={pub.venue}
                            />
                          </a>

                          <div className="p-5 sm:p-6">
                            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#8B95A5] tabular-nums">
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="font-semibold text-[#38BDF8]">
                                  0{idx + 1}
                                </span>
                                <span aria-hidden="true" className="text-white/25">·</span>
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

                            <h4 className="mt-2.5 text-base font-semibold leading-snug text-[#F3F5F8] sm:text-lg">
                              <a
                                href={paperHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-start gap-1.5 transition-colors hover:text-[#60A5FA] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                              >
                                <span>{pub.title}</span>
                                <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-[#60A5FA] opacity-75 group-hover:opacity-100" />
                              </a>
                            </h4>

                            <p className="mt-1.5 text-xs text-[#94A3B8]">
                              {pub.authors}
                            </p>

                            <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
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
                              href={paperHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Read ${pub.title} on official publisher website`}
                              className="inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/50 bg-[#2563EB]/20 px-3 py-1.5 text-xs font-semibold text-[#93C5FD] transition-colors hover:border-[#60A5FA] hover:bg-[#2563EB]/35 hover:text-white whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                            >
                              <FileText className="h-3.5 w-3.5 shrink-0" />
                              <span>Read Paper</span>
                              <ExternalLink className="h-3 w-3 opacity-80" />
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

            {/* All Remaining Publications: Paper Name + Concise Idea Underneath (Without Diagrams) */}
            {compactOneLine.length > 0 && (
              <div className="mt-12">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-[#F3F5F8]">
                      All Other Publications
                    </h3>
                    <p className="mt-0.5 text-xs text-[#8B95A5]">
                      Paper titles with a brief overview underneath — click any paper name to open its official publisher website directly.
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#60A5FA] tabular-nums">
                    {compactOneLine.length}{' '}
                    {compactOneLine.length === 1 ? 'paper' : 'papers'}
                  </span>
                </div>

                <ul
                  data-testid="publications-compact-list"
                  className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#101520]/80"
                >
                  {compactOneLine.map((pub) => {
                    const paperHref = getPaperHref(pub);
                    return (
                      <li
                        key={pub.id}
                        data-testid={`publication-row-${pub.id}`}
                        className="group px-4 py-4 transition-colors hover:bg-white/[0.03] sm:px-5"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start gap-3">
                              <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-[#60A5FA] tabular-nums">
                                {pub.year}
                              </span>
                              <div className="min-w-0 flex-1">
                                <a
                                  href={paperHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={`${pub.title} — ${pub.venue} (${pub.publisher})`}
                                  className="inline-flex items-start gap-1.5 text-sm font-semibold leading-snug text-[#F3F5F8] transition-colors hover:text-[#60A5FA] focus-visible:outline-2 focus-visible:outline-[#3B82F6] sm:text-[15px]"
                                >
                                  <span>{pub.title}</span>
                                  <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-[#60A5FA] opacity-75 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                </a>
                                {pub.abstract && (
                                  <p
                                    data-testid={`publication-idea-${pub.id}`}
                                    className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#94A3B8] sm:text-sm"
                                  >
                                    {pub.abstract}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-3 pl-11 sm:pl-0 sm:pt-0.5">
                            <span className="max-w-[200px] truncate font-mono text-xs text-[#8B95A5]">
                              {pub.venue}
                            </span>
                            {pub.githubUrl && (
                              <a
                                href={pub.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`GitHub code for ${pub.title}`}
                                title="GitHub Code"
                                className="inline-flex items-center text-[#94A3B8] transition-colors hover:text-[#60A5FA]"
                              >
                                <GitHubIcon className="h-3.5 w-3.5" />
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => onSelectPublication(pub)}
                              aria-label={`BibTeX for ${pub.title}`}
                              className="font-mono text-[11px] font-medium text-[#8B95A5] transition-colors hover:text-[#60A5FA]"
                            >
                              BibTeX
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
