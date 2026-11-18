import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  GraduationCap,
  Hash,
  Mail,
} from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import {
  HERO_ROLE_TITLES,
  getTypewriterDelayMs,
  stepTypewriterState,
} from '../utils/typewriter';
import {
  GitHubIcon,
  GoogleScholarIcon,
  LinkedInIcon,
  OrcidIcon,
  ScopusIcon,
  YouTubeIcon,
} from './BrandIcons';
import { NetworkCanvas } from './NetworkCanvas';
import { AnimatedCounter } from './AnimatedCounter';

const HERO_SPOTLIGHTS = [
  {
    id: 'kgc',
    tab: 'KG Completion',
    venue: 'PAKDD 2025 · ACL BioNLP · DAAD AInet Fellowship',
    summary:
      'Negative-sampling-free BERT & LLM architectures (MuCo-KGC, MuCoS, DualRep) reasoning over relational knowledge graphs at scale.',
    href: '#publications',
  },
  {
    id: 'mucos',
    tab: 'MuCoS',
    venue: 'BioNLP @ ACL 2025 · AdaptiveBotsLab',
    summary:
      'MuCoS: Multi-context-aware sampling for drug-target prediction (BioNLP@ACL 2025). Also mirrored at AdaptiveBotsLab.',
    href: '#publications',
  },
  {
    id: 'biomedical',
    tab: 'Drug Discovery & GNNs',
    venue: 'KEGG50k / PharmKG-8k · Artificial Intelligence Review',
    summary:
      'Multi-context biomedical sampling, protein–protein link prediction, and explainable graph intelligence for clinical and ICS safety.',
    href: '#expertise-cloud',
  },
];

