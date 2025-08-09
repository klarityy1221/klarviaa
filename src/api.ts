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

export const API_BASE_URL = 'http://localhost:4000/api';

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
  const res = await fetch(`${API_BASE_URL}/resources`);
  if (!res.ok) throw new Error('Failed to fetch resources');
  return res.json();
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
