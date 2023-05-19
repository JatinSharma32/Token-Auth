const SampleDataModel = require("../models/schema");

require("dotenv").config();

const search = async (req, res) => {
  try {
    const data = await SampleDataModel.find({ email: req.body.email }, null, {
      limit: 1,
    }).exec();
    console.log(data);
    const tempObj =
      data.length > 0
        ? { msg: "Data fetched", data: data, status: 200 }
        : { msg: "Data not found", data: null, status: 404 };
    res.status(tempObj.status).json(tempObj);
  } catch (error) {
    res.status(500).json({ msg: "Data fetch failed", data: error });
  }
};

module.exports = search;
