import { useState, useEffect } from "react";
import Mynav from "./components/Mynav";
import Body from "./components/Body";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import { useSelector } from "react-redux";
import Mymenu from "./components/Mymenu";
import EmailVerify from "./pages/EmailVerify";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Content from "./pages/Content";
import Whishlist from "./pages/Whishlist";
import MainContainer from "./pages/MainContainer";
import Admin from "./pages/Admin";
import Createpost from "./pages/Createpost";
import AdminReview from "./pages/AdminReview";
import CreatorsPage from "./pages/CreatorsPage";
import ProfileDetails from "./components/ProfileDetails";

function App() {
  const [counter, setCounter] = useState(0);
  const myValue = useSelector((state) => state.menu.value);
  const profile = useSelector((state) => state.menu.profile);
  // const profileDetails = useSelector((state) => state.menu.profileDetails);


  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 800,
      easing: "ease",
    });
  }, []);

  return (
    <div className="relative">
      {counter == 1 ? <Mymenu setCounter={setCounter} myValue={myValue} /> : ""}
      <Mynav className="" setCounter={setCounter} myValue={myValue}></Mynav>
      <div id="parentContainer" className="bg-cust-white shadow-3xl relative">
        {profile ? (
          <ProfileDetails/>
        ) : (
          <h1></h1>
        )}
        <Routes>
          <Route path="/" element={<MainContainer />}>
            <Route index element={<Body />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/dashboard" element={<Dashboard />} />
            <Route path="/login/creatorspage" element={<CreatorsPage />} />
            <Route path="/login/admindashboard" element={<Admin />} />
            <Route path="/admindashboard/createpost" element={<Createpost />} />
            <Route
              path="/admindashboard/reviewpost"
              element={<AdminReview />}
            />
            <Route path="/dashboard/content" element={<Content />}></Route>
            <Route path="/dashboard/wishlist" element={<Whishlist />}></Route>
            <Route path="/login/forgotPass" element={<UpdatePassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/verify" element={<EmailVerify />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
          </Route>
        </Routes>
        <Footer></Footer>
        <Toaster></Toaster>
      </div>
    </div>
  );
}

export default App;


{/* <div
id="profile"
className=" h-screen w-full bg-black fixed z-20 top-0 left-0 flex justify-center items-center "
>
<div className="max-h-[17rem] w-[16rem] rounded-3xl bg-cust-bg px-3 pt-3 relative">
  <RxCross2
    size="20"
    className="absolute top-2 right-3"
    onClick={() => {
      dispatch(setProfiletrue(false));
    }}
  />
  <div className=" flex flex-col gap-4 justify-center items-center my-6">
    <HiUser
      size="50"
      className="text-cust-white bg-black p-2 rounded-full"
    />
    <p className="bg-cust-black text-[14px] text-cust-white w-[90%] px-4 py-2 text-center rounded-full shadow-3xl">
      {profileDetails.name}
    </p>
    <p className="bg-cust-black text-[14px] text-cust-white w-[90%] px-4 py-2 text-center rounded-full shadow-3xl">
      {profileDetails.email}
    </p>
    <p className="bg-cust-black text-[14px] text-cust-white w-[90%] px-4 py-2 text-center rounded-full shadow-3xl">
      {profileDetails.acountType}
    </p>
  </div>
</div>
</div> */}