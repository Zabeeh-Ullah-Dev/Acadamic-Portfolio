import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  Lock,
  Play,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  CERTIFICATIONS,
  HONORS_AND_SERVICE,
  PROFILE_INFO,
  YOUTUBE_LECTURES,
} from '../data/portfolioData';
import { InstituteBadge, YouTubeIcon } from './BrandIcons';
import { HajiGulLogo } from './HajiGulLogo';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SectionDivider } from './SectionDivider';

function LectureThumbnail({ src, title }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-[#0A0D12]">
      <img
        src={src}
        alt={title}
        width={800}
        height={450}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0C0F14]/75 to-transparent" />

      <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#0C0F14]/90 px-2.5 py-1 font-mono text-[11px] font-medium text-[#F3F5F8] shadow-lg backdrop-blur-sm transition-transform duration-200 group-hover:scale-105 group-hover:border-[#3B82F6]">
        <Play className="h-3 w-3 fill-current text-[#60A5FA]" />
        <span>Playlist</span>
      </span>
    </div>
  );
}

export function HonorsAndLecturesSection() {
  const [honorsRef, honorsRevealed] = useScrollReveal({ threshold: 0.06 });
  const [selectedIssuer, setSelectedIssuer] = useState('All');
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [modalImageError, setModalImageError] = useState(false);

  const issuers = [
    'All',
    ...Array.from(new Set(CERTIFICATIONS.map((c) => c.issuer))),
  ];

  const visibleCerts = useMemo(
    () =>
      selectedIssuer === 'All'
        ? CERTIFICATIONS
        : CERTIFICATIONS.filter((c) => c.issuer === selectedIssuer),
    [selectedIssuer]
  );

  const activeCertIndex = activeCertificate
    ? visibleCerts.findIndex((c) => c.id === activeCertificate.id)
    : -1;

  const handleStepCertificate = (delta) => {
    if (visibleCerts.length <= 1 || activeCertIndex < 0) return;
    const nextIndex =
      (activeCertIndex + delta + visibleCerts.length) % visibleCerts.length;
    setActiveCertificate(visibleCerts[nextIndex]);
  };

  useEffect(() => {
    setModalImageError(false);
    if (!activeCertificate) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveCertificate(null);
      } else if (e.key === 'ArrowRight' && visibleCerts.length > 1 && activeCertIndex >= 0) {
        const nextIndex = (activeCertIndex + 1) % visibleCerts.length;
        setActiveCertificate(visibleCerts[nextIndex]);
      } else if (e.key === 'ArrowLeft' && visibleCerts.length > 1 && activeCertIndex >= 0) {
        const prevIndex = (activeCertIndex - 1 + visibleCerts.length) % visibleCerts.length;
        setActiveCertificate(visibleCerts[prevIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCertificate, activeCertIndex, visibleCerts]);

  return (
    <>
      {/* Section 4: Honors, Fellowships, Service & Technical Certifications */}
      <section
        id="honors"
        ref={honorsRef}
        className="section-defer relative overflow-hidden bg-[#0C0F14] py-20 sm:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.11),transparent_55%)]"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className={`max-w-2xl transition-all duration-500 ${
              honorsRevealed ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
          >
            <p className="font-mono text-xs font-medium tracking-[0.04em] text-[#60A5FA]">
              04 // AWARDS & RECOGNITION
            </p>
            <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl">
              Awards, Fellowships & Scholarships
            </h2>
            <p className="mt-3 text-base leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
              Prestigious international research fellowships, fully funded doctoral scholarships, top-tier AI venue presentations, peer-review service, and verified technical credentials.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4">
            {HONORS_AND_SERVICE.map((item, idx) => (
              <article
                key={item.id}
                style={{ transitionDelay: honorsRevealed ? `${idx * 70}ms` : '0ms' }}
                className={`glass-panel group relative grid grid-cols-1 gap-4 overflow-hidden rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3B82F6]/55 hover:bg-gradient-to-r hover:from-[#172554]/35 hover:via-[#121722] hover:to-[#0E131B] hover:shadow-[inset_0_1px_0_rgba(147,197,253,0.2),0_16px_36px_-18px_rgba(37,99,235,0.45)] sm:p-6 md:grid-cols-12 md:items-center md:gap-8 ${
                  honorsRevealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2.5 top-2.5 h-3 w-3 border-r border-t border-[#60A5FA] opacity-0 transition-opacity duration-200 group-hover:opacity-75"
                />

                <div className="flex items-center gap-3.5 md:col-span-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-[#0B0F16] text-[#60A5FA] transition-all duration-200 group-hover:scale-105 group-hover:border-[#3B82F6] group-hover:text-[#93C5FD] group-hover:shadow-[0_0_20px_-4px_rgba(37,99,235,0.7)]">
                    <Award className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-xs font-semibold text-[#60A5FA] tabular-nums">
                      {item.year}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-[#94A3B8]">
                      {item.issuer}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-8">
                  <h3 className="text-base font-semibold text-[#F3F5F8] transition-colors group-hover:text-white sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
                    {item.description}
                    {item.linkUrl && (
                      <a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#60A5FA] underline decoration-[#3B82F6]/50 underline-offset-4 transition-colors hover:text-[#93C5FD] hover:decoration-[#60A5FA] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                      >
                        <span>[{item.linkLabel || 'Fellow profile'}]</span>
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    )}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Verified Technical Certifications */}
          <div id="certifications" className="mt-16">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h3 className="text-xl font-semibold text-[#F3F5F8] sm:text-2xl">
                  Verified Technical Certifications
                </h3>
                <p
                  data-testid="certifications-count"
                  className="mt-1.5 font-mono text-xs text-[#8B95A5] tabular-nums"
                >
                  Showing {visibleCerts.length} of {CERTIFICATIONS.length} credentials
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Filter certifications by issuing organization"
                className="flex flex-wrap items-center gap-2"
              >
                {issuers.map((issuer) => {
                  const count =
                    issuer === 'All'
                      ? CERTIFICATIONS.length
                      : CERTIFICATIONS.filter((c) => c.issuer === issuer).length;
                  const active = selectedIssuer === issuer;
                  return (
                    <button
                      key={issuer}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedIssuer(issuer)}
                      className={
                        active
                          ? 'inline-flex items-center gap-1.5 rounded-full bg-[#2563EB] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-blue-950/50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#60A5FA]'
                          : 'inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6]'
                      }
                    >
                      <span>{issuer}</span>
                      <span className="font-mono tabular-nums opacity-85">
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              data-testid="certifications-grid"
              className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {visibleCerts.map((cert) => {
                const verifyHref = cert.verifyUrl ?? cert.credentialUrl;
                return (
                  <article
                    key={cert.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/12 border-t-[#3B82F6]/35 bg-gradient-to-b from-[#161C27] via-[#121722] to-[#0D1119] shadow-[0_14px_34px_-18px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/60 hover:shadow-[0_18px_38px_-14px_rgba(37,99,235,0.28)]"
                  >
                    {/* Subtle geometric credential seal corner ornament */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 140 140"
                      className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 text-[#3B82F6] opacity-[0.14] transition-opacity duration-300 group-hover:opacity-[0.24]"
                    >
                      <circle cx="70" cy="70" r="56" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
                      <circle cx="70" cy="70" r="42" fill="none" stroke="currentColor" strokeWidth="0.9" />
                      <circle cx="70" cy="70" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
                    </svg>

                    <div className="relative p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3.5">
                          <InstituteBadge issuer={cert.issuer} />

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-xs text-[#8B95A5]">
                              <span className="font-semibold text-[#60A5FA]">
                                {cert.issuedDate}
                              </span>
                              <span aria-hidden="true" className="text-white/25">·</span>
                              <span className="text-[#E2E8F0]">{cert.issuer}</span>
                            </div>
                            <p className="mt-1 truncate font-mono text-xs text-[#8B95A5] tabular-nums">
                              {cert.credentialId
                                ? `Credential ID ${cert.credentialId}`
                                : 'Verified Online Credential'}
                            </p>
                          </div>
                        </div>

                        <BadgeCheck
                          className="h-5 w-5 shrink-0 text-[#60A5FA]"
                          aria-hidden="true"
                        />
                      </div>

                      <h4 className="mt-5 text-lg font-semibold leading-snug text-[#F8FAFC] sm:text-[1.18rem]">
                        {cert.title}
                      </h4>

                      {/* Subtle Sealed Credential Indicator Bar (certificate image hidden until clicked) */}
                      <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-[#090C11]/75 px-3.5 py-2.5 text-xs text-[#94A3B8]">
                        <span className="inline-flex min-w-0 items-center gap-2">
                          <Lock className="h-3.5 w-3.5 shrink-0 text-[#60A5FA]" aria-hidden="true" />
                          <span className="truncate">Official certificate ready to inspect</span>
                        </span>
                        <span className="shrink-0 font-mono text-[11px] font-medium text-[#60A5FA]">
                          Hidden
                        </span>
                      </div>
                    </div>

                    {/* Responsive Uniform Action Footer on Every Certificate */}
                    <div className="relative grid grid-cols-1 gap-2.5 border-t border-white/10 bg-[#090C11]/85 px-5 py-3.5 sm:grid-cols-2 sm:px-6">
                      <button
                        type="button"
                        onClick={() => setActiveCertificate(cert)}
                        aria-label={`Show certificate for ${cert.title}`}
                        className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[#3B82F6]/65 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-950/60 transition-all duration-150 hover:border-[#93C5FD] hover:from-[#3B82F6] hover:to-[#2563EB] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
                      >
                        <Eye className="h-3.5 w-3.5 shrink-0" />
                        <span>Show Certificate</span>
                      </button>

                      <a
                        href={verifyHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Verify certificate for ${cert.title}`}
                        className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-[#E2E8F0] transition-colors hover:border-[#3B82F6] hover:bg-[#2563EB]/12 hover:text-[#60A5FA] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#60A5FA]" />
                        <span>Verify Certificate</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {activeCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          className="animate-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[#06080B]/85 p-3 backdrop-blur-md sm:p-5"
          onClick={() => setActiveCertificate(null)}
        >
          <div
            data-testid="certificate-modal-dialog"
            className="animate-modal-enter relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#12161E] shadow-2xl shadow-black/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3.5">
                <InstituteBadge issuer={activeCertificate.issuer} />
                <div className="min-w-0">
                  <p className="truncate font-mono text-xs text-[#60A5FA]">
                    {activeCertificate.issuedDate} · {activeCertificate.issuer}
                    {activeCertificate.credentialId
                      ? ` · ID ${activeCertificate.credentialId}`
                      : ''}
                  </p>
                  <h3
                    id="certificate-modal-title"
                    className="mt-0.5 truncate text-base font-semibold text-[#F3F5F8] sm:text-xl"
                  >
                    {activeCertificate.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveCertificate(null)}
                aria-label="Close certificate preview"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative overflow-y-auto bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.18),rgba(9,12,16,0.98)_70%)] p-4 sm:p-7">
              {activeCertificate.imageUrl && !modalImageError ? (
                <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#60A5FA]/35 bg-white p-2 shadow-[0_28px_80px_-18px_rgba(37,99,235,0.48)] sm:p-3">
                  <img
                    src={activeCertificate.imageUrl}
                    alt={`Official certificate image for ${activeCertificate.title}`}
                    decoding="async"
                    onError={() => setModalImageError(true)}
                    className="mx-auto block h-auto max-h-[60vh] w-full object-contain"
                  />
                </div>
              ) : (
                <div className="mx-auto max-w-2xl rounded-2xl border border-white/15 bg-[#12161E] p-6 text-center shadow-inner sm:p-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3 text-left">
                      <HajiGulLogo className="h-8 w-auto" />
                      <div>
                        <p className="font-mono text-xs font-semibold text-[#60A5FA]">
                          {activeCertificate.issuer}
                        </p>
                        <p className="text-xs text-[#8B95A5]">
                          Verified Course Credential
                        </p>
                      </div>
                    </div>
                    <BadgeCheck className="h-6 w-6 text-[#3B82F6]" aria-hidden="true" />
                  </div>

                  <p className="mt-7 font-mono text-xs text-[#8B95A5]">
                    Awarded To
                  </p>
                  <p className="mt-1 text-2xl font-bold tracking-tight text-[#F3F5F8] sm:text-3xl">
                    {PROFILE_INFO.name}
                  </p>

                  <p className="mt-5 text-xs text-[#8B95A5]">
                    For successful completion of
                  </p>
                  <h4 className="mt-1.5 text-xl font-semibold text-[#60A5FA] sm:text-2xl">
                    {activeCertificate.title}
                  </h4>

                  <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-white/10 pt-5 font-mono text-xs text-[#C4CCD6] tabular-nums">
                    <span>Issued {activeCertificate.issuedDate}</span>
                    <span aria-hidden="true" className="text-white/25">·</span>
                    <span>
                      {activeCertificate.credentialId
                        ? `Credential ID ${activeCertificate.credentialId}`
                        : 'Verified via LinkedIn Certifications'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0D1118] px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center gap-2">
                {visibleCerts.length > 1 && (
                  <div className="inline-flex items-center gap-1 rounded-xl border border-white/12 bg-white/[0.03] p-1">
                    <button
                      type="button"
                      onClick={() => handleStepCertificate(-1)}
                      aria-label="Previous certificate"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#C4CCD6] transition-colors hover:bg-[#2563EB]/20 hover:text-[#60A5FA]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="px-2 font-mono text-xs text-[#94A3B8] tabular-nums">
                      {activeCertIndex + 1} / {visibleCerts.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleStepCertificate(1)}
                      aria-label="Next certificate"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#C4CCD6] transition-colors hover:bg-[#2563EB]/20 hover:text-[#60A5FA]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <a
                  href={activeCertificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-[#C4CCD6] transition-colors hover:text-[#60A5FA]"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <a
                href={activeCertificate.verifyUrl ?? activeCertificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#3B82F6]/65 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-950/50 transition-colors hover:from-[#3B82F6] hover:to-[#2563EB]"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verify Certificate</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Subtle animated gradient divider between Honors and Lectures */}
      <SectionDivider />

      {/* Section 5: YouTube Teaching & Open Pedagogy Hub */}
      <section
        id="lectures"
        className="section-defer bg-[#10141B] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-medium text-[#60A5FA]">
                05. Open Pedagogy
              </p>
              <h2 className="mt-2.5 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl">
                YouTube Lectures & Tutorials
              </h2>
              <p className="mt-3 text-base leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
                Over 219 educational lecture videos and 500+ subscribers exploring Graph Theory, Complex Network Datasets, MATLAB computing, and Machine Learning.
              </p>
            </div>

            <a
              href={PROFILE_INFO.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-blue-950/50 transition-colors hover:bg-[#3B82F6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
            >
              <YouTubeIcon className="h-4 w-4 shrink-0" />
              <span>Visit @hajigul5733</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div
            data-testid="youtube-playlists-grid"
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {YOUTUBE_LECTURES.map((lecture) => (
              <a
                key={lecture.id}
                href={lecture.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#3B82F6]/45 focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              >
                <div>
                  <LectureThumbnail
                    src={lecture.thumbnailUrl}
                    title={lecture.title}
                  />
                  <div className="p-5 sm:p-6">
                    <p className="font-mono text-xs text-[#60A5FA]">
                      {lecture.series} · {lecture.durationOrCount}
                    </p>
                    <h3 className="mt-2 text-base font-semibold leading-snug text-[#F3F5F8] transition-colors group-hover:text-[#60A5FA]">
                      {lecture.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
                      {lecture.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 bg-[#0A0D12]/70 px-5 py-3.5 text-xs text-[#8B95A5] sm:px-6">
                  <span className="truncate">{lecture.topics.join(' · ')}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#60A5FA]" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
