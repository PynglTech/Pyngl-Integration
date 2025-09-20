import axios from 'axios';
import Poll from '../models/Poll.js';
import { handleUpload } from '../config/cloudinary.js'; 
import FormData from 'form-data';
import { cloudinary } from '../config/cloudinary.js';
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
export const generateBrandedVariant = (masterImageSrc, logoSrc, options) => {
    return new Promise((resolve, reject) => {
        const masterImage = new Image();
        const logoImage = new Image();
        
        masterImage.crossOrigin = "Anonymous";
        logoImage.crossOrigin = "Anonymous";

        let loadedCount = 0;
        const onImageLoad = () => {
            loadedCount++;
            if (loadedCount === 2) {
                const canvas = document.createElement('canvas');
                canvas.width = options.width;
                canvas.height = options.height;
                const ctx = canvas.getContext('2d');

                // --- Smart Center-Crop Logic ---
                const masterRatio = masterImage.width / masterImage.height;
                const targetRatio = options.width / options.height;
                let sourceX = 0, sourceY = 0, sourceWidth = masterImage.width, sourceHeight = masterImage.height;

                if (masterRatio > targetRatio) { // Master is wider than target
                    sourceWidth = masterImage.height * targetRatio;
                    sourceX = (masterImage.width - sourceWidth) / 2;
                } else { // Master is taller than target
                    sourceHeight = masterImage.width / targetRatio;
                    sourceY = (masterImage.height - sourceHeight) / 2;
                }
                
                ctx.drawImage(masterImage, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, options.width, options.height);
                
                // --- Branding Overlay Logic ---
                const logoMargin = 40; // 40px margin from the edges
                const logoWidth = canvas.width * 0.15; // Logo is 15% of the banner width
                const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
                ctx.drawImage(logoImage, canvas.width - logoWidth - logoMargin, canvas.height - logoHeight - logoMargin, logoWidth, logoHeight);
                
                // Convert canvas to a File object
                canvas.toBlob((blob) => {
                    const newFile = new File([blob], `pyngl_share_${options.width}x${options.height}.jpg`, { type: 'image/jpeg' });
                    resolve(newFile);
                }, 'image/jpeg', 0.92); // High-quality JPEG
            }
        };

        masterImage.onload = onImageLoad;
        logoImage.onload = onImageLoad;
        masterImage.onerror = reject;
        logoImage.onerror = reject;

        masterImage.src = masterImageSrc;
        logoImage.src = logoSrc;
    });
};
export const uploadImage = async (req, res) => {
    try {
        // The 'upload' middleware from cloudinary.js has already done the hard work.
        // If the upload failed, it would have already sent an error.
        // If it succeeds, the file details are now available in req.file.
        if (!req.file) {
            return res.status(400).json({ error: "No image file was provided." });
        }
        
        // Send the secure URL and public ID back to the frontend.
        res.status(200).json({
            message: "Image uploaded successfully!",
            imageUrl: req.file.path,
            imagePublicId: req.file.filename 
            // The focal point detection from the microservice would be added here if needed.
        });

    } catch (error) {
        console.error("Error in uploadImage controller:", error);
        res.status(500).json({ error: "Server error during image upload." });
    }
};



// export const generatePollCard = async (req, res) => {
//     try {
//         const { pollId } = req.params;
//         const poll = await Poll.findById(pollId);

//         if (!poll) {
//             return res.status(404).json({ error: "Poll not found." });
//         }

//         // --- Start with a clean transformations array ---
//         const transformations = [];

//         // --- Add the Poll Question as a text overlay ---
//         // This uses Cloudinary's text overlay feature
//         transformations.push({
//             overlay: { 
//                 font_family: "Arial", 
//                 font_size: 60, 
//                 font_weight: "bold", 
//                 text: poll.question 
//             },
//             color: "#FFFFFF",
//             gravity: "north",
//             y: 100 // 100 pixels from the top
//         });
        
