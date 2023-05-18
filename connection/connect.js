const mongoose = require("mongoose");
const env = require("dotenv");
env.config();

const MongoAtlasURI = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.ksfepxa.mongodb.net/${process.env.MONGO_ATLAS_DATABASE}?retryWrites=true&w=majority`;

async function connect() {
  await mongoose
    .connect(MongoAtlasURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log("Connected to MongoDB Atlas: ");
    })
    .catch((err) => console.log(err));
}
module.exports = connect;
