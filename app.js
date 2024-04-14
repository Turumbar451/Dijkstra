import colors from 'colors';
import { inquirerMenu, pausa } from './helpers/inquirer.js';
import { gsnd, gsd } from './helpers/grafos.js';

console.clear();
const main = async () => {
    let opt = '';
    do {
        opt = await inquirerMenu()
        switch (opt) {
            case "1":
                await gsnd();
                break;
            case "2":
                await gsd();
                break;
            case "3":
                break;
        }
        if (opt !== "0") await pausa()
    } while (opt != "0");
    if (opt === "0") console.clear()
}

main()