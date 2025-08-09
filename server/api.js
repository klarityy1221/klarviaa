import express from 'express';
import multer from 'multer';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/sessions', async (req, res) => {
  const db = await getDb();
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  const sessions = await db.all('SELECT * FROM sessions WHERE userId = ?', [userId]);
  res.json(sessions);
});
let db;

async function getDb() {
  if (db) return db;
  let dbDir = path.dirname(new URL(import.meta.url).pathname);
  if (process.platform === 'win32' && dbDir.startsWith('/')) {
    dbDir = dbDir.slice(1);
  }
  const dbPath = path.join(dbDir, 'database.sqlite');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  db = await open({ filename: dbPath, driver: sqlite3.Database });
  await db.exec(`CREATE TABLE IF NOT EXISTS therapists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    specialization TEXT,
    availability TEXT,
    rating REAL,
    image TEXT
  )`);
  await db.exec(`CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    duration TEXT,
    description TEXT,
    tag TEXT,
    tagColor TEXT
  )`);
  await db.exec(`CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    type TEXT,
    duration TEXT,
    category TEXT
  )`);
  await db.exec(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    therapistId INTEGER,
    userId INTEGER,
    date TEXT,
    time TEXT
  )`);
  return db;
}

// Therapists CRUD
router.get('/therapists', async (req, res) => {
  const db = await getDb();
  const therapists = await db.all('SELECT * FROM therapists');
  res.json(therapists);
});
router.post('/therapists', async (req, res) => {
  const db = await getDb();
  const { name, specialization, availability, rating, image } = req.body;
  const result = await db.run('INSERT INTO therapists (name, specialization, availability, rating, image) VALUES (?, ?, ?, ?, ?)', [name, specialization, availability, rating, image]);
  res.json({ id: result.lastID });
});
router.put('/therapists/:id', async (req, res) => {
  const db = await getDb();
  const { name, specialization, availability, rating, image } = req.body;
  await db.run('UPDATE therapists SET name=?, specialization=?, availability=?, rating=?, image=? WHERE id=?', [name, specialization, availability, rating, image, req.params.id]);
  res.json({ success: true });
});
router.delete('/therapists/:id', async (req, res) => {
  const db = await getDb();
  await db.run('DELETE FROM therapists WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

// Exercises CRUD
router.get('/exercises', async (req, res) => {
  const db = await getDb();
  const exercises = await db.all('SELECT * FROM exercises');
  res.json(exercises);
});
router.post('/exercises', async (req, res) => {
  const db = await getDb();
  const { title, duration, description, tag, tagColor } = req.body;
  const result = await db.run('INSERT INTO exercises (title, duration, description, tag, tagColor) VALUES (?, ?, ?, ?, ?)', [title, duration, description, tag, tagColor]);
  res.json({ id: result.lastID });
});
router.put('/exercises/:id', async (req, res) => {
  const db = await getDb();
  const { title, duration, description, tag, tagColor } = req.body;
  await db.run('UPDATE exercises SET title=?, duration=?, description=?, tag=?, tagColor=? WHERE id=?', [title, duration, description, tag, tagColor, req.params.id]);
  res.json({ success: true });
});
router.delete('/exercises/:id', async (req, res) => {
  const db = await getDb();
  await db.run('DELETE FROM exercises WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

// Resources CRUD with file upload
router.get('/resources', async (req, res) => {
  const db = await getDb();
  const resources = await db.all('SELECT * FROM resources');
  res.json(resources);
});
// Accepts multipart/form-data for file upload
router.post('/resources', upload.single('file'), async (req, res) => {
  const db = await getDb();
  const { title, type, duration, category } = req.body;
  let fileUrl = null;
  if (req.file) {
    fileUrl = `/uploads/${req.file.filename}`;
  }
  const result = await db.run('INSERT INTO resources (title, type, duration, category, fileUrl) VALUES (?, ?, ?, ?, ?)', [title, type, duration, category, fileUrl]);
  res.json({ id: result.lastID, fileUrl });
});
router.put('/resources/:id', async (req, res) => {
  const db = await getDb();
  const { title, type, duration, category } = req.body;
  await db.run('UPDATE resources SET title=?, type=?, duration=?, category=? WHERE id=?', [title, type, duration, category, req.params.id]);
  res.json({ success: true });
});
router.delete('/resources/:id', async (req, res) => {
  const db = await getDb();
  await db.run('DELETE FROM resources WHERE id=?', [req.params.id]);
  res.json({ success: true });
});

// Book session (dummy)
router.post('/book-session', async (req, res) => {
  const db = await getDb();
  const { therapistId, userId, date, time } = req.body;
  if (!therapistId || !userId || !date || !time) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const result = await db.run(
    'INSERT INTO sessions (therapistId, userId, date, time) VALUES (?, ?, ?, ?)',
    [therapistId, userId, date, time]
  );
  res.json({ success: true, id: result.lastID });
});

export default router;
