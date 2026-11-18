import { useEffect, useRef } from 'react';

export function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let phase = 0;
    const mouse = { x: -9999, y: -9999, active: false };
    const nodes = [];

    const createNodes = () => {
      nodes.length = 0;
      const area = width * height;
      const count = Math.min(48, Math.max(22, Math.floor(area / 24000)));
      for (let i = 0; i < count; i += 1) {
        const seed = (i * 9301 + 49297) % 233280;
        const rx = seed / 233280;
        const ry = ((seed * 7 + 131) % 233280) / 233280;
        const angle = (i * 1.618) % (Math.PI * 2);
        const speed = 0.18 + (i % 4) * 0.05;
        nodes.push({
          x: rx * width,
          y: ry * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: i % 3 === 0 ? 5.2 : 2.8,
          hollow: i % 3 === 0,
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createNodes();
    };

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);
      phase += 0.008;

      const maxEdgeDist = 160;
      const mouseDist = 200;

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 16 || node.x > width - 16) node.vx *= -1;
          if (node.y < 16 || node.y > height - 16) node.vy *= -1;
          node.x = Math.max(12, Math.min(width - 12, node.x));
          node.y = Math.max(12, Math.min(height - 12, node.y));
        }

        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxEdgeDist) {
            const alpha = (1 - dist / maxEdgeDist) * 0.3;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.05;
            ctx.stroke();

            if (!prefersReducedMotion && (i + j) % 5 === 0) {
              const t = (phase * 1.15 + i * 0.17) % 1;
              const px = node.x + (other.x - node.x) * t;
              const py = node.y + (other.y - node.y) * t;
              ctx.beginPath();
              ctx.arc(px, py, 1.65, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(147, 197, 253, 0.8)';
              ctx.fill();
            }
          }
        }

        if (mouse.active) {
          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const mDist = Math.hypot(mdx, mdy);
          if (mDist < mouseDist) {
            const alpha = (1 - mDist / mouseDist) * 0.56;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 1.3;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const nearMouse =
          mouse.active && Math.hypot(node.x - mouse.x, node.y - mouse.y) < mouseDist;

        if (node.hollow && !prefersReducedMotion && i % 6 === 0) {
          const ripplePhase = (phase * 0.7 + i * 0.29) % 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + ripplePhase * 16, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(59, 130, 246, ${(0.34 * (1 - ripplePhase)).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        if (node.hollow) {
          ctx.fillStyle = '#0C0F14';
          ctx.fill();
          ctx.lineWidth = 1.6;
          ctx.strokeStyle = nearMouse ? '#93C5FD' : 'rgba(96, 165, 250, 0.62)';
          ctx.stroke();
        } else {
          ctx.fillStyle = nearMouse
            ? 'rgba(147, 197, 253, 0.9)'
            : 'rgba(148, 163, 184, 0.45)';
          ctx.fill();
        }
      }
    };

    const tick = () => {
      renderFrame();
      if (!prefersReducedMotion) {
        animationFrameId = window.requestAnimationFrame(tick);
      }
    };

    const handleMouseMove = (e) => {
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

    resize();
    tick();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="network-canvas"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
    />
  );
}
