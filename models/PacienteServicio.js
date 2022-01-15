const Sequelize = require("sequelize");
const { db } = require("../config/db");

const PacienteServicio = db.define("paciente_servicio", {
    id_paciente: {
        type: Sequelize.DataTypes.INTEGER,
    },
    id_servicio: {
        type: Sequelize.DataTypes.INTEGER,
    },
    id_empleado: {
        type: Sequelize.DataTypes.INTEGER,
    },
    fecha:{
        type: Sequelize.DataTypes.DATE
    }
});

module.exports = {
    PacienteServicio
}
