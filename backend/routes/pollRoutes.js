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
      uploadImage,
      generatePollCard, 
      addSharedPlatform,
      getTrendingPolls,
      sendPoll,
      votePoll as ampVotePoll,
      resultsPoll,
      getPollAnalytics,
      getLast5Polls,
      applyPollFilter
  } from '../controllers/pollController.js';
  import { checkAuth, protect } from '../middleware/authMiddleware.js';
  import Poll from '../models/Poll.js';

  const router = express.Router();

  // --- Public Routes ---
  router.get('/all', getAllPolls);
  router.get('/live', getLivePolls);
  router.get('/trending', getTrendingPolls);   // ✅ moved above dynamic routes
  router.post('/generate-image', generateImage);


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


  router.get('/:pollId/generate-card', generatePollCard);

  // --- Protected Routes ---
  router.post('/create-poll', protect, createPoll);
  router.post('/:pollId/vote', protect, voteOnPoll);
  router.get('/my-polls', protect, getMyPolls);
  router.get('/participated-polls', protect, getParticipatedPolls);
  router.post('/upload-image', protect, upload.single('image'), uploadImage);
  router.post('/:id/share', addSharedPlatform);

  router.post('/send-poll', sendPoll);

  /* -------------------- Gmail AMP Poll Interaction (Public) -------------------- */
  // These routes are accessed by Gmail AMP iframe, so no auth middleware
  router.post('/vote', ampVotePoll);
  router.get('/results', resultsPoll);
  router.get('/last5', checkAuth, getLast5Polls);

  // router.get('/:id/preview', async (req, res) => {
  //   try {
  //     const poll = await Poll.findById(req.params.id);
  //     if (!poll) return res.status(404).send("Poll not found");

  //     // Get platform param from query (default: twitter)
  //     const platform = req.query.platform || "twitter";
  //     console.log("🚀 ~ platform:", platform)

  //     // Pick per-platform preview image if available, fallback to original
  //     const imageUrl = poll.previewImages?.[platform] || poll.imageUrl || 'https://yourdomain.com/default-poll-image.jpg';
  //     console.log("🚀 ~ imageUrl:", imageUrl)
      
  //     // Create platform-specific metadata
  //     const platformData = {
  //       instagram: {
  //         title: "📊 Vote on this Instagram Poll!",
  //         description: `Join the conversation: ${poll.question}`,
  //       },
  //       twitter: {
  //         title: "🗳️ Vote on this Twitter Poll!",
  //         description: `What do you think? ${poll.question}`,
  //       },
  //       linkedin: {
  //         title: "📈 Professional Poll - Your Opinion Matters",
  //         description: `Share your professional insight: ${poll.question}`,
  //       },
  //       facebook: {
  //         title: "👥 Community Poll - Make Your Voice Heard",
  //         description: `Join our community discussion: ${poll.question}`,
  //       },
  //       whatsapp: {
  //         title: "💬 Poll Shared via WhatsApp",
  //         description: `Vote and share your opinion: ${poll.question}`,
  //       },
  //       telegram: {
  //         title: "📢 Telegram Poll",
  //         description: `Cast your vote: ${poll.question}`,
  //       }
  //     };

  //     const currentPlatform = platformData[platform] || platformData.twitter;
  //     console.log("🚀 ~ currentPlatform:", currentPlatform)
  //     const pollUrl = `https://yourdomain.com/poll/${poll._id}/vote`; // Direct to voting page
  //     console.log("🚀 ~ pollUrl:", pollUrl)
  //     const previewUrl = `https://yourdomain.com/poll/${poll._id}/preview?platform=${platform}`;
  //     console.log("🚀 ~ previewUrl:", previewUrl)

  //     res.send(`
  //       <!DOCTYPE html>
  //       <html lang="en">
  //       <head>
  //         <meta charset="UTF-8" />
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //         <title>${currentPlatform.title}</title>

  //         <!-- Essential Open Graph Tags -->
  //         <meta property="og:type" content="article" />
  //         <meta property="og:title" content="${currentPlatform.title}" />
  //         <meta property="og:description" content="${currentPlatform.description}" />
  //         <meta property="og:image" content="${imageUrl}" />
  //         <meta property="og:image:width" content="1200" />
  //         <meta property="og:image:height" content="630" />
  //         <meta property="og:image:type" content="image/png" />
  //         <meta property="og:url" content="${previewUrl}" />
  //         <meta property="og:site_name" content="Your Poll App" />

  //         <!-- Twitter Card Tags -->
  //         <meta name="twitter:card" content="summary_large_image" />
  //         <meta name="twitter:site" content="@yourhandle" />
  //         <meta name="twitter:creator" content="@yourhandle" />
  //         <meta name="twitter:title" content="${currentPlatform.title}" />
  //         <meta name="twitter:description" content="${currentPlatform.description}" />
  //         <meta name="twitter:image" content="${imageUrl}" />
  //         <meta name="twitter:image:alt" content="Poll preview image" />

  //         <!-- LinkedIn specific -->
  //         <meta property="article:author" content="Your Poll App" />
          
  //         <!-- WhatsApp/Telegram optimization -->
  //         <meta property="og:image:secure_url" content="${imageUrl}" />
          
  //         <!-- Prevent caching issues -->
  //         <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  //         <meta http-equiv="Pragma" content="no-cache" />
  //         <meta http-equiv="Expires" content="0" />
          
  //         <!-- Auto-redirect to voting page -->
  //         <meta http-equiv="refresh" content="3;url=${pollUrl}" />
          
  //         <style>
  //           body { 
  //             font-family: Arial, sans-serif; 
  //             text-align: center; 
  //             padding: 20px;
  //             background: #f5f5f5;
  //           }
  //           .container {
  //             max-width: 600px;
  //             margin: 0 auto;
  //             background: white;
  //             padding: 20px;
  //             border-radius: 10px;
  //             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  //           }
  //           .poll-image {
  //             max-width: 100%;
  //             height: auto;
  //             border-radius: 8px;
  //             margin: 20px 0;
  //           }
  //           .vote-button {
  //             display: inline-block;
  //             background: #1da1f2;
  //             color: white;
  //             padding: 12px 24px;
  //             text-decoration: none;
  //             border-radius: 6px;
  //             font-weight: bold;
  //             margin-top: 20px;
  //           }
  //           .platform-badge {
  //             display: inline-block;
  //             background: #e1e8ed;
  //             color: #14171a;
  //             padding: 4px 8px;
  //             border-radius: 4px;
  //             font-size: 12px;
  //             margin-bottom: 10px;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="container">
  //           <div class="platform-badge">Shared via ${platform.charAt(0).toUpperCase() + platform.slice(1)}</div>
  //           <h1>${currentPlatform.title}</h1>
  //           <p>${currentPlatform.description}</p>
            
  //           ${imageUrl ? `<img src="${imageUrl}" alt="Poll preview" class="poll-image" />` : ''}
            
  //           <p>Redirecting to poll in 3 seconds...</p>
  //           <a href="${pollUrl}" class="vote-button">Vote Now!</a>
  //         </div>
  //       </body>
  //       </html>
  //     `);
  //   } catch (err) {
  //     console.error('Preview generation error:', err);
  //     res.status(500).send(`
  //       <html>
  //         <head><title>Error</title></head>
  //         <body>
  //           <h1>Oops! Something went wrong</h1>
  //           <p>Unable to load poll preview. Please try again.</p>
  //         </body>
  //       </html>
  //     `);
  //   }
  // });


  // --- Dynamic route LAST (to avoid catching /trending, /my-polls, etc.) ---
  router.get('/:pollId', protect, getPollById);
  router.get('/:pollId/analytics', protect, getPollAnalytics); // Reuse getPollById for now


router.post("/:pollId/apply-filter", applyPollFilter);

  export default router;
