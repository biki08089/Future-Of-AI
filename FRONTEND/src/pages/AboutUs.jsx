import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-black h-[48rem] xl:h-[100vh] flex flex-col items-center justify-center text-cust-white font-normal lg:h-[52rem] lg:flex lg:w-[100%]">
      <h1 className="text-center text-[1.7rem] xl:text-[3.4rem]">About Us</h1>
      <p className="text-center text-[1.3rem]">"We are Future.com"</p>
      <p className="text-center w-[20rem] text-[1.2rem] 2xl:text-[1.8rem] xl:text-[1.5rem] md:w-[23rem] lg:w-[30rem] xl:w-[35rem]">
        At our core, we believe in innovation and continuous improvement. We
        constantly seek new ways to enhance our offerings and stay ahead of
        industry trends. By investing in cutting-edge technology and staying
        up-to-date with the latest advancements, we ensure that our customers
        receive the most advanced services available.
      </p>
      <br />
      <h1 className="text-center text-[1.7rem]">Address Details</h1>
      <p className="text-center w-[20rem] text-[1.2rem] lg:w-[30rem] 2xl:text-[1.7rem] xl:text-[1.5rem]">
        USA, North Dakota, Tele ph:+135930045855, City: Port Lavinia, Zip
        code:780374-772, E-mail:jgoyette@johnson.com
      </p>
    </div>
  );
};

export default AboutUs;
