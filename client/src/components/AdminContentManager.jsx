import { useMemo, useState } from 'react';
import Modal from './Modal';
import { api } from '../lib/api';

function toTechStackArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AdminContentManager({ skills, projects, onRefresh, forceShow = false }) {
  const isDev = import.meta.env.DEV;
  const [skillDraft, setSkillDraft] = useState({ name: '', logoUrl: '' });
  const [projectDraft, setProjectDraft] = useState({
    title: '',
    description: '',
    techStack: '',
    imageUrl: '',
    githubUrl: '',
    liveUrl: ''
  });

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const [editingSkill, setEditingSkill] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const [skillEdit, setSkillEdit] = useState({ name: '', logoUrl: '' });
  const [projectEdit, setProjectEdit] = useState({
    title: '',
    description: '',
    techStack: '',
    imageUrl: '',
    githubUrl: '',
    liveUrl: ''
  });

  const hasIds = useMemo(() => ({
    skillIds: skills?.some((s) => s?._id),
    projectIds: projects?.some((p) => p?._id)
  }), [skills, projects]);

  if (!isDev && !forceShow) return null;

  const submitSkill = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await api.createSkill(skillDraft);
      setSkillDraft({ name: '', logoUrl: '' });
      await onRefresh?.();
    } catch (err) {
      setError(err?.message || 'Failed to create skill');
    } finally {
      setBusy(false);
    }
  };

  const submitProject = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await api.createProject({
        ...projectDraft,
        techStack: toTechStackArray(projectDraft.techStack)
      });
      setProjectDraft({ title: '', description: '', techStack: '', imageUrl: '', githubUrl: '', liveUrl: '' });
      await onRefresh?.();
    } catch (err) {
      setError(err?.message || 'Failed to create project');
    } finally {
      setBusy(false);
    }
  };

  const openSkillEdit = (skill) => {
    setEditingSkill(skill);
    setSkillEdit({ name: skill?.name || '', logoUrl: skill?.logoUrl || '' });
  };

  const saveSkillEdit = async () => {
    if (!editingSkill?._id) {
      setError('Cannot edit: skill has no _id. Seed/DB might be missing ids.');
      return;
    }
    setError('');
    setBusy(true);
    try {
      await api.updateSkill(editingSkill._id, skillEdit);
      setEditingSkill(null);
      await onRefresh?.();
    } catch (err) {
      setError(err?.message || 'Failed to update skill');
    } finally {
      setBusy(false);
    }
  };

  const deleteSkill = async (skill) => {
    if (!skill?._id) {
      setError('Cannot delete: skill has no _id.');
      return;
    }
    if (!window.confirm(`Delete skill: ${skill.name}?`)) return;

    setError('');
    setBusy(true);
    try {
      await api.deleteSkill(skill._id);
      await onRefresh?.();
    } catch (err) {
      setError(err?.message || 'Failed to delete skill');
    } finally {
      setBusy(false);
    }
  };

  const openProjectEdit = (project) => {
    setEditingProject(project);
    setProjectEdit({
      title: project?.title || '',
      description: project?.description || '',
      techStack: Array.isArray(project?.techStack) ? project.techStack.join(', ') : '',
      imageUrl: project?.imageUrl || '',
      githubUrl: project?.githubUrl || '',
      liveUrl: project?.liveUrl || ''
    });
  };

  const saveProjectEdit = async () => {
    if (!editingProject?._id) {
      setError('Cannot edit: project has no _id.');
      return;
    }
    setError('');
    setBusy(true);
    try {
      await api.updateProject(editingProject._id, {
        ...projectEdit,
        techStack: toTechStackArray(projectEdit.techStack)
      });
      setEditingProject(null);
      await onRefresh?.();
    } catch (err) {
      setError(err?.message || 'Failed to update project');
    } finally {
      setBusy(false);
    }
  };

  const deleteProject = async (project) => {
    if (!project?._id) {
      setError('Cannot delete: project has no _id.');
      return;
    }
    if (!window.confirm(`Delete project: ${project.title}?`)) return;

    setError('');
    setBusy(true);
    try {
      await api.deleteProject(project._id);
      await onRefresh?.();
    } catch (err) {
      setError(err?.message || 'Failed to delete project');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-10">
      <div className="rounded-2xl border border-green-500/15 bg-black/40 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono text-sm text-green-200">admin://content (dev only)</div>
            <div className="mt-1 text-xs text-green-200/60">
              Create/update skills & projects from the UI.
            </div>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={() => onRefresh?.()}
            className="focus-neon rounded-md border border-green-500/20 px-3 py-1.5 text-xs text-green-200/90 hover:border-green-500/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            refresh
          </button>
        </div>

        {error ? <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-200">{error}</div> : null}

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-3 font-mono text-xs text-green-200/70">skills://write</div>
            <form onSubmit={submitSkill} className="grid gap-3">
              <label className="grid gap-1">
                <span className="text-xs text-green-200/70">name</span>
                <input
                  value={skillDraft.name}
                  onChange={(e) => setSkillDraft((s) => ({ ...s, name: e.target.value }))}
                  className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
                  placeholder="React"
                  required
                />
              </label>
              <label className="grid gap-1">
                <span className="text-xs text-green-200/70">logoUrl</span>
                <input
                  value={skillDraft.logoUrl}
                  onChange={(e) => setSkillDraft((s) => ({ ...s, logoUrl: e.target.value }))}
                  className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
                  placeholder="https://..."
                  required
                />
              </label>

              <button
                type="submit"
                disabled={busy}
                className="focus-neon mt-1 rounded-md bg-green-500/10 px-4 py-2 text-sm text-green-100 ring-1 ring-green-500/20 hover:bg-green-500/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                add skill
              </button>
            </form>

            <div className="mt-5 grid gap-2">
              {(skills || []).map((s) => (
                <div key={s._id || s.name} className="flex items-center justify-between gap-3 rounded-md border border-green-500/10 bg-black/30 px-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate font-mono text-xs text-green-100">{s.name}</div>
                    <div className="truncate text-[11px] text-green-200/60">{s.logoUrl}</div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      disabled={busy || !s._id}
                      onClick={() => openSkillEdit(s)}
                      className="focus-neon rounded-md border border-green-500/20 px-2 py-1 text-[11px] text-green-200/90 hover:border-green-500/40 disabled:opacity-50"
                      title={!s._id ? 'Missing _id; cannot edit' : 'Edit skill'}
                    >
                      edit
                    </button>
                    <button
                      type="button"
                      disabled={busy || !s._id}
                      onClick={() => deleteSkill(s)}
                      className="focus-neon rounded-md border border-red-500/25 px-2 py-1 text-[11px] text-red-200/90 hover:border-red-500/45 disabled:opacity-50"
                      title={!s._id ? 'Missing _id; cannot delete' : 'Delete skill'}
                    >
                      del
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {!hasIds.skillIds ? (
              <div className="mt-3 text-[11px] text-green-200/50">
                Note: edits/deletes require MongoDB `_id` fields.
              </div>
            ) : null}
          </div>

          <div>
            <div className="mb-3 font-mono text-xs text-green-200/70">projects://write</div>
            <form onSubmit={submitProject} className="grid gap-3">
              <label className="grid gap-1">
                <span className="text-xs text-green-200/70">title</span>
                <input
                  value={projectDraft.title}
                  onChange={(e) => setProjectDraft((p) => ({ ...p, title: e.target.value }))}
                  className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
                  placeholder="My Project"
                  required
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs text-green-200/70">description</span>
                <textarea
                  value={projectDraft.description}
                  onChange={(e) => setProjectDraft((p) => ({ ...p, description: e.target.value }))}
                  className="focus-neon min-h-24 rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
                  placeholder="What it does…"
                  required
                />
              </label>

              <label className="grid gap-1">
                <span className="text-xs text-green-200/70">techStack (comma separated)</span>
                <input
                  value={projectDraft.techStack}
                  onChange={(e) => setProjectDraft((p) => ({ ...p, techStack: e.target.value }))}
                  className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
                  placeholder="React, Node.js, MongoDB"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-1">
                  <span className="text-xs text-green-200/70">imageUrl</span>
                  <input
                    value={projectDraft.imageUrl}
                    onChange={(e) => setProjectDraft((p) => ({ ...p, imageUrl: e.target.value }))}
                    className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
                    placeholder="https://..."
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-xs text-green-200/70">githubUrl</span>
                  <input
                    value={projectDraft.githubUrl}
                    onChange={(e) => setProjectDraft((p) => ({ ...p, githubUrl: e.target.value }))}
                    className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
                    placeholder="https://github.com/..."
                  />
                </label>
                <label className="grid gap-1 md:col-span-2">
                  <span className="text-xs text-green-200/70">liveUrl</span>
                  <input
                    value={projectDraft.liveUrl}
                    onChange={(e) => setProjectDraft((p) => ({ ...p, liveUrl: e.target.value }))}
                    className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
                    placeholder="https://..."
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="focus-neon mt-1 rounded-md bg-green-500/10 px-4 py-2 text-sm text-green-100 ring-1 ring-green-500/20 hover:bg-green-500/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                add project
              </button>
            </form>

            <div className="mt-5 grid gap-2">
              {(projects || []).map((p) => (
                <div key={p._id || p.title} className="flex items-center justify-between gap-3 rounded-md border border-green-500/10 bg-black/30 px-3 py-2">
                  <div className="min-w-0">
                    <div className="truncate font-mono text-xs text-green-100">{p.title}</div>
                    <div className="truncate text-[11px] text-green-200/60">{p.description}</div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      disabled={busy || !p._id}
                      onClick={() => openProjectEdit(p)}
                      className="focus-neon rounded-md border border-green-500/20 px-2 py-1 text-[11px] text-green-200/90 hover:border-green-500/40 disabled:opacity-50"
                      title={!p._id ? 'Missing _id; cannot edit' : 'Edit project'}
                    >
                      edit
                    </button>
                    <button
                      type="button"
                      disabled={busy || !p._id}
                      onClick={() => deleteProject(p)}
                      className="focus-neon rounded-md border border-red-500/25 px-2 py-1 text-[11px] text-red-200/90 hover:border-red-500/45 disabled:opacity-50"
                      title={!p._id ? 'Missing _id; cannot delete' : 'Delete project'}
                    >
                      del
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {!hasIds.projectIds ? (
              <div className="mt-3 text-[11px] text-green-200/50">
                Note: edits/deletes require MongoDB `_id` fields.
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Modal open={!!editingSkill} title="Edit skill" onClose={() => setEditingSkill(null)}>
        <div className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs text-green-200/70">name</span>
            <input
              value={skillEdit.name}
              onChange={(e) => setSkillEdit((s) => ({ ...s, name: e.target.value }))}
              className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-xs text-green-200/70">logoUrl</span>
            <input
              value={skillEdit.logoUrl}
              onChange={(e) => setSkillEdit((s) => ({ ...s, logoUrl: e.target.value }))}
              className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
            />
          </label>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="focus-neon rounded-md border border-green-500/20 px-3 py-2 text-sm text-green-200/90 hover:border-green-500/40"
              onClick={() => setEditingSkill(null)}
              disabled={busy}
            >
              cancel
            </button>
            <button
              type="button"
              className="focus-neon rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-100 ring-1 ring-green-500/20 hover:bg-green-500/15 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={saveSkillEdit}
              disabled={busy}
            >
              save
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={!!editingProject} title="Edit project" onClose={() => setEditingProject(null)}>
        <div className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-xs text-green-200/70">title</span>
            <input
              value={projectEdit.title}
              onChange={(e) => setProjectEdit((p) => ({ ...p, title: e.target.value }))}
              className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-green-200/70">description</span>
            <textarea
              value={projectEdit.description}
              onChange={(e) => setProjectEdit((p) => ({ ...p, description: e.target.value }))}
              className="focus-neon min-h-24 rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-green-200/70">techStack (comma separated)</span>
            <input
              value={projectEdit.techStack}
              onChange={(e) => setProjectEdit((p) => ({ ...p, techStack: e.target.value }))}
              className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
            />
          </label>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-xs text-green-200/70">imageUrl</span>
              <input
                value={projectEdit.imageUrl}
                onChange={(e) => setProjectEdit((p) => ({ ...p, imageUrl: e.target.value }))}
                className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-xs text-green-200/70">githubUrl</span>
              <input
                value={projectEdit.githubUrl}
                onChange={(e) => setProjectEdit((p) => ({ ...p, githubUrl: e.target.value }))}
                className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
              />
            </label>
            <label className="grid gap-1 md:col-span-2">
              <span className="text-xs text-green-200/70">liveUrl</span>
              <input
                value={projectEdit.liveUrl}
                onChange={(e) => setProjectEdit((p) => ({ ...p, liveUrl: e.target.value }))}
                className="focus-neon rounded-md border border-green-500/15 bg-black/50 px-3 py-2 text-sm text-green-100"
              />
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="focus-neon rounded-md border border-green-500/20 px-3 py-2 text-sm text-green-200/90 hover:border-green-500/40"
              onClick={() => setEditingProject(null)}
              disabled={busy}
            >
              cancel
            </button>
            <button
              type="button"
              className="focus-neon rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-100 ring-1 ring-green-500/20 hover:bg-green-500/15 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={saveProjectEdit}
              disabled={busy}
            >
              save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
