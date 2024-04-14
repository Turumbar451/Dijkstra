import inquirer from 'inquirer';
import readline from 'readline';


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿que desea hacer?',
        choices: [{
            value: '1',
            name: `${'1.'.green} Grafo simple no dirigido`
        }, {
            value: '2',
            name: `${'2.'.green} Grafo simple dirigido`
        }, {
            value: '3',
            name: `${'3.'.green} Grafo mixto`
        },
        {
            value: '0',
            name: `${'0.'.green} Salir`
        }
        ]
    }
]


const inquirerMenu = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('  Selecciona una opcion  ');
    console.log('========================= \n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar\n`,
        }
    ]
    console.log(' \n ');
    await inquirer.prompt(question)
    console.clear();
}

const vertices = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Seleccione numero de vertices',
        choices: [{
            value: '2',
            name: `${'2.'.green} `
        }, {
            value: '3',
            name: `${'3.'.green} `
        }, {
            value: '4',
            name: `${'4.'.green} `
        }, {
            value: '5',
            name: `${'5.'.green} `
        }, {
            value: '6',
            name: `${'6.'.green} `
        }, {
            value: '7',
            name: `${'7.'.green} `
        }, {
            value: '8',
            name: `${'8.'.green} `
        }, {
            value: '9',
            name: `${'9.'.green} `
        }, {
            value: '10',
            name: `${'10.'.green} `
        }

        ]
    }
]
const inquirerVertices = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('  Selecciona una opcion  ');
    console.log('========================= \n'.green);

    const { opcion } = await inquirer.prompt(vertices);

    return opcion;
}

const deseo = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [{
            value: '1',
            name: `${'1.'.green} encontrar otra distancia`
        }, {
            value: '0',
            name: `${'0.'.green} terminar proceso`
        }

        ]
    }
]


const repetirPuntos = async () => {
    const { opcion } = await inquirer.prompt(deseo);
    return opcion;
}

const hacerPreguntas = async (n) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        let puntoInicial;
        let puntoFinal;
        let con1 = false;
        let con2 = false;
        console.log('');

        rl.question('¿Cuál es el nodo inicial? (A, B, C, etc.): ', (respuestaInicial) => {
            const puntoInicial = respuestaInicial.toUpperCase();

            rl.question("cual es el nodo final? (A, B, C, etc.): ", (respuestaFinal) => {
                const puntoFinal = respuestaFinal.toUpperCase();

                for (let i = 0; i < n; i++) {
                    if (String.fromCharCode(65 + i) == puntoInicial) {
                        con1 = true;
                    }
                    if (String.fromCharCode(65 + i) == puntoFinal) {
                        con2 = true;
                    }
                }


                if (isNaN(puntoInicial) == false || isNaN(puntoFinal) == false) {
                    rl.close();
                    console.log('No se debe introducir numeros');
                    hacerPreguntas(n).then(resolve).catch(reject)
                } else if ((typeof puntoInicial === "string" && puntoInicial.length > 1) || (typeof puntoFinal === "string" && puntoFinal.length > 1)) {
                    rl.close();
                    console.log('No se debe introducir cadena de caracteres');
                    hacerPreguntas(n).then(resolve).catch(reject)
                } else if (puntoFinal == puntoInicial) {
                    rl.close();
                    console.log("El punto inicial y el final no deben ser el mismo");
                    hacerPreguntas(n).then(resolve).catch(reject)
                } else if (con1 == false || con2 == false) {
                    rl.close();
                    console.log('El nodo introducido no existe');
                    hacerPreguntas(n).then(resolve).catch(reject)
                } else {
                    rl.close();
                    resolve({ puntoInicial, puntoFinal });
                }
            });
        });
    });
};

const preguntarExistencia = async (vertice1, vertice2, msg1, msg2) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(`¿Existe una arista ${msg1} ${vertice1} ${msg2} ${vertice2}? (si/no): `, (respuesta) => {
            rl.close();
            resolve(respuesta.toLowerCase() === 'si');
        });
    });
};

const preguntarPeso = async (relacion) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        rl.question(`¿Cuál es el peso de la arista ${relacion}? `, (peso) => {
            const pesoNum = parseInt(peso);
            if (isNaN(pesoNum) || pesoNum < 0) {
                rl.close();
                console.log('Por favor, introduce un número válido mayor o igual a cero.');
                console.log('');

                preguntarPeso(relacion)
                    .then(resolve)
                    .catch(reject);
            } else {
                rl.close();
                resolve(pesoNum);
            }
        });
    });
}

export {
    inquirerMenu,
    pausa,
    inquirerVertices,
    hacerPreguntas,
    preguntarExistencia,
    preguntarPeso,
    repetirPuntos
}