import Timetable from '../../_models/Timetable.model'

export default async (req, res) => {

  // edit timetable
  Timetable.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    async (err, data) => err ? res.status(500).json(err) : res.json({ message: 'Updated successfully' })
  )
}