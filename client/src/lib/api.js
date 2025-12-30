const apiBase = import.meta.env.VITE_API_URL || '';

async function request(path, options) {
  const res = await fetch(`${apiBase}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    },
    ...options
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.error?.message || `Request failed: ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}

export const api = {
  health: () => request('/api/health'),
  getSkills: () => request('/api/skills'),
  getProjects: () => request('/api/projects'),
  createSkill: (payload) => request('/api/skills', { method: 'POST', body: JSON.stringify(payload) }),
  updateSkill: (id, payload) => request(`/api/skills/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteSkill: (id) => request(`/api/skills/${id}`, { method: 'DELETE' }),

  createProject: (payload) => request('/api/projects', { method: 'POST', body: JSON.stringify(payload) }),
  updateProject: (id, payload) => request(`/api/projects/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteProject: (id) => request(`/api/projects/${id}`, { method: 'DELETE' }),
  sendContact: (payload) => request('/api/contact', { method: 'POST', body: JSON.stringify(payload) })
};
