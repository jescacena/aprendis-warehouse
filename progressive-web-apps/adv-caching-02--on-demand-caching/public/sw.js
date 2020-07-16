importScripts("/src/js/idb.js");
importScripts("/src/js/utility.js");

var CACHE_STATIC_NAME = "static-v22";
var CACHE_DYNAMIC_NAME = "dynamic-v2";
var STATIC_FILE_LIST = [
    "/",
    "/index.html",
    "/offline.html",
    "/src/js/app.js",
    "/src/js/feed.js",
    "/src/js/idb.js",
    "/src/js/utility.js",
    "/src/js/promise.js",
    "/src/js/fetch.js",
    "/src/js/material.min.js",
    "/src/css/app.css",
    "/src/css/feed.css",
    "/src/images/main-image.jpg",
    "https://fonts.googleapis.com/css?family=Roboto:400,700",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
];

self.addEventListener("install", function (event) {
    console.log("[Service Worker] Installing Service Worker ...", event);
    event.waitUntil(
        caches.open(CACHE_STATIC_NAME).then(function (cache) {
            console.log("[Service Worker] Precaching App Shell");
            cache.addAll(STATIC_FILE_LIST);
        })
    );
});

function isInCacheStaticFiles(url) {
    STATIC_FILE_LIST.forEach(function (item) {
        if (item === url) {
            return true;
        }
    });

    return false;
}

self.addEventListener("activate", function (event) {
    console.log("[Service Worker] Activating Service Worker ....", event);
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(
                keyList.map(function (key) {
                    if (
                        key !== CACHE_STATIC_NAME &&
                        key !== CACHE_DYNAMIC_NAME
                    ) {
                        console.log(
                            "[Service Worker] Removing old cache.",
                            key
                        );
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

function trimCache(cacheName, maxItems) {
    caches.open(cacheName).then(function (cache) {
        cache.keys().then(function (items) {
            if (items.length > maxItems) {
                cache.delete(items[0]).then(trimCache(cacheName, maxItems));
            }
        });
    });
}

function fetchAndSaveToIndexedDB(request) {
    return fetch(request).then(function (res) {
        var clonedRes = res.clone();
        clearAllData("posts").then(function () {
            clonedRes.json().then(function (data) {
                data.forEach(function (item) {
                    writePromise("posts", item);
                });
            });
        });
        return res;
    });
}

self.addEventListener("fetch", function (event) {
    var url = "http://localhost:3000/posts";

    if (event.request.url.indexOf(url) > -1) {
        event.respondWith(fetchAndSaveToIndexedDB(event.request));
    } else if (isInCacheStaticFiles(event.request.url)) {
        event.respondWith(caches.match(event.request));
    } else {
        event.respondWith(
            caches.match(event.request).then(function (response) {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(function (res) {
                            return caches
                                .open(CACHE_DYNAMIC_NAME)
                                .then(function (cache) {
                                    // trimCache(CACHE_DYNAMIC_NAME, 3);
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                });
                        })
                        .catch(function (err) {
                            return caches
                                .open(CACHE_STATIC_NAME)
                                .then(function (cache) {
                                    if (
                                        event.request.headers
                                            .get("accept")
                                            .includes("text/html")
                                    ) {
                                        return cache.match("/offline.html");
                                    }
                                });
                        });
                }
            })
        );
    }
});
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         } else {
//           return fetch(event.request)
//             .then(function(res) {
//               return caches.open(CACHE_DYNAMIC_NAME)
//                 .then(function(cache) {
//                   cache.put(event.request.url, res.clone());
//                   return res;
//                 })
//             })
//             .catch(function(err) {
//               return caches.open(CACHE_STATIC_NAME)
//               .then(function(cache) {
//                 return cache.match('/offline.html');
//               });
//             });
//         }
//       })
//   );
// });

// // Cache-only
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//   );
// });

// // Network-only
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request)
//   );
// });

// Network with cache fallback ( + dynamic caching on success)
// self.addEventListener("fetch", function (event) {
//     event.respondWith(
//         fetch(event.request)
//             .then(function (res) {
//                 return caches.open(CACHE_DYNAMIC_NAME).then(function (cache) {
//                     cache.put(event.request.url, res.clone());
//                     return res;
//                 });
//             })
//             .catch(function (error) {
//                 return caches.match(event.request);
//             })
//     );
// });
