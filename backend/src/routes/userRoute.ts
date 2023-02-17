import express, { query } from "express";
const router = express.Router();
import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Team from "../models/teamModel";

router.route("/register").post(async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const fullName = `${firstName} ${lastName}`;
  const email = req.body.email;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;
  const encryptedPassword = await bcrypt.hash(password, 10);
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(409).send({ error: "User Exists" });
    //see if email is already in db
  }
  const newUser = new User({
    fullName,
    email,
    password: encryptedPassword,
    isAdmin,
    teams: [],
  });
  res.status(201).send({ success: "user created" });
  newUser.save();
});

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  if (user) {
    if (await bcrypt.compare(password, user.password!)) {
      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET!
      );
      return res.json({
        message: "login success",
        data: token,
        id: user.id,
        isAdmin: user.isAdmin,
      });
    }
  }
  return res.status(404).json({ error: "Incorrect password" });
});

router.route("/users").get(async (req, res) => {
  const users = await User.find({}).populate({
    path: "teams.team",
    select: "teamName",
  });

  res.send(users);
});

//GET USER WITH ID
router.route("/user/:id").get(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate({ path: "teams.team" });

  res.status(200).send(user);
});

//CREATE TEAM AND SET IS ADMIN
router.route("/user/teams/:id").patch(async (req, res) => {
  //create new team obj
  const newTeam = new Team({
    teamName: req.body.title,
    manager: req.params.id,
    "members.0": { memberId: req.params.id },
  });

  const id: string = req.params.id;

  //FINDS USER AND UPDATES ADMIN TO TRUE
  //CREATES NEW TEAM IN TEAM DOC WITH USER/MANAGER AS REF

  const userQuery = await User.findOne({
    _id: id,
    "teams.0": { $exists: true },
  });

  //IF USER HAS NO TEAMS
  if (userQuery === null) {
    User.findByIdAndUpdate(id, {
      $set: { isAdmin: true, teams: { team: newTeam._id } },
    })
      .then((user) => {
        if (user) {
          newTeam.save();
          res.status(200).send(user);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(404);
      });
  }

  //IF USER HAS AT LEAST ONE TEAM
  //THIS IS SO WE CAN ADD A NEW TEAM INSTEAD OF OVERRIDING THE OTHER TEAMS
  if (userQuery !== null) {
    const user = await User.findById(id);

    User.findByIdAndUpdate(id, {
      $push: { teams: { team: newTeam._id } },
      $set: { isAdmin: true },
    })
      .then((userData) => {
        newTeam.save();
        res.status(200).send(user);
      })
      .catch((error) => {
        res.status(400).send({ error: error });
      });
  }
});



module.exports = router;
