import { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GitHubIcon } from './BrandIcons';
import { parsePresetHeading } from '../utils/skillGame';

export const ResearchBentoCard = memo(function ResearchBentoCard({
  preset,
  visual,
  colSpanClass,
  isSelected,
  matchState,
  focusedSkillShortName,
  isDimmed,
  onToggle,
}) {
  const { title, tag } = parsePresetHeading(preset);
  const isCrossHighlighted = !isSelected && matchState === 'direct';
  const isRelatedHighlight = !isSelected && matchState === 'related';

  const cardSurfaceClass = isSelected
    ? visual.activeBorder
    : isCrossHighlighted
      ? `${visual.activeBorder} ring-1 ring-white/10`
      : isRelatedHighlight
        ? 'border-white/20 bg-gradient-to-b from-[#151D2D]/95 to-[#0B0F17]/95 hover:-translate-y-0.5 hover:border-white/30'
        : 'border-white/10 bg-gradient-to-b from-[#131926]/90 to-[#0B0F17]/95 hover:-translate-y-0.5 hover:border-white/22 hover:from-[#161E2E]';

  const rawSkills = Array.isArray(preset?.skills) ? preset.skills : [];
  const compactSkills = rawSkills.slice(0, 2).map((s) =>
    (s || '')
      .split(' (')[0]
      .replace('Local embeddings', 'Embeddings')
      .replace('TensorFlow / Keras', 'TF / Keras')
      .replace('Spectral graph methods', 'Spectral Graphs')
  );
  let footerStatusText = compactSkills.join(' · ');
  let footerStatusClass = 'text-[#64748B]';

  if (isSelected) {
    footerStatusText = 'Stack highlighted below';
    footerStatusClass = visual.kicker;
  } else if (isCrossHighlighted && focusedSkillShortName) {
    footerStatusText = `Uses ${focusedSkillShortName}`;
    footerStatusClass = visual.kicker;
  } else if (isRelatedHighlight && focusedSkillShortName) {
    footerStatusText = `Paired with ${focusedSkillShortName}`;
    footerStatusClass = 'text-[#94A3B8]';
  }

  return (
    <article
      data-testid={`preset-btn-${preset.id}`}
      data-match-state={isSelected ? 'selected' : matchState}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-[transform,opacity,border-color,background-color] duration-200 ${colSpanClass} ${cardSurfaceClass} ${
        isDimmed ? 'opacity-60 hover:opacity-100' : 'opacity-100'
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent ${visual.topLine} to-transparent transition-opacity duration-200 ${
          isSelected || isCrossHighlighted
            ? 'opacity-100'
            : 'opacity-30 group-hover:opacity-85'
        }`}
      />

      <button
        type="button"
        aria-pressed={isSelected}
        onClick={() => onToggle(preset)}
        className="flex flex-1 flex-col text-left focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
          <p className={`font-mono text-[10.5px] font-medium ${visual.kicker}`}>
            {preset.name}
          </p>
          {tag && (
            <span className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-[#94A3B8] whitespace-nowrap">
              {tag}
            </span>
          )}
        </div>

        <h3 className="mt-2.5 text-[15px] font-semibold leading-snug text-[#F8FAFC]">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#94A3B8]">
          {preset.summary}
        </p>
      </button>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-3 text-xs">
        <span className={`truncate font-mono text-[10.5px] ${footerStatusClass}`}>
          {footerStatusText}
        </span>

        <a
          href={preset.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${preset.projectTitle} repository on GitHub`}
          className="group/link inline-flex shrink-0 items-center gap-1 font-medium text-[#93C5FD] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
        >
          <GitHubIcon className="h-3 w-3" />
          <span>Code</span>
          <ArrowUpRight className="icon-nudge-ne h-3 w-3" />
        </a>
      </div>
    </article>
  );
});
