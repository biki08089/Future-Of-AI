import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const GoPrev = () => {
    const navigate = useNavigate();
    const goBack = () => {
      navigate(-1);
    };
    return (
      <div className="bg-cust-black h-[3rem] text-[1.4rem] pt-3 pl-4 text-cust-white">
        <FaArrowLeftLong onClick={goBack} />
      </div>
    );
};

export default GoPrev