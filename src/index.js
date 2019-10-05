"use strict";

//Array para guardar cada uno de los objetos (fichas) necesarios para inicializar los juegos de todos los jugadores, y comer:
const deckFichas = [];

//Array para guardar las jugadas ya puestas en la mesa.
const deckJugadas = [];

//Array para guardar los datos de un máximo de 4 jugadores.
let jugadores = [];

//Variable para la cantidad de jugadores
let cantidadJugadores;

//Clase para todas las fichas.
//"this.nombre" será utilizado únicamente por el comodín, y llevará ese nombre sin acento.
class Ficha {
  constructor(color, numero, nombre) {
    this.color = color;
    this.numero = numero;
    this.nombre = nombre;
  }
}

//Clase para el jugador.
class Jugador {
  constructor(numeroJugador) {
    this.numeroJugador = numeroJugador;
    this.arregloFichas = deckFichas.splice(0, 14);
  }
}

/*Función para inicializar al jugador (en esto me quedé cuando lo subí Xd)
Se supone que el botón que en el HTML dice "Console.log del jugador" hará lo que se encuentra dentro de esta función.
Dicho botón debe de presionarse después de revolver y mostrar las piezas. De otra manera, no hará nada.
Básicamente lo que TIENE que hacer es:

    1)Hacer una nueva clase "jugador"
      1.1) Tendrá nombre.
      1.2) Las fichas se removerán del deck total y ahora serán propiedad del jugador.

    2)Interactuar con el resto del programa (cosa que aún no hace)
      2.1) El jugador podrá ver sus fichas, obviamente en el HTML.
*/
/**
 * Inicializar Jugador - ¿Qué hace?
 */

function definirCantJugadores() {
  cantidadJugadores = prompt("Indica la cantidad de jugadores");
  Math.floor(cantidadJugadores);
  //console.log(cantidadJugadores);

  if (cantidadJugadores < 2) {
    alert("La cantidad mínima de jugadores se determinará a 2.");
    cantidadJugadores = 2;
  }
  if (cantidadJugadores > 4) {
    alert("La cantidad máxima de jugadores se determinará a 4.");
    cantidadJugadores = 4;
  }

  inicializarJuego();
  inicializarJugadores();
}

function inicializarJugadores() {
  console.log(cantidadJugadores);
  for (let i = 0; i < cantidadJugadores; i++) {
    jugadores.push(new Jugador(i + 1));
    console.log(jugadores[i]);
  }
  // document.getElementById("deck").innerHTML = "";
  //console.log(jugadores);
  //console.log(deckFichas);

  /*No sé exactamente cómo utilizar objetos en este caso. Es un caso diferente al del deck completo de fichas...
  Por cierto, da error en la consola. 
  De cualquier manera sé que está mal, ya que no asigna a variables dinámicas sino a una estática "jehs", lo cual ceba el multiplayer.
  Además de que hay problemas de scope que no pude resolver.*/
  //var jehs = new Jugador("Jaime");

  //shuffledDeckDisplay();
  playerDeckDisplay();
  //console.log(deckFichas);
}

//Función para mostrar el deck del jugador en la pantalla (aún no funciona como debe)
function playerDeckDisplay() {
  document.getElementById("deck").innerHTML += "<br>";
  console.log(jugadores);
  for (let i = 0; i < jugadores.length; i++) {
    document.getElementById("deck").innerHTML +=
      "<br>Jugador " + (i + 1) + ":<br>";
    for (let j = 0; j < jugadores[i].arregloFichas.length; j++) {
      if (jugadores[i].arregloFichas[j].nombre === "comodin") {
        document.getElementById("deck").innerHTML +=
          '<img src="images/' +
          jugadores[i].arregloFichas[j].nombre +
          '.png" style="max-width: 50px"> </img>';
      } else {
        document.getElementById("deck").innerHTML +=
          '<img src="images/' +
          jugadores[i].arregloFichas[j].color +
          jugadores[i].arregloFichas[j].numero +
          '.png" style="max-width: 50px"> </img>';
      }
      //Las fichas se mostrarán en múltiplos de 14.
      if ((j + 1) % 14 == 0) {
        document.getElementById("deck").innerHTML += "<br>";
      }
    }
  }
}

