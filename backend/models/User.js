import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },

  // --- UPDATED FIELDS for OTP-based reset ---
  passwordResetOtp: String,
  passwordResetExpires: Date,

}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// --- NEW METHOD for generating a password reset OTP ---
userSchema.methods.generatePasswordResetOtp = function () {
  // Generate a 6-digit OTP
  const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash the OTP and set it on the user document
  this.passwordResetOtp = crypto
    .createHash('sha256')
    .update(resetOtp)
    .digest('hex');

  // Set an expiration time (e.g., 10 minutes from now)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // Return the unhashed OTP to be sent via email
  return resetOtp;
};

const User = mongoose.model('User', userSchema);
export default User;
