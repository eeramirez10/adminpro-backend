let controller = {};

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');


controller.getMedicos = async (req, res) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre')

    res.json({
        ok: true,
        medicos
    })
}


controller.crearMedicos = async (req, res) => {

    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById(req.body.hospital)

        if (!hospitalDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay un hospital con ese id'
            })
        }

        const medico = new Medico({ usuario: uid, ...req.body });

        await medico.save();


        return res.json({
            ok: true,
            medico
        })


    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            message: 'Hubo un error verificar con el administrador'
        })

    }
}

controller.actualizarMedicos = async (req, res) => {


    const id = req.params.id;

    const usuario = req.uid;

    const cambiosMedicos = {
        ...req.body,
        usuario
    }

    try {


        const medicos = await Medico.findByIdAndUpdate(id, cambiosMedicos, { new: true });

        res.json({
            ok: true,
            medicos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message:'Hubo un error en el servidor' })

    }
}

controller.borrarMedicos = async (req, res) => {

    const id = req.params.id;

    const medico = await Medico.findByIdAndDelete(id);

    res.json({
        ok: true,
        msg: 'Medico Eliminado',
        medico
    })
}




module.exports = controller;