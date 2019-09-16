import { combineEpics }                                    from 'redux-observable';
import { incrementPotEpic, derementPotEpic, nextMoveEpic } from 'models/poker';
import 'rxjs';

export const rootEpic = combineEpics(incrementPotEpic, derementPotEpic, nextMoveEpic);

export default rootEpic;