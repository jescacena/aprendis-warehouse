self.addEventListener("install", function (event) {
    console.log("[Service Worker] Installing Service Worker ...", event);
});
self.addEventListener("activate", function (event) {
    console.log("[Service Worker] Activating Service Worker ...", event);
    return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
    console.log("[Service Worker] Fetching something ...", event.request.url);
    event.respondWith(fetch(event.request));
});

self.addEventListener("beforeinstallprompt", (e) => {
    console.log("[Service Worker] Install prompt ...", event);

    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    // showInstallPromotion();

    return false;
});