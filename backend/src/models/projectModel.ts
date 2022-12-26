import mongoose from 'mongoose'

const Schema = mongoose.Schema
//const objectId = Schema.Types.ObjectId

const ProjectSchema = new Schema({
  title: String,
  desc: String,
  manager: String,
  team: String,
  status: String,
})

const Project = mongoose.model("Project", ProjectSchema)
export default Project