import { initializeCards, initializeWinningCombs, initializeBoardCards, initializePlayers } from 'utils/helper';
import { DEALER_ID }                                                                        from 'utils';

const cards = initializeCards();

export const initialState = {
    round: 0,
    winningCombinations: initializeWinningCombs(),
    boardCards: initializeBoardCards(cards),
    players: initializePlayers(DEALER_ID, cards),
    playersChecked: 0,
    alreadyOpenedBoardCard: 0,
    winnerCards: [],
    winnerIds: [],
    selectedCards: []
}