// ----------------->. Import
import ClassSubject from '../../_models/ClassSubject.model'

export default async (req, res) => {

  // ----------------->>> Validating Subjects
  const { subjects } = req.body
  if (!subjects)
    return res.status(400).json({ message: 'Subjects are required' })
  if (!Array.isArray(subjects))
    return res.status(400).json({ message: 'Invalid subjects format' })

  // ===============->>>>>>>>>> Update Subjects to Class
  ClassSubject.findByIdAndUpdate(req.params.id, req.body, async (err, data) => {
    err
      ? res.status(400).json(err)
      : res.json({ message: 'Updated successfully' })
  })
}