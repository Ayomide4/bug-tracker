import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

config();
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://bug-tracker-api.vercel.app/",
      "https://bug-tracker-rosy.vercel.app/",
      "https://aomotosho.tech",
    ],
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to Bug Tracker API");
});
mongoose.set("strictQuery", true);

app.use("/", require("./routes/projectRoute"));
app.use("/", require("./routes/ticketRoute"));
app.use("/", require("./routes/userRoute"));
app.use("/", require("./routes/teamRoute"));

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port: ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
