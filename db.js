const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoURL = process.env.DB_CONNECT_STRING;

const connectMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("Conected to mongo");
  });
};

module.exports = connectMongo;
