import express from 'express';
import passport from 'passport';
import { protect, checkAuth } from '../middleware/authMiddleware.js';
import generateToken from '../utils/generateToken.js';
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  forgotPasswordOtp,
  resetPasswordOtp,
  logoutUser,
  getUserProfileStats,
  updateUserProfile,
  updateUserPassword,
  updateUserProfilePicture,
  saveUserLocation,
  getUserStatus,
  getUserContacts,
  saveUserContacts,
  checkUsernameAvailability,
  sendOtpToEmail,
  checkEmailAvailability,
  verifyEmailOtp
} from '../controllers/userController.js';
import { upload } from '../config/cloudinary.js';
import User from "../models/User.js";

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL ||'https://pyngl-whatsapp-integrations.vercel.app' ||'https://pyngl-whatsapp-integrations.vercel.app';
// router.get("/debug-contacts/:email", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email });
  
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json({
//       email: user.email,
//       totalContacts: user.googleContacts?.length || 0,
//       googleContacts: user.googleContacts
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// =============================
// USER AUTH ROUTES
// =============================
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/check-username', checkUsernameAvailability);
router.post('/send-otp', sendOtpToEmail);
router.post('/verify-otp', verifyEmailOtp);
router.get('/status', checkAuth, getUserStatus);
router.post('/check-email', checkEmailAvailability);
// =============================
// PASSWORD MANAGEMENT
// =============================
router.post('/forgotpassword', forgotPassword);
router.post('/forgotpassword-otp', forgotPasswordOtp);
router.post('/resetpassword-otp', resetPasswordOtp);
router.put('/resetpassword', resetPassword);

// =============================
// USER PROFILE
// =============================

router.get('/profile-stats', protect, getUserProfileStats);
router.get("/contacts", protect, getUserContacts);

router.put('/profile', protect, updateUserProfile);
router.put('/profile/password', protect, updateUserPassword);
router.put(
  '/profile/picture',
  protect,
  upload.single('profilePicture'),
  updateUserProfilePicture
);
router.post('/save-location', protect, saveUserLocation);

// =============================
// GOOGLE OAUTH
// =============================
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: FRONTEND_URL,
    session: false,
  }),
  (req, res) => {
    generateToken(res, req.user._id);
    res.redirect(`${FRONTEND_URL}/dashboard`);
  }
);


router.post("/save-contacts", protect, saveUserContacts);

export default router;
