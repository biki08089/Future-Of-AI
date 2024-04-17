import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import {
  myWishlist,
  cartItem,
  updateReadMore,
} from "../redux/firstSlice/myapiSlice";
import { NavLink } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { userStatusLogout, userSignUp } from "../redux/firstSlice/firstSlice";
import { useNavigate } from "react-router-dom";
import GoPrev from "../components/GoPrev";
import { LoadingPage } from "./LoadingPage";

const Whishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getValueFromLocal = localStorage.getItem("myValue");

  if (getValueFromLocal === "false") {
    navigate("/login");
  }

  const myData = useSelector((state) => {
    return state.myAPI.wishlistedArr;
  });

  const loginStatus = () => {
    dispatch(userStatusLogout());
    dispatch(userSignUp());
  };
  loginStatus();

  const readMore = (event) => {
    const filteredArr = myData.filter((each) => {
      return each.id == event.target.id;
    });
    dispatch(updateReadMore(filteredArr));
    navigate("/dashboard/content");
  };

  const removeFromWishlist = async (event) => {
    const filteredArr = myData.filter((each) => {
      return each.id == event.target.parentElement.id;
    });

    const data = {
      email: localStorage.getItem("email"),
      value: event.target.parentElement.getAttribute("name"),
      title: filteredArr[0].title,
    };

    const sendData = await fetch(`${VITE_BASE_URL}/dashboard/wishlist`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await sendData.json();
    window.location.reload();
  };

  const getDatafromDB = async () => {
    const myemail = localStorage.getItem("email");
    const data = {
      email: myemail,
    };
    const getData = await fetch(`${VITE_BASE_URL}/dasboard`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await getData.json();
    const items = res.data[0].items;
    dispatch(myWishlist(items));
    dispatch(cartItem(items.length));
    localStorage.setItem("totalCartItems", items.length);
  };

  useEffect(() => {
    getDatafromDB();
  }, []);

  return (
    <div>
      <GoPrev />

      {myData.length == 0 ? (
        <div className="h-[100vh] bg-cust-black flex justify-center items-center">
          <LoadingPage />
        </div>
      ) : (
        <div className="flex flex-col items-center bg-cust-black min-h-8 2xl:h-[100vh] 2xl:overflow-scroll">
          <div>
            <h1 className="mt-5 mb-2 text-cust-white">My Wishlists</h1>
          </div>
          <div className="sm:w-[100%]  sm:flex sm:flex-wrap sm:justify-center mb-10">
            {myData.map((eachObj) => {
              return (
                <div
                  data-aos="zoom-in"
                  key={eachObj.id}
                  className="w-[17rem] max-h-[31rem] sm:m-3 bg-cust-bg shadow-3xl my-5 py-4 px-3 rounded-[0.8rem]"
                >
                  <img
                    className="rounded-lg mb-3"
                    src={eachObj.image}
                    alt="../public/AI-IMG.webp"
                  />
                  <h3 className="font-semibold ">{eachObj.title}</h3>
                  <p className="font-semibold text-[15px] text-light-sky">
                    Catagory : {eachObj.tag}
                  </p>
                  <p>{eachObj.description.substring(0, 150)}...</p>

                  <div className="flex items-center justify-between">
                    <NavLink to="/dashboard/content">
                      <button
                        id={eachObj.id}
                        onClick={readMore}
                      
                        className=" h-[2.3rem] w-[6rem] rounded-lg mt-2 bg-dark-green font-semibold text-cust-bg"
                      >
                        Read More
                      </button>
                    </NavLink>

                    <div id={eachObj.id} name="remove" className="h-[3rem] ">
                      <FcLike
                        onClick={removeFromWishlist}
                        name="remove"
                        id={eachObj.id}
                        className="h-[1.9rem] mb-1 mx-auto w-[1.9rem] rounded-[50%] bg-cust-gray2nd p-1"
                      />
                      <p className="text-[12px]">Remove Blog</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Whishlist;
