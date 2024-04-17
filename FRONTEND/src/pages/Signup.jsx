import React, { useState } from "react";
import robot from "../images/logo/robot.png";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  updateuserData,
  changePasstype,
  changePasstype2nd,
} from "../redux/firstSlice/firstSlice";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import { useDispatch, useSelector } from "react-redux";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import toast from "react-hot-toast";
import { LoadingPage } from "./LoadingPage";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passType = useSelector((state) => {
    return state.menu.passType;
  });
  const passType2nd = useSelector((state) => {
    return state.menu.passType2nd;
  });

  const userSignup = async (data) => {
    setLoading(true);
    const sendUserdata = await fetch(`${VITE_BASE_URL}/signup/verify`, {
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
      navigate("/signup/verify");
      dispatch(updateuserData(data));
      toast.success(response.massage);
    } else {
      setLoading(false);
      toast.error(response.massage);
    }
  };

  const passwordType = () => {
    dispatch(changePasstype());
  };
  const passwordType2nd = () => {
    dispatch(changePasstype2nd());
  };

  return (
    <div>
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
              onSubmit={handleSubmit(userSignup)}
              className="text-sm bg-cust-white h-[24rem] w-[18rem] px-4 py-4 rounded-xl mt-3 font-[arial] font-medium"
            >
              <label className="" htmlFor="fullname">
                Full Name
              </label>
              <br />
              <input
                className="bg-cust-lightgray pl-3 mt-1 h-[2.5rem] w-[100%] rounded-2xl mb-3"
                placeholder="Enter you fullname"
                type="text"
                name="fullname"
                required
                {...register("fullname")}
              />
              <br />
              <label className="" htmlFor="email">
                Your Email Id
              </label>
              <br />
              <input
                className="bg-cust-lightgray pl-3 mt-1 h-[2.5rem] w-[100%] rounded-2xl mb-3"
                placeholder="Enter you email"
                type="email"
                name="email"
                required
                {...register("email")}
              />
              <br />
              <label htmlFor="password">Password</label>
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
                  className="absolute text-cust-lite-black w-[22px] h-[22px] top-[13.4rem] right-[1.4rem]"
                />
              ) : (
                <IoMdEye
                  onClick={() => {
                    passwordType();
                  }}
                  className="absolute text-cust-lite-black w-[22px] h-[22px] top-[13.4rem] right-[1.4rem]"
                />
              )}
              <br />
              <label htmlFor="password">Confirm Password</label>
              <br />
              <input
                className="bg-cust-lightgray pl-3 mt-1 h-[2.5rem] w-[100%] rounded-2xl mb-3"
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
                  className="absolute text-cust-lite-black w-[22px] h-[22px] top-[18.2rem] right-[1.4rem]"
                />
              ) : (
                <IoMdEye
                  onClick={() => {
                    passwordType2nd();
                  }}
                  className="absolute text-cust-lite-black w-[22px] h-[22px] top-[18.2rem] right-[1.4rem]"
                />
              )}
              <br />
              <button className="rounded-xl mt-2 px-6 py-2 font-bold text-cust-white bg-black">
                Sign up
              </button>
              <br />
            </form>
          </div>
          <NavLink to="/login">
            <p data-aos="fade-left" className="text-cust-white mt-2">
              Already a user ? <span className="underline">login</span> now
            </p>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Signup;
