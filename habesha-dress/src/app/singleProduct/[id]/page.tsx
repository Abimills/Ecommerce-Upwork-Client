"use client";
import { useParams, useRouter } from "next/navigation";
import data from "../../components/Products/allProducts";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { GoStar } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { useSelector } from "react-redux";
import { GiBodyHeight } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import {
  addToCart,
  addToFavorites,
  toggleShowBodySize,
} from "../../lib/cartSlice/cartSlice";
import { useAppDispatch } from "../../lib/hooks";
import SearchBar from "../../components/Navbar/SearchBar";
import Navbar from "../../components/Navbar/Navbar";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import InspirationCard from "../../components/DiscountCard/InspirationCard";
import Footer from "../../components/Footer/Footer";
import Notification from "@/app/components/Notification/Notification";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import BodySize from "@/app/components/AddBodySize/BodySize";

// interface DataType {
//   title: string;
//   id: string;
//   description: string;
//   img: string;
//   price: number;
//   rating: number;
//   category: string[];
//   availableSizes: string[];
//   availableColors: string[];
//   forWhichGender: string[];
//   boughtWithIds: string[];
// }
const SingleProduct: React.FC = () => {
  const favorites = useSelector((state: any) => state.cart.favorites);
  const dispatch = useAppDispatch();
  const [slidesPerView, setSlidesPerView] = useState(3);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<any>([]);
  const [similarClothes, setSimilarClothes] = useState<any>([]);
  const gateWay = useSelector((state: any) => state.cart.gateWay);

  const user = useSelector((state: any) => state.auth.user);
  const showSearch = useSelector((state: any) => state.cart.showSearch);
  const showBodySize = useSelector((state: any) => state.cart.showBodySize);
  const [isFavored, setIsFavored] = useState(
    favorites?.includes(param?.id) || false
  );
  const [sizeChoose, setSizeChose] = useState(
    (data?.availableSizes && data?.availableSizes?.[0]) || "S"
  );
  const [colorChoose, setColorChose] = useState(
    data.availableColors ? data.availableColors[0] : ""
  );

  // donot delete this I might need it!
  // const addToDbFavorites = async (userId: any, itemId: any) => {
  //   const res = await axios.put("http://localhost:3000/api/user", {
  //     userId,
  //     itemId,
  //   });
  // };

  const handleFavorites = (id: any) => {
    dispatch(addToFavorites(id));
    setIsFavored(!isFavored);
  };
  const handleBodySize = (id: any) => {
    dispatch(toggleShowBodySize());
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${gateWay}/api/product/?id=${param.id}`);

        setData(res.data.cloth);
        setSimilarClothes(res.data.similarClothes);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log({
          message: "error while fetching single product",
          error,
        });
      }
    };
    fetchData();
  }, []);
  const handleAddToCart = (product: any) => {
    let measurements: any = localStorage.getItem("measurements");
    const allMeasurements = JSON.parse(measurements);
    const data: any = {
      title: product.title,
      price: product.price,
      quantity: 1,
      bodySize: allMeasurements || [],
      id: product._id,
      discountedPrice: product?.discountedPrice,
      discount: product.discount,
      inStock: true,
      chosenSize: sizeChoose || "",
      img: product.img,
    };

    dispatch(addToCart(data));
  };
  const handleBuy = (product: any) => {
    handleAddToCart(product);
    router.push("/cart");
  };
  const showIcons = {
    search: true,
    user: false,
    wishlist: true,
    cart: true,
    navigation: true,
  };
  const priceString = parseFloat(data?.discountedPrice)?.toFixed(2);

  const [wholePart, decimalPart] = priceString.split(".");
  const originalPriceString = parseFloat(data.price).toFixed(2);

  const [originalWholePart, originalDecimalPart] =
    originalPriceString.split(".");
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
    <div className="bg-white relative w-full h-full font-Dosis font-semibold">
      <div className=" mb-8 border border-gray-200 border-2">
        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      {loading && (
        <div className="fixed z-20 bg-gray-100  opacity-85 flex items-center justify-center top-0 w-full h-screen">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#2d7e23"}
            height={64}
            width={64}
          />
        </div>
      )}

      <ToastContainer
        newestOnTop={true}
        autoClose={1000}
        theme="dark"
        position={"bottom-right"}
      />
      {showBodySize && <BodySize id={param?.id} />}
      <div className="bg-white w-full h-max mb-16  py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[560px] rounded-lg  mb-4">
                <img
                  className="w-full hover:bg-yellow-300 h-full object-contain bg-indigo-100 border border-gray-100 rounded-lg overflow-hidden transition-opacity duration-800 "
                  src={data?.img}
                  alt="Product Image"
                />
              </div>
            </div>
            <div className=" w-full md:flex-1  px-4 mr-6">
              <div className=" w-full flex items-start justify-between mb-6 ">
                <h2 className="text-3xl max-w-80 font-Dosis font-semibold text-gray-800  ">
                  <span className="mb-4 ">{data?.title}</span> <br />
                  <span className="font-medium text-base text-gray-400">
                    #{data?.forWhichGender}
                  </span>
                </h2>
                {isFavored ? (
                  <IoIosHeart
                    onClick={() => handleFavorites(param?.id)}
                    className="  text-3xl mx-1  text-red-600  cursor-pointer"
                  />
                ) : (
                  <IoIosHeartEmpty
                    onClick={() => handleFavorites(param?.id)}
                    className="  text-3xl mx-1  text-gray-700 cursor-pointer "
                  />
                )}
              </div>

              <div className="flex mb-4 justify-between">
                <p className="text-3xl  text-gray-900 leading-10 font-Dosis font-bold  cursor-pointer">
                  <span className="text-sm font-Dosis font-semibold text-black relative bottom-2 mr-0.5  ">
                    $
                  </span>
                  {wholePart}
                  <span className="text-base font-Dosis font-semibold relative bottom-1 mr-0.5  ">
                    {decimalPart}
                  </span>
                </p>
                <p className="text-2xl  text-gray-200 leading-10  line-through font-Dosis font-semibold cursor-pointer">
                  <span className="text-sm font-Dosis font-semibold text-gray-300 relative bottom-2 mr-0.5  ">
                    $
                  </span>
                  {originalWholePart}
                  <span className="text-base font-Dosis font-semibold relative bottom-1 mr-0.5  ">
                    {originalDecimalPart}
                  </span>
                </p>
              </div>

              <div className="w-full flex flex-wrap  items-center justify-between mb-8 mt-4 ">
                <div className="  w-full flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <p className="w-40 text-gray-300">Available</p>
                </div>
                <ul className="w-max my-1 flex gap-1 mb-4">
                  {Array(data?.rating)
                    .fill("")
                    .map((_, index) => (
                      <li key={index}>
                        <GoStarFill className="text-lg text-orange-500" />
                      </li>
                    ))}
                  {data?.rating < 5 &&
                    Array(5 - data?.rating)
                      .fill("")
                      .map((_, index) => (
                        <li key={index}>
                          <GoStar className="text-lg text-gray-500" />
                        </li>
                      ))}
                </ul>
              </div>
              <div className="mb-12 w-full flex items-center  justify-between">
                {/* <h1 className="font-bold text-gray-700 dark:text-gray-300">
                  Size:
                </h1>

                <div className="flex  items-center mt-2 ">
                  {data?.availableSizes?.map((size: any) => {
                    return sizeChoose === size ? (
                      <button
                        onClick={() => setSizeChose(size)}
                        className="bg-indigo-400 dark:bg-gray-700 text-white  py-2 px-4 rounded-full font-bold mr-2 hover:bg-indigo-400 hover:text-white "
                      >
                        {size}
                      </button>
                    ) : (
                      <button
                        onClick={() => setSizeChose(size)}
                        className="bg-indigo-100 dark:bg-gray-700 text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-indigo-400 hover:text-white "
                      >
                        {size}
                      </button>
                    );
                  })}
                </div> */}
                <div className="w-full flex justify-end px-2">
                  <button
                    onClick={handleBodySize}
                    className="w-full sm:w-1/2 flex items-center justify-center gap-3 bg-red-300 text-white  py-2 px-4 rounded-full font-bold "
                  >
                    &#8594; Your body size
                    <GiBodyHeight className="text-white tex-2xl" />
                  </button>
                </div>
              </div>
              <div className="flex w-full -mx-2 mb-4">
                <div className="w-2/3 sm:w-1/2 flex px-2">
                  <button
                    onClick={() => handleAddToCart(data)}
                    className=" text-sm sm:text-base w-full flex items-center gap-6 justify-center bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-lg  font-bold hover:bg-white hover:text-black border-2 border-gray-700  "
                  >
                    Add to Cart
                    <GiShoppingBag className="  text-white" />
                  </button>
                </div>
                <div className="w-1/3 sm:w-1/2 px-2">
                  <button
                    onClick={() => handleBuy(data)}
                    className="text-sm sm:text-base w-full flex items-center justify-center  hover:text-white hover:bg-gray-800  gap-3 bg-white text-black border-2 border-gray-700  py-2 px-4 rounded-lg  font-bold "
                  >
                    Buy now
                  </button>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-400 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-300 hover:text-gray-500   text-sm mt-2">
                  {data?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {similarClothes?.length > 1 && (
        <div className="w-full">
          <h1 className="mt-16  font-Dosis font-semibold text-4xl px-2 mb-4">
            Similar Products
          </h1>
          <main className="flex  w-full p-5 shadow-lg items-center justify-between">
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
              }}
              // onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
              modules={[Pagination, Navigation, Autoplay, EffectCreative]}
            >
              {similarClothes?.map((product: any) => {
                return (
                  <SwiperSlide
                    className="cursor-pointer w-max min-w-2/3  "
                    key={product._id}
                  >
                    <div className="w-full h-full flex justify-center items-center">
                      <div className="">
                        <ProductCard key={product._id} product={product} />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* <LiaAngleDoubleRightSolid className="text-lg text-gray-400" /> */}
            </Swiper>
          </main>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SingleProduct;
