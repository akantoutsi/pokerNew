import { initialState } from 'utils/initialState';
import { startGame }    from 'models/poker';

export const pokerReducer = (state = initialState, action) => {
    switch (action.type) {
        case startGame.type:

        return action.payload;

        default:
            return state;
    };
}