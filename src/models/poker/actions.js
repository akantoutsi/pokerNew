// Global Actions
const RESET_GAME = 'RESET_GAME';
export const resetGame = () => ({ type: RESET_GAME });
resetGame.type = RESET_GAME;

const UPDATE_STATE = 'UPDATE_STATE';
export const updateState = payload => ({ type: UPDATE_STATE, payload });
updateState.type = UPDATE_STATE;

// Player Actions
const FOLD = 'FOLD';
export const fold = payload => ({ type: FOLD, payload });
fold.type = FOLD;

const INCREMENT_POT = 'INCREMENT_POT';
export const incrementPot = payload => ({ type: INCREMENT_POT, payload });
incrementPot.type = INCREMENT_POT;

const DECREMENT_POT = 'DECREMENT_POT';
export const decrementPot = payload => ({ type: DECREMENT_POT, payload });
decrementPot.type = DECREMENT_POT;

const NEXT_MOVE = 'NEXT_MOVE';
export const nextMove = payload => ({ type: NEXT_MOVE, payload });
nextMove.type = NEXT_MOVE;

const SET_CARDS_SELECTED = 'SET_CARDS_SELECTED';
export const setCardsSelected = (winnerCards, playerId) => ({ type: SET_CARDS_SELECTED, payload: { winnerCards: winnerCards, playerId: playerId } });
setCardsSelected.type = SET_CARDS_SELECTED;

