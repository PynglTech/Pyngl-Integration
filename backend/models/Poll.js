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

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [optionSchema],
  type: {
    type: String,
    enum: ['text', 'image'],
    required: true,
  },
  imageUrl: {
    type: String, // Will store the data URL for the image
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assumes you have a User model
    required: false,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  // --- From previous step: To prevent duplicate votes ---
  votedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });

export default mongoose.model("Poll", pollSchema);