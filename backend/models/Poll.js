// // // // // models/Poll.js
// // // // import mongoose from "mongoose";

// // // // const optionSchema = new mongoose.Schema({
// // // //   text: {
// // // //     type: String,
// // // //     required: true,
// // // //   },
// // // //   votes: {
// // // //     type: Number,
// // // //     default: 0,
// // // //   },
// // // // });

// // // // const pollSchema = new mongoose.Schema({
// // // //   question: {
// // // //     type: String,
// // // //     required: true,
// // // //   },
// // // //   options: [optionSchema],
// // // //   type: {
// // // //     type: String,
// // // //     enum: ['text', 'image'],
// // // //     required: true,
// // // //   },
// // // //   imageUrl: {
// // // //     type: String, // Will store the data URL for the image
// // // //   },
// // // //   author: {
// // // //     type: mongoose.Schema.Types.ObjectId,
// // // //     ref: 'User', // Assumes you have a User model
// // // //     required: false,
// // // //   },
// // // //   expiresAt: {
// // // //     type: Date,
// // // //     required: true,
// // // //   },
// // // //   // --- From previous step: To prevent duplicate votes ---
// // // //   votedBy: [{
// // // //     type: mongoose.Schema.Types.ObjectId,
// // // //     ref: 'User',
// // // //   }],
// // // // }, { timestamps: true });

// // // // export default mongoose.model("Poll", pollSchema);
// // // import mongoose from "mongoose";

// // // const optionSchema = new mongoose.Schema({
// // //   text: {
// // //     type: String,
// // //     required: true,
// // //   },
// // //   votes: {
// // //     type: Number,
// // //     default: 0,
// // //   },
// // // });

// // // // This new sub-schema tracks each individual vote
// // // const voteSchema = new mongoose.Schema({
// // //     user: { // Will be present for logged-in users
// // //         type: mongoose.Schema.Types.ObjectId,
// // //         ref: 'User',
// // //     },
// // //     ipAddress: { // Will be present for anonymous users
// // //         type: String,
// // //     },
// // //     votedAt: {
// // //         type: Date,
// // //         default: Date.now,
// // //     }
// // // }, { _id: false });

// // // const pollSchema = new mongoose.Schema({
// // //   question: {
// // //     type: String,
// // //     required: true,
// // //   },
// // //   options: [optionSchema],
// // //   type: {
// // //     type: String,
// // //     enum: ['text', 'image'],
// // //     required: true,
// // //   },
// // //   imageUrl: {
// // //     type: String,
// // //   },
// // //   author: {
// // //     type: mongoose.Schema.Types.ObjectId,
// // //     ref: 'User',
// // //     required: true, // Author is now required for accurate stat tracking
// // //   },
// // //   expiresAt: {
// // //     type: Date,
// // //     required: true,
// // //   },
// // //   // The 'votedBy' array now uses the new, more detailed voteSchema
// // //   votedBy: [voteSchema], 
// // // }, { timestamps: true });

// // // export default mongoose.model("Poll", pollSchema);

// // import mongoose from "mongoose";

// // const optionSchema = new mongoose.Schema({
// //   text: { type: String, required: true },
// //   votes: { type: Number, default: 0 },
// // });

// // // This sub-schema tracks each individual vote with its timestamp
// // const voteSchema = new mongoose.Schema({
// //     user: { // Optional: will exist only for logged-in users
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: 'User',
// //     },
// //     ipAddress: { // Optional: will exist for anonymous users
// //         type: String,
// //     },
// //     votedAt: {
// //         type: Date,
// //         default: Date.now,
// //     }
// // }, { _id: false });

// // const pollSchema = new mongoose.Schema({
// //   question: { type: String, required: true },
// //   options: [optionSchema],
// //   type: {
// //     type: String,
// //     enum: ['text', 'image'],
// //     required: true,
// //   },
// //   imageUrl: { type: String },
// //   author: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     required: true,
// //   },
// //   expiresAt: { type: Date, required: true },
// //   // The 'votedBy' array uses the new, more detailed voteSchema
// //   votedBy: [voteSchema], 
// //     endingSoonNotified: {
// //     type: Boolean,
// //     default: false,
// //   },

