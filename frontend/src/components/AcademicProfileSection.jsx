import { useCallback, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  Code2,
  Cpu,
  Globe,
  Layers,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { TECHNICAL_SKILLS_STACK } from '../data/portfolioData';
import { ResearchBentoCard } from './ResearchBentoCard';
import { SkillMatrix } from './SkillMatrix';
import { TeachingSkillTree } from './TeachingSkillTree';
import {
  SKILL_LOADOUT_PRESETS,
  getMatchedPresetsForSkill,
  getSkillMetadata,
} from '../utils/skillGame';

const CATEGORY_VISUALS = {
  'skill-programming': {
    Icon: Code2,
    accent: 'text-[#60A5FA]',
    iconBox: 'bg-[#2563EB]/16 text-[#93C5FD] border-[#3B82F6]/30',
    topLine: 'via-[#60A5FA]/70',
    activeBg: 'bg-[#2563EB]/18 text-white',
    barColor: 'from-[#3B82F6] to-[#60A5FA]',
  },
  'skill-ml-frameworks': {
    Icon: Layers,
    accent: 'text-indigo-300',
    iconBox: 'bg-indigo-500/16 text-indigo-300 border-indigo-400/30',
    topLine: 'via-indigo-400/70',
    activeBg: 'bg-indigo-500/18 text-white',
    barColor: 'from-indigo-500 to-indigo-300',
  },
  'skill-methods': {
    Icon: Sparkles,
    accent: 'text-sky-300',
    iconBox: 'bg-sky-500/16 text-sky-300 border-sky-400/30',
    topLine: 'via-sky-400/70',
    activeBg: 'bg-sky-500/18 text-white',
    barColor: 'from-sky-500 to-sky-300',
  },
  'skill-llm-tooling': {
    Icon: Cpu,
    accent: 'text-cyan-300',
    iconBox: 'bg-cyan-500/16 text-cyan-300 border-cyan-400/30',
    topLine: 'via-cyan-400/70',
    activeBg: 'bg-cyan-500/18 text-white',
    barColor: 'from-cyan-500 to-cyan-300',
  },
  'skill-tools': {
    Icon: Wrench,
    accent: 'text-emerald-300',
    iconBox: 'bg-emerald-500/16 text-emerald-300 border-emerald-400/30',
    topLine: 'via-emerald-400/70',
    activeBg: 'bg-emerald-500/18 text-white',
    barColor: 'from-emerald-500 to-emerald-300',
  },
  'skill-languages': {
    Icon: Globe,
    accent: 'text-amber-300',
    iconBox: 'bg-amber-500/16 text-amber-200 border-amber-400/30',
    topLine: 'via-amber-400/70',
    activeBg: 'bg-amber-500/18 text-white',
    barColor: 'from-amber-500 to-amber-300',
  },
  'skill-training': {
    Icon: Award,
    accent: 'text-violet-300',
    iconBox: 'bg-violet-500/16 text-violet-300 border-violet-400/30',
    topLine: 'via-violet-400/70',
    activeBg: 'bg-violet-500/18 text-white',
    barColor: 'from-violet-500 to-violet-300',
  },
};

const PRESET_VISUALS = {
  'preset-kgc': {
    topLine: 'via-[#60A5FA]/80',
    kicker: 'text-[#60A5FA]',
    activeBorder:
      'border-[#60A5FA]/80 bg-gradient-to-b from-[#172554]/60 to-[#0D1322] shadow-[0_18px_40px_-20px_rgba(37,99,235,0.85)]',
  },
  'preset-agent': {
    topLine: 'via-cyan-400/80',
    kicker: 'text-cyan-300',
    activeBorder:
      'border-cyan-400/80 bg-gradient-to-b from-cyan-950/60 to-[#0D1322] shadow-[0_18px_40px_-20px_rgba(34,211,238,0.75)]',
  },
  'preset-clinical': {
    topLine: 'via-rose-400/80',
    kicker: 'text-rose-300',
    activeBorder:
      'border-rose-400/80 bg-gradient-to-b from-rose-950/55 to-[#0D1322] shadow-[0_18px_40px_-20px_rgba(244,63,94,0.75)]',
  },
  'preset-spectral': {
    topLine: 'via-emerald-400/80',
    kicker: 'text-emerald-300',
    activeBorder:
      'border-emerald-400/80 bg-gradient-to-b from-emerald-950/55 to-[#0D1322] shadow-[0_18px_40px_-20px_rgba(16,185,129,0.75)]',
  },
};

// Asymmetric 12-col interlocked Bento rhythm: Row 1 (7 + 5), Row 2 (5 + 7)
const PRESET_BENTO_SPANS = {
  'preset-kgc': 'sm:col-span-7',
  'preset-agent': 'sm:col-span-5',
  'preset-clinical': 'sm:col-span-5',
  'preset-spectral': 'sm:col-span-7',
};

export function AcademicProfileSection() {
  const [skillCategoryFilter, setSkillCategoryFilter] = useState('all');
  const [skillQuery, setSkillQuery] = useState('');
  const [activePresetId, setActivePresetId] = useState(null);
  const [focusedSkillName, setFocusedSkillName] = useState('Python (primary)');

  const activePreset = useMemo(
    () => SKILL_LOADOUT_PRESETS.find((p) => p.id === activePresetId) || null,
    [activePresetId]
  );

  const visibleSkillGroups = useMemo(() => {
    const baseGroups =
      skillCategoryFilter === 'all'
        ? TECHNICAL_SKILLS_STACK
        : TECHNICAL_SKILLS_STACK.filter((g) => g.id === skillCategoryFilter);
    const trimmed = skillQuery.trim().toLowerCase();
    if (!trimmed) return baseGroups;
    return baseGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.toLowerCase().includes(trimmed) ||
            group.category.toLowerCase().includes(trimmed)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [skillCategoryFilter, skillQuery]);

  const totalSkillsCount = useMemo(
    () => TECHNICAL_SKILLS_STACK.reduce((sum, g) => sum + g.items.length, 0),
    []
  );

  const focusedSkillMeta = useMemo(
    () => getSkillMetadata(focusedSkillName),
    [focusedSkillName]
  );

  const skillPresetMatches = useMemo(
    () => getMatchedPresetsForSkill(focusedSkillMeta.name),
    [focusedSkillMeta.name]
  );

  const matchedBlueprintsForSkill = useMemo(
    () => skillPresetMatches.matchedPresets.slice(0, 2),
    [skillPresetMatches]
  );

  const focusedSkillShortName = useMemo(
    () => focusedSkillMeta.name.split(' (')[0],
    [focusedSkillMeta.name]
  );

  const focusedVisual =
    CATEGORY_VISUALS[focusedSkillMeta.categoryId] ||
    CATEGORY_VISUALS['skill-programming'];

  const handleTogglePreset = useCallback((preset) => {
    setActivePresetId((prev) => {
      if (prev === preset.id) {
        return null;
      }
      setSkillCategoryFilter('all');
      setSkillQuery('');
      setFocusedSkillName(preset.skills[0]);
      return preset.id;
    });
  }, []);

  const handleSelectSkill = useCallback((skillName) => {
    setFocusedSkillName(skillName);
    setActivePresetId((prevId) => {
      if (!prevId) return null;
      const currentPreset = SKILL_LOADOUT_PRESETS.find((p) => p.id === prevId);
      return currentPreset && currentPreset.skills.includes(skillName)
        ? prevId
        : null;
    });
  }, []);

  const handleClearPreset = useCallback(() => {
    setActivePresetId(null);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSkillQuery('');
    setSkillCategoryFilter('all');
  }, []);

  const hasDirectPresetMatches = skillPresetMatches.directIds.length > 0;
  const hasAnyPresetMatches =
    hasDirectPresetMatches || skillPresetMatches.relatedIds.length > 0;

  return (
    <section
      id="academic-profile"
      className="section-defer relative overflow-hidden bg-[#10141B] py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="architect-grid pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_50%_0%,black_15%,transparent_80%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl space-y-24 px-4 sm:px-6 lg:px-8">
        {/* Part 1: Subjects Taught & Course Progression */}
        <TeachingSkillTree />

        {/* Part 2: Technical Skills & Core Stack */}
        <section
          id="technical-skills"
          aria-labelledby="technical-skills-heading"
          className="relative scroll-mt-24"
        >
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium tracking-[0.04em] text-[#60A5FA]">
                03E. Engineering &amp; Research Stack
              </p>
              <h2
                id="technical-skills-heading"
                className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                Technical Skills &amp; Core Stack
              </h2>
              <p className="mt-2.5 text-base leading-relaxed text-[#B8C2D0]">
                Languages, deep learning frameworks, graph reasoning methods, and
                local LLM systems powering peer-reviewed research and production
                tools.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-[#94A3B8]">
              <span className="font-semibold text-[#93C5FD] tabular-nums">
                {totalSkillsCount} technologies
              </span>
              <span aria-hidden="true" className="text-white/20">
                ·
              </span>
              <span className="tabular-nums">
                {TECHNICAL_SKILLS_STACK.length} domains
              </span>
            </div>
          </div>

          {/* Top Half: Asymmetric Bento Grid — Active Skill Inspector (Left 5) + Interlocked Research Bento (Right 7) */}
          <div className="mt-8 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-12">
            {/* Left 5 Cols: Active Skill Inspector */}
            <aside
              data-testid="focused-skill-panel"
              aria-label="Active technical skill details"
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-[#131C2E]/95 via-[#0E1523]/95 to-[#0A0E16] p-6 shadow-[0_24px_60px_-28px_rgba(37,99,235,0.45)] lg:col-span-5"
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${focusedVisual.topLine} to-transparent`}
              />

              <div>
                <div className="flex items-center justify-between gap-3 font-mono text-xs">
                  <span className={`font-semibold ${focusedVisual.accent}`}>
                    {focusedSkillMeta.categoryLabel}
                  </span>
                  <span className="text-[#94A3B8]">{focusedSkillMeta.tier}</span>
                </div>

                <h3 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-[#F8FAFC]">
                  {focusedSkillMeta.name}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[#CBD5E1]">
                  {focusedSkillMeta.context}
                </p>

                {/* Applied Research Depth Meter */}
                <div className="mt-5">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#8B95A5]">
                    <span>Applied Research Depth</span>
                    <span className="font-semibold text-[#E2E8F0] tabular-nums">
                      {focusedSkillMeta.level}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${focusedVisual.barColor} transition-[width] duration-300`}
                      style={{ width: `${focusedSkillMeta.level}%` }}
                    />
                  </div>
                </div>

                {/* Grounded Project Applications */}
                {matchedBlueprintsForSkill.length > 0 && (
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="font-mono text-[11px] font-medium text-[#8B95A5]">
                      Applied In Research Systems
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {matchedBlueprintsForSkill.map((bp) => (
                        <button
                          key={bp.id}
                          type="button"
                          onClick={() => handleTogglePreset(bp)}
                          className="group flex w-full items-center justify-between gap-2 text-left text-xs text-[#CBD5E1] transition-colors hover:text-white"
                        >
                          <span className="truncate font-medium">
                            {bp.projectTitle}
                          </span>
                          <span className="shrink-0 font-mono text-[10.5px] text-[#60A5FA] opacity-80 group-hover:opacity-100">
                            Inspect
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Connected Stack Partners */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-mono text-[11px] font-medium text-[#8B95A5]">
                  Frequently Paired With
                </p>
                {focusedSkillMeta.synergies.length > 0 ? (
                  <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
                    {focusedSkillMeta.synergies.slice(0, 4).map((partner) => (
                      <button
                        key={partner}
                        type="button"
                        onClick={() => handleSelectSkill(partner)}
                        className="group inline-flex items-center gap-1 text-xs font-medium text-[#93C5FD] transition-colors hover:text-white"
                      >
                        <span>{partner.split(' (')[0]}</span>
                        <ArrowRight
                          className="h-3 w-3 opacity-60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-1.5 text-xs text-[#64748B]">
                    Select any technology chip in the unified matrix below to inspect details.
                  </p>
                )}
              </div>
            </aside>

            {/* Right 7 Cols: Asymmetric 12-Col Interlocked Research Bento Grid */}
            <div
              data-testid="research-bento-grid"
              className="grid grid-cols-1 gap-4 sm:grid-cols-12 lg:col-span-7"
            >
              {SKILL_LOADOUT_PRESETS.map((preset) => {
                const isSelected = activePresetId === preset.id;
                const isDirectMatch = skillPresetMatches.directIds.includes(
                  preset.id
                );
                const isRelatedMatch =
                  !isDirectMatch &&
                  !hasDirectPresetMatches &&
                  skillPresetMatches.relatedIds.includes(preset.id);

                const matchState = isDirectMatch
                  ? 'direct'
                  : isRelatedMatch
                    ? 'related'
                    : 'none';

                const isDimmed = activePresetId
                  ? !isSelected
                  : hasAnyPresetMatches && matchState === 'none';

                const pVisual =
                  PRESET_VISUALS[preset.id] || PRESET_VISUALS['preset-kgc'];
                const colSpanClass =
                  PRESET_BENTO_SPANS[preset.id] || 'sm:col-span-6';

                return (
                  <ResearchBentoCard
                    key={preset.id}
                    preset={preset}
                    visual={pVisual}
                    colSpanClass={colSpanClass}
                    isSelected={isSelected}
                    matchState={matchState}
                    focusedSkillShortName={focusedSkillShortName}
                    isDimmed={isDimmed}
                    onToggle={handleTogglePreset}
                  />
                );
              })}
            </div>
          </div>

          {/* Bottom Half: Unified Interactive Skill Matrix with Compact Skill Chips */}
          <SkillMatrix
            allGroups={TECHNICAL_SKILLS_STACK}
            visibleGroups={visibleSkillGroups}
            categoryVisuals={CATEGORY_VISUALS}
            skillCategoryFilter={skillCategoryFilter}
            onSelectCategory={setSkillCategoryFilter}
            skillQuery={skillQuery}
            onSearchChange={setSkillQuery}
            focusedSkillName={focusedSkillName}
            focusedSynergies={focusedSkillMeta.synergies}
            activePreset={activePreset}
            onClearPreset={handleClearPreset}
            onSelectSkill={handleSelectSkill}
            onResetFilters={handleResetFilters}
          />
        </section>
      </div>
    </section>
  );
}
