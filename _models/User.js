const mongoose = require('mongoose')

const validator = require('validator')

const Schema = mongoose.Schema

let userSchema = new Schema({
  id: {
    type: String,
    require: [true, 'Enter an Id/Roll no.'],
    unique: [true, 'User alrady eists with this Id/Roll no.'],
    validate: {
      validator: (el) => el.length == 10 || el.length == 5,
      message: 'Invalid Id/Roll No'
    }
  },
  email: {
    type: String,
    require: [true, 'Enter an email address.'],
    unique: [true, 'That email address is taken.'],
    lowercase: true,
    validate: [validator.isEmail, 'Enter a valid email address.']
  },
  password: {
    type: String,
    required: [true, 'Enter a password.'],
    minLength: [8, 'Password should be at least eigth(8) characters']
  },
  role: {
    type: String,
    required: true,
  }
}, {
  collection: 'users'
})

module.exports = mongoose.model('User', userSchema)