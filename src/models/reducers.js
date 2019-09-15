import { combineReducers } from 'redux';
import { pokerReducer }    from 'models/auth';

export const rootReducer = combineReducers({
    poker: pokerReducer
});

export default rootReducer;