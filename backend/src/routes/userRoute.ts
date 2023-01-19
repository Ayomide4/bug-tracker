import express from 'express'
const router = express.Router()
import User from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'




router.route("/register").post(async(req,res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = req.body.password
  const isAdmin = req.body.isAdmin


  const encryptedPassword = await bcrypt.hash(password, 10)
  const oldUser = await User.findOne({email})



  if(oldUser){
    return res.status(409).send({error: "User Exists"})
    //see if email is already in db
  }
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: encryptedPassword, 
    isAdmin,

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
      const token = jwt.sign({id: user.id, email: user.email, isAdmin: user.isAdmin}, process.env.JWT_SECRET!) 
      return res.json({message: 'login success', data: token, id: user.id, isAdmin: user.isAdmin})    
    }
  }
  return res.status(404).json({error: 'Incorrect password'})
})

//update admin
router.route('/user/:id').patch(async(req, res) => {
  let id = req.params.id
  User.findByIdAndUpdate(id, {isAdmin: true})
    .then((user) => {
      if(user){
        res.status(200).send({message: 'success'})
      }})
    .catch((error) => {
      res.status(404).send({message: 'there was an error'})
    })
})

router.route('/user/teams/:id').patch(async (req, res) => {
  let title = req.body.title
  let id = req.params.id
  console.log(title, id)

  User.findByIdAndUpdate(id, {$push: {"teams": title}})
    .then((user) => {
      if(user){
        res.status(200).send({message: 'success added team'})
      }
    })
    .catch((error) => {
      res.status(404).send({message: 'there was an error adding team'})
    })

  
  

})


module.exports = router