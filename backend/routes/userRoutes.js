// /backend/routes/userRoutes.js

import express from 'express';
import passport from 'passport';
import { protect, checkAuth } from '../middleware/authMiddleware.js';
import generateToken from '../utils/generateToken.js';
import { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  resetPassword ,
  forgotPasswordOtp,
  resetPasswordOtp,
  logoutUser,
  getUserProfileStats,
    updateUserProfile,
    updateUserPassword,
    updateUserProfilePicture,
    saveUserLocation 
} from '../controllers/userController.js';
import { upload } from '../config/cloudinary.js';
const router = express.Router();
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.post('/forgotpassword-otp', forgotPasswordOtp); // New route for OTP-based forgot password
router.post('/resetpassword-otp', resetPasswordOtp); // New route for OTP-based reset password
router.put('/resetpassword', resetPassword); // PUT is often used for updates
router.post('/logout', logoutUser);
router.get('/profile-stats', protect, getUserProfileStats);
router.put('/profile', protect, updateUserProfile);
router.put('/profile/password', protect, updateUserPassword);
router.put(
    '/profile/picture', 
    protect, 
    upload.single('profilePicture'), 
    updateUserProfilePicture
);
router.post('/save-location', protect,  saveUserLocation);
// @desc    Google auth callback
router.get('/auth/google/callback', 
    // If authentication fails, redirect back to the frontend's root page
    passport.authenticate('google', { 
        failureRedirect: 'https://localhost:5173/', 
        session: false 
    }), 
    (req, res) => {
        // If successful, Passport attaches the user to req.user
        // Now, we generate our own login token for them
        generateToken(res, req.user._id);

        // ✅ FIX: Redirect to the full URL of your frontend dashboard
        res.redirect('https://localhost:5173/dashboard');
    }
);  
export default router;