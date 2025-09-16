import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import pollRoutes from './routes/pollRoutes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- Middleware Setup ---

// // 1. Enable CORS with more specific options for better compatibility.
// app.use(cors({
//   origin: '*', // Allow all origins
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// }));
const corsOptions = { 
    origin: [
        'http://localhost:5173', // Removed trailing slash for consistency
        'http://192.168.1.4:5173' // Removed trailing slash
    ],
    credentials: true // <-- FIX: Changed 'Credential' to 'credentials'
};

app.use(cors(corsOptions));
app.use(cookieParser());
// 2. Enable the body parser to read JSON from requests.
// Increase the limit for JSON payloads and URL-encoded data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- Database Connection ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// --- API Routes ---

// The main route for all user-related API calls.
app.use('/api/users', userRoutes);
app.use('/api/polls', pollRoutes);

// A simple route to confirm the server is running
app.get('/', (req, res) => {
  res.send('<h1>Server is listening</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

