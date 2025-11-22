// import axios from 'axios';
// import querystring from 'querystring';
// import Poll from '../models/Poll.js'; // Make sure this path is correct

// const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
// const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
// // IMPORTANT: This URI must match what's in your LinkedIn Dev App settings
// const LINKEDIN_REDIRECT_URI = 'http://localhost:5000/api/linkedin/auth/callback';

// async function getAuthorUrn(accessToken) {
//     const response = await axios.get("https://api.linkedin.com/v2/userinfo", { headers: { Authorization: `Bearer ${accessToken}` }});
//     return `urn:li:person:${response.data.sub}`;
// }

// function generateTrackableLink(pollId) {
//     const params = new URLSearchParams({ utm_source: 'linkedin', utm_medium: 'native_poll' });
//     return `https://pyngl.com/poll/${pollId}?${params.toString()}`;
// }

// // --- AUTHENTICATION CONTROLLERS ---

// export const getAuthStatus = (req, res) => {
//     res.json({ isAuthenticated: !!req.session.linkedinAccessToken });
// };

// export const redirectToLinkedInAuth = (req, res) => {
//     const scope = "openid profile email w_member_social";
//     const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;
//     res.redirect(authUrl);
// };

// export const handleLinkedInCallback = async (req, res) => {
//     // This now redirects back to your React PWA page
//      const frontendUrl = 'https://pyngl.com/share-linkedin'; 
//     try {
//         const tokenResponse = await axios.post(
//             "https://www.linkedin.com/oauth/v2/accessToken",
//             querystring.stringify({
//                 grant_type: "authorization_code",
//                 code: req.query.code,
//                 redirect_uri: LINKEDIN_REDIRECT_URI,
//                 client_id: LINKEDIN_CLIENT_ID,
//                 client_secret: LINKEDIN_CLIENT_SECRET,
//             }),
//             { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//         );
//         req.session.linkedinAccessToken = tokenResponse.data.access_token;
//         res.redirect(`${frontendUrl}?auth_linkedin=success`);
//     } catch (error) {
//         console.error("LinkedIn Auth Error:", error.response?.data || error.message);
//         res.redirect(`${frontendUrl}?auth_linkedin=failed`);
//     }
// };
// export const logout = (req, res) => {
//     req.session.destroy(() => res.status(200).json({ message: 'Logged out from LinkedIn' }));
// };

// // --- Campaign Publishing Controller (Corrected Logic) ---
// export const publishCampaign = async (req, res) => {
//     const accessToken = req.session.linkedinAccessToken;
//     if (!accessToken) {
//         return res.status(401).json({ error: "User not authenticated with LinkedIn." });
//     }
    
//     try {
//         const { pollCommentary, pollQuestion, pollOptions, bannerCaption, pinnedComment, pynglPollId } = req.body;
        
//         if (!req.file) return res.status(400).json({ error: "Banner image file is required."});
//         const parsedPollOptions = JSON.parse(pollOptions);
//         const authorUrn = await getAuthorUrn(accessToken);

        
//         // --- THIS IS THE FIX ---
//         // Instead of creating a new poll, we confirm the one from the frontend exists.
//         const pollFromDb = await Poll.findById(pynglPollId);
//         if(!pollFromDb) {
//             return res.status(404).json({ error: "The original Pyngl poll could not be found." });
//         }
//         // Step 2: Create LinkedIn Poll Post
//         const pollBody = {
//             author: authorUrn,
//             commentary: pollCommentary,
//             visibility: "PUBLIC",
//             distribution: { feedDistribution: "MAIN_FEED" },
//             content: { poll: { question: pollQuestion, options: parsedPollOptions.map(opt => ({ "text": opt })), settings: { duration: "THREE_DAYS" }}},
//             lifecycleState: "PUBLISHED"
//         };
//         const pollResponse = await axios.post("https://api.linkedin.com/rest/posts", pollBody, { headers: { 'Authorization': `Bearer ${accessToken}`, 'X-Restli-Protocol-Version': '2.0.0', 'LinkedIn-Version': '202508' }});
//         const pollPostUrn = pollResponse.headers['x-restli-id'];
        
