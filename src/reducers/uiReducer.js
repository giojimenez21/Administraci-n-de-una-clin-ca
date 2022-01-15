import { types } from "../types/types";

const initial = {
    loading: true,
};

export const uiReducer = (state = initial, action) => {
    switch (action.type) {
        case types.startLoading:
            return {
                loading: true,
            };

        case types.finishLoading:
            return {
                loading: false,
            };

        default:
            return state;
    }
};
