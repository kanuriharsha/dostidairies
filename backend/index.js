require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs'); // Re-added for login comparison
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit for large images

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0.fuhswij.mongodb.net/';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const PORT = process.env.PORT || 4001; // changed default to 4001

// CORS_ORIGINS: comma separated list, e.g. "http://localhost:5173,https://your-frontend.vercel.app"
const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
console.log('Allowed CORS origins:', allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (e.g., curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

let db;
let usersCol;
let storiesCol;
let likesCol;

async function start() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db('dostidairies');
  usersCol = db.collection('users');
  storiesCol = db.collection('dostidairies');
  likesCol = db.collection('story_likes');

  // Ensure indexes
  await usersCol.createIndex({ email: 1 }, { unique: true });
  await storiesCol.createIndex({ created_at: -1 });
  await likesCol.createIndex({ story_id: 1, user_id: 1 }, { unique: true });

  app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
}

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

app.post('/api/signup', async (req, res) => {
  const { email, password, full_name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    // NOTE: storing plain-text passwords is insecure. Per request, we store the password directly.
    const now = new Date().toISOString();
    const user = { email, password, full_name, created_at: now };
    const r = await usersCol.insertOne(user);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Signup error:', err && err.message ? err.message : err);
    // Handle duplicate email (unique index) more clearly
    if (err && err.code === 11000) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    return res.status(400).json({ message: err && err.message ? err.message : 'User creation failed' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  const user = await usersCol.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  // Per request: compare plain-text passwords directly
  if (user.password !== password) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: '30d' });
  return res.json({ token, user: { id: user._id.toString(), email: user.email, full_name: user.full_name, created_at: user.created_at } });
});

app.get('/api/me', authMiddleware, async (req, res) => {
  const uid = req.user?.id;
  if (!uid) return res.status(401).json({ message: 'Unauthorized' });
  const user = await usersCol.findOne({ _id: new ObjectId(uid) }, { projection: { password: 0 } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({ user: { id: user._id.toString(), email: user.email, full_name: user.full_name, created_at: user.created_at } });
});

// List stories
app.get('/api/stories', async (req, res) => {
  const { limit, sort, featured, author_id } = req.query;
  const q = {};
  if (featured === 'true') q.is_featured = true;
  if (author_id) q.author_id = String(author_id);

  const cursor = storiesCol.find(q);

  if (sort === 'popular') cursor.sort({ likes: -1 });
  else cursor.sort({ created_at: -1 });

  if (limit) cursor.limit(Number(limit));

  const stories = await cursor.toArray();
  const mapped = stories.map((s) => ({
    id: s._id.toString(),
    author_id: s.author_id,
    author_name: s.author_name,
    title: s.title,
    content: s.content,
    category: s.category,
    is_featured: !!s.is_featured,
    views: s.views || 0,
    likes: s.likes || 0,
    created_at: s.created_at,
    updated_at: s.updated_at,
    image: s.image || null, // Include image in response
  }));
  res.json({ stories: mapped });
});

// Create story
app.post('/api/stories', authMiddleware, async (req, res) => {
  const { author_id, author_name, title, content, category, image } = req.body;
  if (!author_id || !author_name || !title || !content) return res.status(400).json({ message: 'Missing fields' });
  const now = new Date().toISOString();
  const doc = {
    author_id,
    author_name,
    title,
    content,
    category,
    is_featured: false,
    views: 0,
    likes: 0,
    created_at: now,
    updated_at: now,
    image: image || null, // Store image if provided
  };
  const r = await storiesCol.insertOne(doc);
  res.json({ ok: true, id: r.insertedId.toString() });
});

// Delete story
app.delete('/api/stories/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const uid = req.user?.id;
  const story = await storiesCol.findOne({ _id: new ObjectId(id) });
  if (!story) return res.status(404).json({ message: 'Not found' });
  if (story.author_id !== uid) return res.status(403).json({ message: 'Forbidden' });
  await storiesCol.deleteOne({ _id: new ObjectId(id) });
  await likesCol.deleteMany({ story_id: id });
  res.json({ ok: true });
});

// increment views
app.patch('/api/stories/:id/views', async (req, res) => {
  const { id } = req.params;
  await storiesCol.updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } });
  res.json({ ok: true });
});

// like status
app.get('/api/stories/:id/liked', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const uid = req.user?.id;
  const like = await likesCol.findOne({ story_id: id, user_id: uid });
  res.json({ liked: !!like });
});

// like
app.post('/api/stories/:id/like', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const uid = req.user?.id;
  try {
    await likesCol.insertOne({ story_id: id, user_id: uid });
    await storiesCol.updateOne({ _id: new ObjectId(id) }, { $inc: { likes: 1 } });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({ message: 'Already liked or error' });
  }
});

// unlike
app.delete('/api/stories/:id/like', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const uid = req.user?.id;
  await likesCol.deleteOne({ story_id: id, user_id: uid });
  await storiesCol.updateOne({ _id: new ObjectId(id) }, { $inc: { likes: -1 } });
  res.json({ ok: true });
});

start().catch((err) => {
  console.error('Failed to start backend', err);
  process.exit(1);
});

// Global error handlers to make sure the server returns JSON errors
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection at:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
  // It's safer to exit on uncaught exceptions in Node; the process manager (Render) can restart.
  process.exit(1);
});

// Express error handler — ensures any thrown errors return JSON instead of HTML
app.use((err, req, res, next) => {
  console.error('Express error handler caught:', err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  const status = err && err.status ? err.status : 500;
  res.status(status).json({ message: err && err.message ? err.message : 'Internal Server Error' });
});
