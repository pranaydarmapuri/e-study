// ------------------------- Import Statements
const Employee = require('../../_models/Employee')

module.exports = async (req, res) => {

  // delete Employee
  Employee.findByIdAndDelete(req.params.id, async (e, d) => {
    if (e)
      res.status(400).json(e)
    else
      res.json({ message: 'Faculty deleted, successfully.' })
  })
}