import { types } from "../types/types";

export const startLoading = () => ({
    type: types.startLoading,
});

export const finishLoading = () => ({
    type: types.finishLoading,
});

export const startLoadingPDF = () => ({
    type: types.startLoadingPDF,
});

export const finishLoadingPDF = () => ({
    type: types.finishLoadingPDF,
});
