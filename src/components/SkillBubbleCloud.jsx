import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Pause, Play, RotateCcw, Compass } from 'lucide-react';
import {
  SKILL_DOMAINS,
  SKILL_NODES,
  SPHERE_PALETTES,
  computeSphereEdges,
  getDomainSkillSummary,
  getRelatedPublicationsForSkill,
  getTargetRotationForSkill,
  projectSkillNodes,
  stepInertiaVelocity,
  stepRotationTowards,
} from '../utils/skillCloud';

export function SkillBubbleCloud({ onSelectTopic }) {
  const [activeDomain, setActiveDomain] = useState('all');
  const [selectedSkillId, setSelectedSkillId] = useState('skill-kgc');
  const [hoveredSkillId, setHoveredSkillId] = useState(null);
  const [engagedSkillIds, setEngagedSkillIds] = useState(() => new Set(['skill-kgc']));
  const [engagePulse, setEngagePulse] = useState({ id: 'skill-kgc', seq: 0 });
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [rotation, setRotation] = useState(() => getTargetRotationForSkill('skill-kgc'));

  const stageRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const isAutoSpinRef = useRef(isAutoSpin);
  const targetRotationRef = useRef(null);
  const velocityRef = useRef({ vx: 0, vy: 0, active: false });
  const rafIdRef = useRef(0);

  isAutoSpinRef.current = isAutoSpin;

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const ensureAnimationLoop = useCallback(() => {
    if (prefersReducedMotion || rafIdRef.current !== 0) return;

    let lastTime = performance.now();

    const step = (now) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      let domHovered = false;
      try {
        domHovered = Boolean(stageRef.current?.matches(':hover'));
      } catch {
        domHovered = false;
      }

      if (!domHovered && isHoveredRef.current && !isDraggingRef.current) {
        isHoveredRef.current = false;
      }

      const pointerInside = isHoveredRef.current || domHovered;
      const hasTarget = targetRotationRef.current !== null;
      const hasInertia = velocityRef.current.active && !isDraggingRef.current;
      const shouldSpin =
        isAutoSpinRef.current &&
        !isDraggingRef.current &&
        !pointerInside &&
        !isFocusedRef.current;

      if (hasTarget) {
        const target = targetRotationRef.current;
        setRotation((prev) => {
          const next = stepRotationTowards(prev, target, dt, 8.2);
          if (next.done) {
            targetRotationRef.current = null;
          }
          return { yaw: next.yaw, pitch: next.pitch };
        });
      } else if (hasInertia) {
        const vel = velocityRef.current;
        setRotation((prev) => ({
          yaw: prev.yaw + vel.vx * dt,
          pitch: Math.max(-1.15, Math.min(1.15, prev.pitch + vel.vy * dt)),
        }));
        velocityRef.current = stepInertiaVelocity(vel, dt, 4.4);
      } else if (shouldSpin) {
        setRotation((prev) => ({
          yaw: prev.yaw + dt * 0.24,
          pitch: prev.pitch,
        }));
      }

      if (
        targetRotationRef.current !== null ||
        velocityRef.current.active ||
        isAutoSpinRef.current
      ) {
        rafIdRef.current = window.requestAnimationFrame(step);
      } else {
        rafIdRef.current = 0;
      }
    };

    rafIdRef.current = window.requestAnimationFrame(step);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (isAutoSpin && !prefersReducedMotion) {
      ensureAnimationLoop();
    }
    return () => {
      if (rafIdRef.current !== 0) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
  }, [isAutoSpin, prefersReducedMotion, ensureAnimationLoop]);

  useEffect(() => {
    const handleWindowPointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      if (!prefersReducedMotion && (velocityRef.current.active || isAutoSpinRef.current)) {
        ensureAnimationLoop();
      }
    };

    const handleWindowPointerMove = (e) => {
      if (!isHoveredRef.current || e.pointerType !== 'mouse' || !stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        isHoveredRef.current = false;
        isFocusedRef.current = false;
        setHoveredSkillId(null);
        if (isAutoSpinRef.current && !prefersReducedMotion) {
          ensureAnimationLoop();
        }
      }
    };

    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);
    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
      window.removeEventListener('pointermove', handleWindowPointerMove);
    };
  }, [prefersReducedMotion, ensureAnimationLoop]);

  const glideToRotation = useCallback(
    (nextTarget) => {
      velocityRef.current = { vx: 0, vy: 0, active: false };
      if (prefersReducedMotion) {
        targetRotationRef.current = null;
        setRotation(nextTarget);
        return;
      }
      targetRotationRef.current = nextTarget;
      ensureAnimationLoop();
    },
    [prefersReducedMotion, ensureAnimationLoop]
  );

  const domainSummary = useMemo(
    () => getDomainSkillSummary(activeDomain),
    [activeDomain]
  );

  const handleSelectBubble = (
    skillId,
    { focusSphere = true, engaged = true } = {}
  ) => {
    setSelectedSkillId(skillId);
    setEngagedSkillIds((prev) => {
      if (prev.has(skillId)) return prev;
      const next = new Set(prev);
      next.add(skillId);
      return next;
    });
    if (engaged) {
      setEngagePulse((prev) => ({ id: skillId, seq: prev.seq + 1 }));
    }
    if (focusSphere) {
      glideToRotation(getTargetRotationForSkill(skillId));
    }
  };

  const handleDomainSelect = (nextDomain) => {
    setActiveDomain(nextDomain);
    const summary = getDomainSkillSummary(nextDomain);
    if (nextDomain !== 'all' && summary.skills.length > 0) {
      const targetSkill = summary.skills.some((s) => s.id === selectedSkillId)
        ? selectedSkillId
        : summary.skills[0].id;
      handleSelectBubble(targetSkill, { focusSphere: true, engaged: true });
    }
  };

  const projectedNodes = useMemo(
    () =>
      projectSkillNodes(SKILL_NODES, {
        yaw: rotation.yaw,
        pitch: rotation.pitch,
        radius: 184,
        centerX: 320,
        centerY: 240,
        activeDomain,
        selectedSkillId,
      }),
    [rotation.yaw, rotation.pitch, activeDomain, selectedSkillId]
  );

  const edges = useMemo(
    () => computeSphereEdges(projectedNodes, activeDomain, selectedSkillId),
    [projectedNodes, activeDomain, selectedSkillId]
  );

  const activeSkill = useMemo(
    () =>
      SKILL_NODES.find((s) => s.id === selectedSkillId) ??
      domainSummary.skills[0] ??
      SKILL_NODES[0],
    [selectedSkillId, domainSummary]
  );

  const relatedPublications = useMemo(
    () => getRelatedPublicationsForSkill(activeSkill, 3),
    [activeSkill]
  );

  const activeDomainMeta =
    SKILL_DOMAINS.find((d) => d.id === activeSkill.domain) ?? SKILL_DOMAINS[0];

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    isFocusedRef.current = false;
    targetRotationRef.current = null;
    velocityRef.current = { vx: 0, vy: 0, active: false };
    lastPointerRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(0.008, (now - lastPointerRef.current.time) / 1000);
    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
      dragMovedRef.current = true;
    }
    lastPointerRef.current = { x: e.clientX, y: e.clientY, time: now };

    const dYaw = dx * 0.0085;
    const dPitch = -dy * 0.0065;

    velocityRef.current = {
      vx: Math.max(-4.5, Math.min(4.5, dYaw / dt)),
      vy: Math.max(-3.0, Math.min(3.0, dPitch / dt)),
      active: Math.hypot(dx, dy) > 1.5,
    };

    setRotation((prev) => ({
      yaw: prev.yaw + dYaw,
      pitch: Math.max(-1.15, Math.min(1.15, prev.pitch + dPitch)),
    }));
  };

  const handlePointerUp = () => {
    const wasDragging = isDraggingRef.current;
    isDraggingRef.current = false;
    if (wasDragging && velocityRef.current.active && !prefersReducedMotion) {
      ensureAnimationLoop();
    }
  };

  const handleResetView = () => {
    setActiveDomain('all');
    setSelectedSkillId('skill-kgc');
    glideToRotation(getTargetRotationForSkill('skill-kgc'));
    setIsAutoSpin(true);
  };

  const handleNudgeRotate = (deltaYaw) => {
    glideToRotation({
      yaw: rotation.yaw + deltaYaw,
      pitch: rotation.pitch,
    });
  };

  return (
    <div
      id="expertise-cloud"
      className="mt-16 border-t border-white/10 pt-14"
    >
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium text-[#60A5FA]">
            Interactive 3D Expertise Sphere
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#F3F5F8] sm:text-3xl">
            Research Skill Bubble Cloud
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6] sm:text-base">
            Drag anywhere on the 3D sphere to orbit {SKILL_NODES.length} core competencies, filter to highlight domains such as LLMs or GNNs, or click any bubble to inspect linked papers.
          </p>
        </div>

        {/* Controls: Orbit, Auto-spin toggle & Reset */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleNudgeRotate(-0.55)}
            aria-label="Rotate sphere left"
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
          >
            <Compass className="h-3.5 w-3.5 text-[#60A5FA]" />
            <span>Orbit</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAutoSpin((prev) => !prev)}
            aria-pressed={!isAutoSpin}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
          >
            {isAutoSpin ? (
              <>
                <Pause className="h-3.5 w-3.5 text-[#60A5FA]" />
                <span>Pause Spin</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 text-[#60A5FA]" />
                <span>Resume Spin</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleResetView}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Single-Row Domain Highlight Filter Tabs */}
      <div className="mt-7 flex flex-col justify-between gap-3 xl:flex-row xl:items-center">
        <div
          role="tablist"
          aria-label="Filter 3D skill cloud by research domain"
          className="flex flex-wrap items-center gap-2"
        >
          {SKILL_DOMAINS.map((domain) => {
            const count =
              domain.id === 'all'
                ? SKILL_NODES.length
                : SKILL_NODES.filter((s) => s.domain === domain.id).length;
            const active = activeDomain === domain.id;
            const tabLabel = domain.id === 'all' ? 'All' : domain.label;

            return (
              <button
                key={domain.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleDomainSelect(domain.id)}
                className={
                  active
                    ? 'inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-[#2563EB] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-blue-950/50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]'
                    : 'inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]'
                }
              >
                <span>{tabLabel}</span>
                <span className="font-mono tabular-nums opacity-85">
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        <p
          data-testid="skill-cloud-status"
          className="font-mono text-xs text-[#8B95A5] tabular-nums shrink-0"
        >
          {activeDomain === 'all'
            ? `${domainSummary.total} active nodes`
            : `${domainSummary.count} highlighted in ${domainSummary.domain.shortLabel}`}
        </p>
      </div>

      {/* Split Layout: 3D SVG Sphere Stage (7 cols) + Skill Inspector (5 cols) */}
      <div className="mt-6 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        {/* Left: Interactive 3D-Style SVG Sphere Stage */}
        <div
          ref={stageRef}
          data-testid="skill-stage-box"
          className="glass-panel relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 lg:col-span-7"
          onPointerEnter={() => {
            isHoveredRef.current = true;
          }}
          onPointerLeave={() => {
            isHoveredRef.current = false;
            isFocusedRef.current = false;
            setHoveredSkillId(null);
            handlePointerUp();
            if (isAutoSpinRef.current && !prefersReducedMotion) {
              ensureAnimationLoop();
            }
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            isFocusedRef.current = false;
            setHoveredSkillId(null);
            if (isAutoSpinRef.current && !prefersReducedMotion) {
              ensureAnimationLoop();
            }
          }}
        >
          <svg
            data-testid="skill-bubble-svg"
            data-yaw={rotation.yaw.toFixed(4)}
            viewBox="0 0 640 480"
            role="img"
            aria-label={`Interactive 3D skill bubble cloud showing ${domainSummary.count} highlighted skills for ${domainSummary.domain.label}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="w-full flex-1 cursor-grab select-none touch-none active:cursor-grabbing"
          >
            <defs>
              <radialGradient id="stage-atmosphere" cx="50%" cy="50%" r="54%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.16" />
                <stop offset="58%" stopColor="#10141B" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#0C0F14" stopOpacity="0" />
              </radialGradient>

              {SPHERE_PALETTES.map((palette) => (
                <radialGradient
                  key={`grad-${palette.id}`}
                  id={`sphere-color-${palette.id}`}
                  cx="34%"
                  cy="28%"
                  r="72%"
                >
                  <stop offset="0%" stopColor={palette.light} />
                  <stop offset="52%" stopColor={palette.mid} />
                  <stop offset="100%" stopColor={palette.deep} />
                </radialGradient>
              ))}

              {SPHERE_PALETTES.map((palette) => (
                <radialGradient
                  key={`grad-active-${palette.id}`}
                  id={`sphere-active-${palette.id}`}
                  cx="32%"
                  cy="26%"
                  r="74%"
                >
                  <stop offset="0%" stopColor={palette.activeLight} />
                  <stop offset="50%" stopColor={palette.activeMid} />
                  <stop offset="100%" stopColor={palette.activeDeep} />
                </radialGradient>
              ))}

              <radialGradient id="sphere-dimmed" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#1C222B" />
                <stop offset="100%" stopColor="#0E1218" />
              </radialGradient>

              <filter id="node-halo" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Ambient sphere backdrop & 3D orbital wireframe rings */}
            <rect width="640" height="480" fill="url(#stage-atmosphere)" />

            <g
              fill="none"
              stroke="rgba(148, 163, 184, 0.14)"
              strokeWidth="1"
              aria-hidden="true"
            >
              <circle cx="320" cy="240" r="215" strokeDasharray="3 6" />
              <ellipse
                cx="320"
                cy="240"
                rx="215"
                ry={Math.max(26, Math.abs(Math.sin(rotation.pitch)) * 130 + 42)}
              />
              <ellipse
                cx="320"
                cy="240"
                rx={Math.max(40, Math.abs(Math.cos(rotation.yaw)) * 210)}
                ry="215"
                strokeOpacity="0.55"
              />
              <ellipse
                cx="320"
                cy="240"
                rx={Math.max(40, Math.abs(Math.sin(rotation.yaw)) * 210)}
                ry="215"
                strokeOpacity="0.4"
              />
            </g>

            {/* Knowledge Graph Connection Edges with Selected Sphere Engagement Flow */}
            <g aria-hidden="true">
              {edges.map((edge) => {
                const selectedNode = projectedNodes.find((n) => n.isSelected);
                const selectedEdgeColor = selectedNode?.palette?.halo ?? '#60A5FA';
                const strokeCol = edge.connectedToSelected
                  ? selectedEdgeColor
                  : edge.highlighted
                    ? '#3B82F6'
                    : '#2C3F5E';

                return (
                  <g key={edge.id}>
                    <line
                      x1={edge.x1}
                      y1={edge.y1}
                      x2={edge.x2}
                      y2={edge.y2}
                      stroke={strokeCol}
                      strokeOpacity={edge.opacity}
                      strokeWidth={
                        edge.connectedToSelected ? 1.85 : edge.highlighted ? 1.2 : 0.85
                      }
                    />
                    {edge.highlighted && (
                      <line
                        x1={edge.x1}
                        y1={edge.y1}
                        x2={edge.x2}
                        y2={edge.y2}
                        stroke={edge.connectedToSelected ? '#FFFFFF' : '#93C5FD'}
                        strokeOpacity={Math.min(0.75, edge.opacity + 0.15)}
                        strokeWidth={edge.connectedToSelected ? '1.6' : '1.25'}
                        strokeDasharray="4 18"
                        strokeLinecap="round"
                        className="animate-edge-flow"
                      />
                    )}
                  </g>
                );
              })}
            </g>

            {/* Engaged Sphere Orbital Pulse & Click Shockwave Layer */}
            <g aria-hidden="true" className="pointer-events-none">
              {projectedNodes
                .filter((node) => node.isSelected)
                .map((node) => (
                  <g
                    key={`halo-${node.id}`}
                    transform={`translate(${node.screenX.toFixed(1)}, ${node.screenY.toFixed(1)})`}
                  >
                    <circle
                      r={node.bubbleRadius + 9.5}
                      fill="none"
                      stroke={node.palette.halo}
                      strokeWidth="1.6"
                      className="animate-halo-pulse"
                    />
                    {engagePulse.id === node.id && engagePulse.seq > 0 && (
                      <circle
                        key={`burst-${engagePulse.id}-${engagePulse.seq}`}
                        r={node.bubbleRadius + 4}
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2.2"
                        className="animate-sphere-engage"
                      />
                    )}
                  </g>
                ))}
            </g>

            {/* Depth-Sorted Multi-Color 3D-Shaded Skill Spheres */}
            {projectedNodes.map((node) => {
              const isHovered = hoveredSkillId === node.id;
              const isEngaged = engagedSkillIds.has(node.id);
              const r = node.bubbleRadius;
              const scaleFactor = isHovered ? 1.09 : node.isSelected ? 1.05 : 1;
              const palette = node.palette;

              const fillUrl = !node.isHighlighted
                ? 'url(#sphere-dimmed)'
                : node.isSelected || isHovered
                  ? `url(#sphere-active-${palette.id})`
                  : `url(#sphere-color-${palette.id})`;

              const strokeColor = node.isSelected
                ? palette.activeStroke
                : node.isHighlighted
                  ? isHovered
                    ? palette.activeStroke
                    : palette.stroke
                  : '#2F3947';

              const lines = node.lines ?? [node.shortLabel];
              const maxLineLen = Math.max(...lines.map((l) => l.length));
              const fontSize = Math.max(
                8.2,
                Math.min(11.4, (r * 1.62) / Math.max(4.5, maxLineLen * 0.56))
              );
              const lineHeight = fontSize * 1.15;
              const showLabel =
                r >= 22 ||
                node.isSelected ||
                (activeDomain !== 'all' && node.isHighlighted);

              return (
                <g
                  key={node.id}
                  data-testid={`skill-bubble-${node.id}`}
                  data-palette={palette.id}
                  data-highlighted={node.isHighlighted ? 'true' : 'false'}
                  data-engaged={isEngaged ? 'true' : 'false'}
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.label} (${activeDomain === node.domain ? 'highlighted' : node.domain})`}
                  aria-pressed={node.isSelected}
                  transform={`translate(${node.screenX.toFixed(1)}, ${node.screenY.toFixed(1)})`}
                  className="outline-none focus:outline-none"
                  style={{ opacity: node.opacity, cursor: 'pointer' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!dragMovedRef.current) {
                      handleSelectBubble(node.id, {
                        focusSphere: true,
                        engaged: true,
                      });
                    }
                  }}
                  onFocus={(e) => {
                    try {
                      if (e.currentTarget.matches(':focus-visible')) {
                        isFocusedRef.current = true;
                      }
                    } catch {
                      // ignore selector support edge cases
                    }
                  }}
                  onBlur={() => {
                    isFocusedRef.current = false;
                    if (
                      isAutoSpinRef.current &&
                      !isHoveredRef.current &&
                      !prefersReducedMotion
                    ) {
                      ensureAnimationLoop();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectBubble(node.id, {
                        focusSphere: true,
                        engaged: true,
                      });
                    }
                  }}
                  onMouseEnter={() => {
                    setHoveredSkillId(node.id);
                  }}
                  onMouseLeave={() => setHoveredSkillId(null)}
                >
                  <g
                    style={{
                      transform: `scale(${scaleFactor})`,
                      transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {/* Soft outer aura ring for selected, hovered, or filtered spheres */}
                    {(node.isSelected ||
                      isHovered ||
                      (activeDomain !== 'all' && node.isHighlighted)) && (
                      <circle
                        r={r + 4.5}
                        fill="none"
                        stroke={palette.halo}
                        strokeWidth={node.isSelected ? 1.8 : 1.15}
                        strokeOpacity={node.isSelected ? 0.78 : 0.45}
                        filter={node.isSelected ? 'url(#node-halo)' : undefined}
                      />
                    )}

                    {/* 3D Spherical Orb Body */}
                    <circle
                      r={r}
                      fill={fillUrl}
                      stroke={strokeColor}
                      strokeWidth={
                        node.isSelected ? 2.2 : node.isHighlighted ? 1.35 : 0.85
                      }
                    />

                    {/* Specular rim arc for 3D glass curvature */}
                    {node.isHighlighted && (
                      <path
                        d={`M ${(-r * 0.56).toFixed(1)} ${(-r * 0.28).toFixed(1)} A ${(r * 0.68).toFixed(1)} ${(r * 0.68).toFixed(1)} 0 0 1 ${(r * 0.25).toFixed(1)} ${(-r * 0.62).toFixed(1)}`}
                        fill="none"
                        stroke={node.isSelected ? '#FFFFFF' : palette.rim}
                        strokeOpacity={node.isSelected ? 0.78 : 0.52}
                        strokeWidth={Math.max(1.1, r * 0.055)}
                        strokeLinecap="round"
                      />
                    )}

                    {/* Subtle bottom-right bounce light on clicked / active spheres */}
                    {node.isSelected && (
                      <circle
                        cx={r * 0.32}
                        cy={r * 0.34}
                        r={r * 0.16}
                        fill="#FFFFFF"
                        fillOpacity="0.16"
                      />
                    )}

                    {/* Crisp Vector Skill Label Strictly Contained Within Bubble */}
                    {showLabel && (
                      <text
                        textAnchor="middle"
                        fontSize={fontSize}
                        fontWeight={
                          node.isSelected || node.isHighlighted ? '700' : '500'
                        }
                        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                        fill={
                          node.isSelected
                            ? '#FFFFFF'
                            : node.isHighlighted
                              ? '#F8FAFC'
                              : '#8B95A5'
                        }
                        style={{
                          pointerEvents: 'none',
                          paintOrder: 'stroke',
                          stroke: node.isHighlighted
                            ? palette.textStroke
                            : 'rgba(11, 17, 30, 0.9)',
                          strokeWidth: 2.2,
                          strokeLinejoin: 'round',
                        }}
                      >
                        {lines.map((line, idx) => (
                          <tspan
                            key={line}
                            x="0"
                            y={(idx - (lines.length - 1) / 2) * lineHeight}
                            dominantBaseline="central"
                          >
                            {line}
                          </tspan>
                        ))}
                      </text>
                    )}
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Subtle bottom spatial hint inside SVG stage */}
          <div className="pointer-events-none flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-white/10 bg-[#0A0D12]/85 px-4 py-2.5 font-mono text-[11px] text-[#8B95A5] sm:px-5">
            <span>Drag to orbit 3D sphere · Click any sphere to engage &amp; inspect</span>
            <span className="tabular-nums text-[#60A5FA]">
              {engagedSkillIds.size}/{SKILL_NODES.length} explored · {domainSummary.domain.shortLabel}
            </span>
          </div>
        </div>

        {/* Right: Active Skill Evidence & Domain Quick Selector */}
        <aside
          data-testid="skill-inspector"
          className="glass-panel flex flex-col justify-between rounded-2xl border border-white/10 p-5 sm:p-7 lg:col-span-5"
        >
          <div key={activeSkill.id} className="animate-inspector-enter">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#60A5FA]">
              <span>{activeDomainMeta.label}</span>
              <span aria-hidden="true" className="text-white/25">·</span>
              <span className="text-[#8B95A5]">{activeSkill.context}</span>
            </div>

            <h4 className="mt-2 text-2xl font-bold tracking-tight text-[#F3F5F8]">
              {activeSkill.label}
            </h4>

            <p className="mt-3 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
              {activeSkill.description}
            </p>

            <p className="mt-3 font-mono text-xs text-[#8B95A5]">
              Key Venues &amp; Stack: <span className="text-[#E2E8F0]">{activeSkill.venues}</span>
            </p>

            {/* Related Peer-Reviewed Publications */}
            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B95A5]">
                  Related Publications
                </span>
                <span className="font-mono text-xs text-[#60A5FA] tabular-nums">
                  {relatedPublications.length} matched
                </span>
              </div>

              <ul className="mt-3 divide-y divide-white/10">
                {relatedPublications.map((pub) => (
                  <li key={pub.id} className="py-2.5 first:pt-0 last:pb-0">
                    <p className="text-xs font-medium leading-snug text-[#F3F5F8]">
                      {pub.title}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-[#8B95A5] tabular-nums">
                      {pub.year} · {pub.venue} · {pub.citations} citations
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Domain Quick-Switch List */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="text-xs font-medium text-[#8B95A5]">
                {activeDomain === 'all'
                  ? 'Featured Expertise Nodes'
                  : `Skills in ${domainSummary.domain.label}`}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {(activeDomain === 'all'
                  ? SKILL_NODES.slice(0, 8)
                  : domainSummary.skills
                ).map((skill) => {
                  const isCurrent = skill.id === activeSkill.id;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => handleSelectBubble(skill.id, { focusSphere: true })}
                      className={
                        isCurrent
                          ? 'rounded-lg bg-[#2563EB] px-2.5 py-1 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0'
                          : 'rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0'
                      }
                    >
                      {skill.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={() =>
                onSelectTopic(
                  activeSkill.publicationCategory,
                  activeSkill.publicationSearchTerm
                )
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2563EB] px-5 py-2.5 text-center text-xs font-semibold text-white shadow-sm shadow-blue-950/50 transition-colors hover:bg-[#3B82F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
            >
              <span>Filter Publications for {activeSkill.shortLabel}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
