"use client";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiTrash } from "react-icons/ci";

import { TfiSearch } from "react-icons/tfi";
import { TbSearch } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineUser } from "react-icons/hi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import ReactLoading from "react-loading";

import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import {
  toggleShowSearch,
  toggleShowSidebar,
  toggleShowSignIn,
} from "@/app/lib/cartSlice/cartSlice";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import SearchCard from "../SearchCard/SearchCard";
// interface Props {
//   setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   setShow: React.Dispatch<React.SetStateAction<boolean>>;
// }
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
interface ShowTypes {
  search: Boolean;
  user: Boolean;
  wishlist: Boolean;
  cart: Boolean;
  navigation: Boolean;
}
interface Props {
  showIcons: ShowTypes;
}

const SearchBar: React.FC<Props> = ({ showIcons }) => {
  const router = useRouter();
  const [slidesPerView, setSlidesPerView] = useState(3); // Default number of slides per view

  const cartItems: any = useAppSelector((state: RootState) => state.cart.items);
  const favorites: any = useAppSelector(
    (state: RootState) => state.cart.favorites
  );
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryEmpty, setQueryEmpty] = useState(false);
  const storedSearches = localStorage.getItem("habeshaSearches");
  const initialSearches = storedSearches ? JSON.parse(storedSearches) : [];
  const [searches, setSearches] = useState<any>(initialSearches);

  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const handleCloseSearch = () => {
    dispatch(toggleShowSearch());
  };
  const handleClose = () => {
    dispatch(toggleShowSidebar());
  };
  const handleLogin = () => {
    if (user && user?.email) {
      router.push("/user-profile");
    } else if (!user || !user?.email) {
      dispatch(toggleShowSignIn());
    }
  };
  useEffect(() => {
    const searchData = async () => {
      try {
        if (query !== "" || !query) {
          setData([]);
        }
        if (query && query !== "") {
          setQueryEmpty(false);
          setLoading(true);
          const res = await axios.get(
            `http://localhost:3000/api/search/?query=${query}`
          );
          if (res.data.cloths) {
            setData(res.data.cloths);
            setLoading(false);
          }
        }
      } catch (error) {
        setLoading(false);

        console.log({ message: "error while searching products", error });
      }
    };
    searchData();
  }, [query]);
  const handleSearchNavigation = (suggestion?: string) => {
    if (suggestion) {
      setQuery(suggestion);
    }
    if (!query || query == "") {
      setQueryEmpty(true);
    } else if (query) {
      dispatch(toggleShowSearch());
      router.push(`/search?query=${query ? query : suggestion}`);
      const habeshaSearches: any = JSON.parse(
        localStorage.getItem("habeshaSearches") || "null"
      );
      if (habeshaSearches?.length > 0) {
        const found = habeshaSearches.find(
          (searches: any) => searches == query || searches == suggestion
        );
        if (!found) {
          habeshaSearches.unshift(query ? query : suggestion);
          localStorage.setItem(
            "habeshaSearches",
            JSON.stringify(habeshaSearches)
          );
        }
      }
      if (!habeshaSearches) {
        localStorage.setItem(
          "habeshaSearches",
          JSON.stringify([query ? query : suggestion])
        );
      }
    }
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearchNavigation();
    }
  };
  const handleRemoveSearch = () => {
    localStorage.removeItem("habeshaSearches");
    setSearches([]);
  };

  useEffect(() => {
    // Update slidesPerView based on screen size
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setSlidesPerView(1); // Set to 1 slide per view on small screens
      } else if (window.innerWidth > 720 && window.innerWidth < 1000) {
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
    <main className="  overflow-x-hidden  h-max z-30 bg-opacity-50  sticky top-0  bg-white   w-full  ">
      <div className="flex  overflow-x-hidden opacity-100 border-b border-gray-400  font-Dosis text-base flex-col h-max   bg-white  w-full items-center ">
        <nav className="flex font-Dosis text-base h-max   min-h-24  w-full items-center justify-between  ">
          {showIcons.navigation && (
            <div className="flex align-items w-max mr-3 gap-5 hidden md:block   justify-start ">
              <GiHamburgerMenu
                className="text-2xl  ml-3 mt-1 mr-6 cursor-pointer"
                onClick={handleClose}
              />
              <h1
                className="font-semibold hidden  text-2xl cursor-pointer font-Dosis"
                onClick={() => router.push("/")}
              >
                HabeshaD
              </h1>
            </div>
          )}
          <div className="flex  flex-1 align-items w-1\2  justify-between ">
            <ul className="flex justify-end flex-1 items-center gap-10 text-base font-Dosis ">
              {showIcons.search && (
                <div
                  className={`flex items-center outline:none   border-b border-b-2 border-gray-700  w-full min-h-16 h-4   gap-3  ml-6 ${
                    queryEmpty && "  border-b-red-500 "
                  } `}
                >
                  <input
                    type="text"
                    value={query}
                    onChange={(e: any) => setQuery(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    className=" w-full rounded-full bg-alice-blue   focus:outline-none focus:ring focus:ring-transparent  text-xl border border-transparent active:border-none   focus:outline-transparent focus:border-transparent  "
                    placeholder="What are you looking for? "
                  />
                  <IoIosArrowRoundForward
                    onClick={() => handleSearchNavigation()}
                    className="text-3xl text-black cursor-pointer   h-full "
                  />
                </div>
              )}
              {showIcons.search && (
                <div
                  onClick={handleCloseSearch}
                  className="h-8 w-8   cursor-pointer relative   flex items-center justify-center sm:mr-4"
                >
                  <IoCloseSharp className="text-4xl text-gray-800 cursor-pointer    h-full " />
                </div>
              )}
              {showIcons.user && (
                <div
                  onClick={handleLogin}
                  className="h-8 w-8 hidden   cursor-pointer relative rounded-full bg-indigo-100 border border-gray-100 flex items-center justify-center"
                >
                  <HiOutlineUser className="text-3xl  h-full text-gray-600 rounded-full bg-indigo-100 p-0.5 border border-gray-100 cursor-pointer " />
                  {user?.email && (
                    <div className="h-max w-max bg-alice-blue p-0.5 rounded-full absolute bottom-0.5 right-0.5">
                      <div className="h-2 w-2  bg-black rounded-full"></div>
                    </div>
                  )}
                </div>
              )}
              {showIcons.wishlist && (
                <div
                  onClick={() => router.push("/wishlist")}
                  className="h-8 w-8  hidden  cursor-pointer relative rounded-full bg-indigo-100 border border-gray-100 w-8 flex items-center justify-center mr-2"
                >
                  <FaRegHeart className="text-2xl  h-full text-gray-600    cursor-pointer  " />

                  {favorites?.length > 0 && (
                    <div className="h-max w-max bg-alice-blue p-0.5 rounded-full absolute bottom-0.5 right-0.5">
                      <div className="h-2 w-2  bg-black rounded-full"></div>
                    </div>
                  )}
                </div>
              )}
              {showIcons.cart && (
                <div className="mr-4 w-max relative h-full hidden   flex items-center">
                  <div
                    onClick={() => router.push("/cart")}
                    className="h-8 w-8 relative w-8  cursor-pointer rounded-full bg-indigo-100 border border-gray-100 flex items-center justify-center "
                  >
                    <LiaShoppingBagSolid className="text-3xl w-full h-full text-gray-600 rounded-full bg-indigo-100  border border-gray-100 cursor-pointer " />
                    {cartItems?.length > 0 && (
                      <div className="h-max w-max bg-alice-blue p-0.5 rounded-full absolute bottom-0.5 right-0.5">
                        <div className="h-2 w-2  bg-black rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <span className=" bg-green-500 absolute top-0 left-0 text-sm text-white px-2 cursor-pointer font-poppins rounded-full ">
                    {cartItems.length || 0}
                  </span>
                </div>
              )}
            </ul>
          </div>
        </nav>
        <div className="w-full min-h-full mt-8 mb-8 gap-6 flex-col md:flex-row flex items-start p-1 md:pl-56">
          <div className=" bg-gray-100 bg-opacity-25 flex flex-col justify-center   w-max h-max  transition-opacity">
            <h1 className="font-base font-Dosis text-xl w-max mb-8">
              {searches?.length > 0 ? "Latest searches" : " Search suggestions"}
            </h1>

            {searches?.length > 0 ? (
              searches?.slice(0, 6).map((search: any, index: number) => {
                return (
                  <p
                    key={search + index}
                    onClick={() => handleSearchNavigation(search)}
                    className=" text-md text-gray-500 hover:text-gray-700 font-semibold cursor-pointer  hover:underline underline-offset-4 mb-4"
                  >
                    {search}
                  </p>
                );
              })
            ) : (
              <div className="">
                <p
                  onClick={() => handleSearchNavigation("habesha dress")}
                  className=" hover:text-gray-700 cursor-pointer hover:underline-offset-6 text-md text-gray-500 underline mb-4"
                >
                  Habesha dress
                </p>
                <p
                  onClick={() => handleSearchNavigation("men")}
                  className=" hover:text-gray-700 cursor-pointer hover:underline-offset-6 text-md text-gray-500 underline mb-4"
                >
                  Men
                </p>
                <p
                  onClick={() => handleSearchNavigation("wedding")}
                  className=" hover:text-gray-700 cursor-pointer hover:underline-offset-6 text-md text-gray-500 underline mb-4"
                >
                  Wedding
                </p>
                <p
                  onClick={() => handleSearchNavigation("Awdeamet")}
                  className=" hover:text-gray-700 cursor-pointer hover:underline-offset-6 text-md text-gray-500 underline mb-4"
                >
                  Awdeamet
                </p>
              </div>
            )}
            {searches?.length > 0 && (
              <button
                onClick={handleRemoveSearch}
                className="flex items-center gap-4 "
              >
                {" "}
                <CiTrash className="text-xl" />{" "}
                <span className="tracking-wide underline underline-offset-4 font-Dosis">
                  clear all
                </span>
              </button>
            )}
          </div>

          <div className="w-full h-full flex flex-col px-6 ">
            {data.length > 0 && (
              <h1 className="text-xl font-semibold mb-8">
                Matches your search:{" "}
              </h1>
            )}
            <div className="w-full  flex overflow-x-hidden items-center gap-4  ">
              {loading ? (
                <div className=" relative w-full    my-8 mt-24 flex items-center justify-center">
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
                  spaceBetween={1}
                  slidesPerView={slidesPerView}
                  navigation={true}
                  className=" w-88  h-max flex items-center justify-center  cursor-pointer  "
                  modules={[Pagination, Navigation, Autoplay, EffectCreative]}
                >
                  {data.length > 0 &&
                    data?.slice(0, 16)?.map((item: any) => {
                      return (
                        <SwiperSlide
                          className=" cursor-pointer "
                          key={item._id}
                        >
                          <div className="w-full h-full flex justify-center items-center">
                            <div className="">
                              <SearchCard product={item} />
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchBar;
