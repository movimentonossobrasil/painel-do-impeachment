window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('./sw1.js').then(reg => {
      reg.addEventListener('updatefound', () => {
        // A wild service worker has appeared in reg.installing!
        newWorker = reg.installing;

        newWorker.addEventListener('statechange', () => {
          // Has network.state changed?
          switch (newWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // new update available
                showUpdateBar();
              }
              // No update available
              break;
          }
        });
      });
    });

    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });
  }
}

function loadScore() {
  location.href = "selectedIndex.html";
}

function loadWho() {
  location.href = "quemSomos.html";
}
