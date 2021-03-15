const controller = {};

const { v4: uuidv4 } = require('uuid');

const path = require('path');

const { response } = require('express');

const fs = require('fs');

const { actualizarImagen } = require('../helpers/update-image');


controller.fileUpload = async (req, res) => {

    const { tipo, id } = req.params;

    let file;


    //Validar tipo 

    const tiposValidos = ['usuarios', 'medicos', 'hospitales'];

    if (!tiposValidos.includes(tipo)) {

        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital (tipo)'
        })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        })
    }

    file = req.files.imagen

    let mimetype = file.mimetype

    let extension = mimetype.split('/')[1];

    

    const extensionesValidas = ['image/jpeg', 'image/jpg','image/png','image/gif'];

    if ( !extensionesValidas.includes(mimetype)){
        return res.status(400).json({
            ok: false,
            msg: 'Extension no valida'
        })
    }

    //generar nombre del archivo

    const nombreArchivo = `${uuidv4()}.${extension}`

    const ruta = path.join(__dirname,`../uploads/${tipo}/${nombreArchivo}`);

    file.mv(ruta, async (err) =>{
        if (err){
            return res.status(500).json({ ok: false, err});
        }  

       let resultado = await actualizarImagen(tipo, id, nombreArchivo)

      

       if( resultado.ok ){
           res.json(resultado);
       }else{
           res.status(400).json(resultado);
       }

 /*        return res.json({
            ok: true,
            msg:`Archivo ${nombreArchivo} subido`
        }) */
    })
    

    

    

 

}


controller.retornaImagen = (req,res= response)=>{

    let { tipo, foto } = req.params;

    let imagen = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if(!fs.existsSync(imagen)){
        return res.sendFile(path.join(__dirname, `../uploads/noImage/no-img.jpg`));
    }
    res.sendFile(imagen)
    
}






module.exports = controller;