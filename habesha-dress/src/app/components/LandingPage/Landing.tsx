import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";

import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { useEffect, useState } from "react";
import { Anybody } from "next/font/google";
const Landing = () => {
  return (
    <main className="flex w-full  h-80vh bg-alice-blue mt-10">
      <div className="flex w-full h-screen   items-center flex-1  px-16 mb-16">
        <div className="h-95vh mr-8   flex flex-col items-center justify-around ">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400  rounded-full"></div>
          <div className="w-9 h-9 border border-green-400 rounded-full flex items-center justify-center ">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
          {/* <div className="w-2 h-2 bg-gray-400  rounded-full"></div> */}
        </div>
        <Swiper
          loop={true}
          // effect={"creative"}
          autoplay={{ delay: 5000 }}
          spaceBetween={30}
          slidesPerView={1}
          // navigation={true}
          className="w-max h-screen cursor-pointer  "
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          modules={[Pagination, Navigation, Autoplay, EffectCreative]}
        >
          <SwiperSlide className="cursor-pointer w-max  ">
            <div className="w-full flex items-center ">
              <div className="w-2/3 min-h-96   font-poppins  flex  justify-start flex-col">
                <h1 className="text-left  w-full text-5xl mb-8 leading-relaxed">
                  Find Your Fashion in <br /> Noami habesha cloth
                </h1>
                <p className="text-gray-500 w-full text-base  text-left mb-16">
                  Shop men || women || children dress for all your ocasions ,{" "}
                  <br /> we have it all in our stores
                </p>
                <div className="w-full flex   mb-5">
                  <button className=" border-2 bg-green-400 text-white border-green-400 rounded-md p-2 pl-5">
                    {" "}
                    view more
                  </button>
                </div>
              </div>
              <img
                className="w-1/3 h-max mb-10 rounded  object-contain "
                src="../hab4.png"
                alt="girl"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-pointer w-max  ">
            <div className="w-full flex items-center ">
              <div className="w-2/3 min-h-96   font-poppins  flex  justify-start flex-col">
                <h1 className="text-left  w-full text-5xl mb-8 leading-relaxed">
                  Europe Canada Africa <br /> and the US
                </h1>
                <p className="text-gray-500 w-full text-base  text-left mb-16">
                  Shop men || women || children dress for all your ocasions ,{" "}
                  <br /> we have it all in our stores
                </p>
                <div className="w-full flex   mb-5">
                  <button className=" border-2 bg-green-400 text-white border-green-400 rounded-md p-2 pl-5">
                    {" "}
                    Discover
                  </button>
                </div>
              </div>
              <img
                className="w-1/3 h-max mb-10 rounded  object-contain "
                src="../hana3.png"
                alt="girl"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-pointer w-max  ">
            <div className="w-full flex items-center ">
              <div className="w-2/3 min-h-96   font-poppins  flex  justify-start flex-col">
                <h1 className="text-left  w-full text-5xl mb-8 leading-relaxed">
                  HABESHA DRESS FOR WEDDING <br /> AND ALL CEREMONY
                </h1>
                <p className="text-gray-500 w-full text-base  text-left mb-16">
                  Shop men || women || children dress for all your ocasions ,{" "}
                  <br /> we have it all in our stores
                </p>
                <div className="w-full flex   mb-5">
                  <button className=" border-2 bg-green-400 text-white border-green-400 rounded-md p-2 pl-5">
                    {" "}
                    Discover
                  </button>
                </div>
              </div>
              <img
                className="w-1/3 h-max mb-10 rounded  object-contain "
                src="../hab1.png"
                alt="girl"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </main>
  );
};

export default Landing;
