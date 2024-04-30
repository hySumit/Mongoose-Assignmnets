const mongoose = require("mongoose");
require("dotenv").config();

const connectionDb = async () => {
  mongoose.connect(process.env.MONGODB);
};

module.exports = connectionDb