function useTypewriterRole(roles = HERO_ROLE_TITLES) {
  const [prefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' &&
    Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  );
  const [state, setState] = useState({
    roleIndex: 0,
    charCount: prefersReducedMotion ? roles[0].length : 0,
    phase: prefersReducedMotion ? 'pausing' : 'typing',
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const delayMs = getTypewriterDelayMs(state);
    const timer = window.setTimeout(() => {
      setState((prev) => stepTypewriterState(prev, roles));
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, roles, state]);

  const activePhrase = roles[state.roleIndex] ?? '';
  return activePhrase.slice(0, state.charCount);
}

export function HeroSection() {
  const [imgError, setImgError] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(0);
  const [spotlightPaused, setSpotlightPaused] = useState(false);
  const [portraitTilt, setPortraitTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 40 });
  const typedRole = useTypewriterRole(HERO_ROLE_TITLES);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || spotlightPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveSpotlightIndex((prev) => (prev + 1) % HERO_SPOTLIGHTS.length);
    }, 4600);

    return () => window.clearInterval(timer);
  }, [spotlightPaused]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_INFO.emails.academic);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handlePortraitMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    setPortraitTilt({
      rx: Number(((0.5 - ny) * 5).toFixed(2)),
      ry: Number(((nx - 0.5) * 6).toFixed(2)),
      gx: Math.round(nx * 100),
      gy: Math.round(ny * 100),
    });
  };

  const resetPortraitTilt = () => {
    setPortraitTilt({ rx: 0, ry: 0, gx: 50, gy: 40 });
  };

  const activeSpotlight = HERO_SPOTLIGHTS[activeSpotlightIndex];

  const brandProfiles = [
    {
      id: 'scholar',
      label: 'Scholar',
      ariaLabel: 'Google Scholar (367+ citations)',
      href: PROFILE_INFO.links.scholar,
      Icon: GoogleScholarIcon,
      badge: `${PROFILE_INFO.metrics.citations}+`,
      // Google Scholar Blue (#4285F4)
      colorClass: 'text-[#4285F4]',
      borderClass: 'border-white/12 hover:border-[#4285F4]/75',
      bgHoverClass: 'hover:bg-[#4285F4]/12',
      shadowClass: 'hover:shadow-[0_0_22px_-2px_rgba(66,133,244,0.6)]',
      dotClass: 'bg-[#4285F4]',
      beamGradient: 'from-transparent via-[#4285F4] to-transparent',
      glowGradient: 'from-[#4285F4]/0 via-[#4285F4]/20 to-[#4285F4]/0',
    },
    {
      id: 'scopus',
      label: 'Scopus',
      ariaLabel: `Scopus Author Profile (ID: ${PROFILE_INFO.scopusId})`,
      href: PROFILE_INFO.links.scopus,
      Icon: ScopusIcon,
      badge: 'ID',
      // Scopus Orange (#F97316 / #EA580C)
      colorClass: 'text-[#FB923C]',
      borderClass: 'border-white/12 hover:border-[#F97316]/80',
      bgHoverClass: 'hover:bg-[#F97316]/15',
      shadowClass: 'hover:shadow-[0_0_22px_-2px_rgba(249,115,22,0.65)]',
      dotClass: 'bg-[#F97316]',
      beamGradient: 'from-transparent via-[#FB923C] to-transparent',
      glowGradient: 'from-[#F97316]/0 via-[#F97316]/20 to-[#F97316]/0',
    },
    {
      id: 'github',
      label: 'GitHub',
      ariaLabel: 'GitHub Repositories',
      href: PROFILE_INFO.links.github,
      Icon: GitHubIcon,
      // GitHub Purple / Platinum (#A855F7)
      colorClass: 'text-[#C084FC]',
      borderClass: 'border-white/12 hover:border-[#A855F7]/75',
      bgHoverClass: 'hover:bg-[#A855F7]/12',
      shadowClass: 'hover:shadow-[0_0_22px_-2px_rgba(168,85,247,0.6)]',
      dotClass: 'bg-[#A855F7]',
      beamGradient: 'from-transparent via-[#C084FC] to-transparent',
      glowGradient: 'from-[#A855F7]/0 via-[#A855F7]/20 to-[#A855F7]/0',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      ariaLabel: 'LinkedIn Profile',
      href: PROFILE_INFO.links.linkedin,
      Icon: LinkedInIcon,
      // LinkedIn Blue (#0A66C2)
      colorClass: 'text-[#0A66C2]',
      borderClass: 'border-white/12 hover:border-[#0A66C2]/80',
      bgHoverClass: 'hover:bg-[#0A66C2]/15',
      shadowClass: 'hover:shadow-[0_0_22px_-2px_rgba(10,102,194,0.65)]',
      dotClass: 'bg-[#0A66C2]',
      beamGradient: 'from-transparent via-[#38BDF8] to-transparent',
      glowGradient: 'from-[#0A66C2]/0 via-[#0A66C2]/20 to-[#0A66C2]/0',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      ariaLabel: 'YouTube Channel & 219+ Video Lectures',
      href: PROFILE_INFO.links.youtube,
      Icon: YouTubeIcon,
      badge: `${PROFILE_INFO.metrics.videos}+`,
      // YouTube Red (#FF0000 / #EF4444)
      colorClass: 'text-[#EF4444]',
      borderClass: 'border-white/12 hover:border-[#EF4444]/80',
      bgHoverClass: 'hover:bg-[#EF4444]/15',
      shadowClass: 'hover:shadow-[0_0_22px_-2px_rgba(239,68,68,0.65)]',
      dotClass: 'bg-[#EF4444]',
      beamGradient: 'from-transparent via-[#EF4444] to-transparent',
      glowGradient: 'from-[#EF4444]/0 via-[#EF4444]/20 to-[#EF4444]/0',
    },
    {
      id: 'orcid',
      label: 'ORCID',
      ariaLabel: 'ORCID Academic Record',
      href: PROFILE_INFO.links.orcid,
      Icon: OrcidIcon,
      // ORCID Lime-Green (#A6CE39)
      colorClass: 'text-[#A6CE39]',
      borderClass: 'border-white/12 hover:border-[#A6CE39]/80',
      bgHoverClass: 'hover:bg-[#A6CE39]/15',
      shadowClass: 'hover:shadow-[0_0_22px_-2px_rgba(166,206,57,0.65)]',
      dotClass: 'bg-[#A6CE39]',
      beamGradient: 'from-transparent via-[#A6CE39] to-transparent',
      glowGradient: 'from-[#A6CE39]/0 via-[#A6CE39]/20 to-[#A6CE39]/0',
    },
    {
      id: 'email',
      label: 'Email',
      ariaLabel: 'Copy Academic Email',
      isEmailButton: true,
      Icon: Mail,
      // Academic Email Cyan (#06B6D4)
      colorClass: 'text-[#06B6D4]',
      borderClass: 'border-white/12 hover:border-[#06B6D4]/80',
      bgHoverClass: 'hover:bg-[#06B6D4]/15',
      shadowClass: 'hover:shadow-[0_0_22px_-2px_rgba(6,182,212,0.65)]',
      dotClass: 'bg-[#06B6D4]',
      beamGradient: 'from-transparent via-[#22D3EE] to-transparent',
      glowGradient: 'from-[#06B6D4]/0 via-[#06B6D4]/20 to-[#06B6D4]/0',
    },
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#0C0F14]"
    >
      {/* 2050 Spatial Coordinate Grid with soft radial fade */}
      <div
        aria-hidden="true"
        className="architect-grid pointer-events-none absolute inset-0 opacity-75 [mask-image:radial-gradient(ellipse_at_70%_25%,black_15%,transparent_78%)]"
      />

      {/* Multi-layered atmospheric cobalt & deep-sapphire volumetric glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.26),transparent_58%),radial-gradient(ellipse_at_bottom_left,rgba(29,78,216,0.14),transparent_55%)]"
      />

      <NetworkCanvas />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pt-18 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Expressive Typography, Interactive Research Spotlight & Action Dock */}
          <div className="animate-panel-enter lg:col-span-7">
            <div
              data-testid="hero-subheadline"
              className="flex flex-col gap-0.5 text-sm font-medium tracking-[0.02em] sm:flex-row sm:items-center sm:gap-2"
            >
              <span className="inline-flex min-h-[1.375rem] items-center whitespace-nowrap font-semibold text-[#60A5FA]">
                <span data-testid="hero-typed-role" aria-hidden="true">
                  {typedRole}
                </span>
                <span
                  data-testid="hero-typewriter-caret"
                  aria-hidden="true"
                  className="animate-caret-blink ml-0.5 inline-block h-[1.05em] w-[2px] rounded-xs bg-[#93C5FD]"
                />
                <span className="sr-only">
                  {HERO_ROLE_TITLES.join(', ')}
                </span>
              </span>
              <span aria-hidden="true" className="hidden text-[#475569] sm:inline">
                ·
              </span>
              <span className="whitespace-nowrap text-[#94A3B8]">
                Universiti Brunei Darussalam
              </span>
            </div>

            <h1
              className="mt-4 bg-gradient-to-br from-[#FFFFFF] via-[#F3F5F8] to-[#93C5FD] bg-clip-text text-5xl font-extrabold leading-[0.98] tracking-[-0.035em] text-transparent sm:text-[4.75rem] lg:text-[6.25rem]"
              style={{ textWrap: 'balance' }}
            >
              {PROFILE_INFO.name}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed tracking-[0.01em] text-[#C4CCD6] sm:text-lg">
              {PROFILE_INFO.summary}
            </p>

            {/* Interactive Auto-Cycling Research Spotlight (Engaging Kinetic Switcher) */}
            <div
              data-testid="hero-spotlight"
              onMouseEnter={() => setSpotlightPaused(true)}
              onMouseLeave={() => setSpotlightPaused(false)}
              className="relative mt-7 overflow-hidden border-y border-white/12 bg-gradient-to-r from-[#111827]/45 via-transparent to-transparent py-4 pl-0.5"
            >
              {/* Optical 1px cobalt beam sweep gliding along upper rail */}
              <div
                aria-hidden="true"
                className="animate-beam-sweep pointer-events-none absolute top-0 left-0 h-px w-40 bg-gradient-to-r from-transparent via-[#93C5FD] to-transparent"
              />
              <div
                role="tablist"
                aria-label="Core research highlights"
                className="flex flex-wrap items-center gap-1.5"
              >
                {HERO_SPOTLIGHTS.map((item, idx) => {
                  const isActive = idx === activeSpotlightIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveSpotlightIndex(idx)}
                      className={
                        isActive
                          ? 'relative overflow-hidden rounded-lg border border-[#3B82F6]/65 bg-[#2563EB]/20 px-3 py-1.5 text-xs font-semibold text-[#F8FAFC] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#60A5FA]'
                          : 'rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-[#8B95A5] transition-colors hover:border-[#3B82F6]/45 hover:text-[#93C5FD] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]'
                      }
                    >
                      <span>{item.tab}</span>
                      {isActive && !spotlightPaused && (
                        <span
                          key={`bar-${activeSpotlight.id}`}
                          aria-hidden="true"
                          className="animate-hero-bar absolute inset-x-0 bottom-0 h-[2px] bg-[#60A5FA]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div
                key={activeSpotlight.id}
                className="animate-hero-spotlight mt-3.5"
              >
                <p className="font-mono text-xs text-[#60A5FA]">
                  {activeSpotlight.venue}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#E2E8F0]">
                  {activeSpotlight.summary}{' '}
                  <a
                    href={activeSpotlight.href}
                    className="inline-flex items-center gap-0.5 font-medium text-[#60A5FA] hover:text-[#93C5FD] hover:underline"
                  >
                    <span>Explore</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </p>
              </div>
            </div>

            {/* High-Impact Action & Brand-Animated Academic Profiles Dock */}
            <div
              data-testid="hero-action-dock"
              className="mt-8 flex flex-wrap items-center gap-2 sm:gap-2.5"
            >
              {/* Primary Publications Action */}
              <a
                href="#publications"
                aria-label="View Publications & Code Archive"
                className="group relative inline-flex min-h-[40px] items-center gap-2 overflow-hidden rounded-xl border border-[#3B82F6]/70 bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_20px_-4px_rgba(37,99,235,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93C5FD] hover:shadow-[0_8px_28px_-4px_rgba(37,99,235,0.8)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
              >
                <span>Publications</span>
                <ArrowDown className="h-3.5 w-3.5 text-[#93C5FD] transition-transform duration-200 group-hover:translate-y-0.5" />
              </a>

              {/* Brand Profiles with Signature Color Animations */}
              {brandProfiles.map((item) => {
                const Icon = item.Icon;

                if (item.isEmailButton) {
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label={item.ariaLabel}
                      className={`group relative inline-flex min-h-[40px] items-center gap-2 overflow-hidden rounded-xl border bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-[#F3F5F8] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 ${item.borderClass} ${item.bgHoverClass} ${item.shadowClass}`}
                    >
                      {/* Animated Brand Color Traveling Laser Glint */}
                      <span
                        aria-hidden="true"
                        className={`animate-beam-sweep pointer-events-none absolute top-0 left-0 h-px w-24 bg-gradient-to-r ${item.beamGradient} opacity-70 group-hover:opacity-100`}
                      />

                      {/* Brand Radial Glow Aura on Hover */}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-r ${item.glowGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                      />

                      {/* Pulsing Brand Beacon Dot */}
                      <span className="relative flex h-2 w-2 items-center justify-center">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${item.dotClass} opacity-75`} />
                        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${item.dotClass}`} />
                      </span>

                      {copiedEmail ? (
                        <span className="inline-flex items-center gap-1 font-sans font-semibold text-[#4ADE80]">
                          <Check className="h-3.5 w-3.5 shrink-0" />
                          <span>Copied!</span>
                        </span>
                      ) : (
                        <>
                          <Icon className={`h-3.5 w-3.5 shrink-0 transition-all duration-200 group-hover:scale-115 ${item.colorClass}`} />
                          <span>{item.label}</span>
                        </>
                      )}
                    </button>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    aria-label={item.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative inline-flex min-h-[40px] items-center gap-2 overflow-hidden rounded-xl border bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-[#F3F5F8] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 ${item.borderClass} ${item.bgHoverClass} ${item.shadowClass}`}
                  >
                    {/* Animated Brand Color Traveling Laser Glint */}
                    <span
                      aria-hidden="true"
                      className={`animate-beam-sweep pointer-events-none absolute top-0 left-0 h-px w-24 bg-gradient-to-r ${item.beamGradient} opacity-70 group-hover:opacity-100`}
                    />

                    {/* Brand Radial Glow Aura on Hover */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 -z-10 rounded-xl bg-gradient-to-r ${item.glowGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                    />

                    {/* Pulsing Brand Beacon Dot */}
                    <span className="relative flex h-2 w-2 items-center justify-center">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${item.dotClass} opacity-75`} />
                      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${item.dotClass}`} />
                    </span>

                    <Icon className={`h-3.5 w-3.5 shrink-0 transition-all duration-200 group-hover:scale-115 group-hover:rotate-[-6deg] ${item.colorClass}`} />
                    <span>{item.label}</span>

                    {item.badge && (
                      <span className="rounded-full bg-white/[0.06] border border-white/10 px-1.5 py-0.2 font-mono text-[10px] font-semibold text-[#CBD5E1] transition-colors group-hover:border-current group-hover:text-white">
                        {item.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Kinetic Orbital Stage + Interactive 3D-Tilt Portrait Card */}
          <div
            style={{ animationDelay: '90ms' }}
            className="animate-panel-enter relative lg:col-span-5"
          >
            {/* Outer counter-rotating orbital constellations framing the portrait */}
            <svg
              viewBox="0 0 420 420"
              aria-hidden="true"
              className="animate-orbit-slow pointer-events-none absolute -right-12 -top-12 h-72 w-72 opacity-40"
            >
              <circle
                cx="210"
                cy="210"
                r="186"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1.15"
                strokeDasharray="6 10"
              />
              <circle cx="210" cy="24" r="4.2" fill="#60A5FA" />
              <circle cx="396" cy="210" r="3" fill="#2563EB" />
              <circle cx="80" cy="340" r="3.2" fill="#93C5FD" />
            </svg>

            <svg
              viewBox="0 0 320 320"
              aria-hidden="true"
              className="animate-orbit-reverse pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 opacity-35"
            >
              <circle
                cx="160"
                cy="160"
                r="134"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="1"
                strokeDasharray="3 8"
              />
              <circle cx="160" cy="26" r="3.5" fill="#93C5FD" />
              <circle cx="294" cy="160" r="2.8" fill="#3B82F6" />
            </svg>

            {/* Interactive 3D-Tilt Glass Portrait Frame */}
            <div
              onMouseMove={handlePortraitMove}
              onMouseLeave={resetPortraitTilt}
              style={{
                transform: `perspective(1000px) rotateX(${portraitTilt.rx}deg) rotateY(${portraitTilt.ry}deg)`,
                transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="glass-panel relative overflow-hidden rounded-3xl border border-[#3B82F6]/35 p-3 shadow-[inset_0_1px_0_rgba(147,197,253,0.22),0_32px_80px_-20px_rgba(37,99,235,0.52)]"
            >
              {/* Traveling optical glint along glass bezel top edge */}
              <div
                aria-hidden="true"
                className="animate-beam-sweep pointer-events-none absolute top-0 left-0 z-20 h-px w-48 bg-gradient-to-r from-transparent via-[#93C5FD]/90 to-transparent"
              />

              {/* Cursor-reactive subtle sapphire spotlight sheen */}
              <div
                aria-hidden="true"
                style={{
                  background: `radial-gradient(280px circle at ${portraitTilt.gx}% ${portraitTilt.gy}%, rgba(96, 165, 250, 0.18), transparent 70%)`,
                }}
                className="pointer-events-none absolute inset-0 z-10"
              />

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#0A0D12]">
                {!imgError ? (
                  <img
                    src={PROFILE_INFO.photoUrl}
                    alt="Haji Gul with research collaborators during the DAAD AInet Fellowship in Germany"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.035]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-[#141922] p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#3B82F6] bg-[#0C0F14]">
                      <GraduationCap className="h-7 w-7 text-[#60A5FA]" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-[#F3F5F8]">
                      {PROFILE_INFO.name}
                    </p>
                  </div>
                )}

                {/* Precision 2050 optical 4-corner frame reticles */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-3 h-4 w-4 rounded-tl-md border-l-2 border-t-2 border-[#93C5FD]/75"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-3 h-4 w-4 rounded-tr-md border-r-2 border-t-2 border-[#93C5FD]/75"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 bottom-3 h-4 w-4 rounded-bl-md border-b-2 border-l-2 border-[#93C5FD]/75"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 rounded-br-md border-b-2 border-r-2 border-[#93C5FD]/75"
                />
              </div>

              <div className="relative z-20 mt-3 px-2 pb-1">
                <p className="text-xs font-medium text-[#94A3B8]">
                  {PROFILE_INFO.photoCaption}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={`Copy academic email ${PROFILE_INFO.emails.academic}`}
                    className="inline-flex min-w-0 items-center gap-1.5 font-mono text-[#F3F5F8] transition-colors hover:text-[#60A5FA] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-[#3B82F6]" />
                    <span className="truncate">{PROFILE_INFO.emails.academic}</span>
                    {copiedEmail ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#60A5FA]" />
                    ) : (
                      <Copy className="h-3 w-3 shrink-0 text-[#8B95A5]" />
                    )}
                  </button>

                  <a
                    href={PROFILE_INFO.links.scopus}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`View verified Scopus Author Profile (${PROFILE_INFO.scopusId})`}
                    className="group/scopus inline-flex shrink-0 items-center gap-1.5 font-mono text-[#8B95A5] tabular-nums transition-colors hover:text-[#FB923C] focus-visible:outline-2 focus-visible:outline-[#F97316]"
                  >
                    <ScopusIcon className="h-3.5 w-3.5 text-[#F97316] transition-transform duration-200 group-hover/scopus:scale-110" />
                    <span>Scopus {PROFILE_INFO.scopusId}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform duration-200 group-hover/scopus:translate-x-0.5 group-hover/scopus:-translate-y-0.5 group-hover/scopus:opacity-100" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sleek Borderless Horizontal Telemetry Bar with Animated Counting Numbers */}
        <div
          data-testid="hero-metrics-strip"
          className="relative mt-14 grid grid-cols-2 gap-y-5 overflow-hidden border-t border-white/12 pt-7 sm:grid-cols-5 sm:divide-x sm:divide-white/10"
        >
          <div
            aria-hidden="true"
            className="animate-beam-sweep pointer-events-none absolute top-0 left-0 h-px w-44 bg-gradient-to-r from-transparent via-[#60A5FA]/80 to-transparent"
          />

          <div className="group rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-[#172554]/25 sm:pl-0 sm:pr-5 cursor-default">
            <p className="text-xs font-medium text-[#8B95A5] transition-colors group-hover:text-[#93C5FD]">
              Total Citations
            </p>
            <p className="mt-1 font-mono text-2xl font-semibold text-[#60A5FA] tabular-nums sm:text-3xl">
              <AnimatedCounter
                target={PROFILE_INFO.metrics.citations}
                suffix="+"
                duration={1800}
              />
            </p>
            <p className="mt-0.5 text-xs text-[#687385]">Google Scholar</p>
          </div>

          <div className="group rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-[#172554]/25 sm:px-5 cursor-default">
            <p className="text-xs font-medium text-[#8B95A5] transition-colors group-hover:text-[#93C5FD]">
              h-index
            </p>
            <p className="mt-1 font-mono text-2xl font-semibold text-[#F3F5F8] tabular-nums sm:text-3xl">
              <AnimatedCounter
                target={PROFILE_INFO.metrics.hIndex}
                duration={1300}
              />
            </p>
            <p className="mt-0.5 text-xs text-[#687385]">Impact Index</p>
          </div>

          <div className="group rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-[#172554]/25 sm:px-5 cursor-default">
            <p className="text-xs font-medium text-[#8B95A5] transition-colors group-hover:text-[#93C5FD]">
              i10-index
            </p>
            <p className="mt-1 font-mono text-2xl font-semibold text-[#F3F5F8] tabular-nums sm:text-3xl">
              <AnimatedCounter
                target={PROFILE_INFO.metrics.i10Index}
                duration={1400}
              />
            </p>
            <p className="mt-0.5 text-xs text-[#687385]">10+ Cited Papers</p>
          </div>

          <div className="group rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-[#172554]/25 sm:px-5 cursor-default">
            <p className="text-xs font-medium text-[#8B95A5] transition-colors group-hover:text-[#93C5FD]">
              Publications
            </p>
            <p className="mt-1 font-mono text-2xl font-semibold text-[#60A5FA] tabular-nums sm:text-3xl">
              <AnimatedCounter
                target={PROFILE_INFO.metrics.publications}
                duration={1600}
              />
            </p>
            <p className="mt-0.5 text-xs text-[#687385]">2020 – 2026</p>
          </div>

          <div className="group col-span-2 rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-[#172554]/25 sm:col-span-1 sm:pl-5 sm:pr-0 cursor-default">
            <p className="text-xs font-medium text-[#8B95A5] transition-colors group-hover:text-[#93C5FD]">
              Open Pedagogy
            </p>
            <p className="mt-1 font-mono text-2xl font-semibold text-[#F3F5F8] tabular-nums sm:text-3xl">
              <AnimatedCounter
                target={PROFILE_INFO.metrics.videos}
                suffix="+"
                duration={1900}
              />
            </p>
            <a
              href={PROFILE_INFO.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 inline-flex items-center gap-1 text-xs text-[#60A5FA] hover:text-[#93C5FD] hover:underline"
            >
              <BookOpen className="h-3 w-3" />
              <span>Video Lectures</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
