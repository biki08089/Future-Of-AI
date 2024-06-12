import React from "react";
import { HiUser } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setProfiletrue } from "../redux/firstSlice/firstSlice";
import { motion } from "framer-motion";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const ProfileDetails = () => {
  const [uploadProfilePic, setuploadProfilePic] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDet, setUserDet] = useState();
  const navigate=useNavigate();

  const dispatch = useDispatch();


 const deleteAcc=async()=>{
  dispatch(setProfiletrue(false));
  const data = {
    email: localStorage.getItem("email"),
  };

  const deleteUser = await fetch(`${VITE_BASE_URL}/delete/account`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res=await deleteUser.json();
  if(res.success){
    toast.success(res.massage);
  
    navigate("/login")
  }else{
    toast.error(res.massage);
  }
 }


  const uploadProfile = async (event) => {
    setLoading(true);
    event.preventDefault();
    const email = localStorage.getItem("email");
    const myForm = document.querySelector("form");
    var formData = new FormData(myForm);
    formData.append("email", email);

    const uploadPic = await fetch(`${VITE_BASE_URL}/user/profileupload`, {
      method: "POST",
      mode: "cors",
      body: formData,
    });

    const res = await uploadPic.json();
    console.log(res)
    if(res.success){
      setLoading(false);
      setuploadProfilePic(false);
      toast.success(res.massage)
    }else{
      toast.error(res.massage)
    }
  };

  const userDetails = async () => {
    const data = {
      email: localStorage.getItem("email"),
    };

    const getUserDet = await fetch(`${VITE_BASE_URL}/getuser`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await getUserDet.json();
    if (res.success) {
      setTimeout(() => {
        setUserDet(res.user);
        setLoading(false);
      }, 3000);
    } else {
      console.log(res.massage);
    }
  };

  useEffect(() => {
    userDetails();
  }, []);

  return (
    <div
      id="profile"
      className=" h-screen w-full bg-black fixed z-20 top-0 left-0 flex justify-center items-center "
    >
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        transition={{
          type: "spring",
          stiffness: 150,
        }}
        className=" max-h-[28.5rem] w-[18rem] rounded-3xl bg-cust-bg px-3 py-3 relative"
      >
        <RxCross2
          size="20"
          className="absolute top-2 right-3"
          onClick={() => {
            dispatch(setProfiletrue(false));
          }}
        />
        {loading ? (
          <div className="h-[23.5rem] flex flex-col justify-center items-center">
            <div className="Profileloader "></div>
            <p className="text-[17px] font-bold mt-2">Loading...</p>
          </div>
        ) : (
          <div>
            {!uploadProfilePic ? (
              <div className=" flex flex-col gap-4 justify-center items-center my-6">
                {userDet.profilePicUrl ? (
                  <img className="h-[5rem] w-[5rem] rounded-full" src={userDet.profilePicUrl} alt="" />
                ) : (
                  <HiUser
                    size="50"
                    className="text-cust-white bg-black p-2 rounded-full"
                  />
                )}
                <p
                  onClick={() => {
                    setuploadProfilePic(true);
                  }}
                  className="bg-light-sky rounded-full px-3 py-1 text-cust-white flex justify-center items-center "
                >
                  <span className="mx-2">
                    <CiEdit />
                  </span>
                  Profile Picture
                </p>
                <p className="bg-cust-black text-[14px] text-cust-white w-[90%] px-4 py-2 text-center rounded-full shadow-3xl">
                  {userDet.name}
                </p>
                <p className="bg-cust-black text-[14px] text-cust-white w-[90%] px-4 py-2 text-center rounded-full shadow-3xl">
                  {userDet.email}
                </p>
                <p className="bg-cust-black text-[14px] text-cust-white w-[90%] px-4 py-2 text-center rounded-full shadow-3xl">
                  {userDet.acountType}
                </p>
                <button onClick={deleteAcc} className="bg-black rounded-full px-4 py-2 text-cust-white">
                  Delete Acount
                </button>
              </div>
            ) : (
              <div className="mt-5 h-[10rem] mb-4 flex flex-col items-center justify-center">
                <MdKeyboardBackspace
                  onClick={() => {
                    setuploadProfilePic(false);
                  }}
                  className="absolute left-3 top-2"
                  size="20"
                />
                <p className="font-semibold">Upload your profile picture</p>
                <form action="" className="w-[12rem] p-1">
                  <input
                    className="text-[0.8rem] my-2"
                    type="file"
                    required
                    name="uploadfile"
                  />
                  <button
                    onClick={uploadProfile}
                    className="px-4 py-1 w-[5rem] ml-[3rem] rounded-lg bg-black text-cust-white"
                  >
                    Upload
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileDetails;
