import React from "react";
import { useSelector } from "react-redux";
import GoPrev from "../components/GoPrev";
import { useNavigate } from "react-router-dom";
import StatsAndFigs from "../components/StatsAndFigs";


const AdminReview = () => {
  const navigate = useNavigate();
  const getValueFromLocal = localStorage.getItem("myValue");

  if (getValueFromLocal === "false") {
    navigate("/login");
  }

  const post = useSelector((state) => {
    return state.menu.readPost;
  });

   const myPost=post[0];
   console.log(myPost)
   if(!myPost){
    location.assign("/login/creatorspage")
   }

  return (
    <div className="h-[100vh] bg-black text-cust-white overflow-y-scroll">
      <GoPrev />
      <StatsAndFigs/>
      <div className="flex flex-col justify-center items-center px-3 pt-6">
        <h1 className="my-3 text-[2.3rem]">{post[0].title}</h1>
        <img className="h-[14rem] rounded-lg my-3" src={post[0].secureImgURL} alt="No image" />
        <p className="my-3">Catagory: {post[0].catagory}</p>
        <p className="my-3">Created By: {post[0].author}</p>

        <p className="px-1">{post[0].maincontent}</p>
      </div>
    </div>
  );
};

export default AdminReview;


