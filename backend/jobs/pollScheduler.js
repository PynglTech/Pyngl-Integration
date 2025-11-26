import cron from 'node-cron';
import Poll from '../models/Poll.js'; // Added .js
import User from '../models/User.js'; // Added .js
import { sendPushNotification } from '../services/notificationService.js'; // Added .js

const schedulePollNotifications = () => {
  // This task runs every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    console.log('Running job to check for expiring polls...');

    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    const expiringPolls = await Poll.find({
      expiresAt: { $gte: now, $lte: oneHourFromNow },
      notificationSent: { $ne: true }
    }).populate('createdBy'); // Use populate to get the user object

    for (const poll of expiringPolls) {
      const user = poll.createdBy;

      if (user && user.pushSubscriptions && user.pushSubscriptions.length > 0) {
        const payload = {
          title: 'Your poll is ending soon!',
          body: `"${poll.question}" will close in less than an hour.`,
          url: `http://localhost:5173/analytics/${poll._id}`|| `https://192.168.1.12:5173/analytics/${poll._id}` || `https://pyngl.com/analytics/${poll.id}` // Adjust URL as needed
        };

        for (const sub of user.pushSubscriptions) {
          await sendPushNotification(sub, payload);
        }

        poll.notificationSent = true;
        await poll.save();
      }
    }
  });
};

export { schedulePollNotifications };