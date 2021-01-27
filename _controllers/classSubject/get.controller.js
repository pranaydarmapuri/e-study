
import ClassSubject from '../../_models/ClassSubject.model'

const getclassSubjectList = async (req, res) => ClassSubject.find((err, data) => err ? res.status(401).json(err) : res.json(data))

const getclassSubject = async (req, res) => ClassSubject.findById(req.params.id, (err, data) => err ? res.status(401).json(err) : res.json(data))

export {
  getclassSubject,
  getclassSubjectList
}