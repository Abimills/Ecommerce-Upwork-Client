"use client";
import React, { useEffect, useState } from "react";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import { MdSportsScore } from "react-icons/md";
import { FcApproval } from "react-icons/fc";

import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import axios from "axios";
import OrderCard from "../components/OrderCard/OrderCard";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import SearchBar from "../components/Navbar/SearchBar";
import Navbar from "../components/Navbar/Navbar";
import { useAppSelector } from "../lib/hooks";
const OrderUserProfile: React.FC = () => {
  const [orders, setOrders] = useState([]);
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
    <div className="w-full flex relative font-Dosis bg-alice-blue  flex-col  ">
      <div className="w-full bg-white  sticky top-0">
        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      {orders?.length > 0 ? (
        <div className=" w-full flex  mb-16 items-center justify-center flex-col p-10 ">
          <img
            src="../cart-empty.gif"
            alt=""
            className="h-72 w-full object-contain rounded-full mb-8"
          />
          <h1 className="font-bold text-2xl tracking-wide mb-8 leading-normal">
            You have not placed an order yet.
          </h1>
          <p className="leading-normal text-base font-medium text-gray-500 mb-8">
            Get started and discover fashion for your whole family.
          </p>
          <button className="bg-black w-1/2 text-white py-3 px-9 font-bold rounded-full">
            Shop now
          </button>
        </div>
      ) : (
        <div className="w-full h-max ">
          <div className="w-full h-max p-16">
            <h1 className="font-semibold font-poppins text-4xl mb-4 ">
              Order history
            </h1>
            <p className=" text-lg text-green-300  mb-8">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </p>
            <div className="w-full h-max flex rounded-t-lg  p-8 border border-green-300 items-center justify-between">
              <span className="">
                <p className="">Order number</p>
                <p className="text-gray-400">AB98324378</p>
              </span>
              <span className="">
                <p className="">Date placed</p>
                <p className="text-gray-400">july 6, 2024</p>
              </span>
              <span className="">
                <p className="">Total amount</p>
                <p className=" text-xl font-bold text-green-500">$160.00</p>
              </span>
            </div>
            <div className="">
              {cartItems.map((item: any) => {
                return <OrderCard item={item} key={item.id} />;
              })}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default OrderUserProfile;