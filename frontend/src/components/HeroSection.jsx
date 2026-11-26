import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  GraduationCap,
  Mail,
} from 'lucide-react';
import { PROFILE_INFO as DEFAULT_PROFILE } from '../data/profileInfo';
import { usePortfolioData } from '../context/PortfolioContext';
import { copyTextToClipboard, getPrimaryCopyEmail } from '../utils/clipboard';
import { HERO_SPOTLIGHTS } from '../utils/heroSpotlights';
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

const RESEARCH_SPECIALTIES = [
  'Knowledge Graphs',
  'Transformers & LLMs',
  'GNNs',
  'Biomedical AI',
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

export function HeroSection({ onExplorePaper, onNavigate, metricsReady = true }) {
  const portfolioData = usePortfolioData();
  const PROFILE_INFO = portfolioData?.profile || DEFAULT_PROFILE;

  const [imgError, setImgError] = useState(false);
  const [copiedTarget, setCopiedTarget] = useState(null);
  const [activeSpotlightIndex, setActiveSpotlightIndex] = useState(0);
  const [spotlightPaused, setSpotlightPaused] = useState(false);
  const [portraitTilt, setPortraitTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 40 });
  const [metricReplays, setMetricReplays] = useState({
    citations: 0,
    hIndex: 0,
    i10Index: 0,
    publications: 0,
    videos: 0,
  });
  const lastReplayTimeRef = useRef({});
  const typedRole = useTypewriterRole(HERO_ROLE_TITLES);
  const primaryCopyEmail = getPrimaryCopyEmail(PROFILE_INFO);

  const handleMetricHover = (metricKey) => {
    if (!metricsReady) return;
    const now = performance.now();
    const last = lastReplayTimeRef.current[metricKey] ?? 0;
    if (now - last < 900) return;
    lastReplayTimeRef.current[metricKey] = now;
    setMetricReplays((prev) => ({
      ...prev,
      [metricKey]: (prev[metricKey] ?? 0) + 1,
    }));
  };

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

  const handleCopyEmail = async (targetKey, emailAddress) => {
    const ok = await copyTextToClipboard(emailAddress);
    if (ok) {
      setCopiedTarget(targetKey);
      window.setTimeout(() => {
        setCopiedTarget((current) => (current === targetKey ? null : current));
      }, 2000);
    } else {
      setCopiedTarget(null);
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
      ariaLabel: `Google Scholar (${PROFILE_INFO.metrics.citations}+ citations)`,
      href: PROFILE_INFO.links.scholar,
      Icon: GoogleScholarIcon,
      metric: `${PROFILE_INFO.metrics.citations}+`,
      colorClass: 'text-[#60A5FA]',
      hoverClasses:
        'hover:border-[#4285F4]/70 hover:bg-[#4285F4]/12 hover:shadow-[0_10px_26px_-10px_rgba(66,133,244,0.65)]',
    },
    {
      id: 'scopus',
      label: 'Scopus',
      ariaLabel: `Scopus Author Profile (ID: ${PROFILE_INFO.scopusId})`,
      href: PROFILE_INFO.links.scopus,
      Icon: ScopusIcon,
      colorClass: 'text-[#FB923C]',
      hoverClasses:
        'hover:border-[#F97316]/70 hover:bg-[#F97316]/12 hover:shadow-[0_10px_26px_-10px_rgba(249,115,22,0.65)]',
    },
    {
      id: 'github',
      label: 'GitHub',
      ariaLabel: 'GitHub Repositories',
      href: PROFILE_INFO.links.github,
      Icon: GitHubIcon,
      colorClass: 'text-[#C084FC]',
      hoverClasses:
        'hover:border-[#A855F7]/70 hover:bg-[#A855F7]/12 hover:shadow-[0_10px_26px_-10px_rgba(168,85,247,0.65)]',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      ariaLabel: 'LinkedIn Profile',
      href: PROFILE_INFO.links.linkedin,
      Icon: LinkedInIcon,
      colorClass: 'text-[#38BDF8]',
      hoverClasses:
        'hover:border-[#0A66C2]/80 hover:bg-[#0A66C2]/15 hover:shadow-[0_10px_26px_-10px_rgba(10,102,194,0.65)]',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      ariaLabel: `YouTube Channel & ${PROFILE_INFO.metrics.videos}+ Video Lectures`,
      href: PROFILE_INFO.links.youtube,
      Icon: YouTubeIcon,
      metric: `${PROFILE_INFO.metrics.videos}+`,
      colorClass: 'text-[#F87171]',
      hoverClasses:
        'hover:border-[#EF4444]/75 hover:bg-[#EF4444]/12 hover:shadow-[0_10px_26px_-10px_rgba(239,68,68,0.65)]',
    },
    {
      id: 'orcid',
      label: 'ORCID',
      ariaLabel: 'ORCID Academic Record',
      href: PROFILE_INFO.links.orcid,
      Icon: OrcidIcon,
      colorClass: 'text-[#A6CE39]',
      hoverClasses:
        'hover:border-[#A6CE39]/75 hover:bg-[#A6CE39]/12 hover:shadow-[0_10px_26px_-10px_rgba(166,206,57,0.6)]',
    },
  ];

  return (
    <section
      id="top"
      aria-label="Haji Gul Research Profile"
      className="relative overflow-hidden bg-gradient-to-b from-[#060911] via-[#080C15] to-[#0B0E14]"
    >
      {/* Research-Mode-Synced Subtle Spectral Studio Lighting */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          activeSpotlight.id === 'biomedical'
            ? 'bg-[radial-gradient(ellipse_56%_52%_at_76%_36%,rgba(20,184,166,0.14),transparent_68%),radial-gradient(ellipse_48%_44%_at_54%_6%,rgba(37,99,235,0.16),transparent_64%),radial-gradient(ellipse_44%_36%_at_16%_82%,rgba(14,165,233,0.09),transparent_66%)]'
            : activeSpotlight.id === 'mucos'
              ? 'bg-[radial-gradient(ellipse_56%_52%_at_76%_36%,rgba(14,165,233,0.16),transparent_68%),radial-gradient(ellipse_48%_44%_at_54%_6%,rgba(59,130,246,0.16),transparent_64%),radial-gradient(ellipse_44%_36%_at_16%_82%,rgba(56,189,248,0.1),transparent_66%)]'
              : 'bg-[radial-gradient(ellipse_56%_52%_at_76%_36%,rgba(37,99,235,0.18),transparent_68%),radial-gradient(ellipse_48%_44%_at_54%_6%,rgba(99,102,241,0.13),transparent_64%),radial-gradient(ellipse_44%_36%_at_16%_82%,rgba(14,165,233,0.09),transparent_66%)]'
        }`}
      />

      {/* Dual-Scale Precision Scientific Embedding Coordinate Field */}
      <div
        aria-hidden="true"
        className="architect-grid-precision pointer-events-none absolute inset-0 opacity-75 [mask-image:radial-gradient(ellipse_85%_82%_at_66%_42%,black_18%,rgba(0,0,0,0.42)_58%,transparent_94%)]"
      />

      {/* Interactive Research-Authentic Knowledge Graph, Transformer Attention & GNN Canvas */}
      <NetworkCanvas researchMode={activeSpotlight.id} />

      {/* Measured Readability & Seamless Vertical Transition Scrims (Preserves >12:1 Left Text Contrast) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,9,17,0.68)_0%,rgba(6,9,17,0.34)_40%,transparent_66%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,17,0.32)_0%,transparent_18%,transparent_80%,rgba(11,14,20,0.96)_100%)]"
      />

      {/* Crisp Subtle Bottom Luminous Horizon Seam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/35 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-9 sm:px-6 sm:pt-11 lg:px-8 lg:pb-14 lg:pt-12">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Modern Editorial Identity, Research Spotlight Deck & Unified Action Dock */}
          <div className="animate-panel-enter lg:col-span-7">
            <div
              data-testid="hero-subheadline"
              className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm font-medium tracking-[0.015em]"
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
              <span aria-hidden="true" className="text-[#475569]">
                ·
              </span>
              <span className="whitespace-nowrap text-[#94A3B8]">
                Universiti Brunei Darussalam
              </span>
            </div>

            <h1
              className="mt-3.5 bg-gradient-to-b from-white via-[#F8FAFC] to-[#93C5FD] bg-clip-text text-5xl font-extrabold leading-[0.96] tracking-[-0.04em] text-transparent sm:text-[4.85rem] lg:text-[6.1rem]"
              style={{ textWrap: 'balance' }}
            >
              {PROFILE_INFO.name}
            </h1>

            <p className="mt-4 max-w-[54ch] text-base leading-relaxed tracking-[0.01em] text-[#D5DFEC] sm:text-[17px]">
              {PROFILE_INFO.summary}
            </p>

            {/* Clean Unboxed Specialization Index (Editorial Middot Rhythm) */}
            <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[12px] text-[#7E8EA6]">
              {RESEARCH_SPECIALTIES.map((topic, index) => (
                <span key={topic} className="inline-flex items-center gap-2.5">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-[#3B82F6]/60">
                      ·
                    </span>
                  )}
                  <span className="whitespace-nowrap">{topic}</span>
                </span>
              ))}
            </div>

            {/* Modern Glass Research Highlight Deck */}
            <div
              data-testid="hero-spotlight"
              onMouseEnter={() => setSpotlightPaused(true)}
              onMouseLeave={() => setSpotlightPaused(false)}
              className="glass-panel relative mt-6 overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-[#121B2D]/88 via-[#0E1523]/88 to-[#0B0F18]/92 p-4 shadow-[0_22px_54px_-24px_rgba(37,99,235,0.48),inset_0_1px_0_rgba(186,230,253,0.16)] sm:p-5"
            >
              {/* Crisp top optical accent hairline */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/75 to-transparent"
              />

              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div
                  role="tablist"
                  aria-label="Core research highlights"
                  className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-white/10 bg-[#080C15]/80 p-1"
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
                            ? 'relative overflow-hidden rounded-lg bg-[#2563EB]/24 px-3 py-1.5 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(147,197,253,0.3)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#60A5FA]'
                            : 'rounded-lg px-3 py-1.5 text-xs font-medium text-[#94A3B8] transition-colors hover:bg-white/[0.04] hover:text-[#E2E8F0] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]'
                        }
                      >
                        <span>{item.tab}</span>
                        {isActive && !spotlightPaused && (
                          <span
                            key={`bar-${activeSpotlight.id}`}
                            aria-hidden="true"
                            className="animate-hero-bar absolute inset-x-1.5 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-[#3B82F6] to-[#38BDF8]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <span className="hidden font-mono text-[11px] tracking-[0.02em] text-[#7A8AA3] sm:inline">
                  Featured Paper
                </span>
              </div>

              <div
                key={activeSpotlight.id}
                className="animate-hero-spotlight mt-3.5"
              >
                <p className="font-mono text-xs text-[#60A5FA]">
                  {activeSpotlight.venue}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#E2E8F0]">
                  {activeSpotlight.summary}{' '}
                  <button
                    type="button"
                    data-testid="hero-spotlight-explore"
                    onClick={() => onExplorePaper?.(activeSpotlight.publicationId)}
                    aria-label={
                      activeSpotlight.paperTitle
                        ? `Explore exact paper: ${activeSpotlight.paperTitle}`
                        : `Explore ${activeSpotlight.tab} paper`
                    }
                    className="group inline-flex items-center gap-1 font-semibold text-[#7DD3FC] transition-colors hover:text-[#E0F2FE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                  >
                    <span className="underline decoration-[#38BDF8]/55 underline-offset-4 transition-colors group-hover:decoration-[#E0F2FE]">
                      Explore
                    </span>
                    <ArrowUpRight
                      className="icon-nudge-ne h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </button>
                </p>
              </div>
            </div>

            {/* Clean Two-Tier Action & Academic Identity Dock */}
            <div data-testid="hero-action-dock" className="mt-6 space-y-3">
              {/* Row 1: Primary Focal CTA + Secondary Email Copy */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#/publications"
                  onClick={(e) => {
                    if (onNavigate) {
                      e.preventDefault();
                      onNavigate('publications');
                    }
                  }}
                  title="Explore Publications Catalog"
                  className="hover-sheen group inline-flex min-h-[44px] items-center gap-2.5 rounded-xl border border-[#60A5FA]/70 bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_34px_-10px_rgba(37,99,235,0.8),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BAE6FD] hover:shadow-[0_18px_40px_-10px_rgba(37,99,235,0.92)] active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
                >
                  <span>Explore Publications</span>
                  <ArrowDown
                    className="icon-nudge-down h-4 w-4 text-[#BAE6FD]"
                    aria-hidden="true"
                  />
                </a>

                <button
                  type="button"
                  data-testid="hero-copy-email-btn"
                  onClick={() => handleCopyEmail('personal', primaryCopyEmail)}
                  title={`Copy personal email (${primaryCopyEmail})`}
                  aria-label={`Copy personal email (${primaryCopyEmail})`}
                  className="hover-sheen group inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/14 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-[#E2E8F0] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#38BDF8]/65 hover:bg-[#0EA5E9]/10 hover:text-white active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  {copiedTarget === 'personal' ? (
                    <>
                      <Check
                        className="animate-check-pop h-4 w-4 shrink-0 text-emerald-400"
                        aria-hidden="true"
                      />
                      <span className="font-semibold text-emerald-300">
                        Email Copied
                      </span>
                    </>
                  ) : (
                    <>
                      <Mail
                        className="icon-spring h-4 w-4 shrink-0 text-[#38BDF8]"
                        aria-hidden="true"
                      />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Row 2: Unified Single-Row Verified Academic Profiles */}
              <div
                aria-label="Verified academic profiles"
                className="flex flex-wrap items-center gap-1.5"
              >
                {brandProfiles.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      aria-label={item.ariaLabel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hover-sheen group inline-flex min-h-[36px] items-center gap-1.5 rounded-xl border border-white/10 bg-[#0E1421]/85 px-2.5 py-1.5 text-[11.5px] font-medium text-[#CBD5E1] transition-all duration-200 hover:-translate-y-0.5 hover:text-white active:scale-[0.97] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${item.hoverClasses}`}
                    >
                      <Icon
                        className={`icon-spring h-3.5 w-3.5 shrink-0 ${item.colorClass}`}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                      {item.metric && (
                        <span className="font-mono text-[10.5px] font-semibold text-[#8B95A5] tabular-nums transition-colors group-hover:text-white">
                          {item.metric}
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Modern Editorial Portrait Stage with 3D Parallax & Optical Framing */}
          <div
            style={{ animationDelay: '70ms' }}
            className="animate-panel-enter relative lg:col-span-5"
          >
            {/* Calm ambient deep-sapphire backlight synced to studio geometry */}
            <div
              aria-hidden="true"
              className="animate-aura-breathe pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_50%_45%,rgba(37,99,235,0.28),rgba(14,165,233,0.09)_48%,transparent_72%)] blur-2xl"
            />

            {/* Subtle architectural orbital arcs aligned with the Knowledge Graph */}
            <svg
              viewBox="0 0 420 420"
              aria-hidden="true"
              className="animate-orbit-slow pointer-events-none absolute -right-10 -top-10 h-68 w-68 opacity-25"
            >
              <circle
                cx="210"
                cy="210"
                r="186"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="1"
                strokeDasharray="5 12"
              />
              <circle cx="210" cy="24" r="3.5" fill="#93C5FD" />
              <circle cx="396" cy="210" r="2.6" fill="#38BDF8" />
            </svg>

            <svg
              viewBox="0 0 320 320"
              aria-hidden="true"
              className="animate-orbit-reverse pointer-events-none absolute -bottom-9 -left-9 h-52 w-52 opacity-20"
            >
              <circle
                cx="160"
                cy="160"
                r="134"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="1"
                strokeDasharray="3 10"
              />
              <circle cx="160" cy="26" r="3" fill="#93C5FD" />
            </svg>

            {/* Gallery-Grade Interactive 3D-Tilt Portrait Frame */}
            <div
              onMouseMove={handlePortraitMove}
              onMouseLeave={resetPortraitTilt}
              style={{
                transform: `perspective(1000px) rotateX(${portraitTilt.rx}deg) rotateY(${portraitTilt.ry}deg)`,
                transition: 'transform 240ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="glass-panel relative overflow-hidden rounded-[1.75rem] border border-[#60A5FA]/32 bg-gradient-to-b from-[#131C2E]/94 to-[#0B1019]/96 p-3 shadow-[inset_0_1px_0_rgba(186,230,253,0.22),0_34px_84px_-22px_rgba(37,99,235,0.48)]"
            >
              {/* Crisp top optical edge highlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-10 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#BAE6FD]/80 to-transparent"
              />

              {/* Cursor-reactive specular sapphire sheen */}
              <div
                aria-hidden="true"
                style={{
                  background: `radial-gradient(290px circle at ${portraitTilt.gx}% ${portraitTilt.gy}%, rgba(96, 165, 250, 0.16), transparent 70%)`,
                }}
                className="pointer-events-none absolute inset-0 z-10"
              />

              <div className="group/photo relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0A0D12]">
                {!imgError ? (
                  <>
                    <picture className="block h-full w-full">
                      {PROFILE_INFO.photoWebpUrl && (
                        <source
                          srcSet={PROFILE_INFO.photoWebpUrl}
                          type="image/webp"
                        />
                      )}
                      <img
                        src={PROFILE_INFO.photoUrl}
                        alt="Haji Gul with research collaborators during the DAAD AInet Fellowship in Germany"
                        width={960}
                        height={720}
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() => setImgError(true)}
                        className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover/photo:scale-[1.03]"
                      />
                    </picture>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#090D16]/75 via-[#090D16]/20 to-transparent"
                    />
                  </>
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
              </div>

              <div className="relative z-20 mt-3.5 px-2 pb-1">
                <p className="text-xs font-medium text-[#CBD5E1]">
                  {PROFILE_INFO.photoCaption}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyEmail('academic', PROFILE_INFO.emails.academic)
                    }
                    aria-label={`Copy academic email ${PROFILE_INFO.emails.academic}`}
                    className="group inline-flex min-w-0 items-center gap-1.5 font-mono text-[#E2E8F0] transition-colors hover:text-[#60A5FA] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                  >
                    <Mail className="icon-spring h-3.5 w-3.5 shrink-0 text-[#60A5FA]" />
                    <span className="truncate">{PROFILE_INFO.emails.academic}</span>
                    {copiedTarget === 'academic' ? (
                      <Check className="animate-check-pop h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3 shrink-0 text-[#8B95A5] transition-colors group-hover:text-[#93C5FD]" />
                    )}
                  </button>

                  <a
                    href={PROFILE_INFO.links.scopus}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`View verified Scopus Author Profile (${PROFILE_INFO.scopusId})`}
                    className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-[#94A3B8] tabular-nums transition-colors hover:text-[#FB923C] focus-visible:outline-2 focus-visible:outline-[#F97316]"
                  >
                    <ScopusIcon className="icon-spring h-3.5 w-3.5 text-[#F97316]" />
                    <span>Scopus {PROFILE_INFO.scopusId}</span>
                    <ArrowUpRight className="icon-nudge-ne h-3 w-3 opacity-70 group-hover:opacity-100" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Unified Glass Impact Metrics Ribbon */}
        <div
          data-testid="hero-metrics-strip"
          className="relative mt-9 overflow-hidden rounded-2xl border border-white/12 bg-[#0D1320]/76 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.9),inset_0_1px_0_rgba(186,230,253,0.12)] backdrop-blur-md"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/50 to-transparent"
          />

          <div className="grid grid-cols-2 divide-y divide-white/8 sm:grid-cols-5 sm:divide-x sm:divide-y-0 sm:divide-white/10">
            <div
              data-testid="metric-card-citations"
              onMouseEnter={() => handleMetricHover('citations')}
              className="group relative px-4 py-4 transition-colors duration-200 hover:bg-[#172554]/28 sm:px-5 sm:py-5"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] transition-transform duration-300 group-hover:scale-x-100"
              />
              <p className="text-xs font-medium text-[#94A3B8] transition-colors group-hover:text-[#BAE6FD]">
                Total Citations
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold text-[#60A5FA] tabular-nums sm:text-[1.85rem]">
                <AnimatedCounter
                  target={PROFILE_INFO.metrics.citations}
                  suffix="+"
                  duration={1500}
                  start={metricsReady}
                  replayKey={metricReplays.citations}
                />
              </p>
              <p className="mt-0.5 text-xs text-[#728097]">Google Scholar</p>
            </div>

            <div
              data-testid="metric-card-hindex"
              onMouseEnter={() => handleMetricHover('hIndex')}
              className="group relative px-4 py-4 transition-colors duration-200 hover:bg-[#172554]/28 sm:px-5 sm:py-5"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] transition-transform duration-300 group-hover:scale-x-100"
              />
              <p className="text-xs font-medium text-[#94A3B8] transition-colors group-hover:text-[#BAE6FD]">
                h-index
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold text-[#F8FAFC] tabular-nums sm:text-[1.85rem]">
                <AnimatedCounter
                  target={PROFILE_INFO.metrics.hIndex}
                  duration={1100}
                  start={metricsReady}
                  replayKey={metricReplays.hIndex}
                />
              </p>
              <p className="mt-0.5 text-xs text-[#728097]">Impact Index</p>
            </div>

            <div
              data-testid="metric-card-i10index"
              onMouseEnter={() => handleMetricHover('i10Index')}
              className="group relative px-4 py-4 transition-colors duration-200 hover:bg-[#172554]/28 sm:px-5 sm:py-5"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] transition-transform duration-300 group-hover:scale-x-100"
              />
              <p className="text-xs font-medium text-[#94A3B8] transition-colors group-hover:text-[#BAE6FD]">
                i10-index
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold text-[#F8FAFC] tabular-nums sm:text-[1.85rem]">
                <AnimatedCounter
                  target={PROFILE_INFO.metrics.i10Index}
                  duration={1200}
                  start={metricsReady}
                  replayKey={metricReplays.i10Index}
                />
              </p>
              <p className="mt-0.5 text-xs text-[#728097]">10+ Cited Papers</p>
            </div>

            <div
              data-testid="metric-card-publications"
              onMouseEnter={() => handleMetricHover('publications')}
              className="group relative px-4 py-4 transition-colors duration-200 hover:bg-[#172554]/28 sm:px-5 sm:py-5"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] transition-transform duration-300 group-hover:scale-x-100"
              />
              <p className="text-xs font-medium text-[#94A3B8] transition-colors group-hover:text-[#BAE6FD]">
                Publications
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold text-[#60A5FA] tabular-nums sm:text-[1.85rem]">
                <AnimatedCounter
                  target={PROFILE_INFO.metrics.publications}
                  duration={1300}
                  start={metricsReady}
                  replayKey={metricReplays.publications}
                />
              </p>
              <p className="mt-0.5 text-xs text-[#728097]">2020 – 2026</p>
            </div>

            <div
              data-testid="metric-card-videos"
              onMouseEnter={() => handleMetricHover('videos')}
              className="group relative col-span-2 px-4 py-4 transition-colors duration-200 hover:bg-[#172554]/28 sm:col-span-1 sm:px-5 sm:py-5"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] transition-transform duration-300 group-hover:scale-x-100"
              />
              <p className="text-xs font-medium text-[#94A3B8] transition-colors group-hover:text-[#BAE6FD]">
                Open Pedagogy
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold text-[#F8FAFC] tabular-nums sm:text-[1.85rem]">
                <AnimatedCounter
                  target={PROFILE_INFO.metrics.videos}
                  suffix="+"
                  duration={1600}
                  start={metricsReady}
                  replayKey={metricReplays.videos}
                />
              </p>
              <a
                href={PROFILE_INFO.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-flex items-center gap-1 text-xs text-[#60A5FA] hover:text-[#93C5FD] hover:underline"
              >
                <BookOpen className="icon-spring h-3 w-3" aria-hidden="true" />
                <span>Video Lectures</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
