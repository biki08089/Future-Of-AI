import React, { useEffect } from "react";
import { FcNext } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import {
  storeAPIdata,
  updatePage,
  updatePageRev,
} from "../redux/firstSlice/myapiSlice";

const PageChanger = () => {
  const page = useSelector((state) => {
    return state.myAPI.page;
  });
  const getRes = useSelector((state) => {
    return state.myAPI.getData;
  });
  const defaultPage = useSelector((state) => {
    return state.myAPI.defaultPage;
  });

  const dispatch = useDispatch();

  const apiUrl = `https://api-0zk4.onrender.com/page=${page}`;

  const updatepage = async () => {
    dispatch(updatePage());
  };

  const updatepageRev = () => {
    dispatch(updatePageRev());
  };

  let response;
  const getData = async () => {
    const getmyData = await fetch(apiUrl);
    response = await getmyData.json();
    dispatch(storeAPIdata(response));
  };

  useEffect(() => {
    getData();
  }, [page]);

  // console.log("mtuyuig: "+apiData);
  return (
    <div className="sticky top-[8rem] z-10">
      <div className="h-[3rem] bg-cust-black flex justify-between items-center px-4 sm:px-12">
        <div className="flex">
          {page > 1 && (
            <FcNext
              onClick={updatepageRev}
              className="rotate-180 bg-black rounded-[50%] mr-3 p-1 h-[23px] w-[23px]"
            />
          )}
          {page < getRes.totalpages && (
            <FcNext
              onClick={updatepage}
              className=" bg-black rounded-[50%] p-1 h-[23px] w-[23px]"
            />
          )}
        </div>
        <p className="text-cust-white font-semibold">
          Page {defaultPage||page} of {getRes.totalpages}
        </p>
      </div>
    </div>
  );
};

export default PageChanger;
