const mostrarMatriz = async (nV, matriz0) => {
    console.log('');
    let letras = "  ";

    for (let i = 0; i < nV; i++) {
        letras += String.fromCharCode(65 + i);
        if (i !== nV - 1) {
            letras += '  ';
        }
    }

    console.log(letras);
    for (let i = 0; i < nV; i++) {
        console.log(String.fromCharCode(65 + i), matriz0[i].join(", "));
    }
}

export {
    mostrarMatriz
}