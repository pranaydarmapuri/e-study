const {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  getStudentByRoll
} = require('../_controllers/student')

const router = require('express').Router()

router.route('/student/add').post(createStudent)
router.route('/student/get/all').post(getAllStudents)
router.route('/student/get/:id').post(getStudent)
router.route('/student/update/:id').post(updateStudent)
router.route('/student/delete/:id').post(deleteStudent)
router.route('/student/get-roll/:id').post(getStudentByRoll)

module.exports = router