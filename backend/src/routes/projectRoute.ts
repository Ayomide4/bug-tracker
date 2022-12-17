import express from "express";
const router = express.Router()
import Project from "../models/projectModel";


router.route("/create").post((req, res) => {
  const title = req.body.title
  const newProject = new Project({
    title,
  })
  newProject.save()
})

module.exports = router