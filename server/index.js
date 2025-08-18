
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import apiRoutes from './api.js';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDb, getUsers, createUser, getUserByEmailAndPassword, getUserByUsername } from './models.js';

dotenv.config();



const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
// Configure CORS to allow localhost in development and a specific production origin
const CLIENT_URL_DEV = process.env.CLIENT_URL_DEV || 'http://localhost:5173';
const CLIENT_URL_PROD = process.env.CLIENT_URL_PROD || '';
const whitelist = process.env.NODE_ENV === 'production'
  ? (CLIENT_URL_PROD.split(',').map(s => s.trim()).filter(Boolean))
  : (CLIENT_URL_DEV.split(',').map(s => s.trim()).filter(Boolean));

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser tools like curl/postman (no origin)
    if (!origin) return callback(null, true);
    if (whitelist.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Limit JSON body size to prevent large payloads
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || '16kb' }));

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Rate limiter: 60 requests per minute per IP for API routes
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Apply rate limiter and API routes
app.use('/api', apiLimiter, apiRoutes);

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
