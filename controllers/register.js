const SampleDataModel = require("../models/schema");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userExists = await SampleDataModel.find({ email }, null, {
      limit: 1,
    }).exec();
    if (userExists.length) {
      //check of for error
      res.status(403).json({
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

      user.password = undefined;
      console.log(user);
      res.status(200).json({
        msg: "Data added successfully",
        data: { token: `Bearer ${token}` },
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error [ROUTE-REGISTER]", data: error });
    console.log(error);
  }
};

module.exports = register;
