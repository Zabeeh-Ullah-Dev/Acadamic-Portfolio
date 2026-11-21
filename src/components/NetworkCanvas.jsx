import { useEffect, useRef } from 'react';
import {
  computeAttentionArcControlPoint,
  createKnowledgeGraphTopology,
  getResearchModeConfig,
  isInTypographyQuietZone,
  lerpRgb,
  rgbaString,
  sampleQuadraticBezier,
} from '../utils/knowledgeGraphScene';

export function NetworkCanvas({ researchMode = 'kgc' }) {
  const canvasRef = useRef(null);
  const modeRef = useRef(researchMode);

  useEffect(() => {
    modeRef.current = researchMode;
  }, [researchMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let phase = 0;
    let lastFrameTime = 0;
    let isVisible = true;
    let isTabVisible = document.visibilityState !== 'hidden';
    const mouse = { x: -9999, y: -9999, active: false };

    let topology = { nodes: [], hubCount: 0, hubArcs: [] };

    const initialConfig = getResearchModeConfig(modeRef.current);
    const livePalette = {
      primary: [...initialConfig.primaryRgb],
      secondary: [...initialConfig.secondaryRgb],
      accent: [...initialConfig.accentRgb],
      inferred: [...initialConfig.inferredRgb],
    };

    const rebuildTopology = () => {
      topology = createKnowledgeGraphTopology(width, height);
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rebuildTopology();
    };

    const maxEdgeDist = 158;
    const maxEdgeDistSq = maxEdgeDist * maxEdgeDist;
    const motifEdgeDist = 112;
    const motifEdgeDistSq = motifEdgeDist * motifEdgeDist;
    const mouseDist = 210;
    const mouseDistSq = mouseDist * mouseDist;

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);
      phase += 0.011;

      // Smoothly interpolate active research palette when user switches Featured Paper tabs
      const targetConfig = getResearchModeConfig(modeRef.current);
      const blendRate = prefersReducedMotion ? 1 : 0.08;
      livePalette.primary = lerpRgb(
        livePalette.primary,
        targetConfig.primaryRgb,
        blendRate
      );
      livePalette.secondary = lerpRgb(
        livePalette.secondary,
        targetConfig.secondaryRgb,
        blendRate
      );
      livePalette.accent = lerpRgb(
        livePalette.accent,
        targetConfig.accentRgb,
        blendRate
      );
      livePalette.inferred = lerpRgb(
        livePalette.inferred,
        targetConfig.inferredRgb,
        blendRate
      );

      const { nodes, hubCount, hubArcs } = topology;
      if (!nodes.length) return;

      // Step 1: Update organic drift (hubs orbit gently around curated anchor regions)
      if (!prefersReducedMotion) {
        for (let i = 0; i < nodes.length; i += 1) {
          const node = nodes[i];
          node.x += node.vx;
          node.y += node.vy;

          if (node.tier === 0) {
            const dxHome = node.x - node.homeX;
            const dyHome = node.y - node.homeY;
            const driftDistSq = dxHome * dxHome + dyHome * dyHome;
            if (driftDistSq > node.maxDrift * node.maxDrift) {
              // Gentle harmonic restoring impulse keeps semantic anchors compositionally balanced
              node.vx -= dxHome * 0.00055;
              node.vy -= dyHome * 0.00055;
            }
          }

          if (node.x < 18 || node.x > width - 18) node.vx *= -1;
          if (node.y < 18 || node.y > height - 18) node.vy *= -1;
          node.x = Math.max(14, Math.min(width - 14, node.x));
          node.y = Math.max(14, Math.min(height - 14, node.y));
        }
      }

      // Find nearest anchor hub to cursor for 1-hop neighborhood illumination
      let focusedHubIndex = -1;
      if (mouse.active) {
        let bestDistSq = 250 * 250;
        for (let h = 0; h < hubCount; h += 1) {
          const hub = nodes[h];
          const dx = hub.x - mouse.x;
          const dy = hub.y - mouse.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < bestDistSq) {
            bestDistSq = dSq;
            focusedHubIndex = h;
          }
        }
      }

      // Step 2: Soft cursor-reactive scientific probe aura
      if (mouse.active && !prefersReducedMotion) {
        const aura = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          175
        );
        aura.addColorStop(0, rgbaString(livePalette.primary, 0.11));
        aura.addColorStop(0.55, rgbaString(livePalette.secondary, 0.04));
        aura.addColorStop(1, rgbaString(livePalette.secondary, 0));
        ctx.fillStyle = aura;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 175, 0, Math.PI * 2);
        ctx.fill();
      }

      // Step 3: Subtle spectral field glows behind semantic anchor hubs
      for (let h = 0; h < hubCount; h += 1) {
        const hub = nodes[h];
        const isFocused = h === focusedHubIndex;
        const glowRadius = isFocused ? 74 : 52;
        const grad = ctx.createRadialGradient(
          hub.x,
          hub.y,
          0,
          hub.x,
          hub.y,
          glowRadius
        );
        grad.addColorStop(
          0,
          rgbaString(livePalette.primary, isFocused ? 0.16 : 0.085)
        );
        grad.addColorStop(1, rgbaString(livePalette.primary, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Step 4: Structural GNN edges & subtle motif triangles (Tier 0 & Tier 1)
      const activeNodesLimit = nodes.length;
      for (let i = 0; i < activeNodesLimit; i += 1) {
        const node = nodes[i];
        if (node.tier === 2) continue;

        const rightWeightA = node.x > width * 0.45 ? 1 : 0.52;

        for (let j = i + 1; j < activeNodesLimit; j += 1) {
          const other = nodes[j];
          if (other.tier === 2) continue;
          // Hub-to-hub edges are drawn as richer curved attention arcs below
          if (node.tier === 0 && other.tier === 0) continue;

          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distSq = dx * dx + dy * dy;
          if (distSq >= maxEdgeDistSq) continue;

          const dist = Math.sqrt(distSq);
          const hubLinked =
            (node.tier === 0 && node.hubIndex === focusedHubIndex) ||
            (other.tier === 0 && other.hubIndex === focusedHubIndex);
          const rightWeight =
            Math.max(rightWeightA, other.x > width * 0.45 ? 1 : 0.52);
          const baseAlpha = (1 - dist / maxEdgeDist) * 0.25 * rightWeight;
          const alpha = hubLinked ? Math.min(0.58, baseAlpha * 2.1) : baseAlpha;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle =
            node.tier === 0 || other.tier === 0
              ? rgbaString(livePalette.primary, alpha * 1.15)
              : rgbaString(livePalette.secondary, alpha * 0.9);
          ctx.lineWidth = hubLinked ? 1.25 : 0.85;
          ctx.stroke();

          // Subtle GNN simplicial motif shading for compact 3-node clusters on the right field
          if (
            distSq < motifEdgeDistSq &&
            node.x > width * 0.48 &&
            other.x > width * 0.48 &&
            (i + j) % 4 === 0
          ) {
            for (let k = j + 1; k < Math.min(j + 7, activeNodesLimit); k += 1) {
              const third = nodes[k];
              if (third.tier === 2) continue;
              const d1 =
                (node.x - third.x) * (node.x - third.x) +
                (node.y - third.y) * (node.y - third.y);
              const d2 =
                (other.x - third.x) * (other.x - third.x) +
                (other.y - third.y) * (other.y - third.y);
              if (d1 < motifEdgeDistSq && d2 < motifEdgeDistSq) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.lineTo(third.x, third.y);
                ctx.closePath();
                ctx.fillStyle = rgbaString(livePalette.primary, 0.032);
                ctx.fill();
                break;
              }
            }
          }

          // Micro GNN message-passing signal gliding along structural edges
          if (!prefersReducedMotion && (i + j) % 7 === 0) {
            const t = (phase * 0.9 + (i * 0.17 + j * 0.11)) % 1;
            const px = node.x + (other.x - node.x) * t;
            const py = node.y + (other.y - node.y) * t;
            ctx.beginPath();
            ctx.arc(px, py, 1.3, 0, Math.PI * 2);
            ctx.fillStyle = rgbaString(livePalette.inferred, 0.72 * rightWeight);
            ctx.fill();
          }
        }

        // Cursor interactive attention filaments
        if (mouse.active) {
          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < mouseDistSq) {
            const mDist = Math.sqrt(mDistSq);
            const alpha = (1 - mDist / mouseDist) * 0.52;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = rgbaString(livePalette.inferred, alpha);
            ctx.lineWidth = node.tier === 0 ? 1.3 : 0.95;
            ctx.stroke();
          }
        }
      }

      // Step 5: Directed Transformer Attention Arcs & Dashed Inferred Link-Prediction Arcs
      for (let a = 0; a < hubArcs.length; a += 1) {
        const arc = hubArcs[a];
        const fromNode = nodes[arc.from];
        const toNode = nodes[arc.to];
        if (!fromNode || !toNode) continue;

        const isFocusedArc =
          arc.from === focusedHubIndex || arc.to === focusedHubIndex;
        const { cx, cy } = computeAttentionArcControlPoint(
          fromNode.x,
          fromNode.y,
          toNode.x,
          toNode.y,
          arc.curvature
        );

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.quadraticCurveTo(cx, cy, toNode.x, toNode.y);

        if (arc.kind === 'inferred') {
          ctx.setLineDash([5, 6]);
          ctx.lineDashOffset = prefersReducedMotion ? 0 : -phase * 22;
          ctx.strokeStyle = rgbaString(
            livePalette.inferred,
            isFocusedArc ? 0.62 : 0.3
          );
          ctx.lineWidth = isFocusedArc ? 1.4 : 1.0;
        } else {
          ctx.strokeStyle = rgbaString(
            livePalette.primary,
            isFocusedArc ? 0.6 : 0.34
          );
          ctx.lineWidth = isFocusedArc ? 1.55 : 1.15;
        }
        ctx.stroke();
        ctx.restore();

        // Calibrated directed triplet chevron (h -> t) at curve midpoint on primary attention arcs
        if (arc.kind === 'attention') {
          const mid = sampleQuadraticBezier(
            fromNode.x,
            fromNode.y,
            cx,
            cy,
            toNode.x,
            toNode.y,
            0.52
          );
          const angle = Math.atan2(mid.ty, mid.tx);
          const arrowLen = isFocusedArc ? 6.2 : 4.8;
          ctx.beginPath();
          ctx.moveTo(
            mid.x - Math.cos(angle - 0.5) * arrowLen,
            mid.y - Math.sin(angle - 0.5) * arrowLen
          );
          ctx.lineTo(mid.x, mid.y);
          ctx.lineTo(
            mid.x - Math.cos(angle + 0.5) * arrowLen,
            mid.y - Math.sin(angle + 0.5) * arrowLen
          );
          ctx.strokeStyle = rgbaString(
            livePalette.inferred,
            isFocusedArc ? 0.78 : 0.42
          );
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        // Directed multi-context signal packet with luminous tail along the Bezier arc
        if (!prefersReducedMotion) {
          const t = (phase * arc.packetSpeed + arc.packetOffset) % 1;
          const head = sampleQuadraticBezier(
            fromNode.x,
            fromNode.y,
            cx,
            cy,
            toNode.x,
            toNode.y,
            t
          );
          const trailT = Math.max(0, t - 0.055);
          const tail = sampleQuadraticBezier(
            fromNode.x,
            fromNode.y,
            cx,
            cy,
            toNode.x,
            toNode.y,
            trailT
          );

          ctx.beginPath();
          ctx.moveTo(tail.x, tail.y);
          ctx.lineTo(head.x, head.y);
          ctx.strokeStyle = rgbaString(
            livePalette.inferred,
            isFocusedArc ? 0.82 : 0.52
          );
          ctx.lineWidth = 1.9;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(head.x, head.y, 3.6, 0, Math.PI * 2);
          ctx.fillStyle = rgbaString(livePalette.secondary, 0.28);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(head.x, head.y, 1.55, 0, Math.PI * 2);
          ctx.fillStyle = rgbaString([224, 242, 254], 0.96);
          ctx.fill();
        }
      }

      // Step 6: Render Nodes across all 3 depth tiers
      ctx.font = '500 9.5px "JetBrains Mono", ui-monospace, monospace';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const nearMouse =
          mouse.active &&
          (node.x - mouse.x) * (node.x - mouse.x) +
            (node.y - mouse.y) * (node.y - mouse.y) <
            mouseDistSq;

        if (node.tier === 0) {
          const isFocusedHub = node.hubIndex === focusedHubIndex || nearMouse;

          // Expanding GNN neighborhood aggregation wave
          if (!prefersReducedMotion && node.hubIndex % 2 === 0) {
            const ripplePhase = (phase * 0.48 + node.phaseOffset) % 1;
            ctx.beginPath();
            ctx.arc(
              node.x,
              node.y,
              node.radius + 4 + ripplePhase * 24,
              0,
              Math.PI * 2
            );
            ctx.strokeStyle = rgbaString(
              livePalette.secondary,
              0.28 * (1 - ripplePhase)
            );
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }

          // Precision outer calibrated orbital arc (rotates calmly like a scientific instrument)
          const arcStart = (prefersReducedMotion ? 0 : phase * 0.42) + node.phaseOffset;
          ctx.beginPath();
          ctx.arc(
            node.x,
            node.y,
            node.radius + 5.2,
            arcStart,
            arcStart + Math.PI * 1.15
          );
          ctx.strokeStyle = rgbaString(
            livePalette.primary,
            isFocusedHub ? 0.72 : 0.32
          );
          ctx.lineWidth = 1;
          ctx.stroke();

          // Soft concentric halo
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 3.2, 0, Math.PI * 2);
          ctx.fillStyle = rgbaString(
            livePalette.primary,
            isFocusedHub ? 0.25 : 0.13
          );
          ctx.fill();

          // Obsidian hub core + sharp illuminated rim
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#070A12';
          ctx.fill();
          ctx.lineWidth = isFocusedHub ? 1.85 : 1.5;
          ctx.strokeStyle = isFocusedHub
            ? rgbaString([224, 242, 254], 0.96)
            : rgbaString(livePalette.inferred, 0.82);
          ctx.stroke();

          // Crisp center focal point
          ctx.beginPath();
          ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = rgbaString(livePalette.secondary, isFocusedHub ? 1 : 0.85);
          ctx.fill();

          // Quiet domain-authentic semantic tag ONLY outside the left typography quiet zone
          const label = targetConfig.hubLabels[node.hubIndex];
          if (
            label &&
            !isInTypographyQuietZone(node.x, node.y, width, height)
          ) {
            const alignRight = node.x > width * 0.86;
            ctx.textAlign = alignRight ? 'right' : 'left';
            const labelX = alignRight
              ? node.x - node.radius - 11
              : node.x + node.radius + 11;
            const labelY = node.y;
            ctx.fillStyle = isFocusedHub
              ? rgbaString([224, 242, 254], 0.82)
              : rgbaString(livePalette.inferred, 0.38);
            ctx.fillText(label, labelX, labelY);
          }
        } else if (node.tier === 1) {
          const rightBoost = node.x > width * 0.45 ? 1 : 0.58;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = nearMouse
            ? rgbaString([224, 242, 254], 0.94)
            : rgbaString(livePalette.primary, 0.58 * rightBoost);
          ctx.fill();
        } else {
          // Deep latent embedding coordinate stars
          const twinkle = prefersReducedMotion
            ? 0.36
            : 0.22 + 0.22 * Math.sin(phase * 1.9 + node.phaseOffset);
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = rgbaString([203, 213, 225], twinkle);
          ctx.fill();
        }
      }

      // Step 7: Subtle calibrated scientific cursor reticle when probing the graph
      if (mouse.active && !prefersReducedMotion) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = rgbaString(livePalette.inferred, 0.34);
        ctx.lineWidth = 0.85;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = rgbaString(livePalette.inferred, 0.65);
        ctx.fill();
      }
    };

    const stopLoop = () => {
      if (animationFrameId !== 0) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    const tick = (now) => {
      animationFrameId = 0;
      if (!isVisible || !isTabVisible) return;

      // Smooth ~30fps cadence for ambient graph simulation; zero wasted GPU/CPU cycles
      if (now - lastFrameTime >= 32 || lastFrameTime === 0) {
        lastFrameTime = now;
        renderFrame();
      }

      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(tick);
      }
    };

    const startLoop = () => {
      if (prefersReducedMotion) {
        renderFrame();
        return;
      }
      if (isVisible && isTabVisible && animationFrameId === 0) {
        lastFrameTime = 0;
        animationFrameId = window.requestAnimationFrame(tick);
      }
    };

    const handleMouseMove = (e) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.x = x;
        mouse.y = y;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState !== 'hidden';
      if (isTabVisible && isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && isTabVisible) {
            startLoop();
          } else {
            stopLoop();
          }
        },
        { rootMargin: '80px' }
      );
      observer.observe(canvas);
    }

    resize();
    startLoop();

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopLoop();
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="network-canvas"
      data-research-mode={researchMode}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-95"
    />
  );
}
