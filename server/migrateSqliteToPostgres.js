// Optional one-time migration from old SQLite users/resources to PostgreSQL
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';
import { initDb, createUser, addResource } from './models.js';
import crypto from 'crypto';

dotenv.config();

const hash = (p) => crypto.createHash('sha256').update(p).digest('hex');

async function migrate() {
  await initDb();
  const db = await open({ filename: './database.sqlite', driver: sqlite3.Database });
  try {
    const users = await db.all('SELECT * FROM users');
    for (const u of users) {
      await createUser({
        username: u.username,
        name: u.name,
        email: u.email,
        password: u.password.match(/^[a-f0-9]{64}$/i) ? u.password : hash(u.password),
        isadmin: !!u.isAdmin
      });
    }
  } catch {}
  try {
    const resources = await db.all('SELECT * FROM resources');
    for (const r of resources) {
      await addResource(r);
    }
  } catch {}
  console.log('Migration attempt finished');
}

migrate().catch(e => { console.error(e); process.exit(1); });
