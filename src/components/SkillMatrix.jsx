import { memo } from 'react';
import { RotateCcw } from 'lucide-react';
import { ExpandableSearch } from './ExpandableSearch';
import { SkillChip } from './SkillChip';

export const SkillMatrix = memo(function SkillMatrix({
  allGroups,
  visibleGroups,
  categoryVisuals,
  skillCategoryFilter,
  onSelectCategory,
  skillQuery,
  onSearchChange,
  focusedSkillName,
  focusedSynergies,
  activePreset,
  onClearPreset,
  onSelectSkill,
  onResetFilters,
}) {
  return (
    <div
      data-testid="skill-matrix-container"
      className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#131926]/88 to-[#0B0F17]/95"
    >
      {/* Unified Matrix Toolbar: Domain Filter Tabs + Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0B0F17]/60 px-4 py-3.5 sm:px-5">
        <nav
          role="tablist"
          aria-label="Filter technical skills by category"
          className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#0B0F17]/90 p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={skillCategoryFilter === 'all'}
            onClick={() => onSelectCategory('all')}
            className={
              skillCategoryFilter === 'all'
                ? 'shrink-0 whitespace-nowrap rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors'
                : 'shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-[#94A3B8] transition-colors hover:bg-white/[0.04] hover:text-[#F1F5F9]'
            }
          >
            All Domains
          </button>
          {allGroups.map((group) => {
            const active = skillCategoryFilter === group.id;
            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectCategory(group.id)}
                className={
                  active
                    ? 'shrink-0 whitespace-nowrap rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors'
                    : 'shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-[#94A3B8] transition-colors hover:bg-white/[0.04] hover:text-[#F1F5F9]'
                }
              >
                {group.category}
              </button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {activePreset && (
            <button
              type="button"
              onClick={onClearPreset}
              className="font-mono text-xs text-[#60A5FA] transition-colors hover:text-[#93C5FD]"
            >
              Clear stack highlight
            </button>
          )}
          <ExpandableSearch
            id="skills-search"
            value={skillQuery}
            onChange={onSearchChange}
            placeholder="Search skills (PyTorch, Ollama, SQL...)"
            ariaLabel="Filter technical skills"
            buttonLabel="Search technical skills"
            testIdPrefix="skill-search"
          />
        </div>
      </div>

      {/* Subtle Compact Tier Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] bg-[#0B0F17]/35 px-4 py-2 font-mono text-[10.5px] text-[#8B95A5] sm:px-5">
        <span>Click any technology chip to inspect details &amp; highlight matching projects above</span>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-[#CBD5E1]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#60A5FA]" />
            <span>Core / Production</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#94A3B8]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full border border-[#94A3B8]" />
            <span>Applied / Certified</span>
          </span>
        </div>
      </div>

      {/* Unified Domain Rows with Compact Skill Chips */}
      {visibleGroups.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <p className="text-sm font-semibold text-[#F3F5F8]">
            No technical skills match &ldquo;{skillQuery}&rdquo;
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#3B82F6]"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset search</span>
          </button>
        </div>
      ) : (
        <div
          data-testid="technical-skills-grid"
          className="divide-y divide-white/[0.06]"
        >
          {visibleGroups.map((group) => {
            const visual =
              categoryVisuals[group.id] || categoryVisuals['skill-programming'];
            const GroupIcon = visual.Icon;

            return (
              <div
                key={group.id}
                className="flex flex-col gap-2.5 px-4 py-3 sm:px-5 md:flex-row md:items-center md:gap-4"
              >
                {/* Compact Domain Row Header */}
                <div className="flex shrink-0 items-center justify-between gap-2 md:w-44">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${visual.iconBox}`}
                    >
                      <GroupIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    </div>
                    <h3 className="text-[13px] font-semibold tracking-tight text-[#F8FAFC]">
                      {group.category}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-[#64748B] tabular-nums">
                    {group.items.length}
                  </span>
                </div>

                {/* Compact Interactive Skill Chip Cloud */}
                <div className="flex flex-1 flex-wrap items-center gap-1.5">
                  {group.items.map((item) => {
                    const isFocused = focusedSkillName === item;
                    const isInPreset = activePreset
                      ? activePreset.skills.includes(item)
                      : false;
                    const isSynergyPartner =
                      !isFocused &&
                      !activePreset &&
                      focusedSynergies.includes(item);
                    const isDimmed = Boolean(activePreset && !isInPreset);

                    return (
                      <SkillChip
                        key={item}
                        item={item}
                        categoryId={group.id}
                        visual={visual}
                        isFocused={isFocused}
                        isInPreset={isInPreset}
                        isSynergyPartner={isSynergyPartner}
                        isDimmed={isDimmed}
                        onSelect={onSelectSkill}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
