const express = require("express");
const wishListedItems = require("../model/wishListedItems");
const router = express.Router();
const sendAndSaveOTP = require("../controller/createOTP");
const verifyOtp = require("../controller/verifyOtp");
const login = require("../controller/login");
const updatePassword = require("../controller/updatePassword");
const wishList = require("../controller/wishList");
const {
  authorization,
  isAdmin,
  isRegular,
} = require("../middleware/authorization");
const createPost = require("../controller/createPost");
const myPOST = require("../model/post");
const deletePost = require("../controller/deletePost");
const likeAndRead = require("../controller/likeAndRead");
const getUserLike_readData = require("../controller/getUserLike_readData");
const userSchema = require("../model/userSchema");
const profilePicUpload = require("../controller/profilePicUpload");
const deleteAccount = require("../controller/deleteAccount");

router.post("/signup/verify", sendAndSaveOTP);
router.post("/signup/verify/email", verifyOtp);
router.post("/login/success", login);
router.post("/login/success/authorization", authorization, isAdmin, isRegular);
router.post("/admin/createpost", createPost);
router.post("/admin/deletepost", deletePost);
router.post("/login/forgotPass/updatePass", updatePassword);
router.post("/dashboard/wishlist", wishList);
router.post("/like_read", likeAndRead);
router.post("/getuserData", getUserLike_readData);
router.post("/user/profileupload",profilePicUpload)
router.post("/delete/account",deleteAccount)
router.post("/dasboard", async (req, res) => {
  try {
    const { email } = req.body;

    const wishlistedData = await wishListedItems
      .find({ email })
      .populate("items")
      .populate("itemsLikedfromCreatorPage")
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

router.post("/admin/getpost", async (req, res) => {
  try {
    const { email } = req.body;

    //Find all the post related to the above email id, that we have in our req body..

    const allPost = await myPOST.find({ email });

    return res.status(200).json({
      success: true,
      post: allPost,
      massage: "Fetched all posts successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      massage: "Couldn't fetch posts",
    });
  }
});


router.post("/getuser", async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await userSchema.findOne({ email });
    res.status(200).json({
      success: true,
      user: findUser,
      massage: "User Found.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      massage: "Couldn't get user data",
    });
  }
});


router.get("/login/dashboard/allpost", async (req, res) => {
  try {
    const allpost = await myPOST.find();
    return res.status(200).json({
      success: true,
      post: allpost,
      massage: "Posts are loaded successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      massage: "Unable to Load",
    });
  }
});

module.exports = router;
