import { useEffect, useRef, useState } from 'react';
import { PROFILE_INFO } from '../data/profileInfo';

const SPARK_ANGLES = [0, 60, 120, 180, 240, 300];

export function DownloadCVButton({
  variant = 'desktop',
  onTriggered,
  className = '',
}) {
  // 'idle' | 'downloading' | 'complete'
  const [phase, setPhase] = useState('idle');
  const [pulseSeq, setPulseSeq] = useState(0);
  const timersRef = useRef([]);

  const clearTimers = () => {
    for (const id of timersRef.current) {
      window.clearTimeout(id);
    }
    timersRef.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const triggerDownloadFile = () => {
    try {
      const link = document.createElement('a');
      link.href = PROFILE_INFO.cvUrl;
      link.download = 'Haji_Gul_CV.pdf';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      // Fallback ignored if synthetic download is blocked in headless contexts
    }
  };

  const handleClick = () => {
    if (phase === 'downloading') return;
    clearTimers();

    setPulseSeq((prev) => prev + 1);
    setPhase('downloading');
    triggerDownloadFile();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

    const completeDelay = prefersReducedMotion ? 180 : 940;
    const resetDelay = prefersReducedMotion ? 1600 : 2850;

    const completeTimer = window.setTimeout(() => {
      setPhase('complete');
      if (onTriggered) onTriggered();
    }, completeDelay);

    const resetTimer = window.setTimeout(() => {
      setPhase('idle');
    }, resetDelay);

    timersRef.current = [completeTimer, resetTimer];
  };

  const isMobile = variant === 'mobile';
  const label =
    phase === 'downloading'
      ? isMobile
        ? 'Preparing Academic CV...'
        : 'Downloading...'
      : phase === 'complete'
        ? isMobile
          ? 'Academic CV Saved'
          : 'CV Saved'
        : isMobile
          ? 'Download Academic CV'
          : 'Download CV';

  const toneClass =
    phase === 'complete'
      ? 'border-emerald-400/75 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 shadow-[inset_0_1px_0_rgba(167,243,208,0.4),0_10px_28px_-6px_rgba(16,185,129,0.65)]'
      : phase === 'downloading'
        ? 'border-[#60A5FA]/80 bg-gradient-to-br from-[#1D4ED8] via-[#1E40AF] to-[#172554] shadow-[inset_0_1px_0_rgba(191,219,254,0.35),0_10px_28px_-6px_rgba(59,130,246,0.7)]'
        : 'border-[#3B82F6]/65 bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] shadow-[inset_0_1px_0_rgba(147,197,253,0.32),0_6px_18px_-6px_rgba(37,99,235,0.55)] hover:-translate-y-0.5 hover:border-[#93C5FD] hover:shadow-[0_10px_26px_-6px_rgba(37,99,235,0.8)]';

  return (
    <button
      type="button"
      onClick={handleClick}
      data-testid={isMobile ? 'download-cv-mobile-btn' : 'download-cv-btn'}
      data-download-phase={phase}
      title="Download Academic Curriculum Vitae (PDF)"
      aria-label="Download Academic Curriculum Vitae (PDF)"
      className={`group relative overflow-visible whitespace-nowrap shrink-0 font-semibold tracking-[0.01em] text-white transition-all duration-300 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${
        isMobile
          ? 'mt-2.5 flex min-h-[46px] w-full items-center justify-between rounded-xl border px-4 text-sm'
          : 'inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs'
      } ${toneClass} ${className}`}
    >
      {/* Expanding outer ripple halo when pressed */}
      {pulseSeq > 0 && phase !== 'idle' && (
        <span
          key={`ripple-${pulseSeq}-${phase}`}
          aria-hidden="true"
          className={`animate-download-ripple pointer-events-none absolute -inset-0.5 rounded-xl border ${
            phase === 'complete'
              ? 'border-emerald-300/80'
              : 'border-[#93C5FD]/80'
          }`}
        />
      )}

      {/* Clipped internal surface for liquid progress fill & optical glint */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[11px]"
      >
        {phase === 'downloading' && (
          <span
            key={`progress-${pulseSeq}`}
            className="animate-download-progress absolute inset-0 bg-gradient-to-r from-[#38BDF8]/35 via-[#60A5FA]/45 to-[#93C5FD]/35"
          />
        )}
        <span className="animate-beam-sweep absolute top-0 left-0 h-px w-20 bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-70" />
      </span>

      {/* Animated Icon Stage with Radial Celebratory Sparkles on Complete */}
      <span className="relative z-10 inline-flex items-center gap-2">
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
          {/* Celebratory radial spark burst on completion */}
          {phase === 'complete' &&
            SPARK_ANGLES.map((angle) => (
              <span
                key={`spark-${pulseSeq}-${angle}`}
                aria-hidden="true"
                style={{ '--spark-angle': `${angle}deg` }}
                className="animate-download-spark pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -ml-[3px] -mt-[3px] rounded-full bg-emerald-200 shadow-[0_0_8px_rgba(167,243,208,0.95)]"
              />
            ))}

          {phase === 'idle' && (
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="h-4 w-4 text-[#DBEAFE]"
            >
              {/* Arrow glides gently down on hover */}
              <g className="transition-transform duration-200 group-hover:translate-y-0.5">
                <path
                  d="M10 3.25V12.25M10 12.25L6.5 8.75M10 12.25L13.5 8.75"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              {/* Crisp receiver tray */}
              <path
                d="M4 14.25V15.5C4 16.19 4.56 16.75 5.25 16.75H14.75C15.44 16.75 16 16.19 16 15.5V14.25"
                stroke="currentColor"
                strokeWidth="1.65"
                strokeLinecap="round"
              />
            </svg>
          )}

          {phase === 'downloading' && (
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="h-4 w-4 text-white"
            >
              {/* Spinning orbital track */}
              <circle
                cx="10"
                cy="10"
                r="8.25"
                stroke="rgba(191, 219, 254, 0.25)"
                strokeWidth="1.5"
              />
              <path
                d="M10 1.75A8.25 8.25 0 0 1 18.25 10"
                stroke="#93C5FD"
                strokeWidth="1.75"
                strokeLinecap="round"
                className="origin-center animate-spin"
              />
              {/* Plunging download arrow */}
              <g className="animate-download-arrow">
                <path
                  d="M10 5.25V12.25M10 12.25L7.4 9.65M10 12.25L12.6 9.65"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          )}

          {phase === 'complete' && (
            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="animate-combo-pop h-4 w-4 text-emerald-100"
            >
              <circle
                cx="10"
                cy="10"
                r="8.25"
                fill="rgba(167, 243, 208, 0.18)"
                stroke="rgba(167, 243, 208, 0.85)"
                strokeWidth="1.4"
              />
              <path
                d="M6.25 10.3L8.85 12.85L13.95 7.45"
                stroke="#ECFDF5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-check-draw"
              />
            </svg>
          )}
        </span>

        <span className="transition-opacity duration-200">{label}</span>
      </span>

      {isMobile && (
        <span
          aria-hidden="true"
          className="relative z-10 font-mono text-[11px] uppercase tracking-wider text-white/80"
        >
          {phase === 'complete' ? 'Done' : phase === 'downloading' ? 'PDF' : 'PDF'}
        </span>
      )}

      <span className="sr-only" aria-live="polite">
        {phase === 'downloading'
          ? 'Downloading Haji Gul CV PDF'
          : phase === 'complete'
            ? 'Haji Gul CV PDF download started'
            : ''}
      </span>
    </button>
  );
}
