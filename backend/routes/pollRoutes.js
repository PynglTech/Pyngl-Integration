// import express from 'express';
// import { upload } from '../config/cloudinary.js';
// import Poll from '../models/Poll.js'; // NEW: Imported for the preview route
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
//     generatePollCard,
//     generateShareableImage,
//     getTrendingPolls,      
//     addSharedPlatform,     
//     getPollAnalytics,      
//     sendGmailPoll,         
//     voteFromGmail,     
//     testWhatsappMessage,
//     getLast5Polls,
//     resultsPoll,
//     applyPollFilter
// } from '../controllers/pollController.js';
// import { protect, checkAuth } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.get('/all', getAllPolls);
// router.get('/live', getLivePolls);
// router.post('/generate-image', generateImage);
// router.get('/:id/preview', async (req, res) => {
//     try {
//         const poll = await Poll.findById(req.params.id);
//         if (!poll) {
//             return res.status(404).send("Poll not found");
//         }
//         const platform = req.query.platform || "twitter";
//         const imageUrl = poll.previewImages?.[platform] || poll.imageUrl || 'YOUR_DEFAULT_IMAGE_URL';
//         // Define metadata for different platforms
//         const platformData = {
//             twitter: { title: " Vote on this Twitter Poll!", description: `What do you think? ${poll.question}`, width: 1200, height: 628 },
//             linkedin: { title: "Professional Poll - Your Opinion Matters", description: `Share your professional insight: ${poll.question}`, width: 1200, height: 627 },
//             facebook: { title: "Community Poll - Make Your Voice Heard", description: `Join our community discussion: ${poll.question}`, width: 1200, height: 630 },
//             default: { title: "Have Your Say in this Poll!", description: `Join the conversation: ${poll.question}`, width: 1200, height: 630 }
//         };
//         const currentPlatform = platformData[platform] || platformData.default;
//         const pollUrl = `${process.env.FRONTEND_URL}/poll/${poll._id}`;

//         // Dynamically build meta tags
//         const metaTags = `
//             <meta property="og:type" content="article" />
//             <meta property="og:title" content="${currentPlatform.title}" />
//             <meta property="og:description" content="${currentPlatform.description}" />
//             <meta property="og:url" content="${pollUrl}" />
//             <meta property="og:site_name" content="Pyngl" />
//             <meta property="og:image" content="${imageUrl}" />
//             <meta property="og:image:width" content="${currentPlatform.width}" />
//             <meta property="og:image:height" content="${currentPlatform.height}" />
//             <meta name="twitter:card" content="summary_large_image" />
//             <meta name="twitter:title" content="${currentPlatform.title}" />
//             <meta name="twitter:description" content="${currentPlatform.description}" />
//             <meta name="twitter:image" content="${imageUrl}" />
//         `;

//         // Send HTML response with meta tags and a redirect
//         res.send(`
//             <!DOCTYPE html>
//             <html lang="en">
//             <head>
//                 <meta charset="UTF-8" />
//                 <title>${currentPlatform.title}</title>
//                 ${metaTags}
//                 <meta http-equiv="refresh" content="0; url=${pollUrl}" />
//             </head>
//             <body>
//                 <p>Redirecting you to the poll...</p>
//             </body>
//             </html>
//         `);
//     } catch (err) {
//         console.error('Preview generation error:', err);
//         res.status(500).send("Error generating poll preview.");
//     }
// });
// /*
//  * ==========================================================
//  * GMAIL AMP POLLS (Publicly accessible by Google's servers)
//  * ==========================================================
//  */
// router.post('/send-gmail-poll', protect, sendGmailPoll); // Sending is protected
// router.post('/vote-from-gmail', voteFromGmail); // Voting from email is public

