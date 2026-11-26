import { useState, useEffect } from 'react';
import { BadgeCheck, Check, Eye, Image as ImageIcon, Loader2, Save, Sparkles, Upload } from 'lucide-react';
import { isSupabaseConfigured, updateProfileData, uploadMediaFile } from '../../lib/supabase';

export function ProfileTab({ profile, onRefresh }) {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    title: profile?.title || '',
    affiliation: profile?.affiliation || '',
    fellowship_title: profile?.fellowshipTitle || '',
    fellowship_institution: profile?.fellowshipInstitution || '',
    summary: profile?.summary || '',
    photo_url: profile?.photoWebpUrl || profile?.photoUrl || '',
    photo_caption: profile?.photoCaption || '',
    splash_avatar_url: profile?.splashAvatarUrl || '/assets/aistudio/image_f655c344.png',
    splash_bio:
      profile?.splashBio ||
      'Ph.D. (AI) Researcher | NLP Knowledge Graphs | Transformers | LLMs | Generative AI | GNNs | Machine-Deep Learning',
    splash_fellowship: profile?.splashFellowship || profile?.fellowshipTitle || '2025 DAAD AInet Fellow',
    email_academic: profile?.emails?.academic || '',
    email_personal: profile?.emails?.personal || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    scopus_id: profile?.scopusId || '',
    citations: profile?.metrics?.citations || 0,
    h_index: profile?.metrics?.hIndex || 0,
    i10_index: profile?.metrics?.i10Index || 0,
    publications_count: profile?.metrics?.publications || 0,
    videos_count: profile?.metrics?.videos || 0,
    link_scholar: profile?.links?.scholar || '',
    link_scopus: profile?.links?.scopus || '',
    link_linkedin: profile?.links?.linkedin || '',
    link_youtube: profile?.links?.youtube || '',
    link_github: profile?.links?.github || '',
    link_orcid: profile?.links?.orcid || '',
    cv_url: profile?.cvUrl || '',
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState('');
  const [heroPreviewMode, setHeroPreviewMode] = useState('hero'); // 'hero' | 'portrait' | 'photo'

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        title: profile.title || '',
        affiliation: profile.affiliation || '',
        fellowship_title: profile.fellowshipTitle || '',
        fellowship_institution: profile.fellowshipInstitution || '',
        summary: profile.summary || '',
        photo_url: profile.photoWebpUrl || profile.photoUrl || '',
        photo_caption: profile.photoCaption || '',
        splash_avatar_url: profile.splashAvatarUrl || '/assets/aistudio/image_f655c344.png',
        splash_bio:
          profile.splashBio ||
          'Ph.D. (AI) Researcher | NLP Knowledge Graphs | Transformers | LLMs | Generative AI | GNNs | Machine-Deep Learning',
        splash_fellowship: profile.splashFellowship || profile.fellowshipTitle || '2025 DAAD AInet Fellow',
        email_academic: profile.emails?.academic || '',
        email_personal: profile.emails?.personal || '',
        phone: profile.phone || '',
        location: profile.location || '',
        scopus_id: profile.scopusId || '',
        citations: profile.metrics?.citations || 0,
        h_index: profile.metrics?.hIndex || 0,
        i10_index: profile.metrics?.i10Index || 0,
        publications_count: profile.metrics?.publications || 0,
        videos_count: profile.metrics?.videos || 0,
        link_scholar: profile.links?.scholar || '',
        link_scopus: profile.links?.scopus || '',
        link_linkedin: profile.links?.linkedin || '',
        link_youtube: profile.links?.youtube || '',
        link_github: profile.links?.github || '',
        link_orcid: profile.links?.orcid || '',
        cv_url: profile.cvUrl || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // 1. Read file as base64 DataURL
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      let finalUrl = dataUrl;

      // 2. Try saving to local repository disk via Vite dev endpoint
      try {
        const devRes = await fetch('/api/upload-media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName: file.name, dataUrl }),
        });
        if (devRes.ok) {
          const devData = await devRes.json();
          if (devData.publicUrl) {
            finalUrl = devData.publicUrl;
          }
        }
      } catch (devErr) {
        // Dev API not available (e.g. production build)
      }

      // 3. Try Supabase Storage if configured
      try {
        const supabaseUrl = await uploadMediaFile(file, 'profile');
        if (supabaseUrl) finalUrl = supabaseUrl;
      } catch (storageErr) {
        // Fallback to local disk or base64 dataUrl
      }

      setFormData((prev) => ({ ...prev, [field]: finalUrl }));
      setToast('Image uploaded and saved successfully!');
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      console.error(err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...formData,
      _saved_at: Date.now(),
    };

    try {
      // 1. Instantly save to localStorage so pre-loader and hero update immediately on refresh
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('portfolio_profile_override', JSON.stringify(payload));
        } catch (storageErr) {
          console.warn('LocalStorage error:', storageErr);
        }
      }

      // 2. Persist to repository disk file (src/data/localProfileOverride.json) in dev
      try {
        await fetch('/api/save-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (diskErr) {
        // Dev server not reachable or production build
      }

      // 3. Persist to Supabase PostgreSQL
      if (isSupabaseConfigured) {
        await updateProfileData(formData);
        setToast('Profile, Metrics & Pre-loader updated successfully!');
      } else {
        setToast('Saved locally (Supabase not configured).');
      }
      if (onRefresh) onRefresh();
      setTimeout(() => setToast(''), 4000);
    } catch (err) {
      console.error(err);
      alert(`Database save failed: ${err.message || 'Check your admin login and permissions.'}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500/90 text-white px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md font-mono text-xs animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Academic Profile & Telemetry</h2>
          <p className="text-xs text-slate-400 font-mono">Manage live citations, bio, contact details, and social links</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
        </button>
      </div>

      {/* Academic Telemetry Strip (Key Metrics) */}
      <div className="bg-[#0D121C]/90 border border-cyan-500/30 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-cyan-400 font-mono tracking-wider uppercase mb-4 flex items-center gap-2">
          <span>[+ LIVE ACADEMIC TELEMETRY COUNTERS +]</span>
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          These numbers directly feed the live kinetic counter displays on the portfolio hero and publications telemetry strip.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-[#080B10] p-4 rounded-xl border border-slate-800 focus-within:border-cyan-500 transition-colors">
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Citations
            </label>
            <input
              type="number"
              name="citations"
              value={formData.citations}
              onChange={handleChange}
              className="w-full bg-transparent text-xl font-bold text-cyan-400 font-mono focus:outline-none"
            />
            <span className="text-[10px] text-slate-500 font-mono">e.g. 376+</span>
          </div>

          <div className="bg-[#080B10] p-4 rounded-xl border border-slate-800 focus-within:border-cyan-500 transition-colors">
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              h-index
            </label>
            <input
              type="number"
              name="h_index"
              value={formData.h_index}
              onChange={handleChange}
              className="w-full bg-transparent text-xl font-bold text-indigo-400 font-mono focus:outline-none"
            />
            <span className="text-[10px] text-slate-500 font-mono">e.g. 10</span>
          </div>

          <div className="bg-[#080B10] p-4 rounded-xl border border-slate-800 focus-within:border-cyan-500 transition-colors">
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              i10-index
            </label>
            <input
              type="number"
              name="i10_index"
              value={formData.i10_index}
              onChange={handleChange}
              className="w-full bg-transparent text-xl font-bold text-violet-400 font-mono focus:outline-none"
            />
            <span className="text-[10px] text-slate-500 font-mono">e.g. 11</span>
          </div>

          <div className="bg-[#080B10] p-4 rounded-xl border border-slate-800 focus-within:border-cyan-500 transition-colors">
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Publications
            </label>
            <input
              type="number"
              name="publications_count"
              value={formData.publications_count}
              onChange={handleChange}
              className="w-full bg-transparent text-xl font-bold text-emerald-400 font-mono focus:outline-none"
            />
            <span className="text-[10px] text-slate-500 font-mono">e.g. 32 papers</span>
          </div>

          <div className="bg-[#080B10] p-4 rounded-xl border border-slate-800 focus-within:border-cyan-500 transition-colors col-span-2 sm:col-span-1">
            <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              Video Lectures
            </label>
            <input
              type="number"
              name="videos_count"
              value={formData.videos_count}
              onChange={handleChange}
              className="w-full bg-transparent text-xl font-bold text-rose-400 font-mono focus:outline-none"
            />
            <span className="text-[10px] text-slate-500 font-mono">e.g. 219+ videos</span>
          </div>
        </div>
      </div>

      {/* Identity & Bio */}
      <div className="bg-[#0D121C]/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 font-mono tracking-wider uppercase mb-2">
          Basic Identity & Biography
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Academic Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Affiliation / University</label>
            <input
              type="text"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Fellowship Title & Institution</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                name="fellowship_title"
                placeholder="Fellowship title"
                value={formData.fellowship_title}
                onChange={handleChange}
                className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                name="fellowship_institution"
                placeholder="Institution"
                value={formData.fellowship_institution}
                onChange={handleChange}
                className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Research Summary / Abstract</label>
          <textarea
            name="summary"
            rows={3}
            value={formData.summary}
            onChange={handleChange}
            className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
          />
        </div>

        {/* Hero Section Portrait Stage: Live Preview & File Controls */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <div>
              <label className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span>Hero Section Portrait Image (4:3 Ratio)</span>
              </label>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Renders prominently in the hero section with 3D perspective tilt. Recommended size: <strong>960 × 720 px</strong> (or 1440 × 1080 px).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start bg-[#080B10] p-4 rounded-2xl border border-slate-800/80">
            {/* Live Interactive Hero Preview with Mode Tabs */}
            <div className="md:col-span-5 flex flex-col items-center">
              {/* Preview Mode Switcher */}
              <div className="w-full flex items-center justify-between gap-1 p-1 bg-[#0D121C] rounded-xl border border-slate-800 mb-2.5 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => setHeroPreviewMode('hero')}
                  className={`flex-1 py-1 rounded-lg transition-all ${
                    heroPreviewMode === 'hero'
                      ? 'bg-blue-600 text-white font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Live Hero Snapshot
                </button>
                <button
                  type="button"
                  onClick={() => setHeroPreviewMode('portrait')}
                  className={`flex-1 py-1 rounded-lg transition-all ${
                    heroPreviewMode === 'portrait'
                      ? 'bg-blue-600 text-white font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  3D Card Stage
                </button>
                <button
                  type="button"
                  onClick={() => setHeroPreviewMode('photo')}
                  className={`flex-1 py-1 rounded-lg transition-all ${
                    heroPreviewMode === 'photo'
                      ? 'bg-blue-600 text-white font-semibold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Raw Photo
                </button>
              </div>

              {/* Preview Window */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#3B82F6]/50 bg-[#0B1019] shadow-[0_20px_50px_-15px_rgba(37,99,235,0.45)] group">
                {heroPreviewMode === 'hero' ? (
                  <img
                    src="/assets/portfolio/hero_section_preview.png"
                    alt="Live Hero Section Snapshot"
                    className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = '/assets/portfolio/Haji_gul_33eec388.webp';
                    }}
                  />
                ) : heroPreviewMode === 'portrait' ? (
                  <img
                    src="/assets/portfolio/hero_portrait_card_preview.png"
                    alt="Hero 3D Portrait Stage"
                    className="h-full w-full object-contain p-2"
                    onError={(e) => {
                      e.target.src = '/assets/portfolio/Haji_gul_33eec388.webp';
                    }}
                  />
                ) : (
                  <img
                    src={formData.photo_url || '/assets/portfolio/Haji_gul_33eec388.webp'}
                    alt="Raw photo"
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                      e.target.src = '/assets/portfolio/Haji_gul_33eec388.webp';
                    }}
                  />
                )}

                {/* Top Glass Badge */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/70 to-transparent" />
                <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#0D121C]/90 border border-cyan-400/40 text-[10px] font-mono font-medium text-cyan-300 shadow backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>
                    {heroPreviewMode === 'hero'
                      ? 'Live Hero Section Snapshot'
                      : heroPreviewMode === 'portrait'
                      ? '3D Tilt Portrait Frame'
                      : 'Raw 4:3 Photo'}
                  </span>
                </span>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#080B10]/90 to-transparent" />
              </div>
              <p className="mt-2 text-[11px] text-slate-400 text-center italic truncate max-w-full">
                {formData.photo_caption || 'Live Hero Section Preview'}
              </p>
            </div>

            {/* Inputs & Controls */}
            <div className="md:col-span-7 space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Photo Image URL / Path</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="photo_url"
                    value={formData.photo_url}
                    onChange={handleChange}
                    placeholder="/assets/portfolio/Haji_gul_33eec388.webp"
                    className="flex-1 bg-[#0D121C] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                  <label className="cursor-pointer px-3.5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl text-xs font-mono text-white flex items-center gap-1.5 shrink-0 shadow-md shadow-blue-500/20 transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'photo_url')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Photo Caption & Subtitle</label>
                <input
                  type="text"
                  name="photo_caption"
                  value={formData.photo_caption}
                  onChange={handleChange}
                  placeholder="e.g. Research Collaboration · DAAD AInet Fellowship Cohort, Germany"
                  className="w-full bg-[#0D121C] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Curriculum Vitae (CV) PDF</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="cv_url"
                    value={formData.cv_url}
                    onChange={handleChange}
                    className="flex-1 bg-[#0D121C] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                  <label className="cursor-pointer px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload PDF</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileUpload(e, 'cv_url')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Loading Screen (Splash Screen) Customization */}
      <div className="bg-[#0D121C]/80 border border-blue-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-blue-400 font-mono tracking-wider uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>[+ PRE-LOADING SCREEN (SPLASH SCREEN) SETTINGS +]</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize the distinctive intro screen, circular portrait image, and bio keywords shown during initial website launch.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-[#080B10] p-4 rounded-2xl border border-slate-800/80">
          {/* Orbital Astrolabe Splash Avatar Preview */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-3 text-center">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-2 font-semibold">
              Live Splash Avatar Preview
            </span>
            <div className="relative flex h-36 w-36 items-center justify-center">
              {/* Outer decorative dashed astrolabe ring */}
              <div className="pointer-events-none absolute inset-0 rounded-full border border-dashed border-[#60A5FA]/40 animate-orbit-slow" />
              {/* Inner reverse precision arc */}
              <div className="pointer-events-none absolute inset-2 rounded-full border border-[#38BDF8]/30 animate-orbit-reverse" />
              {/* Soft blue backlight glow */}
              <div className="pointer-events-none absolute h-24 w-24 rounded-full bg-[#2563EB]/30 blur-lg" />
              
              {/* Framed Circular Portrait with Gradient Bezel */}
              <div className="relative h-28 w-28 rounded-full bg-gradient-to-b from-[#BAE6FD] via-[#3B82F6] to-[#1D4ED8] p-[2.5px] shadow-[0_10px_30px_rgba(37,99,235,0.6)]">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-[#0E1420] ring-2 ring-[#0E1420]">
                  <img
                    src={formData.splash_avatar_url || '/assets/aistudio/image_f655c344.png'}
                    alt="Splash Avatar Preview"
                    className="h-full w-full object-cover object-top scale-105"
                    onError={(e) => {
                      e.target.src = '/assets/aistudio/image_f655c344.png';
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5">
              <span className="text-xs font-bold text-white tracking-tight">{formData.name || 'Haji Gul'}</span>
              <BadgeCheck className="h-4 w-4 text-[#38BDF8]" />
            </div>
            <p className="text-[10px] text-cyan-300 font-mono mt-0.5 truncate max-w-[200px]">
              {formData.splash_fellowship || '2025 DAAD AInet Fellow'}
            </p>

            <label className="mt-3 cursor-pointer px-3.5 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/40 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload New Avatar</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'splash_avatar_url')}
                className="hidden"
              />
            </label>
          </div>

          {/* Splash Details Inputs */}
          <div className="md:col-span-7 space-y-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Splash Avatar Image URL / Path
              </label>
              <input
                type="text"
                name="splash_avatar_url"
                value={formData.splash_avatar_url}
                onChange={handleChange}
                placeholder="/assets/aistudio/image_f655c344.png"
                className="w-full bg-[#0D121C] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                Default: /assets/aistudio/image_f655c344.png (original preloader image)
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Splash Screen Status / Fellowship Pill
              </label>
              <input
                type="text"
                name="splash_fellowship"
                value={formData.splash_fellowship}
                onChange={handleChange}
                placeholder="2025 DAAD AInet Fellow"
                className="w-full bg-[#0D121C] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Splash Screen Bio & Keywords (Separated by |)
              </label>
              <textarea
                name="splash_bio"
                rows={2}
                value={formData.splash_bio}
                onChange={handleChange}
                placeholder="Ph.D. (AI) Researcher | NLP Knowledge Graphs | Transformers | LLMs | Generative AI | GNNs | Machine-Deep Learning"
                className="w-full bg-[#0D121C] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 leading-relaxed"
              />
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                Tip: Items separated by | appear with vertical dividers on the splash screen.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Verification Info */}
      <div className="bg-[#0D121C]/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 font-mono tracking-wider uppercase mb-2">
          Contact Details & Scopus ID
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Academic Email</label>
            <input
              type="email"
              name="email_academic"
              value={formData.email_academic}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Personal Email</label>
            <input
              type="email"
              name="email_personal"
              value={formData.email_personal}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Campus / Office Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Scopus Author ID</label>
            <input
              type="text"
              name="scopus_id"
              value={formData.scopus_id}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Social & Academic Profiles */}
      <div className="bg-[#0D121C]/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 font-mono tracking-wider uppercase mb-2">
          Academic Links & Social Profiles
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Google Scholar URL</label>
            <input
              type="url"
              name="link_scholar"
              value={formData.link_scholar}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Scopus Profile URL</label>
            <input
              type="url"
              name="link_scopus"
              value={formData.link_scopus}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">GitHub Profile URL</label>
            <input
              type="url"
              name="link_github"
              value={formData.link_github}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">LinkedIn URL</label>
            <input
              type="url"
              name="link_linkedin"
              value={formData.link_linkedin}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">ORCID URL</label>
            <input
              type="url"
              name="link_orcid"
              value={formData.link_orcid}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">YouTube Channel URL</label>
            <input
              type="url"
              name="link_youtube"
              value={formData.link_youtube}
              onChange={handleChange}
              className="w-full bg-[#080B10] border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
