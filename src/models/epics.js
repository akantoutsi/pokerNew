import { combineEpics } from 'redux-observable';

import { 
    incrementPotEpic, 
    derementPotEpic, 
    nextMoveEpic, 
    foldEpic, 
    resetGameEpic,
    selectedCardsEpic 
} from 'models/poker';

export const rootEpic = combineEpics(
    incrementPotEpic, 
    derementPotEpic, 
    nextMoveEpic, 
    foldEpic, 
    resetGameEpic,
    selectedCardsEpic
);

export default rootEpic;