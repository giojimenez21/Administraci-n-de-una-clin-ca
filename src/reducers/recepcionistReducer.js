import { types } from '../types/types';

const initial = {
    medicos: [],
    activePaciente: {},
    eventos: [],
    activeEvent: {}
}

export const recepcionistReducer = (state = initial, action) => {
    switch (action.type) {
        case types.startGetMedicos:
            return {
                ...state,
                medicos: action.payload
            }

        case types.createPaciente:
            return {
                ...state,
                activePaciente: action.payload
            }

        case types.getInfoPaciente:
            return {
                ...state,
                activePaciente: action.payload
            }

        case types.getAgenda:
            return {
                ...state,
                eventos: action.payload
            }

        case types.activeEvent:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.clearActiveEvent:
            return {
                ...state,
                activeEvent: {}
            }

        case types.deleteEvent:
            return {
                ...state,
                eventos: state.eventos.filter(e => e.id !== state.activeEvent.id)
            }
        default:
            return state;
    }
}