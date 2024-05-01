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

function App() {
  const [counter, setCounter] = useState(0);
  const myValue = useSelector((state) => state.menu.value);

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
      <div id="parentContainer" className="bg-cust-white shadow-3xl">
        <Routes>
          <Route path="/" element={<MainContainer/>}>
            <Route index element={<Body />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/dashboard" element={<Dashboard />} />
            <Route path="/login/admindashboard" element={<Admin/>}/>
            <Route path="/admindashboard/createpost" element={<Createpost/>}/>
            <Route path="/admindashboard/reviewpost" element={<AdminReview/>}/>
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
