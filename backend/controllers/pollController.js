import axios from "axios";
import Poll from "../models/Poll.js";
import Notification from "../models/Notification.js";
import GoogleUser from "../models/GoogleUser.js"; // NEW: Imported for Gmail AMP feature
import { cloudinary } from "../config/cloudinary.js";
import sendEmail from "../utils/sendEmail.js";
import cron from "node-cron"; // NEW: Imported for scheduler
import User from "../models/User.js";
import { sendWhatsappMessage } from "../utils/whatsappService.js";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";


// @desc    Generate an image using Stability AI
// @route   POST /api/polls/generate-image
export const generateImage = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res
      .status(400)
      .json({ error: "A prompt is required to generate an image." });
  }
  if (!process.env.STABILITY_API_KEY) {
    return res
      .status(500)
      .json({ error: "API key for image generation is not configured." });
  }
  try {
    const response = await axios.post(/* ... Stability AI API call ... */);
    const imageBase64 = response.data.artifacts[0].base64;
    const imageUrl = `data:image/png;base64,${imageBase64}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(
      "Error generating image:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to generate image." });
  }
};

// @desc    Create a new poll
// @route   POST /api/polls/create-poll
export const createPoll = async (req, res) => {
  const {
    question,
    options,
    type,
    imageUrl,
    duration,
    ageRange,
    shareToTrending,
  } = req.body;
  const authorId = req.user.id;
  if (!question || !options?.length || !type) {
    return res.status(400).json({ error: "Missing required poll data." });
  }
  try {
    // Your superior duplicate check logic is preserved
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const existingPoll = await Poll.findOne({
      question,
      author: authorId,
      createdAt: { $gte: oneMinuteAgo },
    });
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
      link: `/poll/${createdPoll._id}`,
    });
    await notification.save();
    const io = req.app.get("io");
    io.to(authorId.toString()).emit("new_notification", notification);

    res.status(201).json(createdPoll);
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ error: "Failed to save poll." });
  }
};

// export const voteOnPoll = async (req, res) => {
//     try {
//         const { pollId } = req.params;
//         const { optionId, platform, browser, device, timeSpent } = req.body;

//         const isRegisteredUser = !!req.user;
//         const voterIdentifier = isRegisteredUser ? req.user.id : req.ip;

//         const poll = await Poll.findById(pollId);
//         if (!poll) return res.status(404).json({ error: "Poll not found." });

//         // Your robust check for existing voters is preserved
//         const alreadyVoted = poll.votedBy.some(vote =>
//             (isRegisteredUser && vote.user?.toString() === voterIdentifier) ||
//             (!isRegisteredUser && vote.ipAddress === voterIdentifier)
//         );
//         if (alreadyVoted) return res.status(400).json({ error: "You have already voted on this poll." });

//         const option = poll.options.id(optionId);
//         if (option) {
//             option.votes += 1;
//         } else {
//             return res.status(404).json({ error: "Option not found." });
//         }

//         const newVote = isRegisteredUser ? { user: voterIdentifier } : { ipAddress: voterIdentifier };
//         poll.votedBy.push(newVote);

//         // --- THIS IS THE UPDATE ---
//         poll.totalVotes += 1;
//         poll.totalTimeSpent += timeSpent || 0;

//         // Save analytics metadata regardless of whether user is logged in
//         if (isRegisteredUser) {
//             poll.votersMeta.push({ user: req.user.id, platform, browser, device, timeSpent });
//         } else {
//             // NEW: Also save analytics for anonymous users (without the user ID)
//             poll.votersMeta.push({ platform, browser, device, timeSpent });
//         }
//         // --- End of Update ---

//         const updatedPoll = await poll.save();
//         const io = req.app.get('io');
//         io.to(pollId).emit('poll_update', updatedPoll);

//         res.status(200).json(updatedPoll);
//     } catch (error) {
//         console.error("Error voting on poll:", error);
//         res.status(500).json({ error: "Server error while voting." });
//     }
// };
export const voteOnPoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { optionId, platform, browser, device, timeSpent } = req.body;

    const isRegisteredUser = !!req.user;
    const voterIdentifier = isRegisteredUser ? req.user.id : req.ip;

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: "Poll not found." });

    const alreadyVoted = poll.votedBy.some(
      (vote) =>
        (isRegisteredUser && vote.user?.toString() === voterIdentifier) ||
        (!isRegisteredUser && vote.ipAddress === voterIdentifier)
    );
    if (alreadyVoted)
      return res
        .status(400)
        .json({ error: "You have already voted on this poll." });

    const option = poll.options.id(optionId);
    if (!option) return res.status(404).json({ error: "Option not found." });

    option.votes += 1;

    const newVote = isRegisteredUser
      ? { user: voterIdentifier }
      : { ipAddress: voterIdentifier };
    poll.votedBy.push(newVote);
    poll.totalVotes += 1;
    poll.totalTimeSpent += timeSpent || 0;

    poll.votersMeta.push({
      user: isRegisteredUser ? req.user.id : undefined,
      platform,
      browser,
      device,
      timeSpent,
      votedAt: new Date(), // Preserved from your original logic
    });

    const updatedPoll = await poll.save();
    const io = req.app.get("io");
    io.to(pollId).emit("poll_update", updatedPoll);

    res.status(200).json(updatedPoll);
  } catch (error) {
    console.error("Error voting on poll:", error);
    res.status(500).json({ error: "Server error while voting." });
  }
};
export const getLast5Polls = async (req, res) => {
  try {
    const userId = req.user.id; // added by auth middleware

    const polls = await Poll.find({ author: userId })
      .sort({ createdAt: -1 }) // newest first
      .limit(5)
      .select("-votedBy -votersMeta"); // optional: exclude large arrays

    res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching last 5 polls:", error);
    res.status(500).json({ message: "Failed to fetch last polls" });
  }
};
export const resultsPoll = async (req, res) => {
  const { pollId } = req.query;

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ msg: "Poll not found" });

    const total = poll.options.reduce((sum, o) => sum + o.votes, 0) || 1;
    const options = poll.options.map((o) => ({
      text: o.text,
      votes: o.votes,
      pct: Math.round((o.votes / total) * 100),
    }));

    res.set("Access-Control-Allow-Origin", "https://mail.google.com");
    res.set("AMP-Access-Control-Allow-Source-Origin", SOURCE_ORIGIN);
    res.set(
      "Access-Control-Expose-Headers",
      "AMP-Access-Control-Allow-Source-Origin"
    );

    res.json({ options });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
// Get all polls for the Trending page
export const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find({}).sort({ createdAt: -1 });
    res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching all polls:", error.message);
    res.status(500).json({ error: "Failed to fetch polls" });
  }
};

// Get only live (not expired) polls for the Homepage
// export const getLivePolls = async (req, res) => {
//     try {
//         const now = new Date();
//         const polls = await Poll.find({ expiresAt: { $gt: now } }).sort({
//             createdAt: -1,
//         });
//         res.status(200).json(polls);
//     } catch (error) {
//         console.error("Error fetching live polls:", error.message);
//         res.status(500).json({ error: "Failed to fetch live polls" });
//     }
// };
export const getLivePolls = async (req, res) => {
  try {
    const now = new Date();
    const polls = await Poll.find({ expiresAt: { $gt: now } })
      .sort({ createdAt: -1 })
      // 1. Only select the data needed for the list view
      .select("question options imageUrl expiresAt author totalVotes")
      // 2. Use lean() for a significant speed boost on read-only queries
      .lean();

    res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching live polls:", error.message);
    res.status(500).json({ error: "Failed to fetch live polls" });
  }
};
export const getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    // NEW: Advanced logic for tracking unique views
    const userId = req.user?._id;
    const ipAddress = req.ip;
    const viewerIdentifier = userId || ipAddress;

    // Only increment view count if this user/IP hasn't viewed it before
    if (!poll.viewedBy.includes(viewerIdentifier)) {
      poll.viewedBy.push(viewerIdentifier);
      await poll.save();
    }

    // Your logic for checking vote status is preserved
    const now = new Date();
    const isExpired = poll.expiresAt < now;
    let currentUserHasVoted = false;

    if (userId || ipAddress) {
      currentUserHasVoted = poll.votedBy.some(
        (vote) =>
          (userId && vote.user?.toString() === userId) ||
          (!userId && vote.ipAddress === ipAddress)
      );
    }

    const pollObject = poll.toObject();
    pollObject.currentUserHasVoted = currentUserHasVoted;
    pollObject.isExpired = isExpired;
    pollObject.views = poll.viewedBy.length; // Return the accurate unique view count

    res.status(200).json(pollObject);
  } catch (error) {
    console.error("Error fetching poll:", error.message);
    res.status(500).json({ error: "Failed to fetch poll" });
  }
};

// Get all polls created by the logged-in user
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

// Get all polls the logged-in user has participated in
export const getParticipatedPolls = async (req, res) => {
  try {
    // FIXED: The query now correctly checks the 'user' field inside the 'votedBy' array of objects.
    const polls = await Poll.find({ "votedBy.user": req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching participated polls:", error);
    res.status(500).json({ error: "Failed to fetch participated polls." });
  }
};

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
  if (rangeString.includes("+")) {
    return { min: parseInt(rangeString, 10), max: Infinity };
  }
  const [min, max] = rangeString.split("-").map(Number);
  return { min, max };
};

export const getTrendingPolls = async (req, res) => {
  try {
    // 1. Get the current logged-in user and their age
    const user = await User.findById(req.user._id);

    // If the user has no birthdate set, they can't see age-targeted polls
    if (!user || typeof user.age === "undefined") {
      const publicPolls = await Poll.find({
        shareToTrending: true,
        ageRange: { $exists: false }, // Only polls with no age range
        author: { $ne: req.user._id }, // Don't show users their own polls
      }).sort({ createdAt: -1 });
      return res.status(200).json(publicPolls);
    }

    const userAge = user.age;

    // 2. Fetch all potential trending polls (excluding the user's own)
    const allTrendingPolls = await Poll.find({
      shareToTrending: true,
      author: { $ne: req.user._id },
    }).sort({ createdAt: -1 });

    // 3. Filter the polls in your application based on the user's age
    const filteredPolls = allTrendingPolls.filter((poll) => {
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
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    const now = new Date();
    const expiresDate = poll.expiresAt;
    const pollStartDate = poll.createdAt; // poll start
    const pollDurationMs = expiresDate.getTime() - pollStartDate.getTime();
    const halfDurationMs = pollDurationMs / 2;

    let earlyVoters = 0;
    let lateVoters = 0;

    poll.votersMeta.forEach(({ votedAt }) => {
      const voteTime = new Date(votedAt).getTime();
      const voteOffset = voteTime - pollStartDate.getTime();

      if (voteOffset <= halfDurationMs) {
        earlyVoters += 1;
      } else {
        lateVoters += 1;
      }
    });

    const uniqueViews = poll.viewedBy.length;

    const responseRate =
      uniqueViews > 0
        ? ((poll.totalVotes / uniqueViews) * 100).toFixed(2) + "%"
        : "0%";

    // Aggregate breakdowns
    const platformBreakdown = {};
    const browserBreakdown = {};
    const deviceBreakdown = {};
    poll.votersMeta.forEach(({ platform, browser, device }) => {
      if (platform)
        platformBreakdown[platform] = (platformBreakdown[platform] || 0) + 1;
      if (browser)
        browserBreakdown[browser] = (browserBreakdown[browser] || 0) + 1;
      if (device) deviceBreakdown[device] = (deviceBreakdown[device] || 0) + 1;
    });

    res.json({
      ...poll.toObject(),
      views: uniqueViews,
      clicks: poll.totalVotes || 0,
      responseRate,
      platformBreakdown,
      browserBreakdown,
      deviceBreakdown,
      avgTime:
        poll.totalVotes > 0
          ? `${Math.round(poll.totalTimeSpent / poll.totalVotes)}s`
          : "0s",
      earlyVoters,
      lateVoters,
    });
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res.status(500).json({ error: "Server error" });
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
        const canvas = document.createElement("canvas");
        canvas.width = options.width;
        canvas.height = options.height;
        const ctx = canvas.getContext("2d");

        // --- Smart Center-Crop Logic ---
        const masterRatio = masterImage.width / masterImage.height;
        const targetRatio = options.width / options.height;
        let sourceX = 0,
          sourceY = 0,
          sourceWidth = masterImage.width,
          sourceHeight = masterImage.height;

        if (masterRatio > targetRatio) {
          // Master is wider than target
          sourceWidth = masterImage.height * targetRatio;
          sourceX = (masterImage.width - sourceWidth) / 2;
        } else {
          // Master is taller than target
          sourceHeight = masterImage.width / targetRatio;
          sourceY = (masterImage.height - sourceHeight) / 2;
        }

        ctx.drawImage(
          masterImage,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          options.width,
          options.height
        );

        // --- Branding Overlay Logic ---
        const logoMargin = 40; // 40px margin from the edges
        const logoWidth = canvas.width * 0.15; // Logo is 15% of the banner width
        const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
        ctx.drawImage(
          logoImage,
          canvas.width - logoWidth - logoMargin,
          canvas.height - logoHeight - logoMargin,
          logoWidth,
          logoHeight
        );

        // Convert canvas to a File object
        canvas.toBlob(
          (blob) => {
            const newFile = new File(
              [blob],
              `pyngl_share_${options.width}x${options.height}.jpg`,
              { type: "image/jpeg" }
            );
            resolve(newFile);
          },
          "image/jpeg",
          0.92
        ); // High-quality JPEG
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
      imagePublicId: req.file.filename,
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
        text: poll.question,
      },
      color: "#FFFFFF",
      gravity: "north",
      y: 100,
    });

    // Add image if it exists
    if (poll.type === "image" && poll.imageUrl) {
      const uploadStr = "/upload/";
      const afterUpload = poll.imageUrl.substring(
        poll.imageUrl.indexOf(uploadStr) + uploadStr.length
      );
      let publicId = afterUpload.replace(/v\d+\//, "").replace(/\.[^/.]+$/, "");
      publicId = publicId.replace(/\//g, ":");

      transformations.push({
        overlay: { public_id: publicId },
        width: 800,
        height: 450,
        crop: "fill",
        gravity: "center",
        y: -50,
        radius: 20,
      });
    }

    // Add each Poll Option as a text overlay
    poll.options.forEach((option, index) => {
      const yOffset =
        poll.type === "image" ? 250 + index * 60 : 200 + index * 70;
      transformations.push({
        overlay: {
          font_family: "Arial",
          font_size: 48,
          text: `- ${option.text}`,
        },
        color: "#FFFFFF",
        gravity: "center",
        y: yOffset,
      });
    });

    // Add your logo as a final overlay
    transformations.push({
      overlay: "pyngl_logo", // Assumes a 'pyngl_logo' Public ID exists
      width: "0.15",
      gravity: "south_east",
      x: 40,
      y: 40,
      opacity: 90,
      flags: "relative",
    });

    // --- THIS IS THE FIX ---
    // The function now looks for your base image inside the correct folder.
    const baseImagePublicId = "uploads/pyngl/transparent_base";

    const pollCardUrl = cloudinary.url(baseImagePublicId, {
      transformation: [
        {
          width: 1080,
          height: 1080,
          crop: "fill",
          background: "rgb:1a202c",
          radius: 20,
        },
        ...transformations,
      ],
      secure: true,
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

    if (!poll || poll.type !== "image" || !poll.imageUrl) {
      return res.status(404).json({ error: "Valid image poll not found." });
    }

    // --- 1. Extract the Public ID of the main poll image ---
    const imagePublicId = poll.imageUrl
      .substring(poll.imageUrl.lastIndexOf("/") + 1)
      .replace(/\.[^/.]+$/, "");

    // --- 2. Define the QR Code Overlay ---
    const pollLink = `${process.env.FRONTEND_URL}/poll/${pollId}`;
    const qrCodeOverlay = `l_qrcode:${encodeURIComponent(
      pollLink
    )},w_300,h_300,r_20`;

    // --- 3. Build the full transformation string ---
    const transformations = [
      { width: 1080, height: 1920, crop: "fill", background: "rgb:1F2937" }, // Base canvas (Story format)
      {
        overlay: imagePublicId,
        width: 1080,
        height: 1350,
        crop: "fill",
        gravity: "north",
      }, // Main poll image
      {
        overlay: {
          text: "Scan to Vote!",
          font_family: "Inter",
          font_size: 48,
          font_weight: "bold",
        },
        color: "#FFFFFF",
        gravity: "south",
        y: 150,
      },
      { overlay: qrCodeOverlay, gravity: "south", y: 220 }, // Position the QR code
      { overlay: "pyngl_logo", width: 200, gravity: "south", y: 50 }, // Your logo
    ];

    // --- 4. Generate the final, secure URL ---
    const finalImageUrl = cloudinary.url(imagePublicId, {
      transformation: transformations,
      sign_url: true, // IMPORTANT: This creates a secure, signed URL
    });

    res.status(200).json({ shareableImageUrl: finalImageUrl });
  } catch (error) {
    console.error("Error generating shareable image:", error);
    res.status(500).json({ error: "Failed to generate shareable image." });
  }
};
const SOURCE_ORIGIN = process.env.FRONTEND_URL || "https://localhost:5173";

// export const sendGmailPoll = async (req, res) => {
//   try {
//     const { userEmail, recipients, pollId } = req.body;
//     console.log("📩 Incoming Gmail share:", { userEmail, recipients, pollId });

//     const user = await GoogleUser.findOne({ email: userEmail });
//     if (!user) return res.status(404).send("User not found");

//     const poll = await Poll.findById(pollId);
//     if (!poll) return res.status(404).send("Poll not found");

//     const emails = recipients
//       .map((r) => (typeof r === "string" ? r : r.email))
//       .filter(Boolean);

//     if (emails.length === 0)
//       return res.status(400).send("No valid recipient emails provided");

//     console.log("📤 Sending to:", emails);

//     await Promise.all(emails.map((email) => sendEmail(user, email, poll)));

//     res.send("Poll sent via Gmail!");
//   } catch (err) {
//     console.error("❌ sendGmailPoll ERROR:", err);
//     if (err.response?.data) console.error("📦 Gmail API Error:", err.response.data);
//     res.status(500).json({ message: "Error sending email", error: err.message });
//   }
// };

/* -------------------- GMAIL AMP POLLS -------------------- */

// --- Helper: Get fresh access token from Microsoft

// async function getAccessToken() {
//   console.log("🧩 ENV loaded:", {
//     MS_TENANT_ID: process.env.MS_TENANT_ID,
//     MS_CLIENT_ID: process.env.MS_CLIENT_ID,
//     MS_REFRESH_TOKEN: process.env.MS_REFRESH_TOKEN ? "✅ exists" : "❌ missing",
//   });

//   const res = await fetch(
//     `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}/oauth2/v2.0/token`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         client_id: process.env.MS_CLIENT_ID,
//         refresh_token: process.env.MS_REFRESH_TOKEN,
//         grant_type: "refresh_token",
//         scope: "https://graph.microsoft.com/.default offline_access",
//       }),
//     }
//   );

//   const data = await res.json();
//   if (!data.access_token) {
//     console.error("❌ Failed to fetch Microsoft access token:", data);
//     throw new Error("Could not fetch Microsoft access token");
//   }

//   console.log("✅ Access token refreshed!");
//   return data.access_token;
// }


// --- Send Poll Email (with AMP & HTML via Microsoft Graph)
// async function getAccessToken() {
//   const res = await fetch(
//     `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}/oauth2/v2.0/token`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         client_id: process.env.MS_CLIENT_ID,
//         client_secret: process.env.MS_CLIENT_SECRET,
//         refresh_token: process.env.MS_REFRESH_TOKEN,
//         grant_type: "refresh_token",
//         scope: "https://graph.microsoft.com/.default offline_access",
//       }),
//     }
//   );

//   const data = await res.json();
//   if (!data.access_token) {
//     console.error("❌ Failed to fetch Microsoft access token:", data);
//     throw new Error("Could not fetch Microsoft access token");
//   }
//   return data.access_token;
// }

// export const sendPoll = async (req, res) => {
//   try {
//     const { recipients, pollId } = req.body;
//     const poll = await Poll.findById(pollId);
//     if (!poll) return res.status(404).send("Poll not found");

//     const emails = recipients
//       .map((r) => (typeof r === "string" ? r : r.email))
//       .filter(Boolean);
//     if (emails.length === 0)
//       return res.status(400).send("No valid recipient emails provided");

//     const accessToken = await getAccessToken();
//     console.log("🚀 Access token obtained");

//     const voteUrl = process.env.VOTE_URL || "https://pyngl.com";

//     // --- Plain text ---
//     const plainText = `
// Hi there 👋,

