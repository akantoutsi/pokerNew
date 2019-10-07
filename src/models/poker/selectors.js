export const calcTablePot = arr => {
    return arr.reduce((acc, elem) => { 
        acc += elem.pot; 
        return acc; 
    }, 0);
}
