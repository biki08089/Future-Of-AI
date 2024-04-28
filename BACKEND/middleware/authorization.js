const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

exports.authorization = async (req, res, next) => {
  try {
    //Here we are extracting token from the headers section..
    const token = req.header("Authorization").replace("Bearer ", "");

    //Check if token is available or not...
    if (!token) {
      return res.status(401).json({
        success: false,
        massage: "Token is missing",
      });
    }

    //Verify the token and extract the payload from it.
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    if (!payload) {
      return res.status(401).json({
        success: false,
        massage: "token is invalid.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token",
      error: error.message,
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.acountType == "Admin") {
      return res.status(200).json({
        success: true,
        acountType: "Admin",
        massage: "User has Admin access.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role is not matching",
    });
  }
};

exports.isRegular = (req, res) => {
  try {
    if (req.user.acountType == "Regular") {
      return res.status(200).json({
        success: true,
        acountType: "Regular",
        massage: "User has Regular access.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User Role is not matching",
    });
  }
};
