window.onload=inici;
let imagenes = ["chupachups.png","fotografia.png","gorra.png","llavero.png","maquineta.png","tenedor_lapiz.png"];
let coin = Math.floor(Math.random()*10)+10;
let azar=[];


function inici(){  
    document.querySelector("#lanzar").onclick = tirar;
    document.querySelector("#cruz").onclick = cerrar;
    botones();
    credito();  
    mp3=document.getElementById("sonido");
    sonido();
};
function sonido(){
    document.getElementById("boton1").onclick=sonar1;
    document.getElementById("boton2").onclick=sonar2;
    document.querySelectorAll("body").insertAdjacentHTML=("beforeend",`<button id="boton1">Escuchar sonido 1</button><br><button id="boton2">Escuchar sonido 2</button>`)
}

function sonar1(){
    mp3.src="audios/ganar.mp3";
    mp3.play();
};
function sonar2(){
    mp3.src="audios/final.mp3";
    mp3.play();
};
function tirar(){
    if (coin<=0){
        sinPasta();
    } else{ 
        coin--;
        for (let i = 0; i<3; i++){
            cambiarImagen(i);
        }
    }
    comprobar();
    credito();
};
function cambiarImagen(k){
    numero= Math.floor(Math.random()*imagenes.length);
    azar[k]=numero;
    document.querySelectorAll(".ventana img")[k].src=`img/${imagenes[numero]}`;
    ;
}
function comprobar(){
   if (azar[0]==azar[1]&& azar[1] == azar[2]){
    flex();
   }
}
function sinPasta(){
    document.querySelector("#velo").style.display="flex";
    document.querySelector("#mensaje").innerHTML="!! Ha robar carteras !! <BR> !MUERTO HAMBRE!"
    sonar2();
}

function flex(){
    document.querySelector("#velo").style.display="flex";
    document.querySelector("#mensaje").innerHTML="!FELICIDADES!<BR> !Has ganado el premio del colacao!";
    premio();
}
function cerrar(){
    document.querySelector("#velo").style.display="none";
    document.querySelector("#mensaje").innerHTML="";
}
function credito(){
    document.querySelector("#monedas").innerHTML="";
    document.querySelector("#dinero").innerHTML=`<span>${coin}</span><span class="euros">€</span></div></div>`;
    for (let p = 0; p<coin; p++){
        document.querySelector("#monedas").innerHTML+=`<img src="img/moneda.png">`;
    }
}
function premio(){   
    let random5=Math.floor(Math.random()*5+1)+coin;
    coin=random5;
    credito();
    sonar1()
}
function botones(){
let cuantos= document.querySelectorAll(".boton").length;
    for (let i = 0; i<cuantos; i++){
        document.querySelectorAll(".boton")[i].onclick=saber;
    }
}

function saber(){
    let hijos=this.parentNode.children;
    for (let u=0; u<hijos.length; u++){
        if(this==hijos[u] ){
            if (coin<=0){
                sinPasta();
            } else{
                coin--;
            cambiarImagen(u)
            comprobar();
            credito();
            break;
            }
        }    
    }
}
