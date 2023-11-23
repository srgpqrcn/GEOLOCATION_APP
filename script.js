var buttonStart = document.getElementById("startBut");
var buttonStop = document.getElementById("stopBut");
var data = document.getElementById("dataArea");
var bdHistorial =[];
var eventId;

let marker, circle, zoomed;
var track;

const map = L.map('map'); 
// Initializes map

map.setView([40.4167754,-3.7037902], 5); 
// Sets initial coordinates and zoom level

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); 
// Sets map data source and associates with map

function iniciarTrack(){
    eventId = navigator.geolocation.watchPosition(coordenadas,errorUbic,{maximumAge:5000,timeout:5000});
}

function stopTrack(){
    navigator.geolocation.clearWatch(eventId);
}

function crearHist(pos){
    bdHistorial.push([pos.coords.latitude,pos.coords.longitude]);
}

function errorUbic(error){
    console.log(error.message);
    if (error.code === 1) {
        alert("Permitir ubicación");
    } else {
        //alert("¿Dónde estás?");
    }
}

function coordenadas(pos){
    crearHist(pos);

    var track = L.polyline(bdHistorial,{color:'red'}).addTo(map);
    var startPos = L.circle([bdHistorial[0][0],bdHistorial[0][1]],{color:'red',radius:pos.coords.accuracy}).addTo(map);

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    if (marker) {
        map.removeLayer(marker);
        //map.removeLayer(circle);
        }


    // Removes any existing marker and circule (new ones about to be set)
        
    marker = L.marker([lat,lng]).addTo(map);
        
    //circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);
     // Adds marker to the map and a circle for accuracy
        
   
    if (!zoomed) {
    zoomed = map.fitBounds(track.getBounds());
    }

    // Set zoom to boundaries of accuracy circle
    map.setView([lat,lng]);
    // Set map focus to current user position

    // zoom the map to the polyline
    map.fitBounds(track.getBounds());
}


buttonStart.onclick=iniciarTrack;
buttonStop.onclick=stopTrack;