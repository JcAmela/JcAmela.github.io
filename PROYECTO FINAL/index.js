// Asignar la función inici() al evento "onload" de la ventana del navegador
window.onload = inici;

// Crear un array con las rutas de las imágenes que se mostrarán en las ventanas de la tragaperras
let imagenes = ["css.png", "javascript.png", "vue.png", "python.png", "html.png"];

// Generar un número aleatorio entre 10 y 20 y asignarlo a la variable "coin"
let coin = Math.floor(Math.random() * 10) + 10;

// Crear un array vacío para almacenar los índices aleatorios de las imágenes
let azar = [];

// Crear una variable booleana para controlar si se ha pulsado el botón "lanzar"
let boleanoTirar = false;

function inici() {
    // Asignar la función tirar() al evento "onclick" del botón "lanzar"
    document.getElementById("lanzar").onclick = tirar;
    document.getElementById("cruz").onclick = cerrar;
    botones();
    credito();
}
// Crear un elemento "audio" y asignarlo a la variable "mp3"
let mp3 = document.createElement("audio");

function sonido() {
    document.getElementById("boton1").onclick = sonarGanar;
    document.getElementById("boton2").onclick = sonarFinal;
    document.querySelectorAll("body").insertAdjacentHTML = ("beforeend", `<button id="boton1">Escuchar sonido 1</button><br><button id="boton2">Escuchar sonido 2</button>`)
    document.getElementById("boton3").onclick = sonarLanzar;
}
function sonarGanar() {
    // Asignar la ruta del archivo de audio "ganar.mp3" al atributo "src" del elemento "audio"
    document.getElementById("sonido").src = "audios/ganar.mp3";

    // Reproducir el archivo de audio
    document.getElementById("sonido").play();
};

function sonarFinal() {
    // Asignar la ruta del archivo de audio "final.mp3" al atributo "src" del elemento "audio"
    document.getElementById("sonido").src = "audios/final.mp3";

    // Reproducir el archivo de audio
    document.getElementById("sonido").play();
};
function sonarLanzar() {  //Añadida la función para reproducir el archivo lanzar.mp3 

    //Asigna la ruta del archivo de audio lanzar.mp3 al atributo src del elemento audio 

    document.getElementById("sonido").src = "audios/lanzar.mp3";

    //Reproduce el archivo de audio 

    document.getElementById("sonido").play();
}
function tirar() {
    sonarLanzar()
    boleanoTirar = true
    if (coin <= 0) {
        sinPasta();
    } else {
        coin--;
        for (let i = 0; i < 3; i++) {
            cambiarImagen(i);
        }
    }
    comprobar();
    credito();
};

function cambiarImagen(k) {

    azar[k] = Math.floor(Math.random() * imagenes.length);
    document.querySelectorAll(".ventana img")[k].src = `img/${imagenes[azar[k]]}`;
}
function comprobar() {
    if (azar.every(val => val === azar[0])) {
        flex();
    }
}

function sinPasta() {
    if (coin <= 0) {
        document.querySelector("#velo").style.display = "flex";
        document.querySelector("#mensaje").innerHTML = "¿Quieres volver a jugar?";
        sonarFinal();
        let botonReiniciar = document.createElement("button");
        botonReiniciar.id = "reiniciar";
        botonReiniciar.innerHTML = "Reiniciar juego";
        botonReiniciar.onclick = function () {
            // Reiniciar el juego
            for (let i = 0; i < 3; i++) {
                cambiarImagen(i);
            }
            boleanoTirar = false
            coin = Math.floor(Math.random() * 10) + 10;
            credito(); // Actualizar la interfaz de usuario para mostrar el nuevo crédito
            document.querySelector("#velo").style.display = "none"; // Ocultar el mensaje de fin de juego
            document.querySelector("#mensaje").innerHTML = ""; // Vaciar el contenido del mensaje
            mensaje
            botonReiniciar.parentNode.removeChild(botonReiniciar); // Eliminar el botón "Reiniciar juego"
        }
        document.querySelector("#velo").appendChild(botonReiniciar);

    }
}


function flex() {
    document.querySelector("#velo").style.display = "flex";
    document.querySelector("#mensaje").innerHTML = "!FELICIDADES!<BR> !Has ganado mas monedas!";
    premio();
}
function cerrar() {
    document.querySelector("#velo").style.display = "none";
    document.querySelector("#mensaje").innerHTML = "";
}
function credito() {
    document.querySelector("#monedas").innerHTML = "";
    document.querySelector("#dinero").innerHTML = `<span>${coin}</span><span class="euros">€</span></div></div>`;
    for (let p = 0; p < coin; p++) {
        document.querySelector("#monedas").innerHTML += `<img src="img/bitcoin.png">`;
    }
}
function premio() {
    boleanoTirar = false
    let random5 = Math.floor(Math.random() * 5 + 1) + coin;
    coin = random5;
    credito();
    sonarGanar()
}
function botones() {
    let cuantos = document.querySelectorAll(".boton").length;
    for (let i = 0; i < cuantos; i++) {
        document.querySelectorAll(".boton")[i].onclick = saber;
    }
}

function saber() {
    if (boleanoTirar == true) {
        let hijos = this.parentNode.children;
        for (let u = 0; u < hijos.length; u++) {
            if (this == hijos[u]) {
                if (coin <= 0) {
                    sinPasta();
                } else {
                    coin--;
                    cambiarImagen(u)
                    comprobar();
                    credito();
                    break;
                }
            }
        }
    }
}
