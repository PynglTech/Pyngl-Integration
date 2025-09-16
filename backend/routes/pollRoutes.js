// // routes/pollRoutes.js

// import express from 'express';
// const router = express.Router();

// // Import the controller functions
// import { generateImage, createPoll, getLivePolls , getPollById, voteOnPoll, getAllPolls,getMyPolls,getParticipatedPolls } from '../controllers/pollController.js';

// // Define the routes
// // POST /api/polls/generate-image
// router.post('/generate-image', generateImage);
// router.get('/all', getAllPolls);
// // POST /api/polls/create-poll
// router.post('/create-poll', createPoll); // You can add your auth middleware here later
// // GET /api/polls/live
// router.get('/live', getLivePolls);
// // GET /api/polls/:pollId
// router.get('/:pollId', getPollById);

// // POST /api/polls/:pollId/vote
// router.post('/:pollId/vote', voteOnPoll);
// // routes/pollRoutes.js
// router.get("/my-polls", getMyPolls);
// router.get("/participated-polls", getParticipatedPolls);


// export default router;
import express from 'express';
import { 
    createPoll, 
    voteOnPoll, 
    getAllPolls, 
    getLivePolls, 
    getPollById, 
    getMyPolls, 
    getParticipatedPolls,
    generateImage
} from '../controllers/pollController.js';
import { protect } from '../middleware/authMiddleware.js'; // 1. Import the middleware

const router = express.Router();

// Public routes (anyone can access these)
router.get('/all', getAllPolls);
router.get('/live', getLivePolls);
router.get('/:pollId', getPollById);
router.post('/generate-image', generateImage);

// --- Protected Routes ---
// The 'protect' middleware will run BEFORE the controller function.
// It will check for a valid login token and set req.user.
router.post('/create-poll', protect, createPoll);
router.post('/:pollId/vote', protect, voteOnPoll);
router.get('/my-polls', protect, getMyPolls); // Example for a new route
router.get('/participated', protect, getParticipatedPolls); // Example for a new route

export default router;