//         // --- Add each Poll Option as a text overlay ---
//         poll.options.forEach((option, index) => {
//             const yOffset = 250 + (index * 70); // Stagger the options vertically
//             transformations.push({
//                 overlay: { 
//                     font_family: "Arial", 
//                     font_size: 48, 
//                     text: `- ${option.text}` 
//                 },
//                 color: "#FFFFFF",
//                 gravity: "center",
//                 y: yOffset
//             });
//         });

//         // --- Add your logo as a final overlay ---
//         transformations.push({
//             overlay: 'pyngl_logo', // Assumes your logo has the Public ID 'pyngl_logo'
//             width: "0.15", // 15% of the image width
//             gravity: "south_east",
//             x: 40, // 40px margin from the right
//             y: 40, // 40px margin from the bottom
//             opacity: 90,
//             flags: "relative"
//         });

//         // --- Generate the Final URL ---
//         // This starts with a blank canvas and applies all the transformations
//         const pollCardUrl = cloudinary.url('transparent_base', {
//             transformation: [
//                 { width: 1080, height: 1080, crop: "fill", background: "rgb:1a202c", radius: 20 },
//                 ...transformations
//             ],
//             secure: true 
//         });

//         res.status(200).json({ pollCardUrl });

//     } catch (error) {
//         console.error("----------- ERROR GENERATING POLL CARD -----------");
//         console.error("Poll ID:", req.params.pollId);
//         console.error("Caught Error:", error);
//         console.error("-------------------------------------------------");
//         res.status(500).json({ error: "Failed to generate poll card image." });
//     }
// };
export const generatePollCard = async (req, res) => {
    try {
        const { pollId } = req.params;
        const poll = await Poll.findById(pollId);

        if (!poll) {
            return res.status(404).json({ error: "Poll not found." });
        }

        const transformations = [];

        // Add question text
        transformations.push({
            overlay: { 
                font_family: "Arial", 
                font_size: 60, 
                font_weight: "bold", 
                text: poll.question 
            },
            color: "#FFFFFF",
            gravity: "north",
            y: 100
        });
        
        // Add image if it exists
        if (poll.type === 'image' && poll.imageUrl) {
            const uploadStr = '/upload/';
            const afterUpload = poll.imageUrl.substring(poll.imageUrl.indexOf(uploadStr) + uploadStr.length);
            let publicId = afterUpload.replace(/v\d+\//, '').replace(/\.[^/.]+$/, '');
            publicId = publicId.replace(/\//g, ':');
            
            transformations.push({
                overlay: { public_id: publicId },
                width: 800, 
                height: 450, 
                crop: "fill", 
                gravity: "center", 
                y: -50,
                radius: 20
            });
        }
        
        // Add each Poll Option as a text overlay
        poll.options.forEach((option, index) => {
            const yOffset = poll.type === 'image' ? 250 + (index * 60) : 200 + (index * 70);
            transformations.push({
                overlay: { 
                    font_family: "Arial", 
                    font_size: 48, 
                    text: `- ${option.text}` 
                },
                color: "#FFFFFF",
                gravity: "center",
                y: yOffset
            });
        });

        // Add your logo as a final overlay
        transformations.push({
            overlay: 'pyngl_logo', // Assumes a 'pyngl_logo' Public ID exists
            width: "0.15",
            gravity: "south_east",
            x: 40,
            y: 40,
            opacity: 90,
            flags: "relative"
        });

        // --- THIS IS THE FIX ---
        // The function now looks for your base image inside the correct folder.
        const baseImagePublicId = 'uploads/pyngl/transparent_base';

        const pollCardUrl = cloudinary.url(baseImagePublicId, {
            transformation: [
                { width: 1080, height: 1080, crop: "fill", background: "rgb:1a202c", radius: 20 },
                ...transformations
            ],
            secure: true 
        });

        res.status(200).json({ pollCardUrl });

    } catch (error) {
        console.error("----------- ERROR GENERATING POLL CARD -----------");
        console.error("Poll ID:", req.params.pollId);
        console.error("Caught Error:", error);
        console.error("-------------------------------------------------");
        res.status(500).json({ error: "Failed to generate poll card image." });
    }
};