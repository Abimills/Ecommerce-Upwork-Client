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

interface Product {
  _id: string;
  title: string;
  description: string;
  img: string;
  price: string;
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
const SearchCard: React.FC<Props> = ({ product }) => {
  const { _id, title, img, price, rating, availableSizes, availableColors } =
    product;
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
  const handleAddToCart = (product: any) => {
    const data: any = {
      title: product.title,
      price: product.price,
      quantity: 1,
      id: product._id,
      inStock: true,
      chosenSize: sizeChoose || "",
      chosenColor: colorChoose || "",
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
    <div className="w-max h-88 max-w-sm font-Dosis    ml-4 relative  ">
      {!isFavored ? (
        <IoIosHeartEmpty
          onClick={() => handleFavorites(_id)}
          className="absolute  text-2xl m-1 text-gray-500 right-0 "
        />
      ) : (
        <IoIosHeart
          onClick={() => handleFavorites(_id)}
          className="absolute  text-2xl m-1 text-black right-0 "
        />
      )}
      <Link href={`singleProduct/${_id}`}>
        <img
          className="object-contain   w-max min-w-72 h-80 bg-yellow-50 mb-10"
          src={img}
          alt="product image"
        />
      </Link>

      <div className="px-5 pb-5">
        <h5 className="text-xs   uppercase tracking-tight text-gray-900 mb-2 ">
          {title}
        </h5>
        <p
          onClick={() => router.push(`/add-products/${_id}`)}
          className="text-lg   text-gray-900 font-semibold relative p-1 mr-4 font-Dosis cursor-pointer"
        >
          <span className=" p-0">$</span>
          {price}
          {/* <span className="text-base absolute left-8 ml-3  mt-0.5 ">89</span> */}
        </p>
      </div>
      {/* <div className="flex items-center justify-between mt-2.5 mb-5"> */}
      {/* <div className="flex items-center ">
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
          </div> */}

      {/* </div> */}
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
    </div>
  );
};

export default SearchCard;
