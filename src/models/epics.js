import { combineEpics }                      from 'redux-observable';
import { incrementPotEpic, derementPotEpic } from 'models/poker';
import 'rxjs';

export const rootEpic = combineEpics(incrementPotEpic, derementPotEpic);

export default rootEpic;