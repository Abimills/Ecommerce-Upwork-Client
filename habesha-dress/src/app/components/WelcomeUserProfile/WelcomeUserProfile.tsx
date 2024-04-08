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
  const gateWay = useSelector((state: any) => state.cart.gateWay);
  const [slidesPerView, setSlidesPerView] = useState(3);

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
              axios.get(`${gateWay}/api/product/?id=${id._id}`)
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
  useEffect(() => {
    // Update slidesPerView based on screen size
    const handleResize = () => {
      if (window.innerWidth < 630) {
        setSlidesPerView(1); // Set to 1 slide per view on small screens
      } else if (window.innerWidth > 630 && window.innerWidth < 800) {
        setSlidesPerView(2); // Set to 1 slide per view on small screens
      } else if (window.innerWidth > 800 && window.innerWidth < 1000) {
        setSlidesPerView(2); // Set to 1 slide per view on small screens
      } else {
        setSlidesPerView(3); // Set to 3 slides per view on larger screens
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
      <h1 className="text-2xl font-semibold mb-3 mt-8 w-full text-center sm:w-max sm:p-10">
        Discover now
      </h1>
      <main className="flex  w-full p-10  items-center justify-between">
        <Swiper
          // loop={true}
          // effect={"creative"}
          autoplay={{ delay: 5000 }}
          spaceBetween={30}
          slidesPerView={slidesPerView}
          navigation={true}
          // pagination={{ clickable: true }}
          className="w-max h-max flex   cursor-pointer  "
          // onSlideChange={() => console.log("slide change")}
          onSlideChange={(swiper) => {
            swiper.navigation.nextEl.className = ` ${
              swiper.isEnd ? "hidden" : "swiper-button-next bg-white"
            } 
              
              `;
            swiper.navigation.prevEl.className = `${
              swiper.isBeginning ? "" : "swiper-button-prev bg-white"
            } `;
            if (swiper.isEnd) {
              // router.push("/all-products-cloths");
            }
          }}
          onSwiper={(swiper) => {
            swiper.navigation.prevEl.className = `${
              swiper.realIndex == 0 ? "" : ""
            }`;
            // console.log(swiper.isEnd);
            // swiper.navigation.nextEl.className = ` ${
            //   swiper.isEnd ? "" : "swiper-button-next"
            // }`;
          }}
          modules={[Pagination, Navigation, Autoplay, EffectCreative]}
        >
          {welcome?.map((item: any) => {
            return (
              <SwiperSlide className="cursor-pointer w-max  " key={item.id}>
                <WelcomeCard item={item} />
              </SwiperSlide>
            );
          })}
          {/* <LiaAngleDoubleRightSolid className="text-lg text-gray-400" /> */}
        </Swiper>
      </main>
      <h1 className="mt-16  mb-6 pl-4 font-semibold text-2xl mb-4">
        Inspiration for your next purchase
      </h1>
      <main className="flex  w-full p-5  items-center justify-between">
        <Swiper
          // loop={true}
          // effect={"creative"}
          autoplay={{ delay: 5000 }}
          spaceBetween={30}
          slidesPerView={slidesPerView}
          navigation={true}
          pagination={{ clickable: true }}
          className="w-max h-max flex   cursor-pointer  "
          // onSlideChange={() => console.log("slide change")}
          onSlideChange={(swiper) => {
            swiper.navigation.nextEl.className = ` ${
              swiper.isEnd ? "hidden" : "swiper-button-next bg-white"
            } 
              
              `;
            swiper.navigation.prevEl.className = `${
              swiper.isBeginning ? "" : "swiper-button-prev bg-white"
            } `;
            if (swiper.isEnd) {
              // router.push("/all-products-cloths");
            }
          }}
          onSwiper={(swiper) => {
            swiper.navigation.prevEl.className = `${
              swiper.realIndex == 0 ? "" : ""
            }`;
            // console.log(swiper.isEnd);
            // swiper.navigation.nextEl.className = ` ${
            //   swiper.isEnd ? "" : "swiper-button-next"
            // }`;
          }}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          modules={[Pagination, Navigation, Autoplay, EffectCreative]}
        >
          {recommendedData?.map((item: any) => {
            return (
              <SwiperSlide className="cursor-pointer w-max  " key={item._id}>
                <div className="w-full h-full flex justify-center items-center">
                  <div className="">
                    <InspirationCard product={item} />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          {/* <LiaAngleDoubleRightSolid className="text-lg text-gray-400" /> */}
        </Swiper>
      </main>
    </div>
  );
};

export default WelcomeUserProfile;
