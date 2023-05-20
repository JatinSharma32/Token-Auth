const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentSchema = require("../../models/schema");

const auth = async (req, res, next) => {
  try {
    const userExists = await studentSchema
      .find({ email: req.body.email }, null, {
        limit: 1,
      })
      .exec();
    if (userExists.length > 0) {
      const passwordCheck = await bcryptjs.compare(
        req.body.password,
        userExists[0].password
      );
      if (passwordCheck) {
        next();
      } else {
        res
          .status(401)
          .json({ msg: "Authentication Failed", data: passwordCheck });
      }
    } else {
      res.status(404).json({ msg: "User doesn't exists", data: 404 });
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error [Auth]", data: error });
  }
};

module.exports = auth;
