const express=require('express')
const router=express.Router()
const User=require('../Controllers/user')
const { isAuthenticated } = require('../Middlewares/isAuthenticated')
const { singleupload } = require('../Middlewares/Multer')


router.route('/auth/register').post(singleupload,User.registerUser)
router.route('/auth/login').post(User.loginUser)
router.route('/auth/logout').get(User.logoutUser)
router.route('/me').get(isAuthenticated,User.getMyProfile)


module.exports=router