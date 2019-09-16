import { initialState }    from 'utils/initialState';
import { updatePlayerPot } from 'models/poker';

export const pokerReducer = (state = initialState, action) => {
    switch (action.type) {
        case updatePlayerPot.type:

        return action.payload;

        default:
            return state;
    };
}