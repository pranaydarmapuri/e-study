// ========================
// =================== CRUD
// ========================

// -------------------------> CREATE
module.exports.createStudent = require('./create')

// ---------------------------> READ
const { readStudent, readStudents, readStudentByRoll } = require('./read')
// -------------------------> Read all students
module.exports.getAllStudents = readStudents
// --------------------------> Get one student
module.exports.getStudent = readStudent
// --------------------------> Get one student by Roll
module.exports.getStudentByRoll = readStudentByRoll

// ============================> UPDATE
module.exports.updateStudent = require('./update')

// ------------------------------> DELETE
module.exports.deleteStudent = require('./delete')
