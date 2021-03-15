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
app.use( express.json())
app.use( express.urlencoded({ extended: false }))



//rutas
app.use('/api/usuarios',require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/hospitales', require('./routes/hospitales.routes'));
app.use('/api/medicos', require('./routes/medicos.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/upload', require('./routes/uploads.routes'))





app.listen(process.env.PORT,()=>{
    console.log('escuchando en el puerto', process.env.PORT);
})