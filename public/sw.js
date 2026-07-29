importScripts('/sw-push.js');

const CACHE_NAME = 'him-os-v8-cache';
const urlsToCache = ['/', '/dashboard', '/career', '/finance', '/businesses/ventures', '/workspace'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