//Función para inicializar el deck
function assignDeck() {
  var colores = ["negro", "azul", "amarillo", "rojo"];
  for (let i = 1; i < 5; i++) {
    for (let j = 1; j < 3; j++) {
      for (let k = 1; k < 14; k++) {
        deckFichas.push(new Ficha(colores[i - 1], k));
      }
    }
  }
  deckFichas.push(new Ficha("", 0, "comodin"));
  deckFichas.push(new Ficha("", 0, "comodin"));
  //console.log(deckFichas);
}

/**
 * Shuffle an array
 * @param {Array<any>} deck - Deck of Rummy cards
 */
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

//Función para mostrar todas las fichas ya revueltas en el HTML.
//Las fichas revueltas no se mostrarán en el juego final.
//Sin embargo, son necesarias para la verificación actual.
function shuffledDeckDisplay() {
  //Usar la siguiente línea de código para la comprobación del correcto display de los objetos:
  //console.log(deckFichas);

  //Si la ficha es un comodín, el proceso es un poco diferente ya que el objeto del comodín no comparte los mismos valores que el resto de las fichas.
  //Si la ficha es una de las otras, buscará la imagen que concuerde con los parámetros.
  for (let i = 0; i < deckFichas.length; i++) {
    if (deckFichas[i].nombre === "comodin") {
      document.getElementById("deck").innerHTML +=
        '<img src="images/' +
        deckFichas[i].nombre +
        '.png" style="max-width: 50px"> </img>';
    } else {
      document.getElementById("deck").innerHTML +=
        '<img src="images/' +
        deckFichas[i].color +
        deckFichas[i].numero +
        '.png" style="max-width: 50px"> </img>';
    }

    //Las fichas se mostrarán en múltiplos de 13.
    if ((i + 1) % 13 == 0) {
      document.getElementById("deck").innerHTML += "<br>";
    }
  }
}

//Función que activará las funciones mencionadas al presionar el botón de "Revolver y mostrar" en el HTML.
function inicializarJuego() {
  //El siguiente console.log es solo para fines de comprobación.
  //console.clear();

  //Vaciar el array para que no se agreguen objetos de más.
  deckFichas.splice(0, deckFichas.length);

  //Eliminar las fichas que estaban anteriormente en el HTML (si las había).
  document.getElementById("deck").innerHTML = "";

  //Asignar nuevamente el deck
  assignDeck();

  //Revolver el deck
  shuffle(deckFichas);

  //El siguiente console.log es solo para fines de comprobación.
  //console.log(deckFichas);

  //Mostrar en el HTML todas las fichas revueltas.
  shuffledDeckDisplay();
}

/*  Función BASE para el desordenamiento de las fichas.
    Si algo sale mal, copiar este código y rehacer el desordenamiento.
    OJO: ESTE CÓDIGO NO HACE EL DESORDENAMIENTO, pero es posible usarlo como base para dicha función.
    UPDATE: Creo que ya no es necesario.

function displayAllCards() {
    document.getElementById("deck").innerHTML = "";
    var i, j, k;
    var colores = ["negro", "azul", "amarillo", "rojo"];
    for (i = 1; i < 5; i++) {
        for (j = 1; j < 3; j++) {
            for (k = 1; k < 14; k++) {
                deckFichas.push(new Ficha(colores[i - 1], k));
                //console.log(deckFichas);
                var numeroFicha = k.toString();
                document.getElementById("deck").innerHTML +=
                    '<img src="images/' +
                    colores[i - 1] +
                    numeroFicha +
                    '.png" style="max-width: 50px"> </img>';
                if (k == 13) {
                    document.getElementById("deck").innerHTML += "<br>";
                }
            }
        }
    }
    while (i < 7) {
        deckFichas.push(new Ficha("", "", "comodin"));
        // console.log(deckFichas);
        document.getElementById("deck").innerHTML +=
            '<img src="images/comodin.png" style="max-width: 50px"> </img>';
        i++;
    }
}*/
