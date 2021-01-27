// ========================
// =================== CRUD
// ========================

// -------------------------> CREATE
module.exports.createDepartment = require('./create')

// ---------------------------> READ
const { readDepartments, readDepartment } = require('./read')
// -------------------------> Read all students
module.exports.getAllDepartments = readDepartments
// --------------------------> Get one student
module.exports.getDepartment = readDepartment

// ============================> UPDATE
module.exports.updateDepartment = require('./update')

// ------------------------------> DELETE
module.exports.deleteDepartment = require('./delete')
