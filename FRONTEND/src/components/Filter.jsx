import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeAPIdata,updateToDefault } from "../redux/firstSlice/myapiSlice";
import { IoHomeOutline } from "react-icons/io5";

const Filter = () => {
  const apiData = useSelector((state) => {
    return state.myAPI.getData;
  });
  const dispatch = useDispatch();
  let apiUrl;
  const updateAPI = async (event) => {
    const catagory = event.target.value;
    apiUrl = `https://api-0zk4.onrender.com/${catagory}`;

    const getData = await fetch(apiUrl);
    const response = await getData.json();
    const blogpage = response.page;

    dispatch(storeAPIdata(response));
    dispatch(updateToDefault(blogpage))
  
  };

   const reload=()=>{
    window.location.reload();
   }
  return (
    <div className="flex justify-between pt-2 sm:px-12">
      <div className="mx-3 text-cust-white ">
        <label htmlFor="catagory" className=" font-semibold">
          Catagory :{" "}
        </label>
        <select
          onChange={updateAPI}
          name="catagory"
          id=""
          className="py-1 rounded-lg text-[13px] pl-2 bg-cust-black"
        >
          <option value="Select" defaultValue="Select">
            Select Catagory
          </option>
          <option value="health">Health</option>
          <option value="autonomous">Autonomous</option>
          <option value="ethicaluse">EthicalUse</option>
          <option value="trading">Trading</option>
          <option value="climate">Climate</option>
          <option value="education">Education</option>
        </select>
      </div>
      <IoHomeOutline onClick={reload} className="mx-5 w-[23px] h-[23px] text-cust-white " data-aos="zoom-in" />
    </div>
  );
};

export default Filter;
