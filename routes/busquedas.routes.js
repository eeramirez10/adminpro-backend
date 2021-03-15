/* 
   Ruta : /api/todo/:busqueda
*/
const express = require('express');
const router = express.Router();

let { getTodo, getDocumentosColeccion } = require('../controllers/busquedas.controller');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/:busqueda',validarJWT,getTodo);

router.get('/coleccion/:tabla/:busqueda',validarJWT, getDocumentosColeccion);




module.exports = router;