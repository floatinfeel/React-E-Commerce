const express = require('express')
const router = express.Router()

//models
const User = require('../models/User')
//@route POST /user/register
//@desc Register user
//@access Public

//controller
const {signUp} = require('../controllers/userController')

router.post('/register', signUp)

module.exports = router
