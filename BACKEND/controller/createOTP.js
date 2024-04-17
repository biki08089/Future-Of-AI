const OTP = require("../model/otpSchema");
const { options } = require("../router/router");

const sendAndSaveOTP = async (req, res) => {
  try {
    const { email,password,confirmPassword } = req.body;
    const otp = Math.ceil(Math.random() * 899999) + 100000;
   
      
     //Checking all the details are filled....
     if(!email||!password||!confirmPassword){
      return res.status(201).json({
        success:false,
        massage:"Please fill all the details."
      })
     }


    //Matching password..
    if(!(password==confirmPassword)){
      return res.status(201).json({
        success:false,
        massage:"Password Mismatch!"
      })
    }

    // Creating an entry and deleting entry after 60 sec in db..
    const response = await OTP.create({ email, otp });
    setTimeout(async () => {
      const deleteData = await OTP.findOneAndDelete({ otp });
    }, 60000);
   

    res.status(200).json({
      success:true,
      massage:"OTP sent to the registered email"
    })



  } catch (error) {
    console.log(error);
    return res.status(500).json({
      massage: "Couldn't send OTP.",
    });
  }
};

module.exports = sendAndSaveOTP;
