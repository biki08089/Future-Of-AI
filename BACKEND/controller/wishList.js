const wishlistSchema = require("../model/wishList");
const itemsWishlisted = require("../model/wishListedItems");

const wishList = async (req, res) => {
  try {
    const { id, title, email, description, tag, image, value } = req.body;

    let createWishList;
    let wishListedItems;

    if (value == "add") {
      createWishList = await wishlistSchema.create({
        id,
        title,
        tag,
        image,
        description,
      });

      wishListedItems = await itemsWishlisted
        .findOneAndUpdate(
          { email },
          { $push: { items: createWishList._id } },
          { new: true }
        )
        .populate("items")
        .exec();
    } else {
      createWishList = await wishlistSchema.findOneAndDelete({ title });

      wishListedItems = await itemsWishlisted
        .findOneAndUpdate(
          { email },
          { $pull: { items: createWishList._id } },
          { new: true }
        )
        .populate("items")
        .exec();
    }

    res.status(200).json({
      success: true,
      data: wishListedItems.items,
      massage: "Data has been created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      massage: error.massage,
    });
  }
};

module.exports = wishList;
