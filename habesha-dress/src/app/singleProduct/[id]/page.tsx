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
import { addToCart, addToFavorites } from "../../lib/cartSlice/cartSlice";
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
  const router = useRouter();
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<any>([]);
  const [similarClothes, setSimilarClothes] = useState<any>([]);
  const user = useSelector((state: any) => state.auth.user);
  const showSearch = useSelector((state: any) => state.cart.showSearch);
  const [isFavored, setIsFavored] = useState(
    favorites?.includes(param?.id) || false
  );
  const [sizeChoose, setSizeChose] = useState(
    (data?.availableSizes && data?.availableSizes?.[0]) || "S"
  );
  const [colorChoose, setColorChose] = useState(
    data.availableColors ? data.availableColors[0] : ""
  );

  // Todo: donot delete this I might need it!
  // const addToDbFavorites = async (userId: any, itemId: any) => {
  //   const res = await axios.put("http://localhost:3000/api/user", {
  //     userId,
  //     itemId,
  //   });
  // };

  const handleFavorites = (id: any) => {
    dispatch(addToFavorites(id));
    setIsFavored(!isFavored);
    if (user) {
      addToDbFavorites(user._id, id);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/product/?id=${param.id}`
      );

      setData(res.data.cloth);
      setSimilarClothes(res.data.similarClothes);
    };
    fetchData();
  }, []);
  const handleAddToCart = (product: any) => {
    const data: any = {
      title: product.title,
      price: product.price,
      quantity: 1,
      id: product._id,
      discount: product.discount ? product.discount : 0,
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
    user: true,
    wishlist: true,
    cart: true,
    navigation: true,
  };
  const priceString = data?.discount
    ? (data?.price - data?.discount).toFixed(2)
    : parseFloat(data?.price).toFixed(2);
  const [wholePart, decimalPart] = priceString.split(".");
  const originalPriceString = parseFloat(data.price).toFixed(2);

  const [originalWholePart, originalDecimalPart] =
    originalPriceString.split(".");
  return (
    <div className="bg-white w-full h-full font-Dosis font-semibold">
      <div className=" mb-8 border border-gray-200 border-2">
        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      <Notification />
      <div className="bg-white w-full h-max  py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[560px] rounded-lg  mb-4">
                <img
                  className="w-full hover:bg-yellow-300 h-full object-contain bg-indigo-100 border border-gray-100 rounded-full overflow-hidden transition-opacity duration-800 "
                  src={data?.img}
                  alt="Product Image"
                />
              </div>
            </div>
            <div className=" w-full md:flex-1  px-4 mr-6">
              <div className=" w-full flex items-start justify-between mb-6 ">
                <h2 className="text-3xl font-Dosis font-semibold text-gray-800  ">
                  <span className="mb-4">{data?.title}</span> <br />
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

              <div className="w-full flex items-center justify-between mb-8 mt-4 ">
                <div className=" w-full flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <p className="w-40 text-gray-300">Available</p>
                </div>
                <ul className="my-1 flex gap-1 mb-4">
                  {Array(data?.rating)
                    .fill("")
                    .map((_, index) => (
                      <li>
                        <GoStarFill className="text-lg text-orange-500" />
                      </li>
                    ))}
                  {data?.rating < 5 &&
                    Array(5 - data?.rating)
                      .fill("")
                      .map((_, index) => (
                        <li>
                          <GoStar className="text-lg text-gray-500" />
                        </li>
                      ))}
                </ul>
              </div>
              <div className="mb-12 w-full flex items-center  justify-between">
                <h1 className="font-bold text-gray-700 dark:text-gray-300">
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
                </div>
                <div className="w-1/2 px-2">
                  <button
                    onClick={() => handleBuy(data)}
                    className="w-full flex items-center justify-center gap-3 bg-gray-700 text-white  py-2 px-4 rounded-full font-bold "
                  >
                    Your body size
                    <GiBodyHeight className="text-white tex-2xl" />
                  </button>
                </div>
              </div>
              <div className="flex w-full -mx-2 mb-4">
                <div className="w-full px-2">
                  <button
                    onClick={() => handleAddToCart(data)}
                    className="w-full flex items-center gap-6 justify-center bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    Add to Cart
                    <GiShoppingBag className="text-white" />
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

      <h1 className="mt-16  font-Dosis font-semibold text-4xl px-2 mb-4">
        Similar Products
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
          {similarClothes?.map((product: any) => {
            return (
              <SwiperSlide className="cursor-pointer w-max  " key={product._id}>
                <InspirationCard product={product} />
              </SwiperSlide>
            );
          })}
          {/* <LiaAngleDoubleRightSolid className="text-lg text-gray-400" /> */}
        </Swiper>
      </main>
      <Footer />
    </div>
  );
};

export default SingleProduct;