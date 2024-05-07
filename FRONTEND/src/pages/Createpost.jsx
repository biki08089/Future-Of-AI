import React from "react";
import { useForm } from "react-hook-form";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import toast from "react-hot-toast";
import bookmark from "../images/logo/bookmark.png";
import GoPrev from "../components/GoPrev";
import { useState } from "react";
import { LoadingPage } from "./LoadingPage";
import { userStatusLogout, userSignUp } from "../redux/firstSlice/firstSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Profile from "../components/Profile";

const Createpost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  localStorage.setItem("Profile", "Admin");

  const getValueFromLocal = localStorage.getItem("myValue");

  if (getValueFromLocal === "false") {
    navigate("/login");
  }

  const loginStatus = () => {
    dispatch(userStatusLogout());
    dispatch(userSignUp());
  };
  loginStatus();

  const createPost = async (event) => {
    setLoading(true);
    event.preventDefault();
    const email = localStorage.getItem("email");
    const myForm = document.querySelector("form");
    var formData = new FormData(myForm);
    formData.append("email", email);
    //  let item;
    //  for(item of formData){
    //   console.log(item[0],item[1])
    //  }

    const sendPostDet = await fetch(`${VITE_BASE_URL}/admin/createpost`, {
      method: "POST",
      mode: "cors",
      body: formData,
    });

    const response = await sendPostDet.json();
    if (response.success) {
      toast.success(response.massage);
      setLoading(false);
    } else {
      toast.error(response.massage);
      setLoading(false);
    }
  };

  return (
    <div>
      <Profile />
      <GoPrev></GoPrev>
      {loading ? (
        <div className="h-[100vh] bg-cust-black flex justify-center items-center">
          <LoadingPage />
        </div>
      ) : (
        <>
          <div className="bg-cust-black flex justify-center items-center">
            <h1 className="bg-black text-[1rem] w-[17rem] sm:w-[20rem] rounded-[4rem] text-center text-cust-white py-3 px-2  sm:text-[1.1rem]">
              Show your Creativity 💖👇
            </h1>
          </div>
          <div className="h-[100vh] flex flex-col justify-center items-center bg-cust-black">
            <div
              data-aos="zoom-in"
              className="flex flex-col justify-center items-center mb-7"
            >
              <img
                src={bookmark}
                className="h-[5rem] w-[5rem] mb-2"
                alt="No image"
              />
              <p className="text-cust-white">
                Let the people know your thoughts.
              </p>
            </div>
            <div
              data-aos="zoom-in"
              className="max-h-[40rem] mx-[2rem] p-3 bg-cust-white rounded-xl"
            >
              <h1
                data-aos="zoom-in"
                className="text-center text-[1.5rem] font-bold mb-4 text-dark-green"
              >
                Create A Post
              </h1>

              <form onSubmit={createPost} action="">
                <label className="font-bold" htmlFor="title">
                  Enter your title
                </label>
                <br />
                <input
                  className="border h-8  mb-3 rounded-md w-[100%]"
                  type="text"
                  name="title"
                  id=""
                />
                <br />
                <label className="font-bold" htmlFor="catagory">
                  Select Catagory:{" "}
                </label>
                <select
                  className="border rounded-md mb-3 text-[15px] pl-2 py-1"
                  name="catagory"
                  id=""
                >
                  <option value="Health">Health</option>
                  <option value="Autonomous">Autonomous</option>
                  <option value="EthicalUse">EthicalUse</option>
                  <option value="Trading">Trading</option>
                  <option value="Climate">Climate</option>
                  <option value="Education">Education</option>
                  <option value="Transportation/Travel">
                    Transportation/Travel
                  </option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Finance">Finance</option>
                  <option value="Law&Order">Law&Order</option>
                  <option value="Politics">Politics</option>
                  <option value="Technology/Science">Technology/Science</option>
                  <option value="Coding">Coding</option>
                </select>
                <br />
                <label className="font-bold" htmlFor="uploadfile">
                  Upload your file:
                </label>
                <input
                  className="text-[0.8rem] mb-2"
                  type="file"
                  required
                  name="uploadfile"
                />
                <br />
                <div className=" flex flex-col mb-4">
                  <label className="font-bold" htmlFor="maincontent">
                    Your content
                  </label>
                  <textarea
                    className="border rounded-lg p-2 text-[15px] mx-auto 2xl:w-[43rem] xl:w-[38rem] lg:w-[33rem] md:w-[27rem] md:h-[16rem] sm:w-[24rem] w-[17rem] h-[18rem]"
                    name="maincontent"
                    id=""
                    // cols="50"
                    // rows="10"
                    resize="none"
                  ></textarea>
                </div>
                <button className="border px-3 py-1 rounded-lg font-bold bg-black text-cust-white">
                  Create and Publish
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Createpost;
