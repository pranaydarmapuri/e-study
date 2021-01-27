import {
  readSubFacByFaculty,
  readSubFacBySubject,
  readSubFacList,
  readSubFacByClass,
  addSubFac,
  update,
  deleteSubFac,
  getWithAllAttributes,
  timeTable
} from '../_controllers/subjectFaculty'
import { Router } from 'express'

const router = Router()

router.route('/timetable/sub-fac/class/:id').post(timeTable)
router.route('/sub-fac/get/complete').post(getWithAllAttributes)
router.route('/sub-fac/get/all').post(readSubFacList)
router.route('/sub-fac/get/subject/:id').post(readSubFacBySubject)
router.route('/sub-fac/get/faculty/:id').post(readSubFacByFaculty)
router.route('/sub-fac/get/class/:id').post(readSubFacByClass)
router.route('/sub-fac/add').post(addSubFac)
router.route('/sub-fac/delete/:id').post(deleteSubFac)
router.route('/sub-fac/update/:id').post(update)

export default router