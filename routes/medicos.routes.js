/* 
   Ruta : /api/medicos
*/
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validaCampos } = require('../middlewares/valida-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, crearMedicos, actualizarMedicos,borrarMedicos } = require('../controllers/medicos.controller')


router.get('/', validarJWT, getMedicos);

router.post('/',[
   check('nombre', 'El nombre es necesario').not().isEmpty(),
   check('hospital', 'El Hospital es necesario').not().isEmpty(),
   check('hospital', 'El hospital id debe de ser valido').isMongoId(),
   validaCampos,
    validarJWT
 ], 
 crearMedicos);
 
 
 router.put('/:id',[

    validaCampos
 ],actualizarMedicos);

 router.delete('/:id',validarJWT, borrarMedicos);


module.exports = router;