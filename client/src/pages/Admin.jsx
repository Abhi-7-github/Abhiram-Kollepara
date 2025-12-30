import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import AdminContentManager from '../components/AdminContentManager';
import GlitchText from '../components/GlitchText';
import { api } from '../lib/api';
import { variants } from '../animations/motion';

export default function Admin() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState({ state: 'idle', error: '' });

  const refresh = async () => {
    setStatus({ state: 'loading', error: '' });
    try {
      const [s, p] = await Promise.all([api.getSkills(), api.getProjects()]);
      setSkills(s?.data ?? []);
      setProjects(p?.data ?? []);
      setStatus({ state: 'ready', error: '' });
    } catch (err) {
      setSkills([]);
      setProjects([]);
      setStatus({ state: 'error', error: err?.message || 'Failed to load content' });
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <m.main variants={variants.page} initial="initial" animate="animate" exit="exit" className="min-h-dvh">
      <div className="scanlines min-h-dvh">
        <header className="sticky top-0 z-40 border-b border-green-500/10 bg-black/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="font-mono text-sm text-green-200/90">
              <GlitchText text="admin://panel" />
            </div>
            <Link
              to="/portfolio"
              className="focus-neon rounded-md border border-green-500/20 px-3 py-1.5 text-xs text-green-200/90 hover:border-green-500/40"
            >
              back to portfolio
            </Link>
          </div>
        </header>

        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <div className="mb-6 rounded-2xl border border-green-500/15 bg-black/40 p-6">
            <div className="font-mono text-sm text-green-200">live content editor</div>
            <div className="mt-2 text-xs text-green-200/70">
              API: <span className="text-green-100">http://localhost:5002</span> (must be running)
            </div>
            {status.state === 'loading' ? (
              <div className="mt-4 text-sm text-green-200/70">loading…</div>
            ) : null}
            {status.state === 'error' ? (
              <div className="mt-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                {status.error}
                <div className="mt-2 text-xs text-red-200/80">
                  Fix: start backend with <span className="font-mono">npm run dev:server</span> (or free port 5002 if it says EADDRINUSE).
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <AdminContentManager skills={skills} projects={projects} onRefresh={refresh} forceShow />
      </div>
    </m.main>
  );
}
