const express = require("express");
const {
    loginUsuario,
    crearUsuario,
    revalidarToken,
} = require("../controllers/userController");

const { validarJWT } = require("../middlewares/validarJWT");
const router = express.Router();

router.post("/new", crearUsuario);

router.post("/login", loginUsuario);

router.get("/renew", validarJWT, revalidarToken);

module.exports = {
    router,
};
