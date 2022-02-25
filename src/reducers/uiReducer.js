import { types } from "../types/types";

const initial = {
    loading: true,
    loadingPDF: false
};

export const uiReducer = (state = initial, action) => {
    switch (action.type) {
        case types.startLoading:
            return {
                ...state,
                loading: true,
            };

        case types.finishLoading:
            return {
                ...state,
                loading: false,
            };

        case types.startLoadingPDF:
            return {
                ...state,
                loadingPDF: true,
            };

        case types.finishLoadingPDF:
            return {
                ...state,
                loadingPDF: false,
            };
        
        default:
            return state;
    }
};
