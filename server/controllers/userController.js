const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')

const signUp = async (req, res) =>{ 

    [
        //validation
        check('name', 'Name is require').not().isEmpty(),
        check('email', 'Please insert a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({
            min: 6
        }) 
     
     ]
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    //get data from req form
    const {name, email, password} = req.body

    try {
        //check if user already exist
        let user = await User.findOne({email})

        //if user already exists
        if(user){
            return res.status(400).json({
                errors: [{msg: 'User already exists!'},],
            })
        }

        //if not exists
        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        //create user object
        user = new User({name, email, avatar, password,})

        //encrypt password
        const salt = await bcrypt.genSalt(10)
        //save password ---> use user password and salt to hash password
        user.password = await bcrypt.hash(password, salt) 
        //save in to database
        await user.save()

        //payload to generate token
        const payload = {
            user:{id: user.id}
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {  expiresIn: 36000,},
            (err, token) =>{
                if(err) throw err
                res.json({token})
            }
        )
    } catch (error) {
        console.log(error);
        res.status(500).json('server error')
    }
 }

 module.exports = {signUp}