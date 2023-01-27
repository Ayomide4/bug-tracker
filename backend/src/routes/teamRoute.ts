import express, { response } from "express";
const router = express.Router()
import Team from "../models/teamModel";
import User from "../models/userModel";

//get teams and populate
router.route('/team').get(async(req,res) => {
  const teams = await Team.find({}).populate({path: "members.memberId"})
  .populate({path: "manager", select: "fullName"})
  .populate({path: "members.memberId", select: "fullName"})
  res.send(teams)
})

//get and populate manager and members 
router.route('/team/:id').get(async (req,res)=> {
  const id = req.params.id
  const team = await Team.findOne({manager: id})
    .populate({path: "manager", select: "fullName"})
    .populate({path: "members.memberId", select: "fullName"})
  res.send(team)
})

//ADD MEMBER
router.route('/team/members/:id').patch(async (req,res) => {
  const id = req.params.id
  const memberName = req.body.memberName

  //find user that matches member name
  const member = await User.findOne({fullName: memberName})
  
  //if user could not be found
  if(!member){
    res.status(404).send({error: "member does not exist"})
  } 
  
  if (member){
    const alreadyMember = await Team.findOne({"manager": id,"members.memberId": member._id})
    if(alreadyMember){
      res.status(409).send({message: `${memberName} is already in your team`})
    }

  else{ 
      const team = await Team.findOneAndUpdate({"manager": id}, {$push: { "members": {memberId : member._id}}})
      
      //push team reference id to the member we just added
      await User.findOneAndUpdate({fullName: memberName}, {$push: {"teams": {"team": team?._id}}})
      res.status(200).send({team})
    }

  }

})



module.exports = router