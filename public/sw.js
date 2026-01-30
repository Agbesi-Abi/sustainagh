const CACHE_NAME = "sustaina-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(err => {
        console.error('Fetch failed:', err);
        // Return a service unavailable response to prevent uncaught errors
        return new Response('Service Unavailable', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});
