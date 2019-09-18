import { ofType }                                             from 'redux-observable';
import { mergeMap, withLatestFrom }                           from 'rxjs/operators';
import { incrementPot, decrementPot, updatePlayers, nextMove, 
         updateTablePot, getTablePot }                        from 'models/poker';
import { lIncrementPot, lDecrementPot, lNextMove }            from 'utils/logic';
import 'rxjs';

export const incrementPotEpic = (action$, state$) => {
  return action$.pipe(
    ofType(incrementPot.type),
    withLatestFrom(state$),
    mergeMap(([, { poker }]) => {
      let newState = lIncrementPot(poker);

      return [
        updatePlayers({ players: newState })
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
        updatePlayers({ players: newState })
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
        updatePlayers({ players: newState }),
        updateTablePot({ players: newState, tablePot: getTablePot(newState) })
      ];
    })
  );
};
