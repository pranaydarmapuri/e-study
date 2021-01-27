import Timetable from '../../_models/Timetable.model'

export default async (req, res) => {

  // Add timetable 
  Timetable.create(req.body, async (err, data) => {
    err
      ? res.status(500).json(err)
      : res.json({ message: 'Successfull added' })
  })

}