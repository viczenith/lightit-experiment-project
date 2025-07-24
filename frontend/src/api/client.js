const BASE_URL = 'http://localhost:4000';

async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(BASE_URL + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body != null ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.status === 204 ? null : res.json();
}

export const API = {
  getExperiments: (status = '') =>
    request(`/experiments${status ? `?status=${status}` : ''}`),
  addExperiment: (data) =>
    request('/experiments', { method: 'POST', body: data }),
  updateExperiment: (id, data) =>
    request(`/experiments/${id}`, { method: 'PUT', body: data }),
  deleteExperiment: (id) =>
    request(`/experiments/${id}`, { method: 'DELETE' }),

  // Comments
  getComments: (experimentId) =>
    request(`/comments?experimentId=${experimentId}`),
  addComment: (experimentId, data) =>
    request(`/experiments/${experimentId}/comments`, { method: 'POST', body: data }),
  hideComment: (commentId) =>
    request(`/comments/${commentId}`, { method: 'PATCH', body: { hidden: true } }),
  deleteComment: (commentId) =>
    request(`/comments/${commentId}`, { method: 'DELETE' }),

  // Users
  getUsers: (role = '') =>
    request(`/users${role ? `?role=${role}` : ''}`),
  addUser: (data) =>
    request('/users', { method: 'POST', body: data }),
  updateUser: (id, data) =>
    request(`/users/${id}`, { method: 'PATCH', body: data }),
  deleteUser: (id) =>
    request(`/users/${id}`, { method: 'DELETE' }),
};
