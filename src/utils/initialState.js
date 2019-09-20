import { initializeCards, initializeWinningCombs, initializeBoardCards, initializePlayers } from 'utils/helper';

const cards = initializeCards();

export const initialState = {
    round: 0,
    winningCombinations: initializeWinningCombs(),
    boardCards: initializeBoardCards(cards),
    players: initializePlayers(cards),
    playersChecked: 0
}