// Service Worker dla VictoryMind.ai
// Optymalizuje wydajność poprzez cache'owanie zasobów

const CACHE_NAME = 'victorymind-v1.3';
const urlsToCache = [
  '/',
  '/index.html',
  '/index-en.html',
  '/styles.css',
  '/main.js',
  '/Tlo_wersja_2.webp',
  '/Tlo_wersja_2.png',
  '/logo-new.png',
  '/manifest.json'
];

// Instalacja Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache otwarty');
        return cache.addAll(urlsToCache);
      })
  );
});

// Strategia cache first dla zasobów statycznych
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Zwróć z cache jeśli znajdziesz
        if (response) {
          return response;
        }
        
        // Lub pobierz z sieci
        return fetch(event.request).then(
          function(response) {
            // Sprawdź czy odpowiedź jest valid
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone response
            var responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          }
        );
      })
  );
});

// Aktywacja - usuń stare cache
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Usuwam stary cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
