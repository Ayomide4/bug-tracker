import mongoose, { Mongoose } from "mongoose";
import Team from "./teamModel";
import { response } from "express";
import Ticket from "./ticketModel";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: String,
  desc: String,
  manager: String,
  team: String,
  status: String,
  date: String,
  deadline: String,
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
  const Ticket = mongoose.model("Ticket");
  const id = this.getQuery()["_id"];

  await Team.findOneAndUpdate(
    { "projects.projectId": id },
    {
      $pull: { projects: { projectId: id } },
    }
  );

  next();
});



//delete tickets that are related to the project
async function removeTickets(doc: any) {
  let ticketList = doc.tickets.map(async (ticket: any, index: number) => {
    let tempId = ticket.ticketId;
    let objId = tempId.toString();
    await Ticket.findByIdAndDelete(objId);
  });
}

ProjectSchema.post("findOneAndDelete", removeTickets);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
