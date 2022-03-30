import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

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