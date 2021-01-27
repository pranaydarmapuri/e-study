
import { Router } from 'express'
import {
  createSubject,
  getSubject,
  getAllSubjects,
  deleteSubject,
  updateSubject
} from '../_controllers/subject'

const router = Router()

// ---------routing

router.route('/subject/add').post(createSubject)
router.route('/subject/get/all').post(getAllSubjects)
router.route('/subject/get/:id').post(getSubject)
router.route('/subject/delete/:id').post(deleteSubject)
router.route('/subject/update/:id').post(updateSubject)

export default router