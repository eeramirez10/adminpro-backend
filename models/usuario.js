const mongoose = require('mongoose');


const UsuarioSchema = mongoose.Schema({
    nombre:   { type: String, required: true },
    email:    { type: String, required:true, unique: true },
    password: { type: String, required:true },
    img:      { type: String },
    role:     { type: String, required:true, default: 'USER_ROLE' },
    google:   { type: Boolean, default: false }
});

UsuarioSchema.method('toJSON', function(){
    const { ___v, _id, ...object } = this.toObject();
    object.uid = _id;
    delete object.password;

    return object;
})


module.exports = mongoose.model('Usuario', UsuarioSchema);