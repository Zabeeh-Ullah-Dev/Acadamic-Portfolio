/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { computeCounterValue } from '../utils/counterAnimation';

/**
 * StrictMode-safe, guaranteed-completion animated counter.
 * - Counts smoothly from 0 to `target` using ease-out cubic once `start` is true
 *   and the element enters the viewport.
 * - Anchors `startTime` on the first animation frame so initial paint latency
 *   never skips the early digits of the count-up.
 * - Deduplicates integer state updates so small targets (10, 11, 32) avoid
 *   unnecessary React re-renders between digit steps.
 * - Supports hover replay via `replayKey` and uses a fallback settle timer so it
 *   never stalls halfway (e.g., at 16 or 170+) under StrictMode or throttled tabs.
 */
export function AnimatedCounter({
  target,
  duration = 1400,
  replayDuration = 950,
  prefix = '',
  suffix = '',
  className = '',
  start = true,
  replayKey = 0,
}) {
  const [count, setCount] = useState(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return target;
    }
    return 0;
  });
  const [isVisible, setIsVisible] = useState(false);
  const elRef = useRef(null);

  // Track viewport entry cleanly (re-evaluates safely under React StrictMode)
  useEffect(() => {
    const node = elRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Run the count-up animation whenever ready + visible, or when replayed on hover
  useEffect(() => {
    const prefersReducedMotion = Boolean(
      typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );

    if (prefersReducedMotion) {
      setCount(target);
      return undefined;
    }

    if (!start || !isVisible) {
      return undefined;
    }

    let cancelled = false;
    let rafId = 0;
    let startTime = null;
    let lastValue = 0;
    const activeDuration = replayKey > 0 ? replayDuration : duration;

    setCount(0);

    const step = (now) => {
      if (cancelled) return;
      if (startTime === null) {
        startTime = now;
      }
      const elapsed = now - startTime;
      const nextVal = computeCounterValue(target, elapsed, activeDuration);
      if (nextVal !== lastValue) {
        lastValue = nextVal;
        setCount(nextVal);
      }
      if (elapsed < activeDuration) {
        rafId = window.requestAnimationFrame(step);
      } else if (lastValue !== target) {
        lastValue = target;
        setCount(target);
      }
    };

    rafId = window.requestAnimationFrame(step);

    // Fallback guarantee: even if rAF is throttled in a background tab, always land on exact target
    const settleTimer = window.setTimeout(() => {
      if (!cancelled) {
        lastValue = target;
        setCount(target);
      }
    }, activeDuration + 450);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(settleTimer);
    };
  }, [target, duration, replayDuration, start, isVisible, replayKey]);

  return (
    <span
      ref={elRef}
      aria-label={`${prefix}${target}${suffix}`}
      className={`inline-block tabular-nums ${className}`}
    >
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
