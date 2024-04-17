const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const dbconnect = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connection is successfull");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbconnect;
