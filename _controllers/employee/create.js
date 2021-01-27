/**
 * ============== Import Statements
 */
const Employee = require('../../_models/Employee')

module.exports = async (req, res) => {

  // -------------- Create employee
  Employee.create(req.body, async (err, data) => {
    if (err)
      res.status(400).json(err)
    else
      res.json({ message: 'Faculty added, successfully.' })
  })
}