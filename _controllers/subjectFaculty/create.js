import SubjectFaculty from '../../_models/SubjectFaculty.model'

export default async (req, res) => {

  SubjectFaculty.create(req.body, async (err, data) => {
    err
      ? res.send(400).json(err)
      : res.json({ message: 'Added successfully' })
  })
}