// /*
//  * ========================================
//  * PROTECTED ROUTES (Authentication Required)
//  * ========================================
//  */
// router.post('/create-poll', protect, createPoll);
// router.post('/upload-image', protect, upload.single('image'), uploadImage);
// router.get('/my-polls', protect, getMyPolls);
// router.get('/participated-polls', protect, getParticipatedPolls);
// router.get('/:pollId/share-image', protect, generateShareableImage);
// router.get('/trending', protect, getTrendingPolls);
// router.get('/:pollId/generate-card', protect, generatePollCard);
// router.post('/:pollId/share', protect, addSharedPlatform);
// router.get('/:pollId/analytics', protect, getPollAnalytics); // NEW: For poll analytics page
// router.post('/test-whatsapp', protect, testWhatsappMessage); 
// /*
//  * =============================================================
//  * HYBRID ROUTE (Works for both logged-in and anonymous users)
//  * `checkAuth` middleware will attach `req.user` if logged in,
//  * but won't block the request if they are not.
//  * =============================================================
//  */
// router.post('/:pollId/vote', checkAuth, voteOnPoll);
// /*
//  * =======================================================================
//  * DYNAMIC ID ROUTES (MUST BE LAST to avoid overriding specific routes)
//  * =======================================================================
//  */
// router.get('/:pollId', checkAuth, getPollById);
// export default router;
import express from 'express';
import { upload } from '../config/cloudinary.js';
import Poll from '../models/Poll.js';
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
    getTrendingPolls,
    addSharedPlatform,
    getPollAnalytics,
    sendPoll as sendGmailPoll,
    votePoll as voteFromGmail,
    testWhatsappMessage,
    getLast5Polls,
    applyPollFilter
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
router.post('/generate-image', generateImage); // Kept as public assuming it might be a general tool

