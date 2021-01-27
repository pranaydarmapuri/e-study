// -------->>>>>> Import Statements
import Subject from '../../_models/Subject.model'

//-----------> fetching all subjects
const readAllSubjects = async (req, res) => Subject.find(async (err, data) => err ? res.status(400).json(err) : res.json(data))

// ----------> Getting Subject by id
const readSubject = async (req, res) => Subject.findById(req.params.id, async (e, data) => e ? res.status(400).json(e) : res.json(data))

// -----------> Export Statements
export { readAllSubjects, readSubject }