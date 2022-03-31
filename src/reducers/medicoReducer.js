import { types } from "../types/types"

const initial = {
    consultasPaciente: []
}


export const medicoReducer = (state = initial, action) => {
    switch (action.type) {

        case types.getConsultas:
            return{
                ...state,
                consultasPaciente: action.payload
            }


        default:
            return state

    }
}