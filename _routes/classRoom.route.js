const {
  createClassRoom,
  getAllClassRooms,
  getClassRoom,
  deleteClassRoom,
  updateClassRoom,
  readClassRoomWIthDepartment
} = require('../_controllers/classRoom')

const router = require('express').Router()

router.route('/classes/add').post(createClassRoom)
router.route('/classes/get/all/dept').post(readClassRoomWIthDepartment)
router.route('/classes/get/all').post(getAllClassRooms)
router.route('/classes/get/:id').post(getClassRoom)
router.route('/classes/update/:id').post(updateClassRoom)
router.route('/classes/delete/:id').post(deleteClassRoom)

module.exports = router