import {types} from '../types/types';

const initial = {
    medicos: []
}

export const recepcionistReducer = (state = initial, action) => {
    switch (action.type) {
        case types.startGetMedicos:
            return{
                ...state,
                medicos: action.payload
            }

        default:
            return state;
    }
}