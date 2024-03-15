"use client";
import { toggleShowNotification } from "@/app/lib/cartSlice/cartSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const showNotification: boolean = useSelector(
    (state: any) => state.cart.showNotification
  );
  //  dispatch(setAllProducts(res.data.cloths));
  const handleNotification = (value: boolean) => {
    dispatch(toggleShowNotification(value));
  };
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        dispatch(toggleShowNotification(false));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);
  return (
    <div className="w-max font-Dosis font-semibold mt-4 mr-4    h-max fixed top-0 right-0 z-10 transition-opacity duration-300">
      {showNotification && (
        <div className="w-max h-max bg-black p-2 text-white rounded-lg px-4 transition-opacity duration-300">
          <div className=" flex items-center  justify-between gap-4 mb-4">
            <div className=" flex items-center gap-6 mt-4 mb-2">
              <div className="w-full h-full rounded-full  p-2 bg-white ">
                <img
                  src="/hab42.png"
                  alt=""
                  className=" h-10 w-10 object-contain  "
                />
              </div>
              <p className="">Added!</p>
            </div>
            <button
              type="button"
              onClick={() => handleNotification(false)}
              className="ms-auto relative bottom-6 -mx-1.5 -my-1.5  text-white hover:text-red-500 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5  inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <p className="mb-4 px-2">
            Nice choice, your Product is added to your Cart
          </p>
          <div className="w-full flex items-center  justify-center mb-6">
            <button
              onClick={() => router.push("/cart")}
              className="text-center underline underline-offset-6 hover:underline-offset-2"
            >
              Go to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
