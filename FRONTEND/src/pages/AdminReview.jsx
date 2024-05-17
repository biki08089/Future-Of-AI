import React from "react";
import { useSelector } from "react-redux";
import GoPrev from "../components/GoPrev";
import { useNavigate } from "react-router-dom";
import StatsAndFigs from "../components/StatsAndFigs";
import { useEffect } from "react";
import { HiUser } from "react-icons/hi2";
import { FaArrowLeftLong } from "react-icons/fa6";

const AdminReview = () => {
  const navigate = useNavigate();

  // localStorage.setItem("Profile", "Admin");
  const getValueFromLocal = localStorage.getItem("myValue");
  const profile = localStorage.getItem("Profile");
  if (getValueFromLocal === "false") {
    navigate("/login");
  }

  const post = useSelector((state) => {
    return state.menu.readPost;
  });

  const myPost = post[0];
 
  if (!myPost) {
    if (profile == "Admin") {
      location.assign("/login/admindashboard");
    } else {
      location.assign("/login/creatorspage");
    }
  }

  const scroll = () => {
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    scroll();
  }, []);

  return (
    <>
      <div className="bg-cust-black h-[3rem] text-[16px] pt-3 pl-4 text-cust-white sticky top-[4rem] z-10">
        <FaArrowLeftLong onClick={goBack} />
      </div>
      <div className="h-[100vh] bg-black  overflow-y-scroll">
        {/* <GoPrev /> */}
        <StatsAndFigs />
        <h1 className="my-3 text-[2.3rem] text-cust-white text-center">
          {post[0].title}
        </h1>
        <div className="xl:pb-10 lg:flex-row  flex flex-col justify-center items-center text-cust-white px-3 pt-6">
          <div className=" lg:pl-[5rem] xl:pl-[8rem] flex flex-col justify-center items-center  lg:w-[50%] lg:pt-4 lg:flex lg:flex-col lg:justify-center lg:items-center">
            <img
              className="h-[14rem] rounded-lg my-3 xl:max-h-[30rem] lg:h-[20rem] lg:max-w-[32rem]"
              src={post[0].secureImgURL}
              alt="No image"
            />
            <p className="my-3">Catagory: {post[0].catagory}</p>
            <p className="my-3">Created By: {post[0].author}</p>
          </div>
          <div className="lg:w-[50%] lg:h-[24rem]">
            <p className="px-1 sm:px-10 lg:px-2 pb-10 lg:text-[18px] lg:pr-[5rem] xl:text-[22px] xl:pr-[8rem]">
              {post[0].maincontent}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReview;
