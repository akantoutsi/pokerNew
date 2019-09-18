import { getCurrentPlayer, getTablePot, playersChecked } from 'models/poker';
import { updateObjectInArray }                           from 'utils';

export const lIncrementPot = iState => {
    let players    = [...iState.players];
    let player     = getCurrentPlayer(players);
    const tablePot = getTablePot(players);
    const tmpPot   = player.tmpPot;
    const cash     = player.cash;
    let newPot     = tmpPot;
    let newCash    = cash;
    let potChanged = player.potChanged;

    if (tablePot - tmpPot <= cash) {
        if (newPot < tablePot) {
            newPot   = tablePot;
            newCash -= tablePot - newPot; 
        
        } else {
            if ( (newPot + 1 <= cash + tmpPot) && (newPot + 1 > tablePot) ) {
                newPot  += 1;
                newCash -= 1;
            }
        }

    } else { 
        newPot += cash;
        newCash = 0;
    } 

    player.tmpPot     = newPot;
    player.cash       = newCash;
    player.potChanged = 1;

    updateObjectInArray(players, player);

    return players;
}

export const lDecrementPot = iState => {
    let players    = [...iState.players];
    let player     = getCurrentPlayer(players);
    const tablePot = getTablePot(players);
    const tmpPot   = player.tmpPot;
    const cash     = player.cash;
    let newPot     = tmpPot;
    let newCash    = cash;
    let potChanged = player.potChanged;

    if (newPot - 1 >= tablePot) {
        newPot    -= 1;
        newCash   += 1;
        potChanged = 1;
    } 

    if (player.pot === newPot) {
        potChanged = 0;
    }

    player.tmpPot     = newPot;
    player.cash       = newCash;
    player.potChanged = potChanged;

    updateObjectInArray(players, player);

    return players;
}

export const lNextMove = iState => {
    let players       = [...iState.players];
    let currentPlayer = getCurrentPlayer(players);
    let activePlayers = players.filter(elem => elem.isActive && elem.cash > 0);
    let nextPlayerId  = -1;

    if ( (currentPlayer.potChanged === 0 && playersChecked(activePlayers) === activePlayers.length) || currentPlayer.potChanged === 1 ) {
        console.log('next move');
        currentPlayer.isCurrent = 0;
        currentPlayer.pot       = currentPlayer.tmpPot;
        // currentPlayer.potChanged = 0;
    
        nextPlayerId = (activePlayers.findIndex(elem => elem.seq > currentPlayer.seq) !== -1) 
                     ?  activePlayers.findIndex(elem => elem.seq > currentPlayer.seq) 
                     : 0;
    
        activePlayers[nextPlayerId].isCurrent = 1;
    
        updateObjectInArray(players, activePlayers[nextPlayerId]);
    }

    return players;
}