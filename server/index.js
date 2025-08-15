
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import apiRoutes from './api.js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDb, getUsers, createUser, getUserByEmailAndPassword, getUserByUsername } from './models.js';

dotenv.config();



const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json());
// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', apiRoutes);

// Root route & health
app.get('/', (req, res) => {
  res.send('Welcome to the Klarviaa backend server!');
});
app.get('/api/health', async (req, res) => {
  try {
    // Lightweight check: list 1 user (or just rely on init having succeeded)
    await initDb();
    res.json({ status: 'ok' });
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// Database initialization (PostgreSQL)
const hashPassword = (password) => crypto.createHash('sha256').update(password).digest('hex');
(async () => {
  try {
    await initDb();
    // Ensure admin user exists
    const adminUsername = 'klarviaa';
    const adminName = 'klarviaa';
    const adminEmail = 'klaritymentalhealthblr@gmail.com';
    const adminPassword = 'klarviaa@7789';
    const existing = await getUserByUsername(adminUsername);
    if (!existing) {
      await createUser({
        username: adminUsername,
        name: adminName,
        email: adminEmail,
        password: hashPassword(adminPassword),
        isadmin: true
      });
      console.log('Admin user created');
    }
    console.log('PostgreSQL connection ready');
  } catch (err) {
    console.error('DB init failed', err);
  }
})();

// API routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list users' });
  }
});


// Registration route
app.post('/api/register', async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const user = await createUser({ username, name, email, password: hashPassword(password), isadmin: false });
    if (!user) return res.status(409).json({ error: 'User already exists' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const user = await getUserByEmailAndPassword(email, hashPassword(password));
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ ...user, isAdmin: user.isadmin });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
