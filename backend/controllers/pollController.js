import axios from "axios";
import Poll from "../models/Poll.js";
import { handleUpload } from "../config/cloudinary.js";
import FormData from "form-data";
import { cloudinary } from "../config/cloudinary.js";
import GoogleUser from "../models/GoogleUser.js";
import sendEmail from "../utils/sendEmail.js";
// ✅ Generate image with Stability AI
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
      .json({
        error: "API key for image generation is not configured on the server.",
      });
  }

  try {
    const response = await axios.post(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
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
    console.error(
      "Error generating image:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: "Failed to generate image. Check server logs." });
  }
};

// ✅ Create a new poll (associates with logged-in user)
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

  if (!question || !options?.length || !type) {
    return res.status(400).json({ error: "Missing required poll data." });
  }

  const finalDuration = duration || "24 hr";
  const now = new Date();
  const durationHours = parseInt(finalDuration.replace(" hr", ""));
  const expiresAt = new Date(now.getTime() + durationHours * 60 * 60 * 1000);

  try {
    const poll = new Poll({
      question,
      options: options.map((opt) => ({ text: opt })),
      type,
      imageUrl: imageUrl || null,
      ageRange: ageRange || "13-17", // ✅ Save ageRange (default if missing)
      expiresAt,
      author: req.user.id, // Assumes auth middleware provides req.user
      shareToTrending: !!shareToTrending, // ✅ Save checkbox value
    });

    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ error: "Failed to save poll." });
  }
};

// ✅ Vote on a poll (requires user to be logged in)
// controllers/pollController.js
export const voteOnPoll = async (req, res) => {
  const { pollId } = req.params;
  const { optionId, platform, browser, timeSpent, device } = req.body;
  console.log("🚀 ~ voteOnPoll ~ optionId, platform, browser, timeSpent, device:", optionId, platform, browser, timeSpent, device)
  const userId = req.user?.id; // make sure req.user is populated (auth middleware)

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ msg: "Poll not found" });

    // ✅ Check if user has already voted (global)
    if (poll.votedBy.includes(userId)) {
      return res.status(400).json({ msg: "User has already voted" });
    }

    // ✅ Find option and increment vote count
    const option = poll.options.id(optionId);
    if (!option) return res.status(404).json({ msg: "Option not found" });

    option.votes += 1; // just increment the number

    // ✅ Track global vote + analytics
    poll.votedBy.push(userId);
    poll.totalVotes += 1;
    poll.votersMeta.push({
      user: userId,
      platform,
      browser,
      device,
      timeSpent,
    });
    poll.totalTimeSpent += timeSpent || 0;

    await poll.save();
    res.json(poll);
  } catch (err) {
    console.error("❌ Error in voteOnPoll:", err);
    res.status(500).json({ msg: "Server error" });
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
//   try {
//     const poll = await Poll.findById(req.params.pollId); // Assuming route is /:pollId
//     if (!poll) {
//       return res.status(404).json({ error: "Poll not found" });
//     }
//     // Increment views count
//     poll.views += 1;
//     await poll.save();
//     res.status(200).json(poll);
//   } catch (error) {
//     console.error("Error fetching poll:", error.message);
//     res.status(500).json({ error: "Failed to fetch poll" });
//   }
// };

export const getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    const userId = req.user?._id; // from auth middleware
    const ipAddress = req.ip;     // fallback if no user logged in

    let shouldIncrement = false;

    if (userId) {
      if (!poll.viewedBy.includes(userId)) {
        poll.viewedBy.push(userId);
        poll.views += 1;
        shouldIncrement = true;
      }
    } else {
      // anonymous users: use IP
      if (!poll.viewedBy.includes(ipAddress)) {
        poll.viewedBy.push(ipAddress);
        poll.views += 1;
        shouldIncrement = true;
      }
    }

    if (shouldIncrement) {
      await poll.save();
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

export const addSharedPlatform = async (req, res) => {
  const { platform } = req.body;
  const pollId = req.params.id;

  if (!platform) {
    return res.status(400).json({ message: "Platform is required" });
  }

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    // Initialize array if doesn't exist
    if (!poll.sharedPlatforms) poll.sharedPlatforms = [];

    // Add platform if not already shared
    if (!poll.sharedPlatforms.includes(platform)) {
      poll.sharedPlatforms.push(platform);
      await poll.save();
    }

    res.json({ success: true, poll });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get only trending polls
export const getTrendingPolls = async (req, res) => {
  try {
    const polls = await Poll.find({ shareToTrending: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching trending polls:", error.message);
    res.status(500).json({ error: "Failed to fetch trending polls" });
  }
};

/* -------------------- GMAIL AMP POLLS -------------------- */
// ✅ sendPoll controller
export const sendPoll = async (req, res) => {
  try {
    const { userEmail, recipients, pollId } = req.body;

    // Find user
    const user = await GoogleUser.findOne({ email: userEmail });
    console.log("🚀 ~ sendPoll ~ user:", user)
    if (!user) return res.status(404).send("User not found");

    // Fetch existing poll
    const poll = await Poll.findById(pollId);
    console.log("🚀 ~ sendPoll ~ poll:", poll)
    if (!poll) return res.status(404).send("Poll not found");

    // Extract valid emails
    const emails = recipients
      .map((r) => (typeof r === "string" ? r : r.email))
      .filter(Boolean);
    console.log("🚀 ~ sendPoll ~ emails:", emails)

    if (emails.length === 0)
      return res.status(400).send("No valid recipient emails provided");

    // Send poll to each recipient
    await Promise.all(emails.map((email) => sendEmail(user, email, poll)));

    res.send("✅ Poll sent via Gmail!");
  } catch (err) {
    console.error("Error in sendPoll:", err);
    res.status(500).send("❌ Error sending email");
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
    console.error(err);
    res.status(500).json({ msg: "Server error" });
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


// analytics data
// export const trackClick = async (req, res) => {
//   const { pollId } = req.params;
//   try {
//     const poll = await Poll.findById(pollId);
//     if (!poll) return res.status(404).json({ msg: "Poll not found" });

//     poll.clicks += 1;
//     await poll.save();

//     res.json({ success: true, clicks: poll.clicks });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// export const getPollAnalytics = async (req, res) => {
//   try {
//     const { pollId } = req.params;
//     const poll = await Poll.findById(pollId);
//     if (!poll) return res.status(404).json({ error: "Poll not found" });

//     const responseRate = poll.views > 0 
//       ? ((poll.totalVotes / poll.views) * 100).toFixed(2) + "%"
//       : "0%";

//     // Aggregate breakdowns
//     const platformBreakdown = {};
//     const browserBreakdown = {};
//     poll.votersMeta.forEach(({ platform, browser }) => {
//       if (platform) platformBreakdown[platform] = (platformBreakdown[platform] || 0) + 1;
//       if (browser) browserBreakdown[browser] = (browserBreakdown[browser] || 0) + 1;
//     });

//     res.json({
//   ...poll.toObject(),
//   responseRate,
//   platformBreakdown,
//   browserBreakdown,
//   views: poll.views || 0,          // users who visited poll link
//   clicks: poll.totalVotes || 0,    // users who actually voted
//   avgTime: poll.totalVotes > 0 
//     ? `${Math.round(poll.totalTimeSpent / poll.totalVotes)}s`
//     : "0s",
// });
//   } catch (err) {
//     console.error("Error fetching analytics:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// };

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
      if (platform) platformBreakdown[platform] = (platformBreakdown[platform] || 0) + 1;
      if (browser) browserBreakdown[browser] = (browserBreakdown[browser] || 0) + 1;
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



