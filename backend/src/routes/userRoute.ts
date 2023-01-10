import express from 'express'
const router = express.Router()
import User from '../models/userModel'
import bcrypt from 'bcryptjs'

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
  res.status(200).send({success: 'user created'})
  newUser.save()
})

module.exports = router