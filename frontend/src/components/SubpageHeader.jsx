import {
  ArrowLeft,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  GitBranch,
  GraduationCap,
  Layers,
  Mail,
  Microscope,
  PlayCircle,
  ShieldCheck,
} from 'lucide-react';

const PAGE_CONFIG = {
  research: { title: 'Research Pillars', Icon: Microscope },
  publications: { title: 'Publications & Preprints', Icon: BookOpen },
  projects: { title: 'Open Source & Code', Icon: GitBranch },
  experience: { title: 'Employment & Appointments', Icon: Briefcase },
  education: { title: 'Education & Degrees', Icon: GraduationCap },
  'academic-profile': { title: 'Teaching & Technical Skills', Icon: Layers },
  'academic-service': { title: 'Academic Service & Reviewing', Icon: ShieldCheck },
  certifications: { title: 'Verified Certifications', Icon: BadgeCheck },
  honors: { title: 'Honors & Awards', Icon: Award },
  lectures: { title: 'Video Lectures', Icon: PlayCircle },
  contact: { title: 'Contact & References', Icon: Mail },
};

const ROUTE_ALIASES = {
  code: 'projects',
  employment: 'experience',
  timeline: 'experience',
  profile: 'academic-profile',
  service: 'academic-service',
};

export function SubpageHeader({ currentRoute, onBack }) {
  const key = ROUTE_ALIASES[currentRoute] || currentRoute;
  const cfg = PAGE_CONFIG[key] || {
    title: currentRoute.replace(/-/g, ' '),
    Icon: Layers,
  };

  const { Icon } = cfg;

  return (
    <div className="border-b border-white/10 bg-[#090D15]/85 backdrop-blur-xl sticky top-16 z-30 px-4 py-3 sm:px-8">
      <div className="mx-auto max-w-6xl flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#94A3B8] hover:text-[#F3F5F8] transition-colors cursor-pointer group shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Overview</span>
        </button>

        <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-[#F3F5F8] capitalize">
          <Icon className="w-4 h-4 shrink-0 text-[#60A5FA]" />
          <span>{cfg.title}</span>
        </div>
      </div>
    </div>
  );
}
