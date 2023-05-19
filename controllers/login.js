const SampleDataModel = require("../models/schema");
const auth = require("../middleware/security/auth");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const login = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    if (!(username && email && role)) {
      res.status(400).json({ msg: "All fields required", data: undefined });
    } else {
      const token = jwt.sign(
        {
          username: username,
          email: email,
          role: role,
        },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .json({ msg: "Authentication Success", data: { token: token } });
    }
  } catch (error) {
    res.status(450).json({ msg: "An error occured", data: error });
    console.log("Error occured: ", error);
  }
};

module.exports = login;
