var cacheName = 'painel-impeachment-1';
var filesToCache = [
  'https://movimentonossobrasil.github.io/painel-do-impeachment/',
  'https://movimentonossobrasil.github.io/painel-do-impeachment/index.html',,
  'https://movimentonossobrasil.github.io/painel-do-impeachment/selectedIndex.html',
  'https://movimentonossobrasil.github.io/painel-do-impeachment/css/style.css',
  'https://movimentonossobrasil.github.io/painel-do-impeachment/js/indexJs.js',
  'https://movimentonossobrasil.github.io/painel-do-impeachment/js/main.js'
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
