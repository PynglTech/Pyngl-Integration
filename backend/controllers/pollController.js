// import axios from 'axios';
// import Poll from '../models/Poll.js';
// import { handleUpload } from '../config/cloudinary.js'; 
// import FormData from 'form-data';
// import { cloudinary } from '../config/cloudinary.js'; 
// import mongoose from 'mongoose';  
// import Notification from '../models/Notification.js';
// import asyncHandler from '../middleware/asyncHandler.js';
// import GoogleUser from '../models/GoogleUser.js';
// import sendEmail from '../utils/sendEmail.js';

// export const generateImage = async (req, res) => {
//     const { prompt } = req.body;

//     if (!prompt) {
//         return res.status(400).json({ error: "A prompt is required to generate an image." });
//     }
//     if (!process.env.STABILITY_API_KEY) {
//         return res.status(500).json({ error: "API key for image generation is not configured on the server." });
//     }

//     try {
//         const response = await axios.post(
//             "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
//             {
//                 text_prompts: [{ text: prompt }],
//                 cfg_scale: 7, height: 1024, width: 1024,
//                 samples: 1, steps: 30,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//             const imageBase64 = response.data.artifacts[0].base64;
//             const imageUrl = `data:image/png;base64,${imageBase64}`;

//         res.status(200).json({ imageUrl });
//     } catch (error) {
//         console.error("Error generating image:", error.response?.data || error.message);
//         res.status(500).json({ error: "Failed to generate image. Check server logs." });
//     }
// };

// // // ✅ Create a new poll (associates with logged-in user)
// // export const createPoll = async (req, res) => {
// //     const { question, options, type, imageUrl, duration } = req.body;

// //     if (!question || !options?.length || !type) {
// //         return res.status(400).json({ error: "Missing required poll data." });
// //     }

// //     const finalDuration = duration || "24h";
// //     const now = new Date();
// //     const durationHours = parseInt(finalDuration.replace("h", ""));
// //     const expiresAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000);

// //     try {
// //         const poll = new Poll({
// //             question,
// //             options: options.map((opt) => ({ text: opt })),
// //             type,
// //             imageUrl: imageUrl || null,
// //             expiresAt,
// //             author: req.user.id, // Assumes auth middleware provides req.user
// //         });

// //         await poll.save();
// //         res.status(201).json(poll);
// //     } catch (error) {
// //         console.error("Error creating poll:", error);
// //         res.status(500).json({ error: "Failed to save poll." });
// //     }
// // };
// // export const createPoll = async (req, res) => {
// //     const { question, options, type, imageUrl, duration } = req.body;
// //     const authorId = req.user.id;
// //     if (!question || !options?.length || !type) {
// //         return res.status(400).json({ error: "Missing required poll data." });
// //     }

// //     try {
// //         // --- DUPLICATE CHECK ---
// //         // Look for a poll with the same question from the same author in the last minute
// //         const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
// //         const existingPoll = await Poll.findOne({
// //             question: question,
// //             author: authorId,
// //             createdAt: { $gte: oneMinuteAgo }
// //         });

// //         // If a recent, identical poll is found, return that one instead of creating a new one.
// //         if (existingPoll) {
// //             console.log("Duplicate poll found, returning existing one.");
// //             return res.status(200).json(existingPoll);
// //         }

// //         // --- If no duplicate is found, create the new poll as before ---
// //         const finalDuration = duration || "24h";
// //         const now = new Date();
// //         const durationHours = parseInt(finalDuration.replace("h", ""));
// //         const expiresAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000);

// //         const poll = new Poll({
// //             question,
// //             options: options.map((opt) => ({ text: opt })),
// //             type,
// //             imageUrl: imageUrl || null,
// //             expiresAt,
// //             author: authorId,
// //         });

// //          const createdPoll = await poll.save();

// //     // --- NEW NOTIFICATION LOGIC ---
// //     // 2. After saving the poll, create a notification for the author
// //     const notification = new Notification({
// //         user: authorId,
// //         message: `Your poll "${createdPoll.question}" is now live!`,
// //         link: `/poll/${createdPoll._id}`
// //     });
// //     await notification.save();

