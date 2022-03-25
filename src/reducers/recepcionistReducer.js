import {types} from '../types/types';

const initial = {
    medicos: [],
    activePaciente:{},
    eventos:[]
}

export const recepcionistReducer = (state = initial, action) => {
    switch (action.type) {
        case types.startGetMedicos:
            return{
                ...state,
                medicos: action.payload
            }

        case types.createPaciente:
            return{
                ...state,
                activePaciente: action.payload
            }

        case types.getInfoPaciente:
            return{
                ...state,
                activePaciente: action.payload
            }

        case types.getAgenda:
            return{
                ...state,
                eventos: action.payload
            }
        default:
            return state;
    }
}