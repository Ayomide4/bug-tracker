import express, { query } from 'express'
const router = express.Router()
import User from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Team from '../models/teamModel'




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
    teams: []

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

//GET USER WITH ID
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


//CREATE TEAM AND SET IS ADMIN
router.route('/user/teams/:id').patch(async (req, res) => {
  const newTeam = new Team({
    teamName: req.body.title,
    manager: req.params.id,
  })
  const id:string = req.params.id


  // {$push: {"teams": title}}
  User.findByIdAndUpdate(id, 
    {$set: {isAdmin: true, teams: {team: id}}})
      .then((user) => {
        if(user){
          newTeam.save()
          res.status(200).send(user)
        }
      })
      .catch((error) => {
        console.log(error)
        res.status(404)
      })

  //CREATE NEW TEAM AND SETS ISADMIN TRUE
  // User.findById(manager, {$set: {isAdmin: true}}, {$push: {"teams": manager}})  
  // 
  // res.status(200).send(newTeam)
  // newTeam.save()
})


//ADD MEMBER ROUTE
router.route('/user/teams/members/:id').post(async (req,res) => {
  const id = req.params.id
  const memberName = req.body.memberName

  User.findByIdAndUpdate(id, {$push: {"teams.$[].members" : {"memberName": memberName}}})
    .then(response => {
      User.findOneAndUpdate({firstName: memberName}, {$push: {"_id": id}})
        .then((user) => {
          res.status(200).send({message: "success added team"})
        })
        .catch((error) => {
          res.status(404).send({error: "could not add team"})
        })
    })
      
})






module.exports = router