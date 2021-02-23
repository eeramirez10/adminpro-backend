const jwt = require('jsonwebtoken');

const validarJWT = async (req,res,next)=>{

    let token = req.header('x-token');

    if(!token) return res.status(401).json({ err: true, msg:'No hay token en la peticion'})

    try {

        const {uid} = await jwt.verify(token, process.env.JWT_SECRET)
            
        req.uid = uid;
        
        next();
        
    } catch (error) {
        
        return res.status(401).json({ err: true, msg: 'error de token'})
    }



   

    
}



module.exports = {
    validarJWT
}