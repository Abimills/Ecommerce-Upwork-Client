"use client";

import { addToCart, addToFavorites } from "@/app/lib/cartSlice/cartSlice";
import { useAppDispatch } from "@/app/lib/hooks";
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
  available_sizes: string[];
  available_colors: string[];
  purchasedNo: number;
  type: string;
  typeOfClothes: string;
}
interface Props {
  product: Product;
}
const ProductCard: React.FC<Props> = ({ product }) => {
  const favorites = useSelector((state: any) => state.cart.favorites);
  console.log(favorites);
  const { _id, title, img, price, rating } = product;
  const [isFavored, setIsFavored] = useState(favorites.includes(_id));
  const router: any = useRouter();
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: any) => {
    const data: any = {
      title: product.title,
      price: product.price,
      quantity: 1,
      id: product._id,
      inStock: true,
      chosen_sizes: product.availableSizes[0] || "",
      chosen_colors: product.availableColors[0] || "",

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
    <div className="w-80 max-w-sm bg-alice-blue   rounded-md shadow-lg relative  ">
      {!isFavored ? (
        <IoIosHeartEmpty
          onClick={() => handleFavorites(_id)}
          className="absolute  text-2xl m-1 text-orange-500 right-0 hover:text-3xl"
        />
      ) : (
        <IoIosHeart
          onClick={() => handleFavorites(_id)}
          className="absolute  text-2xl m-1 text-orange-500 right-0 hover:text-3xl"
        />
      )}
      <Link href={`/${_id}`}>
        <img
          className="object-contain w-full h-56 rounded-t-lg bg-gray-100 mb-10"
          src={img}
          alt="product image"
        />
      </Link>

      <div className="px-5 pb-5">
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 ">
          {title}
        </h5>

        <div className="flex items-center justify-between mt-2.5 mb-5">
          <div className="flex items-center ">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <GoStarFill className="w-4 h-4 text-yellow-300" />
              <GoStarFill className="w-4 h-4 text-yellow-300" />
              <GoStarFill className="w-4 h-4 text-yellow-300" />
              <GoStarFill className="w-4 h-4 text-yellow-300" />
              <GoStar className="text-gray-300" />
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {rating}
            </span>
          </div>
          <p className="text-2xl  text-gray-900 relative mr-4 font-roboto">
            <span className="text-base absolute right-8 mr-3 mt-0.5 ">$</span>
            254
            <span className="text-base absolute left-8 ml-3  mt-0.5 ">89</span>
          </p>
        </div>
        <div className=" p-1 flex gap-3 w-full font-roboto mb-3">
          <p className=" text-xs text-gray-400  border border-gray-300 px-0.5 rounded-sm">
            S
          </p>
          <p className=" text-xs text-gray-400  border border-gray-300 px-0.5 rounded-sm">
            M
          </p>
          <p className=" text-xs text-gray-400  border border-gray-300 px-0.5 rounded-sm">
            L
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleAddToCart(product)}
            className="text-white font-roboto bg-yellow-400  hover:bg-yellow-300 hover:text-black   font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Add to Cart
          </button>
          <button
            onClick={() => handleBuy(product)}
            className="text-pink-400 font-roboto border border-pink-300 hover:bg-pink-400 hover:text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
