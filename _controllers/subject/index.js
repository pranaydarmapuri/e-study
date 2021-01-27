import createSubject from './create.controller'
import {
  readSubject as getSubject,
  readAllSubjects as getAllSubjects
} from './read.controller'
import deleteSubject from './delete.controller'
import updateSubject from './update.controller'

export {
  createSubject,
  getAllSubjects,
  getSubject,
  deleteSubject,
  updateSubject
}