import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ChevronRight,
  Code2,
  Cpu,
  FolderGit2,
  HeartPulse,
  RotateCcw,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  OPEN_SOURCE_CATEGORIES,
  OPEN_SOURCE_PROJECTS as DEFAULT_PROJECTS,
  PROFILE_INFO,
} from '../data/portfolioData';
import { usePortfolioData } from '../context/PortfolioContext';
import {
  filterOpenSourceProjects,
  getVisibleOpenSourceProjects,
  isOpenSourceFilterActive,
} from '../utils/openSourceFilter';
import { GitHubIcon, GoogleScholarIcon } from './BrandIcons';
import { ExpandableSearch } from './ExpandableSearch';

export function OpenSourceSection({
  initialLimit = 6,
  showAllByDefault = false,
  variant = 'page',
  onViewAll,
} = {}) {
  const portfolioData = usePortfolioData();
  const OPEN_SOURCE_PROJECTS = portfolioData?.projects || DEFAULT_PROJECTS;

  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  const filteredProjects = useMemo(
    () =>
      filterOpenSourceProjects(OPEN_SOURCE_PROJECTS, {
        category: activeCategory,
        searchQuery: query,
      }),
    [OPEN_SOURCE_PROJECTS, activeCategory, query]
  );

  const filterActive = isOpenSourceFilterActive({
    category: activeCategory,
    searchQuery: query,
    showAll: showAllByDefault,
  });

  const hasUserFilter = activeCategory !== 'all' || query.trim() !== '';

  const visibleProjects = useMemo(
    () =>
      getVisibleOpenSourceProjects(filteredProjects, {
        category: activeCategory,
        searchQuery: query,
        showAll: showAllByDefault,
        initialLimit,
      }),
    [filteredProjects, activeCategory, query, showAllByDefault, initialLimit]
  );

  const handleReset = () => {
    setActiveCategory('all');
    setQuery('');
  };

  return (
    <section
      id="projects"
      className={`section-defer relative overflow-hidden bg-[#10141B] ${
        variant === 'home' ? 'py-14 sm:py-16' : 'py-16 sm:py-20'
      }`}
    >
      <div
        aria-hidden="true"
        className="architect-grid-precision pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_50%_0%,black_20%,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.12),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#60A5FA]">
              Open-Source Research Code &amp; Systems
            </p>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl">
              Project &amp; Open-Source Research Code
            </h2>
            <p className="mt-3 text-base leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
              {showAllByDefault
                ? `Complete archive of all ${OPEN_SOURCE_PROJECTS.length} open-source research codebases, benchmarks, and software tools from `
                : `Highlighting ${Math.min(initialLimit, OPEN_SOURCE_PROJECTS.length)} open-source research codebases below — search or explore all ${OPEN_SOURCE_PROJECTS.length} curated suites from `}
              <span className="font-mono text-sm text-[#93C5FD]">@hajigul</span>{' '}
              and{' '}
              <span className="font-mono text-sm text-[#93C5FD]">AdaptiveBotsLab</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href={`${PROFILE_INFO.links.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-[#3B82F6]/45 bg-[#2563EB]/15 px-4 py-2 text-xs font-semibold text-[#F3F5F8] transition-all hover:-translate-y-0.5 hover:border-[#60A5FA] hover:bg-[#2563EB]/30 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
            >
              <GitHubIcon className="h-4 w-4 text-[#60A5FA]" />
              <span>@hajigul Repos</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#93C5FD]" />
            </a>
            <a
              href="https://github.com/AdaptiveBotsLab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-[#C4CCD6] transition-all hover:-translate-y-0.5 hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
            >
              <FolderGit2 className="h-4 w-4 text-[#60A5FA]" />
              <span>AdaptiveBotsLab</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
            </a>
          </div>
        </div>

        {/* Category Tabs & Right-Side Expandable Search Icon */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Filter open-source code by category"
              className="inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#0B0F17]/85 p-1.5 backdrop-blur-xl"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
                className={
                  activeCategory === 'all'
                    ? 'inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_0_20px_-4px_rgba(37,99,235,0.75)] whitespace-nowrap shrink-0 transition-all'
                    : 'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium text-[#94A3B8] hover:bg-white/[0.05] hover:text-[#F3F5F8] whitespace-nowrap shrink-0 transition-colors'
                }
              >
                <span>All Groups</span>
                <span className="font-mono tabular-nums opacity-85">
                  ({OPEN_SOURCE_PROJECTS.length})
                </span>
              </button>

              {OPEN_SOURCE_CATEGORIES.map((cat) => {
                const count = OPEN_SOURCE_PROJECTS.filter((p) => p.category === cat.id).length;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat.id)}
                    className={
                      isActive
                        ? 'inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] px-3.5 py-1.5 text-xs font-semibold text-white shadow-[0_0_20px_-4px_rgba(37,99,235,0.75)] whitespace-nowrap shrink-0 transition-all'
                        : 'inline-flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium text-[#94A3B8] hover:bg-white/[0.05] hover:text-[#F3F5F8] whitespace-nowrap shrink-0 transition-colors'
                    }
                  >
                    <span>{cat.label}</span>
                    <span className="font-mono tabular-nums opacity-85">({count})</span>
                  </button>
                );
              })}
            </div>

            <div className="ml-auto w-full sm:w-auto flex justify-end">
              <ExpandableSearch
                id="oss-search"
                value={query}
                onChange={setQuery}
                placeholder={`Search ${OPEN_SOURCE_PROJECTS.length} code suites (MuCoS, Ollama...)`}
                ariaLabel="Search open-source repositories"
                buttonLabel="Search open-source code"
                testIdPrefix="oss-search"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#8B95A5]">
            <p
              data-testid="oss-projects-count"
              className="font-mono text-xs text-[#8B95A5] tabular-nums"
            >
              {hasUserFilter
                ? `Showing ${visibleProjects.length} matching suites (${OPEN_SOURCE_PROJECTS.length} total)`
                : showAllByDefault
                  ? `Showing all ${visibleProjects.length} open-source projects`
                  : `Showing ${visibleProjects.length} featured projects (${OPEN_SOURCE_PROJECTS.length} total)`}
            </p>
            {hasUserFilter && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#60A5FA] hover:text-[#93C5FD] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Home Interactive Spotlight Carousel OR Full Archive Grid */}
        {visibleProjects.length === 0 ? (
          <div
            data-testid="oss-projects-empty"
            className="glass-panel mt-7 rounded-2xl border border-white/10 px-6 py-12 text-center"
          >
            <p className="text-base font-semibold text-[#F3F5F8]">
              No matching repositories found
            </p>
            <p className="mt-1.5 text-sm text-[#8B95A5]">
              Try clearing your search term or resetting the category filter.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-2 text-xs font-semibold text-white hover:bg-[#3B82F6]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : variant === 'home' && !hasUserFilter ? (() => {
          const safeIndex = Math.min(spotlightIndex, visibleProjects.length - 1);
          const project = visibleProjects[safeIndex];
          const categoryLabel =
            OPEN_SOURCE_CATEGORIES.find((c) => c.id === project.category)?.label || '';
          const isResearchDesk = project.id === 'oss-researchdesk';
          const isCardioRisk = project.id === 'oss-cardiorisk';

          return (
            <div
              data-testid="oss-projects-grid"
              className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch"
            >
              {/* Left: Slim Interactive Selector List (All 6 Projects Visible at a Glance) */}
              <div
                role="tablist"
                aria-label="Select featured open-source project"
                className="flex flex-col gap-2 lg:col-span-5"
              >
                {visibleProjects.map((item, idx) => {
                  const isSelected = idx === safeIndex;
                  const itemCat =
                    OPEN_SOURCE_CATEGORIES.find((c) => c.id === item.category)?.label || '';
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSpotlightIndex(idx)}
                      onMouseEnter={() => setSpotlightIndex(idx)}
                      className={`group flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-[#3B82F6]/55 bg-gradient-to-r from-[#172554]/55 via-[#0E1526]/90 to-[#0B0F17] shadow-[0_12px_32px_-16px_rgba(37,99,235,0.65)]'
                          : 'border-white/[0.07] bg-[#0B0F17]/60 hover:border-white/15 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`font-mono text-xs font-semibold tabular-nums transition-colors ${
                            isSelected ? 'text-[#60A5FA]' : 'text-[#64748B] group-hover:text-[#94A3B8]'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p
                            className={`truncate text-sm font-semibold transition-colors ${
                              isSelected ? 'text-white' : 'text-[#CBD5E1] group-hover:text-white'
                            }`}
                          >
                            {item.name}
                          </p>
                          <p className="truncate text-[11px] text-[#64748B]">
                            {itemCat}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                          isSelected
                            ? 'translate-x-0.5 text-[#60A5FA]'
                            : 'text-[#475569] opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right: Live Detail Showcase Panel */}
              <article
                key={project.id}
                data-testid={`oss-card-${project.id}`}
                className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0B0F17]/95 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_32px_80px_-24px_rgba(0,0,0,0.85)] lg:col-span-7"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/50 to-transparent"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#3B82F6]/10 blur-3xl"
                />

                <div className="relative z-10 flex flex-1 flex-col justify-between gap-6">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-medium text-[#60A5FA]">{categoryLabel}</span>
                        {project.featured && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-[#E2E8F0]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
                            Featured
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-[#64748B] tabular-nums">
                        {safeIndex + 1} / {visibleProjects.length}
                      </span>
                    </div>

                    <div className="mt-4 flex items-start gap-4">
                      {(isResearchDesk || isCardioRisk) && (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#93C5FD]">
                          {isResearchDesk ? (
                            <Cpu className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <HeartPulse className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      )}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#F3F5F8]">
                          {project.name}
                        </h3>
                        <p className="mt-1 text-xs font-mono text-[#8B95A5]">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {isResearchDesk ? (
                      <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs">
                        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5">
                          <p className="font-medium text-[#93C5FD]">01 · Discover</p>
                          <p className="mt-1 leading-relaxed text-[#B8C2D0]">
                            Verified arXiv &amp; OpenAlex paper cards via rules or LLM agent + 13-case eval suite.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5">
                          <p className="font-medium text-[#93C5FD]">02 · Related Work</p>
                          <p className="mt-1 leading-relaxed text-[#B8C2D0]">
                            Cited paragraph built strictly from real arXiv metadata so refs stay factual.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5">
                          <p className="font-medium text-[#93C5FD]">03 · Citation Check</p>
                          <p className="mt-1 leading-relaxed text-[#B8C2D0]">
                            Automated reference verification cross-checked against OpenAlex &amp; arXiv.
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5">
                          <p className="font-medium text-[#93C5FD]">04 · Private PDF Q&amp;A</p>
                          <p className="mt-1 leading-relaxed text-[#B8C2D0]">
                            On-device Ollama RAG over local PDFs with local embeddings &amp; page citations.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 space-y-3">
                        <p className="text-sm sm:text-base leading-relaxed text-[#C4CCD6]">
                          {project.description}
                        </p>
                        {isCardioRisk && (
                          <div className="inline-flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] px-3.5 py-2 text-xs text-amber-200/90">
                            <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden="true" />
                            <span>
                              Educational use only · 81.97% held-out test accuracy on UCI Cleveland (61 patients)
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(Array.isArray(project.stack) ? project.stack : []).slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 font-mono text-[11px] text-[#94A3B8]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      {project.scholarUrl && (
                        <a
                          href={project.scholarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-[#CBD5E1] transition-colors hover:border-white/20 hover:text-white"
                        >
                          <GoogleScholarIcon className="h-3.5 w-3.5" />
                          <span>Paper</span>
                        </a>
                      )}
                      {project.mirrorUrl && (
                        <a
                          href={project.mirrorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-[#CBD5E1] transition-colors hover:border-white/20 hover:text-white"
                        >
                          <span>Mirror</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#3B82F6]/45 bg-[#2563EB]/20 px-4 py-2 text-xs font-semibold text-white transition-all hover:border-[#60A5FA] hover:bg-[#2563EB]/35"
                      >
                        <GitHubIcon className="h-3.5 w-3.5" />
                        <span>Open Repository</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })() : (
          <div
            data-testid="oss-projects-grid"
            className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {visibleProjects.map((project) => {
              const categoryLabel =
                OPEN_SOURCE_CATEGORIES.find((c) => c.id === project.category)?.label || '';
              const isResearchDesk = project.id === 'oss-researchdesk';
              const isCardioRisk = project.id === 'oss-cardiorisk';

              return (
                <article
                  key={project.id}
                  data-testid={`oss-card-${project.id}`}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 ${
                    project.featured
                      ? 'border-white/15 bg-[#0D1320]/90'
                      : 'border-white/[0.08] bg-[#0B0F17]/85'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[11px] font-medium">
                      <span className="truncate font-mono text-[#60A5FA]">{categoryLabel}</span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium text-[#E2E8F0] shrink-0">
                          <Sparkles className="h-3 w-3 text-[#60A5FA]" aria-hidden="true" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-start gap-3">
                      {isResearchDesk && (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#93C5FD]">
                          <Cpu className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                      {isCardioRisk && (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#93C5FD]">
                          <HeartPulse className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold leading-snug text-[#F3F5F8]">
                          {project.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-[11px] text-[#8B95A5]">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {isResearchDesk ? (
                      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                        <div className="rounded-xl border border-white/10 bg-[#080C14]/85 p-3">
                          <p className="font-mono font-semibold text-[#60A5FA]">01 · Discover</p>
                          <p className="mt-1 text-[#C4CCD6]">
                            Verified arXiv &amp; OpenAlex paper cards via rules or LLM agent + 13-case eval suite.
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#080C14]/85 p-3">
                          <p className="font-mono font-semibold text-[#60A5FA]">02 · Related Work</p>
                          <p className="mt-1 text-[#C4CCD6]">
                            Cited paragraph built strictly from real arXiv metadata so refs stay factual.
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#080C14]/85 p-3">
                          <p className="font-mono font-semibold text-[#60A5FA]">03 · Citation Check</p>
                          <p className="mt-1 text-[#C4CCD6]">
                            Automated reference verification cross-checked against OpenAlex &amp; arXiv.
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#080C14]/85 p-3">
                          <p className="font-mono font-semibold text-[#60A5FA]">04 · Private PDF Q&amp;A</p>
                          <p className="mt-1 text-[#C4CCD6]">
                            On-device Ollama RAG over local PDFs with local embeddings &amp; page citations.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="mt-3 text-sm leading-relaxed text-[#C4CCD6]">
                          {project.description}
                        </p>
                        {isCardioRisk && (
                          <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-500/25 bg-amber-500/[0.06] px-3.5 py-2.5 text-xs text-amber-200/90">
                            <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden="true" />
                            <span>
                              Educational use only · 81.97% held-out test accuracy on UCI Cleveland (61 patients)
                            </span>
                          </div>
                        )}
                      </>
                    )}

                    {project.relatedRepos && project.relatedRepos.length > 0 && (
                      <div className="mt-3 border-t border-white/10 pt-2.5">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-[#8B95A5]">
                          Related Repositories
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {project.relatedRepos.map((rel) => (
                            <a
                              key={rel.url}
                              href={rel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-md border border-white/12 bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-[#93C5FD] transition-colors hover:border-[#3B82F6] hover:text-white"
                            >
                              <span>{rel.label}</span>
                              <ArrowUpRight className="h-2.5 w-2.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#8B95A5]">
                      <Code2 className="h-3.5 w-3.5 text-[#60A5FA]" aria-hidden="true" />
                      <span className="truncate max-w-[200px]">
                        {Array.isArray(project.stack)
                          ? project.stack.slice(0, 3).join(' · ')
                          : (project.stack || '')}
                      </span>
                    </span>

                    <div className="flex items-center gap-2">
                      {project.scholarUrl && (
                        <a
                          href={project.scholarUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Google Scholar entry for ${project.name}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#C4CCD6] hover:border-[#3B82F6] hover:text-[#60A5FA]"
                        >
                          <GoogleScholarIcon className="h-3 w-3" />
                          <span>Paper</span>
                        </a>
                      )}
                      {project.mirrorUrl && (
                        <a
                          href={project.mirrorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#C4CCD6] hover:border-[#3B82F6] hover:text-[#60A5FA]"
                        >
                          <span>Mirror</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.name} GitHub repository`}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#3B82F6]/40 bg-[#2563EB]/15 px-3 py-1.5 text-xs font-semibold text-[#93C5FD] transition-colors hover:border-[#60A5FA] hover:bg-[#2563EB]/30 hover:text-white"
                      >
                        <GitHubIcon className="h-3.5 w-3.5" />
                        <span>GitHub</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Clean Bottom CTA: Home navigates to Code page via View All; Code page links to GitHub */}
        {filteredProjects.length > 0 && (
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            {variant === 'home' && !showAllByDefault ? (
              <div className="flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href="#/projects"
                  onClick={(e) => {
                    if (onViewAll) {
                      e.preventDefault();
                      onViewAll();
                    }
                  }}
                  data-testid="oss-view-all-btn"
                  className="hover-sheen group relative inline-flex min-h-[46px] items-center gap-3 overflow-hidden rounded-xl border border-[#3B82F6]/45 bg-gradient-to-b from-[#172554]/55 via-[#111827]/95 to-[#0B0F18]/95 px-6 py-2.5 text-sm font-medium text-[#F1F5F9] backdrop-blur-md shadow-[inset_0_1px_0_rgba(147,197,253,0.22),0_12px_28px_-10px_rgba(37,99,235,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#60A5FA]/80 hover:text-white hover:shadow-[inset_0_1px_0_rgba(191,219,254,0.35),0_16px_36px_-10px_rgba(37,99,235,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/75 to-transparent"
                  />
                  <FolderGit2 className="h-4 w-4 shrink-0 text-[#60A5FA] transition-colors group-hover:text-[#93C5FD]" aria-hidden="true" />
                  <span className="tracking-[0.01em]">View All Projects</span>
                  <span className="font-mono text-xs tabular-nums text-[#93C5FD]/90">
                    {OPEN_SOURCE_PROJECTS.length}
                  </span>
                  <ArrowUpRight className="icon-nudge-ne h-4 w-4 shrink-0 text-[#60A5FA] transition-colors group-hover:text-white" aria-hidden="true" />
                </a>

                <a
                  href={`${PROFILE_INFO.links.github}?tab=repositories`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="oss-github-cta"
                  className="group inline-flex min-h-[46px] items-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.025] px-5 py-2.5 text-sm font-medium text-[#CBD5E1] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                >
                  <GitHubIcon className="h-4 w-4 shrink-0 text-[#94A3B8] transition-colors group-hover:text-[#60A5FA]" />
                  <span>Explore on GitHub</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#64748B] transition-colors group-hover:text-[#93C5FD]" />
                </a>
              </div>
            ) : (
              <a
                href={`${PROFILE_INFO.links.github}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="oss-github-cta"
                className="hover-sheen group relative inline-flex min-h-[46px] items-center gap-3 overflow-hidden rounded-xl border border-[#3B82F6]/45 bg-gradient-to-b from-[#172554]/55 via-[#111827]/95 to-[#0B0F18]/95 px-6 py-2.5 text-sm font-medium text-[#F1F5F9] backdrop-blur-md shadow-[inset_0_1px_0_rgba(147,197,253,0.22),0_12px_28px_-10px_rgba(37,99,235,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#60A5FA]/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/75 to-transparent"
                />
                <GitHubIcon className="icon-spring h-4 w-4 shrink-0 text-[#60A5FA] group-hover:text-white" />
                <span className="tracking-[0.01em]">Explore All Projects on GitHub</span>
                <span className="font-mono text-xs tabular-nums text-[#93C5FD]/90">
                  {OPEN_SOURCE_PROJECTS.length}+
                </span>
                <ArrowUpRight className="icon-nudge-ne h-4 w-4 shrink-0 text-[#60A5FA] group-hover:text-white" />
              </a>
            )}

            {!filterActive && !showAllByDefault && (
              <p className="font-mono text-xs text-[#8B95A5]">
                Showing {visibleProjects.length} of {OPEN_SOURCE_PROJECTS.length} projects · Open Code page for the full repository suite
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
