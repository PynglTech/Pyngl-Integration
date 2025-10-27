import mongoose from "mongoose";

// Sub-schema for poll options (Unchanged)
const optionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
});

// Your superior sub-schema for tracking votes is preserved
const voteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ipAddress: { type: String },
    votedAt: { type: Date, default: Date.now },
}, { _id: false });

const pollSchema = new mongoose.Schema({
    // --- Core Poll Fields ---
    question: { type: String, required: true },
    options: [optionSchema],
    type: { type: String, enum: ["text", "image"], required: true },
    imageUrl: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index:true },
    expiresAt: { type: Date, required: true , index:true},

    // --- Vote Tracking & Notifications ---
    votedBy: [voteSchema],
    endingSoonNotified: { type: Boolean, default: false },

    // --- Sharing & Targeting ---
    previewImages: {
        instagram: { type: String, default: null },
        twitter: { type: String, default: null },
        linkedin: { type: String, default: null },
        facebook: { type: String, default: null },
        whatsapp: { type: String, default: null },
        youtube: { type: String, default: null },
        gmail: { type: String, default: null },
    },
    ageRange: {
        type: String,
        enum: ["13-17", "18-24", "25-34", "35-44", "45+"],
        default: "13-17",
    },
    shareToTrending: { type: Boolean, default: false    , index:true },
    sharedPlatforms: { type: [String], default: [] },

    viewedBy: { type: [mongoose.Schema.Types.Mixed], default: [] },
    clicks: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    totalTimeSpent: { type: Number, default: 0 }, // in seconds
    totalVotes: { type: Number, default: 0 },
    
    // Detailed analytics for each voter
    votersMeta: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        votedAt: { type: Date, default: Date.now },
        // NEW: Added 'device' field for more detailed analytics
        device: { type: String }, // e.g. 'Mobile', 'Desktop'
        platform: { type: String }, // e.g., 'twitter', 'instagram'
        browser: { type: String },  // e.g., 'Chrome', 'Safari'
        timeSpent: { type: Number }, // in seconds
    }],
}, { timestamps: true });

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;