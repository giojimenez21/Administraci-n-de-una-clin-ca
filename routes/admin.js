const express = require("express");
const {
    editarUsuario,
    obtenerUsuario,
    obtenerInfoAdmin,
    obtenerIngresosAdmin,
} = require("../controllers/adminController");

const { validarJWT } = require("../middlewares/validarJWT");
const routerAdmin = express.Router();

routerAdmin.use(validarJWT);

routerAdmin.get("/editUser/:id", obtenerUsuario);

routerAdmin.put("/editUser/:id", editarUsuario);

routerAdmin.get("/infoAdmin/:fecha", obtenerInfoAdmin);

routerAdmin.get("/infoIngreso/:fecha", obtenerIngresosAdmin);

module.exports = {
    routerAdmin,
};
