import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    
    // The user who will receive the notification
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // The content of the notification
    message: {
        type: String,
        required: true,
    },
    // A link to navigate to when the notification is clicked (e.g., /poll/:id)
    link: {
        type: String,
        required: true,
    },
    // A flag to track if the notification has been seen by the user
    read: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
