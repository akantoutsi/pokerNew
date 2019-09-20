// // Global Actions
// const START_GAME = 'START_GAME';
// export const startGame = () => ({ type: START_GAME });

const UPDATE_ROUND = 'UPDATE_ROUND';
export const updateRound = payload => ({ type: UPDATE_ROUND, payload });
updateRound.type = UPDATE_ROUND;

// const FIND_WINNERS = 'FIND_WINNERS';
// export const findWinners = payload => ({ type: FIND_WINNERS, payload });

// // Player Actions
// const FOLD = 'FOLD';
// export const fold = payload => ({ type: FOLD, payload });

// const CHECK = 'CHECK';
// export const check = payload => ({ type: CHECK, payload });

const INCREMENT_POT = 'INCREMENT_POT';
export const incrementPot = payload => ({ type: INCREMENT_POT, payload });
incrementPot.type = INCREMENT_POT;

const DECREMENT_POT = 'DECREMENT_POT';
export const decrementPot = payload => ({ type: DECREMENT_POT, payload });
decrementPot.type = DECREMENT_POT;

const UPDATE_PLAYERS = 'UPDATE_PLAYERS';
export const updatePlayers = payload => ({ type: UPDATE_PLAYERS, payload });
updatePlayers.type = UPDATE_PLAYERS;

const NEXT_MOVE = 'NEXT_MOVE';
export const nextMove = payload => ({ type: NEXT_MOVE, payload });
nextMove.type = NEXT_MOVE;

