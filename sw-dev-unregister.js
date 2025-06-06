// Skrypt do wyrejestrowania Service Workera podczas pracy deweloperskiej
if ('serviceWorker' in navigator) {
  console.log('Próba wyrejestrowania Service Workera w środowisku deweloperskim...');
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
      console.log('Service Worker wyrejestrowany pomyślnie!');
    }
  }).catch(function(err) {
    console.log('Błąd podczas wyrejestrowywania Service Workera:', err);
  });

  // Wyczyść cache
  caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        console.log('Usuwam cache:', cacheName);
        return caches.delete(cacheName);
      })
    );
  }).then(() => {
    console.log('Cache wyczyszczony pomyślnie');
  });
}
