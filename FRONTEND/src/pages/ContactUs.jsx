import React from "react";

const ContactUs = () => {
  return (
    <div>
      <div className="h-[100vh]  flex flex-col justify-center items-center bg-black">
        <div
          data-aos="zoom-in"
          className="bg-black text-cust-white"
        >
          <h1 className="text-center mb-2 text-[22px]">Address Details</h1>
          <p className="text-center w-[20rem] text-[14px] lg:w-[30rem]">
            INDIA, Odisha, Tele ph:+135930045855, City: bhubaneswar, Zip
            code:780374-772, E-mail:jgoyette@johnson.com
          </p>
        </div>
        <div data-aos="zoom-out" >
          <form className="max-w-[18rem] text-sm bg-cust-white h-[24rem] w-[18rem] px-4 py-4 rounded-xl mt-3 font-[arial] font-medium">
            <label className="" htmlFor="fullname">
              Full Name
            </label>
            <br />
            <input
              className="bg-cust-lightgray pl-3 mt-1 h-[2.5rem] w-[100%] rounded-2xl mb-3"
              placeholder="Enter you fullname"
              type="text"
              name="fullname"
            />
            <br />
            <label className="" htmlFor="email">
              Your Email Id
            </label>
            <br />
            <input
              className="bg-cust-lightgray pl-3 mt-1 h-[2.5rem] w-[100%] rounded-2xl mb-3"
              placeholder="Enter you email"
              type="email"
              name="email"
            />
            <br />
            <label className="" htmlFor="feedback">Your feedback</label> <br />

            <textarea required name="feedback" rows="6" cols="32" className="resize-none bg-cust-lightgray border rounded-md" />
<br />
            <button className="rounded-xl mt-2 px-6 py-2 font-bold text-cust-white bg-black">
             Submit Feedback
            </button>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
