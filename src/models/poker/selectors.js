import * as consts from 'utils/constants';

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

export const getTablePot = arr => {
    return arr.reduce((max, elem) => {
        max = (elem.pot > max) ? elem.pot : max;   
        return max;
    }, 0);
}

export const playersWithSamePot = arr => {
    const maxPot = getTablePot(arr);

    return arr.reduce((acc, elem) => {
        acc += (elem.tmpPot === maxPot) ? 1 : 0;
        return acc;
    }, 0);
}