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
interface Props {
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<Props> = ({ setIsSearching, setIsOpen }) => {
  const router = useRouter();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  return (
    <div className="flex font-poppins text-base flex-col h-max z-10 absolute top-0  bg-white  w-full items-center ">
      <nav className="flex font-poppins text-base h-max   min-h-24  w-full items-center justify-between  ">
        <div className="flex align-items w-max mr-3 gap-5   justify-start ">
          <GiHamburgerMenu className="text-2xl  ml-3 mt-1 mr-6" />
          <h1
            className="font-semibold text-2xl cursor-pointer font-roboto"
            onClick={() => router.push("/")}
          >
            HabeshaD
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
        <div className="flex  flex-1 align-items w-1\2  justify-between ">
          <ul className="flex justify-end flex-1 items-center gap-10 text-base font-roboto ">
            <div className="flex items-center  border-b border-b-2 border-gray-700  w-full min-h-16    gap-3  ml-6  ">
              <input
                type="text"
                className=" w-full  text-xl tracking-widest outline-none  font-roboto"
                placeholder="What are you looking for? "
              />
              <IoIosArrowRoundForward className="text-3xl text-black cursor-pointer   h-full " />
            </div>
            <IoCloseSharp
              onClick={() => setIsSearching(false)}
              className="text-4xl text-gray-800 cursor-pointer    h-full "
            />
            <HiOutlineUser
              onClick={() => setIsOpen(true)}
              className="text-3xl h-full text-gray-600  cursor-pointer "
            />
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
      <div className=" bg-gray-100 bg-opacity-25 flex flex-col justify-center  p-10 px-56 w-full h-40  transition-opacity">
        <h1 className="font-semibold text-xl mb-8">Quick links</h1>
        <p className=" text-md text-gray-500 underline mb-4">Habesha Stores</p>
        <p className=" text-md text-gray-500 underline mb-4">
          Search by category
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
