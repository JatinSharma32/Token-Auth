const express = require("express");
const { route } = require("../../routes/studentRoutes");
const Router = express.Router();

Router.post("/", (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      res.status(400).json({
        msg: "All fields are required [username,email,password]",
        data: null,
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error [Validation]", data: error });
  }
});

module.exports = Router;
