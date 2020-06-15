const mongoose = require('mongoose');
// schema de departamentos
const DepartmentsSchema = mongoose.Schema({
    dept_name: {
        type: String,
        trim: true,
        required: true
    }
});

module.exports = mongoose.model('Department', DepartmentsSchema);