/**
 * --------------->>>>>>>>>> Imports
 */
import { Router } from 'express'
import {
  addSubjectsToClass,
  getclassSubjectList,
  getclassSubject,
  updateSubjectsOfClass,
  deleteClassSubject
} from '../_controllers/classSubject'


// init Router
const router = Router()

// defining routes

router.route('/class-subject/add').post(addSubjectsToClass)
router.route('/class-subject/get/all').post(getclassSubjectList)
router.route('/class-subject/get/:id').post(getclassSubject)
router.route('/class-subject/update/:id').post(updateSubjectsOfClass)
router.route('/class-subject/delete/:id').post(deleteClassSubject)

// exporting routes
export default router