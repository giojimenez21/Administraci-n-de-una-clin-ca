const Sequelize = require("sequelize");
const { db } = require("../config/db");

const User = db.define("user", {
    user: {
        type: Sequelize.DataTypes.STRING,
    },
    password: {
        type: Sequelize.DataTypes.STRING,
    },
    id_empleado:{
        type: Sequelize.DataTypes.INTEGER
    },
    estado:{
        type: Sequelize.DataTypes.STRING
    }
});

module.exports = {
    User,
};
