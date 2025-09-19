import axios from 'axios';
import querystring from 'querystring';
import Poll from '../models/Poll.js'; // Make sure this path is correct

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
// IMPORTANT: This URI must match what's in your LinkedIn Dev App settings
const LINKEDIN_REDIRECT_URI = 'http://localhost:5000/api/linkedin/auth/callback';

async function getAuthorUrn(accessToken) {
    const response = await axios.get("https://api.linkedin.com/v2/userinfo", { headers: { Authorization: `Bearer ${accessToken}` }});
    return `urn:li:person:${response.data.sub}`;
}

function generateTrackableLink(pollId) {
    const params = new URLSearchParams({ utm_source: 'linkedin', utm_medium: 'native_poll' });
    return `https://your-domain.com/poll/${pollId}?${params.toString()}`;
}

// --- AUTHENTICATION CONTROLLERS ---

export const getAuthStatus = (req, res) => {
    res.json({ isAuthenticated: !!req.session.linkedinAccessToken });
};

export const redirectToLinkedInAuth = (req, res) => {
    const scope = "openid profile email w_member_social";
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(LINKEDIN_REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;
    res.redirect(authUrl);
};

export const handleLinkedInCallback = async (req, res) => {
    // This now redirects back to your React PWA page
     const frontendUrl = 'http://localhost:5173/share-linkedin'; 
    try {
        const tokenResponse = await axios.post(
            "https://www.linkedin.com/oauth/v2/accessToken",
            querystring.stringify({
                grant_type: "authorization_code",
                code: req.query.code,
                redirect_uri: LINKEDIN_REDIRECT_URI,
                client_id: LINKEDIN_CLIENT_ID,
                client_secret: LINKEDIN_CLIENT_SECRET,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        req.session.linkedinAccessToken = tokenResponse.data.access_token;
        res.redirect(`${frontendUrl}?auth_linkedin=success`);
    } catch (error) {
        console.error("LinkedIn Auth Error:", error.response?.data || error.message);
        res.redirect(`${frontendUrl}?auth_linkedin=failed`);
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

        const pollOptionsForLinkedIn = pollFromDb.options.map(opt => {
            const text = (typeof opt === 'object' && opt.text != null) ? opt.text : opt;
            return { "text": text };
        });

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