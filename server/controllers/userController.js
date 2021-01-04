const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')

const signUp =  async (req, res) =>{ 

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
                    {expiresIn: 360000},
                    (err, token) =>{
                        if(err) throw err
                        res.json({token})
                    }
                )

    } catch (error) {
        console.log(error);
        res.status(500).json('internal server error')
    }
 }

 const signIn = async (req, res) =>{
    
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {email, password} = req.body

    try {
        let user = await User.findOne({email})

        //if not found user
        if(!user){
            return res.status(400).json({
                errors: [{msg: 'The email user does not exists!'}]
            })
        }

        //compare password if email user founded.
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                errors: [{msg: 'Wrong password, try again!'}]
            })
        }

        //payload jwt
        const payload = {user: {id: user.id}}
        jwt.sign(payload, process.env.JWT_SECRET,
                    {expiresIn: 360000},
                    (err, token) =>{
                        if(err) throw err
                        res.json({token})
                    }
                )

    } catch (error) {
        console.log(error)
        res.status(500).send('internal server error')
    }

 }

 module.exports = {signUp, signIn}
