let controller = {};


const Hospital = require('../models/hospital');



controller.getHospitales = async (req, res) => {


    const hospitales = await Hospital.find()
            .populate('usuario','nombre email')

    res.json({
        ok:true,
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
            ok:true,
            hospital:hospitalDB
        })
        
    } catch (error) {

        console.log(error)
        
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }


}

controller.actualizarHospitales = (req, res) => {
    res.json({
        ok:true,
        msg: 'Actualizar Hospital'
    })
}

controller.borrarHospitales = (req, res) => {
    res.json({
        ok:true,
        msg: 'Borrar    Hospital'
    })
}




module.exports = controller;