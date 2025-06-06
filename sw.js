// Service Worker dla VictoryMind.ai
// Optymalizuje wydajność poprzez cache'owanie zasobów

const CACHE_NAME = 'victorymind-v2.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/en/index.html',
  '/styles.css',
  '/main.js',
  '/Tlo_wersja_2.webp',
  '/logo-new.webp',
  '/Logo2.webp',
  '/manifest.json',
  '/blog/rss.xml'
];

console.log('Service Worker inicjalizowany dla VictoryMind.ai');

// Instalacja Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache otwarty');
        // Cache pliki jeden po drugim z obsługą błędów
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(error => {
              console.warn('Nie udało się cache\'ować:', url, error);
              return null;
            })
          )
        );
      })
      .catch(error => {
        console.error('Błąd podczas instalacji Service Worker:', error);
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
              })
              .catch(error => {
                console.warn('Nie udało się zapisać do cache:', event.request.url, error);
              });
            
            return response;
          }
        ).catch(function(error) {
          console.error('Błąd podczas pobierania z sieci:', event.request.url, error);
          // Zwróć pustą odpowiedź w przypadku błędu
          return new Response('', { status: 200, statusText: 'OK' });
        });
      })
  );
});

// Aktywacja - usuń stare cache
self.addEventListener('activate', function(event) {
  console.log('Service Worker aktywowany');
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
    }).then(() => {
      console.log('Service Worker gotowy do pracy');
    })
  );
});
