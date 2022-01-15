import { types } from "../types/types";

const initial = {
    checking: true,
};

export const authReducer = (state = initial, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload,
            };

        case types.checkingFinish:
            return {
                checking: false,
            };

        case types.authLogout:
            return {
                checking: false,
            };
        default:
            return state;
    }
};
