import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepararEventos } from "../helpers/prepararEventos";
import { types } from "../types/types";
import { finishLoading, startCloseModal, startLoading } from "./ui"

export const startCrearPaciente = (paciente) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken("paciente/new", paciente, "POST");
            const body = await resp.json();

            if (body.ok) {
                dispatch(crearPaciente(body.paciente));
                const res = {...body};
                return res;
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
});

export const clearActivePaciente = () => ({
    type: types.clearActivePaciente
});

export const startGetAgendaCompleta = () => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken('paciente/getAgendaCompleta', {}, "GET");
            const body = await resp.json();

            if (body.ok) {
                dispatch(getAgenda(prepararEventos(body.agenda)));
                dispatch(finishLoading());
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const getAgenda = (eventos) => ({
    type: types.getAgenda,
    payload: eventos
});

export const startGetAgendaById = (idDoctor) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken(`paciente/getAgendaDoctor/${idDoctor}`, {}, "GET");
            const body = await resp.json();

            if (body.ok) {
                dispatch(getAgenda(prepararEventos(body.agenda)));
                dispatch(finishLoading());
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startAddServicePaciente = (agendaServicio, pacienteServicio) => {
    return async (dispatch) => {
        const promiseDB = [];
        promiseDB.push(fetchConToken('paciente/nuevaCita', agendaServicio, "POST"));
        promiseDB.push(fetchConToken('paciente/nuevoServicio', pacienteServicio, "POST"));
        try {
            const resultado = await Promise.all(promiseDB);
            if (resultado[0].ok && resultado[1].ok) {
                Swal.fire('Exito', 'Nueva cita creada', 'success')
                    .then(result => {
                        dispatch(startCloseModal());
                        dispatch(startGetAgendaCompleta());
                    })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const setActiveEvent = (event) => ({
    type: types.activeEvent,
    payload: event
});

export const clearActiveEvent = () => ({
    type: types.clearActiveEvent
});

export const startUpdateEvent = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`paciente/editarCita/${event.id}`, event, "PUT");
            const body = await resp.json();

            if (body.ok) {
                Swal.fire('Exito', `${body.msg}`, 'success')
                    .then(result => {
                        dispatch(startCloseModal());
                        dispatch(startGetAgendaCompleta());
                    });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const startDeleteEvent = () => {
    return async (dispatch, getState) => {
        const { activeEvent } = getState().recep;
        try {
            const resp = await fetchConToken(`paciente/borrarCita/${activeEvent.id}`, {}, "DELETE");
            const body = await resp.json();

            if (body.ok) {
                dispatch(deleteEvent());
                dispatch(clearActiveEvent());
                Swal.fire('Exito', `${body.msg}`, 'success')
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const deleteEvent = () => ({
    type: types.deleteEvent
});