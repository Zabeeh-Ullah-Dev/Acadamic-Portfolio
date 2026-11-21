import { memo } from 'react';

const STATUS_BADGE_MAP = {
  active: { label: 'Active', cls: 'text-[#93C5FD]' },
  prerequisite: { label: 'Prerequisite', cls: 'text-amber-300' },
  unlocks: { label: 'Unlocks Next', cls: 'text-emerald-300' },
  pathway: { label: 'In Track', cls: 'text-[#93C5FD]' },
};

export const CourseCard = memo(function CourseCard({
  course,
  relation,
  inPathway,
  isDimmed,
  onSelect,
}) {
  let cardStyle =
    'border-white/10 bg-[#0D121B]/80 hover:-translate-y-0.5 hover:border-[#3B82F6]/45 hover:bg-[#121927]';
  let statusBadge = null;

  if (relation === 'active') {
    cardStyle =
      'border-[#60A5FA]/80 bg-gradient-to-br from-[#172554]/55 via-[#121B2E]/90 to-[#0D131F] shadow-[0_14px_34px_-16px_rgba(37,99,235,0.75)]';
    statusBadge = STATUS_BADGE_MAP.active;
  } else if (relation === 'prerequisite') {
    cardStyle =
      'border-amber-400/50 bg-amber-500/[0.06] hover:-translate-y-0.5 hover:border-amber-300/80';
    statusBadge = STATUS_BADGE_MAP.prerequisite;
  } else if (relation === 'unlocks') {
    cardStyle =
      'border-emerald-400/50 bg-emerald-500/[0.06] hover:-translate-y-0.5 hover:border-emerald-300/80';
    statusBadge = STATUS_BADGE_MAP.unlocks;
  } else if (inPathway) {
    cardStyle =
      'border-[#3B82F6]/45 bg-[#131C2E]/85 hover:-translate-y-0.5 hover:border-[#60A5FA]';
    statusBadge = STATUS_BADGE_MAP.pathway;
  }

  return (
    <article className="h-full">
      <button
        type="button"
        data-testid={`course-node-${course.id}`}
        aria-pressed={relation === 'active'}
        onClick={() => onSelect(course.id, { keepPathway: inPathway })}
        className={`hover-sheen group flex h-full w-full flex-col justify-between rounded-xl border px-4 py-3.5 text-left transition-[transform,opacity,border-color,background-color] duration-200 active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-[#60A5FA] ${cardStyle} ${
          isDimmed ? 'opacity-50 hover:opacity-100 focus-visible:opacity-100' : 'opacity-100'
        }`}
      >
        <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
          <span
            className={
              relation === 'active'
                ? 'font-semibold text-[#93C5FD]'
                : 'text-[#94A3B8] group-hover:text-[#CBD5E1]'
            }
          >
            {course.code}
          </span>

          {statusBadge && (
            <span className={`font-semibold ${statusBadge.cls}`}>
              {statusBadge.label}
            </span>
          )}
        </div>

        <h4 className="mt-2 text-[14.5px] font-semibold leading-snug text-[#F3F5F8] group-hover:text-white">
          {course.name}
        </h4>
      </button>
    </article>
  );
});
