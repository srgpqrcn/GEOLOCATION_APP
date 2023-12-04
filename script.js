const mapArea = document.getElementById("map");
const buttonStart = document.getElementById("startBut");
const buttonStop = document.getElementById("stopBut");
let bdHistorial;
let eventId;

let track, wayPoint,layer;
let map; 

const gpsOptions = {
    enableHighAccuracy: true,
    maximumAge:5000,
    timeout:5000
}
///FUNCTIONS

function iniMap(){
    map = L.map('map').fitWorld(); 
    // Initializes map
    
    //map.setView([40.4167754,-3.7037902], 5); 
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
    //buttonStop.style.backgroundColor="white";
    //buttonStart.style.backgroundColor="green";
    eventId = navigator.geolocation.watchPosition(tracking,errorUbic,gpsOptions);
}

function stop(){
    //buttonStart.style.backgroundColor="white";
    //buttonStop.style.backgroundColor="red";
    navigator.geolocation.clearWatch(eventId); 
    mappingTrack(bdHistorial);
}

function errorUbic(error){
    if (error.code === 1) {
        alert("Permitir ubicación");
    } else {
        //alert("¿Dónde estás?");
    }
}

function clearMap(mapToClear){
    if (track || wayPoint){
        //mapToClear.removeLayer(layer);
        //revisar por que no funcionaesto bien.
        map.removeLayer(wayPoint);
        map.removeLayer(track);
    }
}

function tracking(pos){
    bdHistorial.push([pos.coords.latitude,pos.coords.longitude]);
    nw = bdHistorial.length;

    if(wayPoint){
        map.removeLayer(wayPoint);
    }
        
    wayPoint = L.marker([pos.coords.latitude,pos.coords.longitude])
    .addTo(map)
    .bindPopup("WP "+nw)
    .openPopup();
    map.setView([pos.coords.latitude,pos.coords.longitude],16); 
    
}

function mappingTrack(data){

    if(wayPoint){
        map.removeLayer(wayPoint);
    }

    track = L.polyline(data,{color:'black'}).addTo(map);
    map.fitBounds(track.getBounds());
    //layer = L.layerGroup([track]); 

}

///MAIN

iniMap();

buttonStart.onclick=start;
buttonStop.onclick=stop;