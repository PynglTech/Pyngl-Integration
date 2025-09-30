// // // import express from 'express';
// // // import dotenv from 'dotenv';
// // // import cors from 'cors';
// // // import mongoose from 'mongoose';
// // // import userRoutes from './routes/userRoutes.js';
// // // import pollRoutes from './routes/pollRoutes.js';
// // // import cookieParser from 'cookie-parser';
// // // import session from 'express-session';
// // // import linkedinRoutes from './routes/linkedinRoutes.js';
// // // import notificationRoutes from './routes/notificationRoutes.js'
// // // import https from 'https'; // Use the secure HTTPS module
// // // import fs from 'fs';      // Use the File System module
// // // import { Server } from 'socket.io'; // 2. Import the Socket.IO Server
// // // dotenv.config();

// // // const app = express();
// // // const PORT = process.env.PORT || 5000;

// // // const privateKey = fs.readFileSync('../key.pem', 'utf8');
// // // const certificate = fs.readFileSync('../cert.pem', 'utf8');
// // // const credentials = { key: privateKey, cert: certificate };
// // // const MONGO_URI = process.env.MONGO_URI;
// // // const server = https.createServer(credentials, app);
// // // const io = new Server(server, { // 4. Initialize Socket.IO with the server
// // //     cors: {
// // //         origin: ["https://localhost:5173", "https://192.168.1.12:5173"],
// // //         credentials: true
// // //     }
// // // });
// // // // --- Middleware Setup ---
// // // app.use(cors());
// // // app.use(cookieParser());
// // // app.use(express.json({ limit: '50mb' }));
// // // app.use(express.urlencoded({ limit: '50mb', extended: true }));
// // // app.use(session({
// // //     secret: process.env.SESSION_SECRET,
// // //     resave: false,
// // //     saveUninitialized: true,
// // //     cookie: { secure: false } // 'false' is correct for http development
// // // }));

// // // app.set('io', io);
// // // io.on('connection', (socket) => {
// // //     console.log('A user connected via WebSocket:', socket.id);

// // //     // When a user logs in, they join a "room" named after their user ID
// // //     socket.on('join', (userId) => {
// // //         console.log(`User ${userId} joined their notification room.`);
// // //         socket.join(userId);
// // //     });

// // //     socket.on('disconnect', () => {
// // //         console.log('User disconnected:', socket.id);
// // //     });
// // // });
// // // // --- Database Connection ---
// // // mongoose.connect(MONGO_URI)
// // //   .then(() => console.log('Connected to MongoDB'))
// // //   .catch((err) => console.log('Error connecting to MongoDB:', err));

// // // // --- API Routes ---
// // // app.use('/api/users', userRoutes);
// // // app.use('/api/polls', pollRoutes);
// // // app.use('/api/linkedin', linkedinRoutes);
// // // app.use('/api/notifications',notificationRoutes);
// // // // A simple route to confirm the server is running
// // // app.get('/', (req, res) => {
// // //   res.send('<h1>Server is listening</h1>');
// // // });

// // // server.listen(PORT, () => {
// // //   console.log(`✅ Secure server with real-time notifications is running on https://localhost:${PORT}`);
// // // });
// // import express from 'express';
// // import dotenv from 'dotenv';
// // import cors from 'cors';
// // import mongoose from 'mongoose';
// // import https from 'https'; // Use the secure HTTPS module
// // import fs from 'fs';      // Use the File System module to read certificate files
// // import { Server } from 'socket.io';
// // import userRoutes from './routes/userRoutes.js';
// // import pollRoutes from './routes/pollRoutes.js';
// // import notificationRoutes from './routes/notificationRoutes.js';
// // import cookieParser from 'cookie-parser';
// // import session from 'express-session';

// // dotenv.config();
// // const app = express();

// // // --- HTTPS and Socket.IO Server Setup ---
// // // Read the SSL certificate files from the parent directory
// // const privateKey = fs.readFileSync('../key.pem', 'utf8');
// // const certificate = fs.readFileSync('../cert.pem', 'utf8');
// // const credentials = { key: privateKey, cert: certificate };

// // // Create a secure HTTPS server from your Express app
// // const server = https.createServer(credentials, app);

// // // Initialize Socket.IO with the HTTPS server and configure CORS
// // const io = new Server(server, {
// //     cors: {
// //         origin: ["http://localhost:5173", "https://192.168.1.12:5173"],
// //         credentials: true
// //     }
// // });

// // const PORT = process.env.PORT || 5000;
// // const MONGO_URI = process.env.MONGO_URI;

// // // --- Middleware Setup ---
// // const corsOptions = { 
// //     origin: ['http://localhost:5173', 'https://192.168.1.12:5173'],
// //     credentials: true
// // };
// // app.use(cors(corsOptions));
// // app.use(cookieParser());
// // app.use(express.json({ limit: '50mb' }));
// // app.use(express.urlencoded({ limit: '50mb', extended: true }));
// // app.use(session({
// //     secret: process.env.SESSION_SECRET || 'a_very_secret_key',
// //     resave: false,
// //     saveUninitialized: true,
// //     cookie: { secure: false } 
// // }));

