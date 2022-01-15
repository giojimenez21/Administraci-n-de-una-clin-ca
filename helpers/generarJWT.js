const jwt = require("jsonwebtoken");

const generarJWT = (id, nombre, rol) => {
    return new Promise((resolve, reject) => {
        const payload = { id, nombre, rol };
        jwt.sign(
            payload,
            process.env.SECRET_JWT,
            {
                expiresIn: "7d",
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el token");
                }

                resolve(token);
            }
        );
    });
};

module.exports = {
    generarJWT,
};
