const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

// Add JWT auth from header BEARER

const auth = async (userExists, username, password) => {
  try {
    const passwordCheck = await bcryptjs.compare(
      password,
      userExists[0].password
    );
    return passwordCheck;
  } catch (error) {
    return error;
  }
};

module.exports = auth;