// // }, { timestamps: true });

// // export default mongoose.model("Poll", pollSchema);

// import mongoose from "mongoose";

// const optionSchema = new mongoose.Schema({
//   text: { type: String, required: true },
//   votes: { type: Number, default: 0 },
// });

// // This is YOUR sub-schema to track individual votes.
// // It's better because it handles both logged-in and anonymous users.
// const voteSchema = new mongoose.Schema(
//   {
//     user: {
//       // For logged-in users
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     ipAddress: {
//       // For anonymous users
//       type: String,
//     },
//     votedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { _id: false }
// );

// const pollSchema = new mongoose.Schema(
//   {
//     // --- Fields from YOUR original model ---
//     question: { type: String, required: true },
//     options: [optionSchema],
//     type: {
//       type: String,
//       enum: ["text", "image"],
//       required: true,
//     },
//     imageUrl: { type: String },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true, // Kept your 'required: true' validation
//     },
//     expiresAt: { type: Date, required: true },
//     // YOUR detailed 'votedBy' array is preserved for vote validation
//     votedBy: [voteSchema],
//     endingSoonNotified: {
//       type: Boolean,
//       default: false,
//     },

//     // --- Fields ADDED from your partner's model ---
//     previewImages: {
//       instagram: { type: String, default: null },
//       twitter: { type: String, default: null },
//       linkedin: { type: String, default: null },
//       facebook: { type: String, default: null },
//       whatsapp: { type: String, default: null },
//       youtube: { type: String, default: null },
//       gmail: { type: String, default: null },
//     },
//     ageRange: {
//       type: String,
//       enum: ["13-17", "18-24", "25-34", "35-44", "45+"],
//       default: "13-17",
//     },
//     shareToTrending: {
//       type: Boolean,
//       default: false,
//     },
//     sharedPlatforms: {
//       type: [String],
//       default: [],
//     },
//     // Analytics fields
//     views: { type: Number, default: 0 },
//     clicks: { type: Number, default: 0 },
//     completed: { type: Number, default: 0 },
//     totalTimeSpent: { type: Number, default: 0 },
//     totalVotes: { type: Number, default: 0 },
//     // Detailed analytics for each voter
//     votersMeta: [
//       {
//         user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//         votedAt: { type: Date, default: Date.now },
//         platform: { type: String }, // e.g., twitter, instagram
//         browser: { type: String }, // e.g., Chrome, Safari
//         timeSpent: { type: Number }, // in seconds
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Poll", pollSchema);
import mongoose from "mongoose";

// Sub-schema for poll options
const optionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
});

// YOUR superior sub-schema for tracking individual votes is kept.
// This is better because it handles both logged-in users and anonymous (IP-based) voters.
const voteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    ipAddress: {
        type: String,
    },
    votedAt: {
        type: Date,
        default: Date.now,
    },
}, { _id: false });


const pollSchema = new mongoose.Schema({
    // --- Core Poll Fields ---
    question: { type: String, required: true },
    options: [optionSchema],
    type: {
        type: String,
        enum: ["text", "image"],
        required: true,
    },
    imageUrl: { type: String }, // For image type polls
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, // Kept your 'required: true' as it's better for data integrity
    },
    expiresAt: { type: Date, required: true },

    // --- Vote Tracking & Notifications ---
    votedBy: [voteSchema], // Using your more robust schema for tracking votes
    endingSoonNotified: {
        type: Boolean,
        default: false,
    },

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
    shareToTrending: {
        type: Boolean,
        default: false,
    },
    sharedPlatforms: {
        type: [String],
        default: [],
    },
    
    // --- Analytics Fields ---
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    totalTimeSpent: { type: Number, default: 0 }, // in seconds
    totalVotes: { type: Number, default: 0 },
    
    // Detailed analytics for each voter
    votersMeta: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        votedAt: { type: Date, default: Date.now },
        platform: { type: String }, // e.g., 'twitter', 'instagram'
        browser: { type: String },  // e.g., 'Chrome', 'Safari'
        timeSpent: { type: Number }, // in seconds
    }],
}, { timestamps: true });

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;