import mongoose from "mongoose";

const Schema = mongoose.Schema

const TicketSchema = new Schema({
  title: String,
  desc: String,
  status: String,
  prio: String,
  dev: String,
})

const Ticket = mongoose.model("Ticket", TicketSchema)
export default Ticket