const express = require("express");
const Router = express.Router();

const crudVal = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({
        msg: "All fields are required [email,password]",
        data: null,
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ msg: "Server error [Validation]", data: error });
  }
};

Router.delete("/", crudVal);

Router.patch("/", crudVal);

Router.get("/", crudVal);

module.exports = Router;
