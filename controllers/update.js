const SampleDataModel = require("../models/schema");

require("dotenv").config();

const update = async (req, res) => {
  const { newName, newEmail, newRole, email } = req.body;
  const obj = {};
  if (req.body.newName) {
    obj.username = newName;
  }
  if (req.body.newEmail) {
    obj.email = newEmail;
  }
  if (req.body.newRole) {
    obj.role = newRole;
  }
  console.log(obj);
  try {
    const data = await SampleDataModel.updateOne({ email: email }, obj);
    const updateStatus = data.matchedCount
      ? { msg: "Data fetched", data: data, status: 200 }
      : { msg: "Data Not found", data: null, status: 404 };
    res.status(updateStatus.status).json(updateStatus);
  } catch (error) {
    res.status(500).json({ msg: "Server Error [ROUTE-UPDATE]", data: error });
    console.log(error);
  }
};

module.exports = update;
