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
import { ToastContainer, toast } from "react-toastify";
import WelcomeUserProfile from "../components/WelcomeUserProfile/WelcomeUserProfile";
import OrderUserProfile from "../components/OrderUserProfile/OrderUserProfile";
import UserSetting from "../components/UserSetting/UserSetting";
import { loginSuccess, logout } from "../lib/authSlice/authSlice";
import {
  setFavorites,
  setItems,
  toggleShowSignIn,
} from "../lib/cartSlice/cartSlice";
import Navbar from "../components/Navbar/Navbar";
import SingleNavigation from "../components/singleItemNavigation/SingleNav";
import SingleSearchBar from "../components/Searchbar/Searchbar";
import SearchBar from "../components/Navbar/SearchBar";
import Login from "../components/LoginSlider/Login";
import SidebarNavigation from "../components/SidebarNavigation/SidebarNavigation";
import ToggleSubscribe from "../components/NewsletterSlider/ToggleSubscribe";

const UserProfile: React.FC = () => {
  // const [show, setShow] = useState(["welcome", "order"]);
  const dispatch = useDispatch();
  const showNewsletter = useSelector((state: any) => state.cart.showNewsletter);
  const showSignIn = useSelector((state: any) => state.cart.showSignIn);
  const showSidebar = useSelector((state: any) => state.cart.showSidebar);
  const router = useRouter();
  const [activePage, setActivePage] = useState("welcome");
  const user = useSelector((state: any) => state.auth.user);
  const showSearch = useSelector((state: any) => state.cart.showSearch);

  const firstName = user?.name?.split(" ")[0];
  const handleLogout = () => {
    dispatch(logout());
    // dispatch(toggleShowSignIn());
    toast.success(`Logged out! , See you soon`);
    router.push("/");
  };
  // TODO REMOVE THE FOOTER FROM ALL CHILD COMPS OF USER-PROFILE AND APPLY TO HOME COMP
  const showIcons = {
    search: true,
    user: false,
    wishlist: true,
    cart: true,
    navigation: true,
  };
  useEffect(() => {
    toast.success("You are Signed In");
    const carts = localStorage.getItem("cart") as any;
    const favorites = localStorage.getItem("favorites") as any;
    const user = localStorage.getItem("user") as any;
    if (carts !== null) {
      dispatch(setItems(JSON.parse(carts)));
    }
    if (favorites !== null) {
      dispatch(setFavorites(JSON.parse(favorites)));
    }
    if (user !== null) {
      dispatch(loginSuccess(JSON.parse(user)));
    }
  }, []);
  return (
    <main className="w-full text-black min-h-screen font-Dosis flex flex-col bg-white ">
      {showSearch ? (
        <SearchBar showIcons={showIcons} />
      ) : (
        <Navbar showIcons={showIcons} />
      )}
      <ToastContainer />
      {showSidebar && <SidebarNavigation />}
      {showSignIn && <Login />}
      {showNewsletter && <ToggleSubscribe />}
      <div className="flex w-full flex-col justify-center items-center h-max ">
        <div className="w-full text-center mb-4 p-10">
          <h1 className="font-semibold text-2xl"> Hi {firstName}!</h1>
        </div>
        <div className="w-full flex flex-wrap sm:flex-nowrap justify-center items-center gap-16 sm:gap-32 sm:px-10 border-b border-gray-300 border-b-2">
          <div
            onClick={() => setActivePage("welcome")}
            className="flex flex-col relative justify-center cursor-pointer items-center h-24"
          >
            <RiHome2Line
              className={`${
                activePage === "welcome" ? "text-black" : "text-gray-400"
              } text-xl sm:text-3xl mb-4 `}
            />
            <p
              className={`${
                activePage === "welcome" ? "font-semibold " : "font-base"
              }   mb-4 text-sm sm:text-base   leading-4`}
            >
              Welcome
            </p>
            {activePage === "welcome" && (
              <div className="w-16 sm:w-20 h-1 bg-black bottom-0 absolute"></div>
            )}
          </div>
          <div
            onClick={() => setActivePage("order")}
            className="flex flex-col relative justify-center cursor-pointer items-center h-24"
          >
            <MdOutlineLibraryBooks
              className={`${
                activePage === "order" ? "text-black" : "text-gray-400"
              } text-xl sm:text-3xl mb-4 `}
            />
            <p
              className={`${
                activePage === "order" ? "font-semibold " : "font-base"
              } text-sm sm:text-base  mb-4   leading-4`}
            >
              Orders
            </p>
            {activePage === "order" && (
              <div className="w-16 sm:w-20 h-1 bg-black bottom-0 absolute"></div>
            )}
          </div>

          <div
            onClick={() => setActivePage("profile")}
            className="flex flex-col relative justify-center cursor-pointer items-center  h-24"
          >
            <FaRegUser
              className={`${
                activePage === "profile" ? "text-black" : "text-gray-400"
              } text-xl text-3xl mb-4 `}
            />
            <p
              className={`${
                activePage === "profile" ? "font-semibold " : "font-base"
              } text-sm sm:text-base  mb-4   leading-4`}
            >
              Profile
            </p>
            {activePage === "profile" && (
              <div className="w-20 h-1 bg-black bottom-0 absolute"></div>
            )}
          </div>
          {/* <div className="flex flex-col justify-center cursor-pointer items-center h-24">
            <TbBulb className="text-3xl text-gray-500 mb-4" />
            <p className=" text-gray-500 leading-4">Help</p>
          </div> */}
          <div
            className="flex flex-col hidden sm:inline  justify-center cursor-pointer items-center h-24"
            onClick={handleLogout}
          >
            <FiLogOut className="text-xl  sm:text-2xl  text-gray-500 mb-4" />
            <p className="font-base text-sm sm:text-base text-gray-500 leading-4">
              Log out
            </p>
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
      <div className="mt-32">
        <Footer />
      </div>
    </main>
  );
};

export default UserProfile;
