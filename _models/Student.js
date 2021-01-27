const mongoose = require('mongoose')

let studentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Enter a Roll no.'],
    unique: [true, 'User alrady eists with this Roll no.'],
    validate: {
      validator: (el) => /^[A-Z0-9]{10}$/.test(el),
      message: 'Invalid Roll No'
    }
  },
  department: {
    type: String,
    required: [true, 'Select department']
  },
  section: {
    type: String,
    required: [true, 'Select Class']
  },
  dob: {
    type: Date,
    required: [true, 'Enter Date of Birth']
  },
  fatherName: {
    type: String,
    required: [true, 'Enter father name'],
    validate: {
      validator: name => name.trim() != 0 && /^[a-zA-Z ]*$/.test(name),
      message: 'Name should contain only alphabetic characters & spaces'
    }
  },
  mobileNo: {
    type: String,
    validate: {
      validator: (el) => /^[0-9]{10}$/.test(el),
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
  year: {
    type: Number,
    required: [true, 'Enter year']
  }
}, {
  collection: 'students'
})


module.exports = mongoose.model('Student', studentSchema)