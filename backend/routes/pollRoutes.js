// import express from 'express';
// import multer from 'multer';
// import { upload } from '../config/cloudinary.js'; 
// import { 
//     createPoll, 
//     voteOnPoll, 
//     getAllPolls, 
//     getLivePolls, 
//     getPollById, 
//     getMyPolls, 
//     getParticipatedPolls,
//     generateImage,
//     uploadImage,
//     generatePollCard ,
//     generateShareableImage
// } from '../controllers/pollController.js';
// import { protect, checkAuth } from '../middleware/authMiddleware.js';

// const router = express.Router();

// // --- Public Routes ---
// router.get('/all', getAllPolls);
// router.get('/live', getLivePolls);
// router.post('/generate-image', generateImage);
// router.get('/:pollId/generate-card', generatePollCard);
// // --- Protected Routes ---
// router.post('/create-poll', protect, createPoll);
// router.post('/:pollId/vote', checkAuth, voteOnPoll); 

// // --- IMPORTANT: Specific routes must come BEFORE the dynamic /:pollId route ---
// router.get('/my-polls', protect, getMyPolls);
// router.get('/participated-polls', protect, getParticipatedPolls);
// router.get('/:pollId/share-image', protect, generateShareableImage);
// // Dynamic /:pollId route is LAST, so it doesn't mistakenly catch the routes above
// router.get('/:pollId', checkAuth, getPollById); 
// router.post('/upload-image', protect, upload.single('image'), uploadImage);

// export default router;

import express from 'express';
import { upload } from '../config/cloudinary.js';
import Poll from '../models/Poll.js'; // NEW: Imported for the preview route

// MERGED: Importing all necessary controllers from both files
import {
    createPoll,
    voteOnPoll,
    getAllPolls,
    getLivePolls,
    getPollById,
    getMyPolls,
    getParticipatedPolls,
    generateImage,
    uploadImage,
    generatePollCard,
    generateShareableImage,
    getTrendingPolls,      // New from teammate
    addSharedPlatform,     // New from teammate
    getPollAnalytics,      // New from teammate
    sendGmailPoll,         // New from teammate (renamed for clarity)
    voteFromGmail,         // New from teammate (renamed for clarity)
} from '../controllers/pollController.js';

import { protect, checkAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/*
 * ========================================
 * PUBLIC ROUTES (No Authentication Needed)
 * ========================================
 */
router.get('/all', getAllPolls);
router.get('/live', getLivePolls);

router.post('/generate-image', generateImage);

/*
 * =============================================================================
 * NEW: Social Media Preview Route (Crucial for Open Graph Cards)
 * This must be a public route so that crawlers (from Twitter, Facebook, etc.)
 * can access it to generate link previews.
 * =============================================================================
 */
router.get('/:id/preview', async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);
        if (!poll) {
            return res.status(404).send("Poll not found");
        }

        const platform = req.query.platform || "twitter";
        const imageUrl = poll.previewImages?.[platform] || poll.imageUrl || 'YOUR_DEFAULT_IMAGE_URL';
        
        // Define metadata for different platforms
        const platformData = {
            twitter: { title: "🗳️ Vote on this Twitter Poll!", description: `What do you think? ${poll.question}`, width: 1200, height: 628 },
            linkedin: { title: "📈 Professional Poll - Your Opinion Matters", description: `Share your professional insight: ${poll.question}`, width: 1200, height: 627 },
            facebook: { title: "👥 Community Poll - Make Your Voice Heard", description: `Join our community discussion: ${poll.question}`, width: 1200, height: 630 },
            default: { title: "📊 Have Your Say in this Poll!", description: `Join the conversation: ${poll.question}`, width: 1200, height: 630 }
        };

        const currentPlatform = platformData[platform] || platformData.default;
        const pollUrl = `${process.env.FRONTEND_URL}/poll/${poll._id}`;

        // Dynamically build meta tags
        const metaTags = `
            <meta property="og:type" content="article" />
            <meta property="og:title" content="${currentPlatform.title}" />
            <meta property="og:description" content="${currentPlatform.description}" />
            <meta property="og:url" content="${pollUrl}" />
            <meta property="og:site_name" content="Pyngl" />
            <meta property="og:image" content="${imageUrl}" />
            <meta property="og:image:width" content="${currentPlatform.width}" />
            <meta property="og:image:height" content="${currentPlatform.height}" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="${currentPlatform.title}" />
            <meta name="twitter:description" content="${currentPlatform.description}" />
            <meta name="twitter:image" content="${imageUrl}" />
        `;

        // Send HTML response with meta tags and a redirect
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <title>${currentPlatform.title}</title>
                ${metaTags}
                <meta http-equiv="refresh" content="0; url=${pollUrl}" />
            </head>
            <body>
                <p>Redirecting you to the poll...</p>
            </body>
            </html>
        `);
    } catch (err) {
        console.error('Preview generation error:', err);
        res.status(500).send("Error generating poll preview.");
    }
});


/*
 * ==========================================================
 * GMAIL AMP POLLS (Publicly accessible by Google's servers)
 * ==========================================================
 */
router.post('/send-gmail-poll', protect, sendGmailPoll); // Sending is protected
router.post('/vote-from-gmail', voteFromGmail); // Voting from email is public

/*
 * ========================================
 * PROTECTED ROUTES (Authentication Required)
 * ========================================
 */
router.post('/create-poll', protect, createPoll);
router.post('/upload-image', protect, upload.single('image'), uploadImage);
router.get('/my-polls', protect, getMyPolls);
router.get('/participated-polls', protect, getParticipatedPolls);
router.get('/:pollId/share-image', protect, generateShareableImage);
router.get('/trending', protect, getTrendingPolls);
router.get('/:pollId/generate-card', protect, generatePollCard);
router.post('/:pollId/share', protect, addSharedPlatform);
router.get('/:pollId/analytics', protect, getPollAnalytics); // NEW: For poll analytics page

/*
 * =============================================================
 * HYBRID ROUTE (Works for both logged-in and anonymous users)
 * `checkAuth` middleware will attach `req.user` if logged in,
 * but won't block the request if they are not.
 * =============================================================
 */
router.post('/:pollId/vote', checkAuth, voteOnPoll);

/*
 * =======================================================================
 * DYNAMIC ID ROUTES (MUST BE LAST to avoid overriding specific routes)
 * =======================================================================
 */
router.get('/:pollId', checkAuth, getPollById);

export default router;