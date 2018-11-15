declare var browser: any;

browser.runtime.onMessage.addListener(notificationOptions => {
    browser.notifications.create(notificationOptions);
});
