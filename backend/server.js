
// import express from 'express';
// import dotenv from 'dotenv';
// import path from 'path'; // Import path for robust .env loading
// import { fileURLToPath } from 'url'; // Import for robust .env loading
// import cors from 'cors';
// import mongoose from 'mongoose';
// import https from 'https';
// import fs from 'fs';
// import { Server } from 'socket.io';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import passport from 'passport';
// import compression from 'compression';
// // Route Imports
// import userRoutes from './routes/userRoutes.js';
// import pollRoutes from './routes/pollRoutes.js';
// import notificationRoutes from './routes/notificationRoutes.js';
// import linkedinRoutes from './routes/linkedinRoutes.js';
// import uploadRoutes from './routes/uploadRoutes.js';
// import googleRoutes from './routes/googleRoutes.js'; // ADDED: The missing Google route
// // Utility Imports
// import initScheduledJobs from './utils/scheduler.js';
// import './config/passport-setup.js'; // This line runs the passport config
// import { schedulePollNotifications } from './jobs/pollScheduler.js'; // ADDED: Import the poll scheduler job
// // --- FIX: Explicitly load the .env file to prevent errors ---
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config({ path: path.resolve(__dirname, './.env') });

// const app = express();
// app.use(compression()); 
// // --- HTTPS and Socket.IO Server Setup ---
// // CORRECTED: Using your file path for the certificates
// const privateKey = fs.readFileSync(path.resolve(__dirname, '../key.pem'), 'utf8');
// const certificate = fs.readFileSync(path.resolve(__dirname, '../cert.pem'), 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// const server = https.createServer(credentials, app);

// const PORT = process.env.PORT || 5000;

// // const server = app.listen(PORT, () => {
// //   console.log(`✅ Server running on http://localhost:${PORT}`);
// //   initScheduledJobs(io); // Scheduler can still use IO
// // });

// // MERGED: Combining all origins for flexibility
// const allowedOrigins = [
//     process.env.FRONTEND_URL,
//     "https://localhost:5173",
//     "https://192.168.1.7:5173"
// ];

// const io = new Server(server, {
//     cors: {
//         origin: allowedOrigins,
//         credentials: true
//     }
// });

// const MONGO_URI = process.env.MONGO_URI;

// // --- Middleware Setup ---
// app.use(cors({ origin: allowedOrigins, credentials: true }));
// app.use(cookieParser());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'your_default_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: process.env.NODE_ENV === 'production' } 
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.set('trust proxy', 1);
// app.set('io', io);
// schedulePollNotifications();
// // --- Real-time Connection Handling ---
// io.on('connection', (socket) => {
//     console.log('A user connected via WebSocket:', socket.id);
//     socket.on('join', (userId) => {
//         console.log(`User ${userId} joined their notification room.`);
//         socket.join(userId);
//     });
//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });

// // --- Database Connection ---
// mongoose.connect(MONGO_URI)
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch((err) => console.log('❌ Error connecting to MongoDB:', err));

// // --- API Routes ---
// app.use('/api/users', userRoutes);
// app.use('/api/polls', pollRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/linkedin', linkedinRoutes); // ADDED: The missing LinkedIn route
// app.use('/api/upload', uploadRoutes);
// app.use("/auth", googleRoutes);
// app.get('/', (req, res) => {
//   res.send('<h1>Pyngl Server is running securely!</h1>');
// });

// // --- Start the Secure Server ---
// server.listen(PORT, () => {
//   console.log(`✅ Secure server with real-time notifications is running on https://localhost:${PORT}`);
//   initScheduledJobs(io);
// });



import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import compression from "compression";

// --- Route Imports ---
import userRoutes from "./routes/userRoutes.js";
import pollRoutes from "./routes/pollRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import linkedinRoutes from "./routes/linkedinRoutes.js";
import telegramRoutes from "./routes/telegramROutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import googleRoutes from "./routes/googleRoutes.js";
import whatsappRoutes from "./routes/whastsappRoutes.js";
// import firebaseAuthRoutes from "./routes/firebaseAuthRoute.js";
// --- Utility Imports ---
import initScheduledJobs from "./utils/scheduler.js";
import "./config/passport-setup.js";
import { schedulePollNotifications } from "./jobs/pollScheduler.js";

// --- Environment Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./.env") });

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// --- ⚙️ Trust Proxy (critical for HTTPS cookies on Render) ---
app.set("trust proxy", 1);

// --- Compression ---
app.use(compression());

// --- Allowed Origins ---
const allowedOrigins = [
  process.env.FRONTEND_URL, // from .env (e.g. https://www.pyngl.com)
  "https://www.pyngl.com",
  "https://pyngl.com",
  "http://localhost:5173",
  "http://192.168.1.18:5173",
];

// --- CORS Middleware ---
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ CORS Blocked Origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// --- Preflight for all routes ---
app.options(/.*/, cors());

// --- Body Parsing & Cookies ---
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// --- Session Config (used by Passport & OAuth) ---
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // ✅ required for HTTPS cookies
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ allows cross-origin cookies
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

// --- Passport Setup ---
app.use(passport.initialize());
app.use(passport.session());

// --- Socket.io Setup ---
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});
app.set("io", io);

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);
  socket.on("join", (userId) => {
    console.log(`📨 User ${userId} joined notifications room.`);
    socket.join(userId);
  });
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// --- API Routes ---
app.use("/api/users", userRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/linkedin", linkedinRoutes);
app.use("/api/telegram", telegramRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/auth", googleRoutes);
app.use("/api/whatsapp", whatsappRoutes);
// --- Health Check Root ---
app.get("/", (req, res) => {
  res.send("<h1>✅ Pyngl API is Live at api.pyngl.com</h1>");
});

// --- Global 404 Handler (for API routes) ---
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// --- Scheduled Jobs ---
schedulePollNotifications();
initScheduledJobs(io);

// --- Start Server ---
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
