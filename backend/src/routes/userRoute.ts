import express, { query } from 'express'
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
    teams: [
      {
        teamName: '',
        manager: '',
      }
    ]

  })
  res.status(201).send({success: 'user created'})
  newUser.save()
})

router.route("/login").post(async(req,res) => {
  const {email, password} = req.body
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

//get user with id
router.route('/user/:id').get(async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id)
    .then((user) => {
      if(user){
        res.status(200).send(user)
        //console.log(user)
      }
    })
    .catch((error) => {
      //res.status(404).send(error.data)
      res.status(404).send({message: 'error getting user data'})
    })
})


//create team and setting isAdmin
router.route('/user/teams/:id').patch(async (req, res) => {
  const title:string = req.body.title
  const manager:string = req.body.manager
  const id = req.params.id

  // {$push: {"teams": title}}
  User.findByIdAndUpdate(id, 
    {$set: {isAdmin: true, "teams": {teamName: title, manager: manager}}}
    )
    .then((user) => {
      if(user){
        res.status(200).send(user)
      }
    })
    .catch((error) => {
      console.log(error)
      res.status(404)
    })
})


//ADD MEMBER ROUTE
router.route('/user/teams/members/:id').post(async (req,res) => {
  const id = req.params.id
  const memberName = req.body.memberName

  User.findByIdAndUpdate(id, {$push: {"teams.$[].members" : {"memberName": memberName}}})
      .then((user) => {
        res.status(200).send(user)
      })
      .catch((error) => {
        res.status(404).send(error)
      })  
})

router.route('/user/teams/members/:id').get(async (req, res) =>{
  const id = req.params.id
  try{

    const members = await User.findById(id)
    res.status(200).send(members)
  } catch {
    res.status(404).send({error: "could not find user"})
  }
})



module.exports = router