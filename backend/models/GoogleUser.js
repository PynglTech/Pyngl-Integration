// models/GoogleUser.js
import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    googleId: { type: String, required: true, unique: true },
    access_token: { type: String, required: true },
    refresh_token: { type: String },
    expiry_date: { type: Number },
    authProvider: { type: String, default: "google" },
  },
  { timestamps: true }
);

const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

export default GoogleUser;
