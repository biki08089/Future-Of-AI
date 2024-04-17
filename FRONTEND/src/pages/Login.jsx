import React, { useEffect } from "react";
import robot from "../images/logo/robot.png";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  changePasstype,
  userStatusLogin,
  userSignUpfalse,
} from "../redux/firstSlice/firstSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useState } from "react";
import { LoadingPage } from "./LoadingPage";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passType = useSelector((state) => {
    return state.menu.passType;
  });

  localStorage.setItem("myValue", false);

  const getValfromLoc = localStorage.getItem("myValue");
  if (getValfromLoc == "false") {
    dispatch(userStatusLogin());
    dispatch(userSignUpfalse());
  }

  //Here we are sending a POST request for logging in an user credentials to an API.
  const loginSubmit = async (data) => {
    setLoading(true);
    localStorage.setItem("email", data.email);
    // console.log(data.email);
    const userLogin = await fetch(`${VITE_BASE_URL}/login/success`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await userLogin.json();
    const responseIs = response.success;
    if (responseIs) {
      navigate("/login/dashboard");
      toast.success(response.massage);
      localStorage.setItem("myValue", true);
    } else {
      toast.error(response.massage);
      setLoading(false);

    }
  };

  const passwordType = () => {
    dispatch(changePasstype());
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
              onSubmit={handleSubmit(loginSubmit)}
              className="relative text-sm bg-cust-white h-[14rem] w-[18rem] px-3 py-4 rounded-xl mt-3 font-[arial] font-medium"
            >
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
                  className="absolute text-cust-lite-black w-[22px] h-[22px] top-[7.9rem] right-[1.4rem]"
                />
              ) : (
                <IoMdEye
                  onClick={() => {
                    passwordType();
                  }}
                  className="absolute text-cust-lite-black w-[22px] h-[22px] top-[7.9rem] right-[1.4rem]"
                />
              )}
              <br />
              <button className="rounded-xl w-[5rem] px-6 py-2 font-bold text-cust-white bg-black">
                Login
              </button>
              <br />
            </form>
          </div>
          <NavLink to="/login/forgotPass">
            <p
              data-aos="fade-left"
              className="text-cust-white mt-3 mb-2 underline"
            >
              Forgot Password
            </p>
          </NavLink>

          <NavLink to="/signup">
            <p data-aos="fade-left" className="text-cust-white mt-3">
              New here ? <span className="underline">Sign up</span> now
            </p>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Login;
