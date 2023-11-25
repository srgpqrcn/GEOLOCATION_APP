var mapArea = document.querySelector("#map");
var buttonStart = document.getElementById("startBut");
var buttonStop = document.getElementById("stopBut");
var data = document.getElementById("dataArea");
var bdHistorial;
var eventId;

var track, wayPoint,layer;

var map; 

function iniMap(){
    map = L.map('map'); 
    // Initializes map
    
    map.setView([40.4167754,-3.7037902], 5); 
    // Sets initial coordinates and zoom level
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map); 
    // Sets map data source and associates with map
    
}

function start(){
    bdHistorial =[];
    clearMap(map);
    eventId = navigator.geolocation.watchPosition(tracking,errorUbic,{maximumAge:5000,timeout:5000});
}

function stop(){
    navigator.geolocation.clearWatch(eventId);
    mappingTrack(bdHistorial);
}

function errorUbic(error){
    console.log(error.message);
    if (error.code === 1) {
        alert("Permitir ubicación");
    } else {
        //alert("¿Dónde estás?");
    }
}

function clearMap(mapToClear){
    if (layer){
        mapToClear.removeLayer(layer);
    }
}

function tracking(pos){
    bdHistorial.push([pos.coords.latitude,pos.coords.longitude]);

    if(wayPoint){
        map.removeLayer(wayPoint);
    }
        
    wayPoint = L.marker([pos.coords.latitude,pos.coords.longitude]).addTo(map);
    map.setView([pos.coords.latitude,pos.coords.longitude], pos.accuracy); 
    
}

function mappingTrack(data){

    track = L.polyline(data,{color:'black'}).addTo(map);
    map.fitBounds(track.getBounds());
    layer = L.layerGroup([track,wayPoint]); 
}

//document.onload=iniMap;
iniMap();
buttonStart.onclick=start;
buttonStop.onclick=stop;