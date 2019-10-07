import { initialState } from 'utils/initialState';

import {
    updateState
} from 'models/poker';

export const pokerReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case updateState.type:
            return payload;

        default:
            return state;
    };
}