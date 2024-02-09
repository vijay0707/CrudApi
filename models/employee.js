const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        required: true,
    },

    designation: {
        type: String,
        required: true,
    },

    fathername: {
        type: String,
        required: true,
    },

    bloodgroup: {
        type: String,
        required: true,
    },

    experience: {
        type: Number,
        required: true,
    }
});
module.exports = mongoose.model('Employee', employeeSchema)