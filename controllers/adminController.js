const { User } = require("../models/User");
const { Empleado } = require("../models/Empleado");
const { Servicio } = require("../models/Servicio");
const bcrypt = require("bcryptjs");
const { db } = require("../config/db");

const obtenerUsuario = async (req, res) => {
    try {
        const [infoUser] = await db.query(
            `
            select e.id,u.user,e.nombre,e.ap_paterno,e.ap_materno,e.f_nacimiento,e.especialidad from empleados as e 
            join users as u on(u.id_empleado = e.id) 
            where u.id_empleado = ${req.params.id};
        `,
            {
                type: db.QueryTypes.SELECT,
            }
        );

        return res.json({
            ok: true,
            usuario: infoUser,
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const infoUser = await db.query(
            `
            select e.id,u.user,e.nombre,e.ap_paterno,e.ap_materno,e.f_nacimiento,e.especialidad,u.estado from empleados as e 
            join users as u on(u.id_empleado = e.id)
            `,
            {
                type: db.QueryTypes.SELECT,
            }
        );
        return res.json({
            ok: true,
            usuarios: infoUser,
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
};

const editarUsuario = async (req, res) => {
    const { user, password } = req.body;

    try {
        const usuarioExiste = await User.findOne({ where: { user } });

        if (usuarioExiste) {
            return res.json({
                ok: false,
                msg: "Ya existe un usuario con ese nomobre de usuario, escoja otro.",
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        await Empleado.update(req.body, {
            where: { id: req.params.id },
        });

        await User.update(
            {
                user,
                password: hashPassword,
            },
            {
                where: { id_empleado: req.params.id },
            }
        );

        return res.json({
            ok: true,
            msg: "Usuario actualizado.",
        });
    } catch (error) {
        return res.json({
            ok: false,
            msg: error,
        });
    }
};

const bloquearUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        await User.update({ estado: "Inactivo" }, { where: { id_empleado: id } });
        return res.json({
            ok: true,
            msg: "Usuario Inhabilitado"
        })
    } catch (error) {
        return res.json({
            ok: false,
            msg: error
        })
    }
}

const activarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        await User.update({ estado: "Activo" }, { where: { id_empleado: id } });
        return res.json({
            ok: true,
            msg: "Usuario Activado"
        })
    } catch (error) {
        return res.json({
            ok: false,
            msg: error
        })
    }
}

const obtenerInfoAdmin = async (req, res) => {
    const { fechaInicial, fechaFinal } = req.params;
    try {
        const [info] = await db.query(
            `SELECT * FROM 
                ( SELECT COUNT(*) as activos FROM users WHERE estado = 'Activo' ) AS infoActivo, ( SELECT COUNT(*) as inactivos FROM users WHERE estado != 'Activo' ) AS infoInactivo, 
                ( SELECT SUM(s.precio) as ingresos FROM paciente_servicios AS ps JOIN servicios AS s ON (ps.id_servicio = s.id) WHERE ps.fecha BETWEEN '${fechaInicial}' AND '${fechaFinal}' ) AS infoIngresos, 
                ( SELECT COUNT(*) as numeroPacientes FROM pacientes ) AS infoPacientes;
            `,
            {
                type: db.QueryTypes.SELECT,
            }
        );

        res.json({
            ok: true,
            info,
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: error,
        });
    }
};

const obtenerIngresosAdmin = async (req, res) => {
    const { fechaInicial, fechaFinal } = req.params;
    try {
        const info = await db.query(
            `
            SELECT
                *
            FROM
                (
                SELECT
                    SUM(s.precio) AS ingresosTotales
                FROM
                    paciente_servicios AS ps
                JOIN servicios AS s
                ON
                    (ps.id_servicio = s.id)
                WHERE
                    ps.fecha BETWEEN '${fechaInicial}' AND '${fechaFinal}'
            ) AS ingresosTotales,
            (
                SELECT
                    ps.id AS id,
                    p.nombre AS paciente,
                    s.nombre AS servicio,
                    s.precio AS precio,
                    e.nombre AS doctor,
                    ps.fecha AS fecha
                FROM
                    paciente_servicios AS ps
                JOIN pacientes AS p
                ON
                    (ps.id_paciente = p.id)
                JOIN servicios AS s
                ON
                    (ps.id_servicio = s.id)
                JOIN empleados AS e
                ON
                    (ps.id_empleado = e.id)
                WHERE
                    ps.fecha BETWEEN '${fechaInicial}' AND '${fechaFinal}'
            ) AS info;
            `,
            {
                type: db.QueryTypes.SELECT,
            }
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

const getServicios = async (req, res) => {
    try {

        const servicios = await Servicio.findAll();
        return res.json({
            ok: true,
            servicios
        })

    } catch (error) {
        return res.json(error);
    }
}

const addServicios = async (req, res) => {
    const { nombre, precio } = req.body;
    try {
        await Servicio.create({ nombre, precio });
        return res.json({
            ok: true,
            msg: 'Servicio creado'
        })

    } catch (error) {
        return res.json(error);
    }
}


module.exports = {
    obtenerUsuario,
    obtenerUsuarios,
    editarUsuario,
    obtenerInfoAdmin,
    obtenerIngresosAdmin,
    getServicios,
    addServicios,
    bloquearUsuario,
    activarUsuario,
};
