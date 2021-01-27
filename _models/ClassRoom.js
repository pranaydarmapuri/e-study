/**
 * 
 *  ------------ Classes Schema
 */
import { Schema, model } from 'mongoose'

// --------- Schema
export default model('Classes', new Schema({
  name: {
    type: String,
    required: [true, 'Enter class name']
  },
  department: {
    type: String,
    required: [true, 'Enter department of class']
  },
  year: {
    type: Number,
    required: [true, 'Enter year']
  }
}, {
  collection: 'sections'
}))