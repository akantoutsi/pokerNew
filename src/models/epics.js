import { combineEpics }                                                                                     from 'redux-observable';
import { incrementPotEpic, derementPotEpic, nextMoveEpic, foldEpic, resetGameEpic, setCardsAsSelectedEpic } from 'models/poker';
import 'rxjs';

export const rootEpic = combineEpics(incrementPotEpic, derementPotEpic, nextMoveEpic, foldEpic, resetGameEpic, setCardsAsSelectedEpic);

export default rootEpic;