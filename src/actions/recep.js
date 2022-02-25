import { fetchConToken } from "../helpers/fetch";
import { startLoading } from "./ui"

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