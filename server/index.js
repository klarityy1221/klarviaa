import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Klarviaa backend server!');
});

// Database setup
let db;
(async () => {
  let dbDir = path.dirname(new URL(import.meta.url).pathname);
  if (process.platform === 'win32' && dbDir.startsWith('/')) {
    dbDir = dbDir.slice(1);
  }
  const dbPath = path.join(dbDir, 'database.sqlite');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    isAdmin INTEGER DEFAULT 0
  )`);

  // Create admin user if not exists
  const adminUsername = 'klarviaa';
  const adminName = 'klarviaa';
  const adminEmail = 'klarviaa7789@gmail.com';
  const adminPassword = 'klarviaa@7789';
  const hashPassword = (password) => crypto.createHash('sha256').update(password).digest('hex');
  const adminHash = hashPassword(adminPassword);
  const adminExists = await db.get('SELECT * FROM users WHERE username = ?', [adminUsername]);
  if (!adminExists) {
    await db.run('INSERT INTO users (username, name, email, password, isAdmin) VALUES (?, ?, ?, ?, 1)', [adminUsername, adminName, adminEmail, adminHash]);
    console.log('Admin user created');
  }
})();

// API routes
app.get('/api/users', async (req, res) => {
  const users = await db.all('SELECT * FROM users');
  res.json(users);
});


// Registration route
app.post('/api/register', async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    const result = await db.run('INSERT INTO users (username, name, email, password, isAdmin) VALUES (?, ?, ?, ?, 0)', [username, name, email, hash]);
    res.json({ id: result.lastID, username, name, email });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  const hash = crypto.createHash('sha256').update(password).digest('hex');
  const user = await db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, hash]);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ id: user.id, username: user.username, name: user.name, email: user.email, isAdmin: user.isAdmin === 1 });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
