import express from "express";
const router = express.Router()
import Project from "../models/projectModel";
import Team from "../models/teamModel";



//CREATE PROJECT
router.route("/project/create").post(async (req, res) => {
  const title = req.body.title
  const desc = req.body.desc
  const team = req.body.team
  const manager = req.body.manager
  const status = req.body.status
  const date = req.body.date

  const newProject = new Project({
    title,
    desc,
    manager,
    team,
    status, 
    date
  })

  const teamMatch =  await Team.findOne({teamName: team})
  console.log(teamMatch)

  if(teamMatch === null){
    res.status(404).send({message: "TEAM DOESN'T EXIST"})
  }

  else if(teamMatch !== null){
    const updatedTeam = await Team.findOneAndUpdate({teamName: team}, {$push: {"projects": {projectId: newProject._id}}})
    res.status(200).send(updatedTeam)
  }

  newProject.save()
})

//LIST PROJECTS
router.route("/project/list").get(async (req, res) => {
  const projects = await Project.find()
  res.send(projects)
})


//DELETE PROJECTS
router.delete('/project/:id', (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then((project) => {
      if(!project) {
        return res.status(404).send()
      }
      res.send(project)
    })
    .catch((error) => {
      res.status(500).send(error);
  })
})

module.exports = router