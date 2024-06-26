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
import { useRouter } from "next/navigation";
const Landing = () => {
  const router = useRouter();
  return (
    <main className="flex w-full font-Dosis  h-max bg-alice-blue mt-8">
      <div className="flex w-full min-h-screen   items-center lg:pl-32 px-8 mb-8">
        {/* <div className="h-full hidden lg:inline w-16  pb-8 mr-8    flex flex-col items-center justify-evenly ">
          <Swiper
            loop={true}
            // effect={"creative"}
            autoplay={{ delay: 3000 }}
            spaceBetween={30}
            slidesPerView={1}
            // navigation={true}
            className=" w-16 h-16  cursor-pointer  "
            modules={[Pagination, Navigation, Autoplay, EffectCreative]}
          >
            <SwiperSlide className="  w-max  cursor-pointer   ">
              <div className="w-9 h-9 border border-green-400 rounded-full flex items-center justify-center ">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="  w-max cursor-pointer  ">
              <div className="w-9 h-9  rounded-full flex items-center justify-center ">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="  w-max cursor-pointer  ">
              <div className="w-9 h-9  rounded-full flex items-center justify-center ">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </SwiperSlide>
          </Swiper>
          <Swiper
            loop={true}
            // effect={"creative"}
            autoplay={{ delay: 5000 }}
            spaceBetween={30}
            slidesPerView={1}
            // navigation={true}
            className=" w-16  h-16  cursor-pointer  "
            modules={[Pagination, Navigation, Autoplay, EffectCreative]}
          >
            <SwiperSlide className="  w-max cursor-pointer  ">
              <div className="w-9 h-9  rounded-full flex items-center justify-center ">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="  w-max cursor-pointer   ">
              <div className="w-9 h-9 border border-green-400 rounded-full flex items-center justify-center ">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="  w-max cursor-pointer  ">
              <div className="w-9 h-9  rounded-full flex items-center justify-center ">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </SwiperSlide>
          </Swiper>
          <Swiper
            loop={true}
            // effect={"creative"}
            autoplay={{ delay: 5000 }}
            spaceBetween={30}
            slidesPerView={1}
            // navigation={true}
            className=" w-16  h-16    cursor-pointer  "
            modules={[Pagination, Navigation, Autoplay, EffectCreative]}
          >
            <SwiperSlide className="  w-max cursor-pointer  ">
              <div className="w-9 h-9  rounded-full flex items-center justify-center ">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="  w-max cursor-pointer  ">
              <div className="w-9 h-9  rounded-full flex items-center justify-center ">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="  w-max cursor-pointer   ">
              <div className="w-9 h-9 border border-green-400 rounded-full flex items-center justify-center ">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div> */}
        <Swiper
          loop={true}
          // effect={"creative"}
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          slidesPerView={1}
          // navigation={true}
          className="w-3/3 h-max cursor-pointer  "
          modules={[Pagination, Navigation, Autoplay, EffectCreative]}
        >
          <SwiperSlide className="cursor-pointer w-max h-max  ">
            <div className="w-full flex h-max items-center  ">
              <div className="w-2/3 h-max   font-Dosis  flex  justify-start flex-col">
                <h1 className="text-left text-3xl font-bold  w-full sm:text-5xl mb-8 leading-relaxed">
                  Find Your Fashion in <br /> Noami habesha cloth
                </h1>
                <p className="text-gray-500 w-full text-base  text-left mb-16">
                  Explore our stores for a diverse range of solid <br />{" "}
                  products catering to men, women and children.
                  <br /> From everyday essentials to occasion wear <br /> we
                  have it all for you.
                </p>
                <div className="w-full flex  h-max  mb-5">
                  <button
                    onClick={() => router.push("/all-products-cloths")}
                    className=" border-2 bg-green-400 text-white border-green-400 rounded-md text-sm sm:text-base p-1 pl-3  sm:p-2 sm:pl-5 hover:bg-alice-blue hover:text-green-400 transition-opacity duration-300"
                  >
                    {" "}
                    Discover Now
                  </button>
                </div>
              </div>
              <img
                className="w-1/3  h-max mb-10 rounded  object-contain "
                src="../hab4.png"
                alt="girl"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-pointer w-max  ">
            <div className="w-full flex items-center ">
              <div className="w-2/3 min-h-96   font-Dosis  flex  justify-start flex-col">
                <h1
                  className="text-left font-bold capitalize  w-full text-3xl
                 sm:text-5xl mb-8 leading-relaxed"
                >
                  Global shopping <br /> delightful experiences
                </h1>
                <p className="text-gray-500 w-full text-base  text-left mb-16">
                  HabeshaD ensures swift and secure cross-border
                  <br /> deliveries to Europe, Canada, Africa, and the <br />{" "}
                  United States, employing advanced technology <br /> for
                  reliable and customer-centric shipping services.
                </p>
                <div className="w-full flex   mb-5">
                  <button
                    onClick={() => router.push("/all-products-cloths")}
                    className=" border-2 bg-green-400 text-white border-green-400 rounded-md text-sm sm:text-base p-1 pl-3  sm:p-2 sm:pl-5 hover:bg-alice-blue hover:text-green-400 transition-opacity duration-300"
                  >
                    {" "}
                    Order Now
                  </button>
                </div>
              </div>
              <img
                className="w-1/3 h-max mb-10 rounded  object-contain "
                src="../hab31.png"
                alt="girl"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-pointer w-max  ">
            <div className="w-full flex items-center ">
              <div className="w-2/3 min-h-96  font-Dosis  flex  justify-start flex-col">
                <h1
                  className="text-left font-bold  w-full text-3xl
                 sm:text-5xl mb-8 leading-relaxed"
                >
                  Habesha dress for
                  <br /> wedding & all holiday
                </h1>
                <p className="text-gray-500 w-full text-base  text-left mb-16">
                  Discover the perfect attire for every Habesha occasion <br />{" "}
                  at our store. Be it weddings, holidays, Ashenda,
                  <br /> Timket, New Year, or any celebration. Elevate your
                  <br />
                  style for every cultural moment with our collections
                </p>
                <div className="w-full flex   mb-5">
                  <button
                    onClick={() => router.push("/all-products-cloths")}
                    className=" border-2 bg-green-400   text-white border-green-400 rounded-md text-sm sm:text-base p-1 pl-3  sm:p-2 sm:pl-5 hover:bg-alice-blue hover:text-green-400 transition-opacity duration-300"
                  >
                    Discover Products
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
