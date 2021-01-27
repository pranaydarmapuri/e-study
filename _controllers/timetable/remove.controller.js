import Timetable from '../../_models/Timetable.model'

export default async (req, res) => {

  //Removing Timetable
  Timetable.findByIdAndDelete(req.params.id, async (e, d) => {
    e ? res.status(500).json(e) : res.json({ message: 'Removed successfully' })
  })
}