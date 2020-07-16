var CACHE_STATIC = 'static-v2';
var CACHE_DYNAMIC = 'dynamic-v1';


self.addEventListener("install", function (event) {
    console.log("[Service Worker] Installing Service Worker ...");

    event.waitUntil(
        caches.open(CACHE_STATIC).then(function (cache) {
            console.log("[Service Worker] Preaching App Shell");
            cache.addAll([
                "/",
                "/index.html",
                "/src/css/app.css",
                "/src/css/main.css",
                "/src/css/dynamic.css",
                "/src/js/main.js",
                "/src/js/material.min.js",
                "https://fonts.googleapis.com/css?family=Roboto:400,700",
                "https://fonts.googleapis.com/icon?family=Material+Icons",
                "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
            ]);
        })
    );
});

self.addEventListener("activate", function (event) {
    console.log("[Service Worker] Activating Service Worker ...");

    event.waitUntil(
      caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if(key !== CACHE_STATIC && key !== CACHE_DYNAMIC) {
            console.log('[Service worker] Removing old cache.', key);
            return caches.delete(key);            
          }
        }));
      })
    );

    return self.clients.claim();
});

function fetchAndDynamicCache(request) {
    return fetch(request).then(function (res) {
        caches.open(CACHE_DYNAMIC).then(function (cache) {
            cache.put(request.url, res.clone());
            return res;
        })
        .catch(function(error) {
          console.log('fetchAndDynamicCache error', error);
        });
    });
}
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response ? response : fetchAndDynamicCache(event.request);
        })
    );
});