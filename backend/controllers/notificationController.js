import Notification from '../models/Notification.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc    Get all notifications for the logged-in user
// @route   GET /api/notifications
// @access  Private
export const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .limit(50); // Limit to the 50 most recent notifications

    res.status(200).json(notifications);
});

// @desc    Mark all unread notifications as read
// @route   POST /api/notifications/mark-as-read
// @access  Private
export const markNotificationsAsRead = asyncHandler(async (req, res) => {
    await Notification.updateMany(
        { user: req.user._id, read: false },
        { $set: { read: true } }
    );
    res.status(200).json({ message: 'Notifications marked as read' });
});
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markSingleNotificationAsRead = asyncHandler(async (req, res) => {
    const notification = await Notification.findOneAndUpdate(
        // Find the notification by its ID, ensuring it belongs to the logged-in user
        { _id: req.params.id, user: req.user._id },
        // Set its 'read' status to true
        { $set: { read: true } },
        // Return the updated document
        { new: true }
    );

    if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json(notification);
});

export const deleteNotification = asyncHandler(async (req, res) => {
    const notification = await Notification.findOne({
        _id: req.params.id,
        user: req.user._id // IMPORTANT: Ensures a user can only delete their own notifications
    });

    if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
    }

    await notification.deleteOne();

    res.status(200).json({ message: 'Notification removed' });
});
