"use client";
import React, { useEffect, useState } from "react";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import ReactLoading from "react-loading";
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
  const [loading, setLoading] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/api/discount/`);
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log({ message: "error while fetching discount products", error });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update slidesPerView based on screen size
    const handleResize = () => {
      if (window.innerWidth < 520) {
        setSlidesPerView(1); // Set to 1 slide per view on small screens
      } else if (window.innerWidth > 521 && window.innerWidth < 720) {
        setSlidesPerView(2); // Set to 1 slide per view on small screens
      } else if (window.innerWidth > 720 && window.innerWidth < 1000) {
        setSlidesPerView(3); // Set to 1 slide per view on small screens
      } else {
        setSlidesPerView(4); // Set to 3 slides per view on larger screens
      }
    };

    // Call handleResize when the window size changes
    window.addEventListener("resize", handleResize);

    // Call handleResize once to set the initial slidesPerView value
    handleResize();

    // Remove event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <main className="flex w-full p-5 font-Dosis   shadow-sm items-center justify-between">
      {loading ? (
        <div className=" relative w-full  my-8 flex items-center justify-center">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#2d7e23"}
            height={64}
            width={64}
          />
        </div>
      ) : (
        <Swiper
          loop={true}
          // effect={"creative"}
          autoplay={{ delay: 5000 }}
          spaceBetween={30}
          slidesPerView={slidesPerView}
          // navigation={true}
          pagination={{ clickable: true }}
          className="w-max h-max flex items-center justify-center cursor-pointer  "
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          modules={[Pagination, Navigation, Autoplay, EffectCreative]}
        >
          {data?.map((item: any) => {
            return (
              <SwiperSlide
                className="cursor-pointer  "
                key={item?.products?._id}
              >
                <div className="w-full h-full flex justify-center items-center">
                  <div className="">
                    <DiscountCard item={item} />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          {/* <LiaAngleDoubleRightSolid className="text-lg text-gray-400" /> */}
        </Swiper>
      )}
    </main>
  );
};

export default Discount;
