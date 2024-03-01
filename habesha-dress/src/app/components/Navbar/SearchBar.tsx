"use client";
import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import {
  toggleShowSearch,
  toggleShowSidebar,
  toggleShowSignIn,
} from "@/app/lib/cartSlice/cartSlice";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
// interface Props {
//   setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   setShow: React.Dispatch<React.SetStateAction<boolean>>;
// }
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
const SearchBar: React.FC<Props> = ({ showIcons }) => {
  const router = useRouter();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const favorites = useAppSelector((state: RootState) => state.cart.favorites);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
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
  useEffect(() => {
    const searchData = async () => {
      if (query !== "" || !query) {
        setData([]);
      }
      if (query && query !== "") {
        const res = await axios.get(
          `http://localhost:3000/api/search/?query=${query}`
        );
        console.log(res.data.cloths);
        if (res.data.cloths) {
          setData(res.data.cloths);
        }
      }
    };
    searchData();
  }, [query]);
  return (
    <div className="flex font-poppins text-base flex-col h-max z-10 absolute top-0  bg-white  w-full items-center ">
      <nav className="flex font-poppins text-base h-max   min-h-24  w-full items-center justify-between  ">
        {showIcons.navigation && (
          <div className="flex align-items w-max mr-3 gap-5   justify-start ">
            <GiHamburgerMenu
              className="text-2xl  ml-3 mt-1 mr-6 cursor-pointer"
              onClick={handleClose}
            />
            <h1
              className="font-semibold text-2xl cursor-pointer font-roboto"
              onClick={() => router.push("/")}
            >
              HabeshaD
            </h1>
          </div>
        )}
        <div className="flex  flex-1 align-items w-1\2  justify-between ">
          <ul className="flex justify-end flex-1 items-center gap-10 text-base font-roboto ">
            {showIcons.search && (
              <div className="flex items-center  border-b border-b-2 border-gray-700  w-full min-h-16    gap-3  ml-6  ">
                <input
                  type="text"
                  value={query}
                  onChange={(e: any) => setQuery(e.target.value)}
                  className=" w-full focus-none  text-xl tracking-widest outline-none border-none  font-roboto"
                  placeholder="What are you looking for? "
                />
                <IoIosArrowRoundForward
                  onClick={() => router.push(`/search/${query}`)}
                  className="text-3xl text-black cursor-pointer   h-full "
                />
              </div>
            )}
            {showIcons.search && (
              <div
                onClick={handleCloseSearch}
                className="h-8 w-8  cursor-pointer relative   flex items-center justify-center"
              >
                <IoCloseSharp className="text-4xl text-gray-800 cursor-pointer    h-full " />
              </div>
            )}
            {showIcons.user && (
              <div
                onClick={handleLogin}
                className="h-8 w-8  cursor-pointer relative rounded-full bg-indigo-100 border border-gray-100 flex items-center justify-center"
              >
                <HiOutlineUser className="text-3xl  h-full text-gray-600 rounded-full bg-indigo-100 p-0.5 border border-gray-100 cursor-pointer " />
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
                <span className=" bg-green-500 text-sm text-white px-2 cursor-pointer font-poppins rounded-full ">
                  {cartItems.length || 0}
                </span>
              </div>
            )}
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
      <div className="w-full flex items-center gap-4 justify-between flex-wrap">
        {data.length > 0 &&
          data?.slice(0, 11)?.map((item: any) => {
            return <ProductCard key={item._id} product={item} />;
          })}
      </div>
    </div>
  );
};

export default SearchBar;
