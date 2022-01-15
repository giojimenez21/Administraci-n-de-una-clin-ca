const express = require('express');
const { crearPaciente, obtenerPacientes, obtenerHistorialPaciente, nuevoServicioPaciente, nuevaConsultaPaciente, obtenerMedicos, obtenerAgendaDoctor, nuevaCitaAgenda, eliminarCitaAgenda } = require('../controllers/pacienteController');
const { validarJWT } = require('../middlewares/validarJWT');

const routerPaciente = express.Router();

routerPaciente.use(validarJWT);

routerPaciente.post("/new",crearPaciente);

routerPaciente.get("/getPacientes", obtenerPacientes);

routerPaciente.get("/getHistorial/:id", obtenerHistorialPaciente);

routerPaciente.post("/nuevoServicio", nuevoServicioPaciente);

routerPaciente.post("/nuevaConsulta",nuevaConsultaPaciente)

routerPaciente.get("/getMedicos",obtenerMedicos);

routerPaciente.get("/getAgendaDoctor/:idDoctor",obtenerAgendaDoctor);

routerPaciente.post("/nuevaCita",nuevaCitaAgenda);

routerPaciente.delete("/borrarCita/:fechaCita", eliminarCitaAgenda);

module.exports ={
    routerPaciente
}