// ------------------------- Import Statements
const Student = require('../../_models/Student')

module.exports = async (req, res) => {

  // delete student
  Student.findByIdAndDelete(req.params.id, async (e, d) => {
    if (e)
      res.status(400).json(e)
    else
      res.json({ message: 'Student deleted, successfully.' })
  })
}