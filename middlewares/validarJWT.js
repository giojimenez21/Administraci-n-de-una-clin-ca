const jwt = require('jsonwebtoken');

const validarJWT = (req,res,next)=>{
    const token = req.header('x-token');

    if(!token){
        return res.json({
            ok: false,
            msg:'No hay token'
        });
    }

    try {
        const {id,nombre,rol} = jwt.verify(token,process.env.SECRET_JWT);

        req.id = id;
        req.nombre = nombre;
        req.rol = rol;


    } catch (error) {
        return res.json({
            ok:false,
            msg:'Token no valido'
        })
    }


    next();
}

module.exports={
    validarJWT
}