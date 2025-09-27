import User from '../models/User.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';
import { sendOtp, verifyOtp } from '../utils/otpServices.js';

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, phoneNumber } = req.body;

    const userExists = await User.findOne({
        $or: [{ email }, { username }, { phoneNumber }],
    });

    if (userExists) {
        // ... (your existing error handling for duplicate users is great)
        res.status(400);
        throw new Error('User already exists.');
    }

    const user = await User.create({ username, email, password, phoneNumber });

    if (user) {
        // --- THIS IS THE FIX ---
        // Sets the httpOnly cookie, just like in the login function
        generateToken(res, user._id); 
        
        // Now, you don't send the token in the response body
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id); // This line generates and sets the cookie

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }
};
export const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0), // Set expiry date to the past
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Request password reset via Email OTP
// @route   POST /api/users/forgotpassword
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error('There is no user with that email address.');
  }

  const resetOtp = user.generatePasswordResetOtp();
  await user.save({ validateBeforeSave: false });

  const message = `Your password reset OTP is: ${resetOtp}\n\nThis OTP is valid for 10 minutes.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your Password Reset OTP',
      message,
    });
    res.status(200).json({ success: true, message: 'OTP sent to email' });
  } catch (err) {
    console.error(err);
    user.passwordResetOtp = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500);
    throw new Error('Email could not be sent');
  }
});

// @desc    Reset password with Email OTP
// @route   PUT /api/users/resetpassword
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, password } = req.body;

  if (!email || !otp || !password) {
    res.status(400);
    throw new Error('Please provide email, OTP, and a new password.');
  }

  const hashedOtp = crypto
    .createHash('sha256')
    .update(otp)
    .digest('hex');

  const user = await User.findOne({
    email,
    passwordResetOtp: hashedOtp,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid OTP or OTP has expired.');
  }

  user.password = password;
  user.passwordResetOtp = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  
  res.status(200).json({ 
    success: true, 
    message: 'Password reset successful.',
  });
});

// @desc    Request password reset via Phone OTP
// @route   POST /api/users/forgotpassword-otp
// @access  Public
export const forgotPasswordOtp = asyncHandler(async (req, res) => {
  const { phoneNumber, channel = 'sms' } = req.body;
  const user = await User.findOne({ phoneNumber });

  if (!user) {
    res.status(404);
    throw new Error('User with that phone number not found');
  }

  await sendOtp(phoneNumber, channel);
  res.status(200).json({ success: true, message: `OTP sent to ${phoneNumber} via ${channel}` });
});

// @desc    Reset password using Phone OTP
// @route   POST /api/users/resetpassword-otp
// @access  Public
export const resetPasswordOtp = asyncHandler(async (req, res) => {
  const { phoneNumber, otpCode, newPassword } = req.body;

  const isValidOtp = await verifyOtp(phoneNumber, otpCode);

  if (!isValidOtp) {
    res.status(400);
    throw new Error('Invalid or expired OTP');
  }

  const user = await User.findOne({ phoneNumber });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({ success: true, message: 'Password has been reset successfully' });
});