
const controller = {};

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');



controller.getTodo = async (req, res) =>{

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({ nombre: regex}),
        Medico.find({nombre: regex}),
        Hospital.find({ nombre: regex }),
    ]);

    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    })
}


controller.getDocumentosColeccion = async (req, res) =>{

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;

    const regex = new RegExp(busqueda, 'i');

    let data;

    switch (tabla){
        case 'usuarios':
        data = await Usuario.find({nombre:regex}, 'nombre email')
        break;

        case 'medicos':
            data = await Medico.find({nombre:regex})
                            .populate('usuario','nombre img')
                            .populate('hospital','nombre img')
        break;

        case 'hospitales':
            data = await Hospital.find({nombre:regex})
                                .populate('usuario','nombre img')
        break;

        default:

        return res.status(404).json({
            ok: false,
            msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
        })
    }



    res.json({
        ok:true,
        tabla,
        data

    })
}



module.exports = controller;