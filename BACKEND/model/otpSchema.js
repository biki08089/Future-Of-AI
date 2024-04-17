const mongoose = require("mongoose");
const nodemailer=require("nodemailer");
require("dotenv").config({path:"../env"});


const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },

    otp: {
        type: Number,
        require: true,
    },
});

otpSchema.post("save",async function(doc){
    try {
        
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        
        // if(doc.email)

        const info = await transporter.sendMail({
            from: "Future AI, setupven@gmail.com",
            to: doc.email,
            subject: "Email Verification",
            text: "Welcome to our community.",
            html: `<h3 style="text-align:center">Welcome to "Future AI". Verify your email address by using below OTP. This otp will be valid only for "1 min"</h3><br><h1 style="text-align:center">${doc.otp}</h1>`,
        });
    } catch (error) {
        console.log(error);
    }

})

module.exports = mongoose.model("OTP", otpSchema);
