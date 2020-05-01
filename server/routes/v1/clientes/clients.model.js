const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Cliente debe tener un nombre']
    },
    last_name: {
        type: String,
        required: [true, 'Cliente debe tener una apellidos']
    },
    email: {
        type: String,
        required: [true, 'Cliente debe tener una email']
    },
    password: {
        type: String,
        required: [true, 'Cliente debe tener una password']
    },
    is_active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('clientes', clientSchema)