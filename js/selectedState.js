var jsonRet = null;
var selected = null;
var selectedState = null;
var url = "data/Pesquisa.xlsx";
var oReq = new XMLHttpRequest();
var list = [];
var states = [
  { acr: 'AC', comp: 'Acre' },
  { acr: 'AL', comp: 'Alagoas' },
  { acr: 'AP', comp: 'Amapá' },
  { acr: 'AM', comp: 'Amazonas' },
  { acr: 'BA', comp: 'Bahia' },
  { acr: 'CE', comp: 'Ceará' },
  { acr: 'DF', comp: 'Distrito Federal' },
  { acr: 'ES', comp: 'Espírito Santo' },
  { acr: 'GO', comp: 'Goías' },
  { acr: 'MA', comp: 'Maranhão' },
  { acr: 'MT', comp: 'Mato Grosso' },
  { acr: 'MS', comp: 'Mato Grosso do Sul' },
  { acr: 'MG', comp: 'Minas Gerais' },
  { acr: 'PA', comp: 'Pará' },
  { acr: 'PB', comp: 'Paraíba' },
  { acr: 'PR', comp: 'Paraná' },
  { acr: 'PE', comp: 'Pernambuco' },
  { acr: 'PI', comp: 'Piauí' },
  { acr: 'RJ', comp: 'Rio de Janeiro' },
  { acr: 'RN', comp: 'Rio Grande do Norte' },
  { acr: 'RS', comp: 'Rio Grande do Sul' },
  { acr: 'RO', comp: 'Rondônia' },
  { acr: 'RR', comp: 'Roraima' },
  { acr: 'SC', comp: 'Santa Catarina' },
  { acr: 'SP', comp: 'São Paulo' },
  { acr: 'SE', comp: 'Sergipe' },
  { acr: 'TO', comp: 'Tocantins' },
];

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

function setText(text, state) {
    text = text.replace("%20", " ");
    text = text.replace("%C3%A3", "ã");
    selected = text;
    document.getElementsByClassName("selectedText")[0].innerHTML = states.find(states => states.acr == state).comp.toUpperCase();
    if ( text == "A Favor" ) {
      document.getElementsByClassName("tabs")[0].className = "tabs green";
    } else if ( text == "Contra" ) {
      document.getElementsByClassName("tabs")[0].className = "tabs red";
    }
}

window.onload = () => {
  selected = getParams()["selected"];
  selectedState = getParams()["state"];
  setText(selected, selectedState);
    
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function(e) {
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
    treatData(selected, selectedState);
  }

  oReq.send();
}

function treatData(position, state) {
    if (position == "Não Encontrado") {
        position = "Indiferente";
    }
    for (var i = 0; i < jsonRet.length; i++) {
        if (state == jsonRet[i]["Estado"] && position == jsonRet[i]["POSIÇÃO"] ) {
            list.push(jsonRet[i]["DEPUTADO"] + " - " + jsonRet[i]["PARTIDO"])
        }
    }
    showData();
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

function getSrc(nome, img, nameDiv) {
    getJSON('https://dadosabertos.camara.leg.br/api/v2/deputados?idLegislatura=56&nome=' + encodeURI(nome),
    function(err, data) {
      if (err !== null) {
        alert('Something went wrong: ' + err);
      } else {
        img.src = data.dados[0].urlFoto;
        
        var deputadoDiv = document.createElement("div");
        var cobrarDiv = document.createElement("div");
        var cobrarP = document.createElement("p");
        var simBut = document.createElement("button");

        cobrarP.innerHTML = "Clique para cobrar o posicionamento:";
        simBut.innerHTML = "A Favor";
        cobrarDiv.appendChild(cobrarP);
        simBut.className = "simBut";
        simBut.onclick = function() {loadEmail(this);};
        cobrarDiv.appendChild(simBut);
        cobrarDiv.className = "cobrar";
        deputadoDiv.className = "deputado";

        deputadoDiv.appendChild(img);
        deputadoDiv.appendChild(nameDiv);
        if ( selected != "A Favor" ) {
          deputadoDiv.appendChild(cobrarDiv);
        } else {
          deputadoDiv.style = "height: 12%;"
        }
        
        document.getElementsByClassName("selectedContainer")[0].appendChild(deputadoDiv);
      }
    });
}

function showData() {
    for (var i = 0; i < list.length; i++) {
        if (document.getElementsByClassName("none")[0] != null) {
            document.getElementsByClassName("none")[0].remove();
        }

        var nameDiv = document.createElement("div");
        var img = document.createElement("img");
        
        img.className = "img"
        nameDiv.className = "nome";
        nameDiv.innerHTML = list[i];
        
        getSrc(list[i].split(" - ")[0], img, nameDiv);
    }
}

function loadEmail(elm) {
  location.href = "envieEmail.html?dep=" + elm.parentElement.parentElement.innerText.split(" - ")[0];
}
