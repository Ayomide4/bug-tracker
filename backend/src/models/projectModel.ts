import mongoose from "mongoose";

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

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
