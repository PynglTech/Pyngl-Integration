// models/Poll.js
import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [optionSchema],
    type: {
      type: String,
      enum: ["text", "image"],
      required: true,
    },
    imageUrl: {
      type: String, // Will store the data URL for the image
    },
    previewImages: {
      instagram: { type: String, default: null },
      twitter: { type: String, default: null },
      linkedin: { type: String, default: null },
      facebook: { type: String, default: null },
      whatsapp: { type: String, default: null },
      youtube: { type: String, default: null },
      gmail: { type: String, default: null },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assumes you have a User model
      required: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    // --- From previous step: To prevent duplicate votes ---
    votedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ageRange: {
      type: String,
      enum: ["13-17", "18-24", "25-34", "35-44", "45+"], // predefined ranges
      default: "13-17", // fallback value
    },
    shareToTrending: {
      type: Boolean,
      default: false,
    },

    sharedPlatforms: {
      type: [String],
      default: [],
    },
    // views: { type: Number, default: 0 }, // total poll page 
    viewedBy: { type: [mongoose.Schema.Types.Mixed], default: [] },
    clicks: { type: Number, default: 0 }, // CTA clicks (e.g. share, start)
    completed: { type: Number, default: 0 }, // how many finished poll
    totalTimeSpent: { type: Number, default: 0 }, // in seconds, sum for averages
    totalVotes: { type: Number, default: 0 }, // redundant, but fast analytics

    votersMeta: [ 
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        votedAt: { type: Date, default: Date.now },
        device: { type: String }, // e.g. Mobile, Desktop     
        platform: { type: String }, // e.g. twitter, instagram
        browser: { type: String }, // e.g. Chrome, Safari
        timeSpent: { type: Number }, // in seconds
      },
    ],

  },
  { timestamps: true }
);

export default mongoose.model("Poll", pollSchema);
