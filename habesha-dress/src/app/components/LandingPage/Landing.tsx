import { TfiArrowCircleRight } from "react-icons/tfi";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";

import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
const Landing = () => {
  return (
    <main className="flex w-full  h-80vh bg-alice-blue mt-10">
      <div className="flex w-full   items-center flex-1  p-10 mb-16">
        <div className="h-2/3 mr-8 mt-9 flex flex-col items-center justify-between ">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400  rounded-full"></div>
          <div className="w-9 h-9 border border-green-400 rounded-full flex items-center justify-center ">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
          <div className="w-2 h-2 bg-gray-400  rounded-full"></div>
        </div>
        <Swiper
          loop={true}
          // effect={"creative"}
          autoplay={{ delay: 5000 }}
          spaceBetween={30}
          slidesPerView={1}
          // navigation={true}
          className="w-96  cursor-pointer "
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Pagination, Navigation, Autoplay, EffectCreative]}
        >
          <SwiperSlide className="cursor-pointer  ">
            <div className="">
              <h1 className="text-left  w-full text-5xl mb-5 mt-16 leading-relaxed">
                Find Your Fashion in Noami habesha cloth
              </h1>
              <p className="text-gray-500 w-full text-left">
                Shop men,women,children dress for all your ocasions , <br /> we
                have it all in our stores
              </p>
              <div className="w- mt-4">
                <button className=" border-2 bg-green-400 text-white border-green-400 rounded-md p-2 pl-5">
                  {" "}
                  view more
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className=" ">
            <div className="">
              <h1 className="text-left  w-full text-5xl text-green-500 mb-5 mt-16 leading-relaxed">
                SHOP HABESHA DRESS FOR ALL OCASSIONS
              </h1>
              <p className="text-gray-500 w-full text-left">
                Shop men,women,children dress for all your ocasions , <br /> we
                have it all in our stores
              </p>
              <div className="w- mt-4">
                <button className=" border-2 border-gray-500 rounded-md p-2 pl-5">
                  {" "}
                  view more
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="flex  justify-between items-center flex-1 p-10">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          className="w-96 px-10 "
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[Pagination, Navigation, Autoplay]}
        >
          <SwiperSlide className=" ">
            <div className="">
              <img
                className="w-70 h-100 mb-10 rounded  object-cover "
                src="../hana3.png"
                alt="girl"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className=" ">
            <img
              className="w-70 h-90 rounded  object-contain "
              src="../dress.png"
              alt="girl"
            />
          </SwiperSlide>
          {/* <TfiArrowCircleRight className="text-2xl text-gray-400 " /> */}
        </Swiper>
      </div>
    </main>
  );
};

export default Landing;
