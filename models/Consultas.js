const Sequelize = require("sequelize");
const { db } = require("../config/db");

const Consultas = db.define("consultas", {
    diagnostico:{
        type: Sequelize.DataTypes.TEXT
    },
    sintomas: {
        type: Sequelize.DataTypes.TEXT
    },
    receta: {
        type: Sequelize.DataTypes.TEXT
    },
    f_consulta:{
        type: Sequelize.DataTypes.DATE
    },
    id_paciente:{
        type: Sequelize.DataTypes.INTEGER
    },
    id_empleado:{
        type: Sequelize.DataTypes.INTEGER
    }
});

module.exports = {
    Consultas,
};