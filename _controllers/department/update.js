// ------------------------- Import Statements
import Department from '../../_models/Department'

module.exports = async (req, res) => {

  // update Department
  Department.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, async (e, d) => {
    if (e)
      res.status(400).json(e)
    else
      res.json({ message: 'Department upadte, successfully.' })
  })
}