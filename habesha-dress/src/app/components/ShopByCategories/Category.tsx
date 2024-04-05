"use client";
import CategoryCard from "../CategoryCard/CategoryCard";
import category from "./data";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";

import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { toggleShowFilter } from "@/app/lib/cartSlice/cartSlice";
import { useDispatch } from "react-redux";
const Category: React.FC = () => {
  return (
    <main className="w-full font-Dosis ">
      <div className="w-full mb-16 mt-32  flex items-center justify-between ">
        <h1 className="w-full text-left mb-4 px-6 font-medium leading-10 font-Dosis text-3xl ">
          Shop By Categories
        </h1>
      </div>

      <div className="flex w-full flex-wrap justify-center   gap-4 items-center">
        {/* <Swiper
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
        > */}
        {category.map((item: any) => {
          return (
            // <SwiperSlide className="cursor-pointer w-max  ">
            <CategoryCard key={item.id + item.title} item={item} />
            // </SwiperSlide>
          );
        })}
        {/* </Swiper> */}
      </div>
    </main>
  );
};

export default Category;
