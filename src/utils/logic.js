import { getCurrentPlayer, calcMaxPot, playersWithSamePot }             from 'models/poker';
import { updateObjectInArray,  setNextPlayer,        cardsToOpen, 
         initializeCards,      initializeBoardCards, initializePlayers, 
         findWinners,          findWinnerIds,        findWinnerCards,
         findWinCombinations                                         }  from 'utils';
import _                                                                from 'lodash';

export const lIncrementPot = iState => {
    let players    = [...iState.players];
    let player     = getCurrentPlayer(players);
    const tablePot = calcMaxPot(players);
    const tmpPot   = player.tmpPot;
    const cash     = player.cash;
    let newPot     = tmpPot;
    let newCash    = cash;

    if (tablePot - tmpPot <= cash) {
        if (newPot < tablePot) {
            newCash -= tablePot - newPot; 
            newPot   = tablePot;
        
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

    return { 
        ...iState, 
        players: players 
    };
}

export const lDecrementPot = iState => {
    let players    = [...iState.players];
    let player     = getCurrentPlayer(players);
    const tablePot = calcMaxPot(players);
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

    return { 
        ...iState, 
        players: players 
    };
}

export const lNextMove = iState => {
    let players                = [...iState.players];
    let round                  = iState.round;
    let currentPlayer          = getCurrentPlayer(players);
    let activePlayers          = players.filter(elem => elem.isActive && elem.cash > 0);
    let playersRaised          = [];
    let playersChecked         = iState.playersChecked;
    let nextPlayer             = {};
    let boardCards             = [...iState.boardCards];
    let updatedBoardCards      = boardCards;
    let alreadyOpenedBoardCard = iState.alreadyOpenedBoardCard;
    let winnerCards            = [];
    let winnerIds              = [];
    
    // Player has raised
    if (currentPlayer.potChanged === 1 && currentPlayer.tmpPot >= calcMaxPot(activePlayers)) {
        playersChecked          = 0;
        currentPlayer.isCurrent = 0;
        currentPlayer.pot       = currentPlayer.tmpPot;
        alreadyOpenedBoardCard  = 0;
    
        nextPlayer = setNextPlayer(activePlayers, currentPlayer);
        updateObjectInArray(players, nextPlayer);

        if (playersWithSamePot(activePlayers) === activePlayers.length && !alreadyOpenedBoardCard) {
            round++;
            updatedBoardCards      = (round < 4) ? cardsToOpen(boardCards, 0) : cardsToOpen(boardCards, 1);
            players                = players.map(elem => ({ ...elem, potChanged: 0 })); 
            alreadyOpenedBoardCard = 1;
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

            if (playersChecked === activePlayers.length && !alreadyOpenedBoardCard) {
                round++;
                updatedBoardCards      = (round < 4) ? cardsToOpen(boardCards, 0) : cardsToOpen(boardCards, 1);
                playersChecked         = 0;
                players                = players.map(elem => ({ ...elem, potChanged: 0 })); 
                alreadyOpenedBoardCard = 1; 
            } 

            if (playersChecked >= 1) {
                alreadyOpenedBoardCard = 0;
            }
        }
    }

    // Conditions for finding winner(s)
    if (round >= 5 || activePlayers.length <= 1 && activePlayers[0].potChanged === 1) { 
        updatedBoardCards = cardsToOpen(boardCards, 1);
        let activePlrs    = players.filter(elem => elem.isActive && elem.cash >= 0);
        winnerCards       = findWinnerCards(updatedBoardCards, activePlrs);
        winnerIds         = findWinnerIds(updatedBoardCards, activePlrs);

        winnerCards.map(elem => elem.map(el => !el.isBoard ? players.map(pl => pl.cards.filter(e => e.value === el.value && e.suit === el.suit ? e.isVisible = true : null)) : null));
        // console.log(winnerCards)

        round = 0;
        players = players;
        players = players.map(elem => ({ ...elem, isCurrent: 0 }));
    }

    return { 
        ...iState, 
        round: round, 
        boardCards: updatedBoardCards, 
        players: players, 
        playersChecked: playersChecked, 
        alreadyOpenedBoardCard: alreadyOpenedBoardCard,
        winnerCards: winnerCards,
        winnerIds: winnerIds 
    };
}

export const lFold = iState => {
    let players                = [...iState.players];
    let round                  = iState.round;
    let currentPlayer          = getCurrentPlayer(players);
    let nextPlayer             = {};
    let playersRaised          = [];
    let playersChecked         = iState.playersChecked;
    let boardCards             = [...iState.boardCards];
    let updatedBoardCards      = boardCards;
    let alreadyOpenedBoardCard = iState.alreadyOpenedBoardCard;
    let winnerCards            = [];
    let winnerIds              = [];

    currentPlayer.isCurrent = 0;
    currentPlayer.isActive  = 0;

    let activePlayers = players.filter(elem => elem.isActive && elem.cash > 0);

    if (activePlayers.length > 1) {
        nextPlayer = setNextPlayer(activePlayers, currentPlayer);
        updateObjectInArray(players, nextPlayer);
    }

    playersRaised = activePlayers.reduce((acc, elem) => { 
        acc += (elem.potChanged === 0) ? 0 : 1; 
        return acc; 
    }, 0);

    if (playersRaised > 0) {
        if (playersWithSamePot(activePlayers) === activePlayers.length && !alreadyOpenedBoardCard) {
            round++;
            updatedBoardCards      = (round < 4) ? cardsToOpen(boardCards, 0) : cardsToOpen(boardCards, 1);
            players                = players.map(elem => ({ ...elem, potChanged: 0 })); 
            alreadyOpenedBoardCard = 1;
        }

    } else {
        currentPlayer.isCurrent = 0;
        currentPlayer.pot       = currentPlayer.tmpPot;
    
        if (activePlayers.length > 1) {
            nextPlayer = setNextPlayer(activePlayers, currentPlayer);
            updateObjectInArray(players, nextPlayer);
        }

        if (playersChecked === activePlayers.length && !alreadyOpenedBoardCard) {
            round++;
            updatedBoardCards      = (round < 4) ? cardsToOpen(boardCards, 0) : cardsToOpen(boardCards, 1);
            playersChecked         = 0;
            players                = players.map(elem => ({ ...elem, potChanged: 0 })); 
            alreadyOpenedBoardCard = 1;
        }

        if (playersChecked >= 1) {
            alreadyOpenedBoardCard = 0;
        }
    }

    // Conditions for finding winner(s)
    if (round >= 5 || activePlayers.length <= 1) { 
        updatedBoardCards = cardsToOpen(boardCards, 1);
        let activePlrs    = players.filter(elem => elem.isActive && elem.cash >= 0);
        winnerCards       = findWinnerCards(updatedBoardCards, activePlrs);
        winnerIds         = findWinnerIds(updatedBoardCards, activePlrs);

        winnerCards.map(elem => elem.map(el => !el.isBoard ? players.map(pl => pl.cards.filter(e => e.value === el.value && e.suit === el.suit ? e.isVisible = true : null)) : null));
        // console.log(winnerCards)
        round   = 0;
        players = players;    
    }

    return { 
        ...iState, 
        round: round, 
        boardCards: updatedBoardCards, 
        players: players, 
        playersChecked: playersChecked, 
        alreadyOpenedBoardCard: alreadyOpenedBoardCard,
        winnerCards: winnerCards,
        winnerIds: winnerIds 
    };
}

export const lSetCardsAsSelected = iState => {
    console.log(iState.winnerCards)
    iState.winnerCards.map(elem => elem.map(el => el.isBoard ? (iState.boardCards.filter(e => e.value === el.value && e.suit === el.suit ? e.selected = true : null)) : null));
    iState.winnerCards.map(elem => elem.map(el => !el.isBoard ? iState.players.map(pl => pl.cards.filter(e => e.value === el.value && e.suit === el.suit ? e.selected = true : null)) : null));

    return {
        ...iState,
    }
}

export const lResetGame = iState => {
    const cards = initializeCards();

    return {
        ...iState,
        round: 1,
        boardCards: initializeBoardCards(cards),
        players: initializePlayers(cards),
        playersChecked: 0,
        alreadyOpenedBoardCard: 0,
        winnerCards: [],
        winnerIds: []
    }
}
