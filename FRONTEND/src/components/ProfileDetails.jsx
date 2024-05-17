import React from "react";
import { HiUser } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setProfiletrue } from "../redux/firstSlice/firstSlice";

const ProfileDetails = ({profileDetails}) => {
     const dispatch=useDispatch()
  return (
    <div
      id="profile"
      className=" h-screen w-full bg-black fixed z-20 top-0 left-0 flex justify-center items-center "
    >
      <div className="max-h-[17rem] w-[18rem] rounded-3xl bg-cust-bg px-3 pt-3 relative">
        <RxCross2
          size="20"
          className="absolute top-2 right-3"
          onClick={() => {
            dispatch(setProfiletrue(false));
          }}
        />
        <div className=" flex flex-col gap-4 justify-center items-center my-6">
          <HiUser
            size="50"
            className="text-cust-white bg-black p-2 rounded-full"
          />
          <p className="bg-cust-black text-[14px] text-cust-white w-[90%] px-4 py-2 text-center rounded-full shadow-3xl">
            {profileDetails.name}
          </p>
          <p className="bg-cust-black text-[14px] text-cust-white w-[90%] px-4 py-2 text-center rounded-full shadow-3xl">
            {profileDetails.email}
          </p>
          <p className="bg-cust-black text-[14px] text-cust-white w-[90%] px-4 py-2 text-center rounded-full shadow-3xl">
            {profileDetails.acountType}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
