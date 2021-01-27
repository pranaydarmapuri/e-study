// ------------------------- Import Statements
const Student = require('../../_models/Student')

module.exports.readStudents = async (req, res) => {

  // Reading Students
  Student.find(async (error, data) => {
    if (error)
      res.status(400).json(error)
    else
      res.json(data)
  })
}

module.exports.readStudent = async (req, res) => {

  // Getting student by id
  Student.findById(req.params.id, async (error, data) => {
    if (error)
      res.status(400).json(error)
    else
      res.json(data)
  })
}

module.exports.readStudentByRoll = async (req, res) => {
  // Getting student by id
  Student.findOne({ id: req.params.id }, async (error, data) => {
    if (error)
      res.status(400).json(error)
    else
      res.json(data)
  })
}