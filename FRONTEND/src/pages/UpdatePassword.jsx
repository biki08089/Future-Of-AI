import React, { useState } from "react";
import robot from "../images/logo/robot.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import toast from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
  changePasstype,
  changePasstype2nd,
} from "../redux/firstSlice/firstSlice";
import { LoadingPage } from "./LoadingPage";

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [rout, setRout] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passType = useSelector((state) => {
    return state.menu.passType;
  });
  const passType2nd = useSelector((state) => {
    return state.menu.passType2nd;
  });

  const updatePass = async (data) => {
   
    let apiEndPoint;
    if (!rout) {
      apiEndPoint = "/signup/verify";
      console.log("i am false");
    } else {
      setLoading(true);
      apiEndPoint = "/login/forgotPass/updatePass";
      console.log("i am true");
    }
    setRout(true);

    let finalApiRout = `${VITE_BASE_URL}${apiEndPoint}`;
    console.log(finalApiRout);
    const sendUserdata = await fetch(finalApiRout, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await sendUserdata.json();
    const responseIs = response.success;
    if (responseIs) {
      toast.success(response.massage);
    } else {
      setLoading(false)
      toast.error(response.massage);
    }

    apiEndPoint == "/login/forgotPass/updatePass"
      ? setTimeout(() => {
          navigate("/login");
        }, 2000)
      : setTimeout(() => {
          setRout(false);
        }, 60000);
  };

  const passwordType = () => {
    dispatch(changePasstype());
  };
  const passwordType2nd = () => {
    dispatch(changePasstype2nd());
  };

  return (
    <>
      {loading ? (
        <div className="h-[100vh] bg-black flex justify-center items-center">
          <LoadingPage />
        </div>
      ) : (
        <div className="h-[100vh]  flex flex-col justify-center items-center bg-black">
          <div data-aos="zoom-in" className="bg-black p-4 rounded-[50%]">
            <img
              src={robot}
              className="h-[5rem] w-[5rem] animate-bounceb"
              alt="No image"
            />
          </div>
          <div data-aos="zoom-out">
            <form
              onSubmit={
                rout
                  ? handleSubmit(updatePass)
                  : (event) => {
                      event.preventDefault();
                      toast.error("Invalid OTP");
                    }
              }
              className="text-sm bg-cust-white h-[26rem] w-[18rem] px-4 py-4 rounded-xl mt-3 font-[arial] font-medium"
            >
              <label className="" htmlFor="email">
                Email Id
              </label>
              <br />
              <input
                className="bg-cust-lightgray pl-3 mt-1 h-[2.5rem] w-[100%] rounded-2xl mb-3"
                placeholder="Enter you email id"
                type="text"
                name="email"
                required
                {...register("email")}
              />
              <br />
              <label htmlFor="password">New Password</label>
              <br />
              <input
                className="bg-cust-lightgray pl-3 mt-1 h-[2.5rem] w-[100%] rounded-2xl mb-3"
                placeholder="Password"
                minLength="6"
                maxLength="10"
                type={passType ? "text" : "password"}
                name="password"
                required
                {...register("password")}
              />
              {passType ? (
                <IoIosEyeOff
                  onClick={() => {
                    passwordType();
                  }}
                  className="absolute text-cust-lite-black w-[22px] h-[22px] top-[8.7rem] right-[2.2rem]"
                />
              ) : (
                <IoMdEye
                  onClick={() => {
                    passwordType();
                  }}
                  className="absolute text-cust-lite-black w-[22px] h-[22px] top-[8.7rem] right-[2.2rem]"
                />
              )}
              <br />
              <label htmlFor="password">Confirm Password</label>
              <br />
              <input
                className="bg-cust-lightgray pl-3  mt-1 h-[2.5rem] w-[100%] rounded-2xl mb-3"
                placeholder="Confirm Password"
                minLength="6"
                maxLength="10"
                type={passType2nd ? "text" : "password"}
                name="password"
                required
                {...register("confirmPassword")}
              />
              {passType2nd ? (
                <IoIosEyeOff
                  onClick={() => {
                    passwordType2nd();
                  }}
                  className="absolute text-cust-lite-black w-[22px] h-[22px] top-[13.4rem] right-[2.2rem]"
                />
              ) : (
                <IoMdEye
                  onClick={() => {
                    passwordType2nd();
                  }}
                  className="absolute text-cust-lite-black w-[22px] h-[22px] top-[13.4rem] right-[2.2rem]"
                />
              )}
              <br />
              <label className="" htmlFor="OTP">
                Your OTP
              </label>
              <br />
              <input
                className="bg-cust-lightgray pl-3 mt-1 h-[2.5rem] w-[100%] rounded-2xl mb-3"
                placeholder="Enter your 6 digit OTP"
                type="number"
                name="OTP"
                required
                {...register("otp")}
              />

              {rout ? (
                <h3 className="underline text-cust-lite-blue"> Request OTP.</h3>
              ) : (
                <h3
                  onClick={handleSubmit(updatePass)}
                  className="underline text-dark-green"
                >
                  Request OTP.
                </h3>
              )}

              <br />
              <button className="rounded-xl px-6 py-2 font-bold text-cust-white bg-black">
                Update Password
              </button>
              <br />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
