const Sequelize = require("sequelize");
const { db } = require("../config/db");

const Servicio = db.define("servicios", {
    nombre: {
        type: Sequelize.DataTypes.STRING,
    },
    precio: {
        type: Sequelize.DataTypes.FLOAT,
    },
}, { freezeTableName: true });

module.exports = {
    Servicio
}
