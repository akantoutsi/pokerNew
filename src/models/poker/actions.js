// Global Actions
const START_GAME = 'START_GAME';
export const startGame = () => ({ type: START_GAME });

const UPDATE_TABLE_POT = 'UPDATE_TABLE_POT';
export const updateTablePot = (payload) => ({ type: UPDATE_TABLE_POT, payload });

const UPDATE_ROUND = 'UPDATE_ROUND';
export const updateRound = (payload) => ({ type: UPDATE_ROUND, payload });

const FIND_WINNERS = 'FIND_WINNERS';
export const findWinners = (payload) => ({ type: FIND_WINNERS, payload });

// Player Actions
const FOLD = 'FOLD';
export const fold = (payload) => ({ type: FOLD, payload });

// const CHECK = 'CHECK';
// export const check = (payload) => ({ type: CHECK, payload });

const INCREMENT_POT = 'INCREMENT_POT';
export const incrementPot= (payload) => ({ type: INCREMENT_POT, payload });

const DECREMENT_POT = 'DECREMENT_POT';
export const decrementPot= (payload) => ({ type: DECREMENT_POT, payload });

const NEXT_MOVE = 'NEXT_MOVE';
export const nextMove= (payload) => ({ type: NEXT_MOVE, payload });