// We’d love your quick opinion on this Pyngl poll:

// "${poll.question}"

// Vote now:
// YES → ${voteUrl}/vote?pollId=${poll._id}&opt=yes
// NO  → ${voteUrl}/vote?pollId=${poll._id}&opt=no

// Thank you for being part of the Pyngl community.
// To stop receiving polls, visit https://pyngl.com/unsubscribe
// `;

//     // --- HTML version ---
//     const htmlBody = `
// <div style="padding:20px;text-align:center;font-family:Arial,sans-serif;background:#fafafa;">
//   <p style="font-size:14px;color:#333;">Hi there 👋,</p>
//   <p style="font-size:14px;color:#333;">We’d love your quick vote on this Pyngl poll:</p>
//   <h3 style="color:#111;">${poll.question}</h3>
//   ${
//     poll.imageUrl
//       ? `<img src="${poll.imageUrl}" width="480" height="270" style="border-radius:10px;margin-top:10px;" alt="poll"/>`
//       : ""
//   }
//   <div style="margin-top:20px;">
//     <a href="${voteUrl}/vote?pollId=${poll._id}&opt=yes"
//        style="background:#4F46E5;color:#fff;padding:10px 20px;border-radius:20px;text-decoration:none;margin-right:10px;display:inline-block;">
//        ✅ YES
//     </a>
//     <a href="${voteUrl}/vote?pollId=${poll._id}&opt=no"
//        style="background:#E11D48;color:#fff;padding:10px 20px;border-radius:20px;text-decoration:none;display:inline-block;">
//        ❌ NO
//     </a>
//   </div>
//   <p style="margin-top:25px;color:#666;font-size:13px;line-height:1.5;">
//     You're receiving this poll from <strong>Pyngl</strong>.<br/>
//     Visit <a href="https://pyngl.com" style="color:#4F46E5;text-decoration:none;">pyngl.com</a> for more.
//   </p>
//   <hr style="border:none;border-top:1px solid #eee;margin:20px 0;"/>
//   <p style="font-size:12px;color:#999;">© 2025 Pyngl. All rights reserved.<br/>
//   <a href="https://pyngl.com/privacy" style="color:#999;">Privacy Policy</a> |
//   <a href="https://pyngl.com/unsubscribe" style="color:#999;">Unsubscribe</a></p>
// </div>
// `;

