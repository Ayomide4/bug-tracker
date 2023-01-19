import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TeamSchema = new Schema({
  title: String,
  manager: String,
  members: [],
  tickets: []
})

const Team = mongoose.model("Team", TeamSchema)
export default Team