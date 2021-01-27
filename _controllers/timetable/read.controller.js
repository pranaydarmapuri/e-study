import Timetable from '../../_models/Timetable.model'

export default async (req, res) => {

  //read table
  Timetable.findOne(
    { id: req.params.id },
    async (err, data) => err ? res.status(500).json(err) : res.json(data)
  )
}