//     // --- AMP version ---
//     const ampHtml = `<!doctype html>
// <html ⚡4email>
// <head>
//   <meta charset="utf-8">
//   <script async src="https://cdn.ampproject.org/v0.js"></script>
//   <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
//   <script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
//   <style amp4email-boilerplate>body{visibility:hidden}</style>
//   <style amp-custom>
//     body { font-family: Arial; background: #f9fafb; color: #111; }
//     .poll-container { background: #fff; border-radius: 16px; padding: 20px; max-width: 480px; margin: auto; border: 1px solid #ddd; }
//     .poll-question { font-size: 18px; font-weight: 600; margin-bottom: 12px; }
//     amp-selector div[option] { display: block; padding: 12px; margin: 8px 0; border: 1px solid #ccc; border-radius: 20px; cursor: pointer; }
//     amp-selector div[option][selected] { background: linear-gradient(90deg, #ec4899, #8b5cf6); color: white; }
//     input[type=submit] { width: 100%; padding: 12px; border: none; border-radius: 25px; background: #ff4da6; color: #fff; font-weight: 600; }
//   </style>
// </head>
// <body>
//   <div class="poll-container">
//     <p>Hi there 👋,</p>
//     <p>We’d love your quick vote on this Pyngl poll:</p>
//     <h3>${poll.question}</h3>
//     ${
//       poll.imageUrl
//         ? `<amp-img src="${poll.imageUrl}" width="480" height="270" layout="responsive"></amp-img>`
//         : ""
//     }
//     <form method="post" action-xhr="https://api.pyngl.com/api/polls/vote-from-gmail">
//       <input type="hidden" name="pollId" value="${poll._id}" />
//       <amp-selector name="opt" layout="container" role="listbox">
//         ${poll.options
//           .map((opt) => `<div option="${opt.text}">${opt.text}</div>`)
//           .join("")}
//       </amp-selector>
//       <input type="submit" value="Submit Vote" />
//       <div submit-success>
//         <template type="amp-mustache">✅ Thanks! Your vote has been recorded.</template>
//       </div>
//       <div submit-error>
//         <template type="amp-mustache">❌ Something went wrong. Please try again.</template>
//       </div>
//     </form>
//   </div>
// </body>
// </html>`;

