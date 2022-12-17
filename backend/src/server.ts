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



// app.post("/project", async (req: Request, res: Response) => {

//   const newProject = new Project({
//     title: req.body.title
//   })
//   const createdProject = await newProject.save()
//   res.json(createdProject)
// })

app.use("/", require("./routes/projectRoute"))


mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log(`listening on port: ${process.env.PORT}`);
    app.listen(process.env.PORT)
  })
