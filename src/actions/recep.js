import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui"

export const startCrearPaciente = (paciente) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken("paciente/new", paciente, "POST");
            const body = await resp.json();

            if (body.ok) {
                dispatch(crearPaciente(body.paciente));
                console.log(body.paciente);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const crearPaciente = (paciente) => ({
    type: types.createPaciente,
    payload: paciente
});

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

const getMedicos = (medicos) => ({
    type: types.startGetMedicos,
    payload: medicos
});

export const startGetInfoPaciente = (id) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken(`paciente/getPaciente/${id}`, {}, "GET");
            const body = await resp.json();

            if (body.ok) {
                dispatch(getInfoPaciente(body.paciente));
                dispatch(finishLoading());
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const getInfoPaciente = (paciente) => ({
    type: types.getInfoPaciente,
    payload: paciente
})

export const startGetAgendaCompleta = () => {
    return async(dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken('paciente/getAgendaCompleta', {}, "GET");
            const body = await resp.json();

            if (body.ok) {
                dispatch(getAgenda(body.agenda));
                dispatch(finishLoading());
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const getAgenda = (eventos) =>({
    type: types.getAgenda,
    payload: eventos
});

export const startGetAgendaById = (idDoctor) => {
    return async(dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken(`paciente/getAgendaDoctor/${idDoctor}`, {}, "GET");
            const body = await resp.json();

            if (body.ok) {
                dispatch(getAgenda(body.agenda));
                dispatch(finishLoading());
            }
        } catch (error) {
            console.log(error);
        }
    }
}
