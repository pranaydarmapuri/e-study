// ========================
// =================== CRUD
// ========================

// -------------------------> CREATE
module.exports.createClassRoom = require('./create')

// ---------------------------> READ
const { readClassRooms, readClassRoom, readClassRoomWIthDepartment } = require('./read')
// -------------------------> Read all students
module.exports.getAllClassRooms = readClassRooms
// --------------------------> Get one student
module.exports.getClassRoom = readClassRoom

module.exports.readClassRoomWIthDepartment = readClassRoomWIthDepartment

// ============================> UPDATE
module.exports.updateClassRoom = require('./update')

// ------------------------------> DELETE
module.exports.deleteClassRoom = require('./delete')
