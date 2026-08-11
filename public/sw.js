/**
 * Neutral /sw.js for localhost.
 * Exists so stale registrations stop 404-looping. Does NOT navigate clients
 * (navigate previously caused an infinite reload loop in next dev).
 */
self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
    })(),
  );
});
