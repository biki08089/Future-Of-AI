const userSchema = require("../model/userSchema");
const wishListedItems = require("../model/wishListedItems");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check the user if registered or not.
    let existingUser = await userSchema.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(200).json({
        success: false,
        massage: "User not registered. Please Sign up now",
      });
    }

    //compare user password.
    let passCompare = await bcrypt.compare(password, existingUser.password);
    if (!passCompare) {
      console.log("Login Failed.");
      return res.status(200).json({
        success: false,
        massage: "Password incorrect.",
      });
    }

    //Creates collection of documents inside the DB for future storing of wishlisted items.
    let findWishlist = await wishListedItems.findOne({ email });
    if (!findWishlist) {
      let createWishList = await wishListedItems.create({ email });
      if (!createWishList) {
        return res.status(200).json({
          success: false,
          massage: "Couldn't create wishlist data while login",
        });
      }
    }

    //Creating JWT Token
    const payload = {
      id: existingUser._id,
      email: existingUser.email,
      acountType: existingUser.acountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    return res.status(200).json({
      success: true,
      token,
      userAccType:existingUser.acountType,
      massage: "Logged in successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      massage: "Couldn't login",
    });
  }
};

module.exports = login;
