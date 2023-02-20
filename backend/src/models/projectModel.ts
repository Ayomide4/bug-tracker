import mongoose, { Mongoose } from "mongoose";
import Team from "./teamModel";
import { response } from "express";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: String,
  desc: String,
  manager: String,
  team: String,
  status: String,
  date: String,
  tickets: [
    {
      ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    },
  ],
});

//deletes ref id from team when deleting project
ProjectSchema.pre("findOneAndDelete", async function (next) {
  const Team = mongoose.model("Team");
  const Ticket = mongoose.model("Ticket")
  const id = this.getQuery()["_id"];

  await Team.findOneAndUpdate(
    { "projects.projectId": id },
    {
      $pull: { projects: { projectId: id } },
    }
  );

  await Ticket.deleteMany()

  next();
});





const Project = mongoose.model("Project", ProjectSchema);
export default Project;
