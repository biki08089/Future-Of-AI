const cloudinary = require("cloudinary").v2;
const myPOST = require("../model/post");
const userSchema = require("../model/userSchema");
const wishListedItems = require("../model/wishListedItems");

const createPost = async (req, res) => {
  try {
    const file = req.files.uploadfile;
    const { title, catagory, maincontent, email } = req.body;

    let newTitle = "";

    const validation = () => {
      const titleArr = title.split(" ");
      titleArr.forEach((item) => {
        const extractPartOfstr = item.length - 1;
        const myString =
          item.substring(0, 1).toUpperCase() + item.substr(1, extractPartOfstr);
        newTitle = newTitle + " " + myString;
      });
    };
    validation();

    if (maincontent.length < 150) {
      return res.status(200).json({
        success: false,
        massage: "Your blog shouldn't be lesser than 150 words.",
      });
    }

    const user = await userSchema.findOne({ email });
    const author = user.name;

    //check if file format is supported or not....
    const supportedTypes = ["jpeg", "jpg", "png", "svg"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!supportedTypes.includes(fileType)) {
      return res.status(401).json({
        success: false,
        massage: "This file type isn't supported.",
      });
    }

    //Checking file size. Min file size 1MB & Max file size 5MB

    // const fileSize=file.size;
    // console.log(fileSize)
    // const fileSizeMB=fileSize/1000000
    // const maxSize=5;
    // if(!fileSizeMB<=maxSize){
    //   return res.status(401).json({
    //     success:false,
    //     massage:"File size is too large."
    //   })
    // };

    const options = {
      folder: "FUTURE-AI-POST",
      resource_type: "auto",
    };
    const uploadFileToCloud = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );
    const response = uploadFileToCloud;
    const secureImgURL = response.secure_url;
    // Check if same post alredy exists..
    const existingPost = await myPOST.findOne({ maincontent });
    const existingPostTitle = await myPOST.findOne({ title:newTitle });
    if (existingPost) {
      return res.status(200).json({
        success: false,
        massage: "A post with same content already exists.",
      });
    } else if (existingPostTitle) {
      return res.status(200).json({
        success: false,
        massage: "A post with same title name already exists.",
      });
    }

    //Now we are createing an entry of the post that a user has created inside the DB..
    const createPostEntry = await myPOST.create({
      email,
      author,
      title: newTitle,
      catagory,
      secureImgURL,
      maincontent,
    });

    return res.status(200).json({
      success: true,
      massage: "Post has been created successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      massage: error.massage,
    });
  }
};

module.exports = createPost;
