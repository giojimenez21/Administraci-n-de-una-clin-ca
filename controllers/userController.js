const { User } = require("../models/User");
const { Empleado } = require("../models/Empleado");
const bcrypt = require("bcryptjs");
const { db } = require("../config/db");
const { generarJWT } = require("../helpers/generarJWT");

const crearUsuario = async (req, res) => {
    const {
        name,
        apellido1,
        apellido2,
        fecha_nacimiento,
        espec,
        usuario,
        contraseña,
    } = req.body;

    try {
        const usuarioexiste = await User.findOne({ where: { user: usuario } });

        if (usuarioexiste) {
            return res.json({
                ok: false,
                msg: "Ya existe un usuario con ese nombre de usuario",
            });
        }

        const usuarioNew = await Empleado.create({
            nombre: name,
            ap_paterno: apellido1,
            ap_materno: apellido2,
            f_nacimiento: fecha_nacimiento,
            especialidad: espec,
        });

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(contraseña, salt);

        await User.create({
            user: usuario,
            password: hashPassword,
            id_empleado: usuarioNew.dataValues.id,
        });

        const { id, nombre, ap_paterno, especialidad } = usuarioNew.dataValues;

        const token = await generarJWT(
            id,
            nombre + " " + ap_paterno,
            especialidad
        );

        return res.json({
            ok: true,
            id,
            nombre: nombre + " " + ap_paterno,
            rol: especialidad,
            token,
        });
    } catch (error) {
        res.json({
            error,
        });
    }
};

const loginUsuario = async (req, res) => {
    const { user, password } = req.body;
    try {
        let usuario = await User.findOne({ where: { user } });

        if (!usuario) {
            return res.json({
                ok: false,
                msg: "No existe ningun usuario con ese nombre",
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.json({
                ok: false,
                msg: "Contraseña incorrecta",
            });
        }

        const [infoUser] = await db.query(
            `
            select e.id as id, concat_ws(' ',e.nombre,e.ap_paterno) as nombre,
            e.especialidad as rol
            from empleados as e 
            join users as u on(e.id = u.id_empleado)
            where u.id = ${usuario.id};
        `,
            { type: db.QueryTypes.SELECT }
        );

        const token = await generarJWT(
            infoUser.id,
            infoUser.nombre,
            infoUser.rol
        );

        res.json({
            ok: true,
            id: infoUser.id,
            nombre: infoUser.nombre,
            rol: infoUser.rol,
            token,
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: error,
        });
    }
};

const revalidarToken = async (req, res) => {
    const { id, nombre, rol } = req;
    const token = await generarJWT(id, nombre, rol);

    res.json({
        ok: true,
        id,
        nombre,
        rol,
        token,
    });
};

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken,
};
