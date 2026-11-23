import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PRIMARY_NAV_ITEMS, mapSectionIdToNavId } from '../utils/splashScreen';
import { DownloadCVButton } from './DownloadCVButton';
import { HajiGulLogo } from './HajiGulLogo';

const TRACKED_SECTION_IDS = [
  'research',
  'publications',
  'projects',
  'experience',
  'education',
  'academic-profile',
  'service',
  'certifications',
  'honors',
  'lectures',
  'contact',
];

export function Navbar({ currentRoute = '', onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = currentRoute;

  const handleNavClick = (id) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      window.location.hash = id ? `#/${id}` : '#/';
    }
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 glass-surface">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand mark */}
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('');
          }}
          aria-label="Haji Gul — Home"
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6]"
        >
          <HajiGulLogo className="h-9 w-auto" />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-[13px] font-medium"
        >
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative py-1.5 font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6] ${
                  isActive
                    ? 'text-[#60A5FA] font-semibold'
                    : 'text-[#C4CCD6] hover:text-[#F3F5F8]'
                }`}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full transition-transform duration-200 ${
                    isActive
                      ? 'scale-x-100 bg-[#3B82F6]'
                      : 'scale-x-0 bg-[#60A5FA]/70 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Animated Download CV Button + Mobile Menu Trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <DownloadCVButton variant="desktop" className="hidden sm:inline-flex" />

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-[#F3F5F8] transition-colors hover:border-[#3B82F6] hover:text-[#60A5FA] lg:hidden focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-white/10 bg-[#0C0F14] px-4 py-4 lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {PRIMARY_NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[42px] items-center justify-between rounded-lg px-3.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#2563EB]/20 text-[#60A5FA] font-semibold'
                      : 'text-[#C4CCD6] hover:bg-white/[0.05] hover:text-[#F3F5F8]'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}

            <DownloadCVButton variant="mobile" />
          </nav>
        </div>
      )}
    </header>
  );
}
