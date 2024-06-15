import React, { useEffect } from "react";
import { HiUser } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import {
  setProfiletrue,
  setProfileDetails,
} from "../redux/firstSlice/firstSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Profile = () => {
  const profileDetails = useSelector((state) => state.menu.profileDetails);
  console.log(profileDetails);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const user = localStorage.getItem("Profile");

  const getProfileData = async () => {
    console.log("i am running");

    const emailFromlocal = localStorage.getItem("email");
    const data = {
      email: emailFromlocal,
    };
    const getData = await fetch(`${VITE_BASE_URL}/getuser`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await getData.json();
    // setUserdata(response.user);
    dispatch(setProfileDetails(response.user));
    setLoading(false);
  };

  const userDet = () => {
    dispatch(setProfiletrue(true));
  };

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div className="h-[4rem] bg-black flex justify-center items-center sticky top-[4rem] z-10 ">
      <div
        onClick={userDet}
        data-aos="zoom-in"
        className="h-[2.5rem] w-[7.3rem] text-[16px] font-medium bg-cust-white rounded-[3rem] flex justify-center  items-center "
      >
        {loading ? (
          <div className="loaderForProfile"></div>
        ) : (
          <div className="h-[100%] w-[100%] rounded-[3rem] flex justify-around items-center">
            {profileDetails.profilePicUrl ? (
              <img
                className="h-[30px] w-[30px] rounded-full ml-[3px]"
                src={profileDetails.profilePicUrl}
                alt=""
              />
            ) : (
              <HiUser className="h-[20px] w-[20px] ml-[3px] text-cust-black" />
            )}
            <p className="mr-[5px]">{profileDetails.acountType}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
