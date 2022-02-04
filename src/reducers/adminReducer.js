import { types } from "../types/types";

const initial = {
    users: [],
    activeUser: null,
    ingresosAdmin: [],
    pacientes: [],
    historialPaciente: [],
    servicios:[]
};

export const adminReducer = (state = initial, action) => {
    switch (action.type) {
        case types.getUsers:
            return {
                ...state,
                users: [...action.payload],
            };

        case types.cleanAdmin:
            return {
                ...initial
            };

        case types.registerUser:
            return {
                ...state,
                users: [...state.users, action.payload],
            };

        case types.searchUser:
            const aux = state.users.filter((u) => u.id === action.payload);
            return {
                ...state,
                activeUser: aux[0],
            };

        case types.cleanActiveUser:
            return {
                ...state,
                activeUser: null,
            };

        case types.getInfoAdmin:
            return {
                ...state,
                infoAdmin: action.payload,
            };

        case types.getIngresosAdmin:
            return {
                ...state,
                ingresosAdmin: action.payload,
            };

        case types.getPacientes:
            return {
                ...state,
                pacientes: action.payload,
            };

        case types.getHistorialPaciente:
            return {
                ...state,
                historialPaciente: action.payload,
            }

        case types.getServicios:
            return {
                ...state,
                servicios: action.payload
            }

        case types.addService:
            return{
                ...state,
                servicios: [action.payload, ...state.servicios]
            }

        case types.lockUser:
            return{
                ...state,
                users: state.users.map(user =>{
                    if(user.id == action.payload){
                        user.estado = "Inactivo"
                    }
                    return user;
                })
            }
        case types.unlockUser:
            return{
                ...state,
                users: state.users.map(user =>{
                    if(user.id == action.payload){
                        user.estado = "Activo"
                    }
                    return user;
                })
            }
        default:
            return state;
    }
};