//         // Step 3: Upload Image
//         const registerUploadResponse = await axios.post("https://api.linkedin.com/rest/images?action=initializeUpload", { initializeUploadRequest: { owner: authorUrn }}, { headers: { 'Authorization': `Bearer ${accessToken}`, 'LinkedIn-Version': '202508' }});
//         const { uploadUrl, image: imageUrn } = registerUploadResponse.data.value;
//         await axios.put(uploadUrl, req.file.buffer, { headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': req.file.mimetype }});

//         // Step 4: Create Image Post with Link
//         const finalBannerCaption = bannerCaption.replace('[PYNGL_LINK]', generateTrackableLink(pynglPollId, 'banner_post'));
//         const imagePostBody = { author: authorUrn, commentary: finalBannerCaption, visibility: "PUBLIC", distribution: { feedDistribution: "MAIN_FEED" }, content: { media: { id: imageUrn }}, lifecycleState: "PUBLISHED" };
//         const imagePostResponse = await axios.post("https://api.linkedin.com/rest/posts", imagePostBody, { headers: { 'Authorization': `Bearer ${accessToken}`, 'X-Restli-Protocol-Version': '2.0.0', 'LinkedIn-Version': '202508' }});
//         const imagePostUrn = imagePostResponse.headers['x-restli-id'];
        
//         // Step 5: Add Comments to Cross-Link Posts
//         const finalPinnedComment = pinnedComment.replace('[PYNGL_LINK]', generateTrackableLink(pynglPollId, 'native_poll'));
//         let commentWarning = '';
//         try {
//             await axios.post(`https://api.linkedin.com/rest/socialActions/${pollPostUrn}/comments`, { actor: authorUrn, message: { text: finalPinnedComment }}, { headers: { 'Authorization': `Bearer ${accessToken}`, 'LinkedIn-Version': '202508' }});
//             await axios.post(`https://api.linkedin.com/rest/socialActions/${imagePostUrn}/comments`, { actor: authorUrn, message: { text: "Vote in the poll above and see more details here!" }}, { headers: { 'Authorization': `Bearer ${accessToken}`, 'LinkedIn-Version': '202508' }});
//         } catch(e) {
//             commentWarning = "Posts were created, but comments could not be added automatically.";
//         }
        
//         // Step 6: Save URNs to Poll in DB
//         await saveAnalyticsData({ pynglPollId, pollPostUrn, imagePostUrn });

//         res.status(201).json({ message: "Campaign created successfully!"});

//     } catch (err) {
//         console.error("--- LinkedIn Campaign Error ---", err.response?.data || err.message);
//         res.status(500).json({ error: "Failed to create LinkedIn campaign." });
//     }
// };
// export const publishTextPoll = async (req, res) => {
//     const accessToken = req.session.linkedinAccessToken;
//     if (!accessToken) {
//         return res.status(401).json({ error: "User not authenticated with LinkedIn." });
//     }
    
//     try {
//         const { pynglPollId } = req.body;
//         const authorUrn = await getAuthorUrn(accessToken);
        
//         const pollFromDb = await Poll.findById(pynglPollId);
//         if(!pollFromDb) {
//             return res.status(404).json({ error: "The original Pyngl poll could not be found." });
//         }

//         // Step 1: Create the LinkedIn Poll Post
//         const pollBody = {
//             author: authorUrn,
//             commentary: `Powered by Pyngl`, // You can make this dynamic
//             visibility: "PUBLIC",
//             distribution: { feedDistribution: "MAIN_FEED" },
//             content: {
//                 poll: {
//                     question: pollFromDb.question,
//                     options: pollFromDb.options.map(opt => ({ "text": opt.text })),
//                     settings: { duration: "THREE_DAYS" }
//                 }
//             },
//             lifecycleState: "PUBLISHED"
//         };
//         const pollResponse = await axios.post("https://api.linkedin.com/rest/posts", pollBody, { headers: { 'Authorization': `Bearer ${accessToken}`, 'X-Restli-Protocol-Version': '2.0.0', 'LinkedIn-Version': '202508' }});
//         const pollPostUrn = pollResponse.headers['x-restli-id'];
        
