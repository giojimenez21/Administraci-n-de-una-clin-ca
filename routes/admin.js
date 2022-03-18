const express = require("express");
const {
    editarUsuario,
    obtenerUsuario,
    obtenerInfoAdmin,
    obtenerIngresosAdmin,
    getServicios,
    addServicios,
    bloquearUsuario,
    activarUsuario,
    obtenerUsuarios,
} = require("../controllers/adminController");

const { validarJWT } = require("../middlewares/validarJWT");
const routerAdmin = express.Router();

routerAdmin.use(validarJWT);

routerAdmin.get("/editUser/:id", obtenerUsuario);

routerAdmin.get("/getUsers", obtenerUsuarios);

routerAdmin.put("/editUser/:id", editarUsuario);

routerAdmin.put("/blockUser/:id", bloquearUsuario);

routerAdmin.put("/activateUser/:id", activarUsuario);

routerAdmin.get("/infoAdmin/:fechaInicial/:fechaFinal", obtenerInfoAdmin);

routerAdmin.get("/infoIngreso/:fechaInicial/:fechaFinal", obtenerIngresosAdmin);

routerAdmin.get("/getServicios", getServicios)

routerAdmin.post("/addServicios", addServicios)


module.exports = {
    routerAdmin,
};
