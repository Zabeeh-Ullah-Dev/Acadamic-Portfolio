import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, FileDown, Mail, Menu, X } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import { HajiGulLogo } from './HajiGulLogo';

const NAV_ITEMS = [
  { label: 'Research', href: '#research', id: 'research' },
  { label: 'Publications', href: '#publications', id: 'publications' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'Honors', href: '#honors', id: 'honors' },
  { label: 'Lectures', href: '#lectures', id: 'lectures' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sectionIds = [
      'research',
      'publications',
      'experience',
      'education',
      'honors',
      'lectures',
      'contact',
    ];

    const determineActiveSection = () => {
      // 1. If at the top of the page (Hero section), no section link is active
      if (window.scrollY < 180) {
        setActiveSection('');
        return;
      }

      // 2. If scrolled near the bottom of the page, activate Contact
      const scrollBottom = window.innerHeight + window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= docHeight - 70) {
        setActiveSection('contact');
        return;
      }

      // 3. Scan sections based on viewport position
      const navThreshold = 140; // 64px navbar height + reading buffer
      let matched = '';

      // Check whether experience & education are side-by-side (desktop layout)
      const expEl = document.getElementById('experience');
      const eduEl = document.getElementById('education');
      const isSideBySide =
        expEl &&
        eduEl &&
        Math.abs(expEl.getBoundingClientRect().top - eduEl.getBoundingClientRect().top) < 20;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        // Section is actively in view if its top has crossed under the navbar and bottom is still visible
        if (rect.top <= navThreshold && rect.bottom > 80) {
          if (isSideBySide && (id === 'experience' || id === 'education')) {
            matched = (prev) => (prev === 'education' ? 'education' : 'experience');
          } else {
            matched = id;
          }
        }
      }

      if (typeof matched === 'function') {
        setActiveSection(matched);
      } else if (matched) {
        setActiveSection(matched);
      }
    };

    window.addEventListener('scroll', determineActiveSection, { passive: true });
    determineActiveSection();

    return () => window.removeEventListener('scroll', determineActiveSection);
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 glass-surface">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          onClick={() => handleNavClick('')}
          aria-label="Haji Gul — Home"
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6]"
        >
          <HajiGulLogo className="h-9 w-auto" />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative rounded-lg px-3 py-1.5 text-xs lg:text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6] ${
                  isActive
                    ? 'text-[#60A5FA] font-semibold bg-[#2563EB]/15 shadow-[inset_0_1px_0_rgba(147,197,253,0.22),0_0_14px_-2px_rgba(59,130,246,0.35)]'
                    : 'text-[#C4CCD6] hover:text-[#F3F5F8] hover:bg-white/[0.04]'
                }`}
              >
                <span>{item.label}</span>
                {/* Active or hover bottom neon indicator bar */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'scale-x-100 bg-[#3B82F6] shadow-[0_0_8px_#3B82F6]'
                      : 'scale-x-0 bg-[#3B82F6]/60 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Download CV Action */}
          <a
            href={PROFILE_INFO.cvUrl}
            download="Haji_Gul_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download Academic Curriculum Vitae (PDF)"
            aria-label="Download Academic Curriculum Vitae (PDF)"
            className="group hidden sm:inline-flex items-center gap-2 rounded-xl border border-[#3B82F6]/60 bg-gradient-to-br from-[#172554]/95 via-[#1E3A8A]/80 to-[#0F172A]/95 py-1.5 pl-2 pr-3.5 text-xs font-semibold tracking-[0.01em] text-[#F8FAFC] shadow-[inset_0_1px_0_rgba(147,197,253,0.28),0_6px_18px_-6px_rgba(37,99,235,0.55)] whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93C5FD] hover:from-[#2563EB] hover:via-[#1D4ED8] hover:to-[#1E40AF] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-[#60A5FA]/40 bg-[#2563EB]/30 text-[#93C5FD] transition-colors duration-200 group-hover:border-white/30 group-hover:bg-white/15 group-hover:text-white">
              <FileDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden="true" />
            </span>
            <span>Download CV</span>
            <ArrowDown
              className="h-3.5 w-3.5 text-[#60A5FA] transition-transform duration-200 group-hover:translate-y-0.5 group-hover:text-white"
              aria-hidden="true"
            />
          </a>

          <a
            href="#contact"
            onClick={() => handleNavClick('contact')}
            aria-current={activeSection === 'contact' ? 'page' : undefined}
            className={`group hidden md:inline-flex items-center gap-2 rounded-xl border py-1.5 pl-2 pr-3.5 text-xs font-semibold tracking-[0.01em] whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60A5FA] ${
              activeSection === 'contact'
                ? 'border-[#93C5FD] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] text-white shadow-[0_0_20px_rgba(37,99,235,0.65)] ring-2 ring-[#60A5FA]/40'
                : 'border-[#3B82F6]/65 bg-gradient-to-br from-[#172554]/95 via-[#1E3A8A]/80 to-[#0F172A]/95 text-[#F8FAFC] shadow-[inset_0_1px_0_rgba(147,197,253,0.28),0_6px_18px_-6px_rgba(37,99,235,0.55)] hover:border-[#93C5FD] hover:from-[#2563EB] hover:via-[#1D4ED8] hover:to-[#1E40AF] hover:text-white'
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-lg border transition-colors duration-200 ${
                activeSection === 'contact'
                  ? 'border-white/40 bg-white/20 text-white'
                  : 'border-[#60A5FA]/40 bg-[#2563EB]/30 text-[#93C5FD] group-hover:border-white/30 group-hover:bg-white/15 group-hover:text-white'
              }`}
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span>Contact Me</span>
            <ArrowUpRight
              className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                activeSection === 'contact' ? 'text-white' : 'text-[#60A5FA] group-hover:text-white'
              }`}
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-[#F3F5F8] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] md:hidden focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-white/10 bg-[#0C0F14] px-4 py-4 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center justify-between rounded-lg px-3.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#2563EB]/25 text-[#60A5FA] font-semibold border-l-2 border-[#3B82F6]'
                      : 'text-[#C4CCD6] hover:bg-[#2563EB]/15 hover:text-[#60A5FA]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-[#60A5FA] shadow-[0_0_8px_#60A5FA]" />
                  )}
                </a>
              );
            })}

            <a
              href={PROFILE_INFO.cvUrl}
              download="Haji_Gul_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-2.5 flex min-h-[46px] items-center justify-between rounded-xl border border-[#3B82F6]/65 bg-gradient-to-r from-[#172554]/95 to-[#1E3A8A]/85 px-3.5 text-sm font-semibold text-[#F8FAFC] shadow-[inset_0_1px_0_rgba(147,197,253,0.24)] transition-all hover:border-[#93C5FD] hover:from-[#2563EB] hover:to-[#1D4ED8]"
            >
              <span className="inline-flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#60A5FA]/40 bg-[#2563EB]/30 text-[#93C5FD]">
                  <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>Download Academic CV</span>
              </span>
              <ArrowDown className="h-4 w-4 text-[#93C5FD]" aria-hidden="true" />
            </a>

            <a
              href="#contact"
              onClick={() => handleNavClick('contact')}
              aria-current={activeSection === 'contact' ? 'page' : undefined}
              className={`mt-1.5 flex min-h-[46px] items-center justify-between rounded-xl border px-3.5 text-sm font-semibold transition-all ${
                activeSection === 'contact'
                  ? 'border-[#93C5FD] bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-[0_0_18px_rgba(37,99,235,0.55)]'
                  : 'border-[#3B82F6]/65 bg-gradient-to-r from-[#172554]/95 to-[#1E3A8A]/85 text-[#F8FAFC] shadow-[inset_0_1px_0_rgba(147,197,253,0.24)] hover:border-[#93C5FD] hover:from-[#2563EB] hover:to-[#1D4ED8]'
              }`}
            >
              <span className="inline-flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#60A5FA]/40 bg-[#2563EB]/30 text-[#93C5FD]">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>Contact &amp; References</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#93C5FD]" aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
