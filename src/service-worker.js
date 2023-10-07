const cacheVersion = 'alumni-v1';
const dynamicCacheName = 'alumni-dynamic-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      const cacheMaxAgeInSeconds = 300; // 5 minutes
      if (response && Date.now() - new Date(response.headers.get('date')) < cacheMaxAgeInSeconds * 1000) {
        return response;
      }
      return fetch(event.request)
        .then(networkResponse => {
          const clonedResponse = networkResponse.clone();
          caches.open(dynamicCacheName)
            .then(cache => cache.put(event.request, clonedResponse));
          return networkResponse;
        })
        .catch(() => {
          return response || caches.match('/offline.html');
        });
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== cacheVersion)
          .map(name => caches.delete(name))
      );
    })
  );
});





// const dynamicCacheName = 'alumni-dynamic-cache-v1';

// self.addEventListener('install', (event) => {
//   event.waitUntil(self.skipWaiting());
// });

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request).then(response => {
//       const cacheMaxAgeInSeconds = 300; // 5 minutes
//       if (response && Date.now() - new Date(response.headers.get('date')) < cacheMaxAgeInSeconds * 1000) {
//         return response;
//       }
//       return fetch(event.request)
//         .then(networkResponse => {
//           const clonedResponse = networkResponse.clone();
//           caches.open(dynamicCacheName)
//             .then(cache => cache.put(event.request, clonedResponse));
//           return networkResponse;
//         })
//         .catch(() => {
//           return response || caches.match('/offline.html');
//         });
//     })
//   );
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(self.clients.claim());
// });



// const CACHE_NAME = 'my-cache-v1';
// const cacheUrls = [
//   '/',
//   '/index.html',
// //   '/styles/main.css',
// //   '/scripts/main.js',
// //   '/images/logo.png'
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(cacheUrls);
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request).then((fetchResponse) => {
//         if (fetchResponse && fetchResponse.status === 200) {
//           const responseClone = fetchResponse.clone();
//           caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, responseClone);
//           });
//         }
//         return fetchResponse;
//       });
//     })
//   );
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((name) => {
//           if (name !== CACHE_NAME) {
//             return caches.delete(name);
//           }
//         })
//       );
//     })
//   );
// });



// Old code start
// import { precacheAndRoute } from 'workbox-precaching';
// import { registerRoute } from 'workbox-routing';
// import { NetworkFirst } from 'workbox-strategies';
// import { ExpirationPlugin } from 'workbox-expiration';
// import { clientsClaim } from 'workbox-core';

// clientsClaim();

// // Define your cache entries as an array of objects with URL and revision info
// const cacheEntries = [
//     { url: '/icons/icon192.png', revision: '12345' },
//     { url: '/path/to/file2', revision: '67890' },
// ];

// precacheAndRoute(cacheEntries);

// registerRoute(
//     ({ request }) => request.method === 'PUT',
//     new NetworkFirst({
//         cacheName: 'alumni-cache-post',
//         plugins: [
//             new ExpirationPlugin({
//                 maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
//                 maxEntries: 100,
//             }),
//         ],
//     })
// );
// Old code end

// New code start
// const CACHE_NAME = 'alumni-cache-v1';

// // Define your cache URLs
// const cacheUrls = [
//   '/',
//   '/icons/icon192.png',
//   '/path/to/file2',
//   // Add other URLs you want to cache for offline access
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(cacheUrls);
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request).then((fetchResponse) => {
//         if (fetchResponse && fetchResponse.status === 200) {
//           const responseClone = fetchResponse.clone();
//           caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, responseClone);
//           });
//         }
//         return fetchResponse;
//       });
//     })
//   );
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((name) => {
//           if (name !== CACHE_NAME) {
//             return caches.delete(name);
//           }
//         })
//       );
//     })
//   );
// });
// New code end


