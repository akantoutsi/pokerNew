import { getCurrentPlayer, getTablePot, playersWithSamePot } from 'models/poker';
import { updateObjectInArray, setNextPlayer, cardsToOpen }   from 'utils';

export const lIncrementPot = iState => {
    let players    = [...iState.players];
    let player     = getCurrentPlayer(players);
    const tablePot = getTablePot(players);
    const tmpPot   = player.tmpPot;
    const cash     = player.cash;
    let newPot     = tmpPot;
    let newCash    = cash;

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

    return { ...iState, players: players };
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

    return { ...iState, players: players };
}

export const lNextMove = iState => {
    let players           = [...iState.players];
    let round             = iState.round;
    let currentPlayer     = getCurrentPlayer(players);
    let activePlayers     = players.filter(elem => elem.isActive && elem.cash > 0);
    let playersRaised     = [];
    let playersChecked    = iState.playersChecked;
    let nextPlayer        = {};
    let boardCards        = [...iState.boardCards];
    let updatedBoardCards = boardCards;

    // Player has raised
    if (currentPlayer.potChanged === 1 && currentPlayer.tmpPot >= getTablePot(activePlayers)) {
        playersChecked          = 0;
        currentPlayer.isCurrent = 0;
        currentPlayer.pot       = currentPlayer.tmpPot;
    
        nextPlayer = setNextPlayer(activePlayers, currentPlayer);
        updateObjectInArray(players, nextPlayer);

        if (playersWithSamePot(activePlayers) === activePlayers.length) {
            alert('open card');
            round++;
            updatedBoardCards = (round < 4) ? cardsToOpen(boardCards, 0) : cardsToOpen(boardCards, 1);
            players = players.map(elem => ({ ...elem, potChanged: 0 })); 
        }
    
    // Player has checked
    } else {
        playersRaised = activePlayers.reduce((acc, elem) => { 
            acc += (elem.potChanged === 0) ? 0 : 1; 
            return acc; 
        }, 0);

        if (playersRaised === 0) {
            playersChecked++;
            currentPlayer.isCurrent = 0;
            currentPlayer.pot       = currentPlayer.tmpPot;
        
            nextPlayer = setNextPlayer(activePlayers, currentPlayer);
            updateObjectInArray(players, nextPlayer);

            if (playersChecked === activePlayers.length) {
                alert('open card');
                round++;
                updatedBoardCards = (round < 4) ? cardsToOpen(boardCards, 0) : cardsToOpen(boardCards, 1);
                playersChecked = 0;
                players        = players.map(elem => ({ ...elem, potChanged: 0 })); 
            }
        }
    }

    const allBoardCardsOpen = boardCards.reduce((acc, elem) => {
        acc += (elem.isVisible === true) ? 1 : 0;
        return acc;
    }, 0);

    // Conditions for finding winner(s)
    if (round >= 4 || activePlayers.length <= 1 || allBoardCardsOpen === boardCards.length) { // isws i teleftaia sinthiki kaliptetai apo tin proti
        alert('open all cards - find winner');
        updatedBoardCards = cardsToOpen(boardCards, 1);
    }

    return { ...iState, round: round, boardCards: updatedBoardCards, players: players, playersChecked: playersChecked };
}