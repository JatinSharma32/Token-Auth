const SampleDataModel = require("../models/schema");
const express = require("express");
const remove = express.Router();

require("dotenv").config();

remove.get("/:username", async (req, res) => {
  try {
    const data = await SampleDataModel.deleteOne({
      name: req.params.username,
    }).exec();
    res.status(200).json({ msg: "Data deleted successfully", data: data });
  } catch (error) {
    res.status(500).json({ msg: "Data deletion failed", data: error });
  }
});

module.exports = remove;
