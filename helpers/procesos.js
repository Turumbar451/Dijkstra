import { inquirerVertices, preguntarPeso } from "./inquirer.js";

const vertices = async () => {
    const opt = await inquirerVertices();
    return parseInt(opt)
}


const crearMatrizCuadrada = async (x) => {
    const matriz = [];
    for (let i = 0; i < x; i++) {
        matriz[i] = new Array(x).fill(0);
    }
    return matriz;
}

const obtenerPesos = async (matriz, con) => {
    console.log('');

    const nuevaMatriz = await crearMatrizCuadrada(matriz.length);
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] === 1) {
                const relacion = `${letras[i]}-${letras[j]}`;
                const peso = await preguntarPeso(relacion);
                nuevaMatriz[i][j] = peso;
                nuevaMatriz[j][i] = peso;
            }
            if (con == 1) {
                if (matriz[i][j] === 1) {
                    nuevaMatriz[j][i] = 0
                } else {
                    nuevaMatriz[i][j] = 0;
                }
            }
        }
    }

    return nuevaMatriz;
}

const dijkstra = async (matriz, start, end) => {
    const n = matriz.length;
    const distances = {};
    const visited = {};
    const path = {};

    for (let i = 0; i < n; i++) {
        distances[String.fromCharCode(65 + i)] = Infinity; //todas las variables a infinito
    }
    distances[start] = 0; //el nodo de inicio es 0
    //{ A: Infinity, B: 0, C: Infinity, D: Infinity, E: Infinity }

    function minDistance(distances, visited) { //vertice no visitado con la distancia minima
        let min = Infinity;
        let minVertex = null;
        for (const vertex in distances) { //vertex es a,b,c,d
            if (!visited[vertex] && distances[vertex] <= min) { //si no ha sido visitado y si la distancia es igual o menor al minimo encontrado hasta ahor
                min = distances[vertex];//actualiza la distancia minima
                minVertex = vertex; //actualiza el vertice con la distancia minimo
            }
        }
        return minVertex;
    }
    //dijkstra
    for (let i = 0; i < n - 1; i++) {
        const u = minDistance(distances, visited);
        visited[u] = true; //inidica cual nodo es visitado

        for (let v = 0; v < n; v++) {
            if (
                matriz[u.charCodeAt(0) - 65][v] !== 0 &&
                !visited[String.fromCharCode(65 + v)] &&
                distances[u] !== Infinity &&
                distances[u] + matriz[u.charCodeAt(0) - 65][v] < distances[String.fromCharCode(65 + v)]
            ) {
                distances[String.fromCharCode(65 + v)] = distances[u] + matriz[u.charCodeAt(0) - 65][v];
                path[String.fromCharCode(65 + v)] = u;
            }
        }
    }

    if (distances[end] === Infinity) {
        return {
            distance: Infinity,
            path: "No existe camino"
        };
    }

    const shortestPath = [];
    let current = end;
    while (current !== start) {
        shortestPath.unshift(current);
        current = path[current];
    }
    shortestPath.unshift(start);

    return {
        distance: distances[end],
        path: shortestPath.join(' -> ')
    };

}



export {
    obtenerPesos,
    crearMatrizCuadrada,
    vertices,
    dijkstra
}