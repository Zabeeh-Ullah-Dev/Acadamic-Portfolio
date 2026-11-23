import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
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

const INITIAL_VISIBLE_REPOS = 2;

export function OpenSourceSection() {
  const portfolioData = usePortfolioData();
  const OPEN_SOURCE_PROJECTS = portfolioData?.projects || DEFAULT_PROJECTS;

  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filteredProjects = useMemo(
    () =>
      filterOpenSourceProjects(OPEN_SOURCE_PROJECTS, {
        category: activeCategory,
        searchQuery: query,
      }),
    [activeCategory, query]
  );

  const filterActive = isOpenSourceFilterActive({
    category: activeCategory,
    searchQuery: query,
    showAll: false,
  });

  const visibleProjects = useMemo(
    () =>
      getVisibleOpenSourceProjects(filteredProjects, {
        category: activeCategory,
        searchQuery: query,
        showAll: false,
        initialLimit: INITIAL_VISIBLE_REPOS,
      }),
    [filteredProjects, activeCategory, query]
  );

  const handleReset = () => {
    setActiveCategory('all');
    setQuery('');
  };

  return (
    <section
      id="projects"
      className="section-defer relative overflow-hidden bg-[#10141B] py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.08),transparent_55%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium tracking-[0.04em] text-[#60A5FA]">
              02B. Open-Source Research Code &amp; Systems
            </p>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl">
              Project &amp; Open-Source Research Code
            </h2>
            <p className="mt-3 text-base leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
              Highlighting 2 flagship open-source codebases below — search or select any research group to inspect all {OPEN_SOURCE_PROJECTS.length} curated suites from{' '}
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
              className="flex flex-wrap items-center gap-2"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
                className={
                  activeCategory === 'all'
                    ? 'inline-flex items-center gap-1.5 rounded-full bg-[#2563EB] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm whitespace-nowrap shrink-0'
                    : 'inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[#C4CCD6] hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0'
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
                        ? 'inline-flex items-center gap-1.5 rounded-full bg-[#2563EB] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm whitespace-nowrap shrink-0'
                        : 'inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[#C4CCD6] hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0'
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
              {filterActive
                ? `Showing ${visibleProjects.length} matching suites (${OPEN_SOURCE_PROJECTS.length} total)`
                : `Showing ${visibleProjects.length} featured repos (${OPEN_SOURCE_PROJECTS.length} total)`}
            </p>
            {filterActive && (
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

        {/* Repository Grid: 2 Columns by Default (2 Featured Cards), 3 Columns When Expanded/Filtered */}
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
        ) : (
          <div
            data-testid="oss-projects-grid"
            className={`mt-7 grid grid-cols-1 gap-5 ${
              !filterActive
                ? 'md:grid-cols-2'
                : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
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
                  className={`glass-panel flex flex-col justify-between rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/50 ${
                    project.featured
                      ? 'border-[#3B82F6]/35 bg-gradient-to-br from-[#172554]/30 via-[#121824] to-[#0E131B]'
                      : 'border-white/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px] font-medium text-[#60A5FA]">
                      <span className="truncate">{categoryLabel}</span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 text-[#93C5FD] shrink-0">
                          <Sparkles className="h-3 w-3" aria-hidden="true" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-start gap-3">
                      {isResearchDesk && (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#60A5FA]/40 bg-[#2563EB]/20 text-[#93C5FD]">
                          <Cpu className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                      {isCardioRisk && (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#60A5FA]/40 bg-[#2563EB]/20 text-[#93C5FD]">
                          <HeartPulse className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                      <div>
                        <h3 className="text-lg font-bold leading-snug text-[#F3F5F8]">
                          {project.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-[11px] text-[#8B95A5]">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {isResearchDesk ? (
                      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                        <div className="rounded-xl border border-white/10 bg-[#0A0E14]/80 p-3">
                          <p className="font-mono font-semibold text-[#60A5FA]">(i) Discover</p>
                          <p className="mt-1 text-[#C4CCD6]">
                            Verified arXiv &amp; OpenAlex paper cards via rules or LLM agent + 13-case eval suite.
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#0A0E14]/80 p-3">
                          <p className="font-mono font-semibold text-[#60A5FA]">(ii) Related Work</p>
                          <p className="mt-1 text-[#C4CCD6]">
                            Cited paragraph built strictly from real arXiv metadata so refs stay factual.
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#0A0E14]/80 p-3">
                          <p className="font-mono font-semibold text-[#60A5FA]">(iii) Citation Check</p>
                          <p className="mt-1 text-[#C4CCD6]">
                            Automated reference verification cross-checked against OpenAlex &amp; arXiv.
                          </p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-[#0A0E14]/80 p-3">
                          <p className="font-mono font-semibold text-[#60A5FA]">(iv) Private PDF Q&amp;A</p>
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

        {/* Clean Single-CTA GitHub Archive Footer */}
        {filteredProjects.length > 0 && (
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <a
              href={`${PROFILE_INFO.links.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="oss-github-cta"
              className="hover-sheen group relative inline-flex min-h-[48px] items-center gap-3 rounded-xl border border-[#3B82F6]/45 bg-gradient-to-b from-[#1E3A8A]/45 via-[#141E33]/90 to-[#0C121D]/95 px-7 py-3 text-sm font-semibold text-[#F3F5F8] backdrop-blur-md shadow-[inset_0_1px_0_rgba(147,197,253,0.2),0_14px_30px_-8px_rgba(37,99,235,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#60A5FA] hover:shadow-[inset_0_1px_0_rgba(147,197,253,0.35),0_18px_38px_-8px_rgba(37,99,235,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
            >
              <GitHubIcon className="icon-spring h-4 w-4 shrink-0 text-[#60A5FA] group-hover:text-white" />
              <span className="tracking-wide">
                View All Repositories on GitHub
              </span>
              <span className="font-mono text-xs font-semibold tabular-nums text-[#93C5FD] group-hover:text-white">
                {OPEN_SOURCE_PROJECTS.length}+
              </span>
              <ArrowUpRight className="icon-nudge-ne h-4 w-4 shrink-0 text-[#93C5FD] group-hover:text-white" />
            </a>

            {!filterActive && (
              <p className="font-mono text-xs text-[#8B95A5]">
                Showing 2 featured codebases · Use search or select any category above to explore all {OPEN_SOURCE_PROJECTS.length} repositories
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
