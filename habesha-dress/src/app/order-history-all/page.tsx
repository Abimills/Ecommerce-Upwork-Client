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
import { useParams } from "next/navigation";
const OrderUserProfile: React.FC = () => {
  const ids = JSON.parse(localStorage.getItem("itemsBought") as string);

  const [orders, setOrders] = useState([]);
  const showSearch = useSelector((state: any) => state.cart.showSearch);
  const cartItems: any = useAppSelector((state: any) => state.cart.items) || [];
  const showIcons = {
    search: false,
    user: true,
    wishlist: true,
    cart: false,
    navigation: true,
  };
  const fetchOrder = async () => {
    if (ids) {
      const res = await Promise.all(
        ids?.map((id: any) => axios.get(`api/order/?orderNumber=${id}`))
      );
      const allOrders: any = res.map((product) => product.data.order);
      console.log(allOrders);
      setOrders(allOrders);
    }
  };
  useEffect(() => {
    // window.scrollTo(0, 0);

    fetchOrder();
  }, []);
  console.log(orders?.length);
  return (
    <div className="w-full flex relative font-Dosis bg-alice-blue  flex-col  ">
      <div className="w-full bg-white  sticky top-0">
        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      {orders?.length < 1 ? (
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
          <h1 className="font-semibold font-poppins text-4xl mt-8 mb-4 px-4 py-4 sm:px-16 ">
            Order history
          </h1>
          <p className=" text-lg text-gray-600   px-4 py-4 sm:px-16">
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
          {orders.map((order: any) => {
            return (
              <div className="w-full h-max pb-16 px-4  sm:px-16 my-8">
                <div className="w-full h-max flex rounded-t-lg  p-8 border border-green-300 items-center justify-between">
                  <span className="hidden sm:inline">
                    <p className="">Order number</p>
                    <p className="text-gray-400">
                      {" "}
                      {order?.orderNumber?.slice(0, 20)}......
                    </p>
                  </span>
                  <span className="hidden sm:inline">
                    <p className="">Date placed</p>
                    <p className="text-gray-400">{order?.createdAt}</p>
                  </span>
                  <span className="">
                    <p className="">Shipping amount</p>
                    <p className=" text-xl font-bold text-green-500">
                      ${(order?.shippingAmount / 100)?.toFixed(2)}
                    </p>
                  </span>
                  <span className="">
                    <p className="">Total amount</p>
                    <p className=" text-xl font-bold text-green-500">
                      ${(order?.totalOrderAmount / 100)?.toFixed(2)}
                    </p>
                  </span>
                </div>
                <div className="">
                  {order?.orderedProducts?.map((item: any) => {
                    return <OrderCard item={item} key={item.id} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default OrderUserProfile;
