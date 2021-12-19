var show_button = document.getElementById("show_button");
var location_data = document.getElementById("location_data");

function geolocation(){
    function geolocationSucces (posData){
        location_data.innerHTML="latitud = " + posData.coords.latitude + "<br>longitud = " + posData.coords.longitude ;
    };
    /*navigator.geolocation.getCurrentPosition(position)*/
    navigator.geolocation.watchPosition(geolocationSucces,geolocationError)
};

function geolocationError(error){
    alert("geolocation does not work. Error code : "+error.code+" "+error.message)
}


// check for Geolocation support
if (navigator.geolocation) {
    console.log('Geolocation is supported!');
    alert('Geolocation is supported!');
}
else {
    console.log('Geolocation is not supported for this Browser/OS.');
    alert('Geolocation is not supported for this Browser/OS.');
    show_button.style.display="none"
}


show_button.onclick=geolocation;