import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TeamSchema = new Schema({
  teamName: String,
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  members: [
    {
      memberId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ],
  projects: [
    {
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      }
    }
  ]
})




const Team = mongoose.model("Team", TeamSchema)
export default Team