import express from 'express';
import { requestRegistrationCode } from '../controllers/whatsappAdminController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// This is a protected route; only a logged-in admin should be able to access it.
router.post('/request-code', protect, requestRegistrationCode);

export default router;
