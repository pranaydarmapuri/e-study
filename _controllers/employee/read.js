/**
 * ============== Import Statements
 */
const Employee = require('../../_models/Employee')

module.exports.readEmployees = async (req, res) => {

  // getting all employees list
  Employee.find(async (error, data) => {
    if (error)
      res.status(400).json(error)
    else
      res.json(data)
  })
}

module.exports.readEmployee = async (req, res) => {

  // fetching by id
  Employee.findById(req.params.id, async (error, data) => {
    if (error)
      res.status(400).json(error)
    else
      res.json(data)
  })
}

module.exports.readEmployeeById = async (req, res) => {

  // fetching by id
  Employee.findOne({ id: req.params.id }, async (error, data) => {
    if (error)
      res.status(400).json(error)
    else
      res.json(data)
  })
}