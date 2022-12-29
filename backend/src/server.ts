import express, { Request, Response} from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Project from './models/projectModel'
import {config} from 'dotenv'

config()
const app = express()
app.use(cors())
app.use(express.json())
mongoose.set('strictQuery', true);



app.use("/", require("./routes/projectRoute"))
app.use("/", require("./routes/ticketRoute"))


mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`listening on port: ${process.env.PORT}`);
    app.listen(process.env.PORT)
  })