//     // --- Build MIME message (Plain → AMP → HTML) ---
//     const boundary = "pyngl_boundary";
//     const mimeMessage = [
//       "MIME-Version: 1.0",
//       `From: Pyngl Notifications <notifications@pyngl.com>`,
//       `To: ${emails.join(", ")}`,
//       `Subject: ${poll.question || "New Pyngl Poll"}`,
//       `Reply-To: notifications@pyngl.com`,
//       `List-Unsubscribe: <https://pyngl.com/unsubscribe>`,
//       `List-Unsubscribe-Post: List-Unsubscribe=One-Click`,
//       `Content-Type: multipart/alternative; boundary="${boundary}"`,
//       "",
//       `--${boundary}`,
//       "Content-Type: text/plain; charset=utf-8",
//       "",
//       plainText,
//       `--${boundary}`,
//       "Content-Type: text/x-amp-html; charset=utf-8",
//       "",
//       ampHtml,
//       `--${boundary}`,
//       "Content-Type: text/html; charset=utf-8",
//       "",
//       htmlBody,
//       `--${boundary}--`,
//     ].join("\r\n");

//     // 1️⃣ Create DRAFT message
//     const createRes = await fetch("https://graph.microsoft.com/beta/me/messages", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         subject: poll.question,
//         toRecipients: emails.map((e) => ({ emailAddress: { address: e } })),
//         isDraft: true, // ✅ must be draft for MIME upload
//       }),
//     });

