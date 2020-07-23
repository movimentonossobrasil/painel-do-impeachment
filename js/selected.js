var selected = null;

function getParams() {
    var idx = document.URL.indexOf('?');
    var params = new Array();
    if (idx != -1) {
        var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
        for (var i=0; i<pairs.length; i++) {
            nameVal = pairs[i].split('=');
            params[nameVal[0]] = nameVal[1];
        }
    }
    return params;
}

function setText(text) {
    text = text.replace("%20", " ");
    text = text.replace("%C3%A3", "ã");
    document.getElementsByClassName("selectedText")[0].innerHTML = text;
    if ( text == "A Favor" ) {
      document.getElementsByClassName("tabs")[0].className = "tabs green";
    } else if ( text == "Contra" ) {
      document.getElementsByClassName("tabs")[0].className = "tabs red";
    }
}

window.onload = () => {
  selected = getParams()["selected"];
  setText(selected);
}

function loadState(element) {
    location.href = "selectedState.html?selected=" + selected + "&state=" + element.innerHTML;
}