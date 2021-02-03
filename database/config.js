const mongoose = require('mongoose');

const objectConnection = {}

objectConnection.dbConnection = async ()=>{

    try{
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true 
        })

        console.log('DB Online')
    }catch(err){

        console.log(err);

        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
}


module.exports = objectConnection;



/* module.exports = async function dbConnection (){

    return await mongoose.connect('mongodb+srv://admin:912522Pop@cluster0.doryt.mongodb.net/hospitaldb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })

    
} */