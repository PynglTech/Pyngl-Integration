import webpush from 'web-push';

// Configure web-push with your VAPID keys from your .env file
webpush.setVapidDetails(
  `mailto:${process.env.VAPID_MAILTO_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

console.log('Push notification service configured.');

// The function to send a single notification
async function sendPushNotification(subscription, payload) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
  } catch (error) {
    console.error('Error sending notification, subscription probably expired.', error.statusCode);
    // If a subscription is expired (status code 410), you should delete it from your database.
  }
}

// Use the modern 'export' keyword
export { sendPushNotification };