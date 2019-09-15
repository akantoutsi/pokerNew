import { initialState } from 'utils/initialState';

export const pokerReducer = (state = initialState, action) => {
    switch (action.type) {
        case successRegister.type:
        // case failRegister.type:
        // case successLogin.type:
        // case failLogin.type:
        // case successResetPassword.type:
        // case failResetPassword.type:
        // case changePage.type:
        // case logout.type:

        return action.payload;

        default:
            return state;
    };
}