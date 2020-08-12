var dep = null;

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
    document.getElementById("assunto").value = document.getElementById("assunto").value + text;
}

window.onload = () => {
  dep = decodeURI(getParams()["dep"]);
  setText(dep);
}

function enviarEmail() {
    if (valid()) {
        $("#corpo")[0].defaultValue = $("#corpo")[0].defaultValue + " De: " + $("#nome")[0].value;
        $("#form-id").submit()
    } else {
        alert("Todos os campos são obrigatórios");
    }
}

function valid() {
    if ( $("#nome")[0].value != "" && ValidateEmail($("#email")[0].value) ) {
        return true;
    } else {
        return false;
    }
}

function ValidateEmail(mail) {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true;
  }
    alert("O e-mail deve ser válido");
    return false;
}
