const Sequelize = require("sequelize");
const { db } = require("../config/db");
const Empleado = db.define("empleado", {
    nombre: {
        type: Sequelize.DataTypes.STRING,
    },
    ap_paterno: {
        type: Sequelize.DataTypes.STRING,
    },
    ap_materno: {
        type: Sequelize.DataTypes.STRING,
    },
    f_nacimiento: {
        type: Sequelize.DataTypes.DATE,
    },
    especialidad: {
        type: Sequelize.DataTypes.STRING,
    },
});

module.exports = {
    Empleado
}