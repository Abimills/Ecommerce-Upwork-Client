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
  const priceString = discount
    ? (price - discount).toFixed(2)
    : price.toFixed(2);
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
  const addToDbFavorites = async (userId: any, itemId: any) => {
    const res = await axios.put("http://localhost:3000/api/user", {
      userId,
      itemId,
    });
  };
  const handleFavorites = (id: any) => {
    dispatch(addToFavorites(id));
    setIsFavored(!isFavored);
    if (user) {
      addToDbFavorites(user._id, id);
    }
  };

  return (
    <div className="w-80 h-88 max-w-sm bg-alice-blue   rounded-md shadow-lg relative mb-8 ">
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
            className="  text-2xl m-1 text-red-500 p-0.5 text-center  "
          />
        </div>
      )}
      <Link href={`/${_id}`}>
        <img
          className="object-contain   w-full h-56 rounded-t-lg bg-gray-50 "
          src={img}
          alt="product image"
        />
      </Link>

      <div className="px-5 pb-5 bg-white">
        <h5 className="text-lg font-semibold uppercase tracking-tight text-gray-900 ">
          {title}
        </h5>

        <div className="flex items-center justify-between mt-2.5 mb-5">
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
          <p
            onClick={() => router.push(`/add-products/${_id}`)}
            className="text-2xl  text-gray-900 font-semibold   font-roboto cursor-pointer"
          >
            <span className="text-sm font-medium text-black relative bottom-2 mr-0.5  ">
              £
            </span>
            {wholePart}
            <span className="text-base font-medium relative bottom-1 mr-0.5  ">
              {decimalPart}
            </span>
          </p>
        </div>
        {/* <div className=" p-1 flex gap-3 w-full font-roboto mb-3">
          {product?.availableSizes?.map((size: string) => {
            return size == sizeChoose ? (
              <p
                onClick={() => setSizeChose(size)}
                className=" text-xs text-indigo-400 cursor-pointer  border border-indigo-300 px-0.5 rounded-sm"
              >
                {size}
              </p>
            ) : (
              <p
                onClick={() => setSizeChose(size)}
                className=" text-xs text-gray-400 cursor-pointer  border border-gray-300 px-0.5 rounded-sm"
              >
                {size}
              </p>
            );
          })}
        </div> */}
        {discount > 1 ? (
          <p
            onClick={() => router.push(`/add-products/${_id}`)}
            className="text-xl  text-gray-400 line-through font-medium p-1   mb-6  font-roboto cursor-pointer"
          >
            {/* <span className="text-sm font-medium text-black relative bottom-2 mr-0.5  ">
            £
          </span> */}
            {originalWholePart}
            <span className="text-base line-through font-medium relative bottom-1 mr-0.5  ">
              {originalDecimalPart}
            </span>
          </p>
        ) : (
          <p
            onClick={() => router.push(`/add-products/${_id}`)}
            className="text-2xl  text-gray-400 line-through font-medium p-1   mb-6  font-roboto cursor-pointer"
          >
            {/* <span className="text-sm font-medium text-black relative bottom-2 mr-0.5  ">
            £
          </span> */}
            {""}
            <span className="text-base line-through font-medium relative bottom-1 mr-0.5  ">
              {""}
            </span>
          </p>
        )}
        {/* <div className="flex items-center justify-between">
          <button
            onClick={() => handleAddToCart(product)}
            className="text-white font-roboto bg-gray-700  hover:bg-gray-600 hover:text-gray-100   font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Add to Cart
          </button>
          <button
            onClick={() => handleBuy(product)}
            className="text-gray-800 font-roboto border border-gray-500 hover:bg-yellow-400 hover:border-yellow-400 hover:text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Buy Now
          </button>
        </div> */}
        <div className="flex items-center gap-4 justify-between">
          <button
            onClick={() => handleAddToCart(product)}
            className="text-white font-roboto bg-gray-700 p-3  hover:bg-gray-600 hover:text-gray-100   font-medium rounded-full text-sm  text-center "
          >
            <IoBagAddSharp className="text-lg" />
          </button>
          <button
            onClick={() => handleBuy(product)}
            className="text-white font-roboto border border-gray-500 bg-gray-700 hover:bg-gray-600 hover:border-yellow-400 hover:text-white  font-medium rounded-sm  text-sm p-2 text-center "
          >
            Buy now
          </button>
          {/* <div className=" h-8 w-8 rounded-full bg-gray-100 border border-gray-100">
               <MdDeleteOutline
                 onClick={() => handleFavorites(_id)}
                 className=" text-2xl m-1 text-orange-500  "
               />
             </div> */}
          {/* <div className=" h-8 w-8 rounded-full bg-gray-100 border border-gray-100">
            <MdDeleteOutline
              onClick={() => handleFavorites(_id)}
              className="  text-3xl w-6 h-6  m-1 text-gray-700   hover:text-red-700  hover:rounded-full "
            />
          </div> */}
          {/* {isFavored && (
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
