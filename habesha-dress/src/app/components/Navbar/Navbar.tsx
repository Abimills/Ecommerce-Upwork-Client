"use client";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiSearch } from "react-icons/tfi";
import { TbSearch } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineUser } from "react-icons/hi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import {
  toggleShowSearch,
  toggleShowSidebar,
  toggleShowSignIn,
} from "@/app/lib/cartSlice/cartSlice";
import { useDispatch } from "react-redux";

interface ShowTypes {
  search: Boolean;
  user: Boolean;
  wishlist: Boolean;
  cart: Boolean;
  navigation: Boolean;
}
interface Props {
  showIcons: ShowTypes;
}

const Navbar: React.FC<Props> = ({ showIcons }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems: any = useAppSelector((state: RootState) => state.cart.items);
  const favorites: any = useAppSelector(
    (state: RootState) => state.cart.favorites
  );
  const user: any = useAppSelector((state: RootState) => state.auth.user);

  const handleCloseSearch = () => {
    dispatch(toggleShowSearch());
  };
  const handleClose = () => {
    dispatch(toggleShowSidebar());
  };
  const handleLogin = () => {
    if (user && user?.email) {
      router.push("/user-profile");
    } else if (!user || !user?.email) {
      dispatch(toggleShowSignIn());
    }
  };

  return (
    <div className="flex   font-poppins text-base  flex-col h-max    w-full items-center ">
      <nav className="flex font-poppins text-base h-max min-h-16  w-full items-center justify-between  ">
        {showIcons.navigation && (
          <div className="flex items-center w-max mr-3 gap-5 h-16   justify-center ">
            <GiHamburgerMenu
              className="text-2xl  ml-3 mt-1 mr-6 cursor-pointer"
              onClick={handleClose}
            />
            <h1
              className="font-semibold text-2xl cursor-pointer font-Dosis"
              onClick={() => router.push("/")}
            >
              HabeshaD
            </h1>
          </div>
        )}
        <div className="flex  flex-1 align-items w-1\2  h-16   justify-between ">
          <ul className="flex justify-end flex-1 items-center gap-10 text-base font-Dosis ">
            {/* <div className="flex items-center  bg-alice-blue   gap-3  ml-3  ">
            <input
              type="text"
              className=" w-full indent-3 my-2 bg-alice-blue border-b border-gray-700   h-full text-sm outline-none"
              placeholder="What are you looking for? "
            />
          </div> */}
            {showIcons.search && (
              <div
                onClick={handleCloseSearch}
                className="h-8  cursor-pointer w-8 flex items-center justify-center"
              >
                <TfiSearch className="text-2xl w-full text-gray-800 cursor-pointer p-1     h-full " />
              </div>
            )}
            {showIcons.user && (
              <div
                onClick={handleLogin}
                className="h-8 w-8  cursor-pointer relative rounded-full bg-indigo-100 border border-gray-100 flex items-center justify-center"
              >
                <HiOutlineUser className="text-3xl w-full h-full text-gray-600 rounded-full bg-indigo-100 p-0.5 border border-gray-100 cursor-pointer " />
                {user?.email && (
                  <div className="h-max w-max bg-alice-blue p-0.5 rounded-full absolute bottom-0.5 right-0.5">
                    <div className="h-2 w-2  bg-black rounded-full"></div>
                  </div>
                )}
              </div>
            )}
            {showIcons.wishlist && (
              <div
                onClick={() => router.push("/wishlist")}
                className="h-8 w-8  cursor-pointer relative rounded-full bg-indigo-100 border border-gray-100 w-8 flex items-center justify-center"
              >
                <FaRegHeart className="text-2xl  h-full text-gray-600    cursor-pointer  " />

                {favorites?.length > 0 && (
                  <div className="h-max w-max bg-alice-blue p-0.5 rounded-full absolute bottom-0.5 right-0.5">
                    <div className="h-2 w-2  bg-black rounded-full"></div>
                  </div>
                )}
              </div>
            )}
            {showIcons.cart && (
              <div className="mr-4 w-max h-full  flex items-center">
                <div
                  onClick={() => router.push("/cart")}
                  className="h-8 w-8 relative w-8  cursor-pointer rounded-full bg-indigo-100 border border-gray-100 flex items-center justify-center "
                >
                  <LiaShoppingBagSolid className="text-3xl w-full h-full text-gray-600 rounded-full bg-indigo-100  border border-gray-100 cursor-pointer " />
                  {cartItems?.length > 0 && (
                    <div className="h-max w-max bg-alice-blue p-0.5 rounded-full absolute bottom-0.5 right-0.5">
                      <div className="h-2 w-2  bg-black rounded-full"></div>
                    </div>
                  )}
                </div>
                <span
                  className={` ${
                    cartItems?.length > 0 ? "bg-red-700" : "bg-gray-800"
                  }  text-sm text-white px-2 cursor-pointer font-poppins rounded-full `}
                >
                  {cartItems?.length || 0}
                </span>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
