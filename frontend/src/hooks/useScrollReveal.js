import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight IntersectionObserver scroll-reveal hook.
 * Guarantees immediate visibility under prefers-reduced-motion,
 * hash-link jumps, or once any portion of the section enters the viewport.
 */
export function useScrollReveal({ threshold = 0.08 } = {}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(() => {
    if (typeof window === 'undefined') return true;
    return Boolean(
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
        typeof IntersectionObserver === 'undefined'
    );
  });

  useEffect(() => {
    if (revealed) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const checkRect = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.96) {
        setRevealed(true);
        return true;
      }
      return false;
    };

    if (checkRect()) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px 40px 0px' }
    );

    observer.observe(node);

    const onScroll = () => {
      if (checkRect()) {
        observer.disconnect();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [revealed, threshold]);

  return [ref, revealed];
}
