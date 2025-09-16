<<<<<<< HEAD
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

=======
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

// Stability AI API endpoint
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const response = await axios.post(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    // Convert Base64 → data URL
    const imageBase64 = response.data.artifacts[0].base64;
    const imageUrl = `data:image/png;base64,${imageBase64}`;

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate image. Check server logs." });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
>>>>>>> 4fe30c399ae6aa4d67a5aaefa7a5e74a94422533
