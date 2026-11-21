import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import {
  SPLASH_HIGHLIGHTS,
  SPLASH_PROFILE,
  computeSplashProgress,
  getSplashStatusLabel,
  shouldSkipSplash,
} from '../utils/splashScreen';

export function LoadingScreen({ onComplete }) {
  const [skipImmediate] = useState(() => {
    if (typeof window === 'undefined') return false;
    return shouldSkipSplash(window.location.search);
  });

  const [phase, setPhase] = useState(skipImmediate ? 'done' : 'loading'); // 'loading' | 'fading' | 'done'
  const [progress, setProgress] = useState(skipImmediate ? 100 : 0);
  const [imgError, setImgError] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 36 });
  const timersRef = useRef({ rafId: 0, holdTimer: 0, fadeTimer: 0 });
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Lock page scroll strictly while the splash is actively blocking the viewport,
  // and guarantee clean restoration as soon as fade-out begins or component unmounts.
  useEffect(() => {
    if (phase !== 'loading') {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [phase]);

  useEffect(() => {
    if (skipImmediate) {
      onCompleteRef.current?.();
      return undefined;
    }

    const prefersReducedMotion = Boolean(
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    );
    const totalMs = prefersReducedMotion
      ? SPLASH_PROFILE.reducedMotionDurationMs
      : SPLASH_PROFILE.durationMs;

    const startTime = performance.now();

    const beginFadeOut = () => {
      setProgress(100);
      setPhase((current) => {
        if (current !== 'loading') return current;
        timersRef.current.fadeTimer = window.setTimeout(() => {
          setPhase('done');
          onCompleteRef.current?.();
        }, SPLASH_PROFILE.exitTransitionMs);
        return 'fading';
      });
    };

    const tick = (now) => {
      const elapsed = now - startTime;
      setProgress(computeSplashProgress(elapsed, totalMs));
      if (elapsed < totalMs) {
        timersRef.current.rafId = window.requestAnimationFrame(tick);
      }
    };

    timersRef.current.rafId = window.requestAnimationFrame(tick);
    timersRef.current.holdTimer = window.setTimeout(beginFadeOut, totalMs);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
        window.cancelAnimationFrame(timersRef.current.rafId);
        window.clearTimeout(timersRef.current.holdTimer);
        beginFadeOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(timersRef.current.rafId);
      window.clearTimeout(timersRef.current.holdTimer);
      window.clearTimeout(timersRef.current.fadeTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [skipImmediate]);

  const handleEnterNow = () => {
    if (phase !== 'loading') return;
    window.cancelAnimationFrame(timersRef.current.rafId);
    window.clearTimeout(timersRef.current.holdTimer);
    setProgress(100);
    setPhase('fading');
    timersRef.current.fadeTimer = window.setTimeout(() => {
      setPhase('done');
      onCompleteRef.current?.();
    }, SPLASH_PROFILE.exitTransitionMs);
  };

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    setPointer({
      x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
    });
  };

  if (phase === 'done') {
    return null;
  }

  const isFading = phase === 'fading';
  const bioParts = SPLASH_PROFILE.bio.split(' | ');
  const statusCaption = getSplashStatusLabel(progress);

  return (
    <div
      data-testid="loading-screen"
      data-state={phase}
      role="dialog"
      aria-modal="true"
      aria-label="Loading Haji Gul academic research portfolio"
      onMouseMove={handlePointerMove}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#06090F] px-4 py-6 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated multi-layered deep-sapphire & indigo studio aurora */}
      <div
        aria-hidden="true"
        className="animate-splash-aurora pointer-events-none absolute -inset-12 bg-[radial-gradient(ellipse_62%_48%_at_50%_18%,rgba(37,99,235,0.34),transparent_68%),radial-gradient(ellipse_48%_42%_at_18%_82%,rgba(14,165,233,0.18),transparent_65%),radial-gradient(ellipse_46%_42%_at_84%_78%,rgba(99,102,241,0.2),transparent_66%)]"
      />

      {/* Interactive pointer-reactive studio light */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(520px circle at ${pointer.x}% ${pointer.y}%, rgba(96, 165, 250, 0.14), transparent 70%)`,
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
      />

      {/* Precision coordinate grid with radial vignette */}
      <div
        aria-hidden="true"
        className="architect-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_76%)]"
      />

      {/* Living Knowledge-Graph Constellation SVG with flowing signal edges */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 760"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="constellationBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <g stroke="url(#constellationBeam)" strokeWidth="1" fill="none">
          <circle cx="600" cy="375" r="285" strokeDasharray="5 12" strokeOpacity="0.45" />
          <circle cx="600" cy="375" r="395" strokeDasharray="2 16" strokeOpacity="0.28" />
          <path d="M120 190 L265 255 L210 420 L340 490" strokeOpacity="0.35" />
          <path d="M1080 185 L935 270 L995 435 L865 510" strokeOpacity="0.35" />
          <path d="M265 255 L420 175" strokeOpacity="0.3" />
          <path d="M935 270 L785 165" strokeOpacity="0.3" />
        </g>
        {/* Animated flowing knowledge signal packets */}
        <g stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="8 36" fill="none" className="animate-edge-flow">
          <path d="M120 190 L265 255 L340 490" />
          <path d="M1080 185 L935 270 L865 510" />
        </g>
        <g fill="#93C5FD" fillOpacity="0.8">
          <circle cx="120" cy="190" r="3.2" />
          <circle cx="265" cy="255" r="4" />
          <circle cx="210" cy="420" r="2.8" />
          <circle cx="340" cy="490" r="3.2" />
          <circle cx="420" cy="175" r="2.6" />
          <circle cx="1080" cy="185" r="3.2" />
          <circle cx="935" cy="270" r="4" />
          <circle cx="995" cy="435" r="2.8" />
          <circle cx="865" cy="510" r="3.2" />
          <circle cx="785" cy="165" r="2.6" />
        </g>
      </svg>

      {/* Centered Editorial Glass Profile Stage (No LinkedIn Banner Strip) */}
      <div
        className={`relative z-10 w-full max-w-[590px] overflow-hidden rounded-[2rem] border border-white/14 bg-gradient-to-b from-[#131B2B]/90 via-[#0E1420]/94 to-[#0A0E17]/96 px-6 py-8 text-center shadow-[0_42px_110px_-22px_rgba(37,99,235,0.52),inset_0_1px_0_rgba(147,197,253,0.26)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-10 sm:py-10 ${
          isFading ? 'translate-y-2 scale-[0.975] opacity-0' : 'translate-y-0 scale-100 opacity-100'
        }`}
      >
        {/* Animated traveling sapphire optical beam across top bezel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#93C5FD]/85 to-transparent"
        />
        <div
          aria-hidden="true"
          className="animate-beam-sweep pointer-events-none absolute left-0 top-0 h-[1.5px] w-44 bg-gradient-to-r from-transparent via-[#E0F2FE] to-transparent"
        />

        {/* Soft zenith spotlight behind centered portrait */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -top-6 h-60 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.32),rgba(14,165,233,0.1)_48%,transparent_74%)] blur-2xl"
        />

        {/* Centered Portrait with Kinetic Triple-Ring Orbital Astrolabe */}
        <div
          style={{ animationDelay: '40ms' }}
          className="animate-splash-reveal relative mx-auto flex h-44 w-44 items-center justify-center sm:h-48 sm:w-48"
        >
          {/* Outer slow-rotating constellation ring */}
          <svg
            viewBox="0 0 200 200"
            aria-hidden="true"
            className="animate-orbit-slow pointer-events-none absolute inset-0 h-full w-full opacity-80"
          >
            <defs>
              <linearGradient id="splashOuterOrbit" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <circle
              cx="100"
              cy="100"
              r="93"
              fill="none"
              stroke="url(#splashOuterOrbit)"
              strokeWidth="1.2"
              strokeDasharray="6 10"
            />
            <circle cx="100" cy="7" r="3.6" fill="#BAE6FD" />
            <circle cx="193" cy="100" r="2.6" fill="#38BDF8" />
            <circle cx="34" cy="164" r="3" fill="#60A5FA" />
          </svg>

          {/* Middle counter-rotating precision arc ring */}
          <svg
            viewBox="0 0 200 200"
            aria-hidden="true"
            className="animate-orbit-reverse pointer-events-none absolute inset-2.5 h-[calc(100%-1.25rem)] w-[calc(100%-1.25rem)] opacity-75"
          >
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="#60A5FA"
              strokeOpacity="0.45"
              strokeWidth="1.15"
              strokeDasharray="48 28 18 32"
              strokeLinecap="round"
            />
          </svg>

          {/* Soft inner cobalt glow aura */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-32 w-32 rounded-full bg-[#2563EB]/38 blur-xl sm:h-36 sm:w-36"
          />

          {/* Framed Circular Portrait */}
          <div className="relative h-32 w-32 rounded-full bg-gradient-to-b from-[#BAE6FD] via-[#3B82F6] to-[#1D4ED8] p-[2.5px] shadow-[0_22px_54px_-12px_rgba(37,99,235,0.82)] sm:h-36 sm:w-36">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] ring-4 ring-[#0E1420]">
              {!imgError ? (
                <>
                  <picture className="block h-full w-full">
                    <source
                      srcSet={SPLASH_PROFILE.avatarUrl.replace(/\.png$/i, '.webp')}
                      type="image/webp"
                    />
                    <img
                      src={SPLASH_PROFILE.avatarUrl}
                      alt={`${SPLASH_PROFILE.name} portrait`}
                      width={144}
                      height={144}
                      fetchPriority="high"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="h-full w-full scale-[1.03] object-cover object-top"
                    />
                  </picture>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(10,16,28,0.3)]"
                  />
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#0F172A] font-display text-3xl font-bold text-white">
                  HG
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Centered Name, Verified Mark & Exact Bio */}
        <div
          style={{ animationDelay: '130ms' }}
          className="animate-splash-reveal relative mt-4"
        >
          <div className="flex items-center justify-center gap-2">
            <p className="bg-gradient-to-b from-white via-[#F1F5F9] to-[#BFDBFE] bg-clip-text font-display text-3xl font-extrabold tracking-tight text-transparent sm:text-[2.35rem]">
              {SPLASH_PROFILE.name}
            </p>
            <BadgeCheck
              className="h-5 w-5 shrink-0 text-[#38BDF8] drop-shadow-[0_0_10px_rgba(56,189,248,0.55)]"
              aria-label="Verified Academic Researcher"
            />
          </div>

          <p
            data-testid="loading-screen-bio"
            className="mx-auto mt-3 max-w-[48ch] text-sm font-medium leading-relaxed text-[#E2E8F0] sm:text-[15px]"
          >
            {bioParts.map((part, idx) => (
              <span key={part}>
                <span>{part}</span>
                {idx < bioParts.length - 1 && (
                  <span aria-hidden="true" className="mx-1.5 text-[#38BDF8]/75">
                    |
                  </span>
                )}
              </span>
            ))}
          </p>

          <p className="mt-3 text-xs text-[#94A3B8]">
            <span>{SPLASH_PROFILE.affiliation}</span>
            <span aria-hidden="true" className="mx-1.5 text-[#475569]">
              ·
            </span>
            <span className="font-medium text-[#93C5FD]">
              {SPLASH_PROFILE.fellowship}
            </span>
          </p>
        </div>

        {/* Grounded Academic Impact Proof Strip (Unboxed Tabular Numerals) */}
        <div
          style={{ animationDelay: '220ms' }}
          className="animate-splash-reveal relative mx-auto mt-6 grid max-w-md grid-cols-4 divide-x divide-white/10 border-y border-white/10 py-3.5"
        >
          {SPLASH_HIGHLIGHTS.map((stat) => (
            <div key={stat.label} className="px-2 text-center">
              <p className="font-mono text-base font-bold text-[#F8FAFC] tabular-nums sm:text-lg">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-[#8B95A5]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Dynamic Staged Progress Bar + Instant Enter Action */}
        <div
          style={{ animationDelay: '300ms' }}
          className="animate-splash-reveal relative mx-auto mt-5 max-w-md"
        >
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="truncate font-medium text-[#94A3B8]">
              {statusCaption}
            </span>
            <span
              data-testid="loading-screen-progress"
              className="shrink-0 font-mono font-semibold text-[#60A5FA] tabular-nums"
            >
              {progress}%
            </span>
          </div>

          <div
            role="progressbar"
            aria-label="Portfolio loading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="relative mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
          >
            <div
              style={{
                transform: `scaleX(${progress / 100})`,
                transformOrigin: 'left center',
              }}
              className="h-full w-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#38BDF8] shadow-[0_0_14px_rgba(56,189,248,0.65)] transition-transform duration-100 ease-out"
            />
          </div>

          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={handleEnterNow}
              className="group inline-flex min-h-[40px] items-center gap-2 rounded-xl border border-[#3B82F6]/45 bg-[#2563EB]/15 px-5 py-2 text-xs font-semibold text-[#E2E8F0] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#60A5FA] hover:bg-[#2563EB]/30 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
            >
              <span>Enter Portfolio</span>
              <ArrowRight
                className="h-3.5 w-3.5 text-[#93C5FD] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
