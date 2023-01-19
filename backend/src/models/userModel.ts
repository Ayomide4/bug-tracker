import mongoose from "mongoose";

const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  teams: []
})

const User = mongoose.model('User', UserSchema)
export default User