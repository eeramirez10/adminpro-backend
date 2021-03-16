let controller = {};


const Hospital = require('../models/hospital');



controller.getHospitales = async (req, res) => {


    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre email')

    res.json({
        ok: true,
        hospitales
    })
}


controller.crearHospitales = async (req, res) => {

    let { nombre } = req.body

    let uid = req.uid;



    let hospital = new Hospital({ nombre, usuario: uid })


    try {

        let hospitalDB = await hospital.save()


        return res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

controller.actualizarHospitales = async (req, res) => {

    const id = req.params.id
    const uid = req.uid

    const cambiosHospital = {
        ...req.body,
        usuario: uid
    }

    try {

        let hospitalDB = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true })
        if (!hospitalDB) {
            return res.status(400).json({ ok: false, message: 'Hubo un error al actualizar' })
        }

        res.json({
            ok: true,
            msg: 'Hospital Actualizado',
            hospitalDB
        })

    } catch (error) {
        console.log(err);
        res.status(500).json({ ok: false, message: 'Hable con el administrador' });
    }
}

controller.borrarHospitales = async (req, res) => {


    try {

        let id = req.params.id;

        let hospital = await Hospital.findByIdAndDelete(id);

        if (!hospital) {
            return res.status(404).json({ ok: false, msg: 'Id no encontarado' })
        }
        res.json({
            ok: true,
            msg: 'Hospital eliminado',
            hospital
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg:'Hubo un error en el servidor'})
    }
}




module.exports = controller;