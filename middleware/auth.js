const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const SampleDataModel = require("../models/schema");
const mongoose = require("mongoose");

const login = (email, hashedPassword) => {};

const signup = async (username, password, email, role) => {
  if (!(username && password && email)) {
    return 400;
  }
  //implement user already exists
  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = await SampleDataModel.create({});
};
