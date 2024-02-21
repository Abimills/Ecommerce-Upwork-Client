"use client";
import React, { useEffect, useState } from "react";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";

import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import DiscountCard from "../DiscountCard/DiscountCard";
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
const OrderUserProfile: React.FC = () => {
  const [data, setData] = useState<any>([]);

  // const single: any = data.find((product) => product.id === param.id);

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:3000/api/product/`);
    setData(res.data.cloth);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full flex  flex-col  p-10">
      {/* empty orders page */}
      <div className=" w-full flex  mb-16 items-center justify-center flex-col ">
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
      <Footer />
    </div>
  );
};

export default OrderUserProfile;
