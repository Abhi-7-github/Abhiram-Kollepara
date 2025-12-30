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
      setStatus({
        state: 'error',
        error: err?.message || 'Failed to load content',
      });
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <m.main
      variants={variants.page}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-dvh bg-black"
    >
      <div className="scanlines min-h-dvh flex flex-col">

        {/* HEADER */}
        <header className="sticky top-0 z-40 border-b border-green-500/10 bg-black/70 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
            <div className="font-mono text-sm text-green-200">
              <GlitchText text="admin://panel" />
            </div>

            <Link
              to="/portfolio"
              className="focus-neon rounded-md border border-green-500/20 px-3 py-1.5 text-xs text-green-200 hover:border-green-500/40"
            >
              ← back
            </Link>
          </div>
        </header>

        {/* CONTENT */}
        <section className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 space-y-6">

          {/* STATUS CARD */}
          <div className="rounded-2xl border border-green-500/15 bg-black/40 p-6">
            <div className="font-mono text-sm text-green-200">
              live content editor
            </div>

            <div className="mt-2 text-xs text-green-200/70">
              API:{' '}
              <span className="text-green-100">
                http://localhost:5002
              </span>
            </div>

            {status.state === 'loading' && (
              <div className="mt-4 text-sm text-green-200/70">
                loading…
              </div>
            )}

            {status.state === 'error' && (
              <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                {status.error}
                <div className="mt-2 text-xs text-red-200/80">
                  Fix: run{' '}
                  <span className="font-mono">
                    npm run dev:server
                  </span>{' '}
                  or free port <b>5002</b>.
                </div>
              </div>
            )}
          </div>

          {/* MANAGER */}
          <AdminContentManager
            skills={skills}
            projects={projects}
            onRefresh={refresh}
            forceShow
          />
        </section>
      </div>
    </m.main>
  );
}
