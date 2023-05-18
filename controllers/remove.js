const SampleDataModel = require("../models/schema");
const auth = require("../middleware/security/auth");
const express = require("express");
const remove = express.Router();

require("dotenv").config();

remove.delete("/", async (req, res) => {
  try {
    const dataValue = await SampleDataModel.find({ email: req.body.email });
    if (!dataValue) {
      res.status(404).json({ msg: "Data not found", data: data });
    } else {
      const authCheck = await auth(
        dataValue,
        req.body.username,
        req.body.password
      );
      if (authCheck) {
        const data = await SampleDataModel.deleteOne({
          email: req.body.email,
        }).exec();
        if (data.deletedCount) {
          res
            .status(200)
            .json({ msg: "Data deleted successfully", data: data });
        } else {
          res.status(404).json({ msg: "Data not found", data: data });
        }
      } else {
        res.status(450).json({ msg: "Auth Failed", data: null });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "Data deletion failed", data: error });
  }
});

module.exports = remove;
