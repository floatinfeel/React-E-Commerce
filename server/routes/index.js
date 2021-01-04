const express = require('express')
const userRoute = require('./userRoute')
const router = express.Router()

router.use('/user/', userRoute)

router.get('/', (req, res) =>{
    res.send('tes route')
})



module.exports = router