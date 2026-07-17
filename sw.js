const CACHE_NAME = 'farmsense-cache-v2';
const urlsToCache = [
  '/',
  '/dashboard.html',
  '/crop_recommendations.html',
  '/price_predictor.html',
  '/style.css',
  '/app.js',
  '/crop_recommendations.js',
  '/price_predictor.js',
  '/map_logic.js',
  '/manifest.json'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  
  // API endpoints should use Network First with fallback to offline mock data if possible
  if (url.pathname.startsWith('/get_') || 
      url.pathname.startsWith('/recommend_') || 
      url.pathname.startsWith('/update_') || 
      url.pathname.startsWith('/predict_') ||
      url.pathname.startsWith('/ask_agronomist')) {
      
    e.respondWith(
      fetch(e.request).catch(() => {
        // Fallback offline mock response for API
        return new Response(JSON.stringify({ 
          success: false, 
          error: "You are offline. Running in limited capability mode.",
          offline: true 
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
    return;
  }
  
  // Static assets: Cache First, then Network
  e.respondWith(
    caches.match(e.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(e.request);
      })
  );
});
