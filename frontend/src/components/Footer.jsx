import { Mail } from 'lucide-react';
import { PROFILE_INFO as DEFAULT_PROFILE } from '../data/portfolioData';
import { usePortfolioData } from '../context/PortfolioContext';
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
  { label: 'Education', href: '#/education', id: 'education' },
  { label: 'Profile', href: '#/academic-profile', id: 'academic-profile' },
  { label: 'Service', href: '#/academic-service', id: 'academic-service' },
  { label: 'Certifications', href: '#/certifications', id: 'certifications' },
  { label: 'Lectures', href: '#/lectures', id: 'lectures' },
];

function buildFooterSocials(profile) {
  const links = profile?.links || DEFAULT_PROFILE.links;
  const academicEmail = profile?.emails?.academic || DEFAULT_PROFILE.emails.academic;

  return [
    {
      label: 'Google Scholar',
      shortLabel: 'Scholar',
      href: links.scholar,
      Icon: GoogleScholarIcon,
      hoverBorder: 'hover:border-[#4285F4]/80',
      hoverBg: 'hover:bg-[#4285F4]/14',
      hoverText: 'hover:text-[#93C5FD]',
      hoverShadow: 'hover:shadow-[0_0_20px_-4px_rgba(66,133,244,0.55)]',
    },
    {
      label: 'Scopus Author ID',
      shortLabel: 'Scopus',
      href: links.scopus,
      Icon: ScopusIcon,
      hoverBorder: 'hover:border-[#F97316]/80',
      hoverBg: 'hover:bg-[#F97316]/14',
      hoverText: 'hover:text-[#FDBA74]',
      hoverShadow: 'hover:shadow-[0_0_20px_-4px_rgba(249,115,22,0.55)]',
    },
    {
      label: 'GitHub',
      shortLabel: 'GitHub',
      href: links.github,
      Icon: GitHubIcon,
      hoverBorder: 'hover:border-[#A855F7]/80',
      hoverBg: 'hover:bg-[#A855F7]/14',
      hoverText: 'hover:text-[#D8B4FE]',
      hoverShadow: 'hover:shadow-[0_0_20px_-4px_rgba(168,85,247,0.55)]',
    },
    {
      label: 'ORCID',
      shortLabel: 'ORCID',
      href: links.orcid,
      Icon: OrcidIcon,
      hoverBorder: 'hover:border-[#A6CE39]/80',
      hoverBg: 'hover:bg-[#A6CE39]/14',
      hoverText: 'hover:text-[#BEF264]',
      hoverShadow: 'hover:shadow-[0_0_20px_-4px_rgba(166,206,57,0.55)]',
    },
    {
      label: 'LinkedIn',
      shortLabel: 'LinkedIn',
      href: links.linkedin,
      Icon: LinkedInIcon,
      hoverBorder: 'hover:border-[#0A66C2]/85',
      hoverBg: 'hover:bg-[#0A66C2]/16',
      hoverText: 'hover:text-[#7DD3FC]',
      hoverShadow: 'hover:shadow-[0_0_20px_-4px_rgba(10,102,194,0.55)]',
    },
    {
      label: 'YouTube',
      shortLabel: 'YouTube',
      href: links.youtube,
      Icon: YouTubeIcon,
      hoverBorder: 'hover:border-[#EF4444]/80',
      hoverBg: 'hover:bg-[#EF4444]/14',
      hoverText: 'hover:text-[#FCA5A5]',
      hoverShadow: 'hover:shadow-[0_0_20px_-4px_rgba(239,68,68,0.55)]',
    },
    {
      label: 'Academic Email',
      shortLabel: 'Email',
      href: `mailto:${academicEmail}`,
      Icon: Mail,
      external: false,
      spanWideOnGrid: true,
      hoverBorder: 'hover:border-[#06B6D4]/80',
      hoverBg: 'hover:bg-[#06B6D4]/14',
      hoverText: 'hover:text-[#67E8F9]',
      hoverShadow: 'hover:shadow-[0_0_20px_-4px_rgba(6,182,212,0.55)]',
    },
  ];
}

export function Footer({ onNavigate }) {
  const portfolioData = usePortfolioData();
  const PROFILE_INFO = portfolioData?.profile || DEFAULT_PROFILE;
  const FOOTER_SOCIALS = buildFooterSocials(PROFILE_INFO);
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="site-footer"
      className="relative overflow-hidden border-t border-white/10 bg-[#080B10] py-12 text-[#F3F5F8]"
    >
      {/* Subtle architectural top hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/40 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Row 1: Brand Identity + Responsive Flex-Grid Social Media Section */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
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
              <p className="text-xs text-[#8B95A5]">
                School of Digital Science · Universiti Brunei Darussalam
              </p>
            </div>
          </a>

          {/* Responsive Flex-Grid Social Media Dock:
              - Mobile (<640px): balanced 2-col grid (Email spans full 2 cols)
              - Tablet (640px-1023px): balanced 4-col grid (Email spans 2 cols)
              - Desktop (>=1024px): crisp single-row flex-wrap dock */}
          <div
            data-testid="footer-social-dock"
            aria-label="Academic and social profiles"
            className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 lg:flex lg:w-auto lg:flex-wrap lg:items-center lg:justify-end lg:gap-1.5"
          >
            {FOOTER_SOCIALS.map(
              ({
                label,
                shortLabel,
                href,
                Icon,
                external = true,
                spanWideOnGrid = false,
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
                  className={`hover-sheen group relative inline-flex min-h-[42px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-white/10 bg-[#0E131D]/90 px-3 py-2 text-xs font-medium text-[#CBD5E1] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[#3B82F6] lg:min-h-[38px] lg:shrink-0 lg:px-2.5 ${
                    spanWideOnGrid ? 'col-span-2 sm:col-span-2 lg:col-span-1' : ''
                  } ${hoverBorder} ${hoverBg} ${hoverText} ${hoverShadow}`}
                >
                  <Icon
                    className="icon-spring h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{shortLabel}</span>
                </a>
              )
            )}
          </div>
        </div>

        {/* Row 2: Dedicated Breathable Quick Navigation Row */}
        <nav
          aria-label="Footer navigation"
          className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-white/8 pt-6 text-xs font-medium text-[#94A3B8]"
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

        {/* Row 3: Bottom Copyright & Quiet Metadata Line */}
        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-white/8 pt-6 text-xs text-[#687385] sm:flex-row sm:items-center">
          <p data-testid="footer-copyright">
            &copy; {currentYear} {PROFILE_INFO.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-[#687385]">
            Knowledge Graph Completion · Spectral Complex Networks · LLMs
          </p>
        </div>
      </div>
    </footer>
  );
}
