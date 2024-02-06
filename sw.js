self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('static').then(cache => {
      return cache.addAll(
        [
          './',
          './index.html',
          './css/style.css',
          './js/main.js',
          './lib/jquery-3.7.1.min.js',
          './lib/bootstrap-5.3.2/css/bootstrap.min.css',
          './lib/bootstrap-5.3.2/js/bootstrap.bundle.min.js',
          './lib/FiraSans-Font.ttf',
          './manifest.json',
          './assets/192.png',
          './assets/512.png',
        ]
      );
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});