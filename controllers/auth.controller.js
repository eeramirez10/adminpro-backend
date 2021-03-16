const controller = {}
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt.helper')



controller.login = async ( req ,res= response)=>{

    const { email, password } = req.body;

    const usuarioDB = await Usuario.findOne({ email });

    if (!usuarioDB){
        return res.status(400).json({ 
            ok: false, 
            message:'(email) o password incorrectos'
        })
    }

    if(!bcrypt.compareSync(password, usuarioDB.password)){
        return res.status(400).json({
            ok: false, 
            message: 'email o (password) incorrectos'
        })
    } 

  

    let token = await generarJWT(usuarioDB.id);

    

    res.json({
        ok: true,
        token,
        
    })
}




controller.renewToken = async (req,res)=>{

    const uid = req.uid
  
    const token = await generarJWT(uid)


    res.json({ 
        ok:true,
        uid,
        token
    })

}



module.exports = controller;