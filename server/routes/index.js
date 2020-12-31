const express = require('express')
const homeRoute = require('./homeRoute')
const userRoute = require('./userRoute')
const router = express.Router()

router.use('/', homeRoute)
router.use('/user/', userRoute)

module.exports = router