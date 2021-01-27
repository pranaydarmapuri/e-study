// ------------------------- Import Statements
import ClassRoom from '../../_models/ClassRoom'

module.exports = async (req, res) => {

  ClassRoom.findOne(req.body, async (err, data) => {
    if (err)
      res.status(400).json(err)
    else {
      if (!data)
        ClassRoom.create(req.body, async (error, data) => {
          if (error)
            res.status(400).json(error)
          else
            res.json({ message: 'Section added, successfully.' })
        })
      else {
        res.status(400).json({ message: 'Section already exists' })
      }
    }
  })

}
