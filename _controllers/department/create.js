// ------------------------- Import Statements
import Department from '../../_models/Department'

module.exports = async (req, res) => {

  Department.create(req.body, async (error, data) => {
    if (error)
      res.status(400).json(error)
    else
      res.json({ message: 'Department added, successfully.' })
  })
}
