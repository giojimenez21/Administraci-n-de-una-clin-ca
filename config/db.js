const { Sequelize } = require("sequelize");
const config = require("./keys");
const db = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: "3306",
    dialect: "mysql",
    define: {
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = {
    db,
};
