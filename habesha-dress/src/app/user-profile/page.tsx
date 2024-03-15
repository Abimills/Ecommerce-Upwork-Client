"use client";
import { IoMdArrowBack } from "react-icons/io";
// import data from "../components/Products/allProducts";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";
import Footer from "../components/Footer/Footer";
import ProductCard from "../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RiHome2Line } from "react-icons/ri";
import { PiDressLight } from "react-icons/pi";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { TbBulb } from "react-icons/tb";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

import WelcomeUserProfile from "../components/WelcomeUserProfile/WelcomeUserProfile";
import OrderUserProfile from "../components/OrderUserProfile/OrderUserProfile";
import UserSetting from "../components/UserSetting/UserSetting";
import { logout } from "../lib/authSlice/authSlice";
import { toggleShowSignIn } from "../lib/cartSlice/cartSlice";
import Navbar from "../components/Navbar/Navbar";
import SingleNavigation from "../components/singleItemNavigation/SingleNav";
import SingleSearchBar from "../components/Searchbar/Searchbar";
import SearchBar from "../components/Navbar/SearchBar";
import Login from "../components/LoginSlider/Login";

const UserProfile: React.FC = () => {
  // const [show, setShow] = useState(["welcome", "order"]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [activePage, setActivePage] = useState("welcome");
  const user = useSelector((state: any) => state.auth.user);
  const showSearch = useSelector((state: any) => state.cart.showSearch);

  const firstName = user?.name?.split(" ")[0];
  const handleLogout = () => {
    dispatch(logout());
    dispatch(toggleShowSignIn());
    router.push("/");
  };
  // TODO REMOVE THE FOOTER FROM ALL CHILD COMPS OF USER-PROFILE AND APPLY TO HOME COMP
  const showIcons = {
    search: true,
    user: true,
    wishlist: true,
    cart: true,
    navigation: true,
  };
  return (
    <main className="w-full min-h-screen font-Dosis flex flex-col bg-white ">
      {showSearch ? (
        <SearchBar showIcons={showIcons} />
      ) : (
        <Navbar showIcons={showIcons} />
      )}

      <div className="flex w-full flex-col justify-center items-center h-max ">
        <div className="w-full text-center mb-4 p-10">
          <h1 className="font-semibold text-2xl"> Hi {firstName}!</h1>
        </div>
        <div className="w-full flex justify-center items-center gap-32 px-10 border-b border-gray-300 border-b-2">
          <div
            onClick={() => setActivePage("welcome")}
            className="flex flex-col relative justify-center cursor-pointer items-center h-24"
          >
            <RiHome2Line className="text-3xl mb-4" />
            <p className="font-semibold  leading-4 ">Welcome</p>
            {activePage === "welcome" && (
              <div className="w-20 h-1 bg-black bottom-0 absolute"></div>
            )}
          </div>
          <div
            onClick={() => setActivePage("order")}
            className="flex flex-col relative justify-center cursor-pointer items-center h-24"
          >
            <MdOutlineLibraryBooks className="text-2xl text-gray-500 mb-4" />
            <p className=" text-gray-500 leading-4">Orders</p>
            {activePage === "order" && (
              <div className="w-20 h-1 bg-black bottom-0 absolute"></div>
            )}
          </div>

          <div
            onClick={() => setActivePage("profile")}
            className="flex flex-col relative justify-center cursor-pointer items-center  h-24"
          >
            <FaRegUser className="text-2xl text-gray-500 mb-4" />
            <p className=" text-gray-500 leading-4">Profile</p>
            {activePage === "profile" && (
              <div className="w-20 h-1 bg-black bottom-0 absolute"></div>
            )}
          </div>
          {/* <div className="flex flex-col justify-center cursor-pointer items-center h-24">
            <TbBulb className="text-3xl text-gray-500 mb-4" />
            <p className=" text-gray-500 leading-4">Help</p>
          </div> */}
          <div
            className="flex flex-col justify-center cursor-pointer items-center h-24"
            onClick={handleLogout}
          >
            <FiLogOut className="text-2xl  text-gray-500 mb-4" />
            <p className="font-base text-gray-500 leading-4">Log out</p>
          </div>
        </div>
        {activePage === "welcome" ? (
          <WelcomeUserProfile />
        ) : activePage === "order" ? (
          <OrderUserProfile />
        ) : activePage === "profile" ? (
          <UserSetting />
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default UserProfile;
