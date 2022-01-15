import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";

export const startGetUsers = () => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await fetchConToken("paciente/getMedicos", {}, "GET");
        const body = await resp.json();

        if (body.ok) {
            dispatch(getUsers(body.medicos));
            dispatch(finishLoading());
        }
    };
};

const getUsers = (users) => ({
    type: types.getUsers,
    payload: users,
});

export const cleanInfoAdmin = () => ({
    type: types.cleanAdmin,
});

export const startRegister = (user) => {
    return async (dispatch) => {
        const resp = await fetchConToken("user/new", user, "POST");
        const body = await resp.json();

        if (body.ok) {
            dispatch(
                registerUser({
                    id: body.id,
                    nombre: user.name,
                    ap_paterno: user.apellido1,
                    ap_materno: user.apellido2,
                    f_nacimiento: user.fecha_nacimiento,
                    especialidad: user.espec,
                })
            );
        } else {
            Swal.fire("Error", body.msg, "error");
        }
    };
};

const registerUser = (userFinal) => ({
    type: types.registerUser,
    payload: userFinal,
});

export const startSetActiveUser = (id) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(`admin/editUser/${id}`, {}, "GET");
            const body = await resp.json();

            if (body.ok) {
                console.log(body);
                dispatch(setActiveUser(body.usuario));
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const setActiveUser = (usuario) => ({
    type: types.searchUser,
    payload: usuario,
});

export const startUpdateUser = (user) => {
    return async (dispatch) => {
        try {
            const resp = await fetchConToken(
                `admin/editUser/${user.id}`,
                user,
                "PUT"
            );
            const body = await resp.json();

            if (body.ok) {
                Swal.fire("Exito", "Usuario actualizado", "success");
                dispatch(cleanActiveUser());
            } else {
                Swal.fire("Error", body.msg, "error");
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const cleanActiveUser = () => ({
    type: types.cleanActiveUser,
});

export const startGetInfoAdmin = (fecha) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await fetchConToken(`admin/infoAdmin/${fecha}`, {}, "GET");
        const body = await resp.json();

        if (body.ok) {
            dispatch(getInfoAdmin(body.info));
            dispatch(finishLoading());
        }
    };
};

const getInfoAdmin = (info) => ({
    type: types.getInfoAdmin,
    payload: info,
});

export const startGetIngresosAdmin = (fecha) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await fetchConToken(
            `admin/infoIngreso/${fecha}`,
            {},
            "GET"
        );
        const body = await resp.json();

        if (body.ok) {
            dispatch(getIngresosAdmin(body.info));
            dispatch(finishLoading());
        }
    };
};

const getIngresosAdmin = (info) => ({
    type: types.getIngresosAdmin,
    payload: info,
});

export const startGetPacientes = () => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken(
                "paciente/getPacientes",
                {},
                "GET"
            );
            const body = await resp.json();
            if (body.ok) {
                dispatch(getPacientes(body.pacientes));
                dispatch(finishLoading());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const getPacientes = (pacientes) => ({
    type: types.getPacientes,
    payload: pacientes,
});
