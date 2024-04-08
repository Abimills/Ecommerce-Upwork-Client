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
import WelcomeCard from "../DiscountCard/WelcomeCard";
import Products from "../Products/Products";
import ProductCard from "../ProductCard/ProductCard";
import InspirationCard from "../DiscountCard/InspirationCard";
import Footer from "../Footer/Footer";
import OrderCard from "../OrderCard/OrderCard";

const OrderUserProfile: React.FC = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchOrder = async () => {
      const user = localStorage.getItem("user") as any;
      if (user !== null) {
        const parsedUser = JSON.parse(user);
        const ids = parsedUser?.orders;
        if (ids?.length > 0) {
          const res = await Promise.all(
            ids?.map((id: any) => axios.get(`/api/order/?orderNumber=${id}`))
          );
          if (res[0]?.data.success) {
            const allOrders: any = res.map((product) => product.data.order);
            setOrders(allOrders);
            console.log(res);
          }
        }
      }
    };
    fetchOrder();
  }, []);
  console.log(orders);
  return (
    <div className="w-full flex  flex-col  ">
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
          {orders.map((order: any, index: number) => {
            return (
              <div
                key={index + order?._id}
                className="w-full h-max pb-16 px-4  sm:px-16 my-8"
              >
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
    </div>
  );
};

export default OrderUserProfile;
