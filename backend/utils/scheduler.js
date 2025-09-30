import cron from 'node-cron';
import Poll from '../models/Poll.js';
import Notification from '../models/Notification.js';
import User  from '../models/User.js';

const nudgeMessages = [
    "Hey, why wait for a reply? Drop a poll 👀",
    "Hungry for opinions? Cook up a poll 🍳",
    "Friend not texting back? Let strangers decide 😂",
    "Scrolling endlessly? Try polling endlessly 📊",
    "Need drama? Start a poll and watch the chaos 🧨"
];
/**
 * Initializes and starts the scheduled job for sending poll notifications.
 * @param {object} io The global Socket.IO instance from the server.
 */
const initScheduledJobs = (io) => {
    // This cron job is scheduled to run once every minute.
    cron.schedule('* * * * *', async () => {
        console.log('Running minute-by-minute check for expiring polls...');
        
        const now = new Date();
        const oneMinuteFromNow = new Date(now.getTime() + 1 * 60 * 1000);

        try {
            // Find polls that are:
            // 1. Not yet expired.
            // 2. Expiring within the next minute.
            // 3. Haven't had an "ending soon" notification sent yet.
            const expiringPolls = await Poll.find({
                expiresAt: { $gt: now, $lte: oneMinuteFromNow },
                endingSoonNotified: false
            });

            if (expiringPolls.length > 0) {
                console.log(`Found ${expiringPolls.length} poll(s) ending in the next minute.`);
            }

            // Process each expiring poll
            for (const poll of expiringPolls) {
                // Create an engaging, attractive notification message
                const notification = new Notification({
                    user: poll.author,
                    message: `Last chance to vote! Your poll "${poll.question}" is about to end.`,
                    link: `/poll/${poll._id}`
                });
                await notification.save();

                // Emit a real-time event to the specific user's socket "room"
                io.to(poll.author.toString()).emit('new_notification', notification);

                // Update the poll to mark that the notification has been sent
                poll.endingSoonNotified = true;
                await poll.save();
            }

        } catch (error) {
            console.error("Error in scheduled job for expiring polls:", error);
        }
    });

     cron.schedule('0 10 * * *', async () => { // Runs every day at 10:00 AM
        console.log('Running daily check for inactive users to nudge...');
    
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        
        // Step 1: Find all users who have EVER created a poll.
        // We use .distinct() to get a clean array of just their IDs.
        const usersWhoHavePosted = await Poll.distinct('author');

        // Step 2: Find users who meet ALL of the following criteria:
        // - Their ID is NOT in the list of users who have already posted.
        // - They signed up more than 24 hours ago (to avoid nudging brand new users).
        // - Optional: They haven't been nudged in the last 7 days (prevents spamming).
        const usersToNudge = await User.find({
            _id: { $nin: usersWhoHavePosted }, // The user's ID is "not in" the array
            createdAt: { $lt: twentyFourHoursAgo }, // Ensure they are not a brand new user
            // lastNudgeSentAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Your anti-spam logic
        });

        if (usersToNudge.length > 0) {
            console.log(`Found ${usersToNudge.length} user(s) to nudge.`);
        } else {
            console.log('No users to nudge today.');
            return;
        }
        
        // Step 3: Loop through ONLY the eligible users and send notifications.
        for (const user of usersToNudge) {
            const randomMessage = nudgeMessages[Math.floor(Math.random() * nudgeMessages.length)];

            const notification = new Notification({
                user: user._id,
                message: randomMessage,
                link: '/create-poll'
            });
            await notification.save();

            // Send the real-time notification
            io.to(user._id.toString()).emit('new_notification', notification);

            // Update the user so we don't spam them
            // This field should exist on your User model
            user.lastNudgeSentAt = new Date(); 
            await user.save();
        }
        } catch (error) {
            console.error("Error in nudge notification scheduler:", error);
        }
    });

    console.log('✅ All notification schedulers have been initialized.');
};


export default initScheduledJobs;