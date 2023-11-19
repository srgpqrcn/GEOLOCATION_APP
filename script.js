var buttonStart = document.getElementById("startBut");
var buttonStop = document.getElementById("stopBut");
var data = document.getElementById("dataArea");
var bdHistorial =[];
var eventId;



function iniciarTrack(){
    //navigator.geolocation.getCurrentPosition(coordenadas);
    eventId = navigator.geolocation.watchPosition(coordenadas,errorUbic,{timeout:5000});
}

function stopTrack(){
    navigator.geolocation.clearWatch(eventId);
}

function coordenadas(pos){
    crearHist(pos);
}

function crearHist(pos){
    bdHistorial.push([pos.coords.latitude,pos.coords.longitude]);
    verHist();
}

function verHist(){
    var auxText = "";
    
    for (var i=0;i<bdHistorial.length;i++){
        pto=i+1;
        auxText +="<h3>"+bdHistorial[i]+"</h3>";
    }
    data.innerHTML=auxText;
}

function errorUbic(error){
    console.log(error.message);
}


buttonStart.onclick=iniciarTrack;
buttonStop.onclick=stopTrack;

//NOTA: Añadir scrapping de info relacionada con las coordenadas actuales, como app tipo radar de sitios de interes cercanos a mi posicion
