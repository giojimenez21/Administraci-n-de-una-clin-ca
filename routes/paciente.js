const express = require('express');
const { crearPaciente, obtenerPacientes, obtenerHistorialPaciente, nuevoServicioPaciente, nuevaConsultaPaciente, obtenerMedicos, obtenerAgendaDoctor, nuevaCitaAgenda, eliminarCitaAgenda, obtenerAgendaCompleta, obtenerPaciente, editarCitaAgenda, finalizarCita } = require('../controllers/pacienteController');
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

routerPaciente.delete("/borrarCita/:id", eliminarCitaAgenda);

routerPaciente.put("/editarCita/:id", editarCitaAgenda);

routerPaciente.post("/finalizarCita/:id", finalizarCita);

module.exports ={
    routerPaciente
}