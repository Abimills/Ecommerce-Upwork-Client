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
import ReactLoading from "react-loading";

const WelcomeUserProfile: React.FC = () => {
  const [recommendedData, setRecommendedData] = useState<any>([]);
  const user = useSelector((state: any) => state.auth.user);
  const [loading, setLoading] = useState(false);
  // const single: any = data.find((product) => product.id === param.id);
  // TODO : ADD A DIV BEFORE SWIPERSLIDE TO REMOVE ERROR

  useEffect(() => {
    const fetchData = async () => {
      if (user?.recommendedProducts?.length > 0) {
        try {
          setLoading(true);
          const selected: any = [];
          const res = await Promise.all(
            user?.recommendedProducts?.map((id: any) =>
              axios.get(`http://localhost:3000/api/product/?id=${id._id}`)
            )
          );
          const wishlistProducts: any = res.map(
            (product) => product.data.cloth
          );
          wishlistProducts?.map((item: any) => selected.push(...item.category));

          setRecommendedData(wishlistProducts);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log({
            message: "error while fetching ids in welcome page",
            error,
          });
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col  relative  ">
      {loading && (
        <div className="fixed z-20 bg-gray-100  opacity-75 flex items-center justify-center top-0 w-full h-screen">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#2d7e23"}
            height={64}
            width={64}
          />
        </div>
      )}
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
