import { useState } from 'react';
import { ArrowLeft, Lock, Mail, ShieldAlert } from 'lucide-react';
import { HajiGulLogo } from '../components/HajiGulLogo';
import { signInAdmin, isSupabaseConfigured } from '../lib/supabase';

const CMS_READ_ONLY = import.meta.env.VITE_CMS_READ_ONLY === 'true';

export function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (CMS_READ_ONLY) {
      setErrorMsg('CMS is currently locked in Read-Only mode. Edits are disabled.');
      return;
    }

    setLoading(true);

    try {
      await signInAdmin(email, password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#080B10] text-[#E6EDF3] flex flex-col items-center justify-center p-4 selection:bg-[#38BDF8]/30 selection:text-white">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-slate-400 hover:text-white transition-colors mb-6 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>RETURN TO PORTFOLIO</span>
        </button>

        <div className="bg-[#0D121C]/80 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-black/80">
          <div className="flex items-center gap-3.5 mb-6">
            <HajiGulLogo className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Portfolio Admin Portal</h1>
              <p className="text-xs text-slate-400 font-mono">Content Management System</p>
            </div>
          </div>

          {!isSupabaseConfigured && (
            <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-3">
              <div className="flex gap-3">
                <ShieldAlert className="w-5 h-5 shrink-0 text-amber-400" />
                <div>
                  <p className="font-semibold mb-1">Local Admin Mode Available</p>
                  <p className="text-amber-300/80 leading-relaxed">
                    Supabase is not connected yet. You can still manage certifications, upload company PNG logos, and preview changes locally.
                  </p>
                </div>
              </div>
              <button
                type="button"
                data-testid="enter-local-admin-btn"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('portfolio_local_admin', '1');
                  }
                  if (onLoginSuccess) {
                    onLoginSuccess({ email: 'local-admin@portfolio.local', isLocal: true });
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-cyan-500/40 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-200 font-mono text-xs font-semibold transition-colors cursor-pointer"
              >
                Open Local Admin Studio
              </button>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full bg-[#080B10] border border-slate-700/70 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-[#080B10] border border-slate-700/70 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isSupabaseConfigured}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 font-mono mt-6">
          Encrypted Authentication via Supabase
        </p>
      </div>
    </div>
  );
}
