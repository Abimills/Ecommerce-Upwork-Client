"use client";
import { useParams } from "next/navigation";
import data from "../components/Products/allProducts";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import NavContainer from "../components/Navbar/NavContainer";
import SearchBar from "../components/Navbar/SearchBar";
import Navbar from "../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import SingleNavigation from "../components/singleItemNavigation/SingleNav";
import SingleSearchBar from "../components/Searchbar/Searchbar";

interface DataType {
  title: string;
  id: string;
  description: string;
  img: string;
  price: number;
  rating: number;
  category: string[];
  availableSizes: string[];
  availableColors: string[];
  forWhichGender: string[];
  boughtWithIds: string[];
}
const SingleProduct: React.FC = () => {
  const param = useParams<{ id: string }>();
  const [data, setData] = useState<DataType[]>([]);
  const showSearch = useSelector((state: any) => state.cart.showSearch);

  // const single: any = data.find((product) => product.id === param.id);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/product/?id=${param.id}`
    );
    setData(res.data.cloth);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 w-full h-full ">
      <div className=" mb-8">
        {showSearch ? <SingleNavigation /> : <SingleSearchBar />}
      </div>
      {/* <div className=" w-1/2 flex items-center gap-10 bg-gray-100 p-1">
        <IoMdArrowBack className="text-2xl text-gray-600  cursor-pointer" />
        <h1 className="text-xl tracking-widest">Home/Products/</h1>
      </div> */}
      <div className="bg-gray-100  py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-contain bg-orange-100"
                  src={data?.img}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button className="w-full flex items-center gap-6 justify-center bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Add to Cart
                    <GiShoppingBag className="text-white" />
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full flex items-center justify-center gap-3 bg-yellow-100 text-gray-800  py-2 px-4 rounded-full font-bold ">
                    Add to Wishlist
                    <GoHeartFill className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800  mb-16">
                {data?.title}
              </h2>
              {/* <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
              ante justo. Integer euismod libero id mauris malesuada tincidunt.
            </p> */}
              <div className="flex mb-4 justify-between">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 mr-4">Price:</span>
                  <span className="text-gray-700 font-bold">
                    ${data?.price}.89
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300 mr-3">
                    Availability:
                  </span>
                  <span className="text-green-500 mr-8">In Stock</span>
                </div>
              </div>
              {/* <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Select Color:
              </span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
              </div>
            </div> 
            */}
              <div className="w-full mb-8 mt-4 ">
                <ul className="my-1 flex gap-1">
                  {Array(data?.rating)
                    .fill()
                    .map((_, index) => (
                      <li>
                        <GoStarFill className="text-lg text-orange-500" />
                      </li>
                    ))}
                  {data?.rating < 5 &&
                    Array(5 - data?.rating)
                      .fill()
                      .map((_, index) => (
                        <li>
                          <GoStar className="text-lg text-gray-500" />
                        </li>
                      ))}
                </ul>
              </div>
              <div className="mb-12">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </span>

                <div className="flex items-center mt-2 ">
                  {data?.availableSizes?.map((size: any) => {
                    return (
                      <button className="bg-indigo-100 dark:bg-gray-700 text-gray-700  py-2 px-4 rounded-full font-bold mr-2 hover:bg-indigo-400 hover:text-white ">
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600   text-sm mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sed ante justo. Integer euismod libero id mauris malesuada
                  tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet.
                  Duis dapibus augue vel ipsum pretium, et venenatis sem
                  blandit. Quisque ut erat vitae nisi ultrices placerat non eget
                  velit. Integer ornare mi sed ipsum lacinia, non sagittis
                  mauris blandit. Morbi fermentum libero vel nisl suscipit, nec
                  tincidunt mi consectetur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
