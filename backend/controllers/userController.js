// import User from '../models/User.js';
// import asyncHandler from '../middleware/asyncHandler.js';
// import generateToken from '../utils/generateToken.js';
// import sendEmail from '../utils/sendEmail.js';
// import crypto from 'crypto';
// import { sendOtp, verifyOtp } from '../utils/otpServices.js';
// import Poll from '../models/Poll.js';
// import Notification from '../models/Notification.js';
// // --- Authentication Controllers ---

// // @desc    Register a new user
// // @route   POST /api/users/register
// // @access  Public
// // export const registerUser = asyncHandler(async (req, res) => {
// //     const { username, email, password, phoneNumber } = req.body;

// //     const userExists = await User.findOne({ $or: [{ email }, { username }] });

// //     if (userExists) {
// //         res.status(400);
// //         throw new Error('User already exists');
// //     }

// //     const user = await User.create({
// //         username,
// //         email,
// //         password,
// //         phoneNumber,
// //     });

// //     if (user) {
// //         generateToken(res, user._id);
// //         res.status(201).json({
// //             _id: user._id,
// //             username: user.username,
// //             email: user.email,
// //             phoneNumber: user.phoneNumber,
// //             profilePictureUrl: user.profilePictureUrl,
// //         });
// //     } else {
// //         res.status(400);
// //         throw new Error('Invalid user data');
// //     }
// // });
// export const registerUser = asyncHandler(async (req, res) => {
//     const { username, email, password, phoneNumber } = req.body;

//     const userExists = await User.findOne({ $or: [{ email }, { username }] });
//     if (userExists) {
//         res.status(400);
//         throw new Error('User already exists');
//     }

//     const user = await User.create({ username, email, password, phoneNumber });
//     if (user) {
//         generateToken(res, user._id);

//         // --- NEW WELCOME NOTIFICATION LOGIC ---
//         const welcomeNotification = new Notification({
//             user: user._id,
//             message: "Welcome to Pyngl! Ready to find out what people are thinking?",
//             link: "/create-poll"
//         });
//         await welcomeNotification.save();

//         const io = req.app.get('io');
//         io.to(user._id.toString()).emit('new_notification', welcomeNotification);
        
//         res.status(201).json({
//             _id: user._id,
//             username: user.username,
//             email: user.email,
//             profilePictureUrl: user.profilePictureUrl,
//         });
//     } else {
//         res.status(400);
//         throw new Error('Invalid user data');
//     }
// });

// // @desc    Auth user & get token (Login)
// // @route   POST /api/users/login
// // @access  Public
// export const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//         generateToken(res, user._id);
//         res.status(200).json({
//             _id: user._id,
//             username: user.username,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             profilePictureUrl: user.profilePictureUrl,
//         });
//     } else {
//         res.status(401);
//         throw new Error('Invalid email or password');
//     }
// });

// // @desc    Logout user / clear cookie
// // @route   POST /api/users/logout
// // @access  Public
// export const logoutUser = (req, res) => {
//     res.cookie('jwt', '', {
//         httpOnly: true,
//         expires: new Date(0),
//     });
//     res.status(200).json({ message: 'Logged out successfully' });
// };
// export const getUserProfileStats = asyncHandler(async (req, res) => {
//     const userId = req.user._id;
//     const { period = 'all-time' } = req.query;

//     let startDate;
//     if (period === 'week') {
//         startDate = new Date();
//         startDate.setDate(startDate.getDate() - 7);
//     } else if (period === 'month') {
//         startDate = new Date();
//         startDate.setMonth(startDate.getMonth() - 1);
//     }

//     const pingsCreatedQuery = { author: userId };
//     if (startDate) {
//         pingsCreatedQuery.createdAt = { $gte: startDate };
//     }
//     const pingsCreated = await Poll.countDocuments(pingsCreatedQuery);

//     const participationPipeline = [{ $match: { author: userId } }, { $unwind: "$votedBy" }];
//     if (startDate) {
//         participationPipeline.push({ $match: { "votedBy.votedAt": { $gte: startDate } } });
//     }
//     participationPipeline.push({ $count: "total" });
    
//     const participationResult = await Poll.aggregate(participationPipeline);
//     const totalParticipate = participationResult.length > 0 ? participationResult[0].total : 0;
    
//     res.status(200).json({ pingsCreated, totalParticipate });
// });

// // @desc    Update user profile information (name, email, phone)
// // @route   PUT /api/users/profile
// // @access  Private
// export const updateUserProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user._id);

//     if (user) {
//         user.username = req.body.name || user.username;
//         user.email = req.body.email || user.email;
//         user.phoneNumber = req.body.phone || user.phoneNumber;

//         const updatedUser = await user.save();

//         res.status(200).json({
//             _id: updatedUser._id,
//             username: updatedUser.username,
//             email: updatedUser.email,
//             phoneNumber: updatedUser.phoneNumber,
//             profilePictureUrl: updatedUser.profilePictureUrl,
//         });
//     } else {
//         res.status(404);
//         throw new Error('User not found');
//     }
// });

