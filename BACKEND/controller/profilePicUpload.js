const userSchema = require("../model/userSchema");
const cloudinary = require("cloudinary").v2;

const uploadProfilePic = async (req, res) => {
  try {
    const file = req.files.uploadfile;
    const { email } = req.body;

    //check if file format is supported or not....
    const supportedTypes = ["jpeg", "jpg", "png", "svg", "webp"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!supportedTypes.includes(fileType)) {
      return res.status(401).json({
        success: false,
        massage: "This file type isn't supported.",
      });
    }

    //Uploading file to the cloud....
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

    //updating in the db
    const updateUser = await userSchema.findOneAndUpdate(
      { email },
      { profilePicUrl: secureImgURL },
      { new: true }
    );
    updateUser.password = undefined;
    res.status(200).json({
      success:true,
      user:updateUser,
      massage: "Profile updated successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      success:false,
      massage:"Profile picture couldn't be uploaded"
    })
  }
};

module.exports = uploadProfilePic;
