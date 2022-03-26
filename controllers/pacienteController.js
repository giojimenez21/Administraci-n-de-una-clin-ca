const { db } = require("../config/db");
const { Agenda } = require("../models/Agenda");
const { Consultas } = require("../models/Consultas");
const { Paciente } = require("../models/Paciente");
const { PacienteServicio } = require("../models/PacienteServicio");

const crearPaciente = async (req, res) => {
    const { name, apellido1, apellido2, sexo, fecha_nacimiento } = req.body;

    try {
        const paciente = await Paciente.create({
            nombre: name,
            ap_paterno: apellido1,
            ap_materno: apellido2,
            sexo,
            f_nacimiento: fecha_nacimiento,
        });

        return res.json({
            ok: true,
            paciente
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
};

const obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        return res.json({
            ok: true,
            pacientes,
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
};

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findOne({ where: { id } })
        return res.json({
            ok: true,
            paciente,
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
};

const obtenerHistorialPaciente = async (req, res) => {
    const { id } = req.params;

    try {
        const info = await db.query(
            `
            select concat_ws(' ',p.nombre,p.ap_paterno,p.ap_materno) as nombre, s.nombre as servicio,s.precio as precio, concat('Dr(a) ',e.nombre,e.ap_paterno) as doctor,fecha as fecha from paciente_servicios as ps join pacientes as p on(p.id = ps.id_paciente) join servicios as s on(s.id = ps.id_servicio) join empleados as e on(e.id = ps.id_empleado)
            where ps.id_paciente = ${id}
            order by 5 desc;
        `,
            { type: db.QueryTypes.SELECT }
        );

        return res.json({
            ok: true,
            info,
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
};

const nuevoServicioPaciente = async (req, res) => {
    const { paciente, servicio, medico, fecha } = req.body;

    try {
        const servicioCreado = await PacienteServicio.create({
            id_paciente: paciente,
            id_servicio: servicio,
            id_empleado: medico,
            fecha
        });

        const [info] = await db.query(
            `
            select ps.id as id,concat_ws(' ',p.nombre,p.ap_paterno,p.ap_materno) as nombre, s.nombre as servicio,s.precio as precio, concat('Dr(a)',e.nombre,e.ap_paterno) as doctor from paciente_servicios as ps join pacientes as p on(p.id = ps.id_paciente) join servicios as s on(s.id = ps.id_servicio) join empleados as e on(e.id = ps.id_empleado)
            where ps.id = ${servicioCreado.dataValues.id};
        `,
            { type: db.QueryTypes.SELECT }
        );

        return res.json({
            ok: true,
            info,
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
};

const nuevaConsultaPaciente = async (req, res) => {
    const { sintomas, receta, f_consulta, id_paciente, id_empleado } = req.body;

    try {
        await Consultas.create({
            sintomas,
            receta,
            f_consulta,
            id_paciente,
            id_empleado,
        });

        return res.json({
            ok: true,
            msg: "Listo",
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
};

const obtenerMedicos = async (req, res) => {
    try {
        const infoUser = await db.query(
            `
            select e.id,u.user,e.nombre,e.ap_paterno,e.ap_materno,e.f_nacimiento,e.especialidad,u.estado from empleados as e 
            join users as u on(u.id_empleado = e.id)
            where e.especialidad = 'Doctor';
            `,
            {
                type: db.QueryTypes.SELECT,
            }
        );
        return res.json({
            ok: true,
            medicos: infoUser,
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
};

const obtenerAgendaDoctor = async (req, res) => {
    const { idDoctor } = req.params;

    try {
        const agenda = await db.query(
            `SELECT a.id, a.fechaInicio, a.fechaFinal, a.id_servicio,s.nombre as motivo, a.id_empleado 
            FROM agenda_doctor as a 
            JOIN servicios as s on(a.id_servicio = s.id)
            WHERE id_empleado = '${idDoctor}';`,
            {
                type: db.QueryTypes.SELECT
            }
        )

        return res.json({
            ok: true,
            agenda,
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
};

const obtenerAgendaCompleta = async (req, res) => {
    try {
        const agenda = await db.query(
            `
                SELECT a.id, a.fechaInicio, a.fechaFinal, a.id_servicio,s.nombre as motivo, a.id_empleado, e.nombre 
                FROM agenda_doctor as a 
                JOIN servicios as s on(a.id_servicio = s.id)
                JOIN empleados as e on(e.id = a.id_empleado);
            `,
            {
                type: db.QueryTypes.SELECT
            }
        );

        return res.json({
            ok: true,
            agenda,
        });

    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
}

const nuevaCitaAgenda = async (req, res) => {
    const { fechaInicio, fechaFinal, medico, servicio } = req.body;

    try {
        await Agenda.create({
            fechaInicio,
            fechaFinal,
            id_servicio: servicio,
            id_empleado: medico,
        });

        return res.json({
            ok: true,
            msg: "Cita creada.",
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
};

const eliminarCitaAgenda = async (req, res) => {
    const { id } = req.params;
    try {
        await Agenda.destroy({
            where: { id },
        });

        return res.json({
            ok: true,
            msg: 'Cita eliminada.'
        });

    } catch (error) {
        return res.json({
            ok: false,
            msg: error
        })
    }
};

const editarCitaAgenda = async (req, res) => {
    const { id } = req.params;
    const { fechaInicio, fechaFinal, medico, servicio } = req.body;

    try {
        await Agenda.update({
            fechaInicio,
            fechaFinal,
            id_servicio: servicio,
            id_empleado: medico,
        },
            {
                where: { id }
            });

        return res.json({
            ok: true,
            msg: "Cita actualizada",
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
}

module.exports = {
    crearPaciente,
    obtenerPacientes,
    obtenerHistorialPaciente,
    nuevoServicioPaciente,
    nuevaConsultaPaciente,
    obtenerMedicos,
    obtenerAgendaDoctor,
    obtenerAgendaCompleta,
    nuevaCitaAgenda,
    eliminarCitaAgenda,
    editarCitaAgenda,
    obtenerPaciente
};
