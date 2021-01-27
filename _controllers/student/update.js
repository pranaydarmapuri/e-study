// ------------------------- Import Statements
const Student = require('../../_models/Student')

module.exports = async (req, res) => {

  // update student
  Student.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, async (e, d) => {
    if (e)
      res.status(400).json(e)
    else
      res.json({ message: 'Student upadte, successfully.' })
  })
}