const SampleDataModel = require("../models/schema");
const auth = require("../middleware/security/auth");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const login = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const token = jwt.sign(
      {
        username: username,
        email: email,
        role: role,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: "Authentication Success, now you can access [/curd]",
      data: { token: token },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server Error [ROUTE-LOGIN]", data: error });
    console.log(error);
  }
};

module.exports = login;
