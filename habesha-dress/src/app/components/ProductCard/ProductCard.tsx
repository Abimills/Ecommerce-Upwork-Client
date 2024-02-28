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
const ProductCard: React.FC<Props> = ({ product }) => {
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
          className="object-contain   w-full h-56 rounded-t-lg bg-gray-100 mb-10"
          src={img}
          alt="product image"
        />
      </Link>

      <div className="px-5 pb-5">
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
                    <li>
                      <GoStarFill className="text-lg text-yellow-500" />
                    </li>
                  ))}
                {parseInt(rating) < 5 &&
                  Array(5 - parseInt(rating))
                    ?.fill("")
                    ?.map((_, index) => (
                      <li>
                        <GoStar className="text-lg text-gray-500" />
                      </li>
                    ))}
              </ul>
            </div>
          </div>
          <p
            onClick={() => router.push(`/add-products/${_id}`)}
            className="text-2xl  text-gray-900 relative mr-4 font-roboto cursor-pointer"
          >
            <span className="text-base absolute right-8 mr-3 mt-0.5 ">$</span>
            {price}
            <span className="text-base absolute left-8 ml-3  mt-0.5 ">89</span>
          </p>
        </div>
        <div className=" p-1 flex gap-3 w-full font-roboto mb-3">
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
        </div>
        <div className="flex items-center justify-between">
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
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
