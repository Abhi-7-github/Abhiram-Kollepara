import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import Reveal from '../components/Reveal';
import NeonCard from '../components/NeonCard';
import Modal from '../components/Modal';
import { api } from '../lib/api';
import { variants } from '../animations/motion';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let alive = true;
    api
      .getProjects()
      .then((res) => {
        if (!alive) return;
        setProjects(res?.data ?? []);
      })
      .catch((err) => {
        if (!alive) return;
        // eslint-disable-next-line no-console
        console.error('[projects] Failed to load projects', err);
        setProjects([]);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <m.main variants={variants.page} initial="initial" animate="animate" exit="exit" className="min-h-dvh">
      <div className="scanlines">
        <header className="sticky top-0 z-40 border-b border-green-500/10 bg-black/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="font-mono text-sm text-green-200/90">projects://index</div>
            <Link className="focus-neon rounded-md border border-green-500/20 px-3 py-1.5 text-xs text-green-200/90 hover:border-green-500/40" to="/">
              back
            </Link>
          </div>
        </header>

        <section className="mx-auto w-full max-w-6xl px-4 py-14">
          <Reveal>
            <h1 className="font-mono text-2xl text-green-100">All Projects</h1>
            <p className="mt-2 text-sm text-green-200/70">Click a card to open details with a modal animation.</p>
          </Reveal>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <Reveal key={p._id || p.title}>
                <NeonCard onClick={() => setSelected(p)}>
                  <div className="font-mono text-base text-green-100">{p.title}</div>
                  <p className="mt-2 text-sm text-green-200/70">{p.description}</p>
                </NeonCard>
              </Reveal>
            ))}
          </div>

          <Modal open={!!selected} title={selected?.title || 'Project'} onClose={() => setSelected(null)}>
            {selected ? (
              <div className="grid gap-4">
                <p className="text-sm text-green-200/75">{selected.description}</p>
                <div className="flex flex-wrap gap-3">
                  {selected.githubUrl ? (
                    <a
                      className="focus-neon rounded-md border border-green-500/20 px-3 py-2 text-sm text-green-200/90 hover:border-green-500/40"
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  ) : null}
                  {selected.liveUrl ? (
                    <a
                      className="focus-neon rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-100 ring-1 ring-green-500/20 hover:bg-green-500/15"
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </Modal>
        </section>
      </div>
    </m.main>
  );
}