//     const draft = await createRes.json();
//     if (!createRes.ok) {
//       console.error("❌ Failed to create draft:", draft);
//       return res.status(createRes.status).send("Failed to create draft");
//     }

//     // 2️⃣ Upload MIME content (must be octet-stream)
//     const uploadRes = await fetch(
//       `https://graph.microsoft.com/beta/me/messages/${draft.id}/$value`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/octet-stream", // ✅ required for Graph
//         },
//         body: mimeMessage, // ✅ raw MIME body, not base64
//       }
//     );

//     if (!uploadRes.ok) {
//       const err = await uploadRes.text();
//       console.error("❌ Failed to upload MIME:", err);
//       return res.status(uploadRes.status).send("Failed to upload MIME");
//     }

//     // 3️⃣ Send the message
//     const sendRes = await fetch(
//       `https://graph.microsoft.com/beta/me/messages/${draft.id}/send`,
//       {
//         method: "POST",
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );

//     if (!sendRes.ok) {
//       const err = await sendRes.text();
//       console.error("❌ Failed to send:", err);
//       return res.status(sendRes.status).send("Failed to send message");
//     }

//     console.log("✅ AMP email sent successfully!");
//     res.send("✅ AMP-enabled poll email sent successfully via Microsoft Graph!");
//   } catch (err) {
//     console.error("❌ Error in sendPoll:", err);
//     res.status(500).send("Error sending poll email");
//   }
// };



