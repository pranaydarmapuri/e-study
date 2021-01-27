// ------------->>>>>>> Import Statement
import Subject from '../../_models/Subject.model'

// |------------>>>>>>>>> Update Subject
export default async (req, res) => Subject.findByIdAndUpdate(req.params.id, {
  $set: req.body
}, async (err, data) => {
  err
    ? res.status(401).json(err)
    : res.json({ message: 'Updated successfully' })
})