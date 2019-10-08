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
  constructor(numeroJugador, fichas) {
    this.numeroJugador = numeroJugador;
    this.fichas = fichas;
  }

  hasPlays = false;

  /* Función para la primera jugada de cualquier jugador.
 Las condiciones que se deben de cumplir son las siguientes:

  -Las condiciones de fichas que ya se conocen en Rummy.
  -Que la suma de todas las fichas sea mayor o igual a 30.
  -El comodín, si se usa en esta instancia, tiene un valor igual a cero.*/

  /*
Pasos para la primera jugada:
  1)Preguntarle al jugador cuántas piezas quiere bajar en un stack. La cantidad mínima es de 3.


*/

  primeraJugada() {
    let temporalPositions = [];
    let nuevaJugada = prompt("¿Harás una nueva jugada? S/N");
    if (nuevaJugada === "S") {
      function whileNewArrayNotVerified() {
        let posicionFichasARemover = prompt(
          `Menciona la posición de las fichas que quieres retirar, acorde a la cantidad que mencionaste antes, y separado por comas.
        La cantidad mínima es de tres fichas.`
        );

        temporalPositions = posicionFichasARemover
          .split(",")
          .map(Number)
          .sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
        console.log(temporalPositions);

        if (temporalPositions.length < 3) {
          alert(`El array no tiene la cantidad mínima de fichas requeridas.
        Por favor introduce los datos correctamente. `);
          whileNewArrayNotVerified();
        }

        // if (posiciones.reduce((a, b) => a + b, 0) >= 30) {
        //   console.log("El programa ya llega hasta aquí correctamente.");
        // }
      }
      whileNewArrayNotVerified();
    }
  }

  jugada() {}
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
  //Por razones de conveniencia en el proceso de desarrollo, la cantidad de jugadores se mantendrá en 4.
  //Después se comprobará la lógica para cambiarlos de manera dinámica.
  //Cuando se llegue a ese punto, descomentar las siguientes líneas:
  // cantidadJugadores = prompt("Indica la cantidad de jugadores");
  // Math.floor(cantidadJugadores);
  //console.log(cantidadJugadores);

  cantidadJugadores = 4;

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
  //Mostrar en el HTML todas las fichas revueltas.
  shuffledDeckDisplay();
}

function inicializarJugadores() {
  console.log(cantidadJugadores);
  for (let i = 0; i < cantidadJugadores; i++) {
    const fichas = deckFichas.splice(0, 14);
    jugadores.push(new Jugador(i + 1, fichas));
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
    for (let j = 0; j < jugadores[i].fichas.length; j++) {
      if (jugadores[i].fichas[j].nombre === "comodin") {
        document.getElementById("deck").innerHTML +=
          '<img src="images/' +
          jugadores[i].fichas[j].nombre +
          '.png" style="max-width: 50px"> </img>';
      } else {
        document.getElementById("deck").innerHTML +=
          '<img src="images/' +
          jugadores[i].fichas[j].color +
          jugadores[i].fichas[j].numero +
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
  document.getElementById("deck").innerHTML +=
    "<br>Deck de fichas para comer:<br>";
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

  /*Logs para comprobación de la inicialización correcta de las fichas:

  console.log(`Cantidad de fichas restantes en el deck: ${deckFichas.length}`);
  console.log(
    `Cantidad de fichas del jugador 1: ${jugadores[0].fichas.length}`
  );
  console.log(
    `Cantidad de fichas del jugador 2: ${jugadores[1].fichas.length}`
  );
  console.log(
    `Cantidad de fichas del jugador 3: ${jugadores[2].fichas.length}`
  );
  console.log(
    `Cantidad de fichas del jugador 4: ${jugadores[3].fichas.length}`
  );
  console.log(
    `Cantidad total de fichas: ${deckFichas.length +
      jugadores[0].fichas.length +
      jugadores[1].fichas.length +
      jugadores[2].fichas.length +
      jugadores[3].fichas.length} `
  );*/
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
  //shuffledDeckDisplay();
}

//La siguiente función correrá directamente desde la página web.
definirCantJugadores();

//Condición master para que el juego siga corriendo.
//Una vez que cualquier jugador llegue a cero fichas, el juego termina.
while (jugadores.some(jugador => jugador.fichas.length !== 0)) {
  for (let turnoJugador = 0; turnoJugador < 4; turnoJugador++) {
    console.log(`Turno del jugador número ${turnoJugador + 1}`);

    if (jugadores[turnoJugador].hasPlays === false) {
      jugadores[turnoJugador].primeraJugada();
    } else {
      jugadores[turnoJugador].jugada();
    }
  }
}

//Warning que dirá cuál fue el jugador ganador, además de cómo quedaron los lugares posteriores.
