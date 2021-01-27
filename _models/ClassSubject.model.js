import { Schema, model } from "mongoose";

export default model('ClassSubject', new Schema({
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  year: {
    type: Number,
    required: [true, 'Year is required']
  },
  subjects: [{
    type: String,
    required: true,
    validate: {
      validator: subjects => subjects.length != 0,
      message: 'Subjects are required'
    }
  }]
}, {
  collection: 'classSubjects'
}))