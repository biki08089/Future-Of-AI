const userSchema = require("../model/userSchema");
const OTP = require("../model/otpSchema");
const bcrypt = require("bcrypt");
const saltrounds = 10;

const updatePassword = async (req, res) => {
  try {
    const { email, password,otp } = req.body;
   
    const checkMail=await userSchema.findOne({email});
    if(!checkMail){
      return res.status(200).json({
        success: false,
        massage: "Invalid e-mail id",
      });
    }


    //Check otp is valid or not...
    const checkOTP = await OTP.findOne({ otp });
    if (!checkOTP) {
      return res.status(200).json({
        success: false,
        massage: "Invalid OTP",
      });
    }

    //Hash the password first...
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, saltrounds);
    } catch (error) {
      console.log(error);
      return res.status.json({
        success: false,
        massage: "Password couldn't be hashed",
      });
    }

    //Check if user already exists..
    const checkUser = await userSchema.findOne({ email });
    const id = checkUser._id;

    //Update password....
    if (checkUser) {
      const update = await userSchema.findByIdAndUpdate(
        { _id: id },
        { password: hashPassword }
      );
    } else {
      return res.status(201).json({
        success: false,
        massage: "User doesn't exist.",
      });
    }


    return res.status(200).json({
      success: true,
      massage: "Password Updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status.json({
      success: false,
      massage: "Couldn't update password.",
    });
  }
};

module.exports = updatePassword;
