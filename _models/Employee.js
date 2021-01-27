/*****************
----------------------> Import Statements
*/
const mongoose = require('mongoose')
// const validator = require('validator')

/**
 * ============== SCHEMA DECLERATION
 */
let employeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Enter a Roll no.'],
    unique: [true, 'User alrady eists with this Roll no.'],
    validate: {
      validator: (el) => /^[0-9]{5}$/.test(el),
      message: 'Invalid Roll No'
    }
  },
  department: {
    type: String,
    required: [true, 'Select department']
  },
  mobileNo: {
    type: String,
    validate: {
      validator: (el) => /^[0-9]{10}$/.test(el) || el.length === 0,
      message: 'Invalid Mobile No'
    }
  },
  name: {
    type: String,
    required: [true, 'Enter name'],
    validate: {
      validator: name => name.trim() != 0 && /^[a-zA-Z ]*$/.test(name),
      message: 'Name should contain only alphabetic characters & spaces'
    }
  },
  designation: {
    type: String,
    required: [true, 'Enter designation'],
    validate: {
      validator: value => ["Professor", "Associate Professor", "Assistant Professor", "admin"].includes(value),
      message: 'Invalid designation'
    }
  }
}, {
  collection: 'employees'
})

module.exports = mongoose.model('Employee', employeeSchema)