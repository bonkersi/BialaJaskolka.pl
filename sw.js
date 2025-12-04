// Service Worker dla Białej Jaskółki
const CACHE_NAME = 'biala-jaskolka-v2.0.0';
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/aktualnosci.html',
    '/wsparcie.html',
    '/kontakt.html',
    '/polityka-prywatnosci.html',
    '/polityka-cookies.html',
    '/style-base.css',
    '/style-index.css',
    '/style-aktualnosci.css',
    '/style-wsparcie.css',
    '/style-kontakt.css',
    '/style-polityki.css',
    '/script.js',
    '/images/logo.png',
    '/images/jezus.png',
    '/favicon.ico'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_CACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
            })
            .catch(() => {
                // Fallback for offline
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
            })
    );
});