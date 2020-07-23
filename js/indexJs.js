function loadScore(element) {
  var text = element.innerText.replace("ã", "a");
  location.href = "selectedIndex.html?selected=" + text;
}

function loadWho() {
  location.href = "quemSomos.html";
}