importScripts("workbox-sw.prod.v2.1.3.js");

const workboxSW = new self.WorkboxSW();

workboxSW.router.registerRoute(
    /.*(?:googleapis|gstatic|cloudflare)\.com.*$/,
    workboxSW.strategies.staleWhileRevalidate({
        cacheName: "cache-then-network-dynamic-store",
    })
);

workboxSW.precache([]);
