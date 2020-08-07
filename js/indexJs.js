window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}

function loadScore() {
  location.href = "selectedIndex.html";
}

function loadWho() {
  location.href = "quemSomos.html";
}
