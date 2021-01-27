import { Router } from 'express'
import { signup, login, isLoggedIn } from '../_controllers/user'

const router = Router()

// login user
router.route('/login').post(login)
// user singup
router.route('/signup').post(signup)
// is user looged in
// router.route('/isLogin').post(isLoggedIn)

module.exports = router
