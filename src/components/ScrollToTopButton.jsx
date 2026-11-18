import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import {
  computeScrollProgress,
  hasScrolledPastSection,
} from '../utils/scrollVisibility';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateScrollState = () => {
      rafId = 0;
      const pubEl = document.getElementById('publications');
      const pastPublications = pubEl
        ? hasScrolledPastSection({
            bottom: pubEl.getBoundingClientRect().bottom,
            topThreshold: 96,
          })
        : false;

      setIsVisible(pastPublications);
      setProgress(
        computeScrollProgress({
          scrollY: window.scrollY,
          scrollHeight: document.documentElement.scrollHeight,
          innerHeight: window.innerHeight,
        })
      );
    };

    const handleScroll = () => {
      if (rafId !== 0) return;
      rafId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  const handleScrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <button
      type="button"
      data-testid="scroll-to-top-btn"
      onClick={handleScrollToTop}
      aria-label="Scroll back to top navigation bar"
      className="animate-scroll-top-enter group fixed bottom-5 right-5 z-40 inline-flex h-11 items-center gap-2 rounded-xl border border-[#3B82F6]/70 bg-gradient-to-br from-[#172554]/95 via-[#1E3A8A]/90 to-[#0C0F14]/95 px-3 text-xs font-semibold text-[#F8FAFC] shadow-[inset_0_1px_0_rgba(147,197,253,0.28),0_12px_28px_-6px_rgba(37,99,235,0.65)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93C5FD] hover:from-[#2563EB] hover:to-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
    >
      <span className="relative flex h-7 w-7 items-center justify-center">
        <svg
          viewBox="0 0 34 34"
          aria-hidden="true"
          className="h-7 w-7 -rotate-90"
        >
          <circle
            cx="17"
            cy="17"
            r={radius}
            fill="none"
            stroke="rgba(147, 197, 253, 0.2)"
            strokeWidth="2.2"
          />
          <circle
            cx="17"
            cy="17"
            r={radius}
            fill="none"
            stroke="#93C5FD"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <ArrowUp
          className="absolute h-3.5 w-3.5 text-[#F8FAFC] transition-transform duration-200 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </span>
      <span className="hidden sm:inline">Back to Top</span>
    </button>
  );
}
