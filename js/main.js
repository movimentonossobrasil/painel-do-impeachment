var url = "data/Pesquisa.xlsx";
var oReq = new XMLHttpRequest();
var jsonRet = null;
var selected = null;

window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./sw.js');
  }
    
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function(e) {
    var arraybuffer = oReq.response;
    var arraybuffer = oReq.response;

    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    /* Call XLSX */
    var workbook = XLSX.read(bstr, {type:"binary"});

    /* DO SOMETHING WITH workbook HERE */
    var first_sheet_name = workbook.SheetNames[0];
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name];
    jsonRet = XLSX.utils.sheet_to_json(worksheet,{raw:true});
    
    selected = getParams()["selected"];
    if ( selected == "Sim" ) {
      loadSim();  
    } else if ( selected == "Nao" ) {
      loadNao();
    } else {
      loadIndif();
    }
  }

  oReq.send();
}

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

function loadSim() {
  document.getElementById("quantidadeAtual").innerHTML = jsonRet[4]["__EMPTY_1"];
  document.getElementsByClassName("selected")[0].className = document.getElementsByClassName("selected")[0].className.split("selected")[0] + document.getElementsByClassName("selected")[0].className.split("selected")[1];
  document.getElementsByClassName("tab")[0].className = document.getElementsByClassName("tab")[0].className + " selected";
  selected = "A Favor";
}

function loadIndif() {
  document.getElementById("quantidadeAtual").innerHTML = jsonRet[4]["__EMPTY_2"];
  document.getElementsByClassName("selected")[0].className = document.getElementsByClassName("selected")[0].className.split("selected")[0] + document.getElementsByClassName("selected")[0].className.split("selected")[1];
  document.getElementsByClassName("tab")[1].className = document.getElementsByClassName("tab")[1].className + " selected";
  selected = "Não Encontrado";
}

function loadNao() {
  document.getElementById("quantidadeAtual").innerHTML = jsonRet[4]["__EMPTY_3"];
  document.getElementsByClassName("selected")[0].className = document.getElementsByClassName("selected")[0].className.split("selected")[0] + document.getElementsByClassName("selected")[0].className.split("selected")[1];
  document.getElementsByClassName("tab")[2].className = document.getElementsByClassName("tab")[2].className + " selected";
  selected = "Contra";
}

function loadQuem() {
  location.href = "selected.html?selected=" + selected;
}

function loadWho() {
  location.href = "quemSomos.html";
}
