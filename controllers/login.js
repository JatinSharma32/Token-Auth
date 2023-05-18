const SampleDataModel = require("../models/schema");
const auth = require("../middleware/security/auth");
const express = require("express");
const login = express.Router();
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

login.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  if (!(username && password && email)) {
    res.status(400).json({ msg: "All fields required", data: undefined });
  } else {
    try {
      const userExists = await SampleDataModel.find({ email: email });
      if (userExists.length === 0) {
        res.status(403).json({
          msg: "User doesn't exists please go to '/register'",
          data: undefined,
        });
      } else {
        const loginStatus = await auth(userExists, username, password);
        if (loginStatus) {
          res.status(200).json({ msg: "Login Success", data: loginStatus });
        } else {
          res.status(405).json({ msg: "Login Failed", data: loginStatus });
        }
      }
    } catch (error) {
      res.status(450).json({ msg: "An error occured", data: error });
      console.log("Error occured: ", error);
    }
  }
});

module.exports = login;
