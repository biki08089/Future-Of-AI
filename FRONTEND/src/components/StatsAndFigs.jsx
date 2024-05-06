import React, { useEffect } from "react";
import { FcLike } from "react-icons/fc";
import love from "../images/logo/love.png";
import book from "../images/logo/book.png";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
import { useSelector } from "react-redux";
import { useState } from "react";

const StatsAndFigs = () => {
const [like,setLike]=useState(0)
const [read,setRead]=useState(0)
const [acountType,setAcountType]=useState(null);
console.log(acountType)

  const post = useSelector((state) => {
    return state.menu.readPost;
  });
  console.log(post);

  const postID = post[0]._id;


 

  const getPostRelatedData = async () => {
    const data = {
      id: postID,
      email:localStorage.getItem("email")
    };

    const getData = await fetch(`${VITE_BASE_URL}/getuserData`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response=await getData.json();
    console.log(response)


    //total numbers of likes...
    if(response.likeData===null){
        setLike(0)
    }else{
        const totalLikes=response.likeData.usersLiked.length;
        setLike(totalLikes)

    }

    //number times users read data...
    if(response.readData===null){
        setRead(0)
    }else{
        const totalRead=response.readData.usersReadPost.length;
        setRead(totalRead);
    }

    const acountType=response.user.acountType;
    setAcountType(acountType);
}
  
  useEffect(()=>{
     getPostRelatedData();
  },[]);

  return (
  <>
  {acountType=="Admin"?
    <div className="flex items-center mt-10 text-cust-white">
      <div className="flex w-[23rem]  mx-auto">
        <div className="w-[11rem] h-[10rem] flex flex-col justify-center items-center">
            <h1 className=" text-[2rem]" >{like}</h1>
          <img src={love} alt="" className="h-[3rem] w-[3rem] mb-1" />
          <p className="text-center text-[15px] px-4">
            Total number of users liked.
          </p>
        </div>
        <div className=" w-[11rem] h-[10rem] flex flex-col justify-center items-center">
            <h1 className=" text-[2rem]" >{read}</h1>
          <img src={book} alt="" className="h-[3rem] w-[3rem] mb-1" />
          <p className="text-center text-[15px] px-4">Total number of users read.</p>
        </div>
      </div>
    </div>:console.log("***")}
  </>
  );
};

export default StatsAndFigs;
