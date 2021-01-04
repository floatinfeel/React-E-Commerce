const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const authentication = require('../middlewares/authentication')
const User = require('../models/User')
//@route POST /user/register
//@desc Register user
//@access Public

//controller
const {signUp, signIn} = require('../controllers/userController')

//after login
router.get('/', authentication, async (req, res) => {
    
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)    
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }

})

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
