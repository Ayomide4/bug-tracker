import express from 'express'
const router = express.Router()
import User from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


interface userType{
  email: string
  password: string
}

const JWT_SECRET= "JDLFKSJDLFKJ2324SADFljkdasfsldkfna23qrwer"

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
  const user = await User.findOne({email})
  if(!user){
    return res.status(400).send({error: 'user not found'})
  }
  
  if(user){
    if(await bcrypt.compare(password, user.password!)){
      const token = jwt.sign({}, JWT_SECRET)
  
      if(res.status(201)){
        return res.json({status: "ok", data: token})
      } else {
        return res.json({error: "error"})
      }
    }
  }
  res.json({status: "error", error: "invalid password"})
})

module.exports = router