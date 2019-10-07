import { 
  ofType 
} from 'redux-observable';

import { 
  map, 
  mergeMap,
  withLatestFrom 
} from 'rxjs/operators';

import { 
  incrementPot, 
  decrementPot, 
  fold, 
  resetGame, 
  updateState, 
  nextMove,
  setCardsSelected 
} from 'models/poker';

import { 
  lIncrementPot, 
  lDecrementPot, 
  lNextMove, 
  lFold, 
  lResetGame,
  lSetCardsSelected 
} from 'utils/logic';

export const incrementPotEpic = (action$, state$) => {
  return action$.pipe(
    ofType(incrementPot.type),
    withLatestFrom(state$),
    map(([, { poker }]) => updateState(lIncrementPot(poker)))
  );
};
  
export const derementPotEpic = (action$, state$) => {
  return action$.pipe(
    ofType(decrementPot.type),
    withLatestFrom(state$),
    map(([, { poker }]) => updateState(lDecrementPot(poker)))
  );
};

export const nextMoveEpic = (action$, state$) => {
  return action$.pipe(
    ofType(nextMove.type),
    withLatestFrom(state$),
    map(([, { poker }]) => updateState(lNextMove(poker)))
  );
};

export const foldEpic = (action$, state$) => {
  return action$.pipe(
    ofType(fold.type),
    withLatestFrom(state$),
    map(([, { poker }]) => updateState(lFold(poker)))
  );
};

export const resetGameEpic = (action$, state$) => {
  return action$.pipe(
    ofType(resetGame.type),
    withLatestFrom(state$),
    map(([, { poker }]) => updateState(lResetGame(poker)))
  );
};

export const selectedCardsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(setCardsSelected.type),
    withLatestFrom(state$),
    map(([{ payload }, { poker }]) => updateState(lSetCardsSelected(payload, poker))));
}