import express from 'express';
import multer from 'multer';
import { 
  getResources, addResource, updateResource, deleteResource,
  getTherapists, addTherapist, updateTherapist, deleteTherapist,
  getExercises, addExercise, updateExercise, deleteExercise,
  getSessionsByUser, addSession, getStats
} from './models.js';
import { updateUser } from './models.js';

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

// Ensure uploads directory exists and configure storage to preserve original extension
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeOriginal = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + safeOriginal);
  }
});
const upload = multer({ storage });

router.get('/sessions', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  try {
    const sessions = await getSessionsByUser(userId);
    res.json(sessions);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Therapists CRUD
router.get('/therapists', async (_req, res) => {
  try { res.json(await getTherapists()); } catch { res.status(500).json({ error: 'Failed to fetch therapists' }); }
});
router.post('/therapists', async (req, res) => {
  try { const t = await addTherapist(req.body); res.json(t); } catch { res.status(400).json({ error: 'Failed to add therapist' }); }
});
router.put('/therapists/:id', async (req, res) => {
  try { await updateTherapist(req.params.id, req.body); res.json({ success: true }); } catch { res.status(400).json({ error: 'Failed to update therapist' }); }
});
router.delete('/therapists/:id', async (req, res) => {
  try { await deleteTherapist(req.params.id); res.json({ success: true }); } catch { res.status(400).json({ error: 'Failed to delete therapist' }); }
});

// Exercises CRUD
router.get('/exercises', async (_req, res) => {
  try { res.json(await getExercises()); } catch { res.status(500).json({ error: 'Failed to fetch exercises' }); }
});
router.post('/exercises', async (req, res) => {
  try { const ex = await addExercise(req.body); res.json(ex); } catch { res.status(400).json({ error: 'Failed to add exercise' }); }
});
router.put('/exercises/:id', async (req, res) => {
  try { await updateExercise(req.params.id, req.body); res.json({ success: true }); } catch { res.status(400).json({ error: 'Failed to update exercise' }); }
});
router.delete('/exercises/:id', async (req, res) => {
  try { await deleteExercise(req.params.id); res.json({ success: true }); } catch { res.status(400).json({ error: 'Failed to delete exercise' }); }
});

// Resources CRUD with file upload
router.get('/resources', async (_req, res) => {
  try { res.json(await getResources()); } catch { res.status(500).json({ error: 'Failed to fetch resources' }); }
});
// Accepts multipart/form-data for file upload
router.post('/resources', upload.single('file'), async (req, res) => {
  try {
    const { title, type, duration, category } = req.body;
    let fileUrl = null, mimeType = null, originalName = null;
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
      mimeType = req.file.mimetype;
      originalName = req.file.originalname;
    }
    const resource = await addResource({ title, type, duration, category, fileUrl, mimeType, originalName });
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});
router.put('/resources/:id', async (req, res) => {
  try { await updateResource(req.params.id, req.body); res.json({ success: true }); } catch { res.status(400).json({ error: 'Failed to update resource' }); }
});
router.delete('/resources/:id', async (req, res) => {
  try { await deleteResource(req.params.id); res.json({ success: true }); } catch { res.status(400).json({ error: 'Failed to delete resource' }); }
});

// Book session (dummy)
router.post('/book-session', async (req, res) => {
  const { therapistId, userId, date, time } = req.body;
  if (!therapistId || !userId || !date || !time) return res.status(400).json({ error: 'Missing fields' });
  try { const session = await addSession({ therapistId, userId, date, time }); res.json({ success: true, id: session.id }); } catch { res.status(400).json({ error: 'Failed to book session' }); }
});

// Aggregated stats endpoint
router.get('/stats', async (_req, res) => {
  try { res.json(await getStats()); } catch { res.status(500).json({ error: 'Failed to load stats' }); }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { id, name, email, phone, emergencyContact, preferences } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing user id' });
    const updated = await updateUser(id, { name, email, phone, emergencyContact, preferences });
    res.json(updated);
  } catch (err) {
    console.error('profile update error', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
