var show_button = document.getElementById("show_button");
var stop_button = document.getElementById("stop_button");
var location_data = document.getElementById("location_data");
var map_URL_location = document.getElementById("map_URL");

function showMap(data){
    var lat = 0;
    var long = 0;
    lat = data.coords.latitude;
    long = data.coords.longitude;
    map_URL_location.innerHTML="<a href=\"https://www.google.com/maps/search/?api=1&query="+lat+","+long+"\">VER EN MAPA</a>";
}

function geolocationSucces (posData){
    location_data.innerHTML="latitud = " + posData.coords.latitude + "<br>longitud = " + posData.coords.longitude ;
    showMap(posData);
    console.log(posData);
};

function geolocationError(error){
    alert("geolocation does not work. Error code : "+error.code+" "+error.message);
}

function stopGeolocation(){
    navigator.geolocation.clearWatch(id);
    alert(id+" geolocation was stopped");
    location_data.innerHTML="";
    map_URL_location.innerHTML="";
    stop_button.style.display="none";
}

function geolocation(){
    /*navigator.geolocation.getCurrentPosition(position)*/
    if (navigator.geolocation){
        stop_button.style.display="block";
        id=navigator.geolocation.watchPosition(geolocationSucces,geolocationError);
    }
    else{
        alert('Geolocation is not supported for this Browser/OS.');
    }

};

stop_button.style.display="none";
stop_button.onclick=stopGeolocation;
show_button.onclick=geolocation;
