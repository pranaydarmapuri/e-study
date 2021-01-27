//
import CS from '../../_models/ClassSubject.model'

export default async (req, res) => CS.findByIdAndDelete(req.params.id, (e) => e ? res.status(400).json(e) : res.json({ message: 'successfully deleted' }))