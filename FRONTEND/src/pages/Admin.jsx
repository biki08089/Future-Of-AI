import React, { useEffect, useState } from "react";
import { IoLogoClosedCaptioning } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import GoPrev from "../components/GoPrev";
import { useDispatch } from "react-redux";
import { readPostOnClick } from "../redux/firstSlice/firstSlice";
import { userStatusLogout, userSignUp } from "../redux/firstSlice/firstSlice";


const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allPost, setPost] = useState([]);

  const getValueFromLocal = localStorage.getItem("myValue");

  if (getValueFromLocal === "false") {
    navigate("/login");
  } 
  

  const loginStatus = () => {
    dispatch(userStatusLogout());
    dispatch(userSignUp());
  };
  loginStatus(); 


  const getPostData = async () => {
    const data = {
      email: localStorage.getItem("email"),
    };
    const getPost = await fetch(`${VITE_BASE_URL}/admin/getpost`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await getPost.json();
    if (response.success) {
      toast.success(response.massage);
      setPost(response.post);
    } else {
      toast.error(response.massage);
    }
  };

  const deletePost = async (event) => {
    const id = event.target.parentElement.parentElement.id;
    const uniqueID = {
      id: id,
    };

    const deletePost = await fetch(`${VITE_BASE_URL}/admin/deletepost`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uniqueID),
    });

    const response = await deletePost.json();
    const filteredPost = allPost.filter((eachPost) => {
      return eachPost._id !== response.post._id;
    });
    setPost(filteredPost);
  };

  const readMore = (event) => {
    navigate("/admindashboard/reviewpost");
    const filteredPost = event.target.parentElement.id;
    const finalPost = allPost.filter((eachPost) => {
      return eachPost._id == filteredPost;
    });
    dispatch(readPostOnClick(finalPost))
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="min-h-[100vh] bg-cust-black text-cust-white">
      <div className="bg-black flex justify-center flex-col items-center py-4">
        <h1 className="text-[1.2rem] pb-2">Welcome to Admin Page.</h1>
        <button
          data-aos="zoom-in"
          onClick={() => {
            navigate("/admindashboard/createpost");
          }}
          className="text-[1rem] border px-5 py-1 rounded-lg"
        >
          Create Post
        </button>
      </div>
      <GoPrev></GoPrev>
      <div className=" py-[2rem] flex justify-center items-center ">
        {allPost.length == 0 ? (
          <div className="h-[100vh] flex justify-center items-center">
            <p className="text-[1.2rem]">You haven't created anything !</p>
          </div>
        ) : (
          <div className="">
            <h1 className="py-2 px-4 bg-black w-[7.5rem] text-center rounded-lg animate-bounceb text-dark-green">
              Your Posts
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
                    <button
                      onClick={readMore}
                      className="text-cust-white py-2 px-3 bg-black rounded-lg mt-2 "
                    >
                      Review Post
                    </button>
                    <MdDelete
                      onClick={deletePost}
                      className="h-[1.8rem] w-[1.8rem] text-black"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
