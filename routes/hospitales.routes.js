/* 
   Ruta : /api/hospitales
*/
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validaCampos } = require('../middlewares/valida-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitales, crearHospitales, actualizarHospitales,borrarHospitales } = require('../controllers/hospitales.controller')


router.get('/', validarJWT, getHospitales);

router.post('/',[
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validaCampos
 ], 
 crearHospitales);
 
 
 router.put('/:id',[
   validarJWT,
   check('id','No es un id de mongo').isMongoId(),
   check('nombre', 'El nombre es necesario').not().isEmpty(),
    validaCampos
 ],actualizarHospitales);

 router.delete('/:id',validarJWT, borrarHospitales);


module.exports = router;