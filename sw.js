// Zdarzenie "install" - zapisujemy pliki do cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('webowka-cache').then(cache => {
            return cache.addAll([
                'index.html',
                'style.css',
                'script.js',
                'icon.png', // Jeśli masz ikonę, dodaj ją tutaj
            ]);
        })
    );
});

// Zdarzenie "fetch" - sprawdzamy, czy mamy plik w cache, jeśli tak, zwracamy go
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
