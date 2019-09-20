import { initialState }               from 'utils/initialState';
import { updatePlayers, updateRound } from 'models/poker';

export const pokerReducer = (state = initialState, action) => {
    switch (action.type) {
        case updatePlayers.type:
        case updateRound.type:

        return action.payload;

        default:
            return state;
    };
}