// export const sendPoll = async (req, res) => {
//   try {
//     const { recipients, pollId } = req.body;
//     const poll = await Poll.findById(pollId);
//     if (!poll) return res.status(404).send("Poll not found");

//     const emails = recipients
//       .map((r) => (typeof r === "string" ? r : r.email))
//       .filter(Boolean);
//     if (emails.length === 0)
//       return res.status(400).send("No valid recipient emails provided");

//     const accessToken = await getAccessToken();
//     console.log("✅ Microsoft Graph access token obtained");

//     const voteUrl = process.env.VOTE_URL || "https://pyngl.com";

//     const plainText = `
// Hi there 👋,

// We’d love your quick opinion on this Pyngl poll:

// "${poll.question}"

// Vote now:
// YES → ${voteUrl}/vote?pollId=${poll._id}&opt=yes
// NO  → ${voteUrl}/vote?pollId=${poll._id}&opt=no

// Thank you for being part of the Pyngl community.
// To stop receiving polls, visit https://pyngl.com/unsubscribe
// `;

//     const htmlBody = `
// <div style="padding:20px;text-align:center;font-family:Arial,sans-serif;background:#fafafa;">
//   <p>Hi there 👋,</p>
//   <p>We’d love your quick vote on this Pyngl poll:</p>
//   <h3>${poll.question}</h3>
//   ${
//     poll.imageUrl
//       ? `<img src="${poll.imageUrl}" width="480" style="border-radius:10px;" alt="poll"/>`
//       : ""
//   }
//   <div style="margin-top:20px;">
//     <a href="${voteUrl}/vote?pollId=${poll._id}&opt=yes"
//        style="background:#4F46E5;color:#fff;padding:10px 20px;border-radius:20px;text-decoration:none;margin-right:10px;">✅ YES</a>
//     <a href="${voteUrl}/vote?pollId=${poll._id}&opt=no"
//        style="background:#E11D48;color:#fff;padding:10px 20px;border-radius:20px;text-decoration:none;">❌ NO</a>
//   </div>
// </div>
// `;

//     const ampHtml = `<!doctype html>
// <html ⚡4email>
// <head>
//   <meta charset="utf-8">
//   <script async src="https://cdn.ampproject.org/v0.js"></script>
//   <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
//   <script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
//   <style amp4email-boilerplate>body{visibility:hidden}</style>
//   <style amp-custom>
//     body { font-family: Arial; background:#fafafa; color:#111; }
//     .poll-container { background:#fff; border-radius:16px; padding:20px; max-width:480px; margin:auto; border:1px solid #ddd; }
//     amp-selector div[option] { padding:12px; margin:8px 0; border:1px solid #ccc; border-radius:20px; cursor:pointer; }
//     amp-selector div[option][selected] { background:linear-gradient(90deg,#ec4899,#8b5cf6); color:white; }
//     input[type=submit] { width:100%; padding:12px; border:none; border-radius:25px; background:#ff4da6; color:#fff; font-weight:600; }
//   </style>
// </head>
// <body>
//   <div class="poll-container">
//     <p>Hi there 👋,</p>
//     <h3>${poll.question}</h3>
//     ${
//       poll.imageUrl
//         ? `<amp-img src="${poll.imageUrl}" width="480" height="270" layout="responsive"></amp-img>`
//         : ""
//     }
//     <form method="post" action-xhr="https://api.pyngl.com/api/polls/vote-from-gmail">
//       <input type="hidden" name="pollId" value="${poll._id}" />
//       <amp-selector name="opt" layout="container" role="listbox">
//         ${poll.options
//           .map((opt) => `<div option="${opt.text}">${opt.text}</div>`)
//           .join("")}
//       </amp-selector>
//       <input type="submit" value="Submit Vote" />
//       <div submit-success><template type="amp-mustache">✅ Thanks! Your vote has been recorded.</template></div>
//       <div submit-error><template type="amp-mustache">❌ Something went wrong.</template></div>
//     </form>
//   </div>
// </body>
// </html>`;

//     // Construct Graph API message payload
//     const mailData = {
//       message: {
//         subject: "Quick Poll from Pyngl",
//         body: {
//           contentType: "HTML",
//           content: htmlBody,
//         },
//         toRecipients: emails.map((e) => ({ emailAddress: { address: e } })),
//         attachments: [
//           {
//             "@odata.type": "#microsoft.graph.fileAttachment",
//             name: "poll.amp.html",
//             contentType: "text/x-amp-html",
//             contentBytes: Buffer.from(ampHtml, "utf8").toString("base64"),
//           },
//           {
//             "@odata.type": "#microsoft.graph.fileAttachment",
//             name: "poll.txt",
//             contentType: "text/plain",
//             contentBytes: Buffer.from(plainText, "utf8").toString("base64"),
//           },
//         ],
//       },
//       saveToSentItems: false,
//     };

