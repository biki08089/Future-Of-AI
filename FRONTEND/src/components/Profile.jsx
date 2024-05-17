import React from "react";
import { HiUser } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { setProfiletrue,setProfileDetails } from "../redux/firstSlice/firstSlice";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;


const Profile = () => {
  const dispatch=useDispatch();
  const user = localStorage.getItem("Profile");
   
  const getProfileData=async()=>{
    const emailFromlocal=localStorage.getItem("email");
    const data={
      email:emailFromlocal
    }
    const getData = await fetch(`${VITE_BASE_URL}/getuser`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response=await getData.json(); 
    dispatch(setProfileDetails(response.user));
    dispatch(setProfiletrue(true));
  }


  return (
    <div className="h-[4rem] bg-black flex justify-center items-center sticky top-[4rem] z-10 ">
      <div onClick={getProfileData} data-aos="zoom-in" className="h-[2.5rem] w-[8rem] text-[16px] font-medium bg-cust-white rounded-[3rem] flex justify-center  items-center">
        <HiUser className="mr-2 text-cust-black"/>
        {user}
      </div>
    </div>
  );
};

export default Profile;
