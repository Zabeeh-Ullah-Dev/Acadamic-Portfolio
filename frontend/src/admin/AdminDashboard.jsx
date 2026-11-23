import { useState, useEffect } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  ExternalLink,
  FolderGit2,
  FolderOpen,
  LogOut,
  Network,
  RefreshCw,
  User,
  Video,
} from 'lucide-react';
import { HajiGulLogo } from '../components/HajiGulLogo';
import { usePortfolioData } from '../context/PortfolioContext';
import { getCurrentAdmin, signOutAdmin } from '../lib/supabase';
import { ProfileTab } from './tabs/ProfileTab';
import { PublicationsTab } from './tabs/PublicationsTab';
import { ResearchTab } from './tabs/ResearchTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { TimelineTab } from './tabs/TimelineTab';
import { HonorsTab } from './tabs/HonorsTab';
import { LecturesTab } from './tabs/LecturesTab';
import { MediaTab } from './tabs/MediaTab';

export function AdminDashboard({ onLogout, onGoToSite }) {
  const {
    profile,
    publications,
    experience,
    education,
    lectures,
    pillars = [],
    projects = [],
    honors = [],
    certifications = [],
    reloadData,
    isLoading,
    isLiveFromDb,
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState('profile');
  const [adminUser, setAdminUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCurrentAdmin().then(setAdminUser);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await reloadData();
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleSignOut = async () => {
    await signOutAdmin();
    if (onLogout) onLogout();
  };

  const tabs = [
    { id: 'profile', label: 'Profile & Telemetry', icon: User },
    {
      id: 'publications',
      label: `Publications (${publications.length})`,
      icon: BookOpen,
    },
    {
      id: 'research',
      label: `Research Pillars (${pillars.length})`,
      icon: Network,
    },
    {
      id: 'projects',
      label: `Open Source & Code (${projects.length})`,
      icon: FolderGit2,
    },
    {
      id: 'timeline',
      label: `Employment Details (${experience.length + education.length})`,
      icon: Briefcase,
    },
    {
      id: 'honors',
      label: `Honors & Certs (${honors.length + certifications.length})`,
      icon: Award,
    },
    {
      id: 'lectures',
      label: `Video Lectures (${lectures.length})`,
      icon: Video,
    },
    { id: 'media', label: 'Media & Storage', icon: FolderOpen },
  ];

  return (
    <div className="min-h-screen bg-[#080B10] text-[#E6EDF3] flex flex-col font-sans selection:bg-[#38BDF8]/30 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0D121C]/90 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <HajiGulLogo className="h-9 w-auto" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">Haji Gul Portfolio</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                CMS v1.0
              </span>
              {isLiveFromDb && (
                <span className="hidden sm:inline-flex text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ● Connected to Supabase
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              {adminUser ? adminUser.email : 'Authenticated Admin'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleRefresh}
            title="Reload live database data"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing || isLoading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>

          <button
            onClick={onGoToSite}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors cursor-pointer"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-mono transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-2">
            Navigation
          </p>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wide transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-300 border border-cyan-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Pane */}
        <main className="flex-1 min-w-0">
          {activeTab === 'profile' && (
            <ProfileTab profile={profile} onRefresh={reloadData} />
          )}
          {activeTab === 'publications' && (
            <PublicationsTab
              publications={publications}
              onRefresh={reloadData}
            />
          )}
          {activeTab === 'research' && (
            <ResearchTab
              pillars={pillars}
              onRefresh={reloadData}
            />
          )}
          {activeTab === 'projects' && (
            <ProjectsTab
              projects={projects}
              onRefresh={reloadData}
            />
          )}
          {activeTab === 'timeline' && (
            <TimelineTab
              experience={experience}
              education={education}
              onRefresh={reloadData}
            />
          )}
          {activeTab === 'honors' && (
            <HonorsTab
              honors={honors}
              certifications={certifications}
              onRefresh={reloadData}
            />
          )}
          {activeTab === 'lectures' && (
            <LecturesTab lectures={lectures} onRefresh={reloadData} />
          )}
          {activeTab === 'media' && <MediaTab />}
        </main>
      </div>
    </div>
  );
}