// // // Make Socket.IO globally accessible to controllers
// // app.set('io', io);

// // // --- Real-time Connection Handling ---
// // io.on('connection', (socket) => {
// //     console.log('A user connected via WebSocket:', socket.id);
// //     socket.on('join', (userId) => {
// //         console.log(`User ${userId} joined their notification room.`);
// //         socket.join(userId);
// //     });
// //     socket.on('disconnect', () => {
// //         console.log('User disconnected:', socket.id);
// //     });
// // });

// // // --- Database Connection ---
// // mongoose.connect(MONGO_URI)
// //   .then(() => console.log('Connected to MongoDB'))
// //   .catch((err) => console.log('Error connecting to MongoDB:', err));

// // // --- API Routes ---
// // app.use('/api/users', userRoutes);
// // app.use('/api/polls', pollRoutes);
// // app.use('/api/notifications', notificationRoutes);

// // app.get('/', (req, res) => {
// //   res.send('<h1>Server is listening</h1>');
// // });

// // // --- Start the Secure Server ---
// // server.listen(PORT, () => {
// //   console.log(`✅ Secure server with real-time notifications is running on https://localhost:${PORT}`);
// // });

// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import https from 'https'; // Use the secure HTTPS module
// import fs from 'fs';      // Use the File System module to read certificate files
// import { Server } from 'socket.io';
// import userRoutes from './routes/userRoutes.js';
// import pollRoutes from './routes/pollRoutes.js';
// import uploadRoutes from './routes/uploadRoutes.js';
// import notificationRoutes from './routes/notificationRoutes.js';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import initScheduledJobs from './utils/scheduler.js';
// import linkedinRoutes from './routes/linkedinRoutes.js';
// import passport from 'passport'; // 1. Import passport
// import './config/passport-setup.js'; // 2. This line runs the config file!
// dotenv.config();
// const app = express();

// // --- HTTPS and Socket.IO Server Setup ---
// const privateKey = fs.readFileSync('../key.pem', 'utf8');
// const certificate = fs.readFileSync('../cert.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// const server = https.createServer(credentials, app);

// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:5173", "https://192.168.1.17:5173", "https:localhost:5173"],
//         credentials: true
//     }
// });

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI;

// // --- Middleware Setup ---
// const corsOptions = { 
//     origin: 'https://192.168.1.12:5173',
//     credentials: true
// };
// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'a_very_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } 
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.set('io', io);

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
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.log('Error connecting to MongoDB:', err));

// // --- API Routes ---
// app.use('/api/users', userRoutes);
// app.use('/api/polls', pollRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/upload', uploadRoutes);
// app.get('/', (req, res) => {
//   res.send('<h1>Server is listening</h1>');
// });

// // --- Start the Secure Server ---
// server.listen(PORT, () => {
//   console.log(`✅ Secure server with real-time notifications is running on https://localhost:${PORT}`);
//   initScheduledJobs(io);
// });
import express from 'express';
import dotenv from 'dotenv';
import path from 'path'; // Import path for robust .env loading
import { fileURLToPath } from 'url'; // Import for robust .env loading
import cors from 'cors';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
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
import googleRoutes from './routes/googleRoutes.js'; // ADDED: The missing Google route
// Utility Imports
import initScheduledJobs from './utils/scheduler.js';
import './config/passport-setup.js'; // This line runs the passport config

// --- FIX: Explicitly load the .env file to prevent errors ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();

// --- HTTPS and Socket.IO Server Setup ---
// CORRECTED: Using your file path for the certificates
const privateKey = fs.readFileSync(path.resolve(__dirname, '../key.pem'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, '../cert.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, app);

// MERGED: Combining all origins for flexibility
const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://localhost:5173",
    "https://192.168.1.17:5173"
];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- Middleware Setup ---
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_default_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } 
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('io', io);

// --- Real-time Connection Handling ---
io.on('connection', (socket) => {
    console.log('A user connected via WebSocket:', socket.id);
    socket.on('join', (userId) => {
        console.log(`User ${userId} joined their notification room.`);
        socket.join(userId);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// --- Database Connection ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.log('❌ Error connecting to MongoDB:', err));

// --- API Routes ---
app.use('/api/users', userRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/linkedin', linkedinRoutes); // ADDED: The missing LinkedIn route
app.use('/api/upload', uploadRoutes);
app.use("/auth", googleRoutes);
app.get('/', (req, res) => {
  res.send('<h1>Pyngl Server is running securely!</h1>');
});

// --- Start the Secure Server ---
server.listen(PORT, () => {
  console.log(`✅ Secure server with real-time notifications is running on https://localhost:${PORT}`);
  initScheduledJobs(io);
});