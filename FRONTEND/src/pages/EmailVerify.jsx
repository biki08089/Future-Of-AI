import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { LoadingPage } from "./LoadingPage";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  const [load, setLoad] = useState(false);
  const { register, handleSubmit } = useForm();
  let userData = useSelector((state) => state.menu.userData);
  const navigate = useNavigate();
  const user = {
    name: userData.fullname,
    email: userData.email,
    acountType: userData.acountType,
    password: userData.password,
  };

  const otpverifiy = async (data) => {
    user.otp = data.otp;

    const sendUserDetails = await fetch(
      `${VITE_BASE_URL}/signup/verify/email`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const storeResponse = await sendUserDetails.json();
    const responseIs = storeResponse.success;
    const responseMassage = storeResponse.massage;
    setLoad(true);
    if (responseIs) {
      toast.success(responseMassage, { className: "bg-black" });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } else {
      toast.error(responseMassage);
      setTimeout(() => {
        navigate("/signup");
      }, 5000);
    }
  };
  return (
    <div className="h-[100vh] bg-black flex justify-center items-center font-[arial]">
      {load ? (
        <LoadingPage />
      ) : (
        <div className="h-[15rem] w-[18rem] flex flex-col items-center justify-center bg-cust-white rounded-md">
          <h1 className="text-center px-4 mb-3">
            OTP has been sent to your registered email Id. Enter Your 6 digit
            OTP below
          </h1>
          <form
            onSubmit={handleSubmit(otpverifiy)}
            className="flex flex-col items-center w-[100%]"
          >
            <input
              type="number"
              className="h-[3rem] w-[80%] text-center bg-cust-lightgray rounded-md"
              {...register("otp")}
              required
            />
            <button className="h-[2rem] mt-3 bg-black text-cust-white px-4 rounded-md">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmailVerify;
