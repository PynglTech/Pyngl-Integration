import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

// Route Imports
import userRoutes from './routes/userRoutes.js';
import pollRoutes from './routes/pollRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import linkedinRoutes from './routes/linkedinRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import googleRoutes from './routes/googleRoutes.js';

// Utility Imports
import initScheduledJobs from './utils/scheduler.js';
import './config/passport-setup.js';

// --- Load .env ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- CORS Setup ---
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://192.168.1.17:5173"
];

app.use(cors({ origin: allowedOrigins, credentials: true }));

// --- Middleware ---
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_default_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // HTTP only
}));
app.use(passport.initialize());
app.use(passport.session());

// --- Database Connection ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.log('❌ Error connecting to MongoDB:', err));

// --- Socket.IO (HTTP) ---
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  initScheduledJobs(io); // Scheduler can still use IO
});

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

app.set('io', io);

// --- Real-time WebSocket handling ---
io.on('connection', (socket) => {
  console.log('A user connected via WebSocket:', socket.id);
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their notification room.`);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// --- API Routes ---
app.use('/api/users', userRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/linkedin', linkedinRoutes);
app.use('/api/upload', uploadRoutes);
app.use("/auth", googleRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Pyngl Server is running on HTTP!</h1>');
});
