const mongoose = require('mongoose');


const HospitalSchema = mongoose.Schema({
    nombre:{ 
        unique: true,
        type: String, 
        
        required: true, 
        
    },
    img:{ 
        type: String 
    },
    usuario:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Usuario',
        required: true
    }
},{ collection:'hospitales'});

HospitalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();

    return object;
});


module.exports = mongoose.model('Hospital', HospitalSchema);