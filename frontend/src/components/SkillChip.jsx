import { memo } from 'react';
import { getSkillChipTierInfo } from '../utils/skillGame';

function toSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const SkillChip = memo(function SkillChip({
  item,
  categoryId,
  visual,
  isFocused,
  isInPreset,
  isSynergyPartner,
  isDimmed,
  onSelect,
}) {
  const tierInfo = getSkillChipTierInfo(item, categoryId);
  const displayLabel =
    categoryId === 'skill-languages'
      ? item.replace(/\s*\([^)]*\)/, '')
      : item;

  let chipClasses =
    'border-white/10 bg-[#0D121B]/85 text-[#CBD5E1] hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] hover:text-white';

  if (isFocused) {
    chipClasses = `border-[#60A5FA]/80 ${visual.activeBg} shadow-[0_6px_18px_-10px_rgba(37,99,235,0.85)]`;
  } else if (isInPreset) {
    chipClasses = `border-white/30 ${visual.activeBg} font-medium`;
  } else if (isSynergyPartner) {
    chipClasses =
      'border-white/18 bg-white/[0.045] text-[#E2E8F0] hover:-translate-y-0.5 hover:border-white/30 hover:text-white';
  }

  return (
    <button
      type="button"
      data-testid={`skill-node-${toSlug(item)}`}
      aria-pressed={isFocused}
      title={`${item} · ${tierInfo.label}`}
      onClick={() => onSelect(item)}
      className={`group/chip inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-left text-[12px] leading-snug transition-[transform,opacity,background-color,border-color] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#60A5FA] ${chipClasses} ${
        isDimmed ? 'opacity-45 hover:opacity-100 focus-visible:opacity-100' : 'opacity-100'
      }`}
    >
      {/* Subtle tier indicator: solid dot for Core/Production vs ringed dot for Applied/Certified */}
      <span
        aria-hidden="true"
        className={
          tierInfo.kind === 'core'
            ? `h-1.5 w-1.5 shrink-0 rounded-full bg-current ${
                isFocused || isInPreset ? visual.accent : 'opacity-70 group-hover/chip:opacity-100'
              }`
            : `h-1.5 w-1.5 shrink-0 rounded-full border border-current ${
                isFocused || isInPreset ? visual.accent : 'opacity-65 group-hover/chip:opacity-100'
              }`
        }
      />

      <span className={isFocused ? 'font-semibold text-white' : ''}>
        {displayLabel}
      </span>

      <span
        className={`font-mono text-[10px] ${
          isFocused || isInPreset
            ? visual.accent
            : 'text-[#64748B] group-hover/chip:text-[#94A3B8]'
        }`}
      >
        {isInPreset ? 'Active' : tierInfo.label}
      </span>
    </button>
  );
});