//         // Step 2: Add a comment with the trackable link
//         const trackableLink = generateTrackableLink(pynglPollId);
//         const commentBody = {
//             actor: authorUrn,
//             message: { text: `Vote and see the full results on Pyngl: ${trackableLink}` }
//         };
//         await axios.post(`https://api.linkedin.com/rest/socialActions/${pollPostUrn}/comments`, commentBody, { headers: { 'Authorization': `Bearer ${accessToken}`, 'LinkedIn-Version': '202508' }});
        
//         // Step 3: Save the LinkedIn post URN to your database for analytics
//         pollFromDb.linkedinPollUrn = pollPostUrn;
//         await pollFromDb.save();

//         res.status(201).json({ message: "Text poll created successfully on LinkedIn!" });

//     } catch (err) {
//         console.error("--- LinkedIn Text Poll Error ---", err.response?.data || err.message);
//         res.status(500).json({ error: "Failed to create LinkedIn text poll." });
//     }
// };
// export const publishSimplePost = async (req, res) => {
//     const accessToken = req.session.linkedinAccessToken;
//     if (!accessToken) {
//         return res.status(401).json({ error: "User not authenticated with LinkedIn." });
//     }
    
//     try {
//         const { pynglPollId } = req.body;
//         if (!req.file) return res.status(400).json({ error: "Banner image file is required." });

//         const authorUrn = await getAuthorUrn(accessToken);
        
//         // 1. Find the existing poll in your DB
//         const pollFromDb = await Poll.findById(pynglPollId);
//         if(!pollFromDb) {
//             return res.status(404).json({ error: "The original Pyngl poll could not be found." });
//         }

//         // 2. Upload the banner image to LinkedIn
//         const registerUploadResponse = await axios.post("https://api.linkedin.com/rest/images?action=initializeUpload", { initializeUploadRequest: { owner: authorUrn }}, { headers: { 'Authorization': `Bearer ${accessToken}`, 'LinkedIn-Version': '202508' }});
//         const { uploadUrl, image: imageUrn } = registerUploadResponse.data.value;
//         await axios.put(uploadUrl, req.file.buffer, { headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': req.file.mimetype }});

//         // 3. Create a single image post with a link in the caption
//         const trackableLink = generateTrackableLink(pynglPollId);
//         const caption = `🗳️ ${pollFromDb.question}\n\nHave your say and see the full results here → ${trackableLink}`;
        
//         const imagePostBody = { 
//             author: authorUrn, 
//             commentary: caption, 
//             visibility: "PUBLIC", 
//             distribution: { feedDistribution: "MAIN_FEED" }, 
//             content: { media: { id: imageUrn }}, 
//             lifecycleState: "PUBLISHED" 
//         };
//         const imagePostResponse = await axios.post("https://api.linkedin.com/rest/posts", imagePostBody, { headers: { 'Authorization': `Bearer ${accessToken}`, 'X-Restli-Protocol-Version': '2.0.0', 'LinkedIn-Version': '202508' }});
//         const imagePostUrn = imagePostResponse.headers['x-restli-id'];

//         // 4. (Optional) Save the post URN for analytics
//         pollFromDb.linkedinImageUrn = imagePostUrn;
//         await pollFromDb.save();

//         res.status(201).json({ message: "Successfully shared poll to LinkedIn!" });

//     } catch (err) {
//         console.error("--- LinkedIn Post Error ---", err.response?.data || err.message);
//         res.status(500).json({ error: "Failed to create LinkedIn post." });
//     }
// };
// export const publishNativePoll = async (req, res) => {
//     const accessToken = req.session.linkedinAccessToken;
//     if (!accessToken) return res.status(401).json({ error: "Not authenticated with LinkedIn." });
    
