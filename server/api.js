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
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fetch from 'node-fetch';
import { addChatMessage, getChatsByUser } from './models.js';

const MAX_MESSAGE_LENGTH = Number(process.env.MAX_MESSAGE_LENGTH || 1000);

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

dotenv.config();
// Defensive OpenAI client instantiation: only create client if key is present.
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
let openai = null;
if (OPENAI_API_KEY) {
  try {
    openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  } catch (e) {
    console.error('Failed to create OpenAI client:', e);
    openai = null;
  }
} else {
  console.warn('OPENAI_API_KEY not set — AI endpoints will return an error until configured.');
}

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

// Chat endpoint: logs user message, calls OpenAI chat completion, logs assistant reply, returns { reply }
router.post('/chat', async (req, res) => {
  try {
    const { userId, message } = req.body;
    const user_id = userId || req.body.user_id;
  if (!user_id || typeof message !== 'string') return res.status(400).json({ error: 'Missing userId or message' });
  if (message.length === 0 || message.length > MAX_MESSAGE_LENGTH) return res.status(400).json({ error: `Message must be 1..${MAX_MESSAGE_LENGTH} characters` });

    if (!openai) {
      // Local fallback reply for development when no OpenAI key is configured.
      const fallbackReply = `Demo AI (local): I don't have an OpenAI API key configured. You said: "${message}"`;
      try {
        await addChatMessage({ user_id, role: 'assistant', content: fallbackReply });
      } catch (e) {
        console.error('Failed to save fallback assistant message', e);
      }
      return res.json({ reply: fallbackReply });
    }

    // Store user message
    await addChatMessage({ user_id, role: 'user', content: message });

    // Prepare messages for OpenAI
    // Optionally, fetch recent chat history for context
    const history = await getChatsByUser(user_id, 20);
    const messages = history
      .map(h => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content }))
      .reverse();
    // Append latest user message
    messages.push({ role: 'user', content: message });

    // Call OpenAI chat completions
  const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages,
      max_tokens: 500
    });

    const reply = completion.choices && completion.choices[0] && completion.choices[0].message ? completion.choices[0].message.content : (completion.choices && completion.choices[0] && completion.choices[0].text) || '';

    // Store assistant reply
    await addChatMessage({ user_id, role: 'assistant', content: reply });

    res.json({ reply });
  } catch (err) {
    console.error('chat error', err);
    res.status(500).json({ error: 'Chat failed' });
  }
});

// Return recent chat history for a user
router.get('/chats', async (req, res) => {
  try {
    const userId = req.query.userId || req.query.user_id;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });
    const chats = await getChatsByUser(userId, 1000);
    res.json(chats);
  } catch (err) {
    console.error('get chats error', err);
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

// History endpoint: return last N messages for a user_id (query: userId, limit)
router.get('/history', async (req, res) => {
  try {
    const userId = req.query.userId || req.query.user_id;
    const limit = Number(req.query.limit || req.query.n || 100);
    if (!userId) return res.status(400).json({ error: 'Missing userId' });
    const chats = await getChatsByUser(userId, limit);
    res.json(chats);
  } catch (err) {
    console.error('history error', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// SSE streaming endpoint: GET /api/chat/stream?userId=1&message=Hello
router.get('/chat/stream', async (req, res) => {
  try {
    const userId = req.query.userId || req.query.user_id;
    const message = req.query.message;
  if (!userId || typeof message !== 'string' && typeof message !== 'number') return res.status(400).json({ error: 'Missing userId or message' });
  if (String(message).length === 0 || String(message).length > MAX_MESSAGE_LENGTH) return res.status(400).json({ error: `Message must be 1..${MAX_MESSAGE_LENGTH} characters` });

    if (!OPENAI_API_KEY) {
      // Simulated SSE stream fallback for local development
      const demo = `Demo AI (local): Response to "${String(message)}"`;
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no'
      });
      const tokens = demo.match(/\S+\s*/g) || [demo];
      let i = 0;
      const sendChunk = () => {
        if (i < tokens.length) {
          res.write(`data: ${JSON.stringify(tokens[i])}\n\n`);
          i++;
          setTimeout(sendChunk, 40);
        } else {
          // persist assistant reply
          (async () => {
            try { await addChatMessage({ user_id: userId, role: 'assistant', content: demo }); } catch (e) { console.error('save demo reply failed', e); }
          })();
          res.write('data: [DONE]\n\n');
          res.end();
        }
      };
      // start streaming
      sendChunk();
      return;
    }

    // Persist user message
    await addChatMessage({ user_id: userId, role: 'user', content: String(message) });

    // Build messages with recent history for context
    const history = await getChatsByUser(userId, 20);
    const messages = history
      .map(h => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content }))
      .reverse();
    messages.push({ role: 'user', content: String(message) });

    // Prepare OpenAI request
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
    const body = JSON.stringify({ model, messages, stream: true });

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body
    });

    if (!openaiRes.ok || !openaiRes.body) {
      const text = await openaiRes.text();
      console.error('OpenAI stream error', openaiRes.status, text);
      return res.status(502).json({ error: 'OpenAI stream error', details: text });
    }

    // Set SSE headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no'
    });

    // Stream parsing
    let assistantReply = '';
    let buffer = '';
    const stream = openaiRes.body;

    stream.on('data', (chunk) => {
      try {
        const str = chunk.toString('utf8');
        buffer += str;
        const parts = buffer.split(/\n\n/);
        buffer = parts.pop() || '';
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith('data:')) continue;
          const data = line.replace(/^data:\s*/, '').trim();
          if (data === '[DONE]') {
            // Finish
            // send done event
            res.write('data: [DONE]\n\n');
            // persist assistant reply
            (async () => {
              try { await addChatMessage({ user_id: userId, role: 'assistant', content: assistantReply }); } catch (e) { console.error('save assistant reply failed', e); }
            })();
            res.end();
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices && parsed.choices[0] && (parsed.choices[0].delta?.content || parsed.choices[0].delta?.role) ? parsed.choices[0].delta.content || '' : '';
            if (delta) {
              assistantReply += delta;
              // send token to client (stringified to be safe)
              res.write(`data: ${JSON.stringify(delta)}\n\n`);
            }
          } catch (err) {
            // ignore non-json chunks
          }
        }
      } catch (err) {
        console.error('stream parse error', err);
      }
    });

    stream.on('end', () => {
      // If stream ends without explicit [DONE], persist and close
      if (assistantReply) {
        addChatMessage({ user_id: userId, role: 'assistant', content: assistantReply }).catch(e => console.error('save reply on end failed', e));
      }
      try { res.write('data: [DONE]\n\n'); } catch (e) {}
      try { res.end(); } catch (e) {}
    });

    stream.on('error', (err) => {
      console.error('openai stream error', err);
      try { res.write('event: error\ndata: "stream error"\n\n'); } catch (e) {}
      try { res.end(); } catch (e) {}
    });

    // Keep the connection open
  } catch (err) {
    console.error('chat stream handler error', err);
    res.status(500).json({ error: 'Chat stream failed' });
  }
});

export default router;
