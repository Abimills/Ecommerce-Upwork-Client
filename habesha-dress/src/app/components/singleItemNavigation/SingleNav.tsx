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

// interface Props {
//   setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   setShow: React.Dispatch<React.SetStateAction<boolean>>;
// }

const SingleNavigation: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const handleCloseSearch = () => {
    dispatch(toggleShowSearch());
  };
  const handleClose = () => {
    dispatch(toggleShowSidebar());
  };
  return (
    <div className="flex font-poppins text-base flex-col h-max   w-full items-center ">
      <nav className="flex font-poppins text-base h-max   min-h-16  w-full items-center justify-between  ">
        <div className="flex align-items w-max mr-3 gap-5   justify-start ">
          {/* <GiHamburgerMenu
            className="text-2xl  ml-3 mt-1 mr-6"
            onClick={handleClose}
          />
          <h1
            className="font-semibold text-2xl cursor-pointer font-roboto"
            onClick={() => router.push("/")}
          >
            HabeshaD
          </h1> */}
          <h1 className=" text-lg ml-4 text-gray-600 tracking-tight font-base cursor-pointer">
            <span
              className="hover:underline text-green-400 mx-2"
              onClick={() => router.push("/")}
            >
              Home
            </span>
            {">"}

            <span className=" hover:underline text-green-400 mx-2 ">
              Product
            </span>
          </h1>
          {/* <ul className="flex align-items w-4/5 justify-between ">
          <li
            className="ml-8 flex align-items text-green-400 font-semibold cursor-pointer"
            onClick={() => router.push("/")}
          >
            <RxDragHandleDots2 className="flex align-items mt-1" />
            Home
          </li>
          <li className="ml-8 font-semibold text-green-400">Today's Deals</li>
          <li className="ml-8 font-semibold text-green-400">Populars</li>
          <li
            className="ml-8 font-semibold cursor-pointer text-green-400"
            onClick={() => router.push("/contact")}
          >
            Contact
          </li>
        </ul> */}
        </div>
        <div className="flex  flex-1 align-items w-1\2 mt-1  justify-between ">
          <ul className="flex justify-end flex-1 items-center gap-10 text-base font-roboto ">
            {/* <div className="flex items-center  bg-alice-blue   gap-3  ml-3  ">
            <input
              type="text"
              className=" w-full indent-3 my-2 bg-alice-blue border-b border-gray-700   h-full text-sm outline-none"
              placeholder="What are you looking for? "
            />
          </div> */}
            <TfiSearch
              onClick={handleCloseSearch}
              className="text-2xl text-gray-800 cursor-pointer    h-full "
            />
            {/* <HiOutlineUser
              onClick={() => dispatch(toggleShowSignIn())}
              className="text-3xl h-full text-gray-600  cursor-pointer "
            /> */}
            <FaRegHeart
              className="text-2xl h-full text-gray-600   cursor-pointer  "
              onClick={() => router.push("/wishlist")}
            />
            <div className="mr-4 w-max h-full  flex items-center">
              <LiaShoppingBagSolid
                className="text-3xl h-full text-gray-600  cursor-pointer "
                onClick={() => router.push("/cart")}
              />
              <span className=" bg-green-400 text-white px-2 rounded-full ">
                {cartItems.length || 0}
              </span>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SingleNavigation;