//     try {
//         const { pynglPollId } = req.body;
//         const authorUrn = await getAuthorUrn(accessToken);
        
//         const pollFromDb = await Poll.findById(pynglPollId);
//         if(!pollFromDb) {
//             return res.status(404).json({ error: "The original Pyngl poll could not be found." });
//         }

//         const pollOptionsForLinkedIn = pollFromDb.options.map(opt => {
//             const text = (typeof opt === 'object' && opt.text != null) ? opt.text : opt;
//             return { "text": text };
//         });

//         // 1. Construct the request body for a LinkedIn Poll Post
//         const pollBody = {
//             author: authorUrn,
//             commentary: `Pyngl.com`,
//             visibility: "PUBLIC",
//             distribution: { feedDistribution: "MAIN_FEED" },
//             content: {
//                 poll: {
//                     question: pollFromDb.question,
//                     options: pollOptionsForLinkedIn,
//                     settings: { duration: "THREE_DAYS" }
//                 }
//             },
//             lifecycleState: "PUBLISHED"
//         };
        
//         // 2. Send the request to LinkedIn's API
//         const pollResponse = await axios.post("https://api.linkedin.com/rest/posts", pollBody, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'X-Restli-Protocol-Version': '2.0.0',
//                 'LinkedIn-Version': '202509'
//             }
//         });
//         const pollPostUrn = pollResponse.headers['x-restli-id'];
        
//         // 3. Save the LinkedIn post URN to your database for analytics
//         pollFromDb.linkedinPollUrn = pollPostUrn;
//         await pollFromDb.save();

//         res.status(201).json({ message: "Successfully published poll to LinkedIn!" });

//     } catch (err) {
//         console.error("--- LinkedIn Poll Post Error ---", err.response?.data || err.message);
//         res.status(500).json({ error: "Failed to create LinkedIn poll." });
//     }
// };

import axios from 'axios';
import querystring from 'querystring';
import Poll from '../models/Poll.js'; // Make sure this path is correct

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
// IMPORTANT: This URI must match what's in your LinkedIn Dev App settings
const LINKEDIN_REDIRECT_URI = 'http://192.168.1.8:5000/api/linkedin/auth/callback';


async function getAuthorUrn(accessToken) {
    const response = await axios.get("https://api.linkedin.com/v2/userinfo", { headers: { Authorization: `Bearer ${accessToken}` }});
    return `urn:li:person:${response.data.sub}`;
}

function generateTrackableLink(pollId) {
    const params = new URLSearchParams({ utm_source: 'linkedin', utm_medium: 'native_poll' });
    return `http://192.168.1.8:5173/poll/${pollId}?${params.toString()}`;
}

// --- AUTHENTICATION CONTROLLERS ---

export const getAuthStatus = (req, res) => {
    res.json({ isAuthenticated: !!req.session.linkedinAccessToken });
};

// In redirectToLinkedInAuth
export const redirectToLinkedInAuth = (req, res) => {
  const { pollId } = req.query;
  if (pollId) req.session.pollId = pollId; // ✅ Save pollId for callback

  const scope = "openid profile email w_member_social";
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;
  
  res.redirect(authUrl);
};


// export const handleLinkedInCallback = async (req, res) => {
//   try {
//     const { code } = req.query;
//     const pollId = req.session.pollId;

//     if (!code) {
//       return res.redirect('http://localhost:5173/share-linkedin?auth_linkedin=failed');
//     }

//     // Exchange code for access token
//     const tokenResponse = await axios.post(
//       "https://www.linkedin.com/oauth/v2/accessToken",
//       querystring.stringify({
//         grant_type: "authorization_code",
//         code,
//         redirect_uri: LINKEDIN_REDIRECT_URI,
//         client_id: LINKEDIN_CLIENT_ID,
//         client_secret: LINKEDIN_CLIENT_SECRET,
//       }),
//       { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//     );

//     const accessToken = tokenResponse.data.access_token;
//     req.session.linkedinAccessToken = accessToken;

