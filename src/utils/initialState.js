import { initializeCards, initializeWinningCombs, initializeBoardCards, initializePlayers } from 'utils/helper';

export const initialState = {
    round: 0,
    winningCombinations: initializeWinningCombs(),
    boardCards: initializeBoardCards(initializeCards()),
    players: initializePlayers(initializeCards()),
    tablePot: 0
}