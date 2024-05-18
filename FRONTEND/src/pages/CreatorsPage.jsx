import React from "react";
import { useEffect } from "react";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import GoPrev from "../components/GoPrev";
import { useDispatch } from "react-redux";
import { readPostOnClick } from "../redux/firstSlice/firstSlice";
import { useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { userStatusLogout, userSignUp } from "../redux/firstSlice/firstSlice";
import { cartItem } from "../redux/firstSlice/myapiSlice";
import Profile from "../components/Profile";

const CreatorsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allPost, setAllpost] = useState([]);
  const [likedArr, setLikedArr] = useState([]);

  localStorage.setItem("Profile", "Regular");
  const getValueFromLocal = localStorage.getItem("myValue");

  if (getValueFromLocal === "false") {
    navigate("/login");
  }

  const loginStatus = () => {
    dispatch(userStatusLogout());
    dispatch(userSignUp());
  };
  loginStatus();

  const loadPost = async () => {
    const getAllPost = await fetch(`${VITE_BASE_URL}/login/dashboard/allpost`);
    const response = await getAllPost.json({});
    setAllpost(response.post.reverse());
  };

  //This function is a reusable function which will run for both readmore button click and like button click

  const sendLikeAndReadmoreData = async (data, value) => {
    const info = {
      id: data._id,
      email: localStorage.getItem("email"),
      title: data.title,
      tag: data.catagory,
      image: data.secureImgURL,
      description: data.maincontent,
      author: data.author,
      value: value,
    };

    const sendDatatoBackend = await fetch(`${VITE_BASE_URL}/like_read`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    const response = await sendDatatoBackend.json();
    const responseData = response.userData.items.concat(
      response.userData.itemsLikedfromCreatorPage
    );


    let newArr = [];
    responseData.forEach((element) => {
      newArr.push(element.id);
    });
    setLikedArr(newArr);
    dispatch(cartItem(responseData.length));
  };

  /*This function will send a post request with email id and will give us Itemswishlisted db's related data in 
  when the page rendered for the first time or refreshed..*/

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
  
    const newArrOflikes = res.data[0].items.concat(
      res.data[0].itemsLikedfromCreatorPage
    );

    let newArr = [];
    newArrOflikes.forEach((element) => {
      newArr.push(element.id);
    });
    setLikedArr(newArr);
    dispatch(cartItem(newArrOflikes.length));
  };

  const readMore = (event) => {
    navigate("/admindashboard/reviewpost");
    const filteredPost = allPost.filter((eachPost) => {
      return eachPost._id == event.target.parentElement.id;
    });
    const value = event.target.parentElement.getAttribute("name");
    const data = filteredPost[0];
    dispatch(readPostOnClick(filteredPost));

    sendLikeAndReadmoreData(data, value);
  };

  const sendLikedData = (event) => {
    const filteredData = allPost.filter((eachPost) => {
      return eachPost._id == event.target.parentElement.id;
    });
    const value = event.target.parentElement.getAttribute("name");
    const data = filteredData[0];
    sendLikeAndReadmoreData(data, value);
  };

  useEffect(() => {
    getDatafromDB();
    loadPost();
  }, []);
  return (
    <div>
      <Profile />
      <GoPrev></GoPrev>
      <div className="h-[100vh] bg-cust-black overflow-y-scroll ">
        {/* <p className="text-cust-white text-center">These posts are created by real users from around the internet. If you want to be one of them then please creat an acount with us as "Admin" and create content whateever you like and publish it. So, that others can expore your content.</p> */}
        <div className=" py-[2rem] flex justify-center items-center shadow-3xl">
          {allPost.length == 0 ? (
            <div className="h-[100vh] flex justify-center items-center">
              <p className="text-[1.2rem] text-cust-white">
                No posts available !
              </p>
            </div>
          ) : (
            <div className="sm:px-[5rem] sm:flex sm:flex-col sm:justify-center sm:items-center">
              <h1 className="py-2 px-4 bg-black w-[8rem] text-center rounded-lg  text-cust-white font-medium">
                <span className="animate-pulseeb">Recent Posts </span>
              </h1>
              <div className="sm:flex sm:flex-wrap sm:justify-center ">
                {allPost.map((eachPost) => {
                  return (
                    <div
                      id={eachPost._id}
                      className="max-h-[33rem] m-3 w-[17rem] lg:w-[19rem] px-[1rem] py-[1rem] rounded-xl bg-cust-white my-6"
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
                      <div className="flex justify-between items-center mt-3">
                        <div id={eachPost._id} name="readMoreButton">
                          <button
                            onClick={readMore}
                            className="text-cust-white py-2 px-3 bg-black rounded-lg mt-2 "
                          >
                            Read More
                          </button>
                        </div>
                        {/* <div id={eachPost._id} name="add">
                        <MdDelete
                          id={eachPost._id}
                          name="add"
                          onClick={sendLikedData}
                          className="h-[1.8rem] w-[1.8rem] text-black"
                        />
                      </div> */}
                        {likedArr.includes(eachPost._id) ? (
                          <div
                            id={eachPost._id}
                            name="remove"
                            className="h-[3rem]"
                          >
                            <FcLike
                              id={eachPost._id}
                              name="remove"
                              onClick={sendLikedData}
                              className="h-[1.9rem] mb-1 mx-auto w-[1.9rem] rounded-[50%] bg-cust-gray2nd p-1"
                            />
                            <p className="text-[12px]">Remove Blog</p>
                          </div>
                        ) : (
                          <div
                            id={eachPost._id}
                            name="add"
                            className="h-[3rem]"
                          >
                            <FcLikePlaceholder
                              id={eachPost._id}
                              name="add"
                              onClick={sendLikedData}
                              className="h-[1.9rem] mb-1 mx-auto w-[1.9rem] rounded-[50%] bg-black p-1"
                            />
                            <p className="text-[12px]">Add to wishlist</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorsPage;