// NEW: Advanced Social Media Preview Route from friend's code
 router.get('/:id/preview', async (req, res) => {
    try {
      // 1. Fetch Poll (This is the unavoidable latency)
      const poll = await Poll.findById(req.params.id);
      if (!poll) {
        return res.status(404).send("Poll not found");
      }

      const platform = req.query.platform || "twitter";
      const imageUrl = poll.previewImages?.[platform] || poll.imageUrl;
      
      // --- Define Metadata and Image Dimensions ---
      const platformData = {
          // NOTE: These dimensions are for the META TAGS, not the actual image size in CSS.
          instagram: { title: "📊 Vote on this Instagram Poll!", description: `Join the conversation: ${poll.question}`, width: 1080, height: 1920 },
          twitter: { title: "🗳️ Vote on this Twitter Poll!", description: `What do you think? ${poll.question}`, width: 1200, height: 628 },
          linkedin: { title: "📈 Professional Poll - Your Opinion Matters", description: `Share your professional insight: ${poll.question}`, width: 1200, height: 627 },
          facebook: { title: "👥 Community Poll - Make Your Voice Heard", description: `Join our community discussion: ${poll.question}`, width: 1200, height: 630 },
          whatsapp: { title: "💬 Poll Shared via WhatsApp", description: `Vote and share your opinion: ${poll.question}`, width: 1200, height: 630 },
          telegram: { title: "📢 Telegram Poll", description: `Cast your vote: ${poll.question}`, width: 1200, height: 630 },
          youtube: { title: "🎥 YouTube Poll", description: `Check out this poll: ${poll.question}`, width: 1280, height: 720 },
          gmail: { title: "📧 Email Poll", description: `Vote on this poll: ${poll.question}`, width: 1200, height: 600 },
      };

      const currentPlatform = platformData[platform] || platformData.twitter;
      const imageWidth = currentPlatform.width || 1200;
      const imageHeight = currentPlatform.height || 630;
      
      // --- URL Construction ---
      const baseUrl = req.get('host').includes('localhost') || req.get('host').includes('loca.lt') 
        ? `${req.protocol}://${req.get('host')}`
        : 'https://yourdomain.com';
      
      const pollUrl = `${baseUrl}/poll/${poll._id}/vote`;

      // 2. Build Meta Tags Dynamically
      const metaTags = [
          // Standard OG Tags
          `<meta property="og:type" content="article" />`,
          `<meta property="og:title" content="${currentPlatform.title}" />`,
          `<meta property="og:description" content="${currentPlatform.description}" />`,
          
          // CRITICAL FIX: og:url must point to the target PWA voting page
          `<meta property="og:url" content="${pollUrl}" />`,
          
          `<meta property="og:site_name" content="Your Poll App" />`,
          
          // Twitter Card Tags
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:title" content="${currentPlatform.title}" />`,
          `<meta name="twitter:description" content="${currentPlatform.description}" />`,
      ];

      if (imageUrl) {
          metaTags.push(`
              <meta property="og:image" content="${imageUrl}" />
              <meta property="og:image:width" content="${imageWidth}" />
              <meta property="og:image:height" content="${imageHeight}" />
              <meta property="og:image:type" content="image/png" />
              <meta property="og:image:secure_url" content="${imageUrl}" />
              <meta name="twitter:image" content="${imageUrl}" />
              <meta name="twitter:image:alt" content="Poll preview image" />
          `);
      }

      // 3. Send Response
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${currentPlatform.title}</title>

          <meta http-equiv="refresh" content="3; url=${pollUrl}" />

          ${metaTags.join('\n')}
          
          <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta http-equiv="Pragma" content="no-cache" />
          <meta http-equiv="Expires" content="0" />
          
          <style>
            /* Remove unused styles and optimize class selectors if necessary. 
              Styles for the user's view: */
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              text-align: center; 
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              margin: 0;
            }
            .container {
              max-width: 500px;
              margin: 50px auto;
              background: white;
              padding: 30px;
              border-radius: 20px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            .poll-image {
              max-width: 100%;
              height: auto;
              border-radius: 12px;
              margin: 20px 0;
              box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            .vote-button {
              display: inline-block;
              background: linear-gradient(45deg, #667eea, #764ba2);
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 25px;
              font-weight: 600;
              margin-top: 20px;
              transition: transform 0.2s;
            }
            .vote-button:hover {
              transform: translateY(-2px);
            }
            .platform-badge {
              display: inline-block;
              background: #f1f3f4;
              color: #5f6368;
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 500;
              margin-bottom: 15px;
            }
            .question {
              color: #333;
              font-size: 18px;
              font-weight: 600;
              margin: 15px 0;
              line-height: 1.4;
            }
            .redirect-text {
              color: #666;
              font-size: 14px;
              margin: 15px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="platform-badge">Shared via ${platform.charAt(0).toUpperCase() + platform.slice(1)}</div>
            <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;">${currentPlatform.title}</h1>
            <div class="question">${poll.question}</div>
            
            ${imageUrl ? `<img src="${imageUrl}" alt="Poll preview" class="poll-image" />` : ''}
            
            <div class="redirect-text">Redirecting to poll in 3 seconds... <br/> Click below if not redirected!</div>
            <a href="${pollUrl}" class="vote-button">Vote Now!</a>
          </div>
        </body>
        </html>
      `);
    } catch (err) {
      console.error('❌ Preview generation error:', err);
      res.status(500).send(`
        <html>
          <head><title>Error Loading Poll</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1>Oops! Something went wrong</h1>
            <p>Unable to load poll preview. Please try again.</p>
            <p style="color: #666; font-size: 12px;">Error ID: ${req.params.id}</p>
          </body>
        </html>
      `);
    }
  });


/*
 * ==========================================================
 * GMAIL AMP POLLS (Publicly accessible by Google's servers)
 * ==========================================================
 */
router.post('/vote-from-gmail', voteFromGmail);

/*
 * ========================================
 * PROTECTED ROUTES (Authentication Required)
 * ========================================
 */
router.post('/create-poll', protect, createPoll);
router.post('/upload-image', protect, upload.single('image'), uploadImage);
router.get('/my-polls', protect, getMyPolls);
router.get('/participated-polls', protect, getParticipatedPolls);
router.get('/trending', protect, getTrendingPolls);
router.get('/last5', protect, getLast5Polls); // Your route was using checkAuth, protect is safer
router.post('/send-gmail-poll', protect, sendGmailPoll);
router.post('/test-whatsapp', protect, testWhatsappMessage);
router.get('/:pollId/generate-card', protect, generatePollCard);
router.get('/:pollId/share-image', protect, generateShareableImage);
router.get('/:pollId/analytics', protect, getPollAnalytics);
router.post('/:pollId/share', protect, addSharedPlatform);
router.post("/:pollId/apply-filter", protect, applyPollFilter);


/*
 * =============================================================
 * HYBRID ROUTES (Works for both logged-in and anonymous users)
 * =============================================================
 */
router.post('/:pollId/vote', checkAuth, voteOnPoll);
router.get('/:pollId', checkAuth, getPollById);


export default router;
