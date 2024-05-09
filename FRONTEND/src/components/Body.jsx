import React from "react";
import robot from "../images/robot.jpeg";
import robot2nd from "../images/robot-2.jpeg";
import VR from "../images/VR.mp4";
import car1 from "../images/cars/car-1.jpeg";
import car2 from "../images/cars/car-2.jpeg";
import car3 from "../images/cars/car-3.jpeg";
import car4 from "../images/cars/car-4.jpeg";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userStatusLogout, userSignUp } from "../redux/firstSlice/firstSlice";
import { cartItem } from "../redux/firstSlice/myapiSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const valueFromLoc = localStorage.getItem("myValue");

  if (valueFromLoc == "true") {
    dispatch(userStatusLogout());
    dispatch(userSignUp());
    const valfromLoc = localStorage.getItem("totalCartItems");

    dispatch(cartItem(valfromLoc));
  }

  return (
    <div className="relative overflow-x-hidden">
      <div className=" h-[1.5rem] w-[2rem] rounded-xl absolute left-3 animate-bounceb mt-4 z-[1]  text-cust-white bg-cust-black flex justify-center items-center">
        <FaArrowLeftLong onClick={goBack} />
      </div>
      {/* section-1 */}
      <div
        id="robot-Container"
        className="h-[38rem] 2xl:h-[36rem] xl:h-[32rem] sm:h-[18rem] md:h-[22rem] lg:h-[27rem]  flex flex-col sm:flex-row"
      >
        <div data-aos="fade-right" className="h-[50%] sm:h-[100%] sm:w-[50%]">
          <img className="h-[100%] w-[100%]" src={robot} alt="No image" />{" "}
        </div>
        <div
          data-aos="fade-left"
          className="background-img h-[50%] sm:h-[100%] sm:w-[50%] flex justify-center items-center"
        >
          <div className="border-8 border-cust-white h-[15rem] lg:px-3 w-[14rem] md:w-[16rem] lg:w-[22rem] lg:h-[18rem] pt-2 pl-2">
            <h3 className="text-3xl lg:text-[2.5rem]">Future Technology</h3>
            <p className="pt-3 lg:text-[22px]">
              The future is fast approaching, and a new era of digital
              innovation and disruption is here.
            </p>
          </div>
        </div>
      </div>
      {/* section-2 */}
      <div
        data-aos="zoom-in"
        className="h-[17rem] backroundAi flex justify-center items-center flex-col"
      >
        <video
          className="w-[21rem] sm:w-[27rem] h-[12rem] sm:h-[15rem] md:h-[14rem] md:w-[25rem] rounded-lg shadow-3xl"
          loop
          controls
          muted
        >
          <source src={VR} type="video/mp4" className="" />
        </video>
      </div>

      {/* section-3 */}
      <div className="h-[37rem] sm:h-[24rem] sm:shadow-3xl flex flex-col-reverse sm:flex-row-reverse">
        <div
          data-aos="fade-right"
          className="h-[40%] sm:px-3 sm:h-[100%] sm:w-[55%]  bg-cust-white px-6 py-6 "
        >
          <img
            className="h-[100%] xl:h-[80%] lg:w-[70%] sm:h-[70%] sm:mt-8 md:w-[80%] md:ml-6 w-[100%] rounded-lg "
            src={robot2nd}
            alt="No image"
          />
        </div>
        <div
          data-aos="fade-left"
          className=" h-[60%]  sm:h-[100%] sm:w-[45%] sm:pl-3 flex justify-center items-center bg-cust-white"
        >
          <div className="h-[15rem] w-[20rem] xl:w-[23rem] xl:ml-[5rem] pl-2">
            <h6 className="font-medium text-cust-gray">
              ROBOTIC PROCESS AUTOMATION
            </h6>
            <h3 className="text-2xl">Can robots replace HR?</h3>
            <p className="pt-3 font-medium">
              Automation and artificial intelligence are hot topics these days
              This transformation has broad impacts
            </p>
            <p className="mt-2">
              The future is fast approaching, and a new era of digital
              innovation and disruption is here. Or, more accurately, according
              to Josh Bersin, “The future of work is already here.” So yes, the
              robots are coming.
            </p>
          </div>
        </div>
      </div>

      {/* section-4 */}
      <div className="flex  flex-col md:flex-row md:pt-7 lg:justify-center   px-6 mt-3 bg-cust-white">
        <div
          data-aos="zoom-in"
          className="bg-dark-green text-cust-white p-4 rounded lg:w-[22rem]"
        >
          <h3 className="text-xl font-medium  ">Technologies</h3>
          <p className="text-lg pt-2 italic font-light md:text-[16px]">
            The technology space has long been the most exciting and watched
            industry for a number of years now. Innovations in the sector have
            radically changed the way we live. In many cases, it has created
            completely new industries and services.
          </p>
        </div>
        <div data-aos="zoom-out" className="p-4 lg:w-[22rem] ">
          <h3 className="text-xl font-semibold ">Future Cars</h3>
          <p className="text-lg pt-2 italic font-light md:text-[16px]">
            The technology space has long been the most exciting and watched
            industry for a number of years now. Innovations in the sector have
            radically changed the way we live. In many cases, it has created
            completely new industries and services.
          </p>
        </div>
        <div data-aos="zoom-in" className="p-4 lg:w-[22rem] ">
          <h3 className="text-xl font-semibold ">Robots AI</h3>
          <p className="text-lg pt-2 italic font-light md:text-[16px]">
            The technology space has long been the most exciting and watched
            industry for a number of years now. Innovations in the sector have
            radically changed the way we live. In many cases, it has created
            completely new industries and services.
          </p>
        </div>
      </div>

      {/* section-5 */}
      <div className="flex xl:flex xl:flex-row xl:justify-center xl:my-[5rem]  md:px-[6rem]  flex-col lg:gap-x-8 lg:gap-y-6 md:gap-x-4 md:gap-y-1 sm:grid sm:px-4 sm:pb-6 sm:grid-cols-2 sm:grid-rows-2  sm:gap-y-2 items-center mt-6">
        <div
          data-aos="fade-left"
          className="flex justify-center items-center lg:justify-end "
        >
          <img
            className="w-[18rem] h-[13rem] xl:w-[15rem] xl:h-[11rem]  md:w-[20rem] mt-4 rounded-md lg:h-[16rem] lg:w-[22rem] "
            src={car1}
            alt="No image"
          />
        </div>
        <div
          data-aos="fade-right"
          className="flex justify-center items-center lg:justify-start "
        >
          <img
            className="w-[18rem] h-[13rem] xl:w-[15rem] xl:h-[11rem] md:w-[20rem]  mt-4 rounded-md lg:h-[16rem] lg:w-[22rem] "
            src={car2}
            alt="No image"
          />
        </div>
        <div
          data-aos="fade-left"
          className="flex justify-center items-center lg:justify-end"
        >
          <img
            className="w-[18rem] h-[13rem] xl:w-[15rem] xl:h-[11rem] md:w-[20rem]  mt-4 rounded-md lg:w-[22rem] lg:h-[16rem] "
            src={car3}
            alt="No image"
          />
        </div>
        <div
          data-aos="fade-right"
          className=" flex justify-center items-center lg:justify-start"
        >
          <img
            className="w-[18rem] h-[13rem] xl:w-[15rem] xl:h-[11rem] md:w-[20rem] mt-4 mb-9 sm:mb-0 rounded-md lg:w-[22rem] lg:h-[16rem] "
            src={car4}
            alt="No image"
          />
        </div>
      </div>

      {/* section-6 */}
      <div className="flex flex-col lg:justify-center md:flex-row px-6 mt-3 bg-cust-lite-black py-8 text-cust-white">
        <div data-aos="zoom-in" className="p-4 rounded lg:w-[22rem]">
          <h3 className="text-xl font-medium  md:text-md">
            MACHINES DO IT BETTER
          </h3>
          <p className="text-lg pt-2  font-light md:text-md">
            RPA can be an upgrade over humans when accuracy and speed count—not
            just in transaction processing but also in more complex tasks such
            as regulatory reporting and contract management.
          </p>
        </div>
        <div data-aos="zoom-out" className="p-4 lg:w-[22rem]">
          <h3 className="text-xl font-medium  md:text-md">
            “QUICK WIN” SOLUTIONS
          </h3>
          <p className="text-lg pt-2  font-light md:text-md">
            These technologies can scale rapidly, provide a means to capture
            operational expertise for broader deployment, and deliver services
            globally on a 24/7 schedule in multiple languages.
          </p>
        </div>
        <div data-aos="zoom-in" className="p-4 lg:w-[22rem]">
          <h3 className="text-xl font-medium  md:text-md">
            HIGHER-IMPACT SERVICES
          </h3>
          <p className="text-lg pt-2 font-light md:text-md">
            Automating parts of the annual compensation process enables the
            redeployment of HR resources to focus on coaching managers and
            developing engagement action plans. RPA can also directly increase
            HR
          </p>
        </div>
      </div>
    </div>
  );
};

export default Body;
