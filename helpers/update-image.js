const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const path = require('path');
const fs = require('fs');



const borraImagen = (ruta)=>{

    if(fs.existsSync(ruta)){
        fs.unlinkSync(ruta);
    }
}


const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let ruta;

    switch (tipo) {
        
        case 'medicos':
            const medico = await  Medico.findById(id);
            if(!medico){
                
                ruta = path.join(__dirname, `../uploads/medicos/${nombreArchivo}`)
                borraImagen(ruta)

        
                return {
                    ok:false,
                    msg:'No es un medico'
                };
            }

            ruta = path.join(__dirname, `../uploads/medicos/${medico.img}`);

            borraImagen(ruta)

            medico.img = nombreArchivo;

            await medico.save();

            return {
                ok:true, msg:'Imagen subida'
            }

        break;

        case 'usuarios':

            const usuario = await  Usuario.findById(id);
            if(!usuario){
                
                ruta = path.join(__dirname, `../uploads/usuarios/${nombreArchivo}`)
                borraImagen(ruta)

        
                return {
                    ok:false,
                    msg:'No es un usuarios'
                };
            }

            ruta = path.join(__dirname, `../uploads/usuarios/${usuario.img}`);

            borraImagen(ruta)

            usuario.img = nombreArchivo;

            await usuario.save();

            return {
                ok:true, msg:'Imagen subida'
            }

        break;

        case 'hospitales':

            const hospital = await  Hospital.findById(id);
            if(!hospital){
                
                ruta = path.join(__dirname, `../uploads/hospitales/${nombreArchivo}`)
                borraImagen(ruta)

        
                return {
                    ok:false,
                    msg:'No es un hospital'
                };
            }

            ruta = path.join(__dirname, `../uploads/hospitales/${hospital.img}`);

            borraImagen(ruta)

            hospital.img = nombreArchivo;

            await hospital.save();

            return {
                ok:true, msg:'Imagen subida'
            }

        break;
    }

}







module.exports = {actualizarImagen};