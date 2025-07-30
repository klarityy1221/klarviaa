// server/seed.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

async function seed() {
  let dbDir = path.dirname(new URL(import.meta.url).pathname);
  if (process.platform === 'win32' && dbDir.startsWith('/')) {
    dbDir = dbDir.slice(1);
  }
  const dbPath = path.join(dbDir, 'database.sqlite');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  const db = await open({ filename: dbPath, driver: sqlite3.Database });

  // Therapists
  await db.exec('DELETE FROM therapists');
  await db.run('INSERT INTO therapists (name, specialization, availability, rating, image) VALUES (?, ?, ?, ?, ?)',
    'Dr. Sarah Johnson', 'Anxiety & Depression', 'Available Today', 4.9, '👩‍⚕️');
  await db.run('INSERT INTO therapists (name, specialization, availability, rating, image) VALUES (?, ?, ?, ?, ?)',
    'Dr. Michael Chen', 'Trauma Therapy', 'Next Available: Tomorrow', 4.8, '👨‍⚕️');
  await db.run('INSERT INTO therapists (name, specialization, availability, rating, image) VALUES (?, ?, ?, ?, ?)',
    'Dr. Emily Rodriguez', 'Cognitive Behavioral Therapy', 'Available Today', 4.9, '👩‍⚕️');

  // Exercises
  await db.exec('DELETE FROM exercises');
  await db.run('INSERT INTO exercises (title, duration, description, tag, tagColor) VALUES (?, ?, ?, ?, ?)',
    'Box Breathing', '5 min', 'Calm your nervous system with structured breathing', 'Focus', 'tag-focus');
  await db.run('INSERT INTO exercises (title, duration, description, tag, tagColor) VALUES (?, ?, ?, ?, ?)',
    '5-4-3-2-1 Grounding', '3 min', 'Ground yourself using your five senses', 'Anxiety Relief', 'tag-anxiety');
  await db.run('INSERT INTO exercises (title, duration, description, tag, tagColor) VALUES (?, ?, ?, ?, ?)',
    'Progressive Muscle Relaxation', '15 min', 'Release physical tension throughout your body', 'Stress Relief', 'tag-stress');
  await db.run('INSERT INTO exercises (title, duration, description, tag, tagColor) VALUES (?, ?, ?, ?, ?)',
    'Mindful Walking', '10 min', 'Practice mindfulness through gentle movement', 'Mindfulness', 'tag-mindfulness');

  // Resources
  await db.exec('DELETE FROM resources');
  await db.run('INSERT INTO resources (title, type, duration, category) VALUES (?, ?, ?, ?)',
    'Mindfulness for Beginners', 'podcast', '45 min', 'Mindfulness');
  await db.run('INSERT INTO resources (title, type, duration, category) VALUES (?, ?, ?, ?)',
    'Overcoming Anxiety', 'audiobook', '3h 20min', 'Anxiety');
  await db.run('INSERT INTO resources (title, type, duration, category) VALUES (?, ?, ?, ?)',
    'Sleep Better Tonight', 'course', '2h 15min', 'Sleep');
  await db.run('INSERT INTO resources (title, type, duration, category) VALUES (?, ?, ?, ?)',
    'Stress Management Techniques', 'podcast', '30 min', 'Stress');

  console.log('Database seeded with real data!');
  await db.close();
}

seed();
