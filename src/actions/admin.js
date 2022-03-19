import download from "downloadjs";
import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { finishLoading, finishLoadingPDF, startLoading, startLoadingPDF } from "./ui";

export const startGetUsers = () => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await fetchConToken("admin/getUsers", {}, "GET");
        const body = await resp.json();

        if (body.ok) {
            dispatch(getUsers(body.usuarios));
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

export const startGetInfoAdmin = (fechaInicial, fechaFinal) => {
    return async (dispatch) => {
        dispatch(startLoading());
        const resp = await fetchConToken(`admin/infoAdmin/${fechaInicial}/${fechaFinal}`, {}, "GET");
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

export const startGetIngresosAdmin = (fechaInicial, fechaFinal) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken(
                `admin/infoIngreso/${fechaInicial}/${fechaFinal}`,
                {},
                "GET"
            );
            const body = await resp.json();
            if (body.ok) {
                dispatch(getIngresosAdmin(body.info));
                dispatch(finishLoading());
            }
        } catch (error) {
            console.log(error);
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

export const startGetHistorial = (id) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken(
                `paciente/getHistorial/${id}`,
                {},
                "GET"
            );

            const body = await resp.json();
            if (body.ok) {
                dispatch(getHistorial(body.info));
                dispatch(finishLoading());
            }
        } catch (error) {
            console.log(error);
        }
    }
};

const getHistorial = (historial) => ({
    type: types.getHistorialPaciente,
    payload: historial
});

export const startGetServicios = () => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken(
                'admin/getServicios',
                {},
                "GET"
            );

            const body = await resp.json();
            if (body.ok) {
                dispatch(getServicios(body.servicios));
                dispatch(finishLoading());
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const getServicios = (servicios) => ({
    type: types.getServicios,
    payload: servicios
})

export const startAddService = (servicio) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken(
                'admin/addServicios',
                servicio,
                "POST"
            );

            const body = await resp.json();
            if (body.ok) {
                dispatch(addService(servicio));
                dispatch(finishLoading());
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const addService = (servicio) => ({
    type: types.addService,
    payload: servicio
})

export const startLockUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken(
                `admin/blockUser/${id}`,
                {},
                "PUT"
            );

            const body = await resp.json();
            if (body.ok) {
                dispatch(lockUser(id));
                dispatch(finishLoading());
                Swal.fire('Bloqueado', 'El usuario fue bloqueado con exito', 'info');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const lockUser = (id) => ({
    type: types.lockUser,
    payload: id
})

export const startUnlockUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const resp = await fetchConToken(
                `admin/activateUser/${id}`,
                {},
                "PUT"
            );

            const body = await resp.json();
            if (body.ok) {
                dispatch(unlockUser(id));
                dispatch(finishLoading());
                Swal.fire('Activado', 'El usuario fue activado con exito', 'info');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const unlockUser = (id) => ({
    type: types.unlockUser,
    payload: id
})

export const generatePDFIngresos = (fechaInicial, fechaFinal) => {
    return async (dispatch) => {
        try {
            dispatch(startLoadingPDF());
            const resp = await fetchConToken(
                `pdf/facturaIngresos/${fechaInicial}/${fechaFinal}`,
                {},
                "GET"
            );
            const pdf = await resp.blob();
            console.log(pdf.type);
            dispatch(finishLoadingPDF());
            download(new Blob([pdf]),`ingresos-${fechaInicial}-${fechaFinal}.pdf`, pdf.type);
        } catch (error) {
            console.log(error);
        }
    }
}


export const generatePDFHistorial = (id) => {
    return async (dispatch) => {
        try {
            dispatch(startLoadingPDF());
            const resp = await fetchConToken(
                `pdf/historialPacientePDF/${id}`,
                {},
                "GET"
            );
            const pdf = await resp.blob();
            dispatch(finishLoadingPDF());
            download(new Blob([pdf]), 'Historial.pdf', 'text/pdf');
        } catch (error) {
            console.log(error);
        }
    }
}

