"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
// import { data } from "./data";
import { IoCloseOutline } from "react-icons/io5";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toggleShowSignIn } from "@/app/lib/cartSlice/cartSlice";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";

import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { GiShoppingBag } from "react-icons/gi";
import { GiBodyHeight } from "react-icons/gi";
interface Props {
  data: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<any>>;
}
const Preview: React.FC<Props> = ({ data, open, setOpen }) => {
  const [isFavored, setIsFavored] = useState(false);
  const showSignIn = useSelector((state: any) => state.cart.showSignIn);
  const priceString = parseFloat(data?.discountedPrice)?.toFixed(2);
  const [wholePart, decimalPart] = priceString.split(".");
  const originalPriceString = parseFloat(data?.price).toFixed(2);
  const [originalWholePart, originalDecimalPart] =
    originalPriceString.split(".");

  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll   bg-white shadow-xl">
                    <div className="flex-1  px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Preview
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={handleClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      {/* login section */}
                      <ToastContainer />
                      <section className="w-full h-full flex    flex-col  items-center justify-center">
                        <div className="bg-white w-full flex-col h-max mb-16  py-4">
                          <div className="w-full px-4 sm:px-6 lg:px-0">
                            <div className="flex flex-col  ">
                              <div className="md:flex-1 px-4">
                                <div className="h-[300px] rounded-lg  mb-4">
                                  <img
                                    className="w-full hover:bg-yellow-300 h-full object-contain bg-indigo-100 border border-gray-100 rounded-lg overflow-hidden transition-opacity duration-800 "
                                    src={data?.img}
                                    alt="Product Image"
                                  />
                                </div>
                              </div>
                              <div className=" w-full md:flex-1  px-4 ">
                                <div className=" w-full flex items-start justify-between mb-6 ">
                                  <h2 className="text-3xl max-w-80 font-Dosis font-semibold text-gray-800  ">
                                    <span className="mb-4 ">{data?.title}</span>{" "}
                                    <br />
                                    <span className="font-medium text-base text-gray-400">
                                      #{data?.forWhichGender}
                                    </span>
                                  </h2>
                                  {isFavored ? (
                                    <IoIosHeart className="  text-3xl mx-1  text-red-600  cursor-pointer" />
                                  ) : (
                                    <IoIosHeartEmpty className="  text-3xl mx-1  text-gray-700 cursor-pointer " />
                                  )}
                                </div>

                                <div className="flex mb-4 justify-between">
                                  <p className="text-3xl  text-gray-900 leading-10 font-Dosis font-bold  cursor-pointer">
                                    <span className="text-sm font-Dosis font-semibold text-black relative bottom-2 mr-0.5  ">
                                      $
                                    </span>
                                    {wholePart}
                                    <span className="text-base font-Dosis font-semibold relative bottom-1 mr-0.5  ">
                                      {decimalPart}
                                    </span>
                                  </p>
                                  <p className="text-2xl  text-gray-200 leading-10  line-through font-Dosis font-semibold cursor-pointer">
                                    <span className="text-sm font-Dosis font-semibold text-gray-300 relative bottom-2 mr-0.5  ">
                                      $
                                    </span>
                                    {originalWholePart}
                                    <span className="text-base font-Dosis font-semibold relative bottom-1 mr-0.5  ">
                                      {originalDecimalPart}
                                    </span>
                                  </p>
                                </div>

                                <div className="w-full flex flex-wrap  items-center justify-between mb-8 mt-4 ">
                                  <div className="  w-full flex items-center gap-4">
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    <p className="w-40 text-gray-300">
                                      Available
                                    </p>
                                  </div>
                                  <ul className="w-max my-1 flex gap-1 mb-4">
                                    {Array(parseFloat(data?.rating))
                                      .fill("")
                                      .map((_, index) => (
                                        <li>
                                          <GoStarFill className="text-lg text-orange-500" />
                                        </li>
                                      ))}
                                    {data?.rating < 5 &&
                                      Array(5 - data?.rating)
                                        .fill("")
                                        .map((_, index) => (
                                          <li>
                                            <GoStar className="text-lg text-gray-500" />
                                          </li>
                                        ))}
                                  </ul>
                                </div>
                                <div className="mb-12 w-full flex items-center  justify-between">
                                  {/* <h1 className="font-bold text-gray-700 dark:text-gray-300">
                  Size:
                </h1>

                <div className="flex  items-center mt-2 ">
                  {data?.availableSizes?.map((size: any) => {
                    return sizeChoose === size ? (
                      <button
                        onClick={() => setSizeChose(size)}
                        className="bg-indigo-400 dark:bg-gray-700 text-white  py-2 px-4 rounded-full font-bold mr-2 hover:bg-indigo-400 hover:text-white "
                      >
                        {size}
                      </button>
                    ) : (
                      <button
                        onClick={() => setSizeChose(size)}
                        className="bg-indigo-100 dark:bg-gray-700 text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-indigo-400 hover:text-white "
                      >
                        {size}
                      </button>
                    );
                  })}
                </div> */}
                                  <div className="w-full flex justify-end px-2">
                                    <button className="w-full  flex items-center justify-center gap-3 bg-red-300 text-white  py-2 px-4 rounded-full font-bold ">
                                      &#8594; Your body size
                                      <GiBodyHeight className="text-white tex-2xl" />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-8 w-full -mx-2 mb-4">
                                  <div className="w-full flex px-2">
                                    <button className=" text-sm  w-full flex items-center gap-6 justify-center bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-lg  font-bold hover:bg-white hover:text-black border-2 border-gray-700  ">
                                      Add to Cart
                                      <GiShoppingBag className="  text-white" />
                                    </button>
                                  </div>
                                  <div className="w-full px-2">
                                    <button className="text-sm sm:text-base w-full flex items-center justify-center  hover:text-white hover:bg-gray-800  gap-3 bg-white text-black border-2 border-gray-700  py-2 px-4 rounded-lg  font-bold ">
                                      Buy now
                                    </button>
                                  </div>
                                </div>
                                <div>
                                  <span className="font-bold text-gray-400 dark:text-gray-300">
                                    Product Description:
                                  </span>
                                  <p className="text-gray-300 hover:text-gray-500   text-sm mt-2">
                                    {data?.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Preview;
