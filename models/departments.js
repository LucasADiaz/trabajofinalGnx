const mongoose = require('mongoose');
// schema de departamentos
const DepartmentsSchema = mongoose.Schema({
    dept_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Department', DepartmentsSchema);