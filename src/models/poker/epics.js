import { ofType }                                              from 'redux-observable';
import { mergeMap, withLatestFrom }                            from 'rxjs/operators';
import { incrementPot, decrementPot, updatePlayers, nextMove } from 'models/poker';
import { lIncrementPot, lDecrementPot, lNextMove }             from 'utils/logic';
import 'rxjs';

export const incrementPotEpic = (action$, state$) => {
  return action$.pipe(
    ofType(incrementPot.type),
    withLatestFrom(state$),
    mergeMap(([, { poker }]) => {
      let newState = lIncrementPot(poker);

      return [
        updatePlayers(newState)
      ];
    })
  );
};
  
export const derementPotEpic = (action$, state$) => {
  return action$.pipe(
    ofType(decrementPot.type),
    withLatestFrom(state$),
    mergeMap(([, { poker }]) => {
      let newState = lDecrementPot(poker);

      return [
        updatePlayers(newState)
      ];
    })
  );
};

export const nextMoveEpic = (action$, state$) => {
  return action$.pipe(
    ofType(nextMove.type),
    withLatestFrom(state$),
    mergeMap(([, { poker }]) => {
      let newState = lNextMove(poker);

      return [
        updatePlayers(newState)
      ];
    })
  );
};
