const express = require('express');
const { crearPaciente, obtenerPacientes, obtenerHistorialPaciente, nuevoServicioPaciente, nuevaConsultaPaciente, obtenerMedicos, obtenerAgendaDoctor, nuevaCitaAgenda, eliminarCitaAgenda, obtenerAgendaCompleta, obtenerPaciente } = require('../controllers/pacienteController');
const { validarJWT } = require('../middlewares/validarJWT');

const routerPaciente = express.Router();

routerPaciente.use(validarJWT);

routerPaciente.post("/new",crearPaciente);

routerPaciente.get("/getPacientes", obtenerPacientes);

routerPaciente.get("/getPaciente/:id", obtenerPaciente);

routerPaciente.get("/getHistorial/:id", obtenerHistorialPaciente);

routerPaciente.post("/nuevoServicio", nuevoServicioPaciente);

routerPaciente.post("/nuevaConsulta",nuevaConsultaPaciente)

routerPaciente.get("/getMedicos",obtenerMedicos);

routerPaciente.get("/getAgendaDoctor/:idDoctor",obtenerAgendaDoctor);

routerPaciente.get("/getAgendaCompleta",obtenerAgendaCompleta);

routerPaciente.post("/nuevaCita",nuevaCitaAgenda);

routerPaciente.delete("/borrarCita/:fechaCita", eliminarCitaAgenda);

module.exports ={
    routerPaciente
}