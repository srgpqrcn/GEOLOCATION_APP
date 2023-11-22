var buttonStart = document.getElementById("startBut");
var buttonStop = document.getElementById("stopBut");
var data = document.getElementById("dataArea");
var bdHistorial =[];
var eventId;

const map = L.map('map'); 
// Initializes map

map.setView([51.505, -0.09], 13); 
// Sets initial coordinates and zoom level

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); 
// Sets map data source and associates with map

let marker, circle, zoomed;

function iniciarTrack(){
    //navigator.geolocation.getCurrentPosition(coordenadas);
    eventId = navigator.geolocation.watchPosition(coordenadas,errorUbic,{maximumAge:5000,timeout:5000});
}

function stopTrack(){
    navigator.geolocation.clearWatch(eventId);
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
    //data.innerHTML=auxText;
}

function errorUbic(error){
    console.log(error.message);
}

function coordenadas(pos){
    crearHist(pos);
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
        }
        // Removes any existing marker and circule (new ones about to be set)
        
        marker = L.marker([lat, lng]).addTo(map);
        circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);
        // Adds marker to the map and a circle for accuracy
        
        if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds()); 
        }
        // Set zoom to boundaries of accuracy circle
        map.setView([lat, lng]);
        // Set map focus to current user position
}

/*navigator.geolocation.watchPosition(success, error);
function success(pos) {
const lat = pos.coords.latitude;
const lng = pos.coords.longitude;
const accuracy = pos.coords.accuracy;
if (marker) {
map.removeLayer(marker);
map.removeLayer(circle);
}
// Removes any existing marker and circule (new ones about to be set)

marker = L.marker([lat, lng]).addTo(map);
circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);
// Adds marker to the map and a circle for accuracy

if (!zoomed) {
zoomed = map.fitBounds(circle.getBounds()); 
}
// Set zoom to boundaries of accuracy circle
map.setView([lat, lng]);
// Set map focus to current user position
}*/


buttonStart.onclick=iniciarTrack;
buttonStop.onclick=stopTrack;