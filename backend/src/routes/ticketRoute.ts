import express from "express";
const router = express.Router();
import Ticket from "../models/ticketModel";
import Project from "../models/projectModel";

router.route("/ticket/create").post(async (req, res) => {
  const title = req.body.title;
  const desc = req.body.desc;
  const status = req.body.status;
  const prio = req.body.prio;
  const dev = req.body.dev;
  const project = req.body.project;

  const newTicket = new Ticket({
    title,
    desc,
    status,
    prio,
    dev,
  });

  const projectMatch = await Project.findOne({ title: project });
  if (projectMatch === null) {
    res.status(404).send({ error: "Project does not exist" });
  } else {
    const ticketLength = await Project.findOne({
      title: project,
      "tickets.0": { $exists: true },
    });

    if (ticketLength === null) {
      newTicket.save();
      const updatedProject = await Project.findOneAndUpdate(
        { title: project },
        { $set: { tickets: {ticketId: newTicket._id} } }
      );
      res.status(200).send(updatedProject);
    } else {
      newTicket.save();
      const updatedProject = await Project.findOneAndUpdate(
        { title: project },
        { $push: { tickets: {ticketId: newTicket._id} } }
      );
      res.status(200).send(updatedProject);
    }
  }
});

router.route("/ticket/list").get(async (req, res) => {
  const tickets = await Ticket.find();
  res.send(tickets);
});



module.exports = router;
