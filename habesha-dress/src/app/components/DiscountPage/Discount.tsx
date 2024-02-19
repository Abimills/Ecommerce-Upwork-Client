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
const Discount: React.FC = () => {
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
        {data.map((item: any) => {
          return (
            <SwiperSlide className="cursor-pointer w-max  ">
              <DiscountCard item={item} key={item.id} />
            </SwiperSlide>
          );
        })}
        {/* <LiaAngleDoubleRightSolid className="text-lg text-gray-400" /> */}
      </Swiper>
    </main>
  );
};

export default Discount;