// //     // 3. Emit a real-time event to the specific user who created the poll
// //     const io = req.app.get('io');
// //     io.to(authorId.toString()).emit('new_notification', notification);
    
// //     res.status(201).json(createdPoll);
// //     } catch (error) {
// //         console.error("Error creating poll:", error);
// //         res.status(500).json({ error: "Failed to save poll." });
// //     }
// // };
// export const createPoll = async (req, res) => {
//     // MERGED: Destructuring new fields from your partner's code
//     const { question, options, type, imageUrl, duration, ageRange, shareToTrending } = req.body;
//     const authorId = req.user.id;

//     if (!question || !options?.length || !type) {
//         return res.status(400).json({ error: "Missing required poll data." });
//     }

//     try {
//         // YOUR DUPLICATE CHECK LOGIC (PRESERVED)
//         const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
//         const existingPoll = await Poll.findOne({
//             question: question,
//             author: authorId,
//             createdAt: { $gte: oneMinuteAgo }
//         });

//         if (existingPoll) {
//             console.log("Duplicate poll found, returning existing one.");
//             return res.status(200).json(existingPoll);
//         }

//         // YOUR DURATION LOGIC (PRESERVED)
//         const finalDuration = duration || "24h";
//         const now = new Date();
//         const durationHours = parseInt(finalDuration.replace("h", ""));
//         const expiresAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000);

//         const poll = new Poll({
//             question,
//             options: options.map((opt) => ({ text: opt })),
//             type,
//             imageUrl: imageUrl || null,
//             expiresAt,
//             author: authorId,
//             // MERGED: Adding new fields from your partner's code
//             ageRange: ageRange || "13-17",
//             shareToTrending: !!shareToTrending,
//         });

//         const createdPoll = await poll.save();

//         // YOUR NOTIFICATION LOGIC (PRESERVED)
//         const notification = new Notification({
//             user: authorId,
//             message: `Your poll "${createdPoll.question}" is now live!`,
//             link: `/poll/${createdPoll._id}`
//         });
//         await notification.save();

//         const io = req.app.get('io');
//         io.to(authorId.toString()).emit('new_notification', notification);

//         res.status(201).json(createdPoll);
//     } catch (error) {
//         console.error("Error creating poll:", error);
//         res.status(500).json({ error: "Failed to save poll." });
//     }
// };
// // ✅ Vote on a poll (requires user to be logged in)
// // export const voteOnPoll = async (req, res) => {
// //     try {
// //         const { pollId } = req.params;
// //         const { optionId } = req.body;
        
// //         // Determine the voter's identity (user ID if logged in, IP address if not)
// //         const isRegisteredUser = !!req.user;
// //         const voterIdentifier = isRegisteredUser ? req.user.id : req.ip;

// //         const poll = await Poll.findById(pollId);
// //         if (!poll) {
// //             return res.status(404).json({ error: "Poll not found." });
// //         }

// //         // --- Check if this user (by ID or IP) has already voted ---
// //         const alreadyVoted = poll.votedBy.some(vote => 
// //             (isRegisteredUser && vote.user?.toString() === voterIdentifier) ||
// //             (!isRegisteredUser && vote.ipAddress === voterIdentifier)
// //         );

// //         if (alreadyVoted) {
// //             return res.status(400).json({ error: "You have already voted on this poll." });
// //         }

// //         // Find the option and increment its vote count
// //         const option = poll.options.id(optionId);
// //         if (option) {
// //             option.votes += 1;
// //         } else {
// //             return res.status(404).json({ error: "Option not found." });
// //         }

// //         // Add the new vote record as a correctly formatted object
// //         const newVote = isRegisteredUser 
// //             ? { user: voterIdentifier } 
// //             : { ipAddress: voterIdentifier };
        
// //         poll.votedBy.push(newVote);

// //         await poll.save();
// //         res.status(200).json(poll);

