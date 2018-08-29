const doCache = false;

const CACHE_NAME = 'my-pwa-cache-v1';

// eslint-disable-next-line
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            // eslint-disable-next-line
            console.log(`Deleting cache: ${key}`);
            return caches.delete(key);
          }
          return undefined;
        })
      )
    )
  );
});

// eslint-disable-next-line
self.addEventListener('install', event => {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        fetch('manifest.json')
          .then(response => {
            response.json();
          })
          .then(assets => {
            const urlsToCache = ['/', assets['main.js']];
            cache.addAll(urlsToCache);

            // eslint-disable-next-line
            console.log('cached');
          });
      })
    );
  }
});

// eslint-disable-next-line
self.addEventListener('fetch', event => {
  if (doCache) {
    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
  }
});
