const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  catagory: {
    type: String,
    require: true,
  },
  secureImgURL: {
    type: String,
    require: true,
  },
  maincontent: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("myPOST", postSchema);
