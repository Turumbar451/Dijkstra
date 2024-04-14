import { hacerPreguntas, preguntarExistencia, repetirPuntos } from "./inquirer.js";
import { obtenerPesos, crearMatrizCuadrada, vertices, dijkstra } from "./procesos.js"
import { mostrarMatriz } from "./mensajes.js";


const gsnd = async () => {
    const msg1 = "entre"
    const msg2 = "y"
    const nV = await vertices();
    const matriz0 = await crearMatrizCuadrada(nV);
    const matriz = [];

    for (let i = 0; i < nV; i++) {
        matriz[i] = [];
        for (let j = 0; j < nV; j++) {
            if (i === j) {
                matriz[i][j] = 0;
            } else if (j > i) {
                const vertice1 = String.fromCharCode(65 + i);
                const vertice2 = String.fromCharCode(65 + j);
                const existeArista = await preguntarExistencia(vertice1, vertice2, msg1, msg2);
                matriz[i][j] = existeArista ? 1 : 0;
                matriz0[i][j] = matriz[i][j]
                if (existeArista) {
                    matriz0[j][i] = 1
                }
            } else {
                matriz[i][j] = 0;
            }
        }
    }

    let con = 0;
    mostrarMatriz(nV, matriz0);
    const matrizDePesos = await obtenerPesos(matriz, con)
    await mostrarResultado(matrizDePesos);

}


const gsd = async () => {
    const msg1 = "de"
    const msg2 = "a"
    const nV = await vertices();
    const matriz0 = await crearMatrizCuadrada(nV);
    const matriz = [];

    for (let i = 0; i < nV; i++) {
        matriz[i] = [];
        for (let j = 0; j < nV; j++) {
            matriz[i][j] = 0;
            if (i === j) {
                matriz[i][j] = 0;
            } else {
                if (matriz0[i][j] == 0) {
                    const vertice1 = String.fromCharCode(65 + i);
                    const vertice2 = String.fromCharCode(65 + j);
                    const existeArista = await preguntarExistencia(vertice1, vertice2, msg1, msg2);
                    matriz[i][j] = existeArista ? 1 : 0;
                    matriz0[i][j] = matriz[i][j]
                    if (existeArista) {
                        matriz0[j][i] = 1
                    }
                }
            }


        }
    }
    let con = 1;
    mostrarMatriz(nV, matriz);
    const matrizDePesos = await obtenerPesos(matriz, con)
    await mostrarResultado(matrizDePesos);
}

const mostrarResultado = async (nuevaMatriz) => {
    let salir = " ";
    do {
        const { puntoInicial, puntoFinal } = await hacerPreguntas(nuevaMatriz.length);
        console.log('');
        const { distance, path } = await dijkstra(nuevaMatriz, puntoInicial, puntoFinal)
        console.log(`La ruta mas corta entre el nodo ${puntoInicial} y el nodo ${puntoFinal} es: ${path}`)
        console.log("con un peso de: " + distance);
        console.log('');

        salir = await repetirPuntos();
    } while (salir !== "0");
}

export {
    gsnd,
    gsd
}