import express from 'express';
import { getNotifications, markNotificationsAsRead,markSingleNotificationAsRead,deleteNotification} from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes in this file are protected and require a logged-in user
router.use(protect);

router.route('/')
    .get(getNotifications);

router.route('/mark-as-read')
    .post(markNotificationsAsRead);

router.route('/:id/read')
    .put(markSingleNotificationAsRead);
router.route('/:id')
    .delete(deleteNotification);

export default router;