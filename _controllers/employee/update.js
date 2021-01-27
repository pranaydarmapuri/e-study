// ------------------------- Import Statements
const Employee = require('../../_models/Employee')

module.exports = async (req, res) => {

  // update Employee
  Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, async (e, d) => {
    if (e)
      res.status(400).json(e)
    else
      res.json({ message: 'Faculty upadte, successfully.' })
  })
}