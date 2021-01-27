// ------------------------- Import Statements
import Department from '../../_models/Department'

module.exports.readDepartments = async (req, res) => {

  // Reading Department
  Department.find(async (error, data) => {
    if (error)
      res.status(400).json(error)
    else
      res.json(data)
  })
}

module.exports.readDepartment = async (req, res) => {

  // Getting Department by id
  Department.findById(req.params.id, async (error, data) => {
    if (error)
      res.status(400).json(error)
    else
      res.json(data)
  })
}