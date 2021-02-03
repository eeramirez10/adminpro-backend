const { json } = require('express');
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Base de datos
dbConnection();


//middleware
//Configurar Cors
app.use(cors());


//rutas
app.get('/',(req,res)=>{

    res.json({
        ok:true,
        message:'Hola Mundo'
    })
});






app.listen(process.env.PORT,()=>{
    console.log('escuchando en el puerto', process.env.PORT);
})