const userSchema = require("../model/userSchema");
const wishListedItems = require("../model/wishListedItems");
const likes = require("../model/likes");
const read = require("../model/read");

const deleteAccount = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const userDelete = await userSchema.findOneAndDelete({ email });

    const deleteWishlistedItems = await wishListedItems.findOneAndDelete({
      email,
    });

    const pullFromLikes = await likes.findOneAndUpdate(
      { email },
      { $pull: { usersLiked: deleteWishlistedItems._id } },
      { new: true }
    );
    const pullFromRead = await read.findOneAndUpdate(
      { email },
      { $pull: { usersReadPost: deleteWishlistedItems._id } },
      { new: true }
    );
    // const
    res.status(200).json({
      success: true,
      massage: "Acount deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      massage: "Account couldn't be deleted.",
    });
  }
};

module.exports = deleteAccount;
