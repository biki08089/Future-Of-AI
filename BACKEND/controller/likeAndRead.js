const likes = require("../model/likes");
const read = require("../model/read");
const ItemsWishListed = require("../model/wishListedItems");

const likeAndRead = async (req, res) => {
  try {
    const { id, title, email, tag, image, description, author, value } =
      req.body;

    // Check  value variable
    if (value == "readMoreButton") {
      //Create an entry inside the "read" db collection, which post the user has read.
      let theID;
      const findReadPost = await read.findOne({ id });
      if (!findReadPost) {
        const userRead = await read.create({ id, title });
        theID = userRead._id;
      } else {
        theID = findReadPost._id;
      }
      //   console.log(theID);
      /*Push the object id of the data which we just have created inside the "read" db collection inside the 
      "ItemsWishListed" db collection's related post's read array section, key name is "itemsReadfromCreatorPage"*/
      const pushData = await ItemsWishListed.findOneAndUpdate(
        { email },
        {
          $push: { itemsReadfromCreatorPage: theID },
        },
        { new: true }
      )
        .populate("itemsReadfromCreatorPage")
        .exec();

      //We are going to push the id of "pushData._id" inside the "like db collection  .
      const pushDatatoReadDB = await read
        .findOneAndUpdate(
          { id },
          { $push: { usersReadPost: pushData._id } },
          { new: true }
        )
        .populate("usersReadPost")
        .exec();

        return res.status(200).json({
          success:true,
          userData:pushData,
          readData:pushDatatoReadDB,
          masssage:"Post Loaded"
        })
    } else {
      //Finding the id of "like" which has already created or not.
      let theID;
      const findLikePost = await likes.findOne({ id });
      if (!findLikePost) {
        const userLike = await likes.create({
          id,
          title,
          tag,
          image,
          description,
          author,
        });
        theID = userLike._id;
      } else {
        theID = findLikePost._id;
      }

      //Here we will perform operation whether someone liked the post or removed like from that post.
      if (value == "add") {
        //If user liked a post.....

        /*Push the object id of the data which we just have created inside the "like" db collection inside the 
      "ItemsWishListed" db collection's related post's like array section, key name is "itemsLikedfromCreatorPage"*/
        const pushData = await ItemsWishListed.findOneAndUpdate(
          { email },
          {
            $push: { itemsLikedfromCreatorPage: theID },
          },
          { new: true }
        )
          .populate("items").populate("itemsLikedfromCreatorPage")
          .exec();

        //We are going to push the id of "pushData._id" inside the "like db collection  .
        const pushDatatolikesDB = await likes
          .findOneAndUpdate(
            { id },
            { $push: { usersLiked: pushData._id } },
            { new: true }
          )
          .populate("usersLiked")
          .exec();

          return res.status(200).json({
            success:true,
            userData:pushData,
            likeData:pushDatatolikesDB,
            massage:"Liked 👍"
          })
      } else {
        //if user removed the like..
        const pullData = await ItemsWishListed.findOneAndUpdate(
          { email },
          {
            $pull: { itemsLikedfromCreatorPage: theID },
          },
          { new: true }
        )
        .populate("items").populate("itemsLikedfromCreatorPage")
        .exec();

        //We are going to push the id of "pushData._id" inside the "like db collection  .
        const pullDataFromlikesDB = await likes
          .findOneAndUpdate(
            { id },
            { $pull: { usersLiked: pullData._id } },
            { new: true }
          )
          .populate("usersLiked")
          .exec();

          return res.status(200).json({
            success:true,
            userData:pullData,
            likeData:pullDataFromlikesDB,
            massage:"Like Removed 👍"
          })
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      massage: "Error occured",
    });
  }
};

module.exports = likeAndRead;
