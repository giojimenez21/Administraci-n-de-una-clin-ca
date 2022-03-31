import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

export const startFinalizarCita = (id) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`paciente/finalizarCita/${id}`, {}, "POST");
            const body = await resp.json();

            if (body.ok) {
                dispatch(finalizarCita(id));
                Swal.fire('Exito', 'Cita finalizada', 'success');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const finalizarCita = (id) => ({
    type: types.finalizarCita,
    payload: id
});

export const finalizarConsulta = (consulta) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`paciente/nuevaConsulta`, consulta, "POST");
            const body = await resp.json();

            if (body.ok) {
                Swal.fire('Exito', 'Consulta finalizada', 'success');
                return body.ok;
            }

        } catch (error) {
            console.log(error);
        }
    }
}

export const startGetConsultasPaciente = (id_paciente) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`paciente/getConsultas/${id_paciente}`, {}, "GET");
            const body = await resp.json();
            dispatch(startLoading());
            if (body.ok) {
                dispatch(getConsultasPaciente(body.consultas));
                dispatch(finishLoading());
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const getConsultasPaciente = (consultas) =>({
    type: types.getConsultas,
    payload: consultas
});