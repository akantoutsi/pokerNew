import { initialState }                  from 'utils/initialState';
import { updatePlayers, updateTablePot } from 'models/poker';

export const pokerReducer = (state = initialState, action) => {
    switch (action.type) {
        case updatePlayers.type:
        case updateTablePot.type:

        return action.payload;

        default:
            return state;
    };
}