// // @desc    Update user password
// // @route   PUT /api/users/profile/password
// // @access  Private
// export const updateUserPassword = asyncHandler(async (req, res) => {
//     const { oldPassword, newPassword } = req.body;
//     const user = await User.findById(req.user._id);

//     if (user && (await user.matchPassword(oldPassword))) {
//         user.password = newPassword;
//         await user.save();
//         res.status(200).json({ message: 'Password updated successfully' });
//     } else {
//         res.status(401);
//         throw new Error('Invalid old password');
//     }
// });

// // @desc    Update user profile picture
// // @route   PUT /api/users/profile/picture
// // @access  Private
// export const updateUserProfilePicture = asyncHandler(async (req, res) => {
//     if (!req.file) {
//         res.status(400);
//         throw new Error('No image file provided.');
//     }

//     const user = await User.findById(req.user._id);

//     if (user) {
//         user.profilePictureUrl = req.file.path; // URL from Cloudinary
//         const updatedUser = await user.save();
        
//         res.status(200).json({
//             _id: updatedUser._id,
//             username: updatedUser.username,
//             email: updatedUser.email,
//             phoneNumber: updatedUser.phoneNumber,
//             profilePictureUrl: updatedUser.profilePictureUrl,
//         });
//     } else {
//         res.status(404);
//         throw new Error('User not found.');
//     }
// });
// // @desc    Request password reset via Email OTP
// // @route   POST /api/users/forgotpassword
// // @access  Public
// export const forgotPassword = asyncHandler(async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     res.status(404);
//     throw new Error('There is no user with that email address.');
//   }

//   const resetOtp = user.generatePasswordResetOtp();
//   await user.save({ validateBeforeSave: false });

//   const message = `Your password reset OTP is: ${resetOtp}\n\nThis OTP is valid for 10 minutes.`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: 'Your Password Reset OTP',
//       message,
//     });
//     res.status(200).json({ success: true, message: 'OTP sent to email' });
//   } catch (err) {
//     console.error(err);
//     user.passwordResetOtp = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save({ validateBeforeSave: false });
//     res.status(500);
//     throw new Error('Email could not be sent');
//   }
// });

// // @desc    Reset password with Email OTP
// // @route   PUT /api/users/resetpassword
// // @access  Public
// export const resetPassword = asyncHandler(async (req, res) => {
//   const { email, otp, password } = req.body;

//   if (!email || !otp || !password) {
//     res.status(400);
//     throw new Error('Please provide email, OTP, and a new password.');
//   }

//   const hashedOtp = crypto
//     .createHash('sha256')
//     .update(otp)
//     .digest('hex');

//   const user = await User.findOne({
//     email,
//     passwordResetOtp: hashedOtp,
//     passwordResetExpires: { $gt: Date.now() },
//   });

//   if (!user) {
//     res.status(400);
//     throw new Error('Invalid OTP or OTP has expired.');
//   }

//   user.password = password;
//   user.passwordResetOtp = undefined;
//   user.passwordResetExpires = undefined;
//   await user.save();
  
//   res.status(200).json({ 
//     success: true, 
//     message: 'Password reset successful.',
//   });
// });

// // @desc    Request password reset via Phone OTP
// // @route   POST /api/users/forgotpassword-otp
// // @access  Public
// export const forgotPasswordOtp = asyncHandler(async (req, res) => {
//   const { phoneNumber, channel = 'sms' } = req.body;
//   const user = await User.findOne({ phoneNumber });

//   if (!user) {
//     res.status(404);
//     throw new Error('User with that phone number not found');
//   }

//   await sendOtp(phoneNumber, channel);
//   res.status(200).json({ success: true, message: `OTP sent to ${phoneNumber} via ${channel}` });
// });

// // @desc    Reset password using Phone OTP
// // @route   POST /api/users/resetpassword-otp
// // @access  Public
// export const resetPasswordOtp = asyncHandler(async (req, res) => {
//   const { phoneNumber, otpCode, newPassword } = req.body;

//   const isValidOtp = await verifyOtp(phoneNumber, otpCode);

//   if (!isValidOtp) {
//     res.status(400);
//     throw new Error('Invalid or expired OTP');
//   }

//   const user = await User.findOne({ phoneNumber });
//   if (!user) {
//     res.status(404);
//     throw new Error('User not found');
//   }

//   user.password = newPassword;
//   await user.save();

//   res.status(200).json({ success: true, message: 'Password has been reset successfully' });
// });
// // export const getUserProfileStats = asyncHandler(async (req, res) => {
// //     const userId = req.user._id;
// //     const { period = 'all-time' } = req.query; // Expects 'week', 'month', or 'all-time'

// //     // Determine the date range for the filter
// //     let startDate;
// //     const now = new Date();
// //     if (period === 'week') {
// //         startDate = new Date(new Date().setDate(now.getDate() - 7));
// //     } else if (period === 'month') {
// //         startDate = new Date(new Date().setMonth(now.getMonth() - 1));
// //     }

