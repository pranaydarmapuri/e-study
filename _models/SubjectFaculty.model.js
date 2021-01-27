/**
 * -------------->>>>> Import Statements
 */
import { Schema, model } from 'mongoose'

export default model('SubjectFaculty', (new Schema({
  faculty: {
    type: String,
    required: [true, 'Faculty is required for subject']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  section: {
    type: String,
    required: [true, 'Class is required']
  }
}, {
  collection: 'subjectFaculty'
})))