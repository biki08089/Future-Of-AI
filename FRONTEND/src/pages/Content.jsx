import React from "react";
import { useSelector } from "react-redux";
import GoPrev from "../components/GoPrev";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const navigate = useNavigate();
  const getValueFromLocal = localStorage.getItem("myValue");

  if (getValueFromLocal === "false") {
    console.log("Login first");
    navigate("/login");
  }

  const data = useSelector((state) => {
    return state.myAPI.readMore;
  });

  const readMore = data[0];
  console.log(readMore);

  if (!readMore) {
    location.assign("/login/dashboard");
  }

  return (
    <>
      <GoPrev />

      <div className="pb-6 overflow-y-scroll px-5 h-[100vh]  sm:h-[70vh] pt-5 bg-cust-black text-cust-white flex flex-col items-center justify-start">
        <h1
          data-aos="zoom-out"
          className=" text-center text-[1.3rem] font-semibold md:text-[1.5rem]"
        >
          {readMore.title}
        </h1>

        <img
          data-aos="zoom-in"
          className="rounded-lg my-5 w-[18rem] md:w-[22rem] 2xl:w-[27rem]"
          src={readMore.image}
          alt=""
        />
        <p data-aos="fade-right" className="font-semibold mb-2 text-light-sky">
          Catagory : {readMore.tag}
        </p>

        <p
          data-aos="zoom-in"
          className="text-[1.4em] sm:px-11  xl:text-center"
        >
          {readMore.description}
        </p>
      </div>
    </>
  );
};

export default Content;
