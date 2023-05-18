const SampleDataModel = require("../models/schema");
const express = require("express");
const add = express.Router();
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

add.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  if (!(username && password && email)) {
    res.status(400).json({ msg: "All fields required", data: undefined });
  } else {
    try {
      const userExists = await SampleDataModel.find({ email: email });
      if (userExists.length > 0) {
        res
          .status(403)
          .json({
            msg: "User already exists please visit '/login'",
            data: userExists,
          });
      } else {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await SampleDataModel.create({
          username: username,
          password: hashedPassword,
          email: email,
        });

        const token = jwt.sign(
          {
            username: user.username,
            email: user.email,
            role: user.role,
          },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: "1h" }
        );

        user.token = token;
        user.password = undefined;
        res.status(200).json({ msg: "Data added successfully", data: user });
      }
    } catch (error) {
      res.status(450).json({ msg: "An error occured", data: error });
      console.log("Error occured: ", error);
    }
  }
});

module.exports = add;
