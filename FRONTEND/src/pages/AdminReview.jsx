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

  localStorage.setItem("Profile", "Admin");
  const getValueFromLocal = localStorage.getItem("myValue");

  if (getValueFromLocal === "false") {
    navigate("/login");
  }

  const post = useSelector((state) => {
    return state.menu.readPost;
  });

  const myPost = post[0];
  console.log(myPost);
  if (!myPost) {
    location.assign("/login/creatorspage");
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
      <div className="bg-cust-black h-[3rem] text-[1.4rem] pt-3 pl-4 text-cust-white sticky top-[4rem] z-10">
        <FaArrowLeftLong onClick={goBack} />
      </div>
      <div className="h-[100vh] bg-black  overflow-y-scroll">
        {/* <GoPrev /> */}
        <StatsAndFigs />
        <div className="flex flex-col justify-center items-center text-cust-white px-3 pt-6">
          <h1 className="my-3 text-[2.3rem]">{post[0].title}</h1>
          <img
            className="h-[14rem] rounded-lg my-3"
            src={post[0].secureImgURL}
            alt="No image"
          />
          <p className="my-3">Catagory: {post[0].catagory}</p>
          <p className="my-3">Created By: {post[0].author}</p>

          <p className="px-1">{post[0].maincontent}</p>
        </div>
      </div>
    </>
  );
};

export default AdminReview;
