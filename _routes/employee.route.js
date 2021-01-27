const {
  createEmployee,
  getAllEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  readEmployeeById
} = require('../_controllers/employee')

const router = require('express').Router()

router.route('/employee/add').post(createEmployee)
router.route('/employee/get/all').post(getAllEmployees)
router.route('/employee/get/:id').post(getEmployee)
router.route('/employee/update/:id').post(updateEmployee)
router.route('/employee/delete/:id').post(deleteEmployee)
router.route('/employee/get-id/:id').post(readEmployeeById)

module.exports = router