//     // ✅ Fetch LinkedIn user info
//     const profileResponse = await axios.get("https://api.linkedin.com/v2/userinfo", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     const linkedinId = profileResponse.data.sub;
//     req.session.linkedinUserId = linkedinId; // store user id for posts

//     // ✅ Auto-post directly if pollId present
//     if (pollId) {
//       try {
//         const pollFromDb = await Poll.findById(pollId);
//         if (pollFromDb) {
//           const authorUrn = `urn:li:member:${linkedinId}`;
//           const postBody = {
//             author: authorUrn,
//             lifecycleState: "PUBLISHED",
//             specificContent: {
//               "com.linkedin.ugc.ShareContent": {
//                 shareCommentary: { text: pollFromDb.question },
//                 shareMediaCategory: "NONE",
//               },
//             },
//             visibility: {
//               "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
//             },
//           };
//           await axios.post("https://api.linkedin.com/v2/ugcPosts", postBody, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "X-Restli-Protocol-Version": "2.0.0",
//               "Content-Type": "application/json",
//             },
//           });
//         }
//       } catch (err) {
//         console.error("Auto post after auth error:", err.response?.data || err.message);
//       }
//     }

//     // ✅ Redirect back to frontend with success
//     const redirectUrl = pollId
//       ? `http://localhost:5173/share-linkedin?auth_linkedin=success&pollId=${pollId}`
//       : `http://localhost:5173/share-linkedin?auth_linkedin=success`;

//     res.redirect(redirectUrl);
//   } catch (error) {
//     console.error("LinkedIn Auth Error:", error.response?.data || error.message);
//     res.redirect("http://localhost:5173/share-linkedin?auth_linkedin=failed");
//   }
// };

export const handleLinkedInCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const pollId = req.session.pollId;

    if (!code) {
      return res.redirect('http://192.168.1.8/share-linkedin?auth_linkedin=failed');
    }

    // 1️⃣ EXCHANGE CODE FOR ACCESS TOKEN
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri: LINKEDIN_REDIRECT_URI,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = tokenResponse.data.access_token;
    req.session.linkedinAccessToken = accessToken;

    // 2️⃣ FETCH USER PROFILE TO GET PERSON ID (sub)
    const profileResponse = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const linkedinId = profileResponse.data.sub;
    req.session.linkedinUserId = linkedinId; // store for future posts

    // 3️⃣ USE CORRECT AUTHOR URN (VERY IMPORTANT)
    const authorUrn = await getAuthorUrn(accessToken); 
    // returns: urn:li:person:{sub}

    // 4️⃣ AUTO POST IF pollId EXISTS
    // if (pollId) {
    //   try {
    //     const pollFromDb = await Poll.findById(pollId);

    //     if (pollFromDb) {
    //       const postBody = {
    //         author: authorUrn,
    //         lifecycleState: "PUBLISHED",
    //         specificContent: {
    //           "com.linkedin.ugc.ShareContent": {
    //             shareCommentary: { text: pollFromDb.question },
    //             shareMediaCategory: "NONE",
    //           },
    //         },
    //         visibility: {
    //           "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    //         },
    //       };

    //       await axios.post("https://api.linkedin.com/v2/ugcPosts", postBody, {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //           "X-Restli-Protocol-Version": "2.0.0",
    //           "Content-Type": "application/json",
    //         },
    //       });
    //     }
    //   } catch (err) {
    //     console.error("Auto post after auth error:", err.response?.data || err.message);
    //   }
    // }

    // 5️⃣ REDIRECT BACK TO FRONTEND
    const redirectUrl = pollId
      ? `http://localhost:5173/share-linkedin?auth_linkedin=success&pollId=${pollId}`
      : `http://localhost:5173/share-linkedin?auth_linkedin=success`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error("LinkedIn Auth Error:", error.response?.data || error.message);
    res.redirect("http://localhost:5173/share-linkedin?auth_linkedin=failed");
  }
};



export const logout = (req, res) => {
    req.session.destroy(() => res.status(200).json({ message: 'Logged out from LinkedIn' }));
};