// //     } catch (error) {
// //         console.error("Error voting on poll:", error);
// //         res.status(500).json({ error: "Server error while voting." });
// //     }
// // };

// // export const voteOnPoll = async (req, res) => {
// //     try {
// //         const { pollId } = req.params;
// //         const { optionId } = req.body;
        
// //         const isRegisteredUser = !!req.user;
// //         const voterIdentifier = isRegisteredUser ? req.user.id : req.ip;

// //         const poll = await Poll.findById(pollId);
// //         if (!poll) {
// //             return res.status(404).json({ error: "Poll not found." });
// //         }

// //         const alreadyVoted = poll.votedBy.some(vote => 
// //             (isRegisteredUser && vote.user?.toString() === voterIdentifier) ||
// //             (!isRegisteredUser && vote.ipAddress === voterIdentifier)
// //         );

// //         if (alreadyVoted) {
// //             return res.status(400).json({ error: "You have already voted on this poll." });
// //         }

// //         const option = poll.options.id(optionId);
// //         if (option) {
// //             option.votes += 1;
// //         } else {
// //             return res.status(404).json({ error: "Option not found." });
// //         }
        
// //         const newVote = isRegisteredUser 
// //             ? { user: voterIdentifier } 
// //             : { ipAddress: voterIdentifier };
        
// //         poll.votedBy.push(newVote);

// //         const updatedPoll = await poll.save();

// //         // --- THIS IS THE NEW REAL-TIME LOGIC ---
// //         // 1. Get the Socket.IO instance that we attached to the app in server.js
// //         const io = req.app.get('io');
        
// //         // 2. Emit a 'poll-update' event specifically for this poll's "room"
// //         //    This sends the new poll data to every client currently on this poll's page.
// //         io.emit(`poll-update-${pollId}`, updatedPoll);
        
// //         // 3. Send the response back to the person who voted, as before.
// //         res.status(200).json(updatedPoll);

// //     } catch (error) {
// //         console.error("Error voting on poll:", error);
// //         res.status(500).json({ error: "Server error while voting." });
// //     }
// // };
// export const voteOnPoll = async (req, res) => {
//     try {
//         const { pollId } = req.params;
//         const { optionId } = req.body;
        
//         // YOUR SUPERIOR LOGIC for registered vs. anonymous users (PRESERVED)
//         const isRegisteredUser = !!req.user;
//         const voterIdentifier = isRegisteredUser ? req.user.id : req.ip;

//         const poll = await Poll.findById(pollId);
//         if (!poll) {
//             return res.status(404).json({ error: "Poll not found." });
//         }

//         const alreadyVoted = poll.votedBy.some(vote =>
//             (isRegisteredUser && vote.user?.toString() === voterIdentifier) ||
//             (!isRegisteredUser && vote.ipAddress === voterIdentifier)
//         );

//         if (alreadyVoted) {
//             return res.status(400).json({ error: "You have already voted on this poll." });
//         }

//         const option = poll.options.id(optionId);
//         if (option) {
//             option.votes += 1;
//         } else {
//             return res.status(404).json({ error: "Option not found." });
//         }
        
//         const newVote = isRegisteredUser ? { user: voterIdentifier } : { ipAddress: voterIdentifier };
//         poll.votedBy.push(newVote);

//         // --- MERGED: Adding analytics tracking from your partner's code ---
//         const { platform, browser, timeSpent } = req.body;
//         poll.totalVotes += 1;
//         poll.totalTimeSpent += timeSpent || 0;

//         // Only add user-specific metadata if they are a registered user
//         if (isRegisteredUser) {
//              poll.votersMeta.push({
//                 user: req.user.id,
//                 platform,
//                 browser,
//                 timeSpent,
//              });
//         }
//         // --- End of analytics tracking ---

//         const updatedPoll = await poll.save();

//         // YOUR REAL-TIME UPDATE LOGIC (PRESERVED)
//         const io = req.app.get('io');
//         io.to(pollId).emit('poll_update', updatedPoll); // Changed event name for clarity
        
