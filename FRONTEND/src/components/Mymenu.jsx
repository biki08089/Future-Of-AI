import React from "react";
import remove from "../images/logo/remove.png";
import { useDispatch } from "react-redux";
import { incAnddec } from "../redux/firstSlice/firstSlice";
import { NavLink } from "react-router-dom";


const Mymenu = ({ setCounter, myValue }) => {
  const dispatch = useDispatch();
  const valueFromLoc = localStorage.getItem("myValue");

  const menuState = () => {
    dispatch(incAnddec());
    setCounter(myValue);
  };
 
  const removeMenu=()=>{
    setCounter(0);
  }

  return (
    <div
      data-aos="fade-right"
      className=" h-[100vh] w-[14rem] text-cust-white text-lg bg-black opacity-95 z-20 fixed"
    >
      <div className=" py-3 px-2">
        <img
          onClick={menuState}
          className="h-[30px] w-[30px] opacity-95 float-end "
          src={remove}
          alt=""
        />
      </div>
      <h1 className="text-center mt-8 mb-3">Hello! Want to explore</h1>
      <hr className="opacity-20" />
      <NavLink to={valueFromLoc=="true"?"/login/dashboard":"/signup"}>
        <p onClick={removeMenu} className="my-2 text-center hover:animate-pulse">
          {valueFromLoc=="true"?<span>Dashboard</span>:<span>Sign up</span> }</p>
      </NavLink>
      <hr className="opacity-20" />
      <NavLink to="/login">
        <p onClick={removeMenu} className="my-2 text-center hover:animate-pulse">
        {valueFromLoc=="true"?<span>Logout</span>:<span>Login</span> }</p>

         
      </NavLink>
      <hr className="opacity-20" />

      <NavLink to="/about">
        <p onClick={removeMenu} className="my-2 text-center hover:animate-pulse">About Us</p>
      </NavLink>
      <hr className="opacity-20" />
      <NavLink to="/contact">
        <p onClick={removeMenu} className="my-2 text-center hover:animate-pulse">Contact Us</p>
      </NavLink>
      <hr className="opacity-20" />
    </div>
  );
};

export default Mymenu;
