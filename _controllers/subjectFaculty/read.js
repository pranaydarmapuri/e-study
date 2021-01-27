import SubjectFaculty from '../../_models/SubjectFaculty.model'
import Department from '../../_models/Department'
import Section from '../../_models/ClassRoom'
import Faculty from '../../_models/Employee'
import Subject from '../../_models/Subject.model'

const readSubFacList = async (req, res) => {

  // Read Subject Faculty List
  SubjectFaculty.find(
    async (e, d) => e ? res.status(400).json(e) : res.json(d)
  )
}

const readSubFacByClass = async (req, res) => {

  // Read Subject-Faculty of class
  SubjectFaculty.find({ section: req.params.id }, async (e, d) => {
    e ? res.status(400).json(e) : res.json(d)
  })
}

const readSubFacByFaculty = async (req, res) => {

  // Read list of Subject of Faculty
  SubjectFaculty.find({ faculty: req.params.id }, async (e, d) => {
    e ? res.status(400).json(e) : res.json(d)
  })
}

const readSubFacBySubject = async (req, res) => {

  // Read List of faculty of given subject
  SubjectFaculty.find({ subject: req.params.id }, async (e, d) => {
    e ? res.status(400).json(e) : res.json(d)
  })
}

const getWithAllAttributes = async (req, res) => {

  try {

    let records = [], sect = []
    let subFacList = await SubjectFaculty.find()
    let departments = await Department.find()
    let sections = await Section.find()
    let faculties = await Faculty.find()
    let subjects = await Subject.find()

    sections.forEach(sec => {
      let dept = departments.filter(dept => dept.id === sec.department)
      dept = dept[0]
      sect.push({
        ...sec,
        department: { ...dept }
      })
    })
    subFacList.forEach(list => {
      let fac = faculties.filter(fac => fac.id === list.faculty)
      fac = fac[0]
      let sub = subjects.filter(sub => sub.code === list.subject)
      sub = sub[0]
      let sec = sections.filter(sec => sec._id === list.section)
      sec = sec[0]
      records.push({
        ...list,
        faculty: { ...fac._doc },
        subject: { ...sub._doc },
        section: { ...sec },
      })
    })
    records.sort((a, b) => (a.section._id > b.section._id) ? 1 : ((b.section._id > a.section._id) ? -1 : 0))

    res.json(records)

  } catch (e) {
    res.status(500).json(e)
  }
}

const timeTable = async (req, res) => {

  let records = []

  SubjectFaculty.find({ section: req.params.id }, async (e, d) => {
    if (e) {
      res.status(500).json(e)
    } else {
      Subject.find(async (er, subs) => {
        if (er) {
          res.status(500).json(er)
        } else {
          d.forEach(doc => {
            let sub = subs.filter(s => s.code === doc.subject)
            sub = sub[0]
            records.push({
              ...doc._doc,
              subject: sub._doc
            })
          })
          res.json(records)
        }
      })
    }
  })
}


export {
  readSubFacByClass,
  readSubFacList,
  readSubFacBySubject,
  readSubFacByFaculty,
  getWithAllAttributes,
  timeTable,
}