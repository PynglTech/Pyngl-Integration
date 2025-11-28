import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true, // Helps with faster lookups
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // ✅ Documents automatically delete after 600 seconds (10 minutes)
  },
});

const Otp = mongoose.model('Otp', otpSchema);

export default Otp;