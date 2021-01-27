// ------------------------- Import Statements
import Department from '../../_models/Department'

module.exports = async (req, res) => {

  // delete Department
  Department.findByIdAndDelete(req.params.id, async (e, d) => {
    if (e)
      res.status(400).json(e)
    else
      res.json({ message: 'Department deleted, successfully.' })
  })
}