// ------------------------- Import Statements
const Student = require('../../_models/Student')

module.exports = async (req, res) => {

  Student.create(req.body, async (error, data) => {
    if (error)
      res.status(400).json(error)
    else
      res.json({ message: 'Student added, successfully.' })
  })
}