import express from 'express'
const router = express.Router()
import User from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

interface userType{
  email: string
  password: string
}



router.route("/register").post(async(req,res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = req.body.password

  const encryptedPassword = await bcrypt.hash(password, 10)
  const oldUser = await User.findOne({email})


  if(oldUser){
    return res.send({error: "User Exists"})
    //see if email is already in db
  }
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: encryptedPassword
  })
  res.status(201).send({success: 'user created'})
  newUser.save()
})

router.route("/login").post(async(req,res) => {
  const {email, password} = req.body
  //console.log('REQUEST BODY login route', req.body)
  const user = await User.findOne({email})
  if(!user){
    return res.status(404).json({error: 'user not found'})
  }
  if(user){
    if(await bcrypt.compare(password, user.password!)){
      const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET!) 
      return res.json({message: 'login success', data: token})    
    }
  }
  return res.status(404).json({error: 'Incorrect password'})
})





module.exports = router