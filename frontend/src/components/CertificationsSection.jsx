import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShieldCheck,
  X,
} from 'lucide-react';
import { CERTIFICATIONS as DEFAULT_CERTS } from '../data/portfolioData';
import { usePortfolioData } from '../context/PortfolioContext';
import { InstituteBadge } from './BrandIcons';
import { HajiGulLogo } from './HajiGulLogo';

export function CertificationsSection() {
  const portfolioData = usePortfolioData();
  const CERTIFICATIONS = portfolioData?.certifications || DEFAULT_CERTS;

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
    [selectedIssuer, CERTIFICATIONS]
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
    <section
      id="certifications"
      className="section-defer relative overflow-hidden bg-[#0C0F14] py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.1),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs font-medium tracking-[0.04em] text-[#60A5FA]">
              VERIFIED PROFESSIONAL CREDENTIALS
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#F3F5F8] sm:text-4xl">
              Technical Certifications
            </h2>
            <p
              data-testid="certifications-count"
              className="mt-2 font-mono text-xs text-[#8B95A5] tabular-nums"
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
              const isActive = selectedIssuer === issuer;
              return (
                <button
                  key={issuer}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setSelectedIssuer(issuer)}
                  className={
                    isActive
                      ? 'rounded-full bg-[#2563EB] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-blue-950/50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]'
                      : 'rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]'
                  }
                >
                  {issuer}
                </button>
              );
            })}
          </div>
        </div>

        <div
          data-testid="certifications-grid"
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleCerts.map((cert) => {
            const certImg = cert.imageUrl || cert.image;
            return (
              <article
                key={cert.id}
                data-testid={`cert-card-${cert.id}`}
                className="glass-panel group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#3B82F6]/50 sm:p-6"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <InstituteBadge
                        issuer={cert.issuer}
                        className="h-7 w-7 rounded-lg border border-white/10 bg-[#0B0F16] p-1 text-[#60A5FA]"
                      />
                      <span className="font-mono text-xs font-medium text-[#60A5FA]">
                        {cert.issuer}
                      </span>
                    </div>

                    {cert.grade && (
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-400">
                        {cert.grade}
                      </span>
                    )}
                  </div>

                  <h4 className="mt-3 text-sm font-semibold text-[#F3F5F8] transition-colors group-hover:text-[#60A5FA]">
                    {cert.title}
                  </h4>

                  <p className="mt-1 font-mono text-xs text-[#8B95A5]">
                    Issued {cert.issuedDate || cert.issueDate}
                  </p>

                  {cert.skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-[#C4CCD6]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveCertificate(cert)}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#60A5FA] transition-colors hover:text-[#93C5FD] cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Show Certificate</span>
                  </button>

                  <a
                    href={cert.verifyUrl ?? cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#C4CCD6] transition-colors hover:text-[#60A5FA]"
                  >
                    <span>Verify</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      {activeCertificate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setActiveCertificate(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-[#0C0F14] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <h3
                  id="cert-modal-title"
                  className="text-base font-semibold text-[#F3F5F8]"
                >
                  {activeCertificate.title}
                </h3>
                <p className="font-mono text-xs text-[#60A5FA]">
                  {activeCertificate.issuer} · Issued {activeCertificate.issuedDate || activeCertificate.issueDate}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveCertificate(null)}
                aria-label="Close modal"
                className="rounded-lg p-1.5 text-[#8B95A5] transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0D12] sm:aspect-[16/10]">
              {!modalImageError && (activeCertificate.imageUrl || activeCertificate.image) ? (
                <img
                  src={activeCertificate.imageUrl || activeCertificate.image}
                  alt={`${activeCertificate.title} certificate issued by ${activeCertificate.issuer}`}
                  onError={() => setModalImageError(true)}
                  className="h-full w-full object-contain p-4"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
                  <HajiGulLogo className="h-16 w-16 text-[#3B82F6] opacity-60" />
                  <h4 className="mt-4 text-base font-semibold text-[#F3F5F8]">
                    {activeCertificate.title}
                  </h4>
                  <p className="mt-1 text-sm text-[#C4CCD6]">
                    Issued by {activeCertificate.issuer} ({activeCertificate.issuedDate || activeCertificate.issueDate})
                  </p>
                  <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-xs text-[#8B95A5]">
                    Credential ID: {activeCertificate.credentialId || 'Verified Record'}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0A0D12]/60 px-6 py-4">
              <div className="flex items-center gap-2">
                {visibleCerts.length > 1 && (
                  <div className="inline-flex items-center gap-1 rounded-xl border border-white/12 bg-white/[0.03] p-1">
                    <button
                      type="button"
                      onClick={() => handleStepCertificate(-1)}
                      aria-label="Previous certificate"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#C4CCD6] transition-colors hover:bg-[#2563EB]/20 hover:text-[#60A5FA] cursor-pointer"
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
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#C4CCD6] transition-colors hover:bg-[#2563EB]/20 hover:text-[#60A5FA] cursor-pointer"
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
    </section>
  );
}
