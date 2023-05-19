const SampleDataModel = require("../models/schema");

require("dotenv").config();

const update = async (req, res) => {
  const obj = {};
  if (req.body.newName) {
    obj.name = req.body.newName;
  }
  if (req.body.techStack) {
    obj.techStack = req.body.techStack;
  }
  if (req.body.gender) {
    obj.gender = req.body.gender;
  }
  try {
    const data = await SampleDataModel.updateOne({ name: req.body.name }, obj);
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
