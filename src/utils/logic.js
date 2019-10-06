import { getCurrentPlayer, calcMaxPot, playersWithSamePot, getDealerId } from 'models/poker';
import { updateObjectInArray,  setNextPlayer,        cardsToOpen, 
         initializeCards,      initializeBoardCards, initializePlayers, 
         findWinnerIds,        findWinnerCards }                         from 'utils';
import _                                                                 from 'lodash';

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
    let activePlayers          = players.filter(elem => elem.isActive && elem.cash >= 0);
    let playersRaised          = [];
    let playersChecked         = iState.playersChecked;
    let nextPlayer             = {};
    let boardCards             = [...iState.boardCards];
    let updatedBoardCards      = boardCards;
    let alreadyOpenedBoardCard = iState.alreadyOpenedBoardCard;
    let winnerCards            = [];
    let winnerIds              = [];
    let restActivePlayers      = [];

    // Player has raised
    restActivePlayers = players.filter(elem => elem.isActive && elem.cash > 0);
    if (currentPlayer.potChanged === 1 && (currentPlayer.tmpPot >= calcMaxPot(activePlayers) || currentPlayer.cash === 0 || restActivePlayers.length >= 1)) {
        playersChecked          = 0;
        currentPlayer.isCurrent = 0;
        currentPlayer.pot       = currentPlayer.tmpPot;
    
        restActivePlayers = players.filter(elem => elem.isActive && elem.cash > 0 && elem.seq !== currentPlayer.seq);
        if (restActivePlayers.length >= 1) {
            nextPlayer = setNextPlayer(restActivePlayers, currentPlayer);
            updateObjectInArray(players, nextPlayer);
        }
        
        playersRaised = activePlayers.reduce((acc, elem) => { 
            acc += (elem.potChanged === 1) ? 1 : 0; 
            return acc; 
        }, 0);

        if (playersRaised >= 1) {
            alreadyOpenedBoardCard = 0;
        }

        if (playersWithSamePot(activePlayers) === activePlayers.length && !alreadyOpenedBoardCard) {
            updatedBoardCards      = (round < 4) ? cardsToOpen(boardCards, 0) : cardsToOpen(boardCards, 1);
            round++;
            players                = players.map(elem => ({ ...elem, potChanged: 0 })); 
            activePlayers          = activePlayers.map(elem => ({ ...elem, potChanged: 0 }));
            alreadyOpenedBoardCard = 1;
        } 
    
    // Player has checked
    } else {
    // ean to afisw etsi, den pianei tin periptosi pou
    // activePlayers     = players.filter(elem => elem.isActive && elem.cash > 0);
    // first round oloi raise
    // sto second round, o first player kanei fold kai o defteros kanei raise all
    // o tritos player mporei na kanei check enw den prepei

    // eidallws, xtipaei to case
    // pou oloi kanei raise all kai o teleftaios apla raise or check
        restActivePlayers = players.filter(elem => elem.isActive && elem.cash > 0 && elem.seq !== currentPlayer.seq);

        if (restActivePlayers.length === 0 || activePlayers.length >= 1) {
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
                    updatedBoardCards      = (round < 4) ? cardsToOpen(boardCards, 0) : cardsToOpen(boardCards, 1);
                    round++;
                    playersChecked         = 0;
                    players                = players.map(elem => ({ ...elem, potChanged: 0 })); 
                    activePlayers          = activePlayers.map(elem => ({ ...elem, potChanged: 0 }));
                    alreadyOpenedBoardCard = 1; 
                } 

                if (playersChecked >= 1) {
                    alreadyOpenedBoardCard = 0;
                }
            }
        }
    }

    // restActivePlayers = activePlayers.filter(elem => elem.seq !== currentPlayer.seq);
    restActivePlayers = players.filter(elem => elem.isActive && elem.cash > 0 && elem.seq !== currentPlayer.seq);
    if (round >= 4 || restActivePlayers.length === 0) {
        updatedBoardCards = cardsToOpen(boardCards, 1);
        let activePlrs    = players.filter(elem => elem.isActive && elem.cash >= 0);
        winnerCards       = findWinnerCards(updatedBoardCards, activePlrs);
        winnerIds         = findWinnerIds(updatedBoardCards, activePlrs);

        winnerCards.map(elem => elem.map(el => !el.isBoard ? players.map(pl => pl.cards.filter(e => e.value === el.value && e.suit === el.suit ? e.isVisible = true : null)) : null));

        round   = -1;
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
            updatedBoardCards      = (round < 4) ? cardsToOpen(boardCards, 0) : cardsToOpen(boardCards, 1);
            round++;
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
            updatedBoardCards      = (round < 4) ? cardsToOpen(boardCards, 0) : cardsToOpen(boardCards, 1);
            round++;
            playersChecked         = 0;
            players                = players.map(elem => ({ ...elem, potChanged: 0 })); 
            alreadyOpenedBoardCard = 1;
        }

        if (playersChecked >= 1) {
            alreadyOpenedBoardCard = 0;
        }
    }

    // Conditions for finding winner(s)
    if (round >= 4 || activePlayers.length <= 1) { 
        updatedBoardCards = cardsToOpen(boardCards, 1);
        let activePlrs    = players.filter(elem => elem.isActive && elem.cash >= 0);
        winnerCards       = findWinnerCards(updatedBoardCards, activePlrs);
        winnerIds         = findWinnerIds(updatedBoardCards, activePlrs);

        winnerCards.map(elem => elem.map(el => !el.isBoard ? players.map(pl => pl.cards.filter(e => e.value === el.value && e.suit === el.suit ? e.isVisible = true : null)) : null));
        round   = -1;
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

export const lResetGame = iState => {
    const cards    = initializeCards();
    const dealerId = getDealerId(iState.players);

    return {
        ...iState,
        dealerId: dealerId,
        round: 0,
        boardCards: initializeBoardCards(cards),
        players: initializePlayers(dealerId, cards),
        playersChecked: 0,
        alreadyOpenedBoardCard: 0,
        winnerCards: [],
        winnerIds: [],
        selectedCards: []
    }
}
