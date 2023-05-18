const mongoose = require("mongoose");

const sampleData = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    default: "Guest",
  },
});

const SampleDataModel = mongoose.model("SampleData", sampleData);

module.exports = SampleDataModel;
