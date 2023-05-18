const mongoose = require("mongoose");
const express = require("express");

const connect = require("./connection/connect");
const add = require("./controllers/register");
const remove = require("./controllers/remove");
const search = require("./controllers/search");
const update = require("./controllers/update");

const SampleDataModel = require("./models/schema");
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/register", add);
app.use("/remove", remove);
app.use("/search", search);
app.use("/update", update);
connect();

const MongoAtlasURI = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.ksfepxa.mongodb.net/${process.env.MONGO_ATLAS_DATABASE}?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Home page" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started at: ", process.env.PORT);
});
