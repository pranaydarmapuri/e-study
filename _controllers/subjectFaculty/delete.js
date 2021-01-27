import SubjectFaculty from '../../_models/SubjectFaculty.model'

export default async (req, res) => {

  // Deleting doc
  SubjectFaculty.findByIdAndDelete(req.params.id, async (err, data) => {
    err
      ? res.json(400).json(err)
      : res.json({ message: 'Added successfully' })
  })
}