//         res.status(200).json(updatedPoll);

//     } catch (error) {
//         console.error("Error voting on poll:", error);
//         res.status(500).json({ error: "Server error while voting." });
//     }
// };
import axios from 'axios';
import Poll from '../models/Poll.js';
import Notification from '../models/Notification.js';
import GoogleUser from '../models/GoogleUser.js'; // NEW: Imported for Gmail AMP feature
import { cloudinary } from '../config/cloudinary.js';
import sendEmail from '../utils/sendEmail.js';
import cron from 'node-cron'; // NEW: Imported for scheduler
import User from '../models/User.js';
// @desc    Generate an image using Stability AI
// @route   POST /api/polls/generate-image
export const generateImage = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: "A prompt is required to generate an image." });
    }
    if (!process.env.STABILITY_API_KEY) {
        return res.status(500).json({ error: "API key for image generation is not configured." });
    }
    try {
        const response = await axios.post(/* ... Stability AI API call ... */);
        const imageBase64 = response.data.artifacts[0].base64;
        const imageUrl = `data:image/png;base64,${imageBase64}`;
        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error("Error generating image:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate image." });
    }
};

// @desc    Create a new poll
// @route   POST /api/polls/create-poll
export const createPoll = async (req, res) => {
    const { question, options, type, imageUrl, duration, ageRange, shareToTrending } = req.body;
    const authorId = req.user.id;
    if (!question || !options?.length || !type) {
        return res.status(400).json({ error: "Missing required poll data." });
    }
    try {
        // Your superior duplicate check logic is preserved
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        const existingPoll = await Poll.findOne({ question, author: authorId, createdAt: { $gte: oneMinuteAgo } });
        if (existingPoll) {
            return res.status(200).json(existingPoll);
        }

        const finalDuration = duration || "24h";
        const now = new Date();
        const durationHours = parseInt(finalDuration.replace("h", ""));
        const expiresAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000);

        const poll = new Poll({
            question,
            options: options.map((opt) => ({ text: opt })),
            type,
            imageUrl: imageUrl || null,
            expiresAt,
            author: authorId,
            ageRange: ageRange || "13-17",
            shareToTrending: !!shareToTrending,
        });
        const createdPoll = await poll.save();

        // Your real-time notification logic is preserved
        const notification = new Notification({
            user: authorId,
            message: `Your poll "${createdPoll.question}" is now live!`,
            link: `/poll/${createdPoll._id}`
        });
        await notification.save();
        const io = req.app.get('io');
        io.to(authorId.toString()).emit('new_notification', notification);

        res.status(201).json(createdPoll);
    } catch (error) {
        console.error("Error creating poll:", error);
        res.status(500).json({ error: "Failed to save poll." });
    }
};

