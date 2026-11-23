import { Mail } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData';
import {
  GitHubIcon,
  GoogleScholarIcon,
  LinkedInIcon,
  OrcidIcon,
  ScopusIcon,
  YouTubeIcon,
} from './BrandIcons';
import { HajiGulLogo } from './HajiGulLogo';

const FOOTER_QUICK_LINKS = [
  { label: 'Research', href: '#/research', id: 'research' },
  { label: 'Publications', href: '#/publications', id: 'publications' },
  { label: 'Code', href: '#/projects', id: 'projects' },
  { label: 'Employment', href: '#/experience', id: 'experience' },
  { label: 'Teaching', href: '#/academic-profile', id: 'academic-profile' },
  { label: 'Honors', href: '#/honors', id: 'honors' },
  { label: 'Lectures', href: '#/lectures', id: 'lectures' },
  { label: 'Contact', href: '#/contact', id: 'contact' },
];

const FOOTER_SOCIALS = [
  {
    label: 'Google Scholar',
    href: PROFILE_INFO.links.scholar,
    Icon: GoogleScholarIcon,
    hoverBorder: 'hover:border-[#4285F4]/80',
    hoverBg: 'hover:bg-[#4285F4]/15',
    hoverText: 'hover:text-[#4285F4]',
    hoverShadow: 'hover:shadow-[0_0_18px_-2px_rgba(66,133,244,0.65)]',
  },
  {
    label: 'Scopus Author ID',
    href: PROFILE_INFO.links.scopus,
    Icon: ScopusIcon,
    hoverBorder: 'hover:border-[#F97316]/85',
    hoverBg: 'hover:bg-[#F97316]/15',
    hoverText: 'hover:text-[#FB923C]',
    hoverShadow: 'hover:shadow-[0_0_18px_-2px_rgba(249,115,22,0.65)]',
  },
  {
    label: 'GitHub',
    href: PROFILE_INFO.links.github,
    Icon: GitHubIcon,
    hoverBorder: 'hover:border-[#A855F7]/80',
    hoverBg: 'hover:bg-[#A855F7]/15',
    hoverText: 'hover:text-[#C084FC]',
    hoverShadow: 'hover:shadow-[0_0_18px_-2px_rgba(168,85,247,0.65)]',
  },
  {
    label: 'ORCID',
    href: PROFILE_INFO.links.orcid,
    Icon: OrcidIcon,
    hoverBorder: 'hover:border-[#A6CE39]/80',
    hoverBg: 'hover:bg-[#A6CE39]/15',
    hoverText: 'hover:text-[#A6CE39]',
    hoverShadow: 'hover:shadow-[0_0_18px_-2px_rgba(166,206,57,0.65)]',
  },
  {
    label: 'LinkedIn',
    href: PROFILE_INFO.links.linkedin,
    Icon: LinkedInIcon,
    hoverBorder: 'hover:border-[#0A66C2]/85',
    hoverBg: 'hover:bg-[#0A66C2]/15',
    hoverText: 'hover:text-[#38BDF8]',
    hoverShadow: 'hover:shadow-[0_0_18px_-2px_rgba(10,102,194,0.65)]',
  },
  {
    label: 'YouTube',
    href: PROFILE_INFO.links.youtube,
    Icon: YouTubeIcon,
    hoverBorder: 'hover:border-[#EF4444]/85',
    hoverBg: 'hover:bg-[#EF4444]/15',
    hoverText: 'hover:text-[#EF4444]',
    hoverShadow: 'hover:shadow-[0_0_18px_-2px_rgba(239,68,68,0.65)]',
  },
  {
    label: 'Academic Email',
    href: `mailto:${PROFILE_INFO.emails.academic}`,
    Icon: Mail,
    external: false,
    hoverBorder: 'hover:border-[#06B6D4]/85',
    hoverBg: 'hover:bg-[#06B6D4]/15',
    hoverText: 'hover:text-[#22D3EE]',
    hoverShadow: 'hover:shadow-[0_0_18px_-2px_rgba(6,182,212,0.65)]',
  },
];

export function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="site-footer"
      className="relative overflow-hidden border-t border-white/10 bg-[#080B10] py-12 text-[#F3F5F8]"
    >
      {/* Calm architectural top highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/35 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center lg:gap-4">
          {/* Identity Anchor */}
          <a
            href="#/"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate('');
              }
            }}
            aria-label="Haji Gul — Home"
            className="group inline-flex shrink-0 items-center gap-3 self-start focus-visible:outline-2 focus-visible:outline-[#3B82F6] lg:self-auto"
          >
            <HajiGulLogo className="h-8 w-auto shrink-0 transition-transform duration-200 group-hover:scale-[1.03]" />
            <div>
              <p className="text-sm font-semibold tracking-tight text-[#F3F5F8] transition-colors group-hover:text-[#60A5FA]">
                {PROFILE_INFO.name}
              </p>
              <p className="text-[11.5px] text-[#8B95A5]">
                School of Digital Science · Universiti Brunei Darussalam
              </p>
            </div>
          </a>

          {/* Minimalist Quick Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-xs font-medium text-[#94A3B8] lg:flex-nowrap"
          >
            {FOOTER_QUICK_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate(link.id);
                  }
                }}
                className="relative py-1 whitespace-nowrap transition-colors duration-150 hover:text-[#60A5FA] focus-visible:outline-2 focus-visible:outline-[#3B82F6]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Tactile Social Media Icon Dock with Hover-Only Spring Motion */}
          <div
            aria-label="Academic and social profiles"
            className="flex shrink-0 flex-wrap items-center gap-1.5 lg:flex-nowrap"
          >
            {FOOTER_SOCIALS.map(
              ({
                label,
                href,
                Icon,
                external = true,
                hoverBorder,
                hoverBg,
                hoverText,
                hoverShadow,
              }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className={`hover-sheen group relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/[0.03] text-[#94A3B8] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.95] focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${hoverBorder} ${hoverBg} ${hoverText} ${hoverShadow}`}
                >
                  <Icon
                    className="icon-spring h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                </a>
              )
            )}
          </div>
        </div>

        {/* Bottom Copyright & Quiet Metadata Line */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-6 text-xs text-[#687385] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <p data-testid="footer-copyright">
              &copy; {currentYear} {PROFILE_INFO.name}. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4 sm:pr-24">
            <p className="font-mono text-[11px] text-[#687385]">
              Knowledge Graph Completion · Spectral Complex Networks · LLMs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
