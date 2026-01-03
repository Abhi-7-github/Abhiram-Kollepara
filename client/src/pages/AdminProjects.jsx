import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import AdminContentManager from '../components/AdminContentManager';
import GlitchText from '../components/GlitchText';
import { api } from '../lib/api';
import { variants } from '../animations/motion';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState({ state: 'idle', error: '' });

  const refresh = async () => {
    setStatus({ state: 'loading', error: '' });
    try {
      const p = await api.getProjects();
      setProjects(p?.data ?? []);
      setStatus({ state: 'ready', error: '' });
    } catch (err) {
      setProjects([]);
      setStatus({ state: 'error', error: err?.message || 'Failed to load projects' });
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <m.main variants={variants.page} initial="initial" animate="animate" exit="exit" className="min-h-dvh bg-black">
      <div className="scanlines min-h-dvh flex flex-col">
        <header className="sticky top-0 z-40 border-b border-green-500/10 bg-black/70 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
            <div className="font-mono text-sm text-green-200">
              <GlitchText text="admin://projects" />
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/admin/skills"
                className="focus-neon rounded-md border border-green-500/20 px-3 py-1.5 text-xs text-green-200 hover:border-green-500/40"
              >
                skills
              </Link>
              <Link
                to="/admin"
                className="focus-neon rounded-md border border-green-500/20 px-3 py-1.5 text-xs text-green-200 hover:border-green-500/40"
              >
                panel
              </Link>
              <Link
                to="/portfolio"
                className="focus-neon rounded-md border border-green-500/20 px-3 py-1.5 text-xs text-green-200 hover:border-green-500/40"
              >
                ← back
              </Link>
            </div>
          </div>
        </header>

        <section className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 space-y-6">
          <div className="rounded-2xl border border-green-500/15 bg-black/40 p-6">
            <div className="font-mono text-sm text-green-200">projects editor</div>

            {status.state === 'loading' ? <div className="mt-4 text-sm text-green-200/70">loading…</div> : null}

            {status.state === 'error' ? (
              <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                {status.error}
              </div>
            ) : null}
          </div>

          <AdminContentManager skills={[]} projects={projects} onRefresh={refresh} forceShow view="projects" />
        </section>
      </div>
    </m.main>
  );
}
