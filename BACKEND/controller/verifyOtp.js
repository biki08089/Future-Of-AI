const OTP = require("../model/otpSchema");
const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
const saltrounds = 10;
const verifyOtp = async (req, res) => {
  try {
    const { name, email,acountType, password, otp } = req.body;

   
   //Validating name .. That first letter of first name & last name must be a capital letter.
   let newName="";
   const validation=()=>{
      const nameArr=name.split(" ");
       nameArr.forEach((item)=>{
        const extractPartOfstr=item.length-1
          const myString= item.substring(0, 1).toUpperCase()+item.substr(1,extractPartOfstr);
          newName=newName+" "+myString;
        })
        
      }
      validation();
      console.log(newName)


    const checkOTP = await OTP.findOne({ otp });
    if (!checkOTP) {
      return res.status(200).json({
        success: false,
        massage: "Invalid OTP",
      });
    }

    //Check if the user has already signed up
    if (await userSchema.findOne({ email })) {
      return res.status(200).json({
        success: false,
        massage: "This email ID is already registered With us.",
      });
    }

    // Hashing the password..
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, saltrounds);
      
    } catch (error) {
      console.log(error);
    }
    // create and save user inside DB
    const createUser = await userSchema.create({
      name:newName,
      email,
      acountType,
      password: hashPassword,
    });
    return res.status(200).json({
      success: true,
      massage: "Acount created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      massage: error.massage,
    });
  }
};

module.exports = verifyOtp;
