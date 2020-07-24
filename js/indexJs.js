window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
}

function loadScore(element) {
  var text = element.innerText.replace("ã", "a");
  location.href = "selectedIndex.html?selected=" + text;
}

function loadWho() {
  location.href = "quemSomos.html";
}
