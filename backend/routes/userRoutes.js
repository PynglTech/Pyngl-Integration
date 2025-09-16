// /backend/routes/userRoutes.js

import express from 'express';
import { 
  registerUser, 
  loginUser, 
  forgotPassword, 
  resetPassword ,
  forgotPasswordOtp,
  resetPasswordOtp,
  logoutUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);
router.post('/forgotpassword-otp', forgotPasswordOtp); // New route for OTP-based forgot password
router.post('/resetpassword-otp', resetPasswordOtp); // New route for OTP-based reset password
router.put('/resetpassword', resetPassword); // PUT is often used for updates
router.post('/logout', logoutUser);
export default router;