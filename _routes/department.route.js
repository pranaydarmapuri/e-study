const {
  createDepartment,
  getAllDepartments,
  getDepartment,
  deleteDepartment,
  updateDepartment
} = require('../_controllers/department')

const router = require('express').Router()

router.route('/department/add').post(createDepartment)
router.route('/department/get/all').post(getAllDepartments)
router.route('/department/get/:id').post(getDepartment)
router.route('/department/update/:id').post(updateDepartment)
router.route('/department/delete/:id').post(deleteDepartment)

module.exports = router