var deferredPrompt;

var enableNotifButtons = document.querySelectorAll(".enable-notifications");

if (!window.Promise) {
    window.Promise = Promise;
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/sw.js")
        .then(function () {
            console.log("Service worker registered!");
        })
        .catch(function (err) {
            console.log(err);
        });
}

window.addEventListener("beforeinstallprompt", function (event) {
    console.log("beforeinstallprompt fired");
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

function displayConfirmNotification() {
    if ("serviceWorker" in navigator) {
        var options = {
            body: "Jander clander notifications",
            icon: "/src/images/icons/app-icon-96x96.png",
            image: "/src/images/sf-boat.jpg",
            dir: "ltr",
            lang: "en-US",
            vibrate: [100, 50, 200],
            badge: "/src/images/icons/app-icon-96x96.png",
            tag: "confirm-notification",
            renotify: true,
            actions: [
                {
                    action: "confirm",
                    title: "Ok",
                    icon: "/src/images/icons/app-icon-96x96.png",
                },
                {
                    action: "cancel",
                    title: "Cancel",
                    icon: "/src/images/icons/app-icon-96x96.png",
                },
            ],
        };

        navigator.serviceWorker.ready.then(function (swreg) {
            swreg.showNotification("Successfully subscribed", options);
        });
    }
}

function configurePushSub() {
    var reg;

    navigator.serviceWorker.ready
        .then(function (swreg) {
            reg = swreg;
            return swreg.pushManager.getSubscription();
        })
        .then(function (sub) {
            if (sub === null) {
                // Create a new subscription
                var vapidPublicKey =
                    "BNgISP529ZookmSYgUfED4FJfVN9o398zfBUEGsE2dYNE5sZxPdhlzSr__Qd6kKJMAdiQ0ZMbNaD8lGAX_bAOus";
                const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
                return reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidKey,
                });
            } else {
                // We have a subscription
            }
        })
        .then(function (newSub) {
            return fetch("http://localhost:3000/subscriptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(newSub)
            }).then(function () {
                displayConfirmNotification();
            });
        });
}

function askForNotificationPermissions() {
    Notification.requestPermission(function (result) {
        console.log("User choice", result);
        if (result != "granted") {
            console.log("No notification permission granted!");
        } else {
            configurePushSub();
        }
    });
}

if ("Notification" in window && "serviceWorker" in navigator) {
    enableNotifButtons.forEach(function (item) {
        item.display = "inline-block";
        item.addEventListener("click", askForNotificationPermissions);
    });
}
