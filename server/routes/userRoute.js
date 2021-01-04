const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
//@route POST /user/register
//@desc Register user
//@access Public

//controller
const {signUp, signIn} = require('../controllers/userController')

//route register user
router.post('/register', [
    //validation
    check('name', 'Name is require').not().isEmpty(),
    check('email', 'Please insert a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    }) 
 
] ,signUp)

//route login user
router.post('/login', [
    check('email', 'please insert a valid email').isEmail(),
    check('password', 'password is required!').exists()
] ,signIn)

module.exports = router
