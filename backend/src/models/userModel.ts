import mongoose from "mongoose";

const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  //teams: [String]
  teams: [ //array of teams
    {
      teamName: String,  //name of the team 
      manager: String, //manager of the team (gets special permissions)
      members: [
        { //list of members in the team
          memberName: String
        }
      ],
      projects: [{ //list of projects associated with the team
        title: String,
        status: String
      }]
    }
  ]
})

const User = mongoose.model('User', UserSchema)
export default User