// Fetch booked sessions for a user
export async function fetchUserSessions(userId: number) {
  const res = await fetch(`${API_BASE_URL}/sessions?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch sessions');
  return res.json();
}

// Upload resource (admin)
export async function uploadResource(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/resources`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Failed to upload resource');
  return res.json();
}
// src/api.ts

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

// Resolve a stored fileUrl (which may be a relative path like '/uploads/xxx') to an absolute URL
export function resolveFileUrl(fileUrl?: string | null) {
  if (!fileUrl) return '';
  if (/^https?:\/\//i.test(fileUrl)) return fileUrl;
  // If API_BASE_URL ends with /api, strip it to get origin
  const origin = API_BASE_URL.replace(/\/api\/?$/i, '');
  if (fileUrl.startsWith('/')) return `${origin}${fileUrl}`;
  return `${origin}/${fileUrl}`;
}

export async function fetchTherapists() {
  const res = await fetch(`${API_BASE_URL}/therapists`);
  if (!res.ok) throw new Error('Failed to fetch therapists');
  return res.json();
}

export async function fetchExercises() {
  const res = await fetch(`${API_BASE_URL}/exercises`);
  if (!res.ok) throw new Error('Failed to fetch exercises');
  return res.json();
}

export async function fetchResources() {
  try {
    const res = await fetch(`${API_BASE_URL}/resources`);
    if (!res.ok) throw new Error('Failed to fetch resources');
    return res.json();
  } catch (err) {
    console.error('fetchResources error', err);
    return [];
  }
}

export async function bookTherapistSession(therapistId: number, userId: number, date?: string, time?: string) {
  const res = await fetch(`${API_BASE_URL}/book-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ therapistId, userId, date, time })
  });
  if (!res.ok) throw new Error('Failed to book session');
  return res.json();
}

export async function updateUserProfile(payload: { id: number, name?: string, email?: string, phone?: string, emergencyContact?: string, preferences?: any }) {
  const res = await fetch(`${API_BASE_URL}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}
