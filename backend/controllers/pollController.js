import axios from 'axios';
import Poll from '../models/Poll.js';

// ✅ Generate image with Stability AI
export const generateImage = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "A prompt is required to generate an image." });
    }
    if (!process.env.STABILITY_API_KEY) {
        return res.status(500).json({ error: "API key for image generation is not configured on the server." });
    }

    try {
        const response = await axios.post(
            "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
            {
                text_prompts: [{ text: prompt }],
                cfg_scale: 7, height: 1024, width: 1024,
                samples: 1, steps: 30,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        const imageBase64 = response.data.artifacts[0].base64;
        const imageUrl = `data:image/png;base64,${imageBase64}`;

        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error("Error generating image:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate image. Check server logs." });
    }
};

// ✅ Create a new poll (associates with logged-in user)
export const createPoll = async (req, res) => {
    const { question, options, type, imageUrl, duration } = req.body;

    if (!question || !options?.length || !type) {
        return res.status(400).json({ error: "Missing required poll data." });
    }

    const finalDuration = duration || "24h";
    const now = new Date();
    const durationHours = parseInt(finalDuration.replace("h", ""));
    const expiresAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000);

    try {
        const poll = new Poll({
            question,
            options: options.map((opt) => ({ text: opt })),
            type,
            imageUrl: imageUrl || null,
            expiresAt,
            author: req.user.id, // Assumes auth middleware provides req.user
        });

        await poll.save();
        res.status(201).json(poll);
    } catch (error) {
        console.error("Error creating poll:", error);
        res.status(500).json({ error: "Failed to save poll." });
    }
};

// ✅ Vote on a poll (requires user to be logged in)
export const voteOnPoll = async (req, res) => {
    try {
        const { pollId } = req.params;
        const { optionId } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized. Please login to vote." });
        }

        const poll = await Poll.findOneAndUpdate(
            {
                _id: pollId,
                "options._id": optionId,
                votedBy: { $ne: userId }, // Check if user has NOT voted yet
            },
            {
                $inc: { "options.$.votes": 1 },
                $push: { votedBy: userId },
            },
            { new: true }
        );

        if (!poll) {
            return res.status(400).json({ error: "You have already voted on this poll." });
        }

        res.status(200).json(poll);
    } catch (error) {
        console.error("Error voting on poll:", error);
        res.status(500).json({ error: "Server error while voting." });
    }
};

// ✅ Get all polls for the Trending page
export const getAllPolls = async (req, res) => {
    try {
        const polls = await Poll.find({}).sort({ createdAt: -1 });
        res.status(200).json(polls);
    } catch (error) {
        console.error("Error fetching all polls:", error.message);
        res.status(500).json({ error: "Failed to fetch polls" });
    }
};

// ✅ Get only live (not expired) polls for the Homepage
export const getLivePolls = async (req, res) => {
    try {
        const now = new Date();
        const polls = await Poll.find({ expiresAt: { $gt: now } }).sort({
            createdAt: -1,
        });
        res.status(200).json(polls);
    } catch (error) {
        console.error("Error fetching live polls:", error.message);
        res.status(500).json({ error: "Failed to fetch live polls" });
    }
};

// ✅ Get a single poll by its ID
export const getPollById = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.pollId); // Assuming route is /:pollId
        if (!poll) {
            return res.status(404).json({ error: "Poll not found" });
        }
        res.status(200).json(poll);
    } catch (error) {
        console.error("Error fetching poll:", error.message);
        res.status(500).json({ error: "Failed to fetch poll" });
    }
};

// ✅ Get all polls created by the logged-in user
export const getMyPolls = async (req, res) => {
    try {
        const polls = await Poll.find({ author: req.user.id }).sort({
            createdAt: -1,
        });
        res.status(200).json(polls);
    } catch (error) {
        console.error("Error fetching my polls:", error);
        res.status(500).json({ error: "Failed to fetch my polls." });
    }
};

// ✅ Get all polls the logged-in user has participated in
export const getParticipatedPolls = async (req, res) => {
    try {
        const polls = await Poll.find({ votedBy: req.user.id }).sort({
            createdAt: -1,
        });
        res.status(200).json(polls);
    } catch (error) {
        console.error("Error fetching participated polls:", error);
        res.status(500).json({ error: "Failed to fetch participated polls." });
    }
};