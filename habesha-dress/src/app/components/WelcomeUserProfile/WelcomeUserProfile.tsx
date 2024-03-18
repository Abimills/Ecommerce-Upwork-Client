"use client";
import React, { useEffect, useState } from "react";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import welcome from "./data";
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
import { useSelector } from "react-redux";
const WelcomeUserProfile: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [recommendedData, setRecommendedData] = useState<any>([]);

  const user = useSelector((state: any) => state.auth.user);

  // const single: any = data.find((product) => product.id === param.id);
  // TODO : ADD A DIV BEFORE SWIPERSLIDE TO REMOVE ERROR
  const fetchData = async () => {
    const res = await axios.get(`http://localhost:3000/api/product/`);
    setData(res.data.cloths);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (user?.recommendedProducts?.length > 0) {
        const selected: any = [];
        const res = await Promise.all(
          user?.recommendedProducts?.map((id: any) =>
            axios.get(`http://localhost:3000/api/product/?id=${id}`)
          )
        );
        const wishlistProducts: any = res.map((product) => product.data.cloth);
        wishlistProducts?.map((item: any) => selected.push(...item.category));

        setRecommendedData(wishlistProducts);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full flex flex-col  ">
      {/* <div className="flex-1  h-max min-h-32  mt-4 mb-8  p-4 px-8 rounded-lg bg-yellow-100">
        <h1 className="font-semibold mb-6">Welcome to your profile!</h1>
        <p className="text-base text-gray-600 mb-3">
          You will find your Member ID next to your name after you have logged
          in to C&A for you.
        </p>
        <p className="text-base text-gray-600 mb-3">Have fun shopping!</p>
      </div> */}
      <h1 className="text-2xl font-semibold mb-3 p-10">Discover now</h1>
      <main className="flex  w-full p-10 shadow-lg items-center justify-between">
        <Swiper
          loop={true}
          // effect={"creative"}
          autoplay={{ delay: 5000 }}
          spaceBetween={30}
          slidesPerView={4}
          // navigation={true}
          // pagination={{ clickable: true }}
          className="w-max h-max flex  cursor-pointer  "
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          modules={[Pagination, Navigation, Autoplay, EffectCreative]}
        >
          {welcome?.map((item: any) => {
            return (
              <SwiperSlide className="cursor-pointer w-max  " key={item._id}>
                <WelcomeCard item={item} />
              </SwiperSlide>
            );
          })}
          {/* <LiaAngleDoubleRightSolid className="text-lg text-gray-400" /> */}
        </Swiper>
      </main>
      <h1 className="mt-16 font-semibold text-2xl mb-4">
        Inspiration for your next purchase
      </h1>
      <main className="flex  w-full p-5 shadow-lg items-center justify-between">
        <Swiper
          loop={true}
          // effect={"creative"}
          autoplay={{ delay: 5000 }}
          spaceBetween={30}
          slidesPerView={4}
          // navigation={true}
          // pagination={{ clickable: true }}
          className="w-max h-max flex  cursor-pointer  "
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          modules={[Pagination, Navigation, Autoplay, EffectCreative]}
        >
          {recommendedData?.map((item: any) => {
            return (
              <SwiperSlide className="cursor-pointer w-max  " key={item._id}>
                <InspirationCard product={item} />
              </SwiperSlide>
            );
          })}
          {/* <LiaAngleDoubleRightSolid className="text-lg text-gray-400" /> */}
        </Swiper>
      </main>
      <div className="mt-32">
        <Footer />
      </div>
    </div>
  );
};

export default WelcomeUserProfile;
