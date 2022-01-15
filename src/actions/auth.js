import { types } from "../types/types";
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";



const login = (user) => ({
    type: types.authLogin,
    payload: user,
});

export const startLogin = (user, password) => {
    return async (dispatch) => {

        const resp = await fetchSinToken('user/login',{user,password},'POST');

        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem("token", body.token);
            dispatch(
                login({
                    id: body.id,
                    nombre: body.nombre,
                    rol: body.rol,
                })
            );
        } else {
            Swal.fire("Error", body.msg, "error");
        }
    };
};

const checkingFinish = () => ({
    type: types.checkingFinish,
});

export const startChecking = () => {
    return async (dispatch) => {

        const resp = await fetchConToken('user/renew',{},'GET');

        const body = await resp.json();
        
        if (body.ok) {
            localStorage.setItem("token", body.token);
            dispatch(
                login({
                    id: body.id,
                    nombre: body.nombre,
                    rol: body.rol
                })
            );
        } else {
            dispatch(checkingFinish());
        }
    };
};

const logout = () => ({
    type: types.authLogout,
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
    };
};
