import { API_BASE, DEPT_MAP } from '../pagination/utils/constants';

/** Fetch all users and enrich with split name + department fields */
export async function fetchUsers() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error(`Failed to load users (${res.status})`);
  const data = await res.json();
  return data.map((u) => ({
    ...u,
    firstName: u.name.split(' ')[0],
    lastName: u.name.split(' ').slice(1).join(' '),
    department: DEPT_MAP[u.id] ?? 'Engineering',
  }));
}

/** Simulate adding a user — JSONPlaceholder echoes the POST but doesn't persist it */
export async function createUser(payload) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: payload.name, email: payload.email }),
  });
  if (!res.ok) throw new Error(`Failed to add user (${res.status})`);
  return res.json();
}

/** Simulate updating a user — JSONPlaceholder accepts PUT but doesn't persist it */
export async function updateUser(id, payload) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: payload.name, email: payload.email }),
  });
  if (!res.ok) throw new Error(`Failed to update user (${res.status})`);
  return res.json();
}

/** Simulate deleting a user — JSONPlaceholder accepts DELETE but doesn't persist it */
export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Failed to delete user (${res.status})`);
}