// //     // --- 1. Calculate Pings Created by the user ---
// //     const pingsCreatedQuery = { author: userId };
// //     if (startDate) {
// //         pingsCreatedQuery.createdAt = { $gte: startDate };
// //     }
// //     const pingsCreated = await Poll.countDocuments(pingsCreatedQuery);

// //     // --- 2. Calculate Total Participation ON the user's polls ---
// //     const participationPipeline = [
// //         { $match: { author: userId } }, // Find polls created by the user
// //         { $unwind: "$votedBy" } // Deconstruct the array to process each vote
// //     ];

// //     if (startDate) {
// //         participationPipeline.push({
// //             $match: { "votedBy.votedAt": { $gte: startDate } } // Filter votes by date
// //         });
// //     }

// //     participationPipeline.push({
// //         $count: "total" // Count the remaining documents
// //     });

// //     const participationResult = await Poll.aggregate(participationPipeline);
// //     const totalParticipate = participationResult.length > 0 ? participationResult[0].total : 0;
    
// //     res.status(200).json({
// //         pingsCreated,
// //         totalParticipate
// //     });
// // }); 

import User from '../models/User.js';
import Poll from '../models/Poll.js';
import Notification from '../models/Notification.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import { sendOtp, verifyOtp } from '../utils/otpServices.js';

// --- Reusable function to format user data for responses ---
const formatUserResponse = (user) => {
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePictureUrl: user.profilePictureUrl,
        birthDate: user.birthDate, // NEW: Include birthDate
        age: user.age,             // NEW: Include virtual age property
    };
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
    export const registerUser = asyncHandler(async (req, res) => {
        // NEW: Destructure birthDate from the request body
        const { username, email, password, phoneNumber, birthDate } = req.body;

        // MERGED: Using the more robust check for existing users
        const userExists = await User.findOne({ 
            $or: [{ email }, { username }, { phoneNumber }] 
        });

        if (userExists) {
            res.status(400);
            throw new Error('User with given email, username, or phone number already exists');
        }

        const user = await User.create({ 
            username, 
            email, 
            password, 
            phoneNumber,
            birthDate // NEW: Save birthDate on creation
        });

        if (user) {
            generateToken(res, user._id);

            // Kept your welcome notification logic
            const welcomeNotification = new Notification({
                user: user._id,
                message: "Welcome to Pyngl! Ready to find out what people are thinking?",
                link: "/create-poll"
            });
            await welcomeNotification.save();

            const io = req.app.get('io');
            io.to(user._id.toString()).emit('new_notification', welcomeNotification);
            
            res.status(201).json(formatUserResponse(user));
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    });

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        
        // Record login for the nudge scheduler
        await user.recordLogin();

        res.status(200).json(formatUserResponse(user));
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user's poll creation and participation stats
// @route   GET /api/users/profile/stats
// @access  Private
export const getUserProfileStats = asyncHandler(async (req, res) => {
    // This entire function from your file is preserved as it's a great feature.
    const userId = req.user._id;
    const { period = 'all-time' } = req.query;
    let startDate;
    if (period === 'week') {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
    }
    const pingsCreatedQuery = { author: userId };
    if (startDate) {
        pingsCreatedQuery.createdAt = { $gte: startDate };
    }
    const pingsCreated = await Poll.countDocuments(pingsCreatedQuery);
    const participationPipeline = [
      { $match: { author: userId } }, 
      { $unwind: "$votedBy" },
      ...(startDate ? [{ $match: { "votedBy.votedAt": { $gte: startDate } } }] : []),
      { $count: "total" }
    ];
    const participationResult = await Poll.aggregate(participationPipeline);
    const totalParticipate = participationResult.length > 0 ? participationResult[0].total : 0;
    res.status(200).json({ pingsCreated, totalParticipate });
});

// @desc    Update user profile information
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        // NEW: Allow updating birthDate
        user.birthDate = req.body.birthDate || user.birthDate;

        const updatedUser = await user.save();
        res.status(200).json(formatUserResponse(updatedUser));
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user password
// @route   PUT /api/users/profile/password
// @access  Private
export const updateUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (user && (await user.matchPassword(oldPassword))) {
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } else {
        res.status(401);
        throw new Error('Invalid old password');
    }
});

// @desc    Update user profile picture
// @route   PUT /api/users/profile/picture
// @access  Private
export const updateUserProfilePicture = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No image file provided.');
    }
    const user = await User.findById(req.user._id);
    if (user) {
        user.profilePictureUrl = req.file.path; // URL from Cloudinary
        const updatedUser = await user.save();
        res.status(200).json(formatUserResponse(updatedUser));
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
});

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
        await sendEmail({ email: user.email, subject: 'Your Password Reset OTP', message });
        res.status(200).json({ success: true, message: 'OTP sent to email' });
    } catch (err) {
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

    // --- CRITICAL FIX ---
    // The OTP is stored in plain text, so we find it directly without hashing.
    const user = await User.findOne({
        email,
        passwordResetOtp: otp, // Find the plain text OTP
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
    res.status(200).json({ success: true, message: 'Password reset successful.' });
});

// --- Phone OTP functions are preserved from your file ---

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