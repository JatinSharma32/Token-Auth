const SampleDataModel = require("../models/schema");
const express = require("express");
const search = express.Router();

require("dotenv").config();

search.get("/:username", async (req, res) => {
  try {
    const data = await SampleDataModel.find(
      { name: req.params.username },
      null,
      { limit: 1 }
    ).exec();
    console.log(data);
    const tempObj = data.length
      ? { msg: "Data fetched", data: data, status: 200 }
      : { msg: "Data not found", data: null, status: 404 };
    res.status(tempObj.status).json(tempObj);
  } catch (error) {
    res.status(500).json({ msg: "Data fetch failed", data: error });
  }
});

module.exports = search;
