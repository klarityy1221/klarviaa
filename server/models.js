
// PostgreSQL DB connection and queries
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('render') ? { rejectUnauthorized: false } : false
});

export async function getResources() {
  const { rows } = await pool.query('SELECT * FROM resources ORDER BY id DESC');
  return rows.map(r => ({
    id: r.id,
    title: r.title,
    type: r.type,
    duration: r.duration,
    category: r.category,
    fileUrl: r.fileurl || r.fileUrl || null,
    mimeType: r.mimetype || r.mimeType || null,
    originalName: r.originalname || r.originalName || null
  }));
}

export async function addResource(resource) {
  const { title, type, duration, category, fileUrl, mimeType, originalName } = resource;
  const { rows } = await pool.query(
    `INSERT INTO resources (title, type, duration, category, fileUrl, mimeType, originalName)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [title, type, duration, category, fileUrl, mimeType, originalName]
  );
  const r = rows[0];
  return {
    id: r.id,
    title: r.title,
    type: r.type,
    duration: r.duration,
    category: r.category,
    fileUrl: r.fileurl || r.fileUrl || null,
    mimeType: r.mimetype || r.mimeType || null,
    originalName: r.originalname || r.originalName || null
  };
}

export async function getResourceById(id) {
  const { rows } = await pool.query('SELECT * FROM resources WHERE id = $1', [id]);
  const r = rows[0];
  if (!r) return null;
  return {
    id: r.id,
    title: r.title,
    type: r.type,
    duration: r.duration,
    category: r.category,
    fileUrl: r.fileurl || r.fileUrl || null,
    mimeType: r.mimetype || r.mimeType || null,
    originalName: r.originalname || r.originalName || null
  };
}

// Add more queries as needed

// Initialize DB schema (create tables if they don't exist)
export async function initDb() {
  await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  isadmin BOOLEAN DEFAULT FALSE,
  phone TEXT,
  emergencyContact TEXT,
  preferences JSONB DEFAULT '{}'::jsonb
  )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    title TEXT,
    type TEXT,
    duration TEXT,
    category TEXT,
    fileUrl TEXT,
    mimeType TEXT,
    originalName TEXT
  )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS therapists (
    id SERIAL PRIMARY KEY,
    name TEXT,
    specialization TEXT,
    availability TEXT,
    rating REAL,
    image TEXT
  )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS exercises (
    id SERIAL PRIMARY KEY,
    title TEXT,
    duration TEXT,
    description TEXT,
    tag TEXT,
    tagColor TEXT
  )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    therapistId INTEGER REFERENCES therapists(id) ON DELETE SET NULL,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date TEXT,
    time TEXT
  )`);
}

export async function getUsers() {
  const { rows } = await pool.query('SELECT id, username, name, email, isadmin FROM users ORDER BY id DESC');
  return rows;
}

export async function updateUser(id, { name, email, phone, emergencyContact, preferences }) {
  // Merge preferences JSON if provided
  if (preferences) {
    await pool.query(
      'UPDATE users SET name=$1, email=$2, phone=$3, emergencyContact=$4, preferences = $5 WHERE id=$6',
      [name, email, phone, emergencyContact, JSON.stringify(preferences), id]
    );
  } else {
    await pool.query('UPDATE users SET name=$1, email=$2, phone=$3, emergencyContact=$4 WHERE id=$5', [name, email, phone, emergencyContact, id]);
  }
  const { rows } = await pool.query('SELECT id, username, name, email, phone, emergencyContact, preferences, isadmin FROM users WHERE id=$1', [id]);
  return rows[0];
}

export async function createUser({ username, name, email, password, isadmin = false }) {
  const { rows } = await pool.query(
    `INSERT INTO users (username, name, email, password, isadmin) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (username) DO NOTHING RETURNING id, username, name, email, isadmin`,
    [username, name, email, password, isadmin]
  );
  return rows[0];
}

export async function getUserByEmailAndPassword(email, password) {
  const { rows } = await pool.query('SELECT id, username, name, email, isadmin FROM users WHERE email = $1 AND password = $2', [email, password]);
  return rows[0];
}

export async function getUserByUsername(username) {
  const { rows } = await pool.query('SELECT id, username, name, email, isadmin FROM users WHERE username = $1', [username]);
  return rows[0];

}

// Resource helpers
export async function updateResource(id, { title, type, duration, category }) {
  await pool.query('UPDATE resources SET title=$1, type=$2, duration=$3, category=$4 WHERE id=$5', [title, type, duration, category, id]);
}
export async function deleteResource(id) {
  await pool.query('DELETE FROM resources WHERE id=$1', [id]);
}

// Therapist helpers
export async function getTherapists() {
  const { rows } = await pool.query('SELECT * FROM therapists ORDER BY id DESC');
  return rows;
}
export async function addTherapist({ name, specialization, availability, rating, image }) {
  const { rows } = await pool.query(
    'INSERT INTO therapists (name, specialization, availability, rating, image) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [name, specialization, availability, rating, image]
  );
  return rows[0];
}
export async function updateTherapist(id, { name, specialization, availability, rating, image }) {
  await pool.query('UPDATE therapists SET name=$1, specialization=$2, availability=$3, rating=$4, image=$5 WHERE id=$6', [name, specialization, availability, rating, image, id]);
}
export async function deleteTherapist(id) {
  await pool.query('DELETE FROM therapists WHERE id=$1', [id]);
}

// Exercise helpers
export async function getExercises() {
  const { rows } = await pool.query('SELECT * FROM exercises ORDER BY id DESC');
  return rows;
}
export async function addExercise({ title, duration, description, tag, tagColor }) {
  const { rows } = await pool.query(
    'INSERT INTO exercises (title, duration, description, tag, tagColor) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [title, duration, description, tag, tagColor]
  );
  return rows[0];
}
export async function updateExercise(id, { title, duration, description, tag, tagColor }) {
  await pool.query('UPDATE exercises SET title=$1, duration=$2, description=$3, tag=$4, tagColor=$5 WHERE id=$6', [title, duration, description, tag, tagColor, id]);
}
export async function deleteExercise(id) {
  await pool.query('DELETE FROM exercises WHERE id=$1', [id]);
}

// Sessions helpers
export async function getSessionsByUser(userId) {
  const { rows } = await pool.query('SELECT * FROM sessions WHERE userId=$1 ORDER BY id DESC', [userId]);
  return rows;
}
export async function addSession({ therapistId, userId, date, time }) {
  const { rows } = await pool.query(
    'INSERT INTO sessions (therapistId, userId, date, time) VALUES ($1,$2,$3,$4) RETURNING *',
    [therapistId, userId, date, time]
  );
  return rows[0];
}

// Stats
export async function getStats() {
  const queries = [
    pool.query('SELECT COUNT(*)::int AS c FROM sessions'),
    pool.query('SELECT COUNT(*)::int AS c FROM therapists'),
    pool.query('SELECT COUNT(*)::int AS c FROM exercises'),
    pool.query('SELECT COUNT(*)::int AS c FROM resources'),
    pool.query('SELECT COUNT(*)::int AS c FROM users')
  ];
  const [sessions, therapists, exercises, resources, users] = await Promise.all(queries);
  return {
    sessions: sessions.rows[0].c,
    therapists: therapists.rows[0].c,
    exercises: exercises.rows[0].c,
    resources: resources.rows[0].c,
    users: users.rows[0].c
  };
}
