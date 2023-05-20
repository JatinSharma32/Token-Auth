const SampleDataModel = require("../models/schema");
const auth = require("../middleware/security/auth");

require("dotenv").config();

const remove = async (req, res) => {
  try {
    const { email } = req.body;
    const dataValue = await SampleDataModel.find({ email: email });
    if (!dataValue) {
      res.status(404).json({ msg: "Data not found", data: data });
    } else {
      const data = await SampleDataModel.deleteOne({
        email: email,
      }).exec();
      if (data.deletedCount) {
        res.status(200).json({ msg: "Data deleted successfully", data: data });
      } else {
        res.status(404).json({ msg: "Data not found", data: data });
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "Server Error [ROUTE-REMOVE]", data: error });
    console.log(error);
  }
};

module.exports = remove;
