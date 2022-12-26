import express from "express";
const router = express.Router()
import Project from "../models/projectModel";


router.route("/project/create").post((req, res) => {
  const title = req.body.title
  const desc = req.body.desc
  const team = req.body.team
  const manager = req.body.manager
  const status = req.body.status

  const newProject = new Project({
    title,
    desc,
    manager,
    team,
    status
  })
  newProject.save()
})

router.route("/project/list").get(async (req, res) => {
  const projects = await Project.find()
  res.send(projects)
})

module.exports = router