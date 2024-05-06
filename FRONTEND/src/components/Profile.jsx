import React from "react";
import { HiUser } from "react-icons/hi2";

const Profile = () => {
  const user = localStorage.getItem("Profile");
  console.log(user)
  return (
    <div className="h-[4rem] bg-black flex justify-center items-center sticky top-[4rem] z-10 ">
      <div data-aos="zoom-in" className="h-[2.5rem] w-[8rem] text-[16px] font-medium bg-cust-white rounded-[3rem] flex justify-center  items-center">
        <HiUser className="mr-2 text-cust-black"/>
        {user}
      </div>
    </div>
  );
};

export default Profile;
