import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Layers, RotateCcw } from 'lucide-react';
import { computeDiagramConnectors } from '../utils/courseDiagramGeometry';

/**
 * Interactive 3-Column Dependency Flow Diagram for a clicked subject:
 *   [Prerequisites (Left)]  ~~~curved arrows~~~>  [Focused Subject (Center)]  ~~~curved arrows~~~>  [Unlocks Next (Right)]
 * Includes an animated top-right Reset control that smoothly collapses the diagram
 * and returns to the full 4-tier course progression grid.
 */
export function CourseDependencyDiagram({
  activeProfile,
  activeTierNum,
  activeTopics,
  activeChain,
  onSelectCourse,
  onReset,
}) {
  const canvasRef = useRef(null);
  const centerNodeRef = useRef(null);
  const prereqRefs = useRef(new Map());
  const unlockRefs = useRef(new Map());

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [connectors, setConnectors] = useState({ incoming: [], outgoing: [] });
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [isResetting, setIsResetting] = useState(false);

  const measureConnectors = useCallback(() => {
    const canvasEl = canvasRef.current;
    const centerEl = centerNodeRef.current;
    if (!canvasEl || !centerEl) return;

    const canvasRect = canvasEl.getBoundingClientRect();
    if (canvasRect.width <= 0 || canvasRect.height <= 0) return;

    const toRelative = (id, el) => {
      let left = 0;
      let top = 0;
      let curr = el;
      let reachedCanvas = false;
      while (curr && curr !== canvasEl) {
        left += curr.offsetLeft;
        top += curr.offsetTop;
        curr = curr.offsetParent;
        if (curr === canvasEl) {
          reachedCanvas = true;
          break;
        }
      }
      if (reachedCanvas) {
        return {
          id,
          left,
          top,
          width: el.offsetWidth,
          height: el.offsetHeight,
        };
      }
      const r = el.getBoundingClientRect();
      return {
        id,
        left: r.left - canvasRect.left,
        top: r.top - canvasRect.top,
        width: r.width,
        height: r.height,
      };
    };

    const centerRect = toRelative(activeProfile.id, centerEl);
    const prereqRects = activeProfile.prerequisites
      .map((pre) => {
        const el = prereqRefs.current.get(pre.id);
        return el ? toRelative(pre.id, el) : null;
      })
      .filter(Boolean);

    const unlockRects = activeProfile.unlocks
      .map((next) => {
        const el = unlockRefs.current.get(next.id);
        return el ? toRelative(next.id, el) : null;
      })
      .filter(Boolean);

    const nextWidth = Math.round(canvasEl.offsetWidth || canvasRect.width);
    const nextHeight = Math.round(canvasEl.offsetHeight || canvasRect.height);
    setCanvasSize((prev) =>
      prev.width === nextWidth && prev.height === nextHeight
        ? prev
        : { width: nextWidth, height: nextHeight }
    );
    setConnectors(computeDiagramConnectors(prereqRects, centerRect, unlockRects));
  }, [activeProfile]);

  const resetTimerRef = useRef(0);

  useLayoutEffect(() => {
    setHoveredNodeId(null);
    measureConnectors();
    const rafId = window.requestAnimationFrame(measureConnectors);
    return () => window.cancelAnimationFrame(rafId);
  }, [measureConnectors]);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return undefined;

    let resizeRafId = 0;
    const scheduleMeasure = () => {
      if (resizeRafId !== 0) return;
      resizeRafId = window.requestAnimationFrame(() => {
        resizeRafId = 0;
        measureConnectors();
      });
    };

    window.addEventListener('resize', scheduleMeasure, { passive: true });

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(scheduleMeasure);
      ro.observe(canvasEl);
    }

    return () => {
      window.removeEventListener('resize', scheduleMeasure);
      if (resizeRafId !== 0) {
        window.cancelAnimationFrame(resizeRafId);
      }
      if (ro) ro.disconnect();
    };
  }, [measureConnectors]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const triggerAnimatedReset = useCallback(() => {
    if (isResetting) return;
    const prefersReducedMotion = Boolean(
      typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );
    if (prefersReducedMotion) {
      onReset();
      return;
    }
    setIsResetting(true);
    resetTimerRef.current = window.setTimeout(() => {
      resetTimerRef.current = 0;
      onReset();
    }, 260);
  }, [isResetting, onReset]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        triggerAnimatedReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerAnimatedReset]);

  const setPrereqRef = (id) => (node) => {
    if (node) {
      prereqRefs.current.set(id, node);
    } else {
      prereqRefs.current.delete(id);
    }
  };

  const setUnlockRef = (id) => (node) => {
    if (node) {
      unlockRefs.current.set(id, node);
    } else {
      unlockRefs.current.delete(id);
    }
  };

  const markerBaseId = `course-flow-${activeProfile.id}`;

  return (
    <div
      data-testid="course-dependency-diagram"
      data-course-id={activeProfile.id}
      className={`relative mt-7 overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-[#111827]/95 via-[#0C121E]/96 to-[#090D16] shadow-[0_28px_72px_-30px_rgba(37,99,235,0.52)] ${
        isResetting ? 'animate-diagram-exit' : 'animate-diagram-enter'
      }`}
    >
      {/* Subtle architectural coordinate backdrop & sapphire zenith glow */}
      <div
        aria-hidden="true"
        className="architect-grid pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_32%,transparent_84%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/75 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.18),transparent_70%)] blur-2xl"
      />

      {/* Top Diagram Toolbar: Focused Course Context (Left) + Animated Reset Button (Right) */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs">
          <span className="font-semibold text-[#93C5FD]">{activeProfile.code}</span>
          <span aria-hidden="true" className="text-white/25">
            ·
          </span>
          <span className="text-[#CBD5E1]">{activeProfile.level}</span>
          <span aria-hidden="true" className="text-white/25">
            ·
          </span>
          <span className="text-[#8B95A5] tabular-nums">
            {activeProfile.prerequisites.length}{' '}
            {activeProfile.prerequisites.length === 1 ? 'prerequisite' : 'prerequisites'}
            {' · '}
            {activeProfile.unlocks.length}{' '}
            {activeProfile.unlocks.length === 1 ? 'unlock' : 'unlocks'}
          </span>
        </div>

        <button
          type="button"
          data-testid="course-diagram-reset"
          onClick={triggerAnimatedReset}
          aria-label="Reset diagram and return to full course grid"
          className="hover-sheen group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border border-[#60A5FA]/45 bg-[#172554]/55 px-4 py-2 text-xs font-semibold text-[#E2E8F0] shadow-[0_10px_28px_-12px_rgba(37,99,235,0.75)] transition-[transform,border-color,background-color,color] duration-200 hover:-translate-y-0.5 hover:border-[#93C5FD] hover:bg-[#2563EB]/35 hover:text-white active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
        >
          <RotateCcw
            className={`h-3.5 w-3.5 text-[#7DD3FC] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-180 group-hover:text-white ${
              isResetting ? 'animate-reset-spin' : ''
            }`}
            aria-hidden="true"
          />
          <span>Reset</span>
        </button>
      </div>

      {/* Main 3-Column Flow Canvas (Desktop Horizontal Bezier Curves / Mobile Vertical Stack) */}
      <div
        ref={canvasRef}
        key={activeProfile.id}
        className="relative z-10 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
      >
        {/* Dynamic Desktop SVG Curved Arrow Layer */}
        {canvasSize.width > 0 && canvasSize.height > 0 && (
          <svg
            aria-hidden="true"
            data-testid="course-diagram-svg"
            width={canvasSize.width}
            height={canvasSize.height}
            viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          >
            <defs>
              <linearGradient
                id={`${markerBaseId}-in-grad`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient
                id={`${markerBaseId}-out-grad`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#34D399" stopOpacity="0.9" />
              </linearGradient>

              <marker
                id={`${markerBaseId}-arrow-in`}
                viewBox="0 0 12 12"
                refX="9.5"
                refY="6"
                markerWidth="8"
                markerHeight="8"
                orient="auto"
              >
                <path
                  d="M 1.5 2 L 10 6 L 1.5 10 L 3.4 6 Z"
                  fill="#93C5FD"
                />
              </marker>

              <marker
                id={`${markerBaseId}-arrow-out`}
                viewBox="0 0 12 12"
                refX="9.5"
                refY="6"
                markerWidth="8"
                markerHeight="8"
                orient="auto"
              >
                <path
                  d="M 1.5 2 L 10 6 L 1.5 10 L 3.4 6 Z"
                  fill="#6EE7B7"
                />
              </marker>
            </defs>

            {/* Incoming Prerequisite -> Focused Subject Curves */}
            {connectors.incoming.map((edge, idx) => {
              const isHighlighted = hoveredNodeId === edge.sourceId;
              const isDimmed = hoveredNodeId !== null && !isHighlighted;
              return (
                <g
                  key={edge.id}
                  style={{
                    opacity: isDimmed ? 0.45 : 1,
                    transition: 'opacity 200ms ease',
                  }}
                >
                  {/* Soft glow underlay */}
                  <path
                    d={edge.d}
                    fill="none"
                    stroke="#FBBF24"
                    strokeOpacity={isHighlighted ? 0.34 : 0.14}
                    strokeWidth={isHighlighted ? 5.5 : 4}
                    strokeLinecap="round"
                  />
                  {/* Main animated draw-in Bezier curve with arrowhead */}
                  <path
                    d={edge.d}
                    pathLength={1}
                    fill="none"
                    stroke={`url(#${markerBaseId}-in-grad)`}
                    strokeWidth={isHighlighted ? 2.4 : 1.85}
                    strokeLinecap="round"
                    markerEnd={`url(#${markerBaseId}-arrow-in)`}
                    className="animate-diagram-draw"
                    style={{ animationDelay: `${idx * 75}ms` }}
                  />
                  {/* Calm flowing signal dash */}
                  <path
                    d={edge.d}
                    fill="none"
                    stroke="#FDE68A"
                    strokeOpacity={isHighlighted ? 0.95 : 0.55}
                    strokeWidth={isHighlighted ? 2.2 : 1.5}
                    strokeDasharray="6 38"
                    strokeLinecap="round"
                    className="animate-edge-flow"
                  />
                  {/* Origin node anchor dot */}
                  <circle
                    cx={edge.from.x}
                    cy={edge.from.y}
                    r={isHighlighted ? 3.5 : 2.8}
                    fill="#FBBF24"
                  />
                </g>
              );
            })}

            {/* Outgoing Focused Subject -> Unlocks Next Curves */}
            {connectors.outgoing.map((edge, idx) => {
              const isHighlighted = hoveredNodeId === edge.targetId;
              const isDimmed = hoveredNodeId !== null && !isHighlighted;
              return (
                <g
                  key={edge.id}
                  style={{
                    opacity: isDimmed ? 0.45 : 1,
                    transition: 'opacity 200ms ease',
                  }}
                >
                  <path
                    d={edge.d}
                    fill="none"
                    stroke="#34D399"
                    strokeOpacity={isHighlighted ? 0.34 : 0.14}
                    strokeWidth={isHighlighted ? 5.5 : 4}
                    strokeLinecap="round"
                  />
                  <path
                    d={edge.d}
                    pathLength={1}
                    fill="none"
                    stroke={`url(#${markerBaseId}-out-grad)`}
                    strokeWidth={isHighlighted ? 2.4 : 1.85}
                    strokeLinecap="round"
                    markerEnd={`url(#${markerBaseId}-arrow-out)`}
                    className="animate-diagram-draw"
                    style={{ animationDelay: `${140 + idx * 75}ms` }}
                  />
                  <path
                    d={edge.d}
                    fill="none"
                    stroke="#A7F3D0"
                    strokeOpacity={isHighlighted ? 0.95 : 0.55}
                    strokeWidth={isHighlighted ? 2.2 : 1.5}
                    strokeDasharray="6 38"
                    strokeLinecap="round"
                    className="animate-edge-flow"
                  />
                  <circle
                    cx={edge.from.x}
                    cy={edge.from.y}
                    r={isHighlighted ? 3.5 : 2.8}
                    fill="#60A5FA"
                  />
                </g>
              );
            })}
          </svg>
        )}

        {/* 3-Column Node Layout with Wide Sweeping Arrow Corridors */}
        <div className="relative z-10 grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)_minmax(0,1fr)] md:gap-14 lg:gap-20 xl:gap-24">
          {/* LEFT COLUMN: Prerequisites */}
          <div className="flex flex-col justify-center space-y-3">
            <p className="font-mono text-[11px] font-medium tracking-[0.04em] text-amber-300/90">
              Prerequisites ({activeProfile.prerequisites.length})
            </p>

            {activeProfile.prerequisites.length > 0 ? (
              <div className="space-y-3">
                {activeProfile.prerequisites.map((pre, idx) => (
                  <button
                    key={pre.id}
                    ref={setPrereqRef(pre.id)}
                    type="button"
                    data-testid={`diagram-prereq-${pre.id}`}
                    onClick={() => onSelectCourse(pre.id)}
                    onMouseEnter={() => setHoveredNodeId(pre.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    style={{ animationDelay: `${idx * 65}ms` }}
                    className="animate-diagram-node hover-sheen group relative flex w-full flex-col rounded-xl border border-amber-400/45 bg-gradient-to-br from-amber-500/[0.08] via-[#131926]/95 to-[#0D121C] px-4 py-3 text-left shadow-[0_14px_32px_-20px_rgba(245,158,11,0.55)] transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-amber-300/85 hover:bg-amber-500/[0.13] focus-visible:outline-2 focus-visible:outline-amber-300"
                  >
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                      <span className="text-[#CBD5E1]">{pre.code}</span>
                      <span className="font-semibold text-amber-300">
                        Prerequisite
                      </span>
                    </div>
                    <span className="mt-1.5 text-[15px] font-semibold leading-snug text-[#F8FAFC] group-hover:text-white">
                      {pre.name}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-amber-200/75 group-hover:text-amber-200">
                      <span>Focus this subject</span>
                      <ArrowRight
                        className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-5 text-left">
                <p className="font-mono text-[11px] font-medium text-[#94A3B8]">
                  Foundational Entry
                </p>
                <p className="mt-1 text-sm text-[#CBD5E1]">
                  No prior prerequisites required — starting pillar of the CS curriculum.
                </p>
              </div>
            )}
          </div>

          {/* Mobile Flow Indicator: Prerequisites -> Center */}
          <div className="flex justify-center text-amber-300/75 md:hidden" aria-hidden="true">
            <ArrowDown className="h-5 w-5" />
          </div>

          {/* CENTER COLUMN: Active Subject Focal Box */}
          <div className="flex flex-col items-stretch justify-center">
            <article
              ref={centerNodeRef}
              data-testid="diagram-center-node"
              className="animate-diagram-center relative overflow-hidden rounded-2xl border border-[#60A5FA]/80 bg-gradient-to-b from-[#172554]/75 via-[#111B30]/96 to-[#0B111E] px-5 py-6 text-center shadow-[0_24px_60px_-20px_rgba(37,99,235,0.72),inset_0_1px_0_rgba(186,230,253,0.28)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#BAE6FD]/85 to-transparent"
              />

              <p className="font-mono text-[11px] font-semibold tracking-[0.04em] text-[#7DD3FC]">
                {activeProfile.code} · Tier {activeTierNum} of 4
              </p>

              <h3 className="mt-2.5 text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
                {activeProfile.name}
              </h3>

              <p className="mt-1.5 font-mono text-[11px] text-[#93C5FD]/90">
                {activeProfile.track}
              </p>

              <p className="mt-3.5 text-xs leading-relaxed text-[#D1D9E6] sm:text-[13px]">
                {activeProfile.focus}
              </p>
            </article>
          </div>

          {/* Mobile Flow Indicator: Center -> Unlocks */}
          <div className="flex justify-center text-emerald-300/75 md:hidden" aria-hidden="true">
            <ArrowDown className="h-5 w-5" />
          </div>

          {/* RIGHT COLUMN: Unlocks Next */}
          <div className="flex flex-col justify-center space-y-3">
            <p className="font-mono text-[11px] font-medium tracking-[0.04em] text-emerald-300/90 md:text-right">
              Unlocks Next ({activeProfile.unlocks.length})
            </p>

            {activeProfile.unlocks.length > 0 ? (
              <div className="space-y-3">
                {activeProfile.unlocks.map((nextCourse, idx) => (
                  <button
                    key={nextCourse.id}
                    ref={setUnlockRef(nextCourse.id)}
                    type="button"
                    data-testid={`diagram-unlock-${nextCourse.id}`}
                    onClick={() => onSelectCourse(nextCourse.id)}
                    onMouseEnter={() => setHoveredNodeId(nextCourse.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    style={{ animationDelay: `${110 + idx * 65}ms` }}
                    className="animate-diagram-node hover-sheen group relative flex w-full flex-col rounded-xl border border-emerald-400/45 bg-gradient-to-br from-emerald-500/[0.08] via-[#101C24]/95 to-[#0B1218] px-4 py-3 text-left shadow-[0_14px_32px_-20px_rgba(16,185,129,0.55)] transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-emerald-300/85 hover:bg-emerald-500/[0.13] focus-visible:outline-2 focus-visible:outline-emerald-300"
                  >
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px]">
                      <span className="text-[#CBD5E1]">{nextCourse.code}</span>
                      <span className="font-semibold text-emerald-300">
                        Unlock
                      </span>
                    </div>
                    <span className="mt-1.5 text-[15px] font-semibold leading-snug text-[#F8FAFC] group-hover:text-white">
                      {nextCourse.name}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 font-mono text-[11px] text-emerald-200/75 group-hover:text-emerald-200">
                      <span>Explore next</span>
                      <ArrowRight
                        className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-5 text-left">
                <p className="font-mono text-[11px] font-medium text-[#94A3B8]">
                  Specialization Capstone
                </p>
                <p className="mt-1 text-sm text-[#CBD5E1]">
                  Advanced terminal course bridging directly into research &amp; engineering projects.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Syllabus Metadata Footer Strip (Unboxed Typography, Zero Cards-Within-Cards) */}
      <div className="relative z-10 flex flex-col justify-between gap-3 border-t border-white/10 bg-[#0A0E17]/75 px-5 py-4 text-xs sm:flex-row sm:items-center sm:px-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#CBD5E1]">
          <span className="inline-flex items-center gap-1.5 font-mono text-[#94A3B8]">
            <Layers className="h-3.5 w-3.5 text-[#60A5FA]" aria-hidden="true" />
            <span>Lab:</span>
            <strong className="font-semibold text-[#F1F5F9]">
              {activeProfile.tool}
            </strong>
          </span>
          {activeTopics.length > 0 && (
            <>
              <span aria-hidden="true" className="hidden text-white/20 sm:inline">
                ·
              </span>
              <span className="text-[#94A3B8]">
                {activeTopics.slice(0, 4).join(' · ')}
              </span>
            </>
          )}
        </div>

        <p className="shrink-0 font-mono text-[11px] text-[#7D8B9F] tabular-nums">
          {activeChain.ancestors.length} total upstream · {activeChain.descendants.length} downstream
        </p>
      </div>
    </div>
  );
}
