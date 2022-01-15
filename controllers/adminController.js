const { User } = require("../models/User");
const { Empleado } = require("../models/Empleado");
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

const obtenerInfoAdmin = async (req, res) => {
    const { fecha } = req.params;
    try {
        const [info] = await db.query(
            `SELECT * FROM 
                ( SELECT COUNT(*) as activos FROM users WHERE estado = 'Activo' ) AS infoActivo, ( SELECT COUNT(*) as inactivos FROM users WHERE estado != 'Activo' ) AS infoInactivo, 
                ( SELECT SUM(s.precio) as ingresos FROM paciente_servicios AS ps JOIN servicios AS s ON (ps.id_servicio = s.id) WHERE ps.fecha = '${fecha}' ) AS infoIngresos, 
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
    const { fecha } = req.params;
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
                    ps.fecha = '${fecha}'
            ) AS ingresosTotales,
            (
                SELECT
                    ps.id AS id,
                    p.nombre AS paciente,
                    s.nombre AS servicio,
                    s.precio AS precio,
                    e.nombre AS doctor
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
                    ps.fecha = '${fecha}'
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

module.exports = {
    obtenerUsuario,
    editarUsuario,
    obtenerInfoAdmin,
    obtenerIngresosAdmin,
};
