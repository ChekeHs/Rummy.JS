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
