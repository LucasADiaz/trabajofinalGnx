const mongoose = require('mongoose');

const EmployeesSchema = mongoose.Schema({
    dni: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    birth_date: {
        type: Date,
        default: Date.now
    },
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    lastname: {
        type: String,
        trim: true,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    hire_date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Employee', EmployeesSchema);