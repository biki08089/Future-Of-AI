const express = require("express");
const wishListedItems = require("../model/wishListedItems");
const router = express.Router();
const sendAndSaveOTP = require("../controller/createOTP");
const verifyOtp = require("../controller/verifyOtp");
const login = require("../controller/login");
const updatePassword = require("../controller/updatePassword");
const wishList = require("../controller/wishList");

router.post("/signup/verify", sendAndSaveOTP);
router.post("/signup/verify/email", verifyOtp);
router.post("/login/success", login);
router.post("/login/forgotPass/updatePass", updatePassword);
router.post("/dashboard/wishlist", wishList);
router.post("/dasboard", async (req, res) => {
  try {
    const { email } = req.body;

    const wishlistedData = await wishListedItems
      .find({ email })
      .populate("items")
      .exec();
   
    if (wishlistedData) {
      res.status(200).json({
        success: true,
        data: wishlistedData,
        massage: "Wishlisted items fetched.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      massage: error.massage,
    });
  }
});
module.exports = router;
