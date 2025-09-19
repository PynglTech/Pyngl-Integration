import express from 'express';
import multer from 'multer';
import { upload } from '../config/cloudinary.js'; 
import { 
    createPoll, 
    voteOnPoll, 
    getAllPolls, 
    getLivePolls, 
    getPollById, 
    getMyPolls, 
    getParticipatedPolls,
    generateImage,
    uploadImage
} from '../controllers/pollController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Public Routes ---
router.get('/all', getAllPolls);
router.get('/live', getLivePolls);
router.post('/generate-image', generateImage);

// --- Protected Routes ---
router.post('/create-poll', protect, createPoll);
router.post('/:pollId/vote', protect, voteOnPoll);

// --- IMPORTANT: Specific routes must come BEFORE the dynamic /:pollId route ---
router.get('/my-polls', protect, getMyPolls);
router.get('/participated-polls', protect, getParticipatedPolls);

// Dynamic /:pollId route is LAST, so it doesn't mistakenly catch the routes above
router.get('/:pollId', protect, getPollById); 
router.post('/upload-image', protect, upload.single('image'), uploadImage);

export default router;

