"use client";

import { addToCart, addToFavorites } from "@/app/lib/cartSlice/cartSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { useSelector } from "react-redux";
import { TbBasketPlus } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { IoBagAddSharp } from "react-icons/io5";
import { IoBagAdd } from "react-icons/io5";
import Notification from "../Notification/Notification";
interface Product {
  _id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  discount: number;
  rating: string;
  availableSizes: string[];
  availableColors: string[];
  purchasedNo: number;
  discountedPrice: number;
  type: string;
  typeOfClothes: string;
}
interface Props {
  product: Product;
}
const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    _id,
    title,
    img,
    price,
    rating,
    availableSizes,
    discount,
    discountedPrice,
    availableColors,
  } = product;
  const favorites = useSelector((state: any) => state.cart.favorites);
  const user = useSelector((state: any) => state.auth.user);
  const [isFavored, setIsFavored] = useState(favorites?.includes(_id) || false);
  const router: any = useRouter();
  const dispatch = useAppDispatch();
  const [sizeChoose, setSizeChose] = useState(
    availableSizes ? availableSizes[0] : ""
  );
  const [colorChoose, setColorChose] = useState(
    availableColors ? availableColors[0] : ""
  );

  const priceString = discountedPrice?.toFixed(2);

  const [wholePart, decimalPart] = priceString.split(".");
  const originalPriceString = price.toFixed(2);

  const [originalWholePart, originalDecimalPart] =
    originalPriceString.split(".");

  const handleAddToCart = (product: any) => {
    const data: any = {
      title: product.title,
      price: product.price,
      quantity: 1,
      id: product._id,
      discountedPrice,
      discount: discount,
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

  const handleFavorites = (id: any) => {
    dispatch(addToFavorites(id));
    setIsFavored(!isFavored);
  };

  return (
    <div className="w-72  sm:w-80 h-[400px]  bg-white rounded-md border border-gray-200 relative mb-8 ">
      {!isFavored ? (
        <div className="absolute m-1 rounded-full cursor-pointer hover:bg-white hover:border hover:border-gray-200 right-0 w-8 h-8  display-flex items-center justify-center bg-white">
          <IoIosHeartEmpty
            onClick={() => handleFavorites(_id)}
            className=" text-2xl m-1 p-0.5 text-black  "
          />
        </div>
      ) : (
        <div className="absolute m-1 rounded-full right-0 hover:bg-white hover:border hover:border-gray-200 w-8 h-8 cursor-pointer  display-flex items-center justify-center bg-white">
          <IoIosHeart
            onClick={() => handleFavorites(_id)}
            className="  text-2xl m-1 text-red-600 p-0.5 text-center  "
          />
        </div>
      )}
      {user?.role === "admin" && user.email === "ninu373@gmail.com" && (
        <button
          onClick={() => router.push(`/add-products/${_id}`)}
          className="absolute m-1 text-white rounded-lg hover:rounded-sm  top-0 left-0 bg-teal-400 border border-teal-400 py-1 px-5"
        >
          Edit product
        </button>
      )}
      <img
        onClick={() => router.push(`/singleProduct/${_id}`)}
        className="object-contain text-left   w-full h-64  rounded-t-lg bg-white  "
        src={img}
        alt="product image"
      />

      <div className="px-5 py-3 w-full h-max pb-1 bg-white ">
        <h5 className="text-base font-medium capitalize tracking-tight text-gray-600 ">
          {title?.slice(0, 15)}..
        </h5>

        <div className="flex items-center justify-between mt-1 mb-1">
          <div className="flex items-center ">
            <div className="w-full ">
              <ul className=" flex gap-1">
                {Array(rating)
                  ?.fill("")
                  ?.map((_, index) => (
                    <li key={index}>
                      <GoStarFill className="text-lg text-yellow-500" />
                    </li>
                  ))}
                {parseInt(rating) < 5 &&
                  Array(5 - parseInt(rating))
                    ?.fill("")
                    ?.map((_, index) => (
                      <li key={index}>
                        <GoStar className="text-lg text-gray-500" />
                      </li>
                    ))}
              </ul>
            </div>
          </div>
          <p className="text-2xl  text-gray-800 leading-10 font-bold   font-Dosis cursor-pointer">
            <span className="text-sm font-medium text-gray-800 font-Dosis  relative bottom-2 mr-0.5  ">
              $
            </span>
            {wholePart}
            <span className="text-base font-medium font-Dosis  relative bottom-1 mr-0.5  ">
              {decimalPart}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between mt-1 ">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <p className="w-40 text-gray-400 text-base">Available</p>
          </div>
          {discount > 1 && (
            <p className="text-xl  text-gray-200 line-through font-medium p-1     font-Dosis  cursor-pointer">
              <span className="text-sm font-medium text-gray-400 relative bottom-2 mr-0.5  ">
                $
              </span>
              {originalWholePart}
              <span className="text-base line-through font-medium relative bottom-1 mr-0.5  ">
                {originalDecimalPart}
              </span>
            </p>
          )}
        </div>

        {/* <div className="flex items-center gap-4 justify-between">
          <button
            onClick={() => handleAddToCart(product)}
            className="text-white font-roboto bg-gray-700 p-3  hover:bg-gray-600 hover:text-gray-100   font-medium rounded-full text-sm  text-center "
          >
            <IoBagAddSharp className="text-lg" />
          </button>
          <button
            onClick={() => handleBuy(product)}
            className="text-white font-roboto border border-gray-500 bg-gray-700 hover:bg-gray-600 hover:border-gray-300 hover:text-white  font-medium rounded-sm  text-sm p-2 text-center "
          >
            Buy now
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
