// import express from 'express';
// import multer from 'multer';
// import { 
//     getAuthStatus, 
//     redirectToLinkedInAuth, 
//     handleLinkedInCallback, 
//     publishCampaign,
//     publishTextPoll,
//     publishSimplePost,
//     logout
// } from '../controllers/linkedinController.js';
// import { protect } from '../middleware/authMiddleware.js';

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });


// // --- CORRECTED ROUTES ---

// // All auth-related routes are now prefixed with /auth
// router.get('/status', protect, getAuthStatus); // <-- FIX IS HERE
// router.get('/auth/status', protect, getAuthStatus); // <-- FIX IS HERE

// router.get('/auth', protect, redirectToLinkedInAuth);
// router.get('/auth/callback', handleLinkedInCallback);
// router.post('/auth/logout', protect, logout);

// // Publishing route
// router.post('/publish', protect, upload.single('bannerImage'), publishSimplePost);

// export default router;

import express from 'express';
import multer from 'multer';
import { 
    getAuthStatus, 
    redirectToLinkedInAuth, 
    publishNativePoll ,
    handleLinkedInCallback,
    publishSimplePost, // Use the simplified controller for text polls
    logout
} from '../controllers/linkedinController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// --- AUTHENTICATION ROUTES ---
router.get('/auth/status', protect, getAuthStatus);
router.get('/auth', protect, redirectToLinkedInAuth);
router.get('/auth/callback', handleLinkedInCallback);
router.post('/auth/logout', protect, logout);

// --- PUBLISHING ROUTE ---
// This is the route your frontend is looking for
router.post('/publish-poll', protect, publishNativePoll);

export default router;