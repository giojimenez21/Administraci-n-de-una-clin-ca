const Sequelize = require("sequelize");
const { db } = require("../config/db");

const Agenda = db.define(
    "agenda_doctor",
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
        },
        fechaInicio: {
            type: Sequelize.DataTypes.TIME,
        },
        fechaFinal: {
            type: Sequelize.DataTypes.TIME,
        },
        id_servicio: {
            type: Sequelize.DataTypes.INTEGER
        },
        id_empleado: {
            type: Sequelize.DataTypes.INTEGER,
        },
        id_paciente: {
            type: Sequelize.DataTypes.INTEGER,
        },
        finalizado:{
            type: Sequelize.DataTypes.BOOLEAN
        }
    },
    { freezeTableName: true }
);

module.exports = {
    Agenda,
};
