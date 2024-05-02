import React from "react";
import { useEffect } from "react";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import GoPrev from "../components/GoPrev";

const CreatorsPage = () => {
  const [allPost, setAllpost] = useState([]);
  console.log("I am loading");
  console.log(allPost);
  const loadPost = async () => {
    const getAllPost = await fetch(`${VITE_BASE_URL}/login/dashboard/allpost`);
    const response = await getAllPost.json({});
    setAllpost(response.post);
  };

  useEffect(() => {
    loadPost();
  }, []);
  return (
    <div>
        <GoPrev></GoPrev>
      <div className="h-[100vh] bg-cust-black overflow-y-scroll">
        <div className=" py-[2rem] flex justify-center items-center ">
          {allPost.length == 0 ? (
            <div className="h-[100vh] flex justify-center items-center">
              <p className="text-[1.2rem]">You haven't created anything !</p>
            </div>
          ) : (
            <div className="">
              <h1 className="py-2 px-4 bg-black w-[7.5rem] text-center rounded-lg  text-cust-white font-medium">
                <span className="animate-pulseeb">All Posts</span>
              </h1>
              {allPost.map((eachPost) => {
                return (
                  <div
                    id={eachPost._id}
                    className="max-h-[33rem] w-[17rem] px-[1rem] py-[1rem] rounded-xl bg-cust-white my-6"
                    key={eachPost._id}
                  >
                    <div className="bg-cust-EEEDEB shadow-3xl rounded-lg h-[11rem] flex justify-center items-center ">
                      <img
                        src={eachPost.secureImgURL}
                        alt=" No Image"
                        className=" rounded-lg h-[9rem]"
                      />
                    </div>

                    <h2 className="mt-3 text-black font-bold text-[1.3rem]">
                      {eachPost.title}
                    </h2>
                    <h2 className="text-dark-green font-bold text-[1rem]">
                      Catagory: {eachPost.catagory}
                    </h2>
                    <h2 className="text-cust-lite-black font-bold text-[0.8rem]">
                      Created By: {eachPost.author}
                    </h2>

                    <p className="text-black mt-2 overflow-x-hidden ">
                      {(
                        eachPost.maincontent.substring(0, 1).toUpperCase() +
                        eachPost.maincontent.substr(
                          1,
                          eachPost.maincontent.length - 1
                        )
                      ).substring(0, 150)}
                      ...
                    </p>
                    <div
                      id={eachPost._id}
                      className="flex justify-between items-center mt-3"
                    >
                      <button className="text-cust-white py-2 px-3 bg-black rounded-lg mt-2 ">
                        Read More
                      </button>
                      <MdDelete className="h-[1.8rem] w-[1.8rem] text-black" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorsPage;
