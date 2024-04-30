import React from "react";
import { useForm } from "react-hook-form";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import toast from "react-hot-toast";
import bookmark from "../images/logo/bookmark.png";
import GoPrev from "../components/GoPrev";



const Createpost = () => {
  // const { register, handleSubmit } = useForm();
  const createPost = async (event) => {
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
    } else {
      toast.error(response.massage);
    }
  };

  return (
    <div>
      <GoPrev></GoPrev>
      <div className="h-[100vh] flex flex-col justify-center items-center bg-black">

        <div data-aos="zoom-in" className="flex flex-col justify-center items-center mb-7" >
          <img
            src={bookmark}
            className="h-[5rem] w-[5rem] mb-2"
            alt="No image"
          />
          <p className="text-cust-white">Let the people know your thoughts.</p>
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
            <label className="font-bold" htmlFor="maincontent">
              Your content
            </label>
            <textarea
              className="border rounded-lg p-2 text-[15px] mx-auto"
              name="maincontent"
              id=""
              cols="30"
              rows="10"
              resize="none"
            ></textarea>
            <button className="border px-3 py-1 rounded-lg font-bold bg-black text-cust-white">
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Createpost;
