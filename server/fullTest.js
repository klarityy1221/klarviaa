// Comprehensive backend API integration smoke test
import dotenv from 'dotenv';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

dotenv.config();

const API = `http://localhost:${process.env.PORT || 4000}/api`;

function hash(p) {return crypto.createHash('sha256').update(p).digest('hex');}

async function jsonFetch(url, opts = {}) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json', ...(opts.headers||{}) }, ...opts });
  let body = null;
  const text = await res.text();
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} for ${url}: ${text}`);
  }
  return body;
}

async function run() {
  const report = [];
  const push = (name, ok, extra = {}) => report.push({ name, ok, ...extra });
  try {
    // Users list
    const users = await jsonFetch(`${API}/users`);
    push('GET /users', true, { count: users.length });

    // Register temp user (may conflict if already exists)
    const uid = 'temp_' + Date.now();
    let registered = null;
    try {
      registered = await jsonFetch(`${API}/register`, { method: 'POST', body: JSON.stringify({ username: uid, name: 'Temp User', email: `${uid}@x.test`, password: 'pass123' }) });
      push('POST /register', true, { id: registered.id });
    } catch (e) {
      push('POST /register', false, { error: e.message });
    }

    // Login (admin)
    let login = null;
    try {
      login = await jsonFetch(`${API}/login`, { method: 'POST', body: JSON.stringify({ email: 'klaritymentalhealthblr@gmail.com', password: 'klarviaa@7789' }) });
      push('POST /login (admin)', true, { user: login.username });
    } catch (e) { push('POST /login (admin)', false, { error: e.message }); }

    // Resources list
    try {
      const resources = await jsonFetch(`${API}/resources`);
      push('GET /resources', true, { count: resources.length });
    } catch (e) { push('GET /resources', false, { error: e.message }); }

    // Therapists list
    let therapists = [];
    try {
      therapists = await jsonFetch(`${API}/therapists`);
      push('GET /therapists', true, { count: therapists.length });
    } catch (e) { push('GET /therapists', false, { error: e.message }); }

    // Add therapist
    let newTherapist = null;
    try {
      newTherapist = await jsonFetch(`${API}/therapists`, { method: 'POST', body: JSON.stringify({ name: 'Dr Test', specialization: 'Mindfulness', availability: 'Mon-Fri', rating: 4.9, image: '' }) });
      push('POST /therapists', true, { id: newTherapist.id });
    } catch (e) { push('POST /therapists', false, { error: e.message }); }

    // Exercises list
    let exercises = [];
    try {
      exercises = await jsonFetch(`${API}/exercises`);
      push('GET /exercises', true, { count: exercises.length });
    } catch (e) { push('GET /exercises', false, { error: e.message }); }

    // Add exercise
    let newExercise = null;
    try {
      newExercise = await jsonFetch(`${API}/exercises`, { method: 'POST', body: JSON.stringify({ title: 'Breathing', duration: '5 min', description: 'Calm breathing', tag: 'Calm', tagColor: '#00aaff' }) });
      push('POST /exercises', true, { id: newExercise.id });
    } catch (e) { push('POST /exercises', false, { error: e.message }); }

    // Book session (requires user & therapist)
    try {
      if (newTherapist && registered) {
        const session = await jsonFetch(`${API}/book-session`, { method: 'POST', body: JSON.stringify({ therapistId: newTherapist.id, userId: registered.id, date: '2025-08-15', time: '10:00' }) });
        push('POST /book-session', true, { id: session.id });
      } else {
        push('POST /book-session', false, { skipped: true });
      }
    } catch (e) { push('POST /book-session', false, { error: e.message }); }

    // Sessions by user
    try {
      if (registered) {
        const sessions = await jsonFetch(`${API}/sessions?userId=${registered.id}`);
        push('GET /sessions?userId', true, { count: sessions.length });
      }
    } catch (e) { push('GET /sessions?userId', false, { error: e.message }); }

    // Stats
    try {
      const stats = await jsonFetch(`${API}/stats`);
      push('GET /stats', true, stats);
    } catch (e) { push('GET /stats', false, { error: e.message }); }

    // Update & delete therapist/exercise clean-up
    try {
      if (newTherapist) {
        await jsonFetch(`${API}/therapists/${newTherapist.id}`, { method: 'PUT', body: JSON.stringify({ name: 'Dr Test Updated', specialization: 'CBT', availability: 'Tue-Thu', rating: 4.7, image: '' }) });
        push('PUT /therapists/:id', true);
        await jsonFetch(`${API}/therapists/${newTherapist.id}`, { method: 'DELETE' });
        push('DELETE /therapists/:id', true);
      }
    } catch (e) { push('Therapist update/delete', false, { error: e.message }); }

    try {
      if (newExercise) {
        await jsonFetch(`${API}/exercises/${newExercise.id}`, { method: 'PUT', body: JSON.stringify({ title: 'Breathing Updated', duration: '6 min', description: 'Updated desc', tag: 'Focus', tagColor: '#ffaa00' }) });
        push('PUT /exercises/:id', true);
        await jsonFetch(`${API}/exercises/${newExercise.id}`, { method: 'DELETE' });
        push('DELETE /exercises/:id', true);
      }
    } catch (e) { push('Exercise update/delete', false, { error: e.message }); }

    // Summary
    const failed = report.filter(r => !r.ok && !r.skipped);
    console.table(report);
    if (failed.length) {
      console.error(`\nFailures: ${failed.length}`);
      failed.forEach(f => console.error(`${f.name}: ${f.error||'unknown error'}`));
      process.exit(1);
    } else {
      console.log('\nAll API tests passed');
    }
  } catch (outer) {
    console.error('Critical test failure', outer);
    process.exit(1);
  }
}

run();
