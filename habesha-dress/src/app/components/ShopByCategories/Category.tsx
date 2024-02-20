import CategoryCard from "../CategoryCard/CategoryCard";
import category from "./data.js";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";

import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
const Category: React.FC = () => {
  return (
    <main className="w-full ">
      <h1 className="mt-8 mb-6 font-semibold text-gray-500">
        Shop By Categories
      </h1>

      <div className="flex w-full   gap-4 items-center">
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
          {category.map((item: any) => {
            return (
              <SwiperSlide className="cursor-pointer w-max  ">
                <CategoryCard key={item.id} item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </main>
  );
};

export default Category;
