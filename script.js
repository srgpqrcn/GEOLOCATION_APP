var mapArea = document.querySelector("#map");
var buttonStart = document.getElementById("startBut");
var buttonStop = document.getElementById("stopBut");
var data = document.getElementById("dataArea");
var bdHistorial =[];
var eventId;

var marker, circle, zoomed;
var track, startPoint, endPoint;

const map = L.map('map'); 
// Initializes map

map.setView([40.4167754,-3.7037902], 5); 
// Sets initial coordinates and zoom level

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); 
// Sets map data source and associates with map


function start(){
    if (track) {
        map.removeLayer(track);
        map.removeLayer(marker);
        map.removeLayer(startPoint,endPoint);
        
    }

    eventId = navigator.geolocation.watchPosition(tracking,errorUbic,{maximumAge:5000,timeout:5000});
}

function stop(){
    navigator.geolocation.clearWatch(eventId);
    alert("tracking detenido");
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

function tracking(pos){
    bdHistorial.push([pos.coords.latitude,pos.coords.longitude]);

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    if (marker) {
        map.removeLayer(marker);
        
        //map.removeLayer(circle);
    }
        
    marker = L.marker([pos.coords.latitude,pos.coords.longitude]).addTo(map);
        
    //circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);      
   
    //if (!zoomed) {
    //zoomed = map.fitBounds(track.getBounds());
    //}

    map.setView([pos.coords.latitude,pos.coords.longitude]);
}

function mappingTrack(data){
    var n = bdHistorial.length-1;

    if (track) {
        map.removeLayer(track);
        
    }

    startPoint = L.circle([data[0][0],data[0][1]],{color:'red',radius:200}).addTo(map);
    endPoint = L.circle([data[n][0],data[n][1]],{color:'green',radius:200}).addTo(map);
    track = L.polyline(data,{color:'black'}).addTo(map);

    if (!zoomed) {
    zoomed = map.fitBounds(track.getBounds());
    }

    //map.fitBounds(track.getBounds());

}


buttonStart.onclick=start;
buttonStop.onclick=stop;