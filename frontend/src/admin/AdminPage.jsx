import { useState, useEffect } from 'react';
import { getCurrentAdmin, onAdminAuthChange } from '../lib/supabase';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

export function AdminPage({ onGoToSite }) {
  const [adminUser, setAdminUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;

    getCurrentAdmin().then((user) => {
      if (mounted) {
        if (user) {
          setAdminUser(user);
        } else if (typeof window !== 'undefined' && sessionStorage.getItem('portfolio_local_admin') === '1') {
          setAdminUser({ email: 'local-admin@portfolio.local', isLocal: true });
        }
        setCheckingAuth(false);
      }
    });

    const subscription = onAdminAuthChange((user) => {
      if (mounted) {
        setAdminUser(user);
      }
    });

    return () => {
      mounted = false;
      if (subscription?.unsubscribe) subscription.unsubscribe();
    };
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#080B10] flex items-center justify-center text-cyan-400 font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>INITIALIZING ADMIN CONSOLE...</span>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return (
      <AdminLogin
        onLoginSuccess={(localUser) => {
          if (localUser) {
            setAdminUser(localUser);
          } else {
            getCurrentAdmin().then(setAdminUser);
          }
        }}
        onBackToSite={onGoToSite}
      />
    );
  }

  return (
    <AdminDashboard
      onLogout={() => {
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('portfolio_local_admin');
        }
        setAdminUser(null);
      }}
      onGoToSite={onGoToSite}
    />
  );
}
