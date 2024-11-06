const mongoose = require("mongoose");
const debug = require("debug")("development:mongoose");
require('dotenv').config(); 

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(`${MONGODB_URI}/scatch`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    debug("connected");
  })
  .catch((err) => {
    debug("MongoDB connection error:", err);
  });

module.exports = mongoose.connection;

