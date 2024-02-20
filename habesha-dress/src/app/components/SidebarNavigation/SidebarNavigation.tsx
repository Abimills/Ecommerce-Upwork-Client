import React from "react";
import { CiUser } from "react-icons/ci";
import { MdPhoneAndroid } from "react-icons/md";
import { IoMailUnreadOutline } from "react-icons/io5";
import { HiShoppingBag } from "react-icons/hi2";
import { CiLocationOn } from "react-icons/ci";
import { PiSignIn } from "react-icons/pi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toggleShowSidebar } from "@/app/lib/cartSlice/cartSlice";

const SidebarNavigation: React.FC = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleShowSidebar());
  };
  return (
    <div className="w-full h-full relative ">
      {/* <div className="text-center">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          onClick={() => window.scrollTo(0, 0)}
        >
          Show navigation
        </button>
      </div> */}

      <div className="fixed top-0 left-0 z-40 w-1/3 h-screen p-4 overflow-y-auto transition-transform  bg-white ">
        <h5 className="text-xl mb-8 font-semibold text-gray-800 uppercase dark:text-gray-400">
          HabeshaD
        </h5>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <AiOutlineClose className="w-5 h-5" onClick={handleClose} />
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <button className=" w-full flex items-center p-2 text-gray-900  cursor-pointer">
                <span className="ms-3 font-bold font-poppins tracking-wider hover:underline leading-4 text-xl uppercase">
                  Zurya
                </span>
                <HiOutlineArrowNarrowRight className="w-16 text-xl hover:text-green-400 " />
              </button>
            </li>
            <li>
              <button className=" w-full flex items-center p-2 text-gray-900  cursor-pointer">
                <span className="ms-3 font-bold font-poppins tracking-wider hover:underline leading-4 text-xl uppercase">
                  Shifon
                </span>
                <HiOutlineArrowNarrowRight className="w-16 text-xl hover:text-green-400 " />
              </button>
            </li>
            <li>
              <button className=" w-full flex items-center mb-8 p-2 text-gray-900  cursor-pointer">
                <span className="ms-3 font-bold font-poppins tracking-wider hover:underline leading-4 text-xl uppercase">
                  Men
                </span>
                <HiOutlineArrowNarrowRight className="w-16 text-xl hover:text-green-400 " />
              </button>
            </li>

            <li>
              <button className=" w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 group">
                <CiUser className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">My Account</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
              >
                <MdPhoneAndroid className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 " />

                <span className=" ms-3 whitespace-nowrap">App</span>
                <span className=" flex-1 inline-flex items-center justify-end px-2 ms-3 text-sm font-medium text-gray-800  ">
                  Pro
                </span>
              </button>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li>
            <li>
              <button
                type="button"
                className=" w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoMailUnreadOutline className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                <span className=" ms-3 whitespace-nowrap">Newsletter</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HiShoppingBag className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Recommended for you
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CiLocationOn className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Find a Store
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <PiSignIn className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
