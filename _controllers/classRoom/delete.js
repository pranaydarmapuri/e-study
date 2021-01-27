// ------------------------- Import Statements
import ClassRoom from '../../_models/ClassRoom'

module.exports = async (req, res) => {

  // delete ClassRoom
  ClassRoom.findByIdAndDelete(req.params.id, async (e, d) => {
    if (e)
      res.status(400).json(e)
    else
      res.json({ message: 'Class deleted, successfully.' })
  })
}