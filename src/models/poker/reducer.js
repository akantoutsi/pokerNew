import { initialState }                                    from 'utils/initialState';
import { updateState, setCardsSelected, getSelectedCards } from 'models/poker';

export const pokerReducer = (state = initialState, action) => {
    switch (action.type) {
        case setCardsSelected.type:
            let cards = getSelectedCards(action.payload.winnerCards, action.payload.playerId);

            return {
                ...state,
                selectedCards: cards
            }

        case updateState.type:
        return action.payload;

        default:
            return state;
    };
}