import { types } from "../types/types"

const initial = {
    pacienteConsulta : {}
}


export const medicoReducer = (state = initial, action) => {
    switch (action.type) {

        case types.pacienteConsulta:
            return{
                ...state,
                pacienteConsulta: action.payload
            }


        default:
            return state

    }
}