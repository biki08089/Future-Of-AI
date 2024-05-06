import React, { useEffect } from "react";
import menu from "../images/logo/menu.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  incAnddec,
  userStatusLogout,
  userSignUp,
} from "../redux/firstSlice/firstSlice";
import { BsHeart } from "react-icons/bs";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import { useState } from "react";

const Mynav = ({ setCounter, myValue }) => {
  const dispatch = useDispatch();
  const [checkAcountType, setAcountType] = useState(null);
  const [value,setValue]=useState();
  

  const loginStatus = useSelector((state) => {
    return state.menu.loginStatus;
  });
  const signupStatus = useSelector((state) => {
    return state.menu.signupStatus;
  });

  const cartItem = useSelector((state) => {
    return state.myAPI.cartItem;
  });

  let navBarUpdt = useSelector((state) => {
    return state.menu.navBarUpdated;
  });
  console.log(navBarUpdt)
  // setValue(navBarUpdt);

  const menuState = () => {
    dispatch(incAnddec());
    setCounter(myValue);
  };

  const getEmail = localStorage.getItem("email");

  const data = {
    email: getEmail,
  };

  const getUserDataFromBackend = async () => {
    const getUser = await fetch(`${VITE_BASE_URL}/getUser`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await getUser.json();
    const acountType = response.user.acountType;
    setAcountType(acountType);
  };

  useEffect(() => {
    getUserDataFromBackend();
  }, [navBarUpdt]);

  return (
    <div
      id="navbar"
      className=" bg-cust-bg flex justify-around  sm:justify-between md:px-[3rem] sm:px-[2rem] h-[4rem] sticky top-0 w-[100%] z-10"
    >
      <div className="text-3xl flex items-center w-32">
        <img
          onClick={menuState}
          src={menu}
          className="h-[30px] w-[30px] mr-1"
          alt="no img"
        />
        <NavLink to="/">
          <h1 className="font-medium">Future</h1>
        </NavLink>
      </div>
      <div className="flex items-center w-44 justify-end">
        <NavLink to="/login">
          <button
            // onClick={() => {
            //   dispatch(userStatusLogin());
            //   dispatch(userSignUpfalse());
            // }}
            className="text-md py-1 text-cust-white opacity-80 px-3 rounded-md font-semibold bg-dark-green mr-2"
          >
            {loginStatus}
          </button>
        </NavLink>

        {signupStatus ? (
          checkAcountType == "Admin" ? (
            <h1></h1>
          ) : (
            <NavLink to="/dashboard/wishlist">
              <div className="relative flex flex-col justify-center items-center ml-1 ">
                <BsHeart className="text-black  rounded-[50%] bg-cust-lightgray p-2 h-[30px] w-[30px]" />
                <p className="text-[13px] font-medium">Wishlist</p>
                <p className="flex justify-center items-center absolute top-[-3px] right-[-3px] bg-cust-black w-[20px] h-[20px] text-[10px] font-semibold text-cust-white rounded-[50%]">
                  {cartItem}
                </p>
              </div>
            </NavLink>
          )
        ) : (
          <NavLink to="/signup">
            <button className="text-md py-1 text-cust-white opacity-80 px-3 rounded-md font-semibold bg-dark-green ">
              Sign up
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Mynav;
