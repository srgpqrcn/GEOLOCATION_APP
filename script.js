var button = document.getElementById("titulo");
var texto = document.getElementById("coord");

function accion(){
    alert("START");
    for(var i=0;i<10;i++){
        console.log(i)
        navigator.geolocation.getCurrentPosition(coordenadas);
    }
    alert("STOP");
}
function coordenadas(pos){
    texto.innerHTML="<h2>Latitude: " + pos.coords.latitude +
    "<br>Longitude: " + pos.coords.longitude + "</h2>";
    
}



button.ondblclick=accion;