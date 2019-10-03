import { combineEpics }                                                             from 'redux-observable';
import { incrementPotEpic, derementPotEpic, nextMoveEpic, foldEpic, resetGameEpic } from 'models/poker';
import 'rxjs';

export const rootEpic = combineEpics(incrementPotEpic, derementPotEpic, nextMoveEpic, foldEpic, resetGameEpic);

export default rootEpic;