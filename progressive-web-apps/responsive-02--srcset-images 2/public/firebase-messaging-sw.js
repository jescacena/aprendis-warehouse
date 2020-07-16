importScripts("https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.15.5/firebase-messaging.js"
);

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA82vK8ZeMtaLLDmyk2NRB2awIZCpKs6oE",
    authDomain: "pwagram-785da.firebaseapp.com",
    databaseURL: "https://pwagram-785da.firebaseio.com",
    projectId: "pwagram-785da",
    storageBucket: "pwagram-785da.appspot.com",
    messagingSenderId: "670748072356",
    appId: "1:670748072356:web:e9d50bd15ef8a02977c931",
    measurementId: "G-TNXSX4WET6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function (payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});
