import React from "react";
import github from "../images/logo/github.png";
import linkedIn from "../images/logo/social.png";
import instagram from "../images/logo/instagram.png";

const Footer = () => {
  return (
    <div className="h-[15rem] bg-cust-lightgray flex flex-col justify-evenly">
      <h2 className="text-center text-3xl font-semibold">Future</h2>
      <div className="flex justify-center">
        <a href="https://github.com/biki08089?tab=overview&from=2024-03-01&to=2024-03-20">
          <img
            data-aos="fade-right"
            src={github}
            className="h-[30px] w-[30px] mx-2"
            alt=""
          />
        </a>
        <a href="https://www.linkedin.com/in/bikash-pradhan-9b0541206/">
          <img
            data-aos="zoom-in"
            src={linkedIn}
            className="h-[30px] w-[30px] mx-2"
            alt=""
          />
        </a>
        <a href="https://www.instagram.com/viki_6370?igsh=cW9yZnZxeHo0bHBq">
          <img
            data-aos="fade-left"
            src={instagram}
            className="h-[30px] w-[30px] mx-2"
            alt=""
          />
        </a>
      </div>
      <p className="text-center font-[arial]">@Bikash Pradhan</p>
    </div>
  );
};

export default Footer;
