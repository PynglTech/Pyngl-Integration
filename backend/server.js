import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import pollRoutes from './routes/pollRoutes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import linkedinRoutes from './routes/linkedinRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- Middleware Setup ---
const corsOptions = { 
    origin: [
        'http://localhost:5173',
        'http://192.168.1.4:5173'
    ],
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // 'false' is correct for http development
}));
// --- Database Connection ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// --- API Routes ---
app.use('/api/users', userRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/linkedin', linkedinRoutes);
// A simple route to confirm the server is running
app.get('/', (req, res) => {
  res.send('<h1>Server is listening</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});