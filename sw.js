if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Si es exitoso
        console.log('SW registrado correctamente');
      }, function(err) {
        // Si falla
        console.log('SW fallo', err);
      });
    })};

self.addEventListener('install', function(event) {
    var CACHE_NAME = 'my-site-cache-1';
    var urlsToCache = ['./','./index.html','./indexCss.css','./firebase.js','./firebasefunctions.js','./comportamientoNetwork.js','./indexedDBfunctions.js'];
        // Perform install steps
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(function(cache) {
              console.log('Opened cache');
              return cache.addAll(urlsToCache);
            })
            .catch(error => console.log(error.message))
            );
      });

self.addEventListener('fetch', function(event) {
        event.respondWith(
          caches.match(event.request)
            .then(function(response) {
              if (response) {
                return response;
              }
              return fetch(event.request);
            }
          )
          .catch(error => console.log(error.message))
        );
      });
