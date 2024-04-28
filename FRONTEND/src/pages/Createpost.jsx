import React from "react";
import { useForm } from "react-hook-form";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Createpost = () => {
  // const { register, handleSubmit } = useForm();
  const createPost = async(event) => {
    event.preventDefault();
    const myForm=document.querySelector("form");
    var formData=new FormData(myForm);
   
 let item;
 for(item of formData){
  console.log(item[0],item[1])
 }

    const sendPostDet=await fetch(`${VITE_BASE_URL}/admin/createpost`,{
      method:"POST",
      mode:"cors",
      headers:{
        "Content-Type": "multipart/form-data",
      },    
      body:formData,
    })
  
    // const response=await sendPostDet.json();
  };

  return (
    <div>
      <div className="h-[100vh] bg-black flex justify-center items-center">
        <div data-aos="zoom-in" className="max-h-[33rem] w-[18rem] p-3 bg-cust-white rounded-xl">
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
            <label className="font-bold" htmlFor="catagory">Select Catagory: </label>
            <select
              className="border rounded-md mb-3 text-[15px] pl-2 py-1"
              name="catagory"
              id=""
            >
              <option value="Select catagory" selected>Catagory</option>
              <option value="Health">Health</option>
              <option value="Autonomous">Autonomous</option>
              <option value="EthicalUse">EthicalUse</option>
              <option value="Trading">Trading</option>
              <option value="Climate">Climate</option>
              <option value="Education">Education</option>
            </select>
            <br />
            <label className="font-bold" htmlFor="uploadfile">Upload your file:</label>
            <input
              className="text-[0.8rem] mb-2"
              type="file"
              required
              name="uploadfile"
            />
            <br />
            <label className="font-bold" htmlFor="maincontent">Your content</label>
            <textarea
              className="border rounded-lg p-2 text-[15px]"
              name="maincontent"
              id=""
              cols="30"
              rows="10"
              resize="none"
            ></textarea>
            <button className="border px-3 py-1 rounded-lg font-bold bg-black text-cust-white">Create Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Createpost;
