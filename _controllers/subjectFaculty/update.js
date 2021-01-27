
import SubjectFaculty from '../../_models/SubjectFaculty.model'

export default async (req, res) => {

  // updating doc
  SubjectFaculty.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    async (e, d) => e ? res.status(400).json(e) : res.json({ message: 'Student upadte, successfully.' })
  )
}