//     // Send email via Graph API
//     const sendRes = await fetch(
//       "https://graph.microsoft.com/v1.0/users/notifications@pyngl.com/sendMail",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(mailData),
//       }
//     );

//     if (!sendRes.ok) {
//       const err = await sendRes.text();
//       console.error("❌ Graph API sendMail failed:", err);
//       return res.status(sendRes.status).send("Failed to send poll email");
//     }

//     console.log("✅ Poll email sent successfully (HTML + AMP + Plain)!");
//     res.send("✅ Poll sent successfully via Microsoft Graph API (with AMP)");

//   } catch (err) {
//     console.error("❌ Error in sendPoll:", err);
//     res.status(500).send("Error sending poll email");
//   }
// };



async function getAccessToken() {
  const res = await fetch(
    `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.MS_CLIENT_ID,
        client_secret: process.env.MS_CLIENT_SECRET,
        refresh_token: process.env.MS_REFRESH_TOKEN,
        grant_type: "refresh_token",
        scope: "https://outlook.office365.com/SMTP.Send offline_access",
      }),
    }
  );

  const data = await res.json();
  if (!data.access_token) {
    console.error("❌ Failed to fetch Microsoft access token:", data);
    throw new Error("Could not fetch Microsoft access token");
  }
  return data.access_token;
}


export const sendPoll = async (req, res) => {
  try {
    const { recipients, pollId } = req.body;

    // 🧩 1. Validate poll & recipients
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).send("Poll not found");

    const emails = (recipients || [])
      .map((r) => (typeof r === "string" ? r : r.email))
      .filter(Boolean);
    if (emails.length === 0)
      return res.status(400).send("No valid recipient emails provided");

    // 🪙 2. Get Microsoft OAuth token (fresh)
    const accessToken = await getAccessToken();
    const voteUrl = process.env.VOTE_URL || "https://pyngl.com";

    // 📨 3. Create transporter (OAuth2)
  const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // ✅ Correct host for Microsoft 365
  port: 587,                  // ✅ STARTTLS port
  secure: false,              // ✅ must be false for STARTTLS
  auth: {
    type: "OAuth2",
    user: "notifications@pyngl.com",
    clientId: process.env.MS_CLIENT_ID,
    clientSecret: process.env.MS_CLIENT_SECRET,
    refreshToken: process.env.MS_REFRESH_TOKEN,
    accessToken,
  },
  tls: {
   rejectUnauthorized: false,
  },
  pool: true,
  maxConnections: 3,
});


    // 📄 4. Build message parts
    const plain = `
Hi there 👋,

We’d love your quick opinion on this Pyngl poll:

"${poll.question}"

Vote now:
YES → ${voteUrl}/vote?pollId=${poll._id}&opt=yes
NO  → ${voteUrl}/vote?pollId=${poll._id}&opt=no

Thank you for being part of the Pyngl community.
To stop receiving polls, visit https://pyngl.com/unsubscribe
`;

    const html = `
<div style="padding:20px;text-align:center;font-family:Arial,sans-serif;background:#fafafa;">
  <p style="font-size:14px;color:#333;">Hi there 👋,</p>
  <p style="font-size:14px;color:#333;">We’d love your quick vote on this Pyngl poll:</p>
  <h3 style="color:#111;">${poll.question}</h3>
  ${
    poll.imageUrl
      ? `<img src="${poll.imageUrl}" width="480" height="270" style="border-radius:10px;margin-top:10px;" alt="poll"/>`
      : ""
  }
  <div style="margin-top:20px;">
    <a href="${voteUrl}/vote?pollId=${poll._id}&opt=yes"
       style="background:#4F46E5;color:#fff;padding:10px 20px;border-radius:20px;text-decoration:none;margin-right:10px;display:inline-block;">
       ✅ YES
    </a>
    <a href="${voteUrl}/vote?pollId=${poll._id}&opt=no"
       style="background:#E11D48;color:#fff;padding:10px 20px;border-radius:20px;text-decoration:none;display:inline-block;">
       ❌ NO
    </a>
  </div>
  <p style="margin-top:25px;color:#666;font-size:13px;line-height:1.5;">
    You're receiving this poll from <strong>Pyngl</strong>.<br/>
    Visit <a href="https://pyngl.com" style="color:#4F46E5;text-decoration:none;">pyngl.com</a> for more.
  </p>
  <hr style="border:none;border-top:1px solid #eee;margin:20px 0;"/>
  <p style="font-size:12px;color:#999;">© 2025 Pyngl. All rights reserved.<br/>
  <a href="https://pyngl.com/privacy" style="color:#999;">Privacy Policy</a> |
  <a href="https://pyngl.com/unsubscribe" style="color:#999;">Unsubscribe</a></p>
</div>`;

    const ampHtml = `<!doctype html>
<html ⚡4email data-css-strict>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
  <script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
  <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <style amp-custom>
    body { font-family: Arial; background:#f9fafb; color:#111; padding:20px; }
    .poll-container { background:#fff; border-radius:16px; padding:20px; max-width:480px; margin:auto; border:1px solid #ddd; }
    amp-selector div[option] {
      display:block; padding:12px; margin:8px 0; border:1px solid #ccc;
      border-radius:20px; cursor:pointer;
    }
    amp-selector div[option][selected] {
      background:linear-gradient(90deg,#ec4899,#8b5cf6); color:white;
    }
    input[type=submit] {
      width:100%; padding:12px; border:none; border-radius:25px;
      background:#ff4da6; color:#fff; font-weight:600;
    }
  </style>
</head>
<body>
  <div class="poll-container">
    <h3>${poll.question}</h3>
    ${
      poll.imageUrl
        ? `<amp-img src="${poll.imageUrl}" width="480" height="270" layout="responsive"></amp-img>`
        : ""
    }
    <form method="post" action-xhr="https://api.pyngl.com/api/polls/vote-from-gmail">
      <input type="hidden" name="pollId" value="${poll._id}" />
      <amp-selector name="opt" layout="container" role="listbox">
        ${poll.options
          .map((opt) => `<div option="${opt.text}">${opt.text}</div>`)
          .join("")}
      </amp-selector>
      <input type="submit" value="Submit Vote" />
      <div submit-success>
        <template type="amp-mustache">✅ Thanks! Your vote has been recorded.</template>
      </div>
      <div submit-error>
        <template type="amp-mustache">❌ Something went wrong. Please try again.</template>
      </div>
    </form>
  </div>
</body>
</html>`;

    // ✉️ 5. Send the email
    await transporter.sendMail({
      from: '"Pyngl Notifications" <notifications@pyngl.com>',
      to: emails.join(", "),
      subject: poll.question,
      text: plain,
      html,
      amp: ampHtml,
      headers: {
        "X-List-Unsubscribe":
          "<mailto:unsubscribe@pyngl.com>, <https://pyngl.com/unsubscribe>",
        "X-List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "Reply-To": "support@pyngl.com",
      },
    });

    console.log(`✅ Poll "${poll.question}" sent to: ${emails.join(", ")}`);
    res.send("✅ Poll sent via Office365 OAuth2 with AMP + HTML + Text!");
  } catch (err) {
    console.error("❌ Error in sendPoll:", err);
    res.status(500).send("Error sending poll email");
  }
};


export const votePoll = async (req, res) => {
  const { pollId, opt } = req.body;
  try {
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ msg: "Poll not found" });

    const option = poll.options.find((o) => o.text === opt);
    if (!option) return res.status(400).json({ msg: "Invalid option" });

    option.votes += 1;
    await poll.save();

    const total = poll.options.reduce((sum, o) => sum + o.votes, 0) || 1;
    const options = poll.options.map((o) => ({
      text: o.text,
      votes: o.votes,
      pct: Math.round((o.votes / total) * 100),
    }));
    res.set("Access-Control-Allow-Origin", "https://mail.google.com");
    res.set("AMP-Access-Control-Allow-Source-Origin", SOURCE_ORIGIN);
    res.set(
      "Access-Control-Expose-Headers",
      "AMP-Access-Control-Allow-Source-Origin"
    );
    res.json({ options });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
export const initScheduledJobs = (io) => {
  // This cron job is scheduled to run once every hour, at the top of the hour.
  cron.schedule("0 * * * *", async () => {
    console.log("Running hourly check for expiring polls...");

    const now = new Date();
    const twentyFourHoursFromNow = new Date(
      now.getTime() + 24 * 60 * 60 * 1000
    );

    try {
      // Find polls that are:
      // 1. Not yet expired.
      // 2. Expiring within the next 24 hours.
      // 3. Haven't had an "ending soon" notification sent yet.
      const expiringPolls = await Poll.find({
        expiresAt: { $gt: now, $lte: twentyFourHoursFromNow },
        endingSoonNotified: false,
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
          link: `/poll/${poll._id}`,
        });
        await notification.save();

        // Emit a real-time event to the specific user's socket "room"
        io.to(poll.author.toString()).emit("new_notification", notification);

        // Update the poll to mark that the notification has been sent
        poll.endingSoonNotified = true;
        await poll.save();
      }
    } catch (error) {
      console.error("Error in scheduled job for expiring polls:", error);
    }
  });

  console.log("Notification scheduler has been initialized.");
};
export const testWhatsappMessage = async (req, res) => {
  const { recipientPhoneNumber } = req.body; // e.g., "919876543210"

  if (!recipientPhoneNumber) {
    return res
      .status(400)
      .json({ message: "recipientPhoneNumber is required." });
  }

  try {
    const message = "Hello from Pyngl! Your API connection is working.";
    const result = await sendWhatsappMessage(recipientPhoneNumber, message);
    res
      .status(200)
      .json({ success: true, message: "Test message sent!", data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const applyPollFilter = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { devices = [], browsers = [] } = req.body;

    // Fetch poll
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    // --- Base data ---
    const totalViews = poll.viewedBy?.length || 0;
    let filteredVoters = poll.votersMeta || [];

    // --- Apply filters ---
    if (devices.length > 0) {
      filteredVoters = filteredVoters.filter((v) => devices.includes(v.device));
    }

    if (browsers.length > 0) {
      filteredVoters = filteredVoters.filter((v) =>
        browsers.includes(v.browser)
      );
    }

    // --- Compute analytics ---
    const totalVotes = filteredVoters.length;

    // Engagement = (Views / Votes) * 100
    const avgEngagement =
      totalVotes > 0 ? ((totalVotes / totalViews) * 100).toFixed(1) : 0;

    // --- Response ---
    res.json({
      totalViews,
      totalVotes,
      avgEngagement,
      filteredVoters: filteredVoters.map((v) => ({
        userId: v.user || "Anonymous",
        device: v.device || "Unknown",
        browser: v.browser || "Unknown",
        votedAt: v.votedAt,
        timeSpent: v.timeSpent || 0,
      })),
    });
  } catch (error) {
    console.error("Error applying filter:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
