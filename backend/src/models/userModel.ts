import mongoose from "mongoose";

const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  //teams: [String]
  teams: [
    {
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    },
  ],
}, {strictPopulate: false} as mongoose.SchemaOptions)


const User = mongoose.model('User', UserSchema)
export default User