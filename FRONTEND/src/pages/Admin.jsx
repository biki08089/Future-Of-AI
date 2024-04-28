import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate=useNavigate();
  return (
    <div className="h-[100vh] bg-cust-black text-cust-white ">
      <div className="bg-black flex justify-center flex-col items-center py-4">
        <h1 className="text-[1.2rem] pb-2">Welcome to Admin Page.</h1>
        <button data-aos="zoom-in" onClick={()=>{navigate("/admindashboard/createpost")}} className="text-[1rem] border px-5 py-1 rounded-lg">Create Post</button>
      </div>
      <div className="h-[100%] flex justify-center items-center">
        <p className="text-[1.2rem]">You haven't create anything !</p>
      </div>
    </div>
  );
};

export default Admin;

