import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui"

export const startCrearPaciente = (paciente) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken("paciente/new", paciente, "POST");
            const body = await resp.json();

            if (body.ok) {
                console.log('paciente creado');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startGetMedicos = () => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken("paciente/getMedicos", {}, "GET");
            const body = await resp.json();

            if (body.ok) {
                dispatch(getMedicos(body.medicos));
                dispatch(finishLoading());
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const getMedicos = (medicos) =>({
    type: types.startGetMedicos,
    payload: medicos
})