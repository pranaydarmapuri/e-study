// ========================
// =================== CRUD
// ========================

// -------------------------> CREATE
module.exports.createEmployee = require('./create')

// ---------------------------> READ
const { readEmployee, readEmployees, readEmployeeById } = require('./read')
// -------------------------> Read all students
module.exports.getAllEmployees = readEmployees
// --------------------------> Get one student
module.exports.getEmployee = readEmployee
// --------------------------> Get one student
module.exports.readEmployeeById = readEmployeeById

// ============================> UPDATE
module.exports.updateEmployee = require('./update')

// ------------------------------> DELETE
module.exports.deleteEmployee = require('./delete')
