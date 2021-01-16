var url = "data/Pesquisa.xlsx";
var oReq = new XMLHttpRequest();
var jsonRet = null;
var selected = null;
var jsonRetFiltrado = null;

window.onload = () => {
  'use strict';
    
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
    document.getElementById("quantidadeAtualSim").innerHTML = jsonRet[3]["__EMPTY"];
    document.getElementById("quantidadeAtualIndif").innerHTML = jsonRet[3]["__EMPTY_1"];
    document.getElementById("quantidadeAtualNao").innerHTML = jsonRet[3]["__EMPTY_2"];
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

function checarDeputados() {
  jsonRetFiltrado = jsonRet;
  var pos = document.getElementById("pos");
  var estado = document.getElementById("estado");
  var part = document.getElementById("part");
  
  if (pos.options[pos.selectedIndex].value != "") {
    jsonRetFiltrado = jsonRetFiltrado.filter(jsonRetFiltrado => jsonRetFiltrado.POSIÇÃO == pos.options[pos.selectedIndex].value);  
  }
  if (estado.options[estado.selectedIndex].value != "") {
    jsonRetFiltrado = jsonRetFiltrado.filter(jsonRetFiltrado => jsonRetFiltrado.Estado == estado.options[estado.selectedIndex].value);  
  }
  if (part.options[part.selectedIndex].value != "") {
    jsonRetFiltrado = jsonRetFiltrado.filter(jsonRetFiltrado => jsonRetFiltrado.PARTIDO == part.options[part.selectedIndex].value);  
  }
  console.log (jsonRetFiltrado);
  showData();
}

function showData() {
  document.getElementById("deputados").innerHTML = "";
  if (jsonRetFiltrado.length == 0) {
    document.getElementById("none").style = "display:block;";
    return;
  } else {
    document.getElementById("none").style = "display:none;";
  }
  for (var i = 0; i < jsonRetFiltrado.length; i++) {
    var nameDiv = document.createElement("div");
    var img = document.createElement("img");
        
    img.className = "img"
    nameDiv.className = "nome";
    nameDiv.innerHTML = jsonRetFiltrado[i]["DEPUTADO"] + " - " + jsonRetFiltrado[i]["PARTIDO"] + " - " + jsonRetFiltrado[i]["Estado"];
        
    img.src = jsonRetFiltrado[i]["Foto"];
        
    var deputadoDiv = document.createElement("div");
    var cobrarDiv = document.createElement("div");
    var cobrarP = document.createElement("p");
    var simBut = document.createElement("button");

    cobrarP.innerHTML = "Clique para cobrar o posicionamento:";
    simBut.innerHTML = "Pressione";
    cobrarDiv.appendChild(cobrarP);
    simBut.className = "simBut";
    simBut.onclick = function() {loadEmail(this);};
    cobrarDiv.appendChild(simBut);
    cobrarDiv.className = "cobrar";
    deputadoDiv.className = "deputado";

    deputadoDiv.appendChild(img);
    deputadoDiv.appendChild(nameDiv);
    if ( jsonRetFiltrado[i]["POSIÇÃO"] == "A Favor" ) {
      cobrarDiv.style="visibility:hidden;";
      deputadoDiv.style = "background:darkgreen;color:white;";
    } else if (jsonRetFiltrado[i]["POSIÇÃO"] == "Contra") {
      deputadoDiv.style = "background:darkred;color:white;";
    } else {
      deputadoDiv.style = "background:#ffdb58;";
    }
    
    deputadoDiv.appendChild(cobrarDiv);
        
    document.getElementById("deputados").appendChild(deputadoDiv);
  }
}

function loadEmail(elm) {
  location.href = "envieEmail.html?dep=" + elm.parentElement.parentElement.innerText.split(" - ")[0];
}

function loadWho() {
  location.href = "quemSomos.html";
}
