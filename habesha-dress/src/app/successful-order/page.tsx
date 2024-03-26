"use client";

import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/Navbar/SearchBar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAppSelector } from "../lib/hooks";

const SuccessfulPayment = () => {
  const showSearch = useSelector((state: any) => state.cart.showSearch);
  const cartItems: any = useAppSelector((state: any) => state.cart.items) || [];
  const showIcons = {
    search: true,
    user: true,
    wishlist: true,
    cart: true,
    navigation: true,
  };

  return (
    <main className="w-full h-screen bg-white flex items-center justify-start flex-col">
      <div className="w-full">
        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      <div className="w-full flex items-center flex-col py-32 px-48 mb-16">
        <h1 className="text-5xl font-bold mb-4 font-poppins">
          Thank you for your order!
        </h1>
        <p className=" font-Dosis text-lg text-gray-600 mb-8 max-w-md">
          Your order has been confirmed.You will receive an
          <span className="text-green-500 underline"> email </span>
          confirmation shortly.Your order ID is
          <span className="text-green-500 underline"> 21123213123123321 </span>
        </p>
        <div className="flex w-full items-center font-Dosis gap-8 justify-center">
          <button
            className="px-6 py-2 bg-black text-white font-medium hover:bg-white hover:text-black
           uppercase text-sm border border-black rounded-md"
          >
            view order
          </button>

          <button
            className="px-6 py-2 bg-transparent text-black font-medium
           uppercase text-sm border border-black rounded-md hover:bg-black hover:text-white"
          >
            view all orders
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SuccessfulPayment;
