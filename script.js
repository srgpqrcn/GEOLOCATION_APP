var button = document.getElementById("getLocBut");
var texto1 = document.getElementById("coord");
var texto2 = document.getElementById("hist");
var historial ="";

function ubicar(){
    navigator.geolocation.getCurrentPosition(coordenadas);
}

function coordenadas(pos){
    var newText ="<h2>Latitude: " + pos.coords.latitude +"/"+
    "Longitude: " + pos.coords.longitude + "</h2><br>";
    texto1.innerHTML=newText;
    funHistorial(newText);
}

function funHistorial(locText){
    historial += locText;
    console.log(historial)
    texto2.innerHTML=historial;
}


button.onclick=ubicar;