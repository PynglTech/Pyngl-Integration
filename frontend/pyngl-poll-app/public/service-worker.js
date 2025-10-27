// This listener runs when a push message is received
self.addEventListener('push', function(event) {
    // Parse the data from the push message
    const data = event.data.json();

    const title = data.title;
    const options = {
        body: data.body,
        icon: '/icons/icon-192x192.png', // Icon for the notification
        badge: '/icons/icon-96x96.png', // Small monochrome icon
        data: {
            url: data.url // URL to open when the notification is clicked
        }
    };

    // Show the notification
    event.waitUntil(self.registration.showNotification(title, options));
});

// This listener runs when the user clicks on the notification
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Close the notification

    // Open the URL that was passed in the data
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});