import express from "express";
const router = express.Router();
import Project from "../models/projectModel";
import Team from "../models/teamModel";

//CREATE PROJECT
router.route("/project/create").post(async (req, res) => {
  const title = req.body.title;
  const desc = req.body.desc;
  const team = req.body.team;
  const manager = req.body.manager;
  const status = req.body.status;
  const date = req.body.date;
  const deadline = req.body.date;

  const newProject = new Project({
    title,
    desc,
    manager,
    team,
    status,
    deadline,
    date,
  });

  const teamMatch = await Team.findOne({ teamName: team });
  if (teamMatch === null) {
    return res.status(404).send({ message: "TEAM DOESN'T EXIST" });
  } else {
    newProject.save();
    const updatedTeam = await Team.findOneAndUpdate(
      { teamName: team },
      { $push: { projects: { projectId: newProject._id } } }
    );
    return res.status(200).send(updatedTeam);
  }
});

//LIST PROJECTS
router.route("/project/list").get(async (req, res) => {
  const projects = await Project.find().populate({ path: "tickets.ticketId" });
  res.send(projects);
});

router.route("/project").get(async (req, res) => {
  const projectTitle = req.body.title;
  const project:any = await Project.find({ title: projectTitle }).populate({
    path: "tickets.ticketId",
  });

  
  res.status(200).send(project);
});

//DELETE PROJECTS
router.delete("/project/:id", (req, res) => {
  const id = req.params.id;

  Project.findByIdAndDelete(id)
    .then((project) => {
      if (!project) {
        return res.status(404).send();
      }
      res.send(project);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});


//update project
router.route("/project/:id").patch(async (req, res) => {
  const newTitle = req.body.title;
  const newDesc = req.body.desc;
  const newDeadline = req.body.deadline;
  const newStatus = req.body.status;
  const id: string = req.params.id;


  await Project.findByIdAndUpdate(id, {
    $set: { title: newTitle, desc: newDesc, deadline: newDeadline, status: newStatus },
  })
    .then((project) => {
      res.status(200).send(project);
    })
    .catch((error) => {
      res.status(404).send({ error: "error updating project" });
    });
});

module.exports = router;
