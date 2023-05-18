const SampleDataModel = require("../models/schema");
const express = require("express");
const add = express.Router();

require("dotenv").config();
add.get("/", async (req, res) => {
  try {
    // const tempObj = sampleData[Math. floor(Math.random() * 4)];
    const data = await SampleDataModel.create({
      name: req.body.name,
      techStack: req.body.techStack,
      gender: req.body.gender,
    });
    res.status(200).json({ msg: "Data added successfully", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Data addition failed", data: err });
  }
});

module.exports = add;