// @desc    Vote on a poll
// @route   POST /api/polls/:pollId/vote
export const voteOnPoll = async (req, res) => {
    try {
        const { pollId } = req.params;
        const { optionId, platform, browser, timeSpent } = req.body;
        
        // Your superior logic for registered vs. anonymous users is preserved
        const isRegisteredUser = !!req.user;
        const voterIdentifier = isRegisteredUser ? req.user.id : req.ip;

        const poll = await Poll.findById(pollId);
        if (!poll) return res.status(404).json({ error: "Poll not found." });

        const alreadyVoted = poll.votedBy.some(vote =>
            (isRegisteredUser && vote.user?.toString() === voterIdentifier) ||
            (!isRegisteredUser && vote.ipAddress === voterIdentifier)
        );
        if (alreadyVoted) return res.status(400).json({ error: "You have already voted on this poll." });

        const option = poll.options.id(optionId);
        if (option) {
            option.votes += 1;
        } else {
            return res.status(404).json({ error: "Option not found." });
        }
        
        const newVote = isRegisteredUser ? { user: voterIdentifier } : { ipAddress: voterIdentifier };
        poll.votedBy.push(newVote);

        // MERGED: Adding analytics tracking
        poll.totalVotes += 1;
        poll.totalTimeSpent += timeSpent || 0;
        if (isRegisteredUser) {
            poll.votersMeta.push({ user: req.user.id, platform, browser, timeSpent });
        }

        const updatedPoll = await poll.save();

        // Your real-time update logic is preserved
        const io = req.app.get('io');
        io.to(pollId).emit('poll_update', updatedPoll);
        
        res.status(200).json(updatedPoll);
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
// export const getPollById = async (req, res) => {
//     try {
//         const poll = await Poll.findById(req.params.pollId); // Assuming route is /:pollId
//         if (!poll) {
//             return res.status(404).json({ error: "Poll not found" });
//         }
//         res.status(200).json(poll);
//     } catch (error) {
//         console.error("Error fetching poll:", error.message);
//         res.status(500).json({ error: "Failed to fetch poll" });
//     }
// };
// export const getPollById = async (req, res) => {
//     try {
//         const poll = await Poll.findById(req.params.pollId);
//         if (!poll) {
//             return res.status(404).json({ error: "Poll not found" });
//         }

//         // --- NEW LOGIC ---
//         // Determine if the current visitor (logged-in or anonymous) has already voted
//         let currentUserHasVoted = false;
//         const isRegisteredUser = !!req.user;
//         const voterIdentifier = isRegisteredUser ? req.user.id : req.ip;

//         if (voterIdentifier) {
//             currentUserHasVoted = poll.votedBy.some(vote => 
//                 (isRegisteredUser && vote.user?.toString() === voterIdentifier) ||
//                 (!isRegisteredUser && vote.ipAddress === voterIdentifier)
//             );
//         }

//         // Convert the Mongoose document to a plain object to add the new property
//         const pollObject = poll.toObject();
//         pollObject.currentUserHasVoted = currentUserHasVoted;

//         res.status(200).json(pollObject);

//     } catch (error) {
//         console.error("Error fetching poll:", error.message);
//         res.status(500).json({ error: "Failed to fetch poll" });
//     }
// };
// export const getPollById = async (req, res) => {
//     try {
//         const poll = await Poll.findById(req.params.pollId);
//         if (!poll) {
//             return res.status(404).json({ error: "Poll not found" });
//         }

//         // --- NEW LOGIC ---
//         const now = new Date();
//         const isExpired = poll.expiresAt < now;

//         let currentUserHasVoted = false;
//         const isRegisteredUser = !!req.user;
//         const voterIdentifier = isRegisteredUser ? req.user.id : req.ip;

//         if (voterIdentifier) {
//             currentUserHasVoted = poll.votedBy.some(vote => 
//                 (isRegisteredUser && vote.user?.toString() === voterIdentifier) ||
//                 (!isRegisteredUser && vote.ipAddress === voterIdentifier)
//             );
//         }

//         const pollObject = poll.toObject();
//         pollObject.currentUserHasVoted = currentUserHasVoted;
//         pollObject.isExpired = isExpired; // Add the expiration status to the response

//         res.status(200).json(pollObject);

//     } catch (error) {
//         console.error("Error fetching poll:", error.message);
//         res.status(500).json({ error: "Failed to fetch poll" });
//     }
// };

// @desc    Get a single poll by its ID
// @route   GET /api/polls/:pollId
export const getPollById = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.pollId);
        if (!poll) return res.status(404).json({ error: "Poll not found" });

        // MERGED: View tracking is included
        poll.views += 1;
        await poll.save();

        // Your superior logic for checking vote status is preserved
        const now = new Date();
        const isExpired = poll.expiresAt < now;
        let currentUserHasVoted = false;
        const isRegisteredUser = !!req.user;
        const voterIdentifier = isRegisteredUser ? req.user.id : req.ip;

        if (voterIdentifier) {
            currentUserHasVoted = poll.votedBy.some(vote =>
                (isRegisteredUser && vote.user?.toString() === voterIdentifier) ||
                (!isRegisteredUser && vote.ipAddress === voterIdentifier)
            );
        }

        const pollObject = poll.toObject();
        pollObject.currentUserHasVoted = currentUserHasVoted;
        pollObject.isExpired = isExpired;

        res.status(200).json(pollObject);
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
        // FIXED: The query now correctly checks the 'user' field inside the 'votedBy' array of objects.
        const polls = await Poll.find({ 'votedBy.user': req.user.id }).sort({
            createdAt: -1,
        });
        res.status(200).json(polls);
    } catch (error) {
        console.error("Error fetching participated polls:", error);
        res.status(500).json({ error: "Failed to fetch participated polls." });
    }
};
// export const addSharedPlatform = async (req, res) => {
//   const { platform } = req.body;
//   const pollId = req.params;

