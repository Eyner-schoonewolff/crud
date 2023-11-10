const jwt = require("jsonwebtoken");


const verificacion_token = (req, res, next) => {
    const autorizacion = req.headers['authorization']
    const token = autorizacion.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verificar = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verificar;
        next();
    } catch (error) {
        res.status(404).json({ error: 'token no es valido' })
    }
}

module.exports =  verificacion_token;