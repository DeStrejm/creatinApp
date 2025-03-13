const CACHE_NAME = 'creatinApp-cache'; // Stała nazwa cache, która będzie dynamicznie zarządzana
const CACHE_URLS = [
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'sw.js',
    'icon.png', // Jeśli masz ikonę, dodaj ją tutaj
];

// Zdarzenie instalacji Service Workera
self.addEventListener('install', event => {
    console.log('Service Worker zainstalowany');
    
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(CACHE_URLS);
        })
    );
});

// Zdarzenie aktywacji Service Workera
self.addEventListener('activate', event => {
    console.log('Service Worker aktywowany');
    
    // Usuwanie starych wersji cache, jeśli są
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Jeśli cache jest różny od aktualnego, usuń go
                    if (cacheName !== CACHE_NAME) {
                        console.log('Usuwanie starego cache: ' + cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Zdarzenie "fetch" - sprawdzamy, czy mamy plik w cache, jeśli tak, zwracamy go
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Jeśli plik jest dostępny w cache, zwracamy go
            if (response) {
                return response;
            }
            // Jeśli plik nie jest dostępny w cache, pobieramy go z sieci
            return fetch(event.request).then(fetchedResponse => {
                // Zapisujemy nowy plik w cache
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, fetchedResponse.clone());
                    return fetchedResponse;
                });
            });
        })
    );
});
