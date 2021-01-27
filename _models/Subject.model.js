/**
 * ============ import statemet
 */
import { Schema, model } from 'mongoose'

const subjectSchema = new Schema({
  code: {
    type: String,
    required: [true, 'Enter subject code'],
    unique: [true, `Subject exists with this code`],
    validate: {
      validator: value => /^[0-9A-Z]*$/.test(value),
      message: 'Invalid Subject code'
    }
  },
  name: {
    type: String,
    required: [true, 'Enter subject name'],
    validate: {
      validator: v => v.trim() != 0 && /^[a-zA-Z ]*$/.test(v),
      message: 'Invalid Subject name'
    }
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  abbr: {
    type: String,
    required: [true, 'subject abbrivation is required']
  }
}, {
  collection: 'subjects'
})

export default model('Subject', subjectSchema)