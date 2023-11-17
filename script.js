var button1 = document.getElementById("getLocBut");
var button2 = document.getElementById("getHistBut");
var texto1 = document.getElementById("coord");
var texto2 = document.getElementById("hist");
var bdHistorial =[];

function ubicar(){
    navigator.geolocation.getCurrentPosition(coordenadas);
}

function coordenadas(pos){
    var newText ="<h3>"+pos.coords.latitude+","+pos.coords.longitude + "</h3>";
    texto1.innerHTML=newText;
    crearHist(pos);
}

function crearHist(pos){
    bdHistorial.push(pos);
    console.log(bdHistorial)
}

function verHist(){
    var auxText = "";
    var pto=0;
    for (var i=0;i<bdHistorial.length;i++){
        pto=i+1;
        auxText +="<h3>"+pto+". "+bdHistorial[i].coords.latitude + "," + bdHistorial[i].coords.longitude+"</h3>";
    }
    texto2.innerHTML=auxText;
}


button1.onclick=ubicar;
button2.onclick=verHist;
