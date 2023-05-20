const SampleDataModel = require("../models/schema");

require("dotenv").config();

const update = async (req, res) => {
  const obj = {};
  if (req.body.newName) {
    obj.username = req.body.newName;
  }
  if (req.body.newEmail) {
    obj.email = req.body.newEmail;
  }
  if (req.body.newRole) {
    obj.role = req.body.newRole;
  }
  console.log(obj);
  try {
    const data = await SampleDataModel.updateOne(
      { email: req.body.email },
      obj
    );
    const updateStatus = data.matchedCount
      ? { msg: "Data fetched", data: data, status: 200 }
      : { msg: "Data Not found", data: null, status: 404 };
    res.status(updateStatus.status).json(updateStatus);
  } catch (error) {
    res.status(500).json({ msg: "Data fetching error", data: error });
    console.log(error);
  }
};

module.exports = update;
