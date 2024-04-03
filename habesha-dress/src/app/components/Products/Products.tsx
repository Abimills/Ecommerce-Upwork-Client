"use client";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import ClothProduct from "@/app/api/models/newsletter";
import { RiMenuSearchLine } from "react-icons/ri";
import { toggleShowFilter } from "@/app/lib/cartSlice/cartSlice";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { setAllProducts, sortDataReducer } from "@/app/lib/cartSlice/dataSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import { ToastContainer, toast } from "react-toastify";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { useRouter } from "next/navigation";
import ReactLoading from "react-loading";
const Products: React.FC = () => {
  const showFilter = useSelector((state: any) => state.cart.showFilter);
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const [activePagination, setActivePagination] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [totalCloths, setTotalCloths] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/api/product/?page=${4}`
        );

        if (res.data.totalPages) {
          setTotalPages(res.data.totalPages);
          setData(res.data.cloths);
          setFilteredData(res.data.cloths);
          setTotalCloths(res.data.totalCloths);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);

        console.log({ message: "error while fetching products", error });
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
    <main className="w-full  h-full min-h[500px] relative  flex flex-col">
      <ToastContainer
        newestOnTop={true}
        autoClose={1000}
        theme="dark"
        position={"bottom-right"}
      />
      <div className="w-full mb-16 mt-32  flex items-center justify-between ">
        <h1 className="font-Dosis font-md text-2xl sm:text-3xl ml-1   sm:mx-4 ">
          Popular Products
        </h1>
        <button
          onClick={() => router.push("/all-products-cloths")}
          className="hover:text-indigo-300 hover:bg-white text-sm px-4 py-1 border border-indigo-300 bg-indigo-300 text-white rounded-full sm:mx-4 mr-2 flex items-center gap-2 font-medium"
        >
          <RiMenuSearchLine className="text-xl" />
          See All
        </button>
      </div>
      {loading ? (
        <div className=" relative   my-8 flex items-center justify-center">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#2d7e23"}
            height={64}
            width={64}
          />
        </div>
      ) : (
        <div className="w-full flex items-center gap-8 px-2 justify-center  flex-wrap">
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
            modules={[Pagination, Navigation, Autoplay, EffectCreative]}
          >
            {filteredData.length > 1 &&
              filteredData

                ?.filter((cloth: any) => cloth.category?.includes("Popular"))
                .map((item: any) => {
                  return (
                    <SwiperSlide className="cursor-pointer   " key={item._id}>
                      <div className="w-full h-full flex justify-center items-center">
                        <div className="">
                          <ProductCard product={item} />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-200 bg-alice-blue  mt-8 px-4 py-3 sm:px-6"></div>
    </main>
  );
};

export default Products;
