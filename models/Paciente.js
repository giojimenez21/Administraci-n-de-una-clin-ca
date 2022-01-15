const Sequelize = require("sequelize");
const { db } = require("../config/db");

const Paciente = db.define("paciente", {
    nombre: {
        type: Sequelize.DataTypes.STRING,
    },
    ap_paterno: {
        type: Sequelize.DataTypes.STRING,
    },
    ap_materno:{
        type: Sequelize.DataTypes.INTEGER
    },
    sexo:{
        type:Sequelize.DataTypes.STRING
    },
    f_nacimiento:{
        type: Sequelize.DataTypes.INTEGER
    }
});

module.exports = {
    Paciente
};