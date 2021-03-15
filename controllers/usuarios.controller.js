const controller = {}
const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt.helper')




controller.getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0 ;

    

/*     const usuarios = await Usuario
                            .find({}, 'nombre email role google')
                            .skip(desde)
                            .limit(5)
    const total = await Usuario.count();    */     
    
    
    const [usuarios, total ] = await Promise.all([
        Usuario
        .find({}, 'nombre email role google')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments()
    ])

    return res.json({
        ok: true,
        usuarios,
        uid: req.uid,
        total
    })
}

controller.crearUsuario = async (req, res = response) => {

    let { password, email } = req.body



    try {


        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {

            return res.status(400).json({
                ok: false,
                message: 'Ya existe el correo'
            });
        }

        const usuario = new Usuario(req.body)

        //Encriptar password

        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save()
            .catch(err => {
                return res.status(400).json({
                    ok: false,
                    msg: err
                })
            });

        let token = await generarJWT(usuario.id);

        return res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            message: 'Hubo un error interno, revisar logs'
        })

    }

}


controller.actualizaUsuario = async (req, res) => {

    const uid = req.params.id;

    let { google, password, ...body } = req.body;



    try {


        let usuarioDB = await Usuario.findById(uid);



        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: 'No existe el usuario en la base de datos'
            })
        }

        if (usuarioDB.email === body.email) {
            delete body.email
        }

        let existeEmail = await Usuario.findOne({ email: req.body.email });

        if (existeEmail) {

            return res.status(400).json({
                ok: true,
                message: 'Ya existe un usuario con ese email'
            })
        }



        usuarioDB = await Usuario.findByIdAndUpdate(uid, body, { new: true })

        res.json({
            ok: true,
            usuarioDB
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            message: 'Hubo un error revisar logs',
            error
        })
    }




}


controller.eliminaUsuario = async (req, res) => {

    let uid = req.params.id;
    let usuarioDB = await Usuario.findByIdAndDelete(uid)
        .catch(err => res.status(500).json({ ok: false, err }))

    if (!usuarioDB) {
        return res.status(400).json({
            ok: false,
            message: 'El usuario no existe en la base de datos'
        })
    }


    return res.json({
        ok: true,
        message: `El usuario con el uid: ${uid} ha sido eliminado`
    })



}





module.exports = controller;