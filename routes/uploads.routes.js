/* 
   Ruta : /api/uploads
*/
const express = require('express');
const router = express.Router();
const expressFileUpload = require('express-fileupload');

const { check } = require('express-validator');
const { validaCampos } = require('../middlewares/valida-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpload, retornaImagen } = require('../controllers/uploads.controller');


//Middleware



router.use(expressFileUpload())


router.put('/:tipo/:id',[ check('id', 'El id debe de ser valido').isMongoId(), validaCampos ],validarJWT,fileUpload);

router.get('/:tipo/:foto', retornaImagen)




module.exports = router;