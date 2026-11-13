// Heinrich AI — Image cache service worker
// Uses the Cache API to cache /Images/* cache-first so images load instantly on
// repeat visits and work offline. Falls back to the network and caches new images.

const CACHE_NAME = "heinrich-ai-v1";
const IMAGE_CACHE = "heinrich-ai-images-v1";
const IMAGE_PATTERN = /\/Images\/|images\.unsplash\.com/;

const PRECACHE_URLS = ["/", "/Images/heinrich-logo.png", "/styles.css", "/script.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME && key !== IMAGE_CACHE)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Cache-first strategy for images (the image cache)
  if (IMAGE_PATTERN.test(url.pathname)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) =>
        cache.match(event.request).then((cached) => {
          if (cached) return cached;
          return fetch(event.request).then((response) => {
            if (response.ok) cache.put(event.request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  // Network-first for everything else; fall back to cache when offline
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
