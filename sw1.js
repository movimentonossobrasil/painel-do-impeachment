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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
