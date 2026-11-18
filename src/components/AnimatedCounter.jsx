/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * AnimatedCounter counts smoothly from 0 to target number when in viewport.
 *
 * Features:
 * - IntersectionObserver viewport detection: starts counting when visible.
 * - Quartic ease-out deceleration curve for natural, lively counting animation.
 * - Replay on hover: hovering any metric triggers a fresh counting sweep.
 * - Tabular numbers styling: prevents digit layout jitter.
 * - Glowing aura while actively ticking up.
 * - Respects prefers-reduced-motion media query.
 */
export function AnimatedCounter({
  target,
  duration = 1800,
  prefix = '',
  suffix = '',
  className = '',
  triggerOnHover = true,
}) {
  const [count, setCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const elementRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const animFrameRef = useRef(0);

  const startAnimation = useCallback(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    setIsCounting(true);
    setCount(0);
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Quartic ease-out: rapid start, decelerating smoothly to exact target
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(easeOut * target);

      setCount(current);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setCount(target);
        setIsCounting(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Immediately check if already visible in viewport
    const rect = node.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0 && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px 40px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [startAnimation]);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isCounting) {
      startAnimation();
    }
  };

  return (
    <span
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block tabular-nums transition-all duration-150 ${className} ${
        isCounting ? 'drop-shadow-[0_0_12px_rgba(96,165,250,0.85)] scale-[1.03]' : ''
      }`}
    >
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