//   if (!platform) {
//     return res.status(400).json({ message: "Platform is required" });
//   }

//   try {
//     const poll = await Poll.findById(pollId);
//     if (!poll) return res.status(404).json({ message: "Poll not found" });

//     // Initialize array if doesn't exist
//     if (!poll.sharedPlatforms) poll.sharedPlatforms = [];

//     // Add platform if not already shared
//     if (!poll.sharedPlatforms.includes(platform)) {
//       poll.sharedPlatforms.push(platform);
//       await poll.save();
//     }

//     res.json({ success: true, poll });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
export const addSharedPlatform = async (req, res) => {
  const { platform } = req.body;
  // --- THIS IS THE FIX ---
  const { pollId } = req.params; // Changed from req.params.id to req.params.pollId

  if (!platform) {
    return res.status(400).json({ message: "Platform is required" });
  }

  try {
    // Using findOneAndUpdate with $addToSet is more efficient
    // It finds the poll and adds the platform only if it's not already in the array
    const updatedPoll = await Poll.findOneAndUpdate(
        { _id: pollId },
        { $addToSet: { sharedPlatforms: platform.toLowerCase() } }, // $addToSet prevents duplicates
        { new: true } // This option returns the updated document
    );

    if (!updatedPoll) {
        return res.status(404).json({ message: "Poll not found" });
    }

    // Return the full updated poll object
    res.status(200).json(updatedPoll);

  } catch (err) {
    console.error("Error in addSharedPlatform:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const getAgeRangeBounds = (rangeString) => {
    if (rangeString.includes('+')) {
        return { min: parseInt(rangeString, 10), max: Infinity };
    }
    const [min, max] = rangeString.split('-').map(Number);
    return { min, max };
};
// export const getTrendingPolls = async (req, res) => {

//     try {
//         // 1. Get the current logged-in user's ID and age
//         const userId = req.user._id;
//         const user = await User.findById(userId);

//         if (!user || typeof user.age === 'undefined') {
//             // If user has no age, only show them polls with no age restrictions
//             const publicPolls = await Poll.find({
//                 shareToTrending: true,
//                 ageRange: { $exists: false }, // Polls where ageRange is not set
//                 author: { $ne: userId } // Don't show users their own polls on the trending page
//             }).sort({ createdAt: -1 });
//             return res.status(200).json(publicPolls);
//         }

//         const userAge = user.age;
        
//         // 2. Build the query to find polls based on the user's age
//         const polls = await Poll.find({
//             shareToTrending: true, // The poll must be marked for trending
//             author: { $ne: userId }, // Don't show the user their own polls
//             $or: [
//                 { ageRange: { $exists: false } }, // Option A: Poll has NO age range (public for all)
//                 { ageRange: "13-17", $and: [{ $expr: { $gte: [userAge, 13] } }, { $expr: { $lte: [userAge, 17] } }] },
//                 { ageRange: "18-24", $and: [{ $expr: { $gte: [userAge, 18] } }, { $expr: { $lte: [userAge, 24] } }] },
//                 { ageRange: "25-34", $and: [{ $expr: { $gte: [userAge, 25] } }, { $expr: { $lte: [userAge, 34] } }] },
//                 { ageRange: "35-44", $and: [{ $expr: { $gte: [userAge, 35] } }, { $expr: { $lte: [userAge, 44] } }] },
//                 { ageRange: "45+", $expr: { $gte: [userAge, 45] } }
//             ]
//         }).sort({ createdAt: -1 });

//         res.status(200).json(polls);

//     } catch (error) {
//         console.error("Error fetching trending polls:", error.message);
//         res.status(500).json({ error: "Failed to fetch trending polls" });
//     }
// };
export const getTrendingPolls = async (req, res) => {
    try {
        // 1. Get the current logged-in user and their age
        const user = await User.findById(req.user._id);

        // If the user has no birthdate set, they can't see age-targeted polls
        if (!user || typeof user.age === 'undefined') {
            const publicPolls = await Poll.find({
                shareToTrending: true,
                ageRange: { $exists: false }, // Only polls with no age range
                author: { $ne: req.user._id } // Don't show users their own polls
            }).sort({ createdAt: -1 });
            return res.status(200).json(publicPolls);
        }

        const userAge = user.age;

        // 2. Fetch all potential trending polls (excluding the user's own)
        const allTrendingPolls = await Poll.find({
            shareToTrending: true,
            author: { $ne: req.user._id }
        }).sort({ createdAt: -1 });

        // 3. Filter the polls in your application based on the user's age
        const filteredPolls = allTrendingPolls.filter(poll => {
            // If the poll has no ageRange, everyone can see it
            if (!poll.ageRange) {
                return true;
            }
            
            // If it has an ageRange, check if the user's age fits
            const { min, max } = getAgeRangeBounds(poll.ageRange);
            return userAge >= min && userAge <= max;
        });

        res.status(200).json(filteredPolls);

    } catch (error) {
        console.error("Error fetching trending polls:", error.message);
        res.status(500).json({ error: "Failed to fetch trending polls" });
    }
};

export const trackClick = async (req, res) => {
  const { pollId } = req.params;
  try {
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ msg: "Poll not found" });

    poll.clicks += 1;
    await poll.save();

    res.json({ success: true, clicks: poll.clicks });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
export const getPollAnalytics = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.pollId);
        if (!poll) return res.status(404).json({ msg: "Poll not found" });

        const responseRate = poll.views > 0 ? (poll.totalVotes / poll.views) * 100 : 0;
        const avgTime = poll.totalVotes > 0 ? poll.totalTimeSpent / poll.totalVotes : 0;
        
        const platformStats = {};
        poll.votersMeta.forEach(v => { platformStats[v.platform] = (platformStats[v.platform] || 0) + 1; });
        
        const browserStats = {};
        poll.votersMeta.forEach(v => { browserStats[v.browser] = (browserStats[v.browser] || 0) + 1; });

        res.json({
            question: poll.question,
            views: poll.views,
            totalVotes: poll.totalVotes,
            responseRate: `${responseRate.toFixed(2)}%`,
            avgTime: `${avgTime.toFixed(1)}s`,
            platformBreakdown: platformStats,
            browserBreakdown: browserStats,
        });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
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
export const generateShareableImage = async (req, res) => {
    try {
        const { pollId } = req.params;
        const poll = await Poll.findById(pollId);

        if (!poll || poll.type !== 'image' || !poll.imageUrl) {
            return res.status(404).json({ error: "Valid image poll not found." });
        }

        // --- 1. Extract the Public ID of the main poll image ---
        const imagePublicId = poll.imageUrl.substring(poll.imageUrl.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, "");

        // --- 2. Define the QR Code Overlay ---
        const pollLink = `${process.env.FRONTEND_URL}/poll/${pollId}`;
        const qrCodeOverlay = `l_qrcode:${encodeURIComponent(pollLink)},w_300,h_300,r_20`;
        
        // --- 3. Build the full transformation string ---
        const transformations = [
            { width: 1080, height: 1920, crop: "fill", background: "rgb:1F2937" }, // Base canvas (Story format)
            { overlay: imagePublicId, width: 1080, height: 1350, crop: "fill", gravity: "north" }, // Main poll image
            { overlay: { text: "Scan to Vote!", font_family: "Inter", font_size: 48, font_weight: "bold" }, color: "#FFFFFF", gravity: "south", y: 150 },
            { overlay: qrCodeOverlay, gravity: "south", y: 220 }, // Position the QR code
            { overlay: 'pyngl_logo', width: 200, gravity: "south", y: 50 } // Your logo
        ];

        // --- 4. Generate the final, secure URL ---
        const finalImageUrl = cloudinary.url(imagePublicId, {
            transformation: transformations,
            sign_url: true // IMPORTANT: This creates a secure, signed URL
        });

        res.status(200).json({ shareableImageUrl: finalImageUrl });

    } catch (error) {
        console.error("Error generating shareable image:", error);
        res.status(500).json({ error: "Failed to generate shareable image." });
    }
};
const SOURCE_ORIGIN = process.env.FRONTEND_URL || 'https://localhost:5173';

export const sendGmailPoll = async (req, res) => {
    try {
        const { userEmail, recipients, pollId } = req.body;
        const user = await GoogleUser.findOne({ email: userEmail });
        if (!user) return res.status(404).send("User not found");

        const poll = await Poll.findById(pollId);
        if (!poll) return res.status(404).send("Poll not found");

        const emails = recipients.map(r => (typeof r === "string" ? r : r.email)).filter(Boolean);
        if (emails.length === 0) return res.status(400).send("No valid recipient emails provided");

        await Promise.all(emails.map(email => sendEmail(user, email, poll)));
        res.send("Poll sent via Gmail!");
    } catch (err) {
        res.status(500).send("Error sending email");
    }
};
export const voteFromGmail = async (req, res) => {
    const { pollId, opt } = req.body;
    try {
        const poll = await Poll.findById(pollId);
        if (!poll) return res.status(404).json({ msg: "Poll not found" });

        const option = poll.options.find(o => o.text === opt);
        if (!option) return res.status(400).json({ msg: "Invalid option" });

        option.votes += 1;
        await poll.save();

        const total = poll.options.reduce((sum, o) => sum + o.votes, 0) || 1;
        const options = poll.options.map(o => ({
            text: o.text,
            votes: o.votes,
            pct: Math.round((o.votes / total) * 100),
        }));
        
        res.set("Access-Control-Allow-Origin", "https://mail.google.com");
        res.set("AMP-Access-Control-Allow-Source-Origin", SOURCE_ORIGIN);
        res.set("Access-Control-Expose-Headers", "AMP-Access-Control-Allow-Source-Origin");
        res.json({ options });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

export const initScheduledJobs = (io) => {
    // This cron job is scheduled to run once every hour, at the top of the hour.
    cron.schedule('0 * * * *', async () => {
        console.log('Running hourly check for expiring polls...');
        
        const now = new Date();
        const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        try {
            // Find polls that are:
            // 1. Not yet expired.
            // 2. Expiring within the next 24 hours.
            // 3. Haven't had an "ending soon" notification sent yet.
            const expiringPolls = await Poll.find({
                expiresAt: { $gt: now, $lte: twentyFourHoursFromNow },
                endingSoonNotified: false
            });

            if (expiringPolls.length > 0) {
                console.log(`Found ${expiringPolls.length} poll(s) ending soon.`);
            }

            // Process each expiring poll
            for (const poll of expiringPolls) {
                // Create a new notification for the poll's author
                const notification = new Notification({
                    user: poll.author,
                    message: `Your poll "${poll.question}" is ending soon! See the final results.`,
                    link: `/poll/${poll._id}`
                });
                await notification.save();

                // Emit a real-time event to the specific user's socket "room"
                io.to(poll.author.toString()).emit('new_notification', notification);

                // Update the poll to mark that the notification has been sent
                poll.endingSoonNotified = true;
                await poll.save();
            }

        } catch (error) {
            console.error("Error in scheduled job for expiring polls:", error);
        }
    });

   console.log('✅ Notification scheduler has been initialized.');
};