/**
 * ---------- Import Statement
 */
import { Schema, model } from 'mongoose'

export default model('Department', new Schema({
  id: {
    type: String,
    required: [true, 'Enter an Id.'],
    unique: [true, 'Department alrady eists with this Id.']
  },
  name: {
    type: String,
    required: [true, 'Enter name of department'],
    validate: {
      validator: name => name.trim() != 0 && /^[a-zA-Z ]*$/.test(name),
      message: 'Name should contain only alphabetic characters & spaces'
    }
  },
  course: {
    type: Object,
    default: {
      name: 'Bachelor of Technology',
      abbr: 'B. Tech'
    }
  },
  duration: {
    type: Number,
    default: 4
  },
  abbr: {
    type: String,
    required: [true, 'Enter abbrivation of department'],
    validate: {
      validator: name => name.trim() != 0 && /^[a-zA-Z ]*$/.test(name),
      message: 'Name should contain only alphabetic characters & spaces'
    }
  }
}, {
  collection: 'departments'
}))