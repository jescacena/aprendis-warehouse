importScripts("workbox-sw.prod.v2.1.3.js");

const workboxSW = new self.WorkboxSW();

workboxSW.router.registerRoute(
    /.*(?:googleapis|gstatic|cloudflare)\.com.*$/,
    workboxSW.strategies.staleWhileRevalidate({
        cacheName: "cache-then-network-dynamic-store",
    })
);

workboxSW.precache([
  {
    "url": "favicon.ico",
    "revision": "2cab47d9e04d664d93c8d91aec59e812"
  },
  {
    "url": "index.html",
    "revision": "4535e529ce061b83fd4213885e1591c2"
  },
  {
    "url": "manifest.json",
    "revision": "9414e5c1faada3e15e0e38f79a409363"
  },
  {
    "url": "src/css/app.css",
    "revision": "dc2e7652d77e3e0ce746641592abc77f"
  },
  {
    "url": "src/css/feed.css",
    "revision": "729d4d24de8f530a402372b7eecb9ec6"
  },
  {
    "url": "src/css/help.css",
    "revision": "1c6d81b27c9d423bece9869b07a7bd73"
  },
  {
    "url": "src/js/app.js",
    "revision": "2d07cf8da6c0d9139e9d1282e36325c8"
  },
  {
    "url": "src/js/feed.js",
    "revision": "4fda02badb9e93c63ba4c158815d617c"
  },
  {
    "url": "src/js/fetch.js",
    "revision": "6b82fbb55ae19be4935964ae8c338e92"
  },
  {
    "url": "src/js/material.min.js",
    "revision": "713af0c6ce93dbbce2f00bf0a98d0541"
  },
  {
    "url": "src/js/promise.js",
    "revision": "10c2238dcd105eb23f703ee53067417f"
  },
  {
    "url": "sw-base.js",
    "revision": "a23f12294dd521cd313999af5d22a904"
  },
  {
    "url": "sw-workbox.js",
    "revision": "31e3b002af13dd7d6c20862a1381c447"
  },
  {
    "url": "workbox-sw.prod.v2.1.3.js",
    "revision": "a9890beda9e5f17e4c68f42324217941"
  },
  {
    "url": "src/images/main-image-lg.jpg",
    "revision": "31b19bffae4ea13ca0f2178ddb639403"
  },
  {
    "url": "src/images/main-image-sm.jpg",
    "revision": "c6bb733c2f39c60e3c139f814d2d14bb"
  },
  {
    "url": "src/images/main-image.jpg",
    "revision": "5c66d091b0dc200e8e89e56c589821fb"
  }
]);
