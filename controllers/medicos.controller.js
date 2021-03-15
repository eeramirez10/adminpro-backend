let controller = {};

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');


controller.getMedicos = async (req, res) => {

    const medicos = await Medico.find()
                        .populate('usuario','nombre')
                        .populate('hospital', 'nombre')

    res.json({
        ok:true,
        medicos
    })
}


controller.crearMedicos = async  (req, res) => {

    const uid = req.uid;
   
    try {

        const hospitalDB = await Hospital.findById(req.body.hospital)

        if(!hospitalDB){
            return res.status(400).json({
                ok: false,
                msg:'No hay un hospital con ese id'
            })
        }

        const medico = new Medico({usuario: uid, ...req.body});

        await medico.save();


        return res.json({
            ok:true,
            medico
        })

        
    } catch (error) {

        console.log(error)

       return res.status(500).json({
            ok:false,
            message:'Hubo un error verificar con el administrador'
        })
        
    }
}

controller.actualizarMedicos = (req, res) => {
    res.json({
        ok:true,
        msg: 'Actualizar Medicos'
    })
}

controller.borrarMedicos = (req, res) => {
    res.json({
        ok:true,
        msg: 'Borrar    Medicos'
    })
}




module.exports = controller;