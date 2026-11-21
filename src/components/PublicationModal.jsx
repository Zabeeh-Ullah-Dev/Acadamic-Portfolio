import { useEffect, useState } from 'react';
import { X, Copy, Check, ExternalLink } from 'lucide-react';
import { GitHubIcon, GoogleScholarIcon } from './BrandIcons';
import { PublicationSchematic } from './PublicationSchematic';

export function PublicationModal({ publication, onClose }) {
  const [copiedBibtex, setCopiedBibtex] = useState(false);

  useEffect(() => {
    setCopiedBibtex(false);
    if (!publication) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [publication, onClose]);

  if (!publication) return null;

  const handleCopyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(publication.bibtex);
      setCopiedBibtex(true);
      window.setTimeout(() => setCopiedBibtex(false), 2200);
    } catch {
      setCopiedBibtex(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-paper-title"
      className="animate-modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[#06080B]/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="animate-modal-enter max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-[#12161E] shadow-2xl shadow-black/75"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <p className="font-mono text-xs text-[#60A5FA] tabular-nums">
              {publication.year} · {publication.venue}
              {publication.citations > 0
                ? ` · ${publication.citations} ${publication.citations === 1 ? 'citation' : 'citations'}`
                : ''}
            </p>
            <h3
              id="modal-paper-title"
              className="mt-1.5 text-lg font-bold leading-snug text-[#F3F5F8] sm:text-xl"
            >
              {publication.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close publication details"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#C4CCD6] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0D12]">
            {publication.figureUrl ? (
              <div className="flex flex-col items-center bg-white p-3 text-center">
                <img
                  src={publication.figureUrl}
                  alt={`${publication.title} — architecture diagram`}
                  referrerPolicy="no-referrer"
                  className="max-h-80 sm:max-h-96 w-full object-contain"
                />
                <p className="mt-2 font-mono text-[11px] font-medium text-slate-700">
                  {publication.figureCaption || 'Official Paper Diagram'}
                </p>
              </div>
            ) : (
              <div className="h-32">
                <PublicationSchematic
                  type={publication.schematic}
                  seed={publication.index}
                  figureUrl={publication.figureUrl}
                  title={publication.title}
                  venue={publication.venue}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
            <div>
              <span className="font-medium text-[#8B95A5]">Authors</span>
              <p className="mt-0.5 font-medium text-[#F3F5F8]">{publication.authors}</p>
            </div>
            <div>
              <span className="font-medium text-[#8B95A5]">Publisher / Series</span>
              <p className="mt-0.5 font-medium text-[#F3F5F8]">{publication.publisher}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B95A5]">
              Core Idea &amp; Abstract
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed tracking-[0.01em] text-[#C4CCD6]">
              {publication.abstract}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B95A5]">
              Key Contributions
            </h4>
            <ul className="mt-1.5 space-y-1.5 text-sm text-[#C4CCD6]">
              {publication.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B82F6]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8B95A5]">
                BibTeX Citation
              </h4>
              <button
                type="button"
                onClick={handleCopyBibtex}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#2563EB] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#3B82F6] focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
              >
                {copiedBibtex ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied BibTeX</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy BibTeX</span>
                  </>
                )}
              </button>
            </div>
            <pre className="mt-2 overflow-x-auto rounded-2xl border border-white/10 bg-[#0A0D12] p-4 font-mono text-xs leading-relaxed text-[#E2E8F0]">
              {publication.bibtex}
            </pre>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-b-3xl border-t border-white/10 bg-[#0A0D12] px-6 py-4">
          <span className="text-xs text-[#8B95A5]">
            {publication.keywords.join(' · ')}
          </span>
          <div className="flex flex-wrap items-center gap-4">
            {publication.githubUrl && (
              <a
                href={publication.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F3F5F8] transition-colors hover:text-[#60A5FA]"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                <span>GitHub Code</span>
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            )}
            {publication.mirrorGithubUrl && (
              <a
                href={publication.mirrorGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C4CCD6] transition-colors hover:text-[#60A5FA]"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                <span>AdaptiveBotsLab Mirror</span>
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            )}
            <a
              href={publication.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#60A5FA] transition-colors hover:text-[#93C5FD]"
            >
              <GoogleScholarIcon className="h-3.5 w-3.5" />
              <span>Google Scholar</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