// --- Campaign Publishing Controller (Corrected Logic) ---
export const publishCampaign = async (req, res) => {
    const accessToken = req.session.linkedinAccessToken;
    if (!accessToken) {
        return res.status(401).json({ error: "User not authenticated with LinkedIn." });
    }
    
    try {
        const { pollCommentary, pollQuestion, pollOptions, bannerCaption, pinnedComment, pynglPollId } = req.body;
        
        if (!req.file) return res.status(400).json({ error: "Banner image file is required."});
        const parsedPollOptions = JSON.parse(pollOptions);
        const authorUrn = await getAuthorUrn(accessToken);

        
        // --- THIS IS THE FIX ---
        // Instead of creating a new poll, we confirm the one from the frontend exists.
        const pollFromDb = await Poll.findById(pynglPollId);
        if(!pollFromDb) {
            return res.status(404).json({ error: "The original Pyngl poll could not be found." });
        }
        // Step 2: Create LinkedIn Poll Post
        const pollBody = {
            author: authorUrn,
            commentary: pollCommentary,
            visibility: "PUBLIC",
            distribution: { feedDistribution: "MAIN_FEED" },
            content: { poll: { question: pollQuestion, options: parsedPollOptions.map(opt => ({ "text": opt })), settings: { duration: "THREE_DAYS" }}},
            lifecycleState: "PUBLISHED"
        };
        const pollResponse = await axios.post("https://api.linkedin.com/rest/posts", pollBody, { headers: { 'Authorization': `Bearer ${accessToken}`, 'X-Restli-Protocol-Version': '2.0.0', 'LinkedIn-Version': '202508' }});
        const pollPostUrn = pollResponse.headers['x-restli-id'];
        
        // Step 3: Upload Image
        const registerUploadResponse = await axios.post("https://api.linkedin.com/rest/images?action=initializeUpload", { initializeUploadRequest: { owner: authorUrn }}, { headers: { 'Authorization': `Bearer ${accessToken}`, 'LinkedIn-Version': '202508' }});
        const { uploadUrl, image: imageUrn } = registerUploadResponse.data.value;
        await axios.put(uploadUrl, req.file.buffer, { headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': req.file.mimetype }});

        // Step 4: Create Image Post with Link
        const finalBannerCaption = bannerCaption.replace('[PYNGL_LINK]', generateTrackableLink(pynglPollId, 'banner_post'));
        const imagePostBody = { author: authorUrn, commentary: finalBannerCaption, visibility: "PUBLIC", distribution: { feedDistribution: "MAIN_FEED" }, content: { media: { id: imageUrn }}, lifecycleState: "PUBLISHED" };
        const imagePostResponse = await axios.post("https://api.linkedin.com/rest/posts", imagePostBody, { headers: { 'Authorization': `Bearer ${accessToken}`, 'X-Restli-Protocol-Version': '2.0.0', 'LinkedIn-Version': '202508' }});
        const imagePostUrn = imagePostResponse.headers['x-restli-id'];
        
        // Step 5: Add Comments to Cross-Link Posts
        const finalPinnedComment = pinnedComment.replace('[PYNGL_LINK]', generateTrackableLink(pynglPollId, 'native_poll'));
        let commentWarning = '';
        try {
            await axios.post(`https://api.linkedin.com/rest/socialActions/${pollPostUrn}/comments`, { actor: authorUrn, message: { text: finalPinnedComment }}, { headers: { 'Authorization': `Bearer ${accessToken}`, 'LinkedIn-Version': '202508' }});
            await axios.post(`https://api.linkedin.com/rest/socialActions/${imagePostUrn}/comments`, { actor: authorUrn, message: { text: "Vote in the poll above and see more details here!" }}, { headers: { 'Authorization': `Bearer ${accessToken}`, 'LinkedIn-Version': '202508' }});
        } catch(e) {
            commentWarning = "Posts were created, but comments could not be added automatically.";
        }
        
        // Step 6: Save URNs to Poll in DB
        await saveAnalyticsData({ pynglPollId, pollPostUrn, imagePostUrn });

        res.status(201).json({ message: "Campaign created successfully!"});

    } catch (err) {
        console.error("--- LinkedIn Campaign Error ---", err.response?.data || err.message);
        res.status(500).json({ error: "Failed to create LinkedIn campaign." });
    }
};
export const publishTextPoll = async (req, res) => {
    const accessToken = req.session.linkedinAccessToken;
    if (!accessToken) {
        return res.status(401).json({ error: "User not authenticated with LinkedIn." });
    }
    
    try {
        const { pynglPollId } = req.body;
        const authorUrn = await getAuthorUrn(accessToken);
        
        const pollFromDb = await Poll.findById(pynglPollId);
        if(!pollFromDb) {
            return res.status(404).json({ error: "The original Pyngl poll could not be found." });
        }

        // Step 1: Create the LinkedIn Poll Post
        const pollBody = {
            author: authorUrn,
            commentary: `Powered by Pyngl`, // You can make this dynamic
            visibility: "PUBLIC",
            distribution: { feedDistribution: "MAIN_FEED" },
            content: {
                poll: {
                    question: pollFromDb.question,
                    options: pollFromDb.options.map(opt => ({ "text": opt.text })),
                    settings: { duration: "THREE_DAYS" }
                }
            },
            lifecycleState: "PUBLISHED"
        };
        const pollResponse = await axios.post("https://api.linkedin.com/rest/posts", pollBody, { headers: { 'Authorization': `Bearer ${accessToken}`, 'X-Restli-Protocol-Version': '2.0.0', 'LinkedIn-Version': '202508' }});
        const pollPostUrn = pollResponse.headers['x-restli-id'];
        
        // Step 2: Add a comment with the trackable link
        const trackableLink = generateTrackableLink(pynglPollId);
        const commentBody = {
            actor: authorUrn,
            message: { text: `Vote and see the full results on Pyngl: ${trackableLink}` }
        };
        await axios.post(`https://api.linkedin.com/rest/socialActions/${pollPostUrn}/comments`, commentBody, { headers: { 'Authorization': `Bearer ${accessToken}`, 'LinkedIn-Version': '202508' }});
        
        // Step 3: Save the LinkedIn post URN to your database for analytics
        pollFromDb.linkedinPollUrn = pollPostUrn;
        await pollFromDb.save();

        res.status(201).json({ message: "Text poll created successfully on LinkedIn!" });

    } catch (err) {
        console.error("--- LinkedIn Text Poll Error ---", err.response?.data || err.message);
        res.status(500).json({ error: "Failed to create LinkedIn text poll." });
    }
};
export const publishSimplePost = async (req, res) => {
    const accessToken = req.session.linkedinAccessToken;
    if (!accessToken) {
        return res.status(401).json({ error: "User not authenticated with LinkedIn." });
    }
    
    try {
        const { pynglPollId } = req.body;
        if (!req.file) return res.status(400).json({ error: "Banner image file is required." });

        const authorUrn = await getAuthorUrn(accessToken);
        
        // 1. Find the existing poll in your DB
        const pollFromDb = await Poll.findById(pynglPollId);
        if(!pollFromDb) {
            return res.status(404).json({ error: "The original Pyngl poll could not be found." });
        }

        // 2. Upload the banner image to LinkedIn
        const registerUploadResponse = await axios.post("https://api.linkedin.com/rest/images?action=initializeUpload", { initializeUploadRequest: { owner: authorUrn }}, { headers: { 'Authorization': `Bearer ${accessToken}`, 'LinkedIn-Version': '202508' }});
        const { uploadUrl, image: imageUrn } = registerUploadResponse.data.value;
        await axios.put(uploadUrl, req.file.buffer, { headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': req.file.mimetype }});

        // 3. Create a single image post with a link in the caption
        const trackableLink = generateTrackableLink(pynglPollId);
        const caption = `🗳️ ${pollFromDb.question}\n\nHave your say and see the full results here → ${trackableLink}`;
        
        const imagePostBody = { 
            author: authorUrn, 
            commentary: caption, 
            visibility: "PUBLIC", 
            distribution: { feedDistribution: "MAIN_FEED" }, 
            content: { media: { id: imageUrn }}, 
            lifecycleState: "PUBLISHED" 
        };
        const imagePostResponse = await axios.post("https://api.linkedin.com/rest/posts", imagePostBody, { headers: { 'Authorization': `Bearer ${accessToken}`, 'X-Restli-Protocol-Version': '2.0.0', 'LinkedIn-Version': '202508' }});
        const imagePostUrn = imagePostResponse.headers['x-restli-id'];

        // 4. (Optional) Save the post URN for analytics
        pollFromDb.linkedinImageUrn = imagePostUrn;
        await pollFromDb.save();

        res.status(201).json({ message: "Successfully shared poll to LinkedIn!" });

    } catch (err) {
        console.error("--- LinkedIn Post Error ---", err.response?.data || err.message);
        res.status(500).json({ error: "Failed to create LinkedIn post." });
    }
};
export const publishNativePoll = async (req, res) => {
    const accessToken = req.session.linkedinAccessToken;
    if (!accessToken) return res.status(401).json({ error: "Not authenticated with LinkedIn." });
    
    try {
        const { pynglPollId } = req.body;
        const authorUrn = await getAuthorUrn(accessToken);

        
        const pollFromDb = await Poll.findById(pynglPollId);
        if(!pollFromDb) {
            return res.status(404).json({ error: "The original Pyngl poll could not be found." });
        }

     const pollOptionsForLinkedIn = pollFromDb.options
  .map(opt => {
    const text = typeof opt === "object" && opt.text ? opt.text.trim() : (typeof opt === "string" ? opt.trim() : "");
    return text ? { text } : null;
  })
  .filter(Boolean); // removes empty or invalid options

if (pollOptionsForLinkedIn.length < 2) {
  return res.status(400).json({ error: "LinkedIn requires at least 2 valid poll options." });
}


        // 1. Construct the request body for a LinkedIn Poll Post
        const pollBody = {
            author: authorUrn,
            commentary: `Pyngl.com`,
            visibility: "PUBLIC",
            distribution: { feedDistribution: "MAIN_FEED" },
            content: {
                poll: {
                    question: pollFromDb.question,
                    options: pollOptionsForLinkedIn,
                    settings: { duration: "THREE_DAYS" }
                }
            },
            lifecycleState: "PUBLISHED"
        };
        
        // 2. Send the request to LinkedIn's API
        const pollResponse = await axios.post("https://api.linkedin.com/rest/posts", pollBody, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'LinkedIn-Version': '202509'
            }
        });
        const pollPostUrn = pollResponse.headers['x-restli-id'];
        
        // 3. Save the LinkedIn post URN to your database for analytics
        pollFromDb.linkedinPollUrn = pollPostUrn;
        await pollFromDb.save();

        res.status(201).json({ message: "Successfully published poll to LinkedIn!" });

    } catch (err) {
        console.error("--- LinkedIn Poll Post Error ---", err.response?.data || err.message);
        res.status(500).json({ error: "Failed to create LinkedIn poll." });
    }
};
export const shareLinkedinPost = async (req, res) => {
  try {
    const accessToken = req.session.linkedinAccessToken;
    const linkedinUserId = req.session.linkedinUserId;

    if (!accessToken || !linkedinUserId)
      return res.status(401).json({ error: "Not authenticated with LinkedIn" });

    const { text, image } = req.body;

    const postBody = {
      author: `urn:li:member:${linkedinUserId}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text },
          shareMediaCategory: image ? "IMAGE" : "NONE",
          media: image
            ? [
                {
                  status: "READY",
                  originalUrl: image,
                  title: { text },
                },
              ]
            : [],
        },
      },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    };

    const response = await axios.post("https://api.linkedin.com/v2/ugcPosts", postBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
      },
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("LinkedIn post error:", error.response?.data || error);
    res.status(500).json({ error: "Failed to post to LinkedIn" });
  }
};


