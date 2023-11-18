var button = document.getElementById("getLocBut");
var text = document.getElementById("data");
var bdHistorial =[];

function ubicar(){
    navigator.geolocation.getCurrentPosition(coordenadas);
}

function coordenadas(pos){
    crearHist(pos);
}

function crearHist(pos){
    bdHistorial.push(pos);
    verHist();
}

function verHist(){
    var auxText = "";
    var pto=0;
    for (var i=0;i<bdHistorial.length;i++){
        pto=i+1;
        auxText +="<h3>"+pto+" /// "+bdHistorial[i].coords.latitude + "," + bdHistorial[i].coords.longitude+"</h3>";
    }
    text.innerHTML=auxText;
}


button.onclick=ubicar;
