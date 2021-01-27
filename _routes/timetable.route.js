import { Router } from 'express'
import {
  add, edit, remove, read
} from '../_controllers/timetable'

const router = Router()

router.route('/timetable/get/:id').post(read)
router.route('/timetable/add').post(add)
router.route('/timetable/edit/:id').post(edit)
router.route('/timetable/remove/:id').post(remove)

export default router