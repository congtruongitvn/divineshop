const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  get: (path: string, token?: string) =>
    fetch(`${BASE}${path}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }).then(r => r.json()),

  post: (path: string, body: any, token?: string) =>
    fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    }).then(r => r.json()),

  put: (path: string, body: any, token?: string) =>
    fetch(`${BASE}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    }).then(r => r.json()),

  delete: (path: string, token?: string) =>
    fetch(`${BASE}${path}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }).then(r => r.json()),
};
