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
  saveUserContacts
} from '../controllers/userController.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// =============================
// USER AUTH ROUTES
// =============================
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/status', checkAuth, getUserStatus);

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
