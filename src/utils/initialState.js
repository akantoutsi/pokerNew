import { initializeCards, initializeWinningCombs, initializeBoardCards, initializePlayers } from 'utils/helper';

const cards = initializeCards();

export const initialState = {
    round: 0,
    winningCombinations: initializeWinningCombs(),
    boardCards: initializeBoardCards(cards),
    players: initializePlayers(-1, cards),
    playersChecked: 0,
    alreadyOpenedBoardCard: 0,
    winnerCards: [],
    winnerIds: [],
}