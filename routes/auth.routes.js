/*
    Path:'/api/login'
*/

const express = require('express')
const router = express.Router()
const { check } = require('express-validator');

const { login, renewToken } = require('../controllers/auth.controller');
const { validaCampos } = require('../middlewares/valida-campos')

const { validarJWT } = require('../middlewares/validar-jwt')

router.post('/',[ 

    check('nombre', 'El nombre es necesario').not().isEmpty(),
    check('password', 'el password es necesario').not().isEmpty(),
    check('email', 'El email es necesario').not().isEmpty(),
    check('email','Ese no es un email correcto').isEmail(),
    validaCampos

],login);

router.get ('/renew',validarJWT, renewToken);







module.exports = router;