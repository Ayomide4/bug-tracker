import express from 'express'
const router = express.Router()
import Ticket from '../models/ticketModel'

router.route("/ticket/create").post((req,res) => {
  const title = req.body.title
  const desc = req.body.desc
  const status = req.body.status
  const prio = req.body.prio
  const dev = req.body.dev
  
  const newTicket = new Ticket({
    title,
    desc,
    status,
    prio,
    dev
  })
  newTicket.save()
})

router.route("/ticket/list").get(async (req, res) => {
  const tickets = await Ticket.find()
  res.send(tickets)
})


module.exports = router
