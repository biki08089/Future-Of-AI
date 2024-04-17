const userSchema = require("../model/userSchema");
const wishListedItems = require("../model/wishListedItems");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check the user if registered or not.
    let existingUser = await userSchema.findOne({ email });

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
    };
    return res.status(200).json({
      success: true,
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
