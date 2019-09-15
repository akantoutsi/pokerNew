import { combineReducers } from 'redux';
import { pokerReducer }    from 'models/poker';

export const rootReducer = combineReducers({
    poker: pokerReducer
});

export default rootReducer;