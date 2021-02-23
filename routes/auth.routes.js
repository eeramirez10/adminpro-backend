/*
    Path:'/api/login'
*/

const express = require('express')
const router = express.Router()
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validaCampos } = require('../middlewares/valida-campos')

router.post('/',[ 

    check('nombre', 'El nombre es necesario').not().isEmpty(),
    check('password', 'el password es necesario').not().isEmpty(),
    check('email', 'El email es necesario').not().isEmpty(),
    check('email','Ese no es un email correcto').isEmail(),
    validaCampos

],login)







module.exports = router;