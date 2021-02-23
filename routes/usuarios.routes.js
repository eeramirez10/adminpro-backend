/* 
   Ruta : /api/usuarios
*/

const express = require('express')
const { check } = require('express-validator');
const router = express.Router();
const { getUsuarios, crearUsuario, actualizaUsuario, eliminaUsuario  } = require('../controllers/usuarios.controller')
const { validaCampos } = require('../middlewares/valida-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

router.get('/',validarJWT,getUsuarios);


router.post('/',[
   validarJWT,
   check('nombre','El nombre es necesario').not().isEmpty(),
   check('password','El password es necesario').not().isEmpty(),
   check('email','El email es necesario').not().isEmpty(),
   check('email','Debe de ser un correo valido').isEmail(),
   validaCampos,
   validarJWT
], 
crearUsuario);


router.put('/:id',[
   validarJWT,
   check('nombre','El  nombre es necesario').not().isEmpty(),
   check('role','El  role es necesario').not().isEmpty(),
   check('email','El  email es necesario').not().isEmpty(),
   check('email','El  correo no es valido').isEmail(),
   validaCampos
],actualizaUsuario);

router.delete('/:id',validarJWT, eliminaUsuario);




module.exports = router;