import express, { response } from "express";
const router = express.Router()
import Team from "../models/teamModel";

// router.route('/team/create').post((req,res) =>{
//   const title = req.body.title
//   const manager = req.body.manager

//   const newTeam = new Team({
//     title, 
//     manager
//   })
//   newTeam.save()
//   res.status(200).send({message: "success team created", team: title, manager: manager})
// })

router.route('/team').get(async(req,res) => {
  const teams = await Team.find({}).populate({path: "manager"})
  res.send(teams)
})

module.exports = router