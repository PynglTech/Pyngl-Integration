import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Push Subscription Schema
const PushSubscriptionSchema = new mongoose.Schema({
  endpoint: String,
  keys: {
    p256dh: String,
    auth: String,
  },
});

// User Schema
const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      trim: true,
      unique: true,
      required: process.env.NODE_ENV === 'production' // ✅ required only in production
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      index: true,
      trim: true,
      lowercase: true
    },telegramChatId: {
  type: String,
  default: null,
},

    password: { 
      type: String, 
      required: true 
    },
    phoneNumber: { 
      type: String, 
      unique: true,
      required: process.env.NODE_ENV === 'production' // ✅ optional in dev
    },
    profilePictureUrl: { 
      type: String, 
      default: '' 
    },
    birthDate: {
      type: Date,
      required: process.env.NODE_ENV === 'production' // ✅ optional in dev
    },
    lastLoggedIn: {
      type: Date,
      default: Date.now
    },
    lastNudgeSentAt: Date,
    pushSubscriptions: [PushSubscriptionSchema],
    location: {
      latitude: Number,
      longitude: Number,
      accuracy: Number,
      updatedAt: Date
    },
    passwordResetOtp: String,
    passwordResetExpires: Date,
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// --- Virtual property for age ---
userSchema.virtual('age').get(function() {
  if (!this.birthDate) return undefined;
  const today = new Date();
  const birthDate = new Date(this.birthDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// --- Record login ---
userSchema.methods.recordLogin = async function() {
  this.lastLoggedIn = new Date();
  await this.save();
};

// --- Password hashing ---
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Compare password ---
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// --- Generate OTP ---
userSchema.methods.generatePasswordResetOtp = function() {
  const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
  this.passwordResetOtp = resetOtp;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  return resetOtp;
};

const User = mongoose.model('User', userSchema);
export default User;
