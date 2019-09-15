import { combineEpics } from 'redux-observable';
import {  }             from 'models/poker';
import 'rxjs';

export const rootEpic = combineEpics();

export default rootEpic;