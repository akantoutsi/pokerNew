import * as consts from 'utils/constants';

export const getDealerId = bigBlindId => {
    return (bigBlindId + 1 >= consts.NUM_OF_PLAYERS)
            ?  bigBlindId + 1  - consts.NUM_OF_PLAYERS 
            :  bigBlindId + 1;
}

export const getFirstPlayerId = bigBlindId => {
    return (bigBlindId + 1 >= consts.NUM_OF_PLAYERS)
            ?  bigBlindId + 1  - consts.NUM_OF_PLAYERS 
            :  bigBlindId + 1;
}

export const getCurrentPlayer = arr => {
    return arr.reduce((acc, elem) => {
        acc = (elem.isCurrent === 1) ? elem : acc; 
        return acc;
    }, {});
}

export const calcMaxPot = arr => {
    return arr.reduce((max, elem) => {
        max = (elem.pot > max) ? elem.pot : max;   
        return max;
    }, 0);
}

export const playersWithSamePot = arr => {
    const maxPot = calcMaxPot(arr);

    return arr.reduce((acc, elem) => {
        acc += (elem.tmpPot === maxPot) ? 1 : 0;
        return acc;
    }, 0);
}

export const calcTablePot = arr => {
    return arr.reduce((acc, elem) => { 
        acc += elem.pot; 
        return acc; 
    }, 0);
}