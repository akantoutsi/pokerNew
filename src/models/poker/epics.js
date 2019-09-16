import { ofType }                                      from 'redux-observable';
import { mergeMap, withLatestFrom, tap }               from 'rxjs/operators';
import { incrementPot, decrementPot, updatePlayerPot } from 'models/poker';
import { lIncrementPot, lDecrementPot }                from 'utils/logic';
import 'rxjs';

export const incrementPotEpic = (action$, state$) => {
  return action$.pipe(
    ofType(incrementPot.type),
    withLatestFrom(state$),
    mergeMap(([, { poker }]) => {
      let newState = lIncrementPot(poker);

      return [
        updatePlayerPot({ players: newState })
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
        updatePlayerPot({ players: newState })
      ];
    })
  );
};
  
