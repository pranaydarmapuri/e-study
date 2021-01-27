// ------------------------- Import Statements
const ClassRoom = require('../../_models/ClassRoom')

module.exports = async (req, res) => {

  // update ClassRoom
  ClassRoom.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, async (e, d) => {
    if (e)
      res.status(400).json(e)
    else
      res.json({ message: 'Class upadte, successfully.' })
  })
}