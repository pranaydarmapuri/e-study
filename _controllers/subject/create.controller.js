/**
 * import model
 */
import Subject from '../../_models/Subject.model'

export default async (req, res) => {

  // ----------- Create Subject
  Subject.create(req.body, async (error, data) => {
    if (error)
      res.status(400).json(error)
    else
      res.json({ message: 'Subject added, successfully.' })
  })
}