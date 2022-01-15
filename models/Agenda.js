const Sequelize = require("sequelize");
const { db } = require("../config/db");

const Agenda = db.define(
    "agenda_doctor",
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
        },
        fecha: {
            type: Sequelize.DataTypes.TIME,
        },
        motivo: {
            type: Sequelize.DataTypes.STRING,
        },
        id_empleado: {
            type: Sequelize.DataTypes.INTEGER,
        },
    },
    { freezeTableName: true }
);

module.exports = {
    Agenda,
};
