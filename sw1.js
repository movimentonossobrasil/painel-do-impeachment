var cacheName = 'painel-impeachment-1';
var filesToCache = [
  './',
  './index.html',
  './selectedIndex.html',
  './css/style.css',
  './images/logo.png',
  './data/Pesquisa.xlsx',
  './js/indexJs.js',
  './js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
