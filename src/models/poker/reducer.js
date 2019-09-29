import { initialState } from 'utils/initialState';
import { updateState }  from 'models/poker';

export const pokerReducer = (state = initialState, action) => {
    switch (action.type) {
        case updateState.type:

        return action.payload;

        default:
            return state;
    };
}