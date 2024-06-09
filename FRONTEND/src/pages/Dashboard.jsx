import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStatusLogout, userSignUp } from "../redux/firstSlice/firstSlice";
import { useSelector, useDispatch } from "react-redux";
import PageChanger from "../components/PageChanger";
import Filter from "../components/Filter";
import FutureAI from "../components/FutureAI";
import { NavLink } from "react-router-dom";
import { updateReadMore, cartItem } from "../redux/firstSlice/myapiSlice";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import { LoadingPage } from "./LoadingPage";
import Profile from "../components/Profile";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  localStorage.setItem("Profile","Regular")
  const getValueFromLocal = localStorage.getItem("myValue");

  if (getValueFromLocal === "false") {
    navigate("/login");
    //  return "error"
  }

  const [wishListedArr, setwishListedArr] = useState([]);

  const myData = useSelector((state) => {
    return state.myAPI.getData;
  });

  const blogData = myData.blogs || [];

  
  const loginStatus = () => {
    dispatch(userStatusLogout());
    dispatch(userSignUp());
  };

  loginStatus();

  //This function will run when the user hits the readmore button..
  const readMore = (event) => {
    const filteredArr = myData.blogs.filter((each) => {
      return each.id == event.target.id;
    });
    dispatch(updateReadMore(filteredArr));
    navigate("/dashboard/content");
  };

  //This function will run when a user hits the like button...
  const wishlistedData = async (event) => {
    const filteredArr = myData.blogs.filter((each) => {
      return each.id == event.target.parentElement.id;
    });
     console.log(filteredArr)
    const value = event.target.parentElement.getAttribute("name");
    //This is the data we will send to backend....
    const data = {
      id: filteredArr[0].id,
      title: filteredArr[0].title,
      author:filteredArr[0].createdBy,
      tag: filteredArr[0].tag,
      description: filteredArr[0].description,
      image: filteredArr[0].image,
      email: localStorage.getItem("email"),
      value: value,
    };

    //Sending a post request with data to backend and it will create the data in the db ..
    const sendlikedData = await fetch(`${VITE_BASE_URL}/dashboard/wishlist`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    //Getting response from backend with wishlisted items as array....
    const res = await sendlikedData.json();
    // console.log(res)
    const itemsArr = res.data.items.concat(
      res.data.itemsLikedfromCreatorPage
    );
    
    dispatch(cartItem(itemsArr.length));

    // Below extracting the value of ID from each element present inside that array...
    let newArr = [];
    itemsArr.forEach((element) => {
      newArr.push(Number(element.id));
    });
    setwishListedArr(newArr);
  };

  /*This function will send a post request and will give us wishlisted items in 
  the form of array when the page rendered for the first time or refreshed..*/

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
    const items =res.data[0].items.concat(
      res.data[0].itemsLikedfromCreatorPage
    );
    dispatch(cartItem(items.length));
    localStorage.setItem("totalCartItems", items.length);

    let newArr = [];
    items.forEach((element) => {
      newArr.push(Number(element.id));
    });
    setwishListedArr(newArr);
  };

  useEffect(() => {
    getDatafromDB();
  }, []);
  // sm:grid sm:grid-cols-2 sm:grid-rows-5 sm:gap-x-1 sm:gap-y-4
  return (
    <div>
      <Profile/>
      <PageChanger></PageChanger>
      <div className="bg-cust-black pt-1">
        <FutureAI></FutureAI>
        <Filter></Filter>
      </div>
      {blogData.length == 0 ? (
        <div className="h-[100vh] bg-cust-black flex justify-center items-center">
          <LoadingPage />
        </div>
      ) : (
        <div id="contentDiv" className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center items-center bg-cust-black min-h-8">
          {blogData.map((eachObj) => {
            return (
              // <div className=" flex justify-center items-center">
              <div
                data-aos="zoom-in"
                key={eachObj.id}
                className=" w-[17rem] sm:min-h-[17rem] m-3  bg-cust-bg shadow-3xl my-5 py-4 px-3 rounded-[0.8rem]"
              >
                <img
                  className="rounded-lg mb-3 sm:h-[9rem] sm:w-[100%]"
                  src={eachObj.image}
                  alt="../public/AI-IMG.webp"
                />
                <h3 className="font-semibold ">{eachObj.title}</h3>
                <p className="font-semibold text-[15px] text-light-sky">
                  Catagory : {eachObj.tag}
                </p>
                <p className="font-semibold mt-1 mb-2 text-[0.8rem]">Created By: {eachObj.createdBy}</p>
                <p>{eachObj.description.substring(0, 150)}...</p>

                <div className="flex items-center justify-between">
                  <button
                    id={eachObj.id}
                    onClick={readMore}
                    data-aos="fade-left"
                    className=" h-[2.3rem] w-[6rem] rounded-lg mt-2 bg-dark-green font-semibold text-cust-bg"
                  >
                    Read More
                  </button>

                  {wishListedArr.includes(eachObj.id) ? (
                    <div id={eachObj.id} name="remove" className="h-[3rem] ">
                      <FcLike
                        onClick={wishlistedData}
                        name="remove"
                        id={eachObj.id}
                        className="h-[1.9rem] mb-1 mx-auto w-[1.9rem] rounded-[50%] bg-cust-gray2nd p-1"
                      />
                      <p className="text-[12px]">Remove Blog</p>
                    </div>
                  ) : (
                    <div id={eachObj.id} name="add" className="h-[3rem]">
                      <FcLikePlaceholder
                        onClick={wishlistedData}
                        name="add"
                        id={eachObj.id}
                        className="h-[1.9rem] mb-1 mx-auto w-[1.9rem] rounded-[50%] bg-black p-1"
                      />
                      <p className="text-[12px]">Add to Wishlist</p>
                    </div>
                  )}
                </div>
              </div>
              // </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
