import { useEffect, useMemo, useState } from 'react';
import { m } from 'framer-motion';
import GlitchText from '../components/GlitchText';
import TerminalTyping from '../components/TerminalTyping';
import Reveal from '../components/Reveal';
import NeonCard from '../components/NeonCard';
import Modal from '../components/Modal';
import FloatingDockDemo from '../components/floating-dock-demo';
import GoogleGeminiEffectDemo from '../components/google-gemini-effect-demo';
import { IconArrowUpRight } from '@tabler/icons-react';
import { api } from '../lib/api';
import { variants } from '../animations/motion';
import { Button as StatefulButton } from '@/components/ui/stateful-button';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-14">
      <Reveal>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-mono text-lg text-green-200/90">{title}</h2>
          <div className="h-px flex-1 bg-green-500/10" />
        </div>
      </Reveal>
      {children}
    </section>
  );
}

export default function Home() {
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [contactState, setContactState] = useState({ status: 'idle', error: '' });

  const refreshContent = async () => {
    const [s, p] = await Promise.all([api.getSkills(), api.getProjects()]);
    setSkills(s?.data ?? []);
    setProjects(p?.data ?? []);
  };

  useEffect(() => {
    let alive = true;

    refreshContent().catch((err) => {
      if (!alive) return;
      // eslint-disable-next-line no-console
      console.error('[home] Failed to load skills/projects', err);
      // keep UI functional even if DB is empty/unavailable
      setSkills([]);
      setProjects([]);
    });

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const heroLines = useMemo(
    () => [
      'npm run dev',
      'connecting to /api/skills …',
      'connecting to /api/projects …',
      'rendering portfolio.exe'
    ],
    []
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setContactState({ status: 'sending', error: '' });

    try {
      await api.sendContact(contact);
      setContact({ name: '', email: '', message: '' });
      setContactState({ status: 'sent', error: '' });
      window.setTimeout(() => setContactState({ status: 'idle', error: '' }), 2200);
    } catch (err) {
      setContactState({ status: 'error', error: err?.message || 'Failed to send message' });
    }
  };

  const onSendMessage = async () => {
    if (contactState.status === 'sending') return;
    setContactState({ status: 'sending', error: '' });

    try {
      await api.sendContact(contact);
      setContact({ name: '', email: '', message: '' });
      setContactState({ status: 'sent', error: '' });
      window.setTimeout(() => setContactState({ status: 'idle', error: '' }), 2200);
    } catch (err) {
      const message = err?.message || 'Failed to send message';
      setContactState({ status: 'error', error: message });
      throw new Error(message);
    }
  };

  const getProjectPreviewImage = (project) => {
    if (project?.imageUrl) return project.imageUrl;

    const liveUrl = project?.liveUrl;
    if (!liveUrl) return null;

    try {
      const url = new URL(liveUrl);
      // Public screenshot service (no auth). If this becomes rate-limited, set imageUrl per project.
      return `https://image.thum.io/get/width/1200/crop/650/noanimate/${url.toString()}`;
    } catch {
      return null;
    }
  };

  return (
    <m.main variants={variants.page} initial="initial" animate="animate" exit="exit" className="min-h-dvh">
      <div className="scanlines">
        <GoogleGeminiEffectDemo />
        <FloatingDockDemo />
        <header className="sticky top-0 z-40 border-b border-green-500/10 bg-black/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <a href="/portfolio#top" className="font-mono text-sm text-green-200/90 hover:text-green-200">
              <GlitchText text="abhiram://kollepara" />
            </a>
            <nav className="hidden gap-5 text-sm text-green-200/70 sm:flex">
              <a className="hover:text-green-200" href="#skills">
                Skills
              </a>
              <a className="hover:text-green-200" href="#projects">
                Projects
              </a>
              <a className="hover:text-green-200" href="#contact">
                Contact
              </a>
            </nav>
            <a
              className="focus-neon rounded-md border border-green-500/20 px-3 py-1.5 text-xs text-green-200/90 hover:border-green-500/40"
              href="#contact"
            >
              ping me
            </a>
          </div>
        </header>

        <section id="top" className="mx-auto w-full max-w-6xl px-4 pb-12 pt-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-green-500/15 bg-black/40 px-3 py-1 text-xs text-green-200/70">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  Abhiram Kollepara • MERN • React • Tailwind • Framer Motion
                </div>

                <h1 className="mt-5 font-mono text-4xl leading-tight text-green-100 sm:text-5xl">
                  <span className="block text-green-200/80">Hi, I’m</span>
                  <GlitchText text="Abhiram Kollepara" className="text-green-200" />
                  <span className="block text-green-100">Developer Portfolio</span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-green-200/70">
                  Clean, production-ready MERN portfolio with MongoDB-driven skills, Express APIs, and advanced UI animations.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="focus-neon rounded-md bg-green-500/10 px-4 py-2 text-sm text-green-100 ring-1 ring-green-500/20 hover:bg-green-500/15"
                  >
                    view projects
                  </a>
                  <a
                    href="#skills"
                    className="focus-neon rounded-md border border-green-500/20 px-4 py-2 text-sm text-green-200/90 hover:border-green-500/40"
                  >
                    scan skills
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <TerminalTyping lines={heroLines} className="w-full" />
            </Reveal>
          </div>
        </section>

        <Section id="skills" title="skills://db">
          <m.div variants={variants.stagger} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.length === 0 ? (
              <Reveal>
                <div className="rounded-2xl border border-green-500/10 bg-black/30 p-5 text-sm text-green-200/70">
                  No skills found. Run the seed script or add documents to MongoDB.
                </div>
              </Reveal>
            ) : null}

            {skills.map((skill) => (
              <Reveal key={skill._id || skill.name}>
                <div className="rounded-2xl border border-green-500/15 p-5 transition duration-200 hover:border-neon hover:ring-1 hover:ring-neon/30">
                  <div className="flex items-center gap-3">
                    <img src={skill.logoUrl} alt={skill.name} loading="lazy" className="h-10 w-10 rounded-lg" />
                    <div className="min-w-0">
                      <div className="truncate font-mono text-sm text-green-100">{skill.name}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </m.div>
        </Section>

        <Section id="projects" title="projects://ops">
          <BentoGrid>
            {projects.length === 0 ? (
              <Reveal>
                <div className="rounded-2xl border border-green-500/10 bg-black/30 p-5 text-sm text-green-200/70">
                  No projects found. Run the seed script or add documents to MongoDB.
                </div>
              </Reveal>
            ) : null}

            {projects.map((p, i) => (
              <Reveal key={p._id || p.title}>
                <BentoGridItem
                  onClick={() => setSelectedProject(p)}
                  title={
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate">{p.title}</span>
                      <IconArrowUpRight className="h-4 w-4 shrink-0 text-green-200/70" />
                    </div>
                  }
                  description={
                    <div className="grid gap-3">
                      <p className="line-clamp-3">{p.description}</p>

                      {Array.isArray(p.techStack) && p.techStack.length ? (
                        <div className="flex flex-wrap gap-2">
                          {p.techStack.slice(0, 6).map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-200/80 ring-1 ring-green-500/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  }
                  header={
                    getProjectPreviewImage(p) ? (
                      <img
                        src={getProjectPreviewImage(p)}
                        alt={p.title}
                        loading="lazy"
                        className="h-28 w-full rounded-xl border border-green-500/10 object-cover"
                      />
                    ) : (
                      <div className="h-28 w-full rounded-xl border border-green-500/10 bg-black/30" />
                    )
                  }
                  icon={<span className="font-mono text-xs text-green-200/60">project://open</span>}
                  className={i % 7 === 3 || i % 7 === 6 ? 'md:col-span-2' : ''}
                />
              </Reveal>
            ))}
          </BentoGrid>

          <Modal open={!!selectedProject} title={selectedProject?.title || 'Project'} onClose={() => setSelectedProject(null)}>
            {selectedProject ? (
              <div className="grid gap-4">
                {selectedProject.imageUrl ? (
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="h-56 w-full rounded-xl border border-green-500/15 object-cover"
                    loading="lazy"
                  />
                ) : null}

                <p className="text-sm text-green-200/75">{selectedProject.description}</p>

                {Array.isArray(selectedProject.techStack) && selectedProject.techStack.length ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((t) => (
                      <span key={t} className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-200/80 ring-1 ring-green-500/10">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-3">
                  {selectedProject.githubUrl ? (
                    <a
                      className="focus-neon rounded-md border border-green-500/20 px-3 py-2 text-sm text-green-200/90 hover:border-green-500/40"
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  ) : null}
                  {selectedProject.liveUrl ? (
                    <a
                      className="focus-neon rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-100 ring-1 ring-green-500/20 hover:bg-green-500/15"
                      href={selectedProject.liveUrl}
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
        </Section>

        <Section id="contact" title="contact://message">
          <Reveal>
            <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-green-500/15 bg-black/40 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs text-green-200/70">name</span>
                  <input
                    className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100 placeholder:text-green-200/30"
                    placeholder="your name"
                    value={contact.name}
                    onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                    required
                    minLength={2}
                    maxLength={80}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs text-green-200/70">email</span>
                  <input
                    type="email"
                    className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100 placeholder:text-green-200/30"
                    placeholder="you@domain.com"
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    required
                    maxLength={254}
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-xs text-green-200/70">message</span>
                <textarea
                  className="focus-neon min-h-32 rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100 placeholder:text-green-200/30"
                  placeholder="Tell me what you want to build…"
                  value={contact.message}
                  onChange={(e) => setContact((c) => ({ ...c, message: e.target.value }))}
                  required
                  minLength={10}
                  maxLength={4000}
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <StatefulButton
                  type="button"
                  disabled={contactState.status === 'sending'}
                  onClick={onSendMessage}
                >
                  {contactState.status === 'sending' ? 'sending…' : 'send'}
                </StatefulButton>

                <div className="font-mono text-xs text-green-200/70">
                  {contactState.status === 'sent' ? 'status: delivered' : null}
                  {contactState.status === 'error' ? `status: error (${contactState.error})` : null}
                </div>
              </div>
            </form>
          </Reveal>
        </Section>

        <footer className="mx-auto w-full max-w-6xl px-4 pb-24">
          <div className="border-t border-green-500/10 pt-6 text-xs text-green-200/50">
            built with React + Tailwind + Framer Motion • powered by Express + MongoDB
          </div>
        </footer>
      </div>
    </m.